import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SEO from '../../components/SEO';
import SectionReveal from '../../components/SectionReveal';
<<<<<<< HEAD
import SafeImage from '../../components/SafeImage';
import MagneticBtn from '../../components/MagneticBtn';
import useParallax from '../../lib/useParallax';
import { PROJECTS, getProjectBySlug, getRelatedProjects } from '../../data/projects';
=======
import { API, resolveImageSrc } from '../../lib/api';
>>>>>>> upstream/main

export default function ProjectDetailPage({ project, nextProject }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [heroReady, setHeroReady] = useState(true);

  if (!project) {
    return (
<<<<<<< HEAD
      <main className="min-h-screen flex items-center justify-center bg-[#111111] text-[#F3F1ED]">
        <div className="text-center">
          <h1 className="display-md">Project Not Found</h1>
          <Link href="/projects" className="btn-arch btn-arch-primary mt-6 inline-flex">
            <span>BACK TO PROJECTS</span>
=======
      <main className="min-h-screen flex items-center justify-center bg-[#111111] text-[#F3F1ED] px-4">
        <div className="text-center max-w-md">
          <span className="section-label justify-center text-[#B59A62] mb-4 block">Portfolio</span>
          <h1 className="text-3xl sm:text-4xl font-light mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Project Not Found
          </h1>
          <p className="text-sm font-light text-[#F3F1ED]/60 mb-8" style={{ fontFamily: 'var(--font-body)' }}>
            The requested project could not be found or may have been removed.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[10.5px] tracking-[0.24em] uppercase font-semibold bg-[#B59A62] text-[#111111] hover:bg-[#a68c56] transition-colors"
          >
            ← Back to Projects
>>>>>>> upstream/main
          </Link>
        </div>
      </main>
    );
  }

  const coverUrl = resolveImageSrc(project.coverImage);
  const heroUrl = resolveImageSrc(project.heroImage || project.coverImage);
  const rawGallery = (project.images || []).map(img => resolveImageSrc(img)).filter(Boolean);
  // Separate additional gallery images from the hero image
  const galleryImages = rawGallery.filter(img => img !== heroUrl);
  const displayGallery = galleryImages.length > 0 ? galleryImages : (rawGallery.length > 1 ? rawGallery.slice(1) : []);

  return (
    <>
      <SEO
        title={project.title}
        description={project.intro || `${project.title} — SK Interior Architecture & Design`}
        canonical={`/projects/${project.slug}`}
        ogImage={coverUrl}
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — CINEMATIC PROJECT HERO & FEATURED FRAME
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative pt-32 sm:pt-36 lg:pt-40 pb-16 lg:pb-24"
          style={{ background: 'var(--color-bg)' }}
        >
          <div className="container-wide">
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
                {project.category || 'Interior Design'}
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
<<<<<<< HEAD
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 text-[13px] transition-all duration-1000 delay-300 ${
                heroReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
=======
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 pb-12 border-t border-white/10 text-[13px]">
>>>>>>> upstream/main
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Location</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.location || 'Mumbai'}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Year</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.year || new Date().getFullYear().toString()}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Scope</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.scope || 'Custom Interiors'}</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.22em] uppercase text-[#B59A62] font-semibold mb-1">Category</p>
                <p className="text-[#F3F1ED]/70 font-light" style={{ fontFamily: 'var(--font-body)' }}>{project.category || 'Residential'}</p>
              </div>
            </div>

<<<<<<< HEAD
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
=======
            {/* Contained & Proportionate Featured Project Photo Showcase */}
            {heroUrl && (
              <div className="mt-4 max-w-5xl mx-auto">
                <div
                  onClick={() => setSelectedImage(heroUrl)}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#161616] cursor-pointer group"
                >
                  <div className="aspect-[16/10] sm:aspect-[16/9] max-h-[560px] w-full flex items-center justify-center overflow-hidden">
                    <img
                      src={heroUrl}
                      alt={project.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6 sm:p-8">
                    <span className="text-[#F3F1ED] text-[10px] tracking-[0.22em] uppercase font-semibold flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/15">
                      <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Click to expand full image
                    </span>
                    <span className="text-[#B59A62] text-[10px] tracking-[0.22em] uppercase font-semibold hidden sm:inline-block">
                      Featured Commission View
                    </span>
                  </div>
                </div>
              </div>
            )}
>>>>>>> upstream/main
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
<<<<<<< HEAD
            SECTION 2 — PROJECT INTRODUCTION (THE BRIEF & STORY)
=======
            SECTION 2 — PROJECT INTRODUCTION (THE BRIEF)
>>>>>>> upstream/main
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
          <div className="container-narrow">
            <SectionReveal>
              <span className="section-label mb-4 block">THE BRIEF</span>
              <p
                className="text-[1.6rem] sm:text-[2.2rem] lg:text-[2.6rem] font-light leading-snug mb-16"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
              >
                {project.intro || `${project.title} is designed with a focus on material warmth, proportion, and enduring craftsmanship.`}
              </p>
            </SectionReveal>

<<<<<<< HEAD
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
=======
            {/* Optional Challenge & Response Details */}
            {(project.challenge || project.response) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 pt-12 border-t border-black/10">
                {project.challenge && (
                  <SectionReveal direction="left">
                    <h3 className="text-[11px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] mb-4">
                      THE CHALLENGE
                    </h3>
                    <p className="text-[15px] leading-relaxed font-light text-[#151515]/75" style={{ fontFamily: 'var(--font-body)' }}>
                      {project.challenge}
                    </p>
                  </SectionReveal>
                )}
>>>>>>> upstream/main

                {project.response && (
                  <SectionReveal direction="right">
                    <h3 className="text-[11px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] mb-4">
                      THE RESPONSE
                    </h3>
                    <p className="text-[15px] leading-relaxed font-light text-[#151515]/75" style={{ fontFamily: 'var(--font-body)' }}>
                      {project.response}
                    </p>
                  </SectionReveal>
                )}
              </div>
            )}

<<<<<<< HEAD
            {/* Material Palette / Design Details */}
=======
            {/* Material Palette */}
>>>>>>> upstream/main
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
<<<<<<< HEAD
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
=======
            SECTION 3 — IMAGE GALLERY (VISUAL NARRATIVE)
            ═══════════════════════════════════════════════════════════════════ */}
        {displayGallery.length > 0 && (
          <section className="section-padding-sm" style={{ background: 'var(--color-bg)' }}>
            <div className="container-wide">
              <span className="section-label mb-10 block text-[#B59A62]">Visual Narrative</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                {displayGallery.map((imgUrl, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className="relative rounded-xl cursor-pointer overflow-hidden border border-white/10 bg-[#161616] group aspect-[4/3] max-h-[380px]"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} view ${i + 1}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="px-4 py-2 rounded-full bg-black/70 border border-white/20 text-[#F3F1ED] text-[9.5px] tracking-[0.22em] uppercase font-semibold flex items-center gap-2">
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Zoom View
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — NEXT PROJECT NAVIGATION
            ═══════════════════════════════════════════════════════════════════ */}
        {nextProject && (
          <section className="section-padding" style={{ background: 'var(--color-surface)' }}>
            <div className="container-wide">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-black/10">
                <div>
                  <span className="text-[10px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block mb-2">
                    NEXT PROJECT →
                  </span>
                  <Link href={`/projects/${nextProject.slug || nextProject._id}`} className="group">
                    <h3
                      className="text-2xl sm:text-4xl font-light text-[#151515] group-hover:text-[#B59A62] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {nextProject.title}
                    </h3>
                  </Link>
                </div>
                <Link
                  href={`/projects/${nextProject.slug || nextProject._id}`}
                  className="arrow-btn text-[#151515] min-h-[44px] inline-flex items-center"
                >
                  View Case Study
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
>>>>>>> upstream/main
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
<<<<<<< HEAD
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
=======
            SECTION 5 — FINAL PROJECT ENQUIRY CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-padding text-center" style={{ background: 'var(--color-bg)' }}>
          <div className="container-narrow">
            <span className="section-label justify-center mb-6 block text-[#B59A62]">Start a Conversation</span>
            <h2 className="display-lg text-[#F3F1ED] mb-8">
              START YOUR<br />
              <span className="text-italic-serif text-[#B59A62]">PROJECT</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 rounded-full text-[10.5px] tracking-[0.24em] uppercase font-semibold transition-all hover:-translate-y-px"
                style={{ background: 'var(--color-gold)', color: '#111111' }}
              >
                Schedule Consultation
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-4 rounded-full border border-white/20 text-[#F3F1ED] text-[10.5px] tracking-[0.24em] uppercase font-semibold hover:border-[#B59A62] hover:text-[#B59A62] transition-all"
              >
                All Projects
              </Link>
            </div>
>>>>>>> upstream/main
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            onClick={() => setSelectedImage(null)}
<<<<<<< HEAD
            className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
=======
            className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8 cursor-pointer"
>>>>>>> upstream/main
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl font-light w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all z-20"
            >
              ✕
            </button>
<<<<<<< HEAD
            <SafeImage
              src={selectedImage}
              alt="Project detail zoom"
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-strong"
            />
=======
            <div
              className="relative max-w-5xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt={project.title}
                className="max-w-full max-h-[82vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
            <p className="mt-4 text-[11px] tracking-[0.24em] uppercase text-[#B59A62] font-semibold">
              {project.title}
            </p>
>>>>>>> upstream/main
          </div>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const backend = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const slugParam = encodeURIComponent(params.slug);
    const res = await axios.get(`${backend}/gallery/${slugParam}`);
    const doc = res.data;

    let nextProject = null;
    try {
      const allRes = await axios.get(`${backend}/gallery`);
      const list = allRes.data || [];
      const idx = list.findIndex(
        (p) => p.slug === params.slug || p._id === params.slug
      );
      if (idx !== -1 && list.length > 1) {
        const next = list[(idx + 1) % list.length];
        nextProject = {
          _id: next._id,
          slug: next.slug || next._id,
          title: next.title,
        };
      }
    } catch {}

    return {
      props: {
        project: doc
          ? {
              _id: doc._id,
              slug: doc.slug || doc._id,
              title: doc.title,
              category: doc.category
                ? doc.category.charAt(0).toUpperCase() + doc.category.slice(1)
                : '',
              location: doc.location || 'Mumbai',
              year: doc.year || '',
              scope: doc.scope || '',
              intro: doc.description || '',
              coverImage: doc.imageUrl || '',
              heroImage: doc.heroImage || doc.imageUrl || '',
              images:
                Array.isArray(doc.images) && doc.images.length > 0
                  ? doc.images
                  : [doc.imageUrl].filter(Boolean),
              materials: Array.isArray(doc.materials) ? doc.materials : [],
              challenge: doc.challenge || '',
              response: doc.response || '',
            }
          : null,
        nextProject,
      },
    };
  } catch (err) {
    return {
      props: {
        project: null,
        nextProject: null,
      },
    };
  }
}
