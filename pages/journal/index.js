import { useState } from 'react';
import Link from 'next/link';
import SEO from '../../components/SEO';
import SectionReveal from '../../components/SectionReveal';
import JournalCard from '../../components/JournalCard';
import SafeImage from '../../components/SafeImage';
import { JOURNAL_ARTICLES, JOURNAL_CATEGORIES } from '../../data/journal';

export default function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const featuredArticle =
    JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];

  const filteredArticles =
    activeCategory === 'All'
      ? JOURNAL_ARTICLES
      : JOURNAL_ARTICLES.filter((a) => a.category === activeCategory);

  // Exclude featured from grid when viewing All to avoid duplication
  const gridArticles =
    activeCategory === 'All'
      ? JOURNAL_ARTICLES.filter((a) => a.slug !== featuredArticle.slug)
      : filteredArticles;

  // Split grid: first 2 are large (half-width), rest are 3-column
  const primaryGrid = gridArticles.slice(0, 2);
  const secondaryGrid = gridArticles.slice(2);

  return (
    <>
      <SEO
        title="Journal — Ideas, Spaces & Perspective"
        description="Explore essays, material observations, spatial design thinking, and coastal project notes from SK Interior Studio in Mumbai."
        canonical="/journal"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — EDITORIAL JOURNAL HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24"
          style={{ background: 'var(--color-bg)', paddingTop: '140px' }}
        >
          {/* Background Hero Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-65 overflow-hidden pointer-events-none">
            <div className="w-full h-full scale-110">
              <SafeImage
                src="/images/image copy 5.png"
                alt="SK Interior Journal Editorial"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          </div>
          {/* Ambient Radial Grid */}
          <div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal direction="up">
              <span className="section-label text-[#B59A62] mb-6 block tracking-[0.28em] font-semibold text-[10.5px]">
                JOURNAL — SK INTERIOR EDITORIAL
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-8">
                <SectionReveal direction="up" delay={80}>
                  <h1
                    className="display-xl text-[#F3F1ED] uppercase font-light leading-[1.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    IDEAS,<br />
                    SPACES &amp;<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      PERSPECTIVE.
                    </span>
                  </h1>
                </SectionReveal>
              </div>

              <div className="lg:col-span-4">
                <SectionReveal direction="up" delay={160}>
                  <p
                    className="text-[15px] sm:text-[16px] leading-relaxed text-[#F3F1ED]/65 font-light mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    An editorial publication exploring interior architecture, material tactile honesty, lighting philosophy, and how living spaces are experienced every day.
                  </p>
                  <div className="hidden sm:flex items-center gap-3 text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40">
                    <span>{JOURNAL_ARTICLES.length} ESSAYS PUBLISHED</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B59A62]" />
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — FEATURED ARTICLE (Dominant Editorial Feature)
            ═══════════════════════════════════════════════════════════════════ */}
        {featuredArticle && activeCategory === 'All' && (
          <section
            className="section-padding border-b border-black/10"
            style={{ background: 'var(--color-surface)' }}
          >
            <div className="container-wide">
              <SectionReveal>
                <span className="text-[9px] tracking-[0.28em] uppercase font-bold text-[#B59A62] block mb-8">
                  FEATURED ESSAY
                </span>
              </SectionReveal>

              <SectionReveal delay={80}>
                <Link
                  href={`/journal/${featuredArticle.slug}`}
                  className="group block"
                  aria-label={`Read featured article: ${featuredArticle.title}`}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch border border-black/10 rounded-2xl overflow-hidden shadow-luxe bg-white/50">
                    {/* Featured Large Image */}
                    <div className="lg:col-span-7 overflow-hidden aspect-[16/10] lg:aspect-auto lg:min-h-[460px] relative bg-[#F0EDE8]">
                      <SafeImage
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20 pointer-events-none" />
                      {/* Category Badge */}
                      <div className="absolute top-6 left-6">
                        <span className="px-3 py-1.5 rounded-full bg-[#151515] text-[#B59A62] text-[8.5px] tracking-[0.26em] uppercase font-bold">
                          {featuredArticle.category}
                        </span>
                      </div>
                    </div>

                    {/* Featured Text Side */}
                    <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
                      <div className="space-y-5">
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-[#B59A62] text-[9px] tracking-[0.24em] uppercase font-bold">
                            {featuredArticle.category}
                          </span>
                          <span className="text-black/25">•</span>
                          <span className="text-black/50 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                            {featuredArticle.date}
                          </span>
                          {featuredArticle.readTime && (
                            <>
                              <span className="text-black/25">•</span>
                              <span className="text-black/50 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                                {featuredArticle.readTime}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h2
                          className="text-[1.9rem] sm:text-[2.4rem] lg:text-[2.8rem] font-light leading-[1.06] text-[#151515] group-hover:text-[#B59A62] transition-colors duration-400"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          {featuredArticle.title}
                        </h2>

                        {/* Excerpt */}
                        <p
                          className="text-[14.5px] sm:text-[15.5px] leading-relaxed font-light text-[#6F6B65] line-clamp-4"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#151515] group-hover:text-[#B59A62] transition-colors duration-300">
                        <span>READ ARTICLE</span>
                        <svg
                          width="14"
                          height="14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          viewBox="0 0 24 24"
                          className="transition-transform duration-300 group-hover:translate-x-2"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 & 4 — CATEGORY FILTER + EDITORIAL ARTICLE GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            {/* Filter Bar */}
            <SectionReveal>
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-6 border-b border-black/10">
                <div>
                  <span className="section-label mb-2 block text-[#B59A62]">
                    EXPLORE TOPICS
                  </span>
                  <h2
                    className="text-[1.7rem] sm:text-[2.2rem] font-light text-[#151515] uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    ALL{' '}
                    <span className="text-italic-serif text-[#B59A62]">PUBLICATIONS</span>
                  </h2>
                </div>

                {/* Category Tab Pills — horizontally scrollable on mobile */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
                  {JOURNAL_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[9.5px] tracking-[0.22em] uppercase font-bold transition-all duration-300 whitespace-nowrap min-h-[40px] flex items-center ${
                          isActive
                            ? 'bg-[#151515] text-[#B59A62] shadow-md'
                            : 'bg-white/80 border border-black/10 text-[#151515]/60 hover:text-[#151515] hover:border-[#151515]/25'
                        }`}
                        aria-pressed={isActive}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>

            {/* Empty State */}
            {gridArticles.length === 0 ? (
              <div className="text-center py-20 bg-white/40 rounded-2xl border border-black/5">
                <p
                  className="text-[1.2rem] font-light text-[#151515]/60 mb-4"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  No articles currently listed under &ldquo;{activeCategory}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveCategory('All')}
                  className="px-6 py-2.5 rounded-full border border-[#151515]/20 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#151515] hover:bg-[#151515] hover:text-[#F3F1ED] transition-all"
                >
                  Show All Articles
                </button>
              </div>
            ) : (
              <>
                {activeCategory === 'All' ? (
                  <>
                    {/* PRIMARY EDITORIAL GRID — 2 large cards half-width */}
                    {primaryGrid.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
                        {primaryGrid.map((article, idx) => (
                          <SectionReveal key={article.slug} delay={idx * 80}>
                            <JournalCard article={article} variant="featured" />
                          </SectionReveal>
                        ))}
                      </div>
                    )}

                    {/* Divider Line */}
                    {primaryGrid.length > 0 && secondaryGrid.length > 0 && (
                      <div className="border-t border-black/10 mb-12" />
                    )}

                    {/* SECONDARY EDITORIAL GRID — 3-column smaller cards */}
                    {secondaryGrid.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {secondaryGrid.map((article, idx) => (
                          <SectionReveal key={article.slug} delay={idx * 60}>
                            <JournalCard article={article} variant="default" />
                          </SectionReveal>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  /* Filtered category view — 3-col grid */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {filteredArticles.map((article, idx) => (
                      <SectionReveal key={article.slug} delay={idx * 60}>
                        <JournalCard article={article} variant="default" />
                      </SectionReveal>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — EDITORIAL CONVERSION CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative py-24 lg:py-32 overflow-hidden"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute bottom-0 left-1/3 w-[500px] h-[300px] rounded-full pointer-events-none opacity-15 blur-[100px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            <SectionReveal>
              <span className="section-label text-[#B59A62] mb-6 justify-center block">
                HAVE AN IDEA WORTH EXPLORING?
              </span>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                LET&rsquo;S TURN IT<br />
                <span className="text-italic-serif text-[#B59A62]">
                  INTO A SPACE.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={180}>
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
