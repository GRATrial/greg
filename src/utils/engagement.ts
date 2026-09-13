// Engagement listeners: scroll-depth milestones + tab visibility.
// Added 2026-09-13. Used by GoogleSimulation.tsx via useEngagementTracking(...).
import { useEffect, useRef } from 'react';
import { trackScrollDepth, trackVisibility, flushTrackingQueue, type ProlificParams } from './tracking';

const MILESTONES = [25, 50, 75, 100];
const THROTTLE_MS = 150;

/** Current scroll depth as a percentage of the scrollable range (100 when the page fits on screen). */
const currentDepth = (): number => {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  const y = window.scrollY || window.pageYOffset || doc.scrollTop || 0;
  if (y + window.innerHeight >= doc.scrollHeight - 2) return 100; // at the bottom (tolerate sub-pixel rounding)
  return Math.min(100, Math.floor((y / scrollable) * 100));
};

/**
 * Registers window-level listeners for the lifetime of the component.
 * - scroll: fires a 'scroll' event once per (page, tab, milestone) as the participant reaches
 *   25/50/75/100 % of the results page. A short page that fits on screen records 100 immediately.
 *   Throttled with setTimeout (not requestAnimationFrame) so it keeps working in a background tab.
 * - visibilitychange: fires a 'visibility' event with 'hidden' / 'visible' so dwell time can
 *   exclude time spent in another tab; also flushes any queued events when the tab is hidden.
 * - pagehide: flushes queued events (covers mobile browsers that skip beforeunload).
 */
export function useEngagementTracking(
  persona: string,
  page: number,
  tab: string,
  condition: string | undefined,
  prolific: ProlificParams,
): void {
  const fired = useRef<Set<string>>(new Set());

  useEffect(() => {
    let timer: number | null = null;
    let maxSeen = 0;
    const check = () => {
      timer = null;
      const pct = currentDepth();
      if (pct > maxSeen) maxSeen = pct; // record the deepest point reached, even if the user scrolled back up
      for (const m of MILESTONES) {
        const key = `${page}|${tab}|${m}`;
        if (maxSeen >= m && !fired.current.has(key)) {
          fired.current.add(key);
          trackScrollDepth(m, persona, page, tab, condition, prolific);
        }
      }
    };
    const onScroll = () => {
      // sample immediately (so the deepest point is not missed) and again after the throttle window
      const pct = currentDepth();
      if (pct > maxSeen) maxSeen = pct;
      if (timer === null) timer = window.setTimeout(check, THROTTLE_MS);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const initial = window.setTimeout(check, 600); // record initial depth once content has laid out
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timer !== null) window.clearTimeout(timer);
      window.clearTimeout(initial);
    };
  }, [persona, page, tab, condition, prolific]);

  useEffect(() => {
    const onVisibility = () => {
      trackVisibility(document.visibilityState, persona, page, tab, condition, prolific);
      if (document.visibilityState === 'hidden') flushTrackingQueue();
    };
    const onPageHide = () => flushTrackingQueue();
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', onPageHide);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
    };
  }, [persona, page, tab, condition, prolific]);
}
