import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import MagneticBtn from '../components/MagneticBtn';
import SafeImage from '../components/SafeImage';
import ProjectCard from '../components/ProjectCard';
import useParallax from '../lib/useParallax';
import { API, BACKEND, HERO_FALLBACK_IMAGE, resolveImageSrc } from '../lib/api';
import { PROJECTS } from '../data/projects';

const DEFAULT_SLIDES = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80',
    alt: 'Santacruz Residence — SK Interior',
  },
  {
    imageUrl: '/images/reviews/altitude_penthouse.jpg',
    alt: 'Altitude Penthouse — SK Interior',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1920&q=80',
    alt: 'Merit Office Campus — SK Interior',
  },
];

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Vikram & Radhika Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'VM',
    loc: 'Santacruz West, Mumbai',
    text: 'SK Interior transformed our 3,200 sq ft apartment into a sanctuary of calm. Simran’s eye for material relationships and restraint created a space that feels deeply personal, quiet, and effortlessly luxurious.',
    project: 'The Santacruz Residence',
    roomPhoto: '/images/reviews/santacruz_residence.jpg',
    rating: 5,
  },
  {
    name: 'Siddharth Singhania',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'SS',
    loc: 'Worli Sea Face, Mumbai',
    text: 'The altitude penthouse demanded a design that respected the sea view without feeling like a glass showroom. The dark walnut joinery and smoked oak flooring ground the space masterfully.',
    project: 'Altitude Penthouse',
    roomPhoto: '/images/reviews/altitude_penthouse.jpg',
    rating: 5,
  },
  {
    name: 'Tarun & Meera Grover',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'TG',
    loc: 'Alibaug Coast',
    text: 'Living in our Alibaug villa feels like floating between the interior and the landscape. The marine-grade teak and Kota stone age beautifully under coastal light.',
    project: 'The Sea Villa',
    roomPhoto: '/images/reviews/interior_bedroom_suite.jpg',
    rating: 5,
  },
];

const PRINCIPLES = [
  {
    number: '01',
    title: 'Context',
    description:
      'Every space responds to its architectural shell, surrounding light, and geographical setting. We design from the outside in.',
  },
  {
    number: '02',
    title: 'Materiality',
    description:
      'Authentic stones, solid timbers, and hand-applied plasters that gain character over time rather than wearing out.',
  },
  {
    number: '03',
    title: 'Function',
    description:
      'Uncompromised practical layouts engineered around daily rituals, circulation paths, and intuitive storage.',
  },
  {
    number: '04',
    title: 'Emotion',
    description:
      'Spaces designed to evoke feeling — creating atmosphere through light control, acoustic softness, and tactile warmth.',
  },
];

const SERVICE_CATEGORIES = [
  {
    number: '01',
    title: 'RESIDENTIAL',
    subtitle: 'Private Residences, Pent-houses & Coastal Villas',
    description:
      'End-to-end spatial planning, material curation, custom joinery, and interior architecture for high-end homes designed around how you live.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    link: '/services',
  },
  {
    number: '02',
    title: 'COMMERCIAL',
    subtitle: 'Headquarters, Executive Suites & Creative Workplaces',
    description:
      'Brand-aligned office environments and executive suites that foster focus, collaboration, and quiet prestige.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    link: '/services',
  },
  {
    number: '03',
    title: 'HOSPITALITY',
    subtitle: 'Boutique Hotels, Fine Dining & Lifestyle Spaces',
    description:
      'Atmospheric hospitality design where lighting, acoustics, and tactile surfaces combine to create unforgettable guest experiences.',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    link: '/services',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    title: 'Discover',
    subtitle: 'Brief & Site Audit',
    desc: 'Understanding your lifestyle, spatial requirements, site conditions, and budget parameters.',
  },
  {
    number: '02',
    title: 'Define',
    subtitle: 'Spatial Layouts & 3D',
    desc: 'Testing floorplate options and establishing 3D visualisations with material direction.',
  },
  {
    number: '03',
    title: 'Design',
    subtitle: 'Technical Drawings',
    desc: 'Detailed GFC sets, joinery specifications, electrical plans, and fixed BOQs.',
  },
  {
    number: '04',
    title: 'Develop',
    subtitle: 'Execution & Crafts',
    desc: 'On-site construction supervision, artisan metal/stone work, and procurement tracking.',
  },
  {
    number: '05',
    title: 'Deliver',
    subtitle: 'Styling & Handover',
    desc: 'White-glove deep cleaning, art curation, final snagging, and key presentation.',
  },
];

export default function HomePage({
  initialProjects = [],
  initialHeroSlides = [],
  initialTestimonials = null,
}) {
  const [heroSlides, setHeroSlides] = useState(initialHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState(initialTestimonials || DEFAULT_TESTIMONIALS);
  const [projects, setProjects] = useState(initialProjects);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [heroReady, setHeroReady] = useState(true);

  // Scroll Progress States
  const [processProgress, setProcessProgress] = useState(0);
  const [selectedWorksProgress, setSelectedWorksProgress] = useState(0);

  // Hero Scroll-linked transformation state
  const [heroTransform, setHeroTransform] = useState({ scale: 1, translateY: 0, contentTranslateY: 0, opacity: 1 });

  // Refs for Parallax and Scroll Progress
  const heroImgRef = useRef(null);
  const heroRafRef = useRef(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0 });

  const manifestoImgRef = useRef(null);
  const approachImgRef = useRef(null);
  const ctaBgRef = useRef(null);
  const processSectionRef = useRef(null);
  const selectedWorksSectionRef = useRef(null);

  // Apply Parallax to Key Cinematic Photography Moments
  useParallax(manifestoImgRef, 0.12);
  useParallax(approachImgRef, 0.12);
  useParallax(ctaBgRef, 0.15);

  useEffect(() => {
    axios
      .get(`${API}/hero`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const formatted = res.data.map((s) => ({
            imageUrl: resolveImageSrc(s.imageUrl, HERO_FALLBACK_IMAGE),
            alt: s.alt || 'SK Interior',
          }));
          setHeroSlides(formatted);
        }
      })
      .catch(() => {});

    axios
      .get(`${API}/testimonials`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const slides = heroSlides.length ? heroSlides : DEFAULT_SLIDES;

  useEffect(() => {
    let shown = false;
    try {
      shown = !!sessionStorage.getItem('sk_loader_shown');
    } catch (_) {}
    const delay = shown ? 100 : 1200;
    const t = setTimeout(() => setHeroReady(true), delay);
    return () => clearTimeout(t);
  }, []);

  // Selected works: prioritize featured projects, fallback to latest projects in DB
  const featuredProjects = projects.filter((p) => p.featured);
  const displayedProjects =
    featuredProjects.length > 0
      ? featuredProjects.slice(0, 3)
      : projects.slice(0, 3);

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  // Hero Scroll-linked transformation & Section Scroll Progress Listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = window.innerHeight;

      // 1. Hero Scroll-linked Transformation (Subtle Scale & Multi-layered depth)
      if (scrollY <= heroHeight) {
        const progress = Math.min(scrollY / heroHeight, 1);
        const scale = 1 - progress * 0.04;
        const translateY = -progress * 20;
        const contentTranslateY = -progress * 30;
        const opacity = 1 - progress * 0.15;
        setHeroTransform({ scale, translateY, contentTranslateY, opacity });
      }

      // 2. Process Section Scroll Progress Timeline
      if (processSectionRef.current) {
        const rect = processSectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        const total = rect.height;
        const current = winH - rect.top;
        const p = Math.max(0, Math.min(1, current / (total + winH * 0.3)));
        setProcessProgress(p);
      }

      // 3. Selected Works Section Scroll Progress
      if (selectedWorksSectionRef.current) {
        const rect = selectedWorksSectionRef.current.getBoundingClientRect();
        const winH = window.innerHeight;
        const total = rect.height;
        const current = winH - rect.top;
        const p = Math.max(0, Math.min(1, current / total));
        setSelectedWorksProgress(p);
      }

      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Desktop mouse parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;
    if (navigator.maxTouchPoints > 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMouseMove = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseTarget.current = { x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy };
    };

    const animateP = () => {
      const lerp = (a, b, t) => a + (b - a) * t;
      mouseCurrent.current.x = lerp(mouseCurrent.current.x, mouseTarget.current.x, 0.06);
      mouseCurrent.current.y = lerp(mouseCurrent.current.y, mouseTarget.current.y, 0.06);
      if (heroImgRef.current) {
        const MAX = 10;
        heroImgRef.current.style.transform = `translate3d(${(mouseCurrent.current.x * MAX).toFixed(
          2
        )}px, ${(mouseCurrent.current.y * MAX + heroTransform.translateY).toFixed(2)}px, 0) scale(${heroTransform.scale})`;
      }
      heroRafRef.current = requestAnimationFrame(animateP);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    heroRafRef.current = requestAnimationFrame(animateP);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (heroRafRef.current) cancelAnimationFrame(heroRafRef.current);
    };
  }, [heroTransform.scale, heroTransform.translateY]);

  return (
    <>
      <SEO
        title="Luxury Interior Design Studio, Mumbai"
        description="SK Interior is a premium interior design and architecture studio in BKC, Mumbai. Specialising in residential, commercial, and hospitality interiors."
        canonical="/"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — CINEMATIC FULLSCREEN HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative h-screen min-h-[700px] max-h-[1100px] flex items-end bg-[#0A0A0A] text-[#F3F1ED] overflow-hidden"
          style={{ opacity: heroTransform.opacity }}
        >
          {/* Background Slideshow with Smooth Crossfade & Parallax Scale */}
          <div
            className="absolute inset-0 z-0 transition-transform duration-300 ease-out"
            ref={heroImgRef}
            style={{
              transform: `translate3d(0, ${heroTransform.translateY}px, 0) scale(${heroTransform.scale})`,
            }}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: index === currentSlide ? 1 : 0 }}
              >
                <SafeImage
                  src={slide.imageUrl}
                  alt={slide.alt}
                  fallbackSrc={HERO_FALLBACK_IMAGE}
                  className="w-full h-full object-cover transition-transform duration-10000 ease-out"
                  style={{
                    transform: index === currentSlide ? 'scale(1.0)' : 'scale(1.08)',
                  }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
            {/* Dark Editorial Overlay Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-[#0A0A0A]/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/80 via-transparent to-[#0A0A0A]/40" />
          </div>

          {/* Hero Content Layer with Multi-layered Scroll Shift */}
          <div
            className="container-wide relative z-10 pb-16 lg:pb-20 pt-32 sm:pt-36 lg:pt-40 w-full transition-transform duration-300 ease-out"
            style={{ transform: `translate3d(0, ${heroTransform.contentTranslateY}px, 0)` }}
          >
            <div className="max-w-4xl">
              <span
                className={`section-label text-[#B59A62] mb-6 block transition-all duration-700 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                BKC · Mumbai
              </span>

              {/* Original Approved Editorial Headline */}
              <h1
                className={`display-xl uppercase text-[#F3F1ED] mb-8 transition-all duration-1000 delay-200 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SPACES<br />
                <span className="text-italic-serif font-normal text-[#B59A62]">
                  WITH
                </span><br />
                CHARACTER.
              </h1>

              {/* Supporting positioning copy */}
              <p
                className={`max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-[#F3F1ED]/70 font-light mb-10 transition-all duration-1000 delay-400 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                SK Interior creates considered residential, commercial, and hospitality spaces shaped around the way people live and experience them.
              </p>

              {/* Action Buttons */}
              <div
                className={`flex flex-wrap items-center gap-4 transition-all duration-1000 delay-500 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                <MagneticBtn>
                  <Link
                    href="/projects"
                    className="btn-arch btn-arch-primary"
                  >
                    <span>EXPLORE SELECTED WORK</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>

                <MagneticBtn>
                  <Link
                    href="/contact"
                    className="btn-arch btn-arch-secondary"
                  >
                    <span>START A PROJECT</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>
              </div>
            </div>

            {/* Bottom Row: Slide counter & refined scroll indicator */}
            <div className="mt-16 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-[#F3F1ED]/40 font-light">
              <div className="flex items-center gap-3">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-0.5 transition-all duration-500 ${
                      idx === currentSlide ? 'w-10 bg-[#B59A62]' : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
                <span className="ml-2 font-mono text-[11px] tracking-widest text-[#B59A62]">
                  0{currentSlide + 1} / 0{slides.length}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40">
                <span>Scroll to discover</span>
                <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
                  <div className="w-1 h-1.5 bg-[#B59A62] rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — MANIFESTO / BRAND STATEMENT (CINEMATIC SCROLL MOMENT)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding relative" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12 lg:gap-24 items-center">
              
              {/* Asymmetric Left Column: Manifesto Headline */}
              <SectionReveal direction="up">
                <span className="section-label mb-6 block">Studio Manifesto</span>
                <h2
                  className="display-lg text-[#151515] uppercase"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  WE DON&rsquo;T JUST{' '}
                  <span className="text-italic-serif text-[#B59A62] font-normal">
                    DESIGN ROOMS.
                  </span>{' '}
                  <span className="hidden sm:inline"><br /></span>
                  WE SHAPE THE WAY A SPACE MAKES YOU FEEL.
                </h2>
                
                <div className="mt-10 max-w-xl space-y-4 text-[15.5px] leading-relaxed text-[#6F6B65] font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  <p>
                    Every architectural space possesses an inherent energy. Our role is not to impose heavy trends, but to listen to the light, proportion, and texture — sculpting environments that feel quiet, grounded, and enduring.
                  </p>
                </div>

                <div className="mt-10">
                  <Link href="/about" className="arrow-btn text-[#151515]">
                    Discover Studio Philosophy
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </SectionReveal>

              {/* Asymmetric Right Column: Strong Architectural Image with Clip Curtain & Parallax */}
              <SectionReveal direction="clip" delay={150}>
                <div className="relative">
                  <div className="img-cover ratio-3-4 rounded-xl shadow-luxe overflow-hidden" data-cursor="image">
                    <div ref={manifestoImgRef} className="w-full h-full scale-110 origin-center">
                      <SafeImage
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                        alt="SK Interior architectural statement"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                  {/* Subtle decorative badge */}
                  <div className="absolute -bottom-6 -left-6 bg-[#111111] text-[#F3F1ED] p-6 rounded-lg hidden sm:block shadow-strong">
                    <p className="text-[9px] tracking-[0.26em] uppercase text-[#B59A62] font-semibold mb-1">
                      BKC Studio
                    </p>
                    <p className="text-xs font-light text-[#F3F1ED]/70" style={{ fontFamily: 'var(--font-body)' }}>
                      Est. 2015 · Mumbai
                    </p>
                  </div>
                </div>
              </SectionReveal>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — SELECTED WORK (EDITORIAL PORTFOLIO STORYTELLING)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={selectedWorksSectionRef}
          className="section-padding"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="container-wide">
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
              <SectionReveal>
                <span className="section-label mb-3 block">Portfolio Highlights</span>
                <h2 className="display-lg text-[#F3F1ED]">
                  Selected<br />
                  <span className="text-italic-serif text-[#B59A62]">Works.</span>
                </h2>
              </SectionReveal>

              <SectionReveal delay={100}>
                <Link
                  href="/projects"
                  className="arrow-btn text-[#B59A62] text-[11px] tracking-[0.24em]"
                >
                  VIEW ALL PROJECTS
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </SectionReveal>
            </div>

            {/* Editorial Project Features from Database */}
            {projectsLoading ? (
              <div className="space-y-16">
                {[1, 2].map((n) => (
                  <div key={n} className="animate-pulse grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 bg-white/5 rounded-xl aspect-[16/9]" />
                    <div className="lg:col-span-4 space-y-4">
                      <div className="h-4 bg-white/10 rounded w-1/4" />
                      <div className="h-8 bg-white/10 rounded w-3/4" />
                      <div className="h-4 bg-white/10 rounded w-1/2" />
                      <div className="h-16 bg-white/10 rounded w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : displayedProjects.length === 0 ? (
              <div className="text-center py-20 bg-white/[0.03] border border-white/10 rounded-2xl p-8 max-w-lg mx-auto">
                <p className="text-sm font-light text-[#F3F1ED]/60 mb-6">
                  No projects published yet. Check our complete portfolio or reach out for inquiries.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold bg-[#B59A62] text-[#111111]"
                >
                  Contact Studio
                </Link>
              </div>
            ) : (
              <div className="space-y-20">
                {displayedProjects.map((project, idx) => {
                  const slugOrId = project.slug || project._id;
                  const cover = resolveImageSrc(project.imageUrl);
                  const projectNum = String(idx + 1).padStart(2, '0');
                  const category = project.category
                    ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
                    : 'Portfolio';
                  const metaString = [project.location, project.year].filter(Boolean).join(' · ');

                  return (
                    <SectionReveal key={project._id || project.slug} delay={idx * 100}>
                      <Link href={`/projects/${slugOrId}`} className="group block">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                          
                          {/* Image Column - Alternating width layout */}
                          <div className={`lg:col-span-8 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                            <div className="img-cover ratio-16-9 rounded-xl overflow-hidden bg-black/40">
                              <img
                                src={cover}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            </div>
                          </div>

                          {/* Info Column */}
                          <div className={`lg:col-span-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                            <div className="flex items-center gap-4 mb-4">
                              <span
                                className="text-[#B59A62] text-xl font-light"
                                style={{ fontFamily: 'var(--font-display)' }}
                              >
                                {projectNum}
                              </span>
                              <span className="text-white/20">•</span>
                              <span className="text-[10px] tracking-[0.24em] uppercase font-semibold text-[#B59A62]">
                                {category}
                              </span>
                            </div>

                            <h3
                              className="text-[2.2rem] sm:text-[2.8rem] font-light text-[#F3F1ED] group-hover:text-[#B59A62] transition-colors duration-300 leading-tight mb-4"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {project.title}
                            </h3>

                            {metaString && (
                              <p
                                className="text-xs tracking-wider uppercase text-[#F3F1ED]/40 font-light mb-6"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                {metaString}
                              </p>
                            )}

                            {project.description && (
                              <p
                                className="text-sm leading-relaxed text-[#F3F1ED]/60 font-light line-clamp-3 mb-8"
                                style={{ fontFamily: 'var(--font-body)' }}
                              >
                                {project.description}
                              </p>
                            )}

                            <span className="arrow-btn text-[#F3F1ED] group-hover:text-[#B59A62] transition-colors">
                              Explore Case Study
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                          </div>

                        </div>
                      </Link>
                    </SectionReveal>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — DESIGN PHILOSOPHY (SPLIT EDITORIAL WITH PARALLAX)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* Left Column: Large Architectural Image with Parallax Drift */}
              <div className="lg:col-span-5">
                <SectionReveal direction="left">
                  <div className="img-cover ratio-3-4 rounded-xl shadow-luxe overflow-hidden" data-cursor="image">
                    <div ref={approachImgRef} className="w-full h-full scale-110 origin-center">
                      <SafeImage
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
                        alt="SK Interior Design Approach"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out"
                      />
                    </div>
                  </div>
                </SectionReveal>
              </div>

              {/* Right Column: Principles */}
              <div className="lg:col-span-7">
                <SectionReveal direction="right">
                  <span className="section-label mb-4 block">Our Approach</span>
                  <h2 className="display-md text-[#151515] mb-12">
                    DESIGNED FOR<br />
                    <span className="text-italic-serif text-[#B59A62]">THE WAY YOU LIVE.</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-10">
                    {PRINCIPLES.map((p) => (
                      <div key={p.number} className="pt-6 border-t border-black/10">
                        <span
                          className="text-[#B59A62] text-xs font-semibold tracking-widest block mb-2"
                        >
                          {p.number} — {p.title}
                        </span>
                        <p
                          className="text-[14px] leading-relaxed text-[#6F6B65] font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {p.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </SectionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — DESIGN DISCIPLINES (PREMIUM SEGMENTED INTERACTION)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding" style={{ background: 'var(--color-bg)' }}>
          <div className="container-wide max-w-5xl mx-auto">
            
            {/* Section Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
              <SectionReveal>
                <span className="section-label mb-3 block">Expertise</span>
                <h2 className="display-lg text-[#F3F1ED]">
                  Design<br />
                  <span className="text-italic-serif text-[#B59A62]">Disciplines.</span>
                </h2>
              </SectionReveal>

              <SectionReveal delay={100}>
                <Link
                  href="/services"
                  className="arrow-btn text-[#B59A62] text-[11px] tracking-[0.24em]"
                >
                  OUR APPROACH
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </SectionReveal>
            </div>

            {/* 1. Segmented Navigation Tabs — Placed directly above the image card */}
            <SectionReveal delay={150}>
              <div className="mb-8">
                <div className="discipline-segmented-nav">
                  {SERVICE_CATEGORIES.map((srv, idx) => {
                    const isActive = activeService === idx;
                    return (
                      <button
                        key={srv.number}
                        type="button"
                        onClick={() => setActiveService(idx)}
                        className={`discipline-tab-btn ${isActive ? 'active' : ''}`}
                        aria-selected={isActive}
                        role="tab"
                      >
                        {srv.title.charAt(0) + srv.title.slice(1).toLowerCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>

            {/* 2. Interactive Image Card with Smooth Crossfade & Carousel Controls */}
            <SectionReveal delay={200}>
              <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#141414] group">
                {SERVICE_CATEGORIES.map((srv, idx) => (
                  <div
                    key={srv.number}
                    className="absolute inset-0 transition-all duration-600 ease-out"
                    style={{
                      opacity: activeService === idx ? 1 : 0,
                      transform: activeService === idx ? 'scale(1)' : 'scale(1.03)',
                      pointerEvents: activeService === idx ? 'auto' : 'none',
                      transition: 'opacity 500ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    <SafeImage
                      src={srv.image}
                      alt={srv.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Left Slide Counter */}
                <div className="absolute bottom-6 left-6 font-mono text-xs tracking-widest text-[#F3F1ED]/70 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                  0{activeService + 1} / 0{SERVICE_CATEGORIES.length}
                </div>

                {/* Bottom Right Circular Carousel Controls */}
                <div className="absolute bottom-6 right-6 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Previous discipline"
                    onClick={() => setActiveService((prev) => (prev - 1 + SERVICE_CATEGORIES.length) % SERVICE_CATEGORIES.length)}
                    className="btn-carousel-circle"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="arrow-prev">
                      <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    aria-label="Next discipline"
                    onClick={() => setActiveService((prev) => (prev + 1) % SERVICE_CATEGORIES.length)}
                    className="btn-carousel-circle"
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="arrow-next">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </SectionReveal>

            {/* 3. Active Discipline Details & Architectural CTA Button */}
            <SectionReveal delay={250}>
              <div className="mt-8 space-y-6">
                <div className="flex items-baseline gap-4">
                  <span
                    className="text-3xl font-light text-[#B59A62]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {SERVICE_CATEGORIES[activeService].number}
                  </span>
                  <div>
                    <h3
                      className="text-2xl sm:text-3xl font-light text-[#F3F1ED] tracking-wide"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {SERVICE_CATEGORIES[activeService].title}
                    </h3>
                    <p className="text-xs text-[#B59A62] font-light mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                      {SERVICE_CATEGORIES[activeService].subtitle}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p
                    className="text-sm sm:text-base leading-relaxed text-[#F3F1ED]/70 font-light mb-8 max-w-3xl"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {SERVICE_CATEGORIES[activeService].description}
                  </p>

                  {/* Architectural CTA Button */}
                  <Link
                    href={SERVICE_CATEGORIES[activeService].link}
                    className="btn-arch btn-arch-secondary btn-arch-full sm:w-auto"
                  >
                    <span>VIEW SCOPE & PRICING</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </SectionReveal>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6 — PROCESS (PROGRESSIVE SCROLL TIMELINE)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          ref={processSectionRef}
          className="section-padding"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <SectionReveal>
              <span className="section-label mb-4 block">Methodology</span>
              <h2 className="display-lg text-[#151515] mb-16">
                From Concept<br />
                <span className="text-italic-serif text-[#B59A62]">to Keys.</span>
              </h2>
            </SectionReveal>

            {/* Horizontal Line (Desktop) / Vertical Line (Mobile) with Real Scroll Progress */}
            <div className="relative">
              {/* Desktop Horizontal Line */}
              <div className="hidden lg:block absolute top-[28px] left-0 right-0 h-0.5 bg-black/10 z-0">
                <div
                  className="h-full bg-[#B59A62] transition-transform duration-200 ease-out origin-left"
                  style={{ transform: `scaleX(${processProgress})` }}
                />
              </div>

              {/* Mobile Vertical Line */}
              <div className="lg:hidden absolute top-4 bottom-4 left-[27px] w-0.5 bg-black/10 z-0">
                <div
                  className="w-full bg-[#B59A62] transition-transform duration-200 ease-out origin-top"
                  style={{ transform: `scaleY(${processProgress})` }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-8 relative z-10">
                {PROCESS_STEPS.map((step, idx) => {
                  const stepThreshold = (idx + 1) / PROCESS_STEPS.length;
                  const isStepActive = processProgress >= stepThreshold - 0.15;

                  return (
                    <SectionReveal key={step.number} delay={idx * 80}>
                      <div className="bg-[#F3F1ED] pl-14 lg:pl-0 lg:bg-transparent pr-4 group">
                        {/* Step Indicator Dot */}
                        <div
                          className={`w-14 h-14 rounded-full flex items-center justify-center font-mono text-sm mb-5 shadow-sm -ml-14 lg:ml-0 transition-all duration-500 ${
                            isStepActive
                              ? 'bg-[#B59A62] text-[#111111] scale-105 shadow-md'
                              : 'bg-[#111111] text-[#B59A62]'
                          }`}
                        >
                          {step.number}
                        </div>

                        <h3
                          className={`text-xl font-light mb-1 transition-colors duration-300 ${
                            isStepActive ? 'text-[#151515] font-normal' : 'text-[#151515]/70'
                          }`}
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                          {step.subtitle}
                        </p>
                        <p
                          className="text-xs leading-relaxed text-[#6F6B65] font-light"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {step.desc}
                        </p>
                      </div>
                    </SectionReveal>
                  );
                })}
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/process" className="arrow-btn text-[#151515]">
                Learn Complete Methodology
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 7 — CLIENT VOICE & REVIEWS (UNIQUE LUXURY EDITORIAL)
            ═══════════════════════════════════════════════════════════════════ */}
        {testimonials && testimonials.length > 0 && (
          <section className="section-padding relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
            <div className="container-narrow">
              <SectionReveal>
                <div className="text-center mb-6">
                  <span className="section-label inline-block text-[#B59A62]">Client Voices</span>
                </div>

                <div className="text-center relative bg-[#141414]/80 border border-white/10 rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-md group hover:border-[#B59A62]/40 transition-all duration-500">
                  
                  {/* 5-Star Rating & Verified Badge */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-1.5 text-[#B59A62]">
                      {[...Array(testimonials[activeTestimonial]?.rating || 5)].map((_, i) => (
                        <svg key={i} width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                      <span className="text-xs font-semibold text-[#B59A62] ml-2">5.0 / 5.0</span>
                    </div>

                    <span className="text-[9px] tracking-[0.24em] uppercase px-3 py-1 rounded-full bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Verified Client Reflection
                    </span>
                  </div>

                  {/* Main Quote Statement */}
                  <p
                    className="display-md font-light text-[#F3F1ED] leading-snug mb-10 min-h-[120px] flex items-center justify-center"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    &ldquo;{testimonials[activeTestimonial]?.text}&rdquo;
                  </p>

                  {/* Client Profile Avatar & Metadata */}
                  <div className="mb-8 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#B59A62] shadow-xl mb-3 bg-[#222] flex-shrink-0">
                      {testimonials[activeTestimonial]?.avatar ? (
                        <img
                          src={testimonials[activeTestimonial].avatar}
                          alt={testimonials[activeTestimonial].name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B59A62] font-bold text-sm bg-gradient-to-br from-[#1A1917] to-[#2B2822]">
                          {testimonials[activeTestimonial]?.avatarInitials || 'SK'}
                        </div>
                      )}
                    </div>

                    <h4 className="text-lg text-[#F3F1ED] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                      {testimonials[activeTestimonial]?.name}
                    </h4>
                    <p className="text-xs text-[#B59A62] font-light mt-1 tracking-wide">
                      {testimonials[activeTestimonial]?.loc} {testimonials[activeTestimonial]?.project ? `· ${testimonials[activeTestimonial]?.project}` : ''}
                    </p>
                  </div>

                  {/* Switcher & Navigation Controls */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <button
                      type="button"
                      onClick={() => setActiveTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                      className="w-10 h-10 rounded-full border border-white/15 text-[#F3F1ED]/70 hover:text-[#B59A62] hover:border-[#B59A62] flex items-center justify-center transition-colors"
                      aria-label="Previous review"
                    >
                      ←
                    </button>

                    <div className="flex items-center gap-2">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-label={`View testimonial ${i + 1}`}
                          onClick={() => setActiveTestimonial(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeTestimonial ? 'w-8 bg-[#B59A62]' : 'w-2 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                      className="w-10 h-10 rounded-full border border-white/15 text-[#F3F1ED]/70 hover:text-[#B59A62] hover:border-[#B59A62] flex items-center justify-center transition-colors"
                      aria-label="Next review"
                    >
                      →
                    </button>
                  </div>

                  {/* Action Links to Dedicated Review Page */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                      href="/reviews"
                      className="px-6 py-3 rounded-xl bg-[#B59A62] text-[#111111] text-[11px] tracking-[0.22em] uppercase font-bold hover:bg-[#c4a96f] transition-all shadow-lg"
                    >
                      EXPLORE ALL REVIEWS ({testimonials.length}+)
                    </Link>

                    <Link
                      href="/reviews"
                      className="px-6 py-3 rounded-xl border border-white/20 text-[#F3F1ED] text-[11px] tracking-[0.22em] uppercase font-semibold hover:border-[#B59A62] hover:text-[#B59A62] transition-all"
                    >
                      + WRITE A REVIEW
                    </Link>
                  </div>

                </div>
              </SectionReveal>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 8 — FINAL PROJECT CTA (CINEMATIC ENDING)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative py-28 lg:py-40 bg-[#0A0A0A] text-[#F3F1ED] overflow-hidden">
          {/* Background image with dark gradient overlay & subtle parallax */}
          <div className="absolute inset-0 z-0 opacity-25 overflow-hidden">
            <div ref={ctaBgRef} className="w-full h-full">
              <SafeImage
                src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1920&q=80"
                alt="SK Interior architectural background"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A]" />

          <div className="container-narrow relative z-10 text-center">
            <SectionReveal>
              <span className="section-label mb-8 block justify-center">Start a Conversation</span>

              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                LET&rsquo;S CREATE<br />
                <span className="text-italic-serif text-[#B59A62] font-normal">
                  SOMETHING
                </span><br />
                EXTRAORDINARY.
              </h2>

              <p
                className="max-w-lg mx-auto text-[15px] leading-relaxed text-[#F3F1ED]/60 font-light mb-10"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                We accept a limited number of residential, commercial, and hospitality projects each year to ensure uncompromising quality.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticBtn>
                  <Link
                    href="/contact"
                    className="btn-arch btn-arch-primary min-w-[220px]"
                  >
                    <span>START A PROJECT</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>

                <MagneticBtn>
                  <Link
                    href="/contact"
                    className="btn-arch btn-arch-secondary min-w-[220px]"
                  >
                    <span>BOOK A CONSULTATION</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const backend = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

  let initialProjects = [];
  let initialHeroSlides = [];
  let initialTestimonials = null;

  try {
    const [pRes, hRes, tRes] = await Promise.allSettled([
      axios.get(`${backend}/gallery`),
      axios.get(`${backend}/hero`),
      axios.get(`${backend}/testimonials`),
    ]);

    if (pRes.status === 'fulfilled' && Array.isArray(pRes.value.data)) {
      initialProjects = pRes.value.data;
    }

    if (hRes.status === 'fulfilled' && Array.isArray(hRes.value.data) && hRes.value.data.length > 0) {
      initialHeroSlides = hRes.value.data.map((s) => ({
        imageUrl: s.imageUrl?.startsWith('/uploads') ? `${backendUrl}${s.imageUrl}` : s.imageUrl,
        alt: s.alt || 'SK Interior',
      }));
    }

    if (tRes.status === 'fulfilled' && Array.isArray(tRes.value.data) && tRes.value.data.length > 0) {
      initialTestimonials = tRes.value.data;
    }
  } catch (err) {
    console.error('Error in HomePage getServerSideProps:', err);
  }

  return {
    props: {
      initialProjects,
      initialHeroSlides,
      initialTestimonials,
    },
  };
}
