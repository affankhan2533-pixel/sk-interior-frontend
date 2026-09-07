<<<<<<< HEAD
import { useState, useEffect, useRef } from 'react';
=======
import { useState, useEffect } from 'react';
>>>>>>> upstream/main
import Link from 'next/link';
import axios from 'axios';
import SEO from '../../components/SEO';
import SafeImage from '../../components/SafeImage';
import ProjectCard from '../../components/ProjectCard';
import SectionReveal from '../../components/SectionReveal';
<<<<<<< HEAD
import MagneticBtn from '../../components/MagneticBtn';
import { PROJECTS, PROJECT_CATEGORIES } from '../../data/projects';
=======
import { API } from '../../lib/api';
>>>>>>> upstream/main

export default function ProjectsPage({ initialProjects = [], initialError = null }) {
  const [projects, setProjects] = useState(initialProjects);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(initialError);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  const [heroTransform, setHeroTransform] = useState({ translateY: 0, opacity: 1 });
  const [heroReady, setHeroReady] = useState(true);

  // Hero scroll response
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let rafId = null;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY <= 600) {
        const progress = Math.min(scrollY / 600, 1);
        setHeroTransform({
          translateY: -progress * 25,
          opacity: 1 - progress * 0.15,
        });
      }
      rafId = null;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Filter change handler with smooth fade transition
  const handleCategoryChange = (category) => {
    if (category === activeCategory) return;
    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(category);
      setIsFiltering(false);
    }, 250);
  };

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/gallery`);
      setProjects(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Unable to load projects at this time. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Dynamically extract categories from MongoDB projects
  const dynamicCategories = [
    'All',
    ...Array.from(
      new Set(
        projects
          .map((p) => p.category)
          .filter(Boolean)
          .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
      )
    ),
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter(
          (p) => (p.category || '').toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <>
      <SEO
        title="Selected Portfolio"
        description="Explore the architecture and interior design portfolio of SK Interior — residential, commercial, and hospitality projects in Mumbai."
        canonical="/projects"
      />

      <main className="overflow-x-hidden">
        {/* ── Hero Section ── */}
        <section
          className="relative min-h-[55vh] lg:min-h-[65vh] flex flex-col justify-end overflow-hidden pb-12 transition-transform duration-300 ease-out"
          style={{
            background: 'var(--color-bg)',
            paddingTop: '140px',
            transform: `translate3d(0, ${heroTransform.translateY}px, 0)`,
            opacity: heroTransform.opacity,
          }}
        >
          {/* Background Hero Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-65 overflow-hidden pointer-events-none">
            <div className="w-full h-full scale-110">
              <SafeImage
                src="/images/image copy 2.png"
                alt="SK Interior Portfolio Projects"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          </div>

          <div className="container-wide section-padding-sm relative z-10">
            <span
              className={`section-label text-[#B59A62] mb-6 block transition-all duration-700 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              SELECTED PORTFOLIO
            </span>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <h1
                className={`display-xl text-[#F3F1ED] max-w-[800px] uppercase transition-all duration-1000 delay-150 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SPACES WITH<br />
                <span className="text-italic-serif text-[#B59A62]">
                  A POINT OF VIEW.
                </span>
              </h1>
              <p
                className={`max-w-md text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#F3F1ED]/55 font-light transition-all duration-1000 delay-300 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ fontFamily: 'var(--font-body)' }}
              >
                A curated selection of residential residences, commercial workplaces, and hospitality environments designed with restraint and built to endure.
              </p>
            </div>

<<<<<<< HEAD
            {/* Category Filter Tabs */}
            <div
              className={`flex items-center gap-2.5 sm:gap-3 mt-12 pt-8 border-t border-white/10 overflow-x-auto no-scrollbar flex-nowrap sm:flex-wrap transition-all duration-1000 delay-400 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              {PROJECT_CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleCategoryChange(cat)}
                    aria-selected={isActive}
                    role="tab"
                    className={`min-h-[40px] px-5 py-2 rounded-full text-[10px] sm:text-[10.5px] tracking-[0.20em] uppercase font-semibold transition-all duration-300 flex-shrink-0 ${
                      isActive
                        ? 'bg-[#B59A62] text-[#111111] shadow-md scale-105'
=======
            {/* Dynamic Category Filter Tabs */}
            {dynamicCategories.length > 1 && (
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-12 pt-8 border-t border-white/10">
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`min-h-[44px] px-6 py-2.5 rounded-full text-[10px] sm:text-[10.5px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 ${
                      activeCategory.toLowerCase() === cat.toLowerCase()
                        ? 'bg-[#B59A62] text-[#111111]'
>>>>>>> upstream/main
                        : 'border border-white/15 text-[#F3F1ED]/60 hover:text-[#F3F1ED] hover:border-white/30'
                    }`}
                  >
                    {cat}
                  </button>
<<<<<<< HEAD
                );
              })}
            </div>
=======
                ))}
              </div>
            )}
>>>>>>> upstream/main
          </div>
        </section>

        {/* ── Project Grid Section ── */}
        <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
<<<<<<< HEAD
            <div
              className={`transition-all duration-400 ease-out ${
                isFiltering ? 'opacity-20 translate-y-2 scale-[0.99]' : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              {filteredProjects.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl font-light text-[#151515]/60">No projects found in this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                  {filteredProjects.map((project, idx) => (
                    <SectionReveal key={project.slug} delay={idx * 70}>
                      <ProjectCard
                        project={project}
                        aspect={idx % 3 === 0 ? 'ratio-16-9' : 'ratio-4-3'}
                      />
                    </SectionReveal>
                  ))}
                </div>
              )}
            </div>
=======
            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="animate-pulse space-y-4">
                    <div className="bg-black/10 rounded-lg aspect-[4/3] w-full" />
                    <div className="h-4 bg-black/10 rounded w-1/3" />
                    <div className="h-7 bg-black/10 rounded w-3/4" />
                    <div className="h-4 bg-black/10 rounded w-full" />
                  </div>
                ))}
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="text-center py-20 bg-white/50 rounded-2xl border border-black/5 p-8 max-w-lg mx-auto">
                <p className="text-lg font-light text-[#151515]/70 mb-6">{error}</p>
                <button
                  type="button"
                  onClick={fetchProjects}
                  className="px-6 py-3 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold bg-[#B59A62] text-[#111111] hover:bg-[#a68c56] transition-colors"
                >
                  Retry Connection
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && filteredProjects.length === 0 && (
              <div className="text-center py-24 bg-white/40 rounded-2xl border border-black/5 p-8 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-[#B59A62]/15 text-[#B59A62] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeWidth="1.5" strokeLinecap="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-light text-[#151515] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {activeCategory === 'All' ? 'No projects published yet' : `No projects found in ${activeCategory}`}
                </h3>
                <p className="text-sm font-light text-[#6F6B65] max-w-md mx-auto mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                  {activeCategory === 'All'
                    ? 'New projects added by the studio team will appear here immediately.'
                    : 'Try selecting a different category from above.'}
                </p>
                {activeCategory !== 'All' && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory('All')}
                    className="text-xs tracking-[0.2em] uppercase font-semibold text-[#B59A62] hover:underline"
                  >
                    View All Categories
                  </button>
                )}
              </div>
            )}

            {/* Project Grid */}
            {!loading && !error && filteredProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                {filteredProjects.map((project, idx) => (
                  <SectionReveal key={project._id || project.slug} delay={idx * 80}>
                    <ProjectCard
                      project={{
                        ...project,
                        slug: project.slug || project._id,
                        coverImage: project.imageUrl,
                        heroImage: project.heroImage || project.imageUrl,
                        intro: project.description,
                        number: String(idx + 1).padStart(2, '0'),
                        category: project.category ? project.category.charAt(0).toUpperCase() + project.category.slice(1) : ''
                      }}
                      aspect={idx % 3 === 0 ? 'ratio-16-9' : 'ratio-4-3'}
                    />
                  </SectionReveal>
                ))}
              </div>
            )}
>>>>>>> upstream/main
          </div>
        </section>

        {/* ── Final Project Enquiry CTA ── */}
        <section className="section-padding text-center" style={{ background: 'var(--color-bg)' }}>
          <div className="container-narrow">
            <SectionReveal>
              <span className="section-label justify-center mb-8 block text-[#B59A62]">Start Your Journey</span>
              <h2 className="display-lg text-[#F3F1ED]">
                Have a project<br />
                <span className="text-italic-serif text-[#B59A62]">in mind?</span>
              </h2>
              <p className="mt-8 text-[15px] leading-relaxed text-[#F3F1ED]/45 font-light max-w-lg mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                Let&rsquo;s discuss how we can transform your space into a sanctuary of refined elegance.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticBtn>
                  <Link
                    href="/contact"
                    className="btn-arch btn-arch-primary min-w-[220px]"
                  >
                    <span>SCHEDULE CONSULTATION</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>

                <MagneticBtn>
                  <Link
                    href="/services"
                    className="btn-arch btn-arch-secondary min-w-[220px]"
                  >
                    <span>EXPLORE SERVICES</span>
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
  try {
    const res = await axios.get(`${backend}/gallery`);
    return {
      props: {
        initialProjects: Array.isArray(res.data) ? res.data : [],
        initialError: null,
      },
    };
  } catch (err) {
    return {
      props: {
        initialProjects: [],
        initialError: 'Unable to load projects at this time. Please try again.',
      },
    };
  }
}
