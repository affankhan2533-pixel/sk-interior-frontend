import Link from 'next/link';
import SafeImage from './SafeImage';

export default function JournalCard({ article, className = '' }) {
  if (!article) return null;

  return (
    <article className={`journal-card group flex flex-col ${className}`}>
      <Link
        href={`/journal/${article.slug}`}
        className="block overflow-hidden rounded-2xl mb-6 aspect-[16/10] bg-[#1A1A1A] relative border border-black/5"
      >
        <SafeImage
          src={article.coverImage}
          alt={article.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
        <span className="text-[9px] tracking-[0.24em] uppercase font-bold text-[#B59A62]">
          {article.category}
        </span>
        <span className="text-[#151515]/30">•</span>
        <span
          className="text-[#151515]/50 font-light"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {article.date}
        </span>
        {article.readTime && (
          <>
            <span className="text-[#151515]/30">•</span>
            <span
              className="text-[#151515]/50 font-light"
              style={{ fontFamily: 'var(--font-body)' }}
            >
              {article.readTime}
            </span>
          </>
        )}
      </div>

      <h3
        className="text-[1.5rem] sm:text-[1.8rem] font-light leading-snug text-[#151515] group-hover:text-[#B59A62] transition-colors duration-300 mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        <Link href={`/journal/${article.slug}`}>
          {article.title}
        </Link>
      </h3>

      <p
        className="text-[14px] leading-relaxed font-light text-[#151515]/65 line-clamp-3 mb-6 flex-1"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {article.excerpt}
      </p>

      <div className="pt-2">
        <Link
          href={`/journal/${article.slug}`}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase font-bold text-[#151515] group-hover:text-[#B59A62] transition-colors"
        >
          <span>READ ARTICLE</span>
          <svg
            width="12"
            height="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
