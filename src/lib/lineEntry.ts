const TRACKED_LINE_ENTRY_URL = 'https://webinar-test.root2studio.com/r/line-direct';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

export function trackedLineEntryUrl(entryVisit = '') {
  const destination = new URL(TRACKED_LINE_ENTRY_URL);
  if (typeof window === 'undefined') return destination.toString();

  const current = new URLSearchParams(window.location.search);
  for (const key of UTM_KEYS) {
    const value = current.get(key)?.trim();
    if (value) destination.searchParams.set(key, value);
  }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(entryVisit)) {
    destination.searchParams.set('entry_visit', entryVisit);
  }
  return destination.toString();
}
