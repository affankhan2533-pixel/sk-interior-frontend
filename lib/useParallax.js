import { useEffect } from "react";

/**
 * useParallax
 * Applies a subtle, viewport-relative translateY parallax offset to a ref element on scroll.
 * speed: 0.04–0.1 (fraction of viewport center delta)
 */
export default function useParallax(ref, speed = 0.06) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ref || !ref.current) return;

    // Disable on touch devices and reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navigator.maxTouchPoints > 1) return;

    const el = ref.current;
    let rafId = null;

    const update = () => {
      if (!el) return;
      const rect = el.parentElement
        ? el.parentElement.getBoundingClientRect()
        : el.getBoundingClientRect();
      
      const viewportHeight = window.innerHeight || 800;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      
      // Relative offset from screen center
      const centerOffset = elementCenter - viewportCenter;
      
      // Clamp offset to +/- 30px so inner image never overflows frame boundaries
      const maxOffset = 30;
      const rawOffset = centerOffset * (speed * 0.5);
      const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));

      el.style.transform = "translateY(" + offset.toFixed(2) + "px)";
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (el) el.style.transform = "";
    };
  }, [ref, speed]);
}

