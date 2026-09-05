import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import ProjectCard from '../components/ProjectCard';
import useParallax from '../lib/useParallax';
import { PROJECTS } from '../data/projects';

const SERVICES_DATA = [
  {
    id: 'residential',
    number: '01',
    title: 'RESIDENTIAL DESIGN',
    subtitle: 'Apartments · Villas · Private Residences',
    category: 'Residential',
    description:
      'We craft personal living environments that balance functional clarity with sensory warmth. From oceanfront apartments in Bandra to coastal villas in Alibaug, our residential practice is rooted in understanding how you move through your home.',
    deliverables: [
      'Space planning & layout optimisation',
      'Material curation & finish specification',
      'Custom furniture & millwork design',
      'Architectural lighting & acoustic plan',
      'Art curation & white-glove styling',
    ],
    image:
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['the-santacruz-residence', 'altitude-penthouse'],
  },
  {
    id: 'commercial',
    number: '02',
    title: 'COMMERCIAL INTERIORS',
    subtitle: 'Workplaces · Executive Suites · Showrooms',
    category: 'Commercial',
    description:
      'Work environments that embody brand identity while supporting focus, collaboration, and quiet prestige. We move away from generic corporate monotony to create workplaces that feel as considered as fine homes.',
    deliverables: [
      'Brand-aligned spatial strategy & zoning',
      'Executive suites & boardrooms',
      'Acoustic treatment & lighting integration',
      'Custom reception & pantry zones',
      'Turnkey site management & handover',
    ],
    image:
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['chapter-one-cafe', 'merit-office-campus'],
  },
  {
    id: 'hospitality',
    number: '03',
    title: 'HOSPITALITY DESIGN',
    subtitle: 'Hotels · Fine Dining · Lifestyle Venues',
    category: 'Hospitality',
    description:
      'Atmospheric spaces where guest experience is paramount. We engineer every touchpoint — from entry thresholds and seating arrangements to ambient lighting and tactile surfaces — creating memorable destinations.',
    deliverables: [
      'Concept direction & spatial narrative',
      'Seating, bar & circulation design',
      'Custom light fixtures & furniture',
      'Durable material specification',
      'Turnkey delivery & staging',
    ],
    image:
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['the-sea-villa', 'chapter-one-cafe'],
  },
  {
    id: 'space-planning',
    number: '04',
    title: 'SPACE PLANNING',
    subtitle: 'Spatial Flow · Volume Optimization · Daylight',
    category: 'Architecture',
    description:
      'Analyzing structural geometry and environmental orientation to establish intuitive circulation paths, maximizing natural daylight and seamless transitions between functional zones.',
    deliverables: [
      'Architectural floorplate optimization',
      'Spatial zoning & volume mapping',
      'Daylight orientation assessment',
      'Circulation & access modeling',
      'Furniture arrangement schematics',
    ],
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['altitude-penthouse', 'the-santacruz-residence'],
  },
  {
    id: 'material-consultation',
    number: '05',
    title: 'MATERIAL CONSULTATION',
    subtitle: 'Tactile Studies · Authentic Stone & Timber',
    category: 'Consultation',
    description:
      'Curating bespoke material palettes that respond to local climate, tactile sensory feel, and long-term durability. We source authentic natural stone, treated veneers, custom bronzes, and handcrafted plasters.',
    deliverables: [
      'Physical sample board curation',
      'Tactile & acoustic testing',
      'Finish specification & coding',
      'Custom plaster & patina development',
      'Sustainable material sourcing',
    ],
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['the-santacruz-residence', 'the-sea-villa'],
  },
  {
    id: 'turnkey-projects',
    number: '06',
    title: 'TURNKEY PROJECTS',
    subtitle: 'Site Supervision · BOQ · Key Handover',
    category: 'Execution',
    description:
      'End-to-end execution where we take absolute accountability for site coordination, artisan craftsmanship, quality assurance, procurement scheduling, and white-glove final delivery.',
    deliverables: [
      'Detailed GFC drawing production',
      'Full BOQ & procurement control',
      'On-site artisan supervision',
      'Timeline & budget governance',
      'White-glove handover & staging',
    ],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
    relatedSlugs: ['merit-office-campus', 'the-sea-villa'],
  },
];

const CAPABILITIES = [
  { number: '01', title: 'Space Planning', desc: 'Optimising floorplates for circulation, natural light, and intuitive living patterns.' },
  { number: '02', title: 'Interior Architecture', desc: 'Defining structural volume, wall treatments, ceiling detail, and spatial flow.' },
  { number: '03', title: 'Concept Development', desc: 'Establishing mood, material direction, and design language through visual studies.' },
  { number: '04', title: 'Material & Finish Selection', desc: 'Specifying authentic stone, timber, metal, and plaster that age with grace.' },
  { number: '05', title: 'Custom Furniture', desc: 'Bespoke joinery, millwork, and furniture engineered exclusively for your space.' },
  { number: '06', title: 'Lighting Design', desc: 'Layered architectural and decorative lighting plans for mood and functionality.' },
  { number: '07', title: 'Art & Styling', desc: 'Curating artworks, textiles, and decorative accessories for the final layer.' },
  { number: '08', title: 'Turnkey Execution', desc: 'Full site management, procurement tracking, and white-glove handover.' },
];

const PROCESS_PREVIEW = [
  { number: '01', title: 'Discover', desc: 'Brief, site audit & lifestyle consultation' },
  { number: '02', title: 'Define', desc: 'Spatial layouts, 3D renders & material boards' },
  { number: '03', title: 'Design', desc: 'Technical GFC drawings & itemised BOQs' },
  { number: '04', title: 'Detail', desc: 'Bespoke joinery specs & lighting schematics' },
  { number: '05', title: 'Deliver', desc: 'Site execution, white-glove key handover' },
];

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(0);

  const heroImgRef = useRef(null);
  useParallax(heroImgRef, 0.12);

  // Synchronized image & content transition (450–650ms)
  const handleServiceSelect = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
    setIsFading(true);

    const timer = setTimeout(() => {
      setDisplayedIndex(index);
      setIsFading(false);
    }, 280);

    return () => clearTimeout(timer);
  };

  const activeService = SERVICES_DATA[activeIndex];
  const displayedService = SERVICES_DATA[displayedIndex];

  // Fetch related projects for currently active service
  const relatedProjects = PROJECTS.filter((p) =>
    activeService.relatedSlugs.includes(p.slug)
  );

  return (
    <>
      <SEO
        title="Services — Interactive Service Experience"
        description="Explore interior architecture and design services by SK Interior — residential, commercial, hospitality, space planning, material consultation, and turnkey execution in Mumbai."
        canonical="/services"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 2 — EDITORIAL CINEMATIC SERVICES HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24"
          style={{ background: 'var(--color-bg)', paddingTop: '140px' }}
        >
          {/* Subtle Background Architectural Ambient Grid */}
          <div
            className="absolute inset-0 z-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 50% 50%, rgba(181, 154, 98, 0.12) 0%, transparent 70%)',
            }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal direction="up">
              <span className="section-label text-[#B59A62] mb-6 block tracking-[0.28em] font-semibold text-[10.5px]">
                SERVICE CATALOGUE &amp; PRACTICE
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <SectionReveal direction="up" delay={80}>
                  <h1
                    className="display-xl text-[#F3F1ED] uppercase font-light leading-[1.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    SPACES DESIGNED<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      WITH PURPOSE.
                    </span>
                  </h1>
                </SectionReveal>
              </div>

              <div className="lg:col-span-5">
                <SectionReveal direction="up" delay={160}>
                  <p
                    className="text-[15px] sm:text-[16.5px] leading-relaxed text-[#F3F1ED]/70 font-light max-w-lg mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    SK Interior crafts residential, commercial, and hospitality environments shaped around context, light, and how people live and work within them.
                  </p>
                  <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40">
                    <span>SELECT A SERVICE BELOW TO EXPLORE</span>
                    <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
                      <div className="w-1 h-1.5 bg-[#B59A62] rounded-full animate-bounce" />
                    </div>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 3–7 — DESKTOP INTERACTIVE SERVICE SELECTOR
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-b border-white/10 hidden lg:block"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            {/* Header / Selector Title */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                  INTERACTIVE CATALOGUE
                </span>
                <h2
                  className="text-2xl font-light text-[#F3F1ED]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Select a Discipline
                </h2>
              </div>
              <div className="text-[11px] font-mono text-[#F3F1ED]/40 tracking-wider">
                0{activeIndex + 1} / 0{SERVICES_DATA.length}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* ── Left Column: Compact Navigation Controls (Phase 3 & 4) ── */}
              <div className="col-span-5 space-y-3">
                {SERVICES_DATA.map((srv, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={srv.id}
                      onClick={() => handleServiceSelect(idx)}
                      className={`w-full text-left p-5 sm:p-6 rounded-xl transition-all duration-300 relative group overflow-hidden border ${
                        isActive
                          ? 'bg-[#B59A62]/10 border-[#B59A62] shadow-lg'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      {/* Active Indicator Line (Phase 4 & 7) */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-[#B59A62] transition-transform duration-300 origin-left ${
                          isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-75'
                        }`}
                      />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span
                            className={`font-mono text-sm font-semibold transition-colors ${
                              isActive ? 'text-[#B59A62]' : 'text-white/40 group-hover:text-white/70'
                            }`}
                          >
                            {srv.number}
                          </span>
                          <div>
                            <h3
                              className={`text-lg sm:text-xl font-light tracking-wide transition-colors ${
                                isActive ? 'text-[#F3F1ED] font-normal' : 'text-[#F3F1ED]/70 group-hover:text-[#F3F1ED]'
                              }`}
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {srv.title}
                            </h3>
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#B59A62]/70 font-mono block mt-0.5">
                              {srv.category}
                            </span>
                          </div>
                        </div>

                        {/* Arrow indicator with hover shift (Phase 7) */}
                        <div className="flex items-center gap-2">
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            viewBox="0 0 24 24"
                            className={`transition-all duration-300 ${
                              isActive
                                ? 'text-[#B59A62] translate-x-1.5'
                                : 'text-white/30 group-hover:text-white/80 group-hover:translate-x-1'
                            }`}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* ── Right Column: Showcase Visual & Dynamic Content (Phase 5 & 6) ── */}
              <div className="col-span-7 sticky top-28">
                {/* Image Showcase Wrapper with Fixed Aspect Ratio (Phase 5) */}
                <div className="relative ratio-16-9 sm:ratio-4-3 rounded-xl overflow-hidden shadow-strong border border-white/10 group mb-8 bg-[#0D0D0D]">
                  <div
                    className={`w-full h-full transition-all duration-500 ease-out transform ${
                      isFading ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
                    }`}
                    style={{
                      clipPath: isFading ? 'polygon(0 0, 100% 0, 100% 0, 0 0)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                      transitionProperty: 'opacity, transform, clip-path',
                    }}
                  >
                    <SafeImage
                      src={displayedService.image}
                      alt={displayedService.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-1">
                          DISCIPLINE {displayedService.number}
                        </span>
                        <span className="text-sm font-light text-[#F3F1ED]/80">
                          {displayedService.subtitle}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] tracking-widest text-[#B59A62] uppercase font-mono">
                        {displayedService.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Service Content Block (Phase 6) */}
                <div
                  className={`transition-all duration-500 ease-out transform ${
                    isFading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-3xl font-light text-[#B59A62]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {displayedService.number}
                    </span>
                    <span className="text-white/20">•</span>
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#F3F1ED]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {displayedService.title}
                    </h3>
                  </div>

                  <p
                    className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#F3F1ED]/75 font-light mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {displayedService.description}
                  </p>

                  {/* Deliverables Checklist */}
                  <div className="mb-8 pt-5 border-t border-white/10">
                    <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-4">
                      WHAT WE PROVIDE
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {displayedService.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 text-[13px] text-[#F3F1ED]/80 font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B59A62] flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Action */}
                  <div className="flex items-center gap-4">
                    <Link
                      href="/contact"
                      className="btn-arch btn-arch-primary inline-flex items-center gap-3"
                    >
                      <span>DISCUSS THIS SERVICE</span>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>

                    <a
                      href="#related-projects"
                      className="btn-arch btn-arch-secondary inline-flex items-center gap-2 text-xs"
                    >
                      <span>VIEW CASE STUDIES</span>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 8 & 9 — MOBILE INTERACTIVE SERVICE EXPERIENCE (ACCORDION)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-b border-white/10 block lg:hidden"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                INTERACTIVE ACCORDION
              </span>
              <h2
                className="text-2xl font-light text-[#F3F1ED]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Our Design Disciplines
              </h2>
            </div>

            <div className="space-y-4">
              {SERVICES_DATA.map((srv, idx) => {
                const isOpen = mobileOpenIndex === idx;

                return (
                  <div
                    key={srv.id}
                    className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
                      isOpen
                        ? 'bg-[#B59A62]/10 border-[#B59A62]'
                        : 'bg-white/[0.02] border-white/10'
                    }`}
                  >
                    {/* Mobile Header Button */}
                    <button
                      onClick={() => setMobileOpenIndex(isOpen ? -1 : idx)}
                      className="w-full text-left p-5 flex items-center justify-between"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`font-mono text-sm font-semibold ${
                            isOpen ? 'text-[#B59A62]' : 'text-white/40'
                          }`}
                        >
                          {srv.number}
                        </span>
                        <h3
                          className={`text-lg font-light ${
                            isOpen ? 'text-[#F3F1ED] font-normal' : 'text-[#F3F1ED]/80'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {srv.title}
                        </h3>
                      </div>

                      <div
                        className={`w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-sm transition-transform duration-300 ${
                          isOpen ? 'bg-[#B59A62] text-[#111111] border-[#B59A62] rotate-180' : 'text-white/60'
                        }`}
                      >
                        {isOpen ? '−' : '+'}
                      </div>
                    </button>

                    {/* Mobile Expanded Content (Phase 9) */}
                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-white/10 space-y-5 animate-fadeIn">
                        {/* 4:3 Mobile Image with Reveal */}
                        <div className="ratio-4-3 rounded-lg overflow-hidden relative shadow-md mt-4 border border-white/10">
                          <SafeImage
                            src={srv.image}
                            alt={srv.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded text-[9px] tracking-widest text-[#B59A62] uppercase font-mono">
                            {srv.subtitle}
                          </div>
                        </div>

                        <p
                          className="text-[14px] leading-relaxed text-[#F3F1ED]/80 font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {srv.description}
                        </p>

                        <div className="space-y-2 pt-2 border-t border-white/10">
                          <span className="text-[9px] tracking-[0.24em] uppercase text-[#B59A62] font-semibold block">
                            DELIVERABLES
                          </span>
                          {srv.deliverables.map((item) => (
                            <div
                              key={item}
                              className="flex items-center gap-2 text-xs text-[#F3F1ED]/70 font-light"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#B59A62]" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2">
                          <Link
                            href="/contact"
                            className="btn-arch btn-arch-full text-center"
                          >
                            <span>DISCUSS THIS SERVICE →</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 10 & 13 — SCOPE OF PRACTICE / CAPABILITIES GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding relative" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
            <SectionReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <span className="section-label mb-3 block text-[#B59A62]">
                    SCOPE OF PRACTICE
                  </span>
                  <h2
                    className="display-lg text-[#151515] uppercase font-light"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    DESIGN<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      CAPABILITIES.
                    </span>
                  </h2>
                </div>
                <p
                  className="text-xs sm:text-sm leading-relaxed text-[#6F6B65] font-light max-w-md"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Our studio integrates spatial planning, architectural joinery, custom furniture design, and white-glove site execution under one unified methodology.
                </p>
              </div>
            </SectionReveal>

            {/* Numbered Capabilities List Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {CAPABILITIES.map((cap, idx) => (
                <SectionReveal key={cap.number} delay={idx * 50}>
                  <div className="pt-6 border-t border-black/15 group hover:border-[#B59A62] transition-colors duration-300">
                    <span className="text-[#B59A62] font-mono text-xs font-semibold block mb-3">
                      {cap.number}
                    </span>
                    <h3
                      className="text-xl font-light text-[#151515] mb-2 group-hover:text-[#B59A62] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {cap.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed text-[#6F6B65] font-light"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {cap.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 14 & 15 — RELATED PROJECTS SHOWCASE
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="related-projects"
          className="section-padding relative"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="container-wide">
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
                <div>
                  <span className="section-label text-[#B59A62] mb-2 block">
                    SERVICE PORTFOLIO
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1ED]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Projects for{' '}
                    <span className="text-italic-serif text-[#B59A62]">
                      {activeService.title}
                    </span>
                  </h2>
                </div>

                <Link
                  href="/projects"
                  className="btn-arch btn-arch-secondary inline-flex items-center gap-2 self-start sm:self-auto"
                >
                  <span>VIEW ALL PROJECTS</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </SectionReveal>

            {/* Related Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {relatedProjects.map((project, idx) => (
                <SectionReveal key={project.slug} delay={idx * 100}>
                  <ProjectCard project={project} aspect="ratio-16-9" />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 16 — PROCESS PREVIEW SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-white/10"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
              <SectionReveal>
                <span className="section-label text-[#B59A62] mb-3 block">
                  METHODOLOGY PREVIEW
                </span>
                <h2
                  className="display-lg text-[#F3F1ED] font-light uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  FROM FIRST IDEA<br />
                  <span className="text-italic-serif text-[#B59A62]">
                    TO FINAL KEY.
                  </span>
                </h2>
              </SectionReveal>

              <SectionReveal delay={100}>
                <Link
                  href="/process"
                  className="btn-arch btn-arch-primary inline-flex items-center gap-3"
                >
                  <span>EXPLORE OUR PROCESS</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </SectionReveal>
            </div>

            {/* 5 Step Compact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {PROCESS_PREVIEW.map((step, idx) => (
                <SectionReveal key={step.number} delay={idx * 60}>
                  <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#B59A62]/50 transition-colors duration-300">
                    <span className="text-[#B59A62] font-mono text-xs font-semibold block mb-3">
                      {step.number}
                    </span>
                    <h3
                      className="text-xl font-light text-[#F3F1ED] mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-xs text-[#F3F1ED]/50 font-light leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 17 — EDITORIAL CONVERSION CTA SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 lg:py-36 bg-[#0A0A0A] text-[#F3F1ED] overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-20">
            <SafeImage
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
              alt="SK Interior background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />

          <div className="container-narrow relative z-10 text-center">
            <SectionReveal>
              <span className="section-label mb-6 block justify-center text-[#B59A62]">
                STARTING SOMETHING NEW?
              </span>

              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                HAVE A SPACE<br />
                <span className="text-italic-serif text-[#B59A62]">
                  IN MIND?
                </span>
              </h2>

              <p
                className="max-w-lg mx-auto text-[15px] sm:text-[16px] leading-relaxed text-[#F3F1ED]/60 font-light mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                Reach out to our studio team to discuss your project requirements, space specifications, and timelines.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  href="/contact"
                  className="btn-arch btn-arch-primary px-9 py-4 text-xs"
                >
                  <span>START A PROJECT</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Link
                  href="/projects"
                  className="btn-arch btn-arch-secondary px-9 py-4 text-xs"
                >
                  <span>EXPLORE PORTFOLIO</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
