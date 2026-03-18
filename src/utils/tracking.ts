// Tracking service for Google Simulation analytics

export interface TrackingEvent {
  eventType: 'click' | 'search' | 'page_view' | 'tab_change' | 'pagination' | 'profile_view' | 'profile_close' | 'session_end';
  elementType: string; // 'result_card' | 'image' | 'pagination' | 'tab' | 'search' | etc.
  elementId?: string;
  elementText?: string;
  url?: string;
  platform?: string;
  persona: string; // 'greg' | 'meredith' | 'tremayne' | 'tanisha'
  timestamp: string | Date; // ISO string when sending, Date when receiving
  sessionId?: string;
  page?: number;
  tab?: string;
  searchQuery?: string;
  condition?: string; // 'present' | 'absent' - footprint condition
}

// Generate or retrieve session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('google_sim_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('google_sim_session_id', sessionId);
  }
  return sessionId;
};

// Track an event
export const trackEvent = async (event: Omit<TrackingEvent, 'timestamp' | 'sessionId'>): Promise<void> => {
  const trackingEvent = {
    ...event,
    timestamp: new Date().toISOString(), // Convert to ISO string for JSON serialization
    sessionId: getSessionId(),
  };

  try {
    // Always use relative URL - Vercel will handle routing
    const apiUrl = '/api/track';
    
    console.log('Sending tracking event:', trackingEvent);
    
    // Send to API endpoint
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(trackingEvent),
    });

    const responseText = await response.text();
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = { raw: responseText };
    }

    if (!response.ok) {
      console.error('❌ Failed to track event:', {
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        event: trackingEvent,
        url: apiUrl
      });
    } else {
      console.log('✅ Event tracked successfully:', responseData);
    }
  } catch (error: any) {
    // Log error but don't interrupt user experience
    console.error('❌ Tracking error:', {
      error: error.message,
      stack: error.stack,
      event: trackingEvent,
      note: import.meta.env.DEV 
        ? 'API endpoint only works when deployed to Vercel. Use "vercel dev" to test locally.'
        : 'Check Vercel function logs for details'
    });
  }
};

// Helper functions for common tracking scenarios
export const trackResultClick = (resultId: string, platform: string, title: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'click',
    elementType: 'result_card',
    elementId: resultId,
    elementText: title,
    platform,
    persona,
    condition,
  });
};

export const trackImageClick = (imageId: string, imageTitle: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'click',
    elementType: 'image',
    elementId: imageId,
    elementText: imageTitle,
    persona,
    condition,
  });
};

export const trackTabChange = (tab: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'tab_change',
    elementType: 'tab',
    elementText: tab,
    persona,
    tab,
    condition,
  });
};

export const trackPagination = (page: number, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'pagination',
    elementType: 'pagination',
    persona,
    page,
    condition,
  });
};

export const trackSearch = (query: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'search',
    elementType: 'search',
    searchQuery: query,
    persona,
    condition,
  });
};

export const trackPageView = (persona: string, page?: number, tab?: string, condition?: string) => {
  trackEvent({
    eventType: 'page_view',
    elementType: 'page',
    persona,
    page,
    tab,
    condition,
  });
};

export const trackProfileView = (resultId: string, platform: string, title: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'profile_view',
    elementType: 'profile',
    elementId: resultId,
    elementText: title,
    platform,
    persona,
    condition,
  });
};

export const trackProfileClose = (resultId: string, platform: string, persona: string, condition?: string) => {
  trackEvent({
    eventType: 'profile_close',
    elementType: 'profile',
    elementId: resultId,
    platform,
    persona,
    condition,
  });
};

export const trackSessionEnd = (persona: string, page?: number, tab?: string, condition?: string) => {
  // Use sendBeacon for reliability during page unload
  const trackingEvent = {
    eventType: 'session_end',
    elementType: 'session',
    persona,
    page,
    tab,
    condition,
    timestamp: new Date().toISOString(),
    sessionId: (() => {
      let sessionId = sessionStorage.getItem('google_sim_session_id');
      return sessionId || 'unknown';
    })(),
  };

  try {
    const blob = new Blob([JSON.stringify(trackingEvent)], { type: 'application/json' });
    navigator.sendBeacon('/api/track', blob);
    console.log('📤 Session end beacon sent:', trackingEvent);
  } catch (error) {
    console.error('❌ Session end tracking error:', error);
  }
};
