import { useEffect, useRef, useState } from "react";

/**
 * useCountUp
 * Counts from 0 to target when the element enters the viewport.
 * Runs once only. Uses quadratic-out easing via requestAnimationFrame.
 */
export default function useCountUp(target, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (hasRun.current) return;

    // Skip animation for reduced motion, show target immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            observer.unobserve(el);

            let startTime = null;

            const animate = (ts) => {
              if (!startTime) startTime = ts;
              const elapsed = ts - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Quadratic-out easing
              const eased = 1 - (1 - progress) * (1 - progress);
              setValue(Math.floor(eased * target));

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setValue(target);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );

    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [target, duration]);

  return { ref, value };
}
