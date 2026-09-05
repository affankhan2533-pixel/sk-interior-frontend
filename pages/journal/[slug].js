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
            SECTION 1 — ARTICLE HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative pt-[120px] pb-12 lg:pt-[140px] lg:pb-16"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            <SectionReveal>
              <div className="flex items-center justify-center gap-3 mb-6 text-xs">
                <Link
                  href="/journal"
                  className="text-[10px] tracking-[0.24em] uppercase text-[#F3F1ED]/50 hover:text-[#B59A62] transition-colors font-medium"
                >
                  JOURNAL
                </Link>
                <span className="text-[#F3F1ED]/30">•</span>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#B59A62] font-bold">
                  {article.category}
                </span>
              </div>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h1
                className="text-[2.2rem] sm:text-[3.2rem] lg:text-[4.2rem] leading-[1.05] tracking-[-0.03em] font-light text-[#F3F1ED] uppercase max-w-4xl mx-auto mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {article.title}
              </h1>
            </SectionReveal>

            {article.subtitle && (
              <SectionReveal delay={150}>
                <p
                  className="text-[1.1rem] sm:text-[1.3rem] font-light italic text-[#B59A62] max-w-2xl mx-auto mb-8"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  &ldquo;{article.subtitle}&rdquo;
                </p>
              </SectionReveal>
            )}

            <SectionReveal delay={200}>
              <div
                className="flex items-center justify-center gap-4 text-xs text-[#F3F1ED]/50 font-light"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                <span>Published {article.date}</span>
                {article.readTime && (
                  <>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </>
                )}
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — HERO IMAGE
            ═══════════════════════════════════════════════════════════════════ */}
        <section style={{ background: 'var(--color-bg)' }} className="pb-12 sm:pb-16">
          <div className="container-wide">
            <SectionReveal delay={250}>
              <div className="relative rounded-3xl overflow-hidden aspect-[16/9] max-h-[560px] w-full border border-white/10 shadow-2xl">
                <SafeImage
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 & 4 — ARTICLE CONTENT & PULL QUOTE INSIGHT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-24"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-narrow max-w-3xl mx-auto">
            {/* Main Paragraphs */}
            <div className="space-y-8">
              {article.body &&
                article.body.map((para, i) => (
                  <SectionReveal key={i} delay={i * 80}>
                    <p
                      className={`text-[15.5px] sm:text-[17px] leading-[1.8] font-light text-[#151515]/80 ${
                        i === 0
                          ? 'text-[17.5px] sm:text-[19.5px] leading-relaxed text-[#151515] font-normal border-l-2 border-[#B59A62] pl-6 py-1'
                          : ''
                      }`}
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {para}
                    </p>
                  </SectionReveal>
                ))}
            </div>

            {/* SECTION 4 — EDITORIAL PULL QUOTE INSIGHT */}
            {article.quote && (
              <SectionReveal delay={200}>
                <div className="my-16 p-8 sm:p-12 rounded-3xl bg-[#111111] text-[#F3F1ED] border border-white/10 relative overflow-hidden shadow-2xl">
                  <div
                    className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 blur-[80px] pointer-events-none"
                    style={{ background: '#B59A62' }}
                  />

                  <div className="relative z-10 space-y-4">
                    <span className="text-[9px] tracking-[0.28em] uppercase font-bold text-[#B59A62] block">
                      EDITORIAL INSIGHT
                    </span>
                    <blockquote
                      className="text-[1.5rem] sm:text-[2rem] font-light italic leading-snug text-[#F3F1ED]"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      &ldquo;{article.quote.text}&rdquo;
                    </blockquote>
                    {article.quote.author && (
                      <cite className="block text-[11px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] not-italic pt-2">
                        — {article.quote.author}
                      </cite>
                    )}
                  </div>
                </div>
              </SectionReveal>
            )}

            {/* Article Author Footer */}
            <SectionReveal delay={250}>
              <div className="mt-16 pt-8 border-t border-[#151515]/10 flex flex-wrap items-center justify-between gap-6">
                <div>
                  <span className="text-[9px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                    PUBLICATION AUTHOR
                  </span>
                  <p
                    className="text-[1.2rem] font-light text-[#151515] mt-1"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    SK Interior Design Studio
                  </p>
                </div>

                <Link
                  href="/journal"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-[#151515]/20 text-[10px] tracking-[0.22em] uppercase font-bold text-[#151515] hover:bg-[#151515] hover:text-[#F3F1ED] transition-all duration-300"
                >
                  <span>All Essays</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — RELATED ARTICLES
            ═══════════════════════════════════════════════════════════════════ */}
        {relatedArticles && relatedArticles.length > 0 && (
          <section
            className="py-16 sm:py-24 border-t border-white/10"
            style={{ background: 'var(--color-bg)' }}
          >
            <div className="container-wide">
              <SectionReveal>
                <div className="flex items-center justify-between mb-12">
                  <div>
                    <span className="section-label text-[#B59A62] mb-2 block">
                      FURTHER READING
                    </span>
                    <h2
                      className="text-[1.8rem] sm:text-[2.4rem] font-light text-[#F3F1ED] uppercase"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      RELATED <span className="text-italic-serif text-[#B59A62]">ESSAYS</span>
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
                    <div className="bg-[#1A1A1A] p-6 rounded-2xl border border-white/10 space-y-4 group">
                      <Link
                        href={`/journal/${rel.slug}`}
                        className="block overflow-hidden rounded-xl aspect-[16/9] w-full relative"
                      >
                        <SafeImage
                          src={rel.coverImage}
                          alt={rel.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[9px] tracking-[0.24em] uppercase font-bold text-[#B59A62]">
                          {rel.category}
                        </span>
                        <span className="text-[#F3F1ED]/30">•</span>
                        <span className="text-[#F3F1ED]/50 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                          {rel.date}
                        </span>
                      </div>
                      <h3
                        className="text-[1.5rem] font-light text-[#F3F1ED] group-hover:text-[#B59A62] transition-colors leading-snug"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        <Link href={`/journal/${rel.slug}`}>
                          {rel.title}
                        </Link>
                      </h3>
                      <p
                        className="text-[13.5px] leading-relaxed text-[#F3F1ED]/60 font-light line-clamp-2"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {rel.excerpt}
                      </p>
                      <div>
                        <Link
                          href={`/journal/${rel.slug}`}
                          className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-bold text-[#B59A62] group-hover:text-white transition-colors"
                        >
                          <span>READ ESSAY</span>
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </SectionReveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 6 — FINAL CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-24 lg:py-32 relative overflow-hidden"
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
                INSPIRED BY AN IDEA?
              </span>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h2
                className="text-[2.2rem] sm:text-[3.2rem] lg:text-[4rem] leading-[1.05] tracking-[-0.03em] font-light uppercase text-[#F3F1ED] mb-8"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl"
                  style={{ background: 'var(--color-gold)', color: '#111111' }}
                >
                  START A PROJECT →
                </Link>

                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full border border-white/20 text-[#F3F1ED] text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:border-[#B59A62] hover:text-[#B59A62] hover:-translate-y-1"
                >
                  VIEW SELECTED WORK →
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
