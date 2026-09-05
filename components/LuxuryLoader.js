import { useEffect, useState } from 'react';

/**
 * LuxuryLoader
 * Short cinematic intro loader: SK → INTERIOR → progress line → fade out.
 * Max ~1.4s. Shown only once per session via sessionStorage.
 */
export default function LuxuryLoader() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Session check — only show once
    let shown = false;
    try {
      shown = !!sessionStorage.getItem('sk_loader_shown');
    } catch (_) {}

    if (shown) return;

    // Mark as shown
    try { sessionStorage.setItem('sk_loader_shown', '1'); } catch (_) {}

    setVisible(true);

    // Total loader duration: 1300ms + 600ms exit
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1300);

    const removeTimer = setTimeout(() => {
      setVisible(false);
    }, 1900);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      id="luxury-loader"
      className={exiting ? 'loader-exiting' : ''}
      aria-hidden="true"
      aria-label="Loading SK Interior"
    >
      <div className="text-center">
        <p className="loader-sk">SK</p>
        <p className="loader-interior">Interior</p>
        <div className="loader-progress-track">
          <div className="loader-progress-fill" />
        </div>
        <p className="loader-tagline">Luxury Interior Design · Mumbai</p>
      </div>
    </div>
  );
}
