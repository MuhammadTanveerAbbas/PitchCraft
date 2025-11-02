// Analytics utilities for tracking user behavior

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') return;
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, properties);
  }
  
  // Store events in localStorage for analysis
  try {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    events.push({
      event: eventName,
      properties,
      timestamp: new Date().toISOString(),
    });
    
    // Keep only last 100 events
    if (events.length > 100) {
      events.shift();
    }
    
    localStorage.setItem('analytics_events', JSON.stringify(events));
  } catch (e) {
    console.error('Analytics error:', e);
  }
  
  // Add your analytics provider here (Google Analytics, Mixpanel, etc.)
  // Example: window.gtag?.('event', eventName, properties);
};

export const trackPageView = (url: string) => {
  trackEvent('page_view', { url });
};

export const trackPitchGeneration = (data: {
  industry?: string;
  teamSize?: string;
  budget?: string;
  timeline?: string;
  success: boolean;
  duration?: number;
}) => {
  trackEvent('pitch_generated', data);
};

export const trackExport = (format: string) => {
  trackEvent('pitch_exported', { format });
};

export const trackError = (error: string, context?: string) => {
  trackEvent('error_occurred', { error, context });
};

export const getAnalytics = () => {
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem('analytics_events') || '[]');
  } catch {
    return [];
  }
};

export const clearAnalytics = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('analytics_events');
};
