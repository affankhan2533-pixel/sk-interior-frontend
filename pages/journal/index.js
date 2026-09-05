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

  // If viewing 'All', exclude the featured article from the grid so it isn't duplicated
  const gridArticles =
    activeCategory === 'All'
      ? JOURNAL_ARTICLES.filter((a) => a.slug !== featuredArticle.slug)
      : filteredArticles;

  return (
    <>
      <SEO
        title="Journal — Ideas, Spaces & Perspective"
        description="Explore essays, material observations, spatial design thinking, and coastal project notes from SK Interior Studio in Mumbai."
        canonical="/journal"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — JOURNAL HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[50vh] lg:min-h-[55vh] flex flex-col justify-end pt-[120px] pb-12 lg:pt-[140px] lg:pb-16"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal>
              <span className="section-label mb-6 text-[#B59A62] block">
                JOURNAL
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <SectionReveal delay={100}>
                  <h1
                    className="text-[2.4rem] sm:text-[3.6rem] lg:text-[4.8rem] leading-[1.02] tracking-[-0.03em] font-light text-[#F3F1ED] uppercase"
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
                <SectionReveal delay={200}>
                  <p
                    className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#F3F1ED]/65 font-light"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    An editorial publication exploring interior architecture, material tactile honesty, lighting philosophy, and how living spaces are experienced every day.
                  </p>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — FEATURED ARTICLE (Visually Dominant Editorial Feature)
            ═══════════════════════════════════════════════════════════════════ */}
        {featuredArticle && activeCategory === 'All' && (
          <section
            className="py-16 sm:py-20 lg:py-24 border-b border-[#151515]/10"
            style={{ background: 'var(--color-surface)' }}
          >
            <div className="container-wide">
              <SectionReveal>
                <div className="mb-6">
                  <span className="text-[9px] tracking-[0.28em] uppercase font-bold text-[#B59A62] block">
                    FEATURED ESSAY
                  </span>
                </div>
              </SectionReveal>

              <SectionReveal delay={100}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white/40 border border-black/5 rounded-3xl p-6 sm:p-10 shadow-lg">
                  {/* Left Column: Image */}
                  <div className="lg:col-span-7">
                    <Link
                      href={`/journal/${featuredArticle.slug}`}
                      className="block overflow-hidden rounded-2xl aspect-[16/10] bg-[#1A1A1A] relative group"
                    >
                      <SafeImage
                        src={featuredArticle.coverImage}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </div>

                  {/* Right Column: Editorial Text */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-3 py-1 rounded-full bg-[#151515] text-[#B59A62] text-[9px] tracking-[0.24em] uppercase font-bold">
                        {featuredArticle.category}
                      </span>
                      <span className="text-[#151515]/30">•</span>
                      <span className="text-[#151515]/60 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                        {featuredArticle.date}
                      </span>
                      {featuredArticle.readTime && (
                        <>
                          <span className="text-[#151515]/30">•</span>
                          <span className="text-[#151515]/60 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                            {featuredArticle.readTime}
                          </span>
                        </>
                      )}
                    </div>

                    <h2
                      className="text-[2rem] sm:text-[2.6rem] font-light leading-[1.08] text-[#151515] hover:text-[#B59A62] transition-colors"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      <Link href={`/journal/${featuredArticle.slug}`}>
                        {featuredArticle.title}
                      </Link>
                    </h2>

                    <p
                      className="text-[14.5px] sm:text-[15.5px] leading-relaxed font-light text-[#151515]/75"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {featuredArticle.excerpt}
                    </p>

                    <div>
                      <Link
                        href={`/journal/${featuredArticle.slug}`}
                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#151515] text-[#F3F1ED] text-[10px] tracking-[0.24em] uppercase font-bold hover:bg-[#B59A62] hover:text-[#111111] transition-all duration-300 shadow-md group"
                      >
                        <span>READ ARTICLE</span>
                        <svg
                          width="12"
                          height="12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 & 4 — CATEGORY FILTER & ARTICLE GRID
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-24 lg:py-32"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            
            {/* Filter Bar */}
            <SectionReveal>
              <div className="flex items-center justify-between flex-wrap gap-6 mb-12 pb-6 border-b border-[#151515]/10">
                <div>
                  <span className="section-label mb-2 block">
                    EXPLORE TOPICS
                  </span>
                  <h3
                    className="text-[1.6rem] sm:text-[2rem] font-light text-[#151515] uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    ALL <span className="text-italic-serif text-[#B59A62]">PUBLICATIONS</span>
                  </h3>
                </div>

                {/* Categories Tab Pill Bar */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 no-scrollbar">
                  {JOURNAL_CATEGORIES.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-full text-[10px] tracking-[0.22em] uppercase font-bold transition-all duration-300 whitespace-nowrap min-h-[44px] flex items-center justify-center ${
                          isActive
                            ? 'bg-[#151515] text-[#B59A62] shadow-md'
                            : 'bg-white/60 border border-[#151515]/10 text-[#151515]/65 hover:text-[#151515] hover:border-[#151515]/30'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
            </SectionReveal>

            {/* Articles Grid */}
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {gridArticles.map((article, idx) => (
                  <SectionReveal key={article.slug} delay={idx * 80}>
                    <JournalCard article={article} />
                  </SectionReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
