import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/journal', label: 'Journal' },
];

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Track scroll position for navbar background change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false);
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  // Lock body scroll when mobile menu is open & listen for Escape key
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Main Top Navbar ── */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          scrolled
            ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-1'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-2'
        }`}
        aria-label="Main navigation"
      >
        <div className="section-shell">
          <div className="flex items-center justify-between h-[76px] lg:h-[88px] px-4 sm:px-0">

            {/* Main Studio Logo */}
            <Link
              href="/"
              className="flex flex-col items-start group py-1"
              aria-label="SK Interior — Home"
            >
              <div className="flex items-center gap-2">
                <span
                  className="text-[1.4rem] sm:text-[1.6rem] lg:text-[1.75rem] font-light tracking-[0.10em] uppercase text-[#F3F1ED] group-hover:text-[#B59A62] transition-colors duration-300"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  SK Interior
                </span>
              </div>
              <span
                className="text-[8px] sm:text-[9px] tracking-[0.32em] uppercase font-bold text-[#B59A62] mt-[-2px] block"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                STUDIO · SANTACRUZ, MUMBAI
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-7 xl:gap-9">
              {NAV_LINKS.map(({ href, label }) => {
                const active = isActive(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`relative text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 py-1 ${
                      active
                        ? 'text-[#B59A62]'
                        : 'text-[#F3F1ED]/80 hover:text-[#F3F1ED]'
                    }`}
                  >
                    <span>{label}</span>
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B59A62]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* CTA — Desktop */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#B59A62]/60 text-[#F3F1ED] text-[9.5px] tracking-[0.22em] uppercase font-semibold hover:bg-[#B59A62] hover:text-[#111111] hover:border-[#B59A62] transition-all duration-300 shadow-md"
              >
                <span>START A PROJECT</span>
              </Link>

              {/* Hamburger — Mobile/Tablet */}
              <button
                type="button"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-nav"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex flex-col items-end justify-center gap-[5px] w-10 h-10 lg:hidden text-[#F3F1ED] hover:text-[#B59A62] transition-colors"
              >
                <span
                  className={`block h-[2px] bg-current transition-all duration-350 ${
                    menuOpen ? 'w-5 translate-y-[8px] rotate-45' : 'w-6'
                  }`}
                />
                <span
                  className={`block h-[2px] bg-current transition-all duration-350 ${
                    menuOpen ? 'w-5 opacity-0' : 'w-4'
                  }`}
                />
                <span
                  className={`block h-[2px] bg-current transition-all duration-350 ${
                    menuOpen ? 'w-5 -translate-y-[8px] -rotate-45' : 'w-6'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <div
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`fixed inset-0 z-[9998] flex flex-col transition-all duration-700 ${
          menuOpen ? 'open' : ''
        }`}
        style={{
          background: '#0D0D0D',
          pointerEvents: menuOpen ? 'auto' : 'none',
          clipPath: menuOpen
            ? 'circle(150% at calc(100% - 40px) 44px)'
            : 'circle(0% at calc(100% - 40px) 44px)',
          transition: 'clip-path 0.7s cubic-bezier(0.65, 0, 0.35, 1)',
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-6 pt-7">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-[#F3F1ED]/70 hover:text-[#B59A62] transition-colors"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-12 gap-1">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`block py-4 border-b border-white/10 transition-colors duration-300 ${
                isActive(href) ? 'text-[#B59A62]' : 'text-[#F3F1ED]/80 hover:text-[#F3F1ED]'
              }`}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                fontWeight: 400,
                transitionDelay: menuOpen ? `${i * 60}ms` : '0ms',
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 0.5s ease ${i * 60}ms, transform 0.5s ease ${i * 60}ms, color 0.2s ease`,
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-8 inline-flex items-center justify-center py-4 rounded-full bg-[#B59A62] text-[#111111] text-[11px] tracking-[0.28em] uppercase font-bold shadow-lg"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.5s ease ${NAV_LINKS.length * 60 + 80}ms, transform 0.5s ease ${NAV_LINKS.length * 60 + 80}ms`,
            }}
          >
            Start a Project →
          </Link>
        </div>

        {/* Footer in mobile menu */}
        <div className="px-8 pb-10 text-[#F3F1ED]/40 text-[10px] tracking-[0.2em] uppercase font-semibold">
          <p>hello@skinterior.in · 98707 60240</p>
        </div>
      </div>
    </>
  );
}
