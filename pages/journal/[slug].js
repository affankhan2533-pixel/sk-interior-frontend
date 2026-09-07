import Link from 'next/link';
import SEO from '../../components/SEO';
import SectionReveal from '../../components/SectionReveal';
import JournalCard from '../../components/JournalCard';
import SafeImage from '../../components/SafeImage';
import {
  JOURNAL_ARTICLES,
  getArticleBySlug,
  getRelatedArticles,
} from '../../data/journal';

export default function ArticleDetailPage({ article, relatedArticles }) {
  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#111111] text-[#F3F1ED] p-6">
        <div className="text-center max-w-md">
          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-3">
            JOURNAL
          </span>
          <h1
            className="text-[2.2rem] font-light text-[#F3F1ED] mb-4 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Article Not Found
          </h1>
          <p className="text-[14px] text-[#F3F1ED]/60 font-light mb-8">
            The essay you are looking for may have been renamed or moved.
          </p>
          <Link
            href="/journal"
            className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#B59A62] text-[#111111] text-[10px] tracking-[0.24em] uppercase font-bold"
          >
            ← Back to Journal
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${article.title} — SK Interior Journal`}
        description={article.excerpt}
        canonical={`/journal/${article.slug}`}
        ogImage={article.coverImage}
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — DARK ARTICLE HERO (Full Screen)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[60vh] lg:min-h-[68vh] flex flex-col justify-end overflow-hidden pb-14 lg:pb-20"
          style={{ background: 'var(--color-bg)', paddingTop: '140px' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 blur-[130px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            {/* Breadcrumb */}
            <SectionReveal>
              <div className="flex items-center justify-center gap-3 mb-8">
                <Link
                  href="/journal"
                  className="text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/40 hover:text-[#B59A62] transition-colors font-semibold"
                >
                  JOURNAL
                </Link>
                <span className="text-[#F3F1ED]/20 text-xs">›</span>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#B59A62] font-bold">
                  {article.category}
                </span>
              </div>
            </SectionReveal>

            {/* Article Title */}
            <SectionReveal delay={80}>
              <h1
                className="text-[2.2rem] sm:text-[3rem] lg:text-[4rem] leading-[1.04] tracking-[-0.03em] font-light text-[#F3F1ED] uppercase max-w-4xl mx-auto mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {article.title}
              </h1>
            </SectionReveal>

            {/* Subtitle */}
            {article.subtitle && (
              <SectionReveal delay={140}>
                <p
                  className="text-[1.05rem] sm:text-[1.2rem] font-light italic text-[#B59A62] max-w-2xl mx-auto mb-8 leading-relaxed"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{article.subtitle}&rdquo;
                </p>
              </SectionReveal>
            )}

            {/* Meta Row */}
            <SectionReveal delay={180}>
              <div
                className="flex items-center justify-center flex-wrap gap-3 text-[11px] text-[#F3F1ED]/45 font-light"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>Published {article.date}</span>
                {article.readTime && (
                  <>
                    <span className="text-[#F3F1ED]/20">•</span>
                    <span>{article.readTime}</span>
                  </>
                )}
                <span className="text-[#F3F1ED]/20">•</span>
                <span>SK Interior Studio</span>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — HERO IMAGE (Full Cinematic Frame)
            ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--color-bg)' }} className="pb-0">
          <SectionReveal delay={200}>
            <div className="container-wide">
              <div className="relative overflow-hidden aspect-[16/8] sm:aspect-[16/7] w-full border border-white/10 shadow-2xl">
                <SafeImage
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  priority
                />
                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/25 pointer-events-none" />
              </div>
            </div>
          </SectionReveal>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — EDITORIAL BODY TEXT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 sm:py-28 lg:py-32"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-narrow max-w-3xl mx-auto">
            {/* Lead intro accent rule */}
            <SectionReveal>
              <div className="w-12 h-px bg-[#B59A62] mb-10" />
            </SectionReveal>

            {/* Article Body Paragraphs */}
            <div className="space-y-8">
              {article.body &&
                article.body.map((para, i) => (
                  <SectionReveal key={i} delay={i * 60}>
                    <p
                      className={`leading-[1.85] font-light text-[#151515]/82 ${
                        i === 0
                          ? 'text-[18px] sm:text-[20px] text-[#151515] font-normal border-l-[3px] border-[#B59A62] pl-7 py-1'
                          : 'text-[15.5px] sm:text-[17px]'
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {para}
                    </p>
                  </SectionReveal>
                ))}
            </div>

            {/* EDITORIAL PULL QUOTE */}
            {article.quote && (
              <SectionReveal delay={160}>
                <div className="my-16 sm:my-20 relative">
                  {/* Quote mark */}
                  <div
                    className="absolute -top-4 -left-2 text-[120px] leading-none text-[#B59A62] opacity-15 select-none pointer-events-none"
                    style={{ fontFamily: 'var(--font-display)' }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>

                  <div className="bg-[#111111] rounded-2xl p-8 sm:p-12 border border-white/10 relative overflow-hidden shadow-2xl">
                    {/* Ambient inner glow */}
                    <div
                      className="absolute top-0 right-0 w-60 h-60 rounded-full opacity-12 blur-[80px] pointer-events-none"
                      style={{ background: '#B59A62' }}
                    />

                    <div className="relative z-10 space-y-5">
                      <span className="text-[8.5px] tracking-[0.30em] uppercase font-bold text-[#B59A62] block">
                        EDITORIAL INSIGHT
                      </span>
                      <blockquote
                        className="text-[1.45rem] sm:text-[1.9rem] font-light italic leading-[1.35] text-[#F3F1ED]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        &ldquo;{article.quote.text}&rdquo;
                      </blockquote>
                      {article.quote.author && (
                        <cite className="block text-[10px] tracking-[0.22em] uppercase font-semibold text-[#B59A62] not-italic pt-1">
                          — {article.quote.author}
                        </cite>
                      )}
                    </div>
                  </div>
                </div>
              </SectionReveal>
            )}

            {/* Article Footer Row */}
            <SectionReveal delay={200}>
              <div className="mt-16 pt-8 border-t border-black/10 flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  {/* Studio Mark */}
                  <div className="w-10 h-10 rounded-full bg-[#151515] flex items-center justify-center border border-black/10 flex-shrink-0">
                    <span className="text-[#B59A62] text-[8px] font-bold tracking-[0.1em]">SK</span>
                  </div>
                  <div>
                    <span className="text-[8.5px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                      PUBLISHED BY
                    </span>
                    <p
                      className="text-[1.05rem] font-light text-[#151515] mt-0.5"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      SK Interior Design Studio
                    </p>
                  </div>
                </div>

                <Link
                  href="/journal"
                  className="inline-flex items-center gap-2.5 px-6 py-3 border border-[#151515]/20 text-[10px] tracking-[0.22em] uppercase font-bold text-[#151515] hover:bg-[#151515] hover:text-[#F3F1ED] transition-all duration-300 rounded-full group"
                >
                  <span>All Essays</span>
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
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — RELATED ARTICLES (Dark Magazine Strip)
            ═══════════════════════════════════════════════════════════════════ */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section
            className="py-20 sm:py-28 border-t border-white/10"
            style={{ background: 'var(--color-bg)' }}
          >
            <div className="container-wide">
              <SectionReveal>
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <span className="section-label text-[#B59A62] mb-2 block">
                      FURTHER READING
                    </span>
                    <h2
                      className="text-[1.8rem] sm:text-[2.4rem] font-light text-[#F3F1ED] uppercase"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      RELATED{' '}
                      <span className="text-italic-serif text-[#B59A62]">ESSAYS</span>
                    </h2>
                  </div>

                  <Link
                    href="/journal"
                    className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-[0.24em] uppercase font-bold text-[#B59A62] hover:text-white transition-colors"
                  >
                    <span>VIEW ALL</span>
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </SectionReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {relatedArticles.map((rel, idx) => (
                  <SectionReveal key={rel.slug} delay={idx * 100}>
                    <JournalCard article={rel} variant="dark" />
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — FINAL CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-24 lg:py-32 relative overflow-hidden"
          style={{ background: 'var(--color-bg)' }}
        >
          <div
            className="absolute bottom-0 left-1/3 w-[500px] h-[300px] rounded-full pointer-events-none opacity-15 blur-[100px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            <SectionReveal>
              <span className="section-label text-[#B59A62] mb-6 justify-center block">
                INSPIRED BY AN IDEA?
              </span>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                LET&apos;S TURN IT<br />
                <span className="text-italic-serif text-[#B59A62]">
                  INTO A SPACE.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
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

export async function getStaticPaths() {
  const paths = JOURNAL_ARTICLES.map((article) => ({
    params: { slug: article.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const article = getArticleBySlug(params.slug);
  const relatedArticles = getRelatedArticles(params.slug, 2);

  return {
    props: {
      article,
      relatedArticles,
    },
  };
}
