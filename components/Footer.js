import Link from 'next/link';

const FOOTER_PAGES = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/projects', label: 'Projects' },
  { href: '/process', label: 'Process' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

const FOOTER_SERVICES = [
  'Residential Design',
  'Commercial Interiors',
  'Hospitality Design',
  'Space Planning',
  'Material Consultation',
  'Turnkey Projects',
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: 'var(--color-bg)' }}
      aria-label="Site footer"
    >
      {/* Top divider */}
      <div className="divider-light" />

      <div className="container-wide py-10 lg:py-20">
        {/* Main grid — 2 columns on mobile for tight rhythm */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">

          {/* Brand Column — full width on mobile */}
          <div className="col-span-2 lg:col-span-1 mb-2 lg:mb-0">
            <Link href="/" className="block" aria-label="SK Interior home">
              <span
                className="text-[1.35rem] lg:text-[1.5rem] text-[#F3F1ED] font-light tracking-[0.10em] uppercase block"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SK Interior
              </span>
              <span className="text-[8px] tracking-[0.36em] uppercase text-[#F3F1ED]/40 mt-[-2px] block">
                Design Studio · Mumbai
              </span>
            </Link>

            <p className="text-[#F3F1ED]/40 text-[12.5px] leading-relaxed mt-4 font-light max-w-[240px]">
              A premium interior design studio creating considered spaces in Mumbai and beyond.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-5">
              {[
                {
                  label: 'Instagram',
                  href: 'https://instagram.com',
                  icon: (
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                    </svg>
                  ),
                },
                {
                  label: 'Pinterest',
                  href: 'https://pinterest.com',
                  icon: (
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.853 0 1.267.641 1.267 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.563 0-2.388-1.716-4.058-4.164-4.058-2.837 0-4.5 2.127-4.5 4.326 0 .857.33 1.775.742 2.277a.3.3 0 0 1 .069.285c-.076.31-.245.995-.278 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.966-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://linkedin.com',
                  icon: (
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[#F3F1ED]/40 hover:text-[#B59A62] hover:border-[#B59A62]/40 transition-colors duration-300"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Pages Column — 1 col on mobile */}
          <div className="col-span-1">
            <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#B59A62] mb-4">
              Pages
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_PAGES.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[#F3F1ED]/45 text-[12.5px] hover:text-[#F3F1ED]/90 transition-colors duration-300 link-underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column — 1 col on mobile */}
          <div className="col-span-1">
            <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#B59A62] mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-[#F3F1ED]/45 text-[12.5px] hover:text-[#F3F1ED]/90 transition-colors duration-300"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column — full width on mobile */}
          <div className="col-span-2 lg:col-span-1 mt-4 lg:mt-0 pt-6 lg:pt-0 border-t border-white/5 lg:border-t-0">
            <h4 className="text-[9px] tracking-[0.3em] uppercase font-semibold text-[#B59A62] mb-4">
              Get in Touch
            </h4>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 text-[12.5px]">
              <div>
                <p className="text-[#F3F1ED]/30 text-[9.5px] uppercase tracking-[0.18em] mb-1">Address</p>
                <p className="text-[#F3F1ED]/60 leading-relaxed">
                  25-B, New Kantwadi Rd,<br />
                  Santacruz West, Mumbai 400054
                </p>
              </div>
              <div>
                <p className="text-[#F3F1ED]/30 text-[9.5px] uppercase tracking-[0.18em] mb-1">Phone</p>
                <a href="tel:9870760240" className="text-[#F3F1ED]/60 hover:text-[#B59A62] transition-colors block">
                  98707 60240
                </a>
                <a href="tel:9167401020" className="text-[#F3F1ED]/60 hover:text-[#B59A62] transition-colors block">
                  091674 01020
                </a>
              </div>
              <div>
                <p className="text-[#F3F1ED]/30 text-[9.5px] uppercase tracking-[0.18em] mb-1">Email</p>
                <a
                  href="mailto:hello@skinterior.in"
                  className="text-[#F3F1ED]/60 hover:text-[#B59A62] transition-colors"
                >
                  hello@skinterior.in
                </a>
              </div>
              <div>
                <p className="text-[#F3F1ED]/30 text-[9.5px] uppercase tracking-[0.18em] mb-1">Hours</p>
                <p className="text-[#F3F1ED]/60">Mon – Sat · 10am – 7pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="divider-light" />
      <div className="container-wide py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#F3F1ED]/20 text-[11px] tracking-[0.12em]">
            © {year} SK Interior. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[#F3F1ED]/20 text-[11px] tracking-[0.12em]">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
