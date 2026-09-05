import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import SectionReveal from '../../components/SectionReveal';
import SafeImage from '../../components/SafeImage';
import MagneticBtn from '../../components/MagneticBtn';
import useParallax from '../../lib/useParallax';
import { PROJECTS, getProjectBySlug, getRelatedProjects } from '../../data/projects';

export default function ProjectDetailPage({ project, nextProject }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [heroReady, setHeroReady] = useState(false);

  const heroImgRef = useRef(null);
  const featureImgRef = useRef(null);

  useParallax(heroImgRef, 0.12);
  useParallax(featureImgRef, 0.15);

  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 150);
    return () => clearTimeout(t);
  }, []);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#111111] text-[#F3F1ED]">
        <div className="text-center">
          <h1 className="display-md">Project Not Found</h1>
          <Link href="/projects" className="btn-arch btn-arch-primary mt-6 inline-flex">
            <span>BACK TO PROJECTS</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={project.title}
        description={project.intro}
        canonical={`/projects/${project.slug}`}
        ogImage={project.coverImage}
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — CINEMATIC PROJECT HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[70vh] flex flex-col justify-end"
          style={{ background: 'var(--color-bg)', paddingTop: '130px' }}
        >
          <div className="container-wide section-padding-sm">
            {/* Breadcrumb & Category */}
            <div
              className={`flex items-center gap-3 mb-6 transition-all duration-700 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Link
                href="/projects"
                className="text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/50 hover:text-[#B59A62] transition-colors"
              >
                Projects
              </Link>
              <span className="text-[#F3F1ED]/30 text-xs">/</span>
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B59A62] font-semibold">
                {project.category}
              </span>
            </div>

            {/* Project Title & Number */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <h1
                className={`display-xl text-[#F3F1ED] transition-all duration-1000 delay-150 ${
                  heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                {project.title}
              </h1>
              {project.number && (
                <span
                  className={`text-3xl lg:text-5xl font-light text-[#B59A62]/40 transition-all duration-1000 delay-200 ${
                    heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {project.number}
                </span>
              )}
            </div>

            {/* Metadata Bar */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-[13px] transition-all duration-1000 delay-300 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Location</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.location}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Year</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.year}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Scope</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.scope}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Category</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.category}</p>
              </div>
            </div>
          </div>

          {/* Full-width Hero Banner Image with Parallax & Clip Reveal */}
          <div className="img-cover w-full overflow-hidden relative" style={{ height: 'clamp(360px, 55vw, 750px)' }} data-cursor="image">
            <div ref={heroImgRef} className="w-full h-full">
              <SafeImage
                src={project.heroImage}
                alt={project.title}
                loading="eager"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out"
              />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — PROJECT INTRODUCTION (THE BRIEF & STORY)
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
          <div className="container-narrow">
            <SectionReveal>
              <span className="section-label mb-4 block">THE BRIEF</span>
              <p
                className="text-[1.6rem] sm:text-[2.2rem] lg:text-[2.6rem] font-light leading-snug mb-16"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {project.intro}
              </p>
            </SectionReveal>

            {/* Challenge & Response Split Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 pt-12 border-t border-black/10">
              <SectionReveal direction="left">
                <h3 className="text-[11px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] mb-4">
                  THE CHALLENGE
                </h3>
                <p className="text-[15px] leading-relaxed font-light text-[#151515]/75" style={{ fontFamily: 'var(--font-body)' }}>
                  {project.challenge}
                </p>
              </SectionReveal>

              <SectionReveal direction="right">
                <h3 className="text-[11px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] mb-4">
                  THE RESPONSE
                </h3>
                <p className="text-[15px] leading-relaxed font-light text-[#151515]/75" style={{ fontFamily: 'var(--font-body)' }}>
                  {project.response}
                </p>
              </SectionReveal>
            </div>

            {/* Material Palette / Design Details */}
            {project.materials && project.materials.length > 0 && (
              <div className="mt-16 pt-12 border-t border-black/10">
                <SectionReveal>
                  <p className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] mb-5">
                    MATERIAL PALETTE & DETAILS
                  </p>
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {project.materials.map((mat) => (
                      <span
                        key={mat}
                        className="px-4 py-2 rounded-full border border-black/15 text-[12px] font-light text-[#151515]/80 bg-white/40 hover:border-[#B59A62] transition-colors"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {mat}
                      </span>
                    ))}
                  </div>
                </SectionReveal>
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — VISUAL NARRATIVE GALLERY
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding-sm" style={{ background: 'var(--color-bg)' }}>
          <div className="container-wide">
            <SectionReveal>
              <span className="section-label mb-10 block">Visual Narrative</span>
            </SectionReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {project.images.map((imgUrl, i) => (
                <SectionReveal key={i} delay={i * 80}>
                  <div
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`img-cover rounded-xl cursor-pointer overflow-hidden shadow-2xl border border-white/10 group ${
                      i === 0 ? 'md:col-span-2 ratio-16-9' : 'ratio-4-3'
                    }`}
                    data-cursor="view"
                  >
                    <SafeImage
                      src={imgUrl}
                      alt={`${project.title} image ${i + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — FULL-WIDTH FEATURE VISUAL MOMENT WITH PARALLAX
            ═══════════════════════════════════════════════════════════════════ */}
        {project.images.length > 1 && (
          <section className="w-full relative py-0 overflow-hidden" data-cursor="image">
            <div className="img-cover w-full overflow-hidden" style={{ height: 'clamp(380px, 50vw, 700px)' }}>
              <div ref={featureImgRef} className="w-full h-full">
                <SafeImage
                  src={project.images[1] || project.coverImage}
                  alt={`${project.title} feature visual`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — NEXT PROJECT INTERACTIVE PREVIEW
            ═══════════════════════════════════════════════════════════════════ */}
        {nextProject && (
          <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
            <div className="container-wide">
              <SectionReveal>
                <div className="p-8 sm:p-12 rounded-2xl bg-white/40 border border-black/10 shadow-luxe flex flex-col md:flex-row items-center justify-between gap-8 group">
                  <div className="space-y-3">
                    <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block">
                      NEXT CASE STUDY →
                    </span>
                    <Link href={`/projects/${nextProject.slug}`}>
                      <h3
                        className="text-2xl sm:text-4xl font-light text-[#151515] group-hover:text-[#B59A62] transition-colors duration-300"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {nextProject.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#151515]/50 uppercase tracking-wider font-light" style={{ fontFamily: 'var(--font-body)' }}>
                      {nextProject.category} · {nextProject.location}
                    </p>
                  </div>

                  <Link
                    href={`/projects/${nextProject.slug}`}
                    className="btn-arch btn-arch-primary flex-shrink-0"
                    data-cursor="open"
                  >
                    <span>EXPLORE NEXT PROJECT</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </SectionReveal>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6 — FINAL PROJECT ENQUIRY CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding text-center" style={{ background: 'var(--color-bg)' }}>
          <div className="container-narrow">
            <SectionReveal>
              <span className="section-label justify-center mb-6 block text-[#B59A62]">Start a Conversation</span>
              <h2 className="display-lg text-[#F3F1ED] mb-8">
                START YOUR<br />
                <span className="text-italic-serif text-[#B59A62]">PROJECT</span>
              </h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticBtn>
                  <Link
                    href="/contact"
                    className="btn-arch btn-arch-primary min-w-[220px]"
                  >
                    <span>START A CONVERSATION</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>

                <MagneticBtn>
                  <Link
                    href="/projects"
                    className="btn-arch btn-arch-secondary min-w-[220px]"
                  >
                    <span>ALL PROJECTS</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="btn-arch-arrow">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </MagneticBtn>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-3xl font-light"
            >
              ×
            </button>
            <SafeImage
              src={selectedImage}
              alt="Project detail zoom"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-strong"
            />
          </div>
        )}
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const paths = PROJECTS.map((project) => ({
    params: { slug: project.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug);
  const related = getRelatedProjects(params.slug, 1);
  const nextProject = related[0] || null;

  return {
    props: {
      project,
      nextProject,
    },
  };
}
