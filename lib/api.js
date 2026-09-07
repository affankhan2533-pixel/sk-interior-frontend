/**
 * Centralised API configuration.
 * All frontend components must import from here — never hardcode URLs.
 *
 * NEXT_PUBLIC_API_URL     → e.g. http://localhost:5000/api  (or /api via next.config.js rewrite)
 * NEXT_PUBLIC_BACKEND_URL → e.g. http://localhost:5000      (for /uploads image paths)
 */

export const API =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const DEFAULT_FALLBACK_IMAGE = '/images/placeholder.svg';
export const HERO_FALLBACK_IMAGE = '/images/hero-fallback.svg';

/**
 * Resolve an image URL that may be a backend /uploads path, relative path, or external URL.
 */
export function resolveImageSrc(url, fallback = DEFAULT_FALLBACK_IMAGE) {
  if (!url || typeof url !== 'string' || url.trim() === '') {
    return fallback;
  }
  const cleanUrl = url.trim();
  if (cleanUrl.startsWith('/uploads')) {
    return `${BACKEND}${cleanUrl}`;
  }
  return cleanUrl;
}

