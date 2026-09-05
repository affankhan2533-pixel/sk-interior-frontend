import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import ProjectCard from '../../components/ProjectCard';
import SectionReveal from '../../components/SectionReveal';
import MagneticBtn from '../../components/MagneticBtn';
import { PROJECTS, PROJECT_CATEGORIES } from '../../data/projects';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  const [heroTransform, setHeroTransform] = useState({ translateY: 0, opacity: 1 });
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

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

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

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
          className="relative min-h-[45vh] lg:min-h-[50vh] flex flex-col justify-end transition-transform duration-300 ease-out"
          style={{
            background: 'var(--color-bg)',
            paddingTop: '130px',
            transform: `translate3d(0, ${heroTransform.translateY}px, 0)`,
            opacity: heroTransform.opacity,
          }}
        >
          <div className="container-wide section-padding-sm">
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
                        : 'border border-white/15 text-[#F3F1ED]/60 hover:text-[#F3F1ED] hover:border-white/30'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Project Grid Section ── */}
        <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
          <div className="container-wide">
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
