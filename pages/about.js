import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import ProjectCard from '../components/ProjectCard';
import useParallax from '../lib/useParallax';
import { PROJECTS } from '../data/projects';

const DESIGN_PRINCIPLES = [
  {
    id: 'context',
    number: '01',
    title: 'CONTEXT',
    subtitle: 'Surrounding & Architectural Shell',
    body: 'Every space should belong to its surroundings. We study light, architectural proportion, and regional context before drawing a single line.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'function',
    number: '02',
    title: 'FUNCTION',
    subtitle: 'Effortless Living & Spatial Flow',
    body: 'Beautiful spaces must work effortlessly. Layouts are engineered around daily rituals, intuitive circulation, and integrated storage.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'materiality',
    number: '03',
    title: 'MATERIALITY',
    subtitle: 'Tactile Honesty & Patina',
    body: 'Materials should bring depth and character. We specify authentic timber, stone, and plasters that gain beauty as they age.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'light',
    number: '04',
    title: 'LIGHT',
    subtitle: 'Architectural Shadow & Layering',
    body: 'Light shapes how a space is experienced. We layer natural day lighting with warm, dimmable architectural fixtures.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'emotion',
    number: '05',
    title: 'EMOTION',
    subtitle: 'Atmosphere & Sensory Quietness',
    body: 'The strongest spaces leave a lasting feeling — creating a sense of quiet sanctuary that supports daily life.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Simran Kapoor',
    role: 'Principal Designer & Founder',
    bio: 'Leads spatial design direction and material philosophy across all residential and hospitality commissions.',
  },
  {
    name: 'Rohit Shenoy',
    role: 'Head of Project Delivery',
    bio: 'Oversees site execution, technical drawings, and craftsman coordination across active sites in Mumbai.',
  },
  {
    name: 'Anika Mehta',
    role: 'Senior Interior Architect',
    bio: 'Specialises in custom joinery detail, stone specification, and lighting plans.',
  },
];

const STUDIO_FACTS = [
  { label: 'Based In', value: 'Santacruz, Mumbai' },
  { label: 'Practice Areas', value: 'Residential · Commercial · Hospitality' },
  { label: 'Design Approach', value: 'Bespoke Interior Architecture' },
  { label: 'Project Scope', value: 'Turnkey Delivery & Material Advisory' },
];

export default function AboutPage() {
  const [activePrincipleIndex, setActivePrincipleIndex] = useState(0);
  const [displayedPrincipleIndex, setDisplayedPrincipleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(0);

  const heroImgRef = useRef(null);
  const cinematicImgRef = useRef(null);

  useParallax(heroImgRef, 0.12);
  useParallax(cinematicImgRef, 0.15);

  // Synchronized principle crossfade transition (400–650ms)
  const handlePrincipleSelect = (index) => {
    if (index === activePrincipleIndex) return;
    setActivePrincipleIndex(index);
    setIsFading(true);

    const timer = setTimeout(() => {
      setDisplayedPrincipleIndex(index);
      setIsFading(false);
    }, 280);

    return () => clearTimeout(timer);
  };

  const activePrinciple = DESIGN_PRINCIPLES[activePrincipleIndex];
  const displayedPrinciple = DESIGN_PRINCIPLES[displayedPrincipleIndex];

  // Featured projects for philosophy -> projects connection
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <>
      <SEO
        title="About Studio — Our Story & Philosophy"
        description="SK Interior is a luxury interior architecture practice in Santacruz, Mumbai. Learn about our studio story, design principles, and approach."
        canonical="/about"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 2 & 3 — EDITORIAL CINEMATIC ABOUT HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24"
          style={{ background: 'var(--color-bg)', paddingTop: '140px' }}
        >
          {/* Subtle Ambient Radial Grid */}
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
                THE STUDIO BEHIND THE SPACES
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <SectionReveal direction="up" delay={80}>
                  <h1
                    className="display-xl text-[#F3F1ED] uppercase font-light leading-[1.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    DESIGN WITH<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      A POINT OF VIEW.
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
                    SK Interior was established in Santacruz, Mumbai as an interior architecture studio dedicated to spatial restraint, authentic materials, and long-term thinking.
                  </p>
                  <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40">
                    <span>EXPLORE STUDIO PHILOSOPHY</span>
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
            PHASE 4 — STUDIO INTRODUCTION STATEMENT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-b border-black/10"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              <div className="lg:col-span-5">
                <SectionReveal>
                  <span className="section-label mb-4 block text-[#B59A62]">OUR STORY</span>
                  <h2
                    className="display-lg text-[#151515] uppercase font-light"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    BUILT AROUND<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      HOW PEOPLE LIVE.
                    </span>
                  </h2>
                </SectionReveal>
              </div>

              <div className="lg:col-span-7">
                <SectionReveal delay={100}>
                  <p
                    className="text-[1.4rem] sm:text-[1.8rem] text-[#151515] font-light italic leading-relaxed mb-8"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    &ldquo;The quietest rooms are often the most powerful. Our work is not about filling space with ornament, but carving out room for life to happen.&rdquo;
                  </p>
                </SectionReveal>

                <SectionReveal delay={160}>
                  <div
                    className="space-y-4 text-[15px] sm:text-[16px] leading-relaxed text-[#6F6B65] font-light"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    <p>
                      SK Interior began with a simple observation: many contemporary interiors are designed to impress in photographs, but fail to support the quiet rhythm of daily life. We set out to build a practice focused on sensory warmth, natural materials, and spatial longevity.
                    </p>
                    <p>
                      Over the years, our studio has completed residences, penthouses, headquarter offices, and hospitality venues across Mumbai, Alibaug, and Goa. Every commission is approached with the same discipline — testing floorplate efficiency, selecting authentic stones and timbers, and refining joinery details until nothing feels out of place.
                    </p>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 5, 6 & 7 — INTERACTIVE STUDIO PHILOSOPHY / DESIGN PRINCIPLES
            ═══════════════════════════════════════════════════════════════════ */}
        {/* DESKTOP INTERACTIVE PHILOSOPHY (lg and above) */}
        <section
          className="section-padding relative border-b border-white/10 hidden lg:block"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-12 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                  INTERACTIVE PHILOSOPHY
                </span>
                <h2
                  className="text-2xl font-light text-[#F3F1ED]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Five Design Pillars
                </h2>
              </div>
              <div className="text-[11px] font-mono text-[#F3F1ED]/40 tracking-wider">
                0{activePrincipleIndex + 1} / 0{DESIGN_PRINCIPLES.length}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* ── Left Column: Interactive Principle Buttons (Phase 5 & 6) ── */}
              <div className="col-span-5 space-y-3">
                {DESIGN_PRINCIPLES.map((item, idx) => {
                  const isActive = activePrincipleIndex === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handlePrincipleSelect(idx)}
                      className={`w-full text-left p-5 sm:p-6 rounded-xl transition-all duration-300 relative group overflow-hidden border ${
                        isActive
                          ? 'bg-[#B59A62]/10 border-[#B59A62] shadow-lg'
                          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                      }`}
                      aria-selected={isActive}
                      role="tab"
                    >
                      {/* Active Indicator Line */}
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
                            {item.number}
                          </span>
                          <div>
                            <h3
                              className={`text-lg sm:text-xl font-light tracking-wide transition-colors ${
                                isActive ? 'text-[#F3F1ED] font-normal' : 'text-[#F3F1ED]/70 group-hover:text-[#F3F1ED]'
                              }`}
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {item.title}
                            </h3>
                            <span className="text-[9.5px] tracking-[0.2em] uppercase text-[#B59A62]/70 font-mono block mt-0.5">
                              {item.subtitle}
                            </span>
                          </div>
                        </div>

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
                    </button>
                  );
                })}
              </div>

              {/* ── Right Column: Showcase Image & Principle Body (Phase 6) ── */}
              <div className="col-span-7 sticky top-28">
                {/* Image Showcase Wrapper with Fixed Aspect Ratio */}
                <div className="relative ratio-16-9 rounded-xl overflow-hidden shadow-strong border border-white/10 group mb-8 bg-[#0D0D0D]">
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
                      src={displayedPrinciple.image}
                      alt={displayedPrinciple.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-1">
                          PILLAR {displayedPrinciple.number}
                        </span>
                        <span className="text-sm font-light text-[#F3F1ED]/80">
                          {displayedPrinciple.subtitle}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Principle Content Block */}
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
                      {displayedPrinciple.number}
                    </span>
                    <span className="text-white/20">•</span>
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#F3F1ED]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {displayedPrinciple.title}
                    </h3>
                  </div>

                  <p
                    className="text-[15px] sm:text-[16px] leading-relaxed text-[#F3F1ED]/80 font-light"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {displayedPrinciple.body}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MOBILE INTERACTIVE PHILOSOPHY ACCORDION (< lg) (Phase 7) */}
        <section
          className="section-padding relative border-b border-white/10 block lg:hidden"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <div className="mb-8">
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                PHILOSOPHY ACCORDION
              </span>
              <h2
                className="text-2xl font-light text-[#F3F1ED]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Five Design Pillars
              </h2>
            </div>

            <div className="space-y-4">
              {DESIGN_PRINCIPLES.map((item, idx) => {
                const isOpen = mobileOpenIndex === idx;

                return (
                  <div
                    key={item.id}
                    className={`rounded-xl overflow-hidden border transition-colors duration-300 ${
                      isOpen
                        ? 'bg-[#B59A62]/10 border-[#B59A62]'
                        : 'bg-white/[0.02] border-white/10'
                    }`}
                  >
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
                          {item.number}
                        </span>
                        <h3
                          className={`text-lg font-light ${
                            isOpen ? 'text-[#F3F1ED] font-normal' : 'text-[#F3F1ED]/80'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {item.title}
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

                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-white/10 space-y-4 animate-fadeIn">
                        <div className="ratio-4-3 rounded-lg overflow-hidden relative shadow-md mt-4 border border-white/10">
                          <SafeImage
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p
                          className="text-[14px] leading-relaxed text-[#F3F1ED]/80 font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {item.body}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 8 & 9 — STUDIO PRACTICE & TEAM LEADERSHIP
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding relative" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-black/10">
                <div>
                  <span className="section-label mb-2 block text-[#B59A62]">
                    STUDIO PRACTICE
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#151515]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    Behind the{' '}
                    <span className="text-italic-serif text-[#B59A62]">
                      Process.
                    </span>
                  </h2>
                </div>
              </div>
            </SectionReveal>

            {/* Editorial Typographic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {TEAM_MEMBERS.map((member, idx) => (
                <SectionReveal key={member.name} delay={idx * 80}>
                  <div className="p-8 rounded-xl bg-white/70 border border-black/10 shadow-sm flex flex-col justify-between min-h-[220px] group hover:border-[#B59A62] transition-colors duration-300">
                    <div>
                      <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#B59A62] block mb-3">
                        0{idx + 1} — {member.role}
                      </span>
                      <h3
                        className="text-[1.6rem] font-light text-[#151515] mb-4 group-hover:text-[#B59A62] transition-colors"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="text-[13.5px] leading-relaxed text-[#6F6B65] font-light"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Phase 11 — Verified Studio Details */}
            <div className="pt-12 border-t border-black/15">
              <span className="section-label mb-8 block text-[#B59A62]">STUDIO OVERVIEW</span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[13px]">
                {STUDIO_FACTS.map((fact) => (
                  <div key={fact.label}>
                    <p className="text-[9.5px] tracking-[0.22em] uppercase font-semibold text-[#B59A62] mb-1">
                      {fact.label}
                    </p>
                    <p className="text-[#151515]/80 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                      {fact.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 10 — CINEMATIC FULL-WIDTH IMAGE MOMENT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-36 overflow-hidden bg-[#0A0A0A]">
          <div className="container-wide">
            <SectionReveal>
              <div className="relative ratio-21-9 sm:ratio-16-9 lg:ratio-21-9 rounded-2xl overflow-hidden shadow-strong border border-white/10 group">
                <div ref={cinematicImgRef} className="w-full h-full">
                  <SafeImage
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80"
                    alt="SK Interior architectural editorial moment"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-mono font-semibold">
                    EDITORIAL PROFILE
                  </span>
                  <div className="max-w-2xl">
                    <h3
                      className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight leading-tight mb-4"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      RESTAINED.<br />
                      <span className="text-italic-serif text-[#B59A62]">
                        TACTILE. ENDURING.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F3F1ED]/70 font-light max-w-lg">
                      Designing quiet sanctuaries that support the rhythm of everyday life in Mumbai and beyond.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 13 — PHILOSOPHY TO PROJECTS CONNECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-white/10"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="container-wide">
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-6 border-b border-white/10">
                <div>
                  <span className="section-label text-[#B59A62] mb-2 block">
                    OUR PHILOSOPHY IN PRACTICE
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1ED]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    The Spaces{' '}
                    <span className="text-italic-serif text-[#B59A62]">
                      We Create.
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

            {/* Featured Project Cards Grid using ProjectCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {featuredProjects.map((project, idx) => (
                <SectionReveal key={project.slug} delay={idx * 100}>
                  <ProjectCard project={project} aspect="ratio-16-9" />
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 14 — ABOUT → PROCESS BRIDGE
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-white/10"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
              <div className="lg:col-span-7">
                <SectionReveal>
                  <span className="section-label text-[#B59A62] mb-3 block">
                    DISCIPLINED METHODOLOGY
                  </span>
                  <h2
                    className="display-lg text-[#F3F1ED] font-light uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    FROM IDEA<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      TO SOMETHING REAL.
                    </span>
                  </h2>
                </SectionReveal>
              </div>

              <div className="lg:col-span-5">
                <SectionReveal delay={100}>
                  <p
                    className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#F3F1ED]/70 font-light mb-8"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Explore our structured 5-phase design roadmap — moving seamlessly from discovery and material strategy to technical GFC specifications and white-glove key handover.
                  </p>
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
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 15 — EDITORIAL CONVERSION CTA SECTION
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
                HAVE A SPACE IN MIND?
              </span>

              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                LET&rsquo;S CREATE<br />
                <span className="text-italic-serif text-[#B59A62]">
                  SOMETHING WITH CHARACTER.
                </span>
              </h2>

              <p
                className="max-w-lg mx-auto text-[15px] sm:text-[16px] leading-relaxed text-[#F3F1ED]/60 font-light mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                We accept a limited number of commissions each year to ensure every space receives our full creative focus and site supervision.
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
                  <span>VIEW SELECTED WORK</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
