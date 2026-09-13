// Tracking service for Google Simulation analytics
//
// 2026-09-13 hardening:
//  - every event carries seq (per-session counter) and sessionMs (ms since session start)
//  - delivery goes through an outbox: fetch(keepalive) → ack; unacked events are re-sent every few
//    seconds and beaconed on pagehide/hidden/beforeunload. The server de-duplicates on
//    (sessionId, seq) via a unique index, so re-sends never double count.
//  - events fired right before navigation (Done Searching, session_end) go straight to sendBeacon
//  - new event types: 'scroll' (depth milestones) and 'visibility' (tab hidden/visible)

export interface TrackingEvent {
  eventType: 'click' | 'search' | 'page_view' | 'tab_change' | 'pagination' | 'profile_view' | 'profile_close' | 'session_end' | 'scroll' | 'visibility';
  elementType: string; // 'result_card' | 'image' | 'pagination' | 'tab' | 'search' | 'scroll' | 'visibility' | etc.
  elementId?: string;
  elementText?: string;
  url?: string;
  platform?: string;
  persona: string; // 'greg' | 'meredith' | 'tremayne' | 'tanisha' | 'todd' | 'emily' | 'terrell' | 'keisha'
  timestamp: string | Date; // ISO string when sending, Date when receiving
  sessionId?: string;
  seq?: number; // per-session event counter (1-based)
  sessionMs?: number; // milliseconds since the session started
  page?: number;
  tab?: string;
  searchQuery?: string;
  depth?: number; // scroll depth milestone (25 | 50 | 75 | 100)
  visibility?: string; // 'hidden' | 'visible'
  condition?: string; // 'present' | 'absent' - footprint condition
  prolificPid?: string; // Prolific participant ID
  studyId?: string; // Prolific study ID
  sessionIdProlific?: string; // Prolific session ID
}

type EventInput = Omit<TrackingEvent, 'timestamp' | 'sessionId' | 'seq' | 'sessionMs'>;

const SESSION_KEY = 'google_sim_session_id';
const SESSION_START_KEY = 'google_sim_session_start';
const SEQ_KEY = 'google_sim_seq';
const API_URL = '/api/track';
const IS_DEV: boolean = Boolean((import.meta as any).env?.DEV);
const RESEND_INTERVAL_MS = 4000; // how often the outbox is scanned
const RESEND_AFTER_MS = 3000; // an event unacked for this long is sent again
const MAX_ATTEMPTS = 6;

const safeGet = (k: string): string | null => {
  try { return sessionStorage.getItem(k); } catch { return null; }
};
const safeSet = (k: string, v: string): void => {
  try { sessionStorage.setItem(k, v); } catch { /* storage unavailable */ }
};

// Generate or retrieve session ID (and record when the session started)
const getSessionId = (): string => {
  let sessionId = safeGet(SESSION_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    safeSet(SESSION_KEY, sessionId);
    safeSet(SESSION_START_KEY, String(Date.now()));
  }
  if (!safeGet(SESSION_START_KEY)) safeSet(SESSION_START_KEY, String(Date.now()));
  return sessionId;
};

const nextSeq = (): number => {
  const n = (parseInt(safeGet(SEQ_KEY) || '0', 10) || 0) + 1;
  safeSet(SEQ_KEY, String(n));
  return n;
};

const sessionMs = (): number => {
  const start = parseInt(safeGet(SESSION_START_KEY) || '', 10);
  return Number.isFinite(start) ? Date.now() - start : 0;
};

// ---------------------------------------------------------------- defaults
// Prolific params + footprint condition are read from the initial URL at load time, and may be
// overridden by the app via setTrackingDefaults(). stamp() fills them in for any event that does
// not carry them, so events emitted from nested components (profile overlays, result cards, tabs)
// are attributed to the participant too.
export interface TrackingDefaults { condition?: string; prolificPid?: string; studyId?: string; sessionIdProlific?: string }
const defaults: TrackingDefaults = {};
try {
  const q = new URLSearchParams(window.location.search);
  defaults.prolificPid = q.get('PROLIFIC_PID') || undefined;
  defaults.studyId = q.get('STUDY_ID') || undefined;
  defaults.sessionIdProlific = q.get('SESSION_ID') || undefined;
  defaults.condition = q.get('condition') || undefined;
} catch { /* no window */ }

/** Called once by the app with its resolved condition + Prolific params. */
export const setTrackingDefaults = (d: TrackingDefaults): void => {
  (Object.keys(d) as (keyof TrackingDefaults)[]).forEach((k) => { if (d[k]) defaults[k] = d[k]; });
};

// Stamp an event with timestamp / session / ordering metadata (+ defaults for missing attribution)
const stamp = (event: EventInput): TrackingEvent => ({
  condition: defaults.condition,
  prolificPid: defaults.prolificPid,
  studyId: defaults.studyId,
  sessionIdProlific: defaults.sessionIdProlific,
  ...Object.fromEntries(Object.entries(event).filter(([, v]) => v !== undefined)),
  timestamp: new Date().toISOString(),
  sessionId: getSessionId(),
  seq: nextSeq(),
  sessionMs: sessionMs(),
} as TrackingEvent);

// ---------------------------------------------------------------- delivery
interface OutboxEntry { event: TrackingEvent; attempts: number; lastSent: number; inFlight: boolean }
const outbox = new Map<number, OutboxEntry>(); // keyed by seq

const beacon = (event: TrackingEvent): boolean => {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
      return navigator.sendBeacon(API_URL, blob);
    }
  } catch { /* fall through */ }
  return false;
};

const sendOnce = async (entry: OutboxEntry): Promise<void> => {
  entry.attempts += 1;
  entry.lastSent = Date.now();
  entry.inFlight = true;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry.event),
      keepalive: true, // survive navigation triggered right after the event
    });
    if (response.ok) {
      outbox.delete(entry.event.seq as number); // acknowledged
      if (IS_DEV) console.log('✅ Event tracked:', entry.event.eventType, entry.event.seq);
    } else if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      // rejected by the API (malformed) — retrying will not help
      outbox.delete(entry.event.seq as number);
      console.error('❌ Tracking event rejected:', response.status, entry.event);
    }
    // 5xx / 429: leave in the outbox, the resend loop will try again
  } catch {
    // network failure: leave in the outbox
  } finally {
    entry.inFlight = false;
  }
};

/** Re-send any event that has not been acknowledged (called periodically). */
const resendStale = (): void => {
  const now = Date.now();
  outbox.forEach((entry) => {
    if (entry.inFlight && now - entry.lastSent < 15000) return; // still waiting for a reply
    if (now - entry.lastSent < RESEND_AFTER_MS) return;
    if (entry.attempts >= MAX_ATTEMPTS) {
      // last resort, then stop tracking it
      beacon(entry.event);
      outbox.delete(entry.event.seq as number);
      return;
    }
    void sendOnce(entry);
  });
};

/** Beacon every unacknowledged event (safe during unload). Duplicates are dropped server-side. */
export const flushTrackingQueue = (): void => {
  outbox.forEach((entry) => {
    if (beacon(entry.event)) outbox.delete(entry.event.seq as number);
  });
};

// Module-level lifecycle hooks (registered once per page load)
if (typeof window !== 'undefined') {
  window.setInterval(resendStale, RESEND_INTERVAL_MS);
  window.addEventListener('pagehide', flushTrackingQueue);
  window.addEventListener('beforeunload', flushTrackingQueue);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushTrackingQueue();
  });
}

// Track an event (normal path: fetch with keepalive, acknowledged, re-sent until confirmed)
export const trackEvent = async (event: EventInput): Promise<void> => {
  const trackingEvent = stamp(event);
  const entry: OutboxEntry = { event: trackingEvent, attempts: 0, lastSent: 0, inFlight: false };
  outbox.set(trackingEvent.seq as number, entry);
  await sendOnce(entry);
};

/** Track an event that is immediately followed by navigation (e.g. Done Searching). */
export const trackEventBeacon = (event: EventInput): void => {
  const trackingEvent = stamp(event);
  if (!beacon(trackingEvent)) {
    // sendBeacon unavailable — fall back to the normal path
    const entry: OutboxEntry = { event: trackingEvent, attempts: 0, lastSent: 0, inFlight: false };
    outbox.set(trackingEvent.seq as number, entry);
    void sendOnce(entry);
  }
};

// Helper functions for common tracking scenarios
export interface ProlificParams {
  prolificPid?: string;
  studyId?: string;
  sessionIdProlific?: string;
}

export const trackResultClick = (resultId: string, platform: string, title: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'click',
    elementType: 'result_card',
    elementId: resultId,
    elementText: title,
    platform,
    persona,
    condition,
    ...prolific,
  });
};

export const trackImageClick = (imageId: string, imageTitle: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'click',
    elementType: 'image',
    elementId: imageId,
    elementText: imageTitle,
    persona,
    condition,
    ...prolific,
  });
};

export const trackTabChange = (tab: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'tab_change',
    elementType: 'tab',
    elementText: tab,
    persona,
    tab,
    condition,
    ...prolific,
  });
};

export const trackPagination = (page: number, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'pagination',
    elementType: 'pagination',
    persona,
    page,
    condition,
    ...prolific,
  });
};

export const trackSearch = (query: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'search',
    elementType: 'search',
    searchQuery: query,
    persona,
    condition,
    ...prolific,
  });
};

export const trackPageView = (persona: string, page?: number, tab?: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'page_view',
    elementType: 'page',
    persona,
    page,
    tab,
    condition,
    ...prolific,
  });
};

export const trackProfileView = (resultId: string, platform: string, title: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'profile_view',
    elementType: 'profile',
    elementId: resultId,
    elementText: title,
    platform,
    persona,
    condition,
    ...prolific,
  });
};

export const trackProfileClose = (resultId: string, platform: string, persona: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'profile_close',
    elementType: 'profile',
    elementId: resultId,
    platform,
    persona,
    condition,
    ...prolific,
  });
};

/** Scroll-depth milestone (25/50/75/100 % of the results page), fired once per page+tab. */
export const trackScrollDepth = (depth: number, persona: string, page?: number, tab?: string, condition?: string, prolific?: ProlificParams) => {
  trackEvent({
    eventType: 'scroll',
    elementType: 'scroll',
    depth,
    persona,
    page,
    tab,
    condition,
    ...prolific,
  });
};

/** Tab/window visibility change — lets dwell time exclude periods spent in another tab. */
export const trackVisibility = (state: string, persona: string, page?: number, tab?: string, condition?: string, prolific?: ProlificParams) => {
  // 'hidden' may be the last thing before the tab dies, so beacon it
  const send = state === 'hidden' ? trackEventBeacon : trackEvent;
  send({
    eventType: 'visibility',
    elementType: 'visibility',
    visibility: state,
    persona,
    page,
    tab,
    condition,
    ...prolific,
  });
};

export const trackSessionEnd = (persona: string, page?: number, tab?: string, condition?: string, prolific?: ProlificParams) => {
  // Deliver anything still unacknowledged, then send the end marker via sendBeacon
  flushTrackingQueue();
  trackEventBeacon({
    eventType: 'session_end',
    elementType: 'session',
    persona,
    page,
    tab,
    condition,
    ...prolific,
  });
};
