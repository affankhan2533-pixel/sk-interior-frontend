import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import ProjectCard from '../components/ProjectCard';
import useParallax from '../lib/useParallax';
import { PROJECTS } from '../data/projects';

const PROCESS_STEPS = [
  {
    id: 'discover',
    number: '01',
    phaseLabel: 'PHASE 01 — IMMERSION',
    title: 'DISCOVER',
    subtitle: 'We begin by listening.',
    description:
      'We understand how the space needs to work, what matters to the client, and what opportunities the project presents. Through site visits, lifestyle questionnaires, light studies, and spatial audits, we uncover the foundation of the project.',
    keyPoints: [
      'Client lifestyle & functional requirements audit',
      'Architectural site orientation & natural light analysis',
      'Initial spatial potential & constraint identification',
      'Budget & vision framework alignment',
    ],
    image: '/images/image.png',
    imageAlt: 'Architectural space discovery and spatial audit for interior project',
  },
  {
    id: 'define',
    number: '02',
    phaseLabel: 'PHASE 02 — STRATEGY',
    title: 'DEFINE',
    subtitle: 'We turn conversations into a clear direction.',
    description:
      'The project requirements are organized into a focused design brief and creative framework. We define layout options, aesthetic principles, material priorities, and the structural strategy needed to guide every subsequent decision.',
    keyPoints: [
      'Focused design brief & creative direction document',
      '2D spatial layout exploration & circulation planning',
      'Material orientation & tactile direction swatches',
      'Project scope, timeline & cost estimation strategy',
    ],
    image: '/images/image copy.png',
    imageAlt: 'Interior design material palette and spatial layout concept swatches',
  },
  {
    id: 'design',
    number: '03',
    phaseLabel: 'PHASE 03 — CREATION',
    title: 'DESIGN',
    subtitle: 'Ideas begin to take shape.',
    description:
      'Layouts, materials, finishes, and visual details come together into one considered design language. We create high-fidelity 3D visualisations, custom joinery concepts, lighting schemes, and bespoke furniture selections that make the future space tangible.',
    keyPoints: [
      'Photorealistic 3D architectural visualisations',
      'Refined material palette & stone selection',
      'Custom joinery & millwork concept sketches',
      'Architectural lighting & ceiling detail planning',
    ],
    image: '/images/image copy 2.png',
    imageAlt: 'Luxury interior living room design visualization and materials',
  },
  {
    id: 'develop',
    number: '04',
    phaseLabel: 'PHASE 04 — SPECIFICATION',
    title: 'DEVELOP',
    subtitle: 'The vision becomes precise.',
    description:
      'Every important detail is refined and coordinated to prepare the design for execution. We produce full Good-for-Construction (GFC) technical drawing sets, millwork shop drawings, electrical/HVAC schematics, and an itemised Bill of Quantities.',
    keyPoints: [
      'Comprehensive GFC technical working drawing set',
      'Millwork, joinery & custom furniture shop drawings',
      'Electrical, plumbing & HVAC coordination plans',
      'Itemised Bill of Quantities (BOQ) with fixed pricing',
    ],
    image: '/images/image copy 4.png',
    imageAlt: 'Technical interior architectural drawings and detailed joinery specifications',
  },
  {
    id: 'deliver',
    number: '05',
    phaseLabel: 'PHASE 05 — REALISATION',
    title: 'DELIVER',
    subtitle: 'The final layers come together.',
    description:
      'The space is refined, completed, and prepared for the people who will experience it every day. We manage site execution, supervise craftsmen, handle procurement, conduct white-glove styling, and execute a flawless handover.',
    keyPoints: [
      'Daily on-site supervision & quality control management',
      'Specialist craftsman & trade contractor alignment',
      'White-glove deep cleaning, art curation & final styling',
      'Thorough snagging inspection & comprehensive handover pack',
    ],
    image: '/images/image copy 5.png',
    imageAlt: 'Completed luxury interior handover with curated art and fine styling',
  },
];

const STUDIO_DIFFERENCE = [
  {
    num: '01',
    title: 'ATTENTION TO DETAIL',
    desc: 'Meticulous standards for joinery reveals, stone grain matching, tile alignments, and concealed lighting channels.',
  },
  {
    num: '02',
    title: 'MATERIAL INTELLIGENCE',
    desc: 'Every stone, timber, metal, and plaster is selected for climate durability, sensory warmth, and natural aging quality.',
  },
  {
    num: '03',
    title: 'COLLABORATIVE DESIGN',
    desc: 'Direct line to your lead designer with complete transparency on budgets, timeline status, and structural decisions.',
  },
  {
    num: '04',
    title: 'EXECUTION DISCIPLINE',
    desc: 'Proactive alignment with civil contractors, electrical engineers, and artisan fabricators to ensure zero compromise.',
  },
];

export default function ProcessPage() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [displayedStepIndex, setDisplayedStepIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const heroImgRef = useRef(null);
  const cinematicImgRef = useRef(null);
  const stepRefs = useRef([]);

  useParallax(heroImgRef, 0.12);
  useParallax(cinematicImgRef, 0.15);

  // Auto-advance step carousel every 4 seconds automatically without requiring user clicks
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PROCESS_STEPS.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Synchronized step image & content transition (450–600ms)
  useEffect(() => {
    if (activeStepIndex === displayedStepIndex) return;
    setIsFading(true);

    const timer = setTimeout(() => {
      setDisplayedStepIndex(activeStepIndex);
      setIsFading(false);
    }, 280);

    return () => clearTimeout(timer);
  }, [activeStepIndex, displayedStepIndex]);

  const activeStep = PROCESS_STEPS[activeStepIndex];
  const displayedStep = PROCESS_STEPS[displayedStepIndex];

  // Pick 2 featured projects for Process -> Projects connection
  const featuredProjects = PROJECTS.slice(0, 2);

  return (
    <>
      <SEO
        title="Our Design Process — From Concept to Keys"
        description="Explore the complete SK Interior client journey from initial discovery to final white-glove key handover. A disciplined 5-step approach to luxury interior architecture."
        canonical="/process"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 2 — PROCESS HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[65vh] lg:min-h-[75vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24"
          style={{ background: 'var(--color-bg)', paddingTop: '140px' }}
        >
          {/* Background Hero Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-65 overflow-hidden pointer-events-none">
            <div ref={heroImgRef} className="w-full h-full scale-110">
              <SafeImage
                src="/images/image copy 3.png"
                alt="SK Interior Design Process"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          </div>
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full pointer-events-none opacity-15 blur-[120px]"
            style={{ background: 'radial-gradient(circle, #B59A62 0%, transparent 70%)' }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal direction="up">
              <span className="section-label text-[#B59A62] mb-6 block tracking-[0.28em] font-semibold text-[10.5px]">
                IMMERSIVE DESIGN JOURNEY
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <SectionReveal direction="up" delay={80}>
                  <h1
                    className="display-xl text-[#F3F1ED] uppercase font-light leading-[1.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    FROM CONCEPT<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      TO KEYS.
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
                    Every project follows a considered journey — moving seamlessly from understanding your lifestyle and spatial requirements to bringing the final interior together with clarity, precision, and enduring craftsmanship.
                  </p>
                  <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40">
                    <span>SCROLL TO EXPERIENCE THE JOURNEY</span>
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
            INTRODUCTION SECTION
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-t border-b border-black/10"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-narrow text-center">
            <SectionReveal>
              <span className="section-label mb-4 block justify-center text-[#B59A62]">
                THE PHILOSOPHY
              </span>
              <h2
                className="display-lg text-[#151515] uppercase font-light mb-8 max-w-3xl mx-auto"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                EVERY GREAT SPACE<br />
                STARTS WITH<br />
                <span className="text-italic-serif text-[#B59A62]">
                  UNDERSTANDING.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={100}>
              <p
                className="text-[15px] sm:text-[16.5px] leading-relaxed text-[#6F6B65] font-light max-w-2xl mx-auto"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                We believe exceptional design is born from deep inquiry and meticulous planning. Before a single material is specified or a single wall is moved, we take the time to understand how you live, how light travels through your rooms, and what feelings you wish your home to evoke.
              </p>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="mt-10 inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-black/10 bg-white/60 text-[10px] tracking-[0.24em] uppercase text-[#6F6B65] font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#B59A62]" />
                Structured · Collaborative · Transparent
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 3–9 — DESKTOP STICKY SCROLL JOURNEY & PROGRESS LINE (lg)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          id="process-journey"
          className="relative border-b border-white/10 hidden lg:block"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide py-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-16 pb-6 border-b border-white/10">
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                  5-STEP METHODOLOGY
                </span>
                <h2
                  className="text-3xl font-light text-[#F3F1ED]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  The Design Roadmap
                </h2>
              </div>
              <div className="text-[11px] font-mono text-[#F3F1ED]/40 tracking-wider">
                STEP 0{activeStepIndex + 1} / 0{PROCESS_STEPS.length}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-12 lg:gap-16 items-start relative">
              {/* ── Left Column: Progress Sidebar & Step Navigation (Phase 3 & 7) ── */}
              <div className="col-span-4 sticky top-28 space-y-4">
                {/* Progress bar line */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                  <div
                    className="h-full bg-[#B59A62] transition-all duration-500 ease-out"
                    style={{ width: `${((activeStepIndex + 1) / PROCESS_STEPS.length) * 100}%` }}
                  />
                </div>

                <div className="space-y-3">
                  {PROCESS_STEPS.map((step, idx) => {
                    const isActive = activeStepIndex === idx;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStepIndex(idx)}
                        className={`w-full text-left p-5 rounded-xl transition-all duration-300 relative group overflow-hidden border ${
                          isActive
                            ? 'bg-[#B59A62]/15 border-[#B59A62] shadow-lg'
                            : 'bg-white/[0.04] border-white/15 hover:border-white/30 hover:bg-white/[0.08]'
                        }`}
                        aria-selected={isActive}
                        role="tab"
                      >
                        {/* Active line accent */}
                        <div
                          className={`absolute left-0 top-0 bottom-0 w-1 bg-[#B59A62] transition-transform duration-300 origin-left ${
                            isActive ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-75'
                          }`}
                        />

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span
                              className={`font-mono text-sm font-semibold transition-transform duration-300 ${
                                isActive
                                  ? 'text-[#B59A62] scale-110 font-bold'
                                  : 'text-white/80 group-hover:text-white'
                              }`}
                            >
                              {step.number}
                            </span>
                            <div>
                              <h3
                                className={`text-lg font-medium tracking-wide transition-colors ${
                                  isActive ? 'text-white' : 'text-white/90 group-hover:text-white'
                                }`}
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                {step.title}
                              </h3>
                              <span className="text-[10.5px] tracking-[0.2em] uppercase text-[#B59A62] font-semibold block mt-0.5">
                                {step.phaseLabel}
                              </span>
                            </div>
                          </div>

                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            viewBox="0 0 24 24"
                            className={`transition-all duration-300 ${
                              isActive
                                ? 'text-[#B59A62] translate-x-1'
                                : 'text-white/60 group-hover:text-white'
                            }`}
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Center / Right Column: Sticky Visual & Dynamic Content Showcase (Phase 4, 5, 6) ── */}
              <div className="col-span-8 sticky top-28 space-y-8">
                {/* Image Showcase Wrapper with Fixed Aspect Ratio (Phase 6) */}
                <div className="relative ratio-16-9 rounded-xl overflow-hidden shadow-strong border border-white/10 group bg-[#0D0D0D]">
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
                      src={displayedStep.image}
                      alt={displayedStep.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
                        <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-1">
                          {displayedStep.phaseLabel}
                        </span>
                        <span className="text-base font-light italic text-[#F3F1ED]" style={{ fontFamily: 'var(--font-display)' }}>
                          &ldquo;{displayedStep.subtitle}&rdquo;
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] tracking-widest text-[#B59A62] uppercase font-mono">
                        STEP {displayedStep.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Block (Phase 5) */}
                <div
                  className={`transition-all duration-500 ease-out transform ${
                    isFading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-4xl font-light text-[#B59A62]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {displayedStep.number}
                    </span>
                    <span className="text-white/20">•</span>
                    <h3
                      className="text-3xl font-light text-[#F3F1ED]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {displayedStep.title}
                    </h3>
                  </div>

                  <p
                    className="text-[15px] sm:text-[16px] leading-relaxed text-white/85 font-light mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {displayedStep.description}
                  </p>

                  {/* Key Deliverables & Focus List */}
                  <div className="pt-6 border-t border-white/10">
                    <span className="text-[9.5px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-4">
                      KEY DELIVERABLES &amp; FOCUS
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayedStep.keyPoints.map((pt, pIdx) => (
                        <div
                          key={pIdx}
                          className="flex items-start gap-2.5 text-[13px] text-white/90 font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B59A62] mt-2 flex-shrink-0" />
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 10–12 — MOBILE INTENTIONAL PROCESS EXPERIENCE (< lg)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding relative border-b border-white/10 block lg:hidden"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <div className="mb-10">
              <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-1">
                5-STEP METHODOLOGY
              </span>
              <h2
                className="text-2xl font-light text-[#F3F1ED]"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                The Design Journey
              </h2>
            </div>

            {/* Mobile Vertical Progress Line Container */}
            <div className="relative pl-6">
              {/* Continuous vertical gold drawing progress line */}
              <div
                className="absolute top-4 bottom-4 left-2 w-0.5 rounded-full"
                style={{ background: 'linear-gradient(to bottom, #B59A62, rgba(181, 154, 98, 0.2))' }}
              />

              <div className="space-y-12">
                {PROCESS_STEPS.map((step, idx) => (
                  <div key={step.id} className="relative group">
                    {/* Step Dot Marker */}
                    <div className="absolute -left-[27px] top-1.5 w-6 h-6 rounded-full border-2 border-[#B59A62] bg-[#111111] text-[#B59A62] flex items-center justify-center font-mono text-[10px] font-bold shadow-md">
                      {step.number}
                    </div>

                    <div className="bg-white/[0.02] border border-white/10 rounded-xl p-5 sm:p-6 space-y-4">
                      <div>
                        <span className="text-[9px] tracking-[0.24em] uppercase text-[#B59A62] font-mono block mb-1">
                          {step.phaseLabel}
                        </span>
                        <h3
                          className="text-2xl font-light text-[#F3F1ED]"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {step.title}
                        </h3>
                        <p
                          className="text-xs font-light italic text-[#B59A62] mt-1"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          &ldquo;{step.subtitle}&rdquo;
                        </p>
                      </div>

                      {/* 4:3 Image Frame with Reveal (Phase 12) */}
                      <div className="ratio-4-3 rounded-lg overflow-hidden relative shadow-md border border-white/10">
                        <SafeImage
                          src={step.image}
                          alt={step.imageAlt}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <p
                        className="text-[13.5px] leading-relaxed text-[#F3F1ED]/80 font-light"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {step.description}
                      </p>

                      <div className="pt-3 border-t border-white/10 space-y-2">
                        <span className="text-[9px] tracking-[0.24em] uppercase text-[#B59A62] font-semibold block">
                          DELIVERABLES
                        </span>
                        {step.keyPoints.map((pt, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-center gap-2 text-xs text-[#F3F1ED]/70 font-light"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#B59A62]" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 13 — FULL-WIDTH CINEMATIC MOMENT
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-24 lg:py-36 overflow-hidden bg-[#0A0A0A]">
          <div className="container-wide">
            <SectionReveal>
              <div className="relative ratio-21-9 sm:ratio-16-9 lg:ratio-21-9 rounded-2xl overflow-hidden shadow-strong border border-white/10 group">
                <div ref={cinematicImgRef} className="w-full h-full">
                  <SafeImage
                    src="/images/image copy.png"
                    alt="From planning to reality — SK Interior architectural space"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

                <div className="absolute inset-0 p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-white">
                  <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-mono font-semibold">
                    TRANSFORMATION
                  </span>
                  <div className="max-w-2xl">
                    <h3
                      className="text-2xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight leading-tight mb-4"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      FROM PLANNING<br />
                      <span className="text-italic-serif text-[#B59A62]">
                        TO REALITY.
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F3F1ED]/70 font-light max-w-lg">
                      Where technical rigor meets physical craftsmanship — bringing initial sketches into living architectural environments.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 14 — "WHAT MAKES OUR PROCESS DIFFERENT" / VALUES
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding relative" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
            <SectionReveal>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                  <span className="section-label mb-3 block text-[#B59A62]">
                    STUDIO GOVERNANCE
                  </span>
                  <h2
                    className="display-lg text-[#151515] uppercase font-light"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    WHAT MAKES OUR<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      PROCESS DIFFERENT.
                    </span>
                  </h2>
                </div>
                <p
                  className="text-xs sm:text-sm leading-relaxed text-[#6F6B65] font-light max-w-md"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  Four core studio pillars that protect the integrity of your project from initial design brief to final key handover.
                </p>
              </div>
            </SectionReveal>

            {/* Grid of Studio Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {STUDIO_DIFFERENCE.map((item, idx) => (
                <SectionReveal key={item.num} delay={idx * 60}>
                  <div className="pt-6 border-t border-black/15 group hover:border-[#B59A62] transition-colors duration-300">
                    <span className="text-[#B59A62] font-mono text-xs font-semibold block mb-3">
                      {item.num}
                    </span>
                    <h3
                      className="text-xl font-light text-[#151515] mb-2 group-hover:text-[#B59A62] transition-colors duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {item.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed text-[#6F6B65] font-light"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            PHASE 15 — PROCESS → PROJECTS CONNECTION
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
                    COMPLETED REALIZATION
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#F3F1ED]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    See the Process in the{' '}
                    <span className="text-italic-serif text-[#B59A62]">
                      Spaces We Create.
                    </span>
                  </h2>
                </div>

                <Link
                  href="/projects"
                  className="btn-arch btn-arch-secondary inline-flex items-center gap-2 self-start sm:self-auto"
                >
                  <span>EXPLORE ALL PROJECTS</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </SectionReveal>

            {/* Featured Project Cards Grid using existing ProjectCard component */}
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
            PHASE 16 — EDITORIAL CONVERSION CTA
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
                READY TO BEGIN?
              </span>

              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                LET&rsquo;S CREATE<br />
                <span className="text-italic-serif text-[#B59A62]">
                  SOMETHING EXTRAORDINARY.
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
                  <span>VIEW PROJECTS</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
