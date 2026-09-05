import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';

/**
 * PageTransition — Architectural reveal
 * Phase 1: thin gold line sweeps across
 * Phase 2: dark curtain covers viewport
 * Phase 3: new page renders behind it
 * Phase 4: curtain pulls away upward
 * Total: ~700ms max
 */
export default function PageTransition({ children }) {
  const router = useRouter();
  const [phase, setPhase] = useState('idle'); // idle | entering | exiting
  const timerRef = useRef(null);

  useEffect(() => {
    const clear = () => { if (timerRef.current) clearTimeout(timerRef.current); };

    const handleStart = (url) => {
      if (url === router.asPath) return;
      // Skip for reduced motion
      if (typeof window !== 'undefined' &&
          window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      clear();
      setPhase('entering');
    };

    const handleComplete = () => {
      clear();
      setPhase('exiting');
      timerRef.current = setTimeout(() => setPhase('idle'), 700);
    };

    const handleError = handleComplete;

    router.events.on('routeChangeStart',    handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError',    handleError);

    return () => {
      clear();
      router.events.off('routeChangeStart',    handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError',    handleError);
    };
  }, [router]);

  return (
    <>
      {/* Architectural transition overlay */}
      <div
        className={[
          'page-transition-overlay',
          phase === 'entering' ? 'is-entering' : '',
          phase === 'exiting'  ? 'is-exiting'  : '',
        ].filter(Boolean).join(' ')}
        aria-hidden="true"
      >
        <div className="page-transition-line"    />
        <div className="page-transition-curtain" />
      </div>

      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" />

      {children}
    </>
  );
}
