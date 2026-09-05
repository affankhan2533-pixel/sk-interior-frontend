import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor
 * Premium two-layer cursor (dot + ring) for desktop only.
 * Reads data-cursor attributes: "image", "card", "link", "explore", "view"
 * Disabled entirely on touch devices.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only activate on true pointer devices (desktop)
    const isTouch = window.matchMedia('(hover: none)').matches ||
                    navigator.maxTouchPoints > 1;
    if (isTouch) return;

    // Reduced motion — hide cursor elements
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.body.classList.add('custom-cursor-active');

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX  = -100;
    let ringY  = -100;
    let rafId  = null;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      // Ring lags behind dot with lerp
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);

      dot.style.transform  = 'translate(' + (mouseX - 3)  + 'px, ' + (mouseY - 3)  + 'px)';
      ring.style.transform = 'translate(' + (ringX  - 16) + 'px, ' + (ringY  - 16) + 'px)';

      rafId = requestAnimationFrame(animate);
    };

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnter = (e) => {
      const el = e.target.closest('[data-cursor]');
      const cursorType = el ? el.dataset.cursor : null;

      // Reset
      dot.className  = 'cursor-dot';
      ring.className = 'cursor-ring';
      setLabel('');

      if (!el) {
        // Check if it's a link or button
        if (e.target.closest('a') || e.target.closest('button')) {
          dot.className  += ' is-hovering-link';
          ring.className += ' is-hovering-link';
        }
        return;
      }

      if (cursorType === 'image') {
        dot.className  += ' is-hovering-image';
        ring.className += ' is-hovering-image';
        setLabel('View');
      } else if (cursorType === 'card' || cursorType === 'explore') {
        dot.className  += ' is-hovering-card';
        ring.className += ' is-hovering-card';
        setLabel('Explore');
      } else if (cursorType === 'drag') {
        dot.className  += ' is-hovering-card';
        ring.className += ' is-hovering-card';
        setLabel('Drag');
      } else {
        dot.className  += ' is-hovering-link';
        ring.className += ' is-hovering-link';
      }
    };

    const onMouseLeave = (e) => {
      dot.className  = 'cursor-dot';
      ring.className = 'cursor-ring';
      setLabel('');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseEnter);
    document.addEventListener('mouseout',  onMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseEnter);
      document.removeEventListener('mouseout',  onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        {label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}
