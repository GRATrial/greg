// Engagement listeners: scroll-depth milestones + tab visibility.
// Added 2026-09-13. Used by GoogleSimulation.tsx via useEngagementTracking(...).
import { useEffect, useRef } from 'react';
import { trackScrollDepth, trackVisibility, flushTrackingQueue, type ProlificParams } from './tracking';

const MILESTONES = [25, 50, 75, 100];

/**
 * Registers window-level listeners for the lifetime of the component.
 * - scroll: fires a 'scroll' event once per (page, tab, milestone) as the participant reaches
 *   25/50/75/100 % of the results page. A short page that fits on screen records 100 immediately.
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
    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable <= 0 ? 100 : Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const m of MILESTONES) {
        const key = `${page}|${tab}|${m}`;
        if (pct >= m && !fired.current.has(key)) {
          fired.current.add(key);
          trackScrollDepth(m, persona, page, tab, condition, prolific);
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(check);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const initial = window.setTimeout(check, 600); // record initial depth once content has laid out
    return () => {
      window.removeEventListener('scroll', onScroll);
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
