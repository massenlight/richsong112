type TrackingResponse = {
  ok?: boolean;
  entryVisit?: string;
};

const API_BASE_URL = 'https://webinar-test.root2studio.com';
const VISIT_KEY_PREFIX = 'shifeng-direct-line-entry-visit-v1';
let landingVisitPromise: Promise<string> | null = null;

function validVisitId(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function campaignData() {
  const params = new URLSearchParams(window.location.search);
  return {
    sourceSlug: 'line-direct',
    sourcePage: `${window.location.origin}${window.location.pathname}`,
    utmSource: params.get('utm_source') || '',
    utmMedium: params.get('utm_medium') || '',
    utmCampaign: params.get('utm_campaign') || '',
    utmContent: params.get('utm_content') || '',
    utmTerm: params.get('utm_term') || '',
  };
}

function storageKey(data: ReturnType<typeof campaignData>) {
  const signature = [data.utmSource, data.utmMedium, data.utmCampaign, data.utmContent].join('|');
  return `${VISIT_KEY_PREFIX}:${encodeURIComponent(signature).slice(0, 500)}`;
}

function storedVisit(data: ReturnType<typeof campaignData>) {
  try {
    const value = window.sessionStorage.getItem(storageKey(data)) || '';
    return validVisitId(value) ? value : '';
  } catch {
    return '';
  }
}

function safeReferrer() {
  if (!document.referrer) return '';
  try {
    const url = new URL(document.referrer);
    return `${url.origin}${url.pathname}`;
  } catch {
    return '';
  }
}

export function ensureDirectLandingVisit() {
  if (landingVisitPromise) return landingVisitPromise;
  landingVisitPromise = (async () => {
    const data = campaignData();
    const remembered = storedVisit(data);
    const response = await fetch(`${API_BASE_URL}/api/public/landing-events`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        entryVisit: remembered,
        referrer: safeReferrer(),
        ...data,
      }),
      keepalive: true,
    });
    const result = (await response.json().catch(() => ({}))) as TrackingResponse;
    const visitId = result.entryVisit || remembered;
    if (!response.ok || !validVisitId(visitId)) return remembered;
    try {
      window.sessionStorage.setItem(storageKey(data), visitId);
    } catch {
      // Tracking failure must never block the LINE journey.
    }
    return visitId;
  })().catch(() => '');
  return landingVisitPromise;
}
