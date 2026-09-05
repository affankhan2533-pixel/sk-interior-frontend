import { useEffect, useRef, useState } from "react";

/**
 * SectionReveal — Fixed & Upgraded
 *
 * direction: "up" | "left" | "right" | "scale" | "clip"
 *
 * IMPORTANT: For direction="clip" we use a TWO-LEVEL wrapper:
 *   - Outer div is the IntersectionObserver target (always visible to browser)
 *   - Inner div carries the clip-path animation (.img-reveal-inner)
 *   This ensures the observer can actually see the element even when
 *   the clip-path would otherwise make it appear zero-width.
 *
 * Fallback: If JS fails or takes >3s, a CSS @keyframes backup makes
 * content visible after 3s via .reveal-fallback.
 */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef(null);

  // Adaptive threshold: lower on mobile so reveals fire reliably
  const getThreshold = () => {
    if (threshold !== undefined) return threshold;
    if (typeof window !== "undefined" && window.innerWidth < 768) return 0.05;
    return 0.12;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const t = getThreshold();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      { threshold: t, rootMargin: "0px 0px -40px 0px" }
    );

    const el = domRef.current;
    if (el) observer.observe(el);

    // Safety fallback: make visible after 4s even if observer fails
    const safetyTimer = setTimeout(() => setIsVisible(true), 4000);

    return () => {
      if (el) observer.unobserve(el);
      clearTimeout(safetyTimer);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── clip direction: uses a two-level wrapper ──
  if (direction === "clip") {
    return (
      <div
        ref={domRef}
        className={"img-reveal-container " + className}
        style={{ "--delay": delay + "ms" }}
      >
        <div className={"img-reveal-inner" + (isVisible ? " is-visible" : "")}>
          {children}
        </div>
      </div>
    );
  }

  // ── Standard directions: up / left / right / scale ──
  const classMap = {
    left:  "section-reveal-left",
    right: "section-reveal-right",
    scale: "section-reveal-scale",
    up:    "section-reveal-up",
  };

  const baseClass = classMap[direction] || "section-reveal-up";

  return (
    <div
      ref={domRef}
      className={[baseClass, isVisible ? "is-visible" : "", className]
        .filter(Boolean)
        .join(" ")}
      style={{ "--delay": delay + "ms" }}
    >
      {children}
    </div>
  );
}
