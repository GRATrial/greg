// Tracking service for Google Simulation analytics
//
// 2026-09-13 hardening:
//  - every event carries seq (per-session counter) and sessionMs (ms since session start)
//  - fetch uses keepalive so events fired right before navigation survive
//  - failed sends are queued and retried once; the queue is flushed via sendBeacon on unload
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

const SESSION_KEY = 'google_sim_session_id';
const SESSION_START_KEY = 'google_sim_session_start';
const SEQ_KEY = 'google_sim_seq';
const API_URL = '/api/track';
const IS_DEV: boolean = Boolean((import.meta as any).env?.DEV);

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

// Stamp an event with timestamp / session / ordering metadata
const stamp = (event: Omit<TrackingEvent, 'timestamp' | 'sessionId' | 'seq' | 'sessionMs'>): TrackingEvent => ({
  ...event,
  timestamp: new Date().toISOString(),
  sessionId: getSessionId(),
  seq: nextSeq(),
  sessionMs: sessionMs(),
});

// ---- delivery: keepalive fetch, one retry, beacon flush on unload ----
const pending: TrackingEvent[] = [];

const sendBeacon = (event: TrackingEvent): boolean => {
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
      const blob = new Blob([JSON.stringify(event)], { type: 'application/json' });
      return navigator.sendBeacon(API_URL, blob);
    }
  } catch { /* fall through */ }
  return false;
};

/** Flush any undelivered events via sendBeacon (safe to call during unload). */
export const flushTrackingQueue = (): void => {
  while (pending.length) {
    const ev = pending.shift()!;
    sendBeacon(ev);
  }
};

const deliver = async (trackingEvent: TrackingEvent, attempt: number): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackingEvent),
      keepalive: true, // survive navigation triggered right after the event
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    if (IS_DEV) console.log('✅ Event tracked:', trackingEvent.eventType, trackingEvent.seq);
  } catch (error: any) {
    if (attempt < 1) {
      // one retry after a short delay; keep it in the queue meanwhile so an unload can beacon it
      pending.push(trackingEvent);
      setTimeout(() => {
        const idx = pending.indexOf(trackingEvent);
        if (idx !== -1) {
          pending.splice(idx, 1);
          void deliver(trackingEvent, attempt + 1);
        }
      }, 2000);
    } else {
      // last resort
      if (!sendBeacon(trackingEvent)) {
        console.error('❌ Tracking event lost:', {
          error: error?.message,
          event: trackingEvent,
          note: IS_DEV
            ? 'API endpoint only works when deployed to Vercel. Use "vercel dev" to test locally.'
            : 'Check Vercel function logs for details',
        });
      }
    }
  }
};

// Track an event
export const trackEvent = async (event: Omit<TrackingEvent, 'timestamp' | 'sessionId' | 'seq' | 'sessionMs'>): Promise<void> => {
  const trackingEvent = stamp(event);
  await deliver(trackingEvent, 0);
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
  trackEvent({
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
  // Deliver anything still queued, then send the end marker via sendBeacon (reliable during unload)
  flushTrackingQueue();
  const trackingEvent = stamp({
    eventType: 'session_end',
    elementType: 'session',
    persona,
    page,
    tab,
    condition,
    ...prolific,
  });
  if (!sendBeacon(trackingEvent)) {
    // sendBeacon unavailable — best effort
    void deliver(trackingEvent, 1);
  }
};
