/**
 * Trail Canarias — Event Tracking Utility
 * Logs events to console and persists last 100 to localStorage.
 * Safe for environments where localStorage is unavailable.
 */

export function trackEvent(eventName, payload = {}) {
  const event = {
    eventName,
    payload,
    createdAt: new Date().toISOString(),
  };

  try {
    console.log('[trackEvent]', event);
  } catch (_) {}

  try {
    const previous = JSON.parse(localStorage.getItem('trailcanarias_events') || '[]');
    localStorage.setItem(
      'trailcanarias_events',
      JSON.stringify([event, ...previous].slice(0, 100))
    );
  } catch (_) {
    // localStorage might be unavailable (private browsing, etc.)
  }
}
