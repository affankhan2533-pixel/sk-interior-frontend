import Head from 'next/head';

const SITE_NAME = 'SK Interior';
const DEFAULT_DESCRIPTION =
  'SK Interior is a premium interior design and architecture studio in BKC, Mumbai. Specialising in residential, commercial, and hospitality projects.';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80';
const CANONICAL_BASE = 'https://skinterior.in';

/**
 * Reusable SEO component — use inside every page component.
 *
 * @param {string} title         — Page title (will be appended with " | SK Interior")
 * @param {string} description   — Meta description (max ~155 chars)
 * @param {string} canonical     — Canonical path, e.g. "/about" (base URL prepended automatically)
 * @param {string} ogImage       — Absolute URL to OG image
 * @param {string} ogType        — OG type, default "website"
 * @param {boolean} noIndex      — Set true for admin / private pages
 */
export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noIndex = false,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Luxury Interior Design Studio, Mumbai`;
  const canonicalUrl = canonical ? `${CANONICAL_BASE}${canonical}` : CANONICAL_BASE;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonicalUrl} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonicalUrl} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Head>
  );
}
