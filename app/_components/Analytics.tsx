import Script from 'next/script';

// Self-hosted Umami, configured via NEXT_PUBLIC_UMAMI_SRC and
// NEXT_PUBLIC_UMAMI_WEBSITE_ID. NEXT_PUBLIC_ vars are inlined at build time, so
// a deploy without the website id set simply renders nothing rather than
// loading a script that would 404.
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const src =
  process.env.NEXT_PUBLIC_UMAMI_SRC ?? 'https://cloud.umami.is/script.js';

export function Analytics() {
  if (!websiteId) return null;
  return (
    <Script src={src} data-website-id={websiteId} strategy="afterInteractive" />
  );
}
