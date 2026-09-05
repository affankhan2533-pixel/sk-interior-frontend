import { useEffect, useRef } from "react";

/**
 * useParallax
 * Applies a subtle translateY parallax to a ref element on scroll.
 * speed: 0.1–0.3 (fraction of scroll delta to apply)
 */
export default function useParallax(ref, speed = 0.15) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ref || !ref.current) return;

    // Disable on touch devices and reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (navigator.maxTouchPoints > 1) return;

    let rafId = null;

    const update = () => {
      if (!ref.current) return;
      const scrollY = window.scrollY || window.pageYOffset;
      const rect = ref.current.parentElement
        ? ref.current.parentElement.getBoundingClientRect()
        : ref.current.getBoundingClientRect();
      const offset = (rect.top + scrollY - window.innerHeight / 2) * speed;
      ref.current.style.transform = "translateY(" + offset.toFixed(2) + "px)";
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
      if (ref.current) ref.current.style.transform = "";
    };
  }, [ref, speed]);
}
