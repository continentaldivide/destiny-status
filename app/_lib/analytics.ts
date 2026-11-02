type EventData = Record<string, string | number | boolean>;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: EventData) => void;
    };
  }
}

export type SearchOutcome = 'results' | 'no_results' | 'error';

// comfortably longer than any Bungie name, so this only trims accidental pastes
const MAX_QUERY_LENGTH = 100;

// umami is undefined if an ad blocker stopped the script, the website id isn't
// set, or the script hasn't finished loading.  Those events are simply dropped.
export function trackEvent(event: string, data?: EventData) {
  window.umami?.track(event, data);
}

export function trackSearch(
  username: string,
  outcome: SearchOutcome,
  resultCount: number
) {
  trackEvent('search', {
    query: username.trim().slice(0, MAX_QUERY_LENGTH),
    outcome,
    result_count: resultCount,
    has_name_code: username.includes('#'),
  });
}
