import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

/**
 * PageTransition
 * Non-blocking, instant page transitions with top gold progress bar indicator.
 * Prevents full-screen black overlay issues during client-side navigation.
 */
export default function PageTransition({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };

    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  return (
    <>
      {/* Top Gold Navigation Loading Line */}
      <div
        id="route-progress-bar"
        className={`fixed top-0 left-0 right-0 h-[3px] bg-[#B59A62] z-[999999] transition-all duration-300 pointer-events-none ${
          loading ? 'opacity-100 w-full' : 'opacity-0 w-0'
        }`}
        style={{
          boxShadow: '0 0 10px rgba(181, 154, 98, 0.8)',
        }}
        aria-hidden="true"
      />

      {children}
    </>
  );
}

