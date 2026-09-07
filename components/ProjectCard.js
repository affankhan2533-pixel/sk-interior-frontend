import Link from 'next/link';
<<<<<<< HEAD
import SafeImage from './SafeImage';
=======
import { resolveImageSrc } from '../lib/api';
>>>>>>> upstream/main

export default function ProjectCard({ project, aspect = 'ratio-4-3', featured = false }) {
  if (!project) return null;

  const imageSrc = resolveImageSrc(project.coverImage || project.imageUrl || project.heroImage);

  return (
    <Link
      href={`/projects/${project.slug || project._id}`}
      className={`group project-card-editorial block ${featured ? 'lg:col-span-2' : ''}`}
      data-cursor="view"
    >
<<<<<<< HEAD
      {/* Image Container with Curtain Reveal & Scale Hover */}
      <div className={`card-img img-cover ${aspect} mb-5 rounded-xl relative overflow-hidden shadow-xl border border-white/10 group-hover:border-[#B59A62]/40 transition-colors duration-500`}>
        <SafeImage
          src={project.coverImage || project.heroImage}
=======
      <div className={`card-img img-cover ${aspect} mb-5 rounded-lg relative overflow-hidden`}>
        <img
          src={imageSrc}
>>>>>>> upstream/main
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="card-overlay flex items-end p-6 lg:p-8 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-90 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[#F3F1ED] text-[10.5px] tracking-[0.24em] uppercase font-semibold flex items-center gap-3">
            <span>EXPLORE CASE STUDY</span>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24" className="transition-transform duration-300 group-hover:translate-x-1.5">
              <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>

      {/* Metadata & Title Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
            <span className="text-[9.5px] tracking-[0.24em] uppercase font-semibold text-[#B59A62]">
              {project.category}
            </span>
            {project.location && (
              <>
                <span className="text-[#151515]/30">•</span>
                <span
                  className="text-xs text-[#151515]/50 font-light"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {project.location}
                </span>
              </>
            )}
            {project.year && (
              <>
                <span className="text-[#151515]/30">•</span>
                <span className="text-xs text-[#151515]/50 font-light" style={{ fontFamily: 'var(--font-body)' }}>
                  {project.year}
                </span>
              </>
            )}
          </div>

          <h3
            className="text-[1.6rem] sm:text-[1.9rem] lg:text-[2.2rem] font-light leading-snug group-hover:text-[#B59A62] transition-colors duration-300 -translate-y-0 group-hover:-translate-y-0.5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-ink)' }}
          >
            {project.title}
          </h3>

          {project.intro && (
            <p className="text-xs sm:text-sm text-[#6F6B65] font-light line-clamp-2 leading-relaxed max-w-xl" style={{ fontFamily: 'var(--font-body)' }}>
              {project.intro}
            </p>
          )}
        </div>

        {project.number && (
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <span className="w-4 h-px bg-[#B59A62] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span
              className="text-[1.2rem] sm:text-[1.4rem] font-light text-[#151515]/30 group-hover:text-[#B59A62] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {project.number}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
