import Link from 'next/link';
import SafeImage from './SafeImage';

/**
 * JournalCard — Editorial magazine-style article card.
 * Used on /journal listing and inside article detail "Related Essays".
 * 
 * Props:
 *   article  — journal article object from data/journal.js
 *   variant  — 'default' | 'featured' | 'dark'
 *   className — additional CSS classes
 */
export default function JournalCard({ article, variant = 'default', className = '' }) {
  if (!article) return null;

  const isDark = variant === 'dark';
  const isFeatured = variant === 'featured';

  return (
    <article
      className={`journal-card group flex flex-col ${className}`}
      data-cursor="read"
    >
      {/* Image Frame */}
      <Link
        href={`/journal/${article.slug}`}
        className={`block overflow-hidden mb-5 relative border ${
          isDark
            ? 'rounded-xl border-white/10 aspect-[16/10] bg-[#0D0D0D]'
            : isFeatured
            ? 'rounded-2xl border-black/8 aspect-[16/9] bg-[#F0EDE8]'
            : 'rounded-xl border-black/8 aspect-[16/10] bg-[#F0EDE8]'
        }`}
        aria-label={`Read article: ${article.title}`}
        tabIndex={0}
      >
        <SafeImage
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle image overlay on hover */}
        <div
          className={`absolute inset-0 transition-opacity duration-400 ${
            isDark
              ? 'bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40'
              : 'bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Category badge on image */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1 text-[8.5px] tracking-[0.26em] uppercase font-bold rounded-full backdrop-blur-md border ${
              isDark
                ? 'bg-black/60 text-[#B59A62] border-white/15'
                : 'bg-white/80 text-[#B59A62] border-black/10'
            }`}
          >
            {article.category}
          </span>
        </div>
      </Link>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`text-[9px] tracking-[0.24em] uppercase font-semibold ${
            isDark ? 'text-[#B59A62]' : 'text-[#B59A62]'
          }`}
        >
          {article.category}
        </span>
        <span className={isDark ? 'text-white/25' : 'text-black/25'}>•</span>
        <span
          className={`text-[11px] font-light ${isDark ? 'text-white/50' : 'text-black/50'}`}
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {article.date}
        </span>
        {article.readTime && (
          <>
            <span className={isDark ? 'text-white/25' : 'text-black/25'}>•</span>
            <span
              className={`text-[11px] font-light ${isDark ? 'text-white/50' : 'text-black/50'}`}
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {article.readTime}
            </span>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        className={`font-light leading-snug transition-colors duration-300 mb-3 group-hover:text-[#B59A62] ${
          isDark
            ? 'text-[1.4rem] sm:text-[1.7rem] text-[#F3F1ED]'
            : isFeatured
            ? 'text-[1.6rem] sm:text-[2rem] text-[#151515]'
            : 'text-[1.3rem] sm:text-[1.6rem] text-[#151515]'
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <Link href={`/journal/${article.slug}`}>
          {article.title}
        </Link>
      </h3>

      {/* Excerpt */}
      <p
        className={`text-[13.5px] leading-relaxed font-light line-clamp-3 mb-5 flex-1 ${
          isDark ? 'text-white/60' : 'text-[#6F6B65]'
        }`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {article.excerpt}
      </p>

      {/* Read Link */}
      <div className="pt-2">
        <Link
          href={`/journal/${article.slug}`}
          className={`inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-semibold transition-all duration-300 group-hover:gap-3 ${
            isDark
              ? 'text-[#B59A62] hover:text-white'
              : 'text-[#151515]/70 hover:text-[#B59A62]'
          }`}
        >
          <span>READ ARTICLE</span>
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
