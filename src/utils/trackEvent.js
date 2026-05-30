/**
 * Trail Canarias — Event Tracking Utility
 * Logs events to console and persists last 100 to localStorage.
 */

export function trackEvent(eventName, payload = {}) {
  const event = {
    eventName,
    payload,
    createdAt: new Date().toISOString(),
  };

  console.log('[trackEvent]', event);

  try {
    const previous = JSON.parse(localStorage.getItem('trailcanarias_events') || '[]');
    localStorage.setItem(
      'trailcanarias_events',
      JSON.stringify([event, ...previous].slice(0, 100))
    );
  } catch (e) {
    // localStorage might be unavailable
  }
}
