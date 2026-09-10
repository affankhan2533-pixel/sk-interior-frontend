import '../styles/globals.css';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PageTransition from '../components/PageTransition';
import CustomCursor from '../components/CustomCursor';
import LuxuryLoader from '../components/LuxuryLoader';
import FloatingWidgets from '../components/FloatingWidgets';
import useScrollProgress from '../lib/useScrollProgress';

function isAdminRoute(pathname) {
  return pathname.startsWith('/admin');
}

function AppInner({ Component, pageProps }) {
  // Activate scroll progress bar globally
  useScrollProgress();

  return <Component {...pageProps} />;
}

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const admin = isAdminRoute(router.pathname);

  return (
    <>
      {/* Luxury intro loader — session-once */}
      {!admin && <LuxuryLoader />}

      {!admin && <Navbar />}

      <PageTransition>
        <AppInner Component={Component} pageProps={pageProps} />
      </PageTransition>

      {!admin && <Footer />}
      {!admin && <FloatingWidgets />}
    </>
  );
}

