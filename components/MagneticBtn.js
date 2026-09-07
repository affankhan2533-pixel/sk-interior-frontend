import { useRef, useEffect, useCallback } from 'react';

/**
 * MagneticBtn
 * Wraps children with a subtle magnetic hover effect.
 * Max movement: X ±8px, Y ±6px
 * Returns smoothly via CSS transition on mouseleave.
 * Disabled on touch devices.
 */
export default function MagneticBtn({ children, className = '', strength = 0.35 }) {
  const wrapRef  = useRef(null);
  const innerRef = useRef(null);

  const isTouch = useCallback(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(hover: none)').matches ||
           navigator.maxTouchPoints > 1 ||
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  useEffect(() => {
    if (isTouch()) return;

    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const MAX_X = 8;
    const MAX_Y = 6;

    const onMouseMove = (e) => {
      const rect   = wrap.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = ((e.clientX - cx) / (rect.width  / 2));
      const dy     = ((e.clientY - cy) / (rect.height / 2));
      const moveX  = dx * MAX_X * strength;
      const moveY  = dy * MAX_Y * strength;

      wrap.style.transform  = 'translate(' + (moveX * 0.5).toFixed(2) + 'px, ' + (moveY * 0.5).toFixed(2) + 'px)';
      inner.style.transform = 'translate(' + (moveX * 0.5).toFixed(2) + 'px, ' + (moveY * 0.5).toFixed(2) + 'px)';
    };

    const onMouseLeave = () => {
      wrap.style.transform  = '';
      inner.style.transform = '';
    };

    wrap.addEventListener('mousemove',  onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrap.removeEventListener('mousemove',  onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isTouch, strength]);

  return (
    <span ref={wrapRef} className={'magnetic-wrap ' + className}>
      <span ref={innerRef} className="magnetic-inner">
        {children}
      </span>
    </span>
  );
}
