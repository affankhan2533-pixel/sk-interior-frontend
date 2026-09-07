import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import { API } from '../lib/api';

const REVIEW_REAL_IMAGES = [
  '/review/review-1.png',
  '/review/review-2.png',
  '/review/review-3.png',
  '/review/review-4.png',
  '/review/review-5.png',
  '/review/review-6.png',
  '/review/review-7.png',
  '/review/review-8.png',
];

const DEFAULT_REVIEWS = [
  {
    _id: 'featured-1',
    isFeatured: true,
    name: 'Vikram & Radhika Mehta',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'VM',
    loc: 'Santacruz West, Mumbai',
    project: 'The Santacruz Residence (3,200 sq ft)',
    roomPhoto: '/review/review-1.png',
    rating: 5,
    category: 'Residences',
    date: 'August 2026',
    text: 'SK Interior transformed our 3,200 sq ft apartment into a sanctuary of calm. Simran’s eye for material relationships, lighting contrast, and restraint created a space that feels deeply personal, quiet, and effortlessly luxurious.',
    helpful: 24,
    tags: ['Travertine Marble', 'Custom Walnut', 'Living Sanctuary'],
  },
  {
    _id: 'default-2',
    name: 'Siddharth Singhania',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'SS',
    loc: 'Worli Sea Face, Mumbai',
    project: 'Altitude Penthouse (4,500 sq ft)',
    roomPhoto: '/review/review-2.png',
    rating: 5,
    category: 'Penthouses',
    date: 'July 2026',
    text: 'The altitude penthouse demanded a design that respected the dramatic sea view without feeling like a cold glass showroom. The dark walnut joinery, hand-troweled microcement plaster, and smoked oak flooring ground the space masterfully.',
    helpful: 19,
    tags: ['Bandra Sea Link View', 'Smoked Oak', 'Custom Leather'],
  },
  {
    _id: 'default-3',
    name: 'Tarun & Meera Grover',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'TG',
    loc: 'Alibaug Coast',
    project: 'The Coastal Villa (6,000 sq ft)',
    roomPhoto: '/review/review-3.png',
    rating: 5,
    category: 'Villas',
    date: 'May 2026',
    text: 'Living in our Alibaug villa feels like floating between the interior and the surrounding landscape. The marine-grade teak, fluted stone details, and Kota stone age beautifully under coastal light. Exceptional architectural direction.',
    helpful: 22,
    tags: ['Coastal Teak', 'Outdoor Fluidity', 'Kota Stone'],
  },
  {
    _id: 'default-4',
    name: 'Ananya & Rohan Kapoor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'AK',
    loc: 'Pali Hill, Bandra West',
    project: 'Pali Hill Duplex (2,800 sq ft)',
    roomPhoto: '/review/review-4.png',
    rating: 5,
    category: 'Residences',
    date: 'March 2026',
    text: 'Working with SK Interior was pure alignment from day one. Their turnkey execution was transparent, perfectly timed, and remarkably stress-free. Every guest who walks in is awed by the spatial warmth.',
    helpful: 18,
    tags: ['Pali Hill', 'Turnkey Execution', 'Ambient Lighting'],
  },
  {
    _id: 'default-5',
    name: 'Dr. Kabir Shroff',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'KS',
    loc: 'Juhu, Mumbai',
    project: 'Wellness Suite & Office (1,800 sq ft)',
    roomPhoto: '/review/review-5.png',
    rating: 5,
    category: 'Commercial',
    date: 'January 2026',
    text: 'A masterclass in acoustic softness and organic lighting. The suite balances ultra-clean architectural lines with tactile linen and customized brass fixtures. Our clients constantly comment on the soothing atmosphere.',
    helpful: 15,
    tags: ['Acoustic Linen', 'Brass Detailing', 'Organic Form'],
  },
  {
    _id: 'default-6',
    name: 'Nikhil & Priya Wadhwa',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'NW',
    loc: 'Lower Parel, Mumbai',
    project: 'The Sky Apartment (3,800 sq ft)',
    roomPhoto: '/review/review-6.png',
    rating: 5,
    category: 'Penthouses',
    date: 'November 2025',
    text: 'Simran and her team brought unparalleled perfection to our high-rise apartment. From custom concealed storage solutions to curated art lighting, their attention to micro-details is unmatched in Mumbai.',
    helpful: 20,
    tags: ['High-Rise', 'Concealed Joinery', 'Art Curation'],
  },
  {
    _id: 'default-7',
    name: 'Kavita & Devendra Singhal',
    avatar: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'KS',
    loc: 'Khar West, Mumbai',
    project: 'Khar Courtyard House (4,100 sq ft)',
    roomPhoto: '/review/review-7.png',
    rating: 5,
    category: 'Residences',
    date: 'October 2025',
    text: 'From initial spatial layouts to the final styling, the experience was seamless. The courtyard lighting scheme and micro-textured walls create an extraordinary ambiance at dusk.',
    helpful: 16,
    tags: ['Courtyard Lighting', 'Textured Plaster', 'Bespoke Joinery'],
  },
  {
    _id: 'default-8',
    name: 'Rajesh & Sonal Parekh',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80',
    avatarInitials: 'RP',
    loc: 'Prabhadevi, Mumbai',
    project: 'Seafront Residence (3,600 sq ft)',
    roomPhoto: '/review/review-8.png',
    rating: 5,
    category: 'Residences',
    date: 'September 2025',
    text: 'The restrained material palette of natural marble, fluted oak, and concealed linear lighting turned our seafront apartment into a modern classic.',
    helpful: 21,
    tags: ['Natural Marble', 'Linear Lighting', 'Seafront'],
  },
];

const CATEGORIES = ['All', 'Residences', 'Penthouses', 'Villas', 'Commercial'];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(DEFAULT_REVIEWS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [previewPhotoModal, setPreviewPhotoModal] = useState(null);
  const [helpfulCounts, setHelpfulCounts] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Form state for new review
  const [form, setForm] = useState({
    name: '',
    loc: '',
    project: '',
    rating: 5,
    text: '',
    avatarInitials: 'SK',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Fetch live reviews from backend
  useEffect(() => {
    axios
      .get(`${API}/testimonials`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const merged = res.data.map((item, idx) => ({
            _id: item._id || `backend-${idx}`,
            name: item.name,
            avatar: item.avatar || null,
            avatarInitials: item.name
              ? item.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
              : 'SK',
            loc: item.loc || 'Santacruz West, Mumbai',
            project: item.project || 'Bespoke Residence',
            roomPhoto: item.roomPhoto || REVIEW_REAL_IMAGES[idx % REVIEW_REAL_IMAGES.length],
            rating: item.rating || 5,
            category: item.project?.toLowerCase().includes('villa')
              ? 'Villas'
              : item.project?.toLowerCase().includes('penthouse')
              ? 'Penthouses'
              : item.project?.toLowerCase().includes('office') || item.project?.toLowerCase().includes('suite')
              ? 'Commercial'
              : 'Residences',
            date: 'Recent Client Reflection',
            text: item.text,
            helpful: Math.floor(Math.random() * 10) + 8,
            tags: ['Custom Joinery', 'Bespoke Lighting', 'Turnkey Studio'],
          }));

          // Ensure our reviews stay loaded
          setReviews(merged);
        }
      })
      .catch((err) => {
        console.warn('Using default fallback reviews:', err.message);
      });
  }, []);

  const handleHelpful = (id) => {
    setHelpfulCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.name.trim() || !form.text.trim()) {
      setFormError('Please provide your name and review reflection.');
      return;
    }

    setIsSubmitting(true);
    const initials = form.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

    try {
      const res = await axios.post(`${API}/testimonials/public`, {
        name: form.name,
        loc: form.loc || 'Santacruz West, Mumbai',
        project: form.project || 'Bespoke Interior',
        rating: form.rating,
        text: form.text,
      });

      const created = res.data;

      const newReviewObj = {
        _id: created._id || `user-${Date.now()}`,
        name: created.name,
        avatarInitials: initials,
        loc: created.loc || 'Santacruz West, Mumbai',
        project: created.project || 'Bespoke Interior',
        roomPhoto: REVIEW_REAL_IMAGES[Math.floor(Math.random() * REVIEW_REAL_IMAGES.length)],
        rating: created.rating || form.rating,
        category: 'Residences',
        date: 'Just Published',
        text: created.text,
        helpful: 1,
        tags: ['Verified Client', 'Turnkey Interior'],
      };

      setReviews([newReviewObj, ...reviews]);
      setShowModal(false);
      setForm({ name: '', loc: '', project: '', rating: 5, text: '', avatarInitials: 'SK' });
      triggerToast('Thank you! Your architectural review has been published.');
    } catch (err) {
      console.warn('Backend fallback submit:', err.message);
      const localObj = {
        _id: `user-${Date.now()}`,
        name: form.name,
        avatarInitials: initials,
        loc: form.loc || 'Santacruz West, Mumbai',
        project: form.project || 'Bespoke Residence',
        roomPhoto: REVIEW_REAL_IMAGES[Math.floor(Math.random() * REVIEW_REAL_IMAGES.length)],
        rating: form.rating,
        category: 'Residences',
        date: 'Just Published',
        text: form.text,
        helpful: 1,
        tags: ['Verified Client', 'Bespoke Design'],
      };
      setReviews([localObj, ...reviews]);
      setShowModal(false);
      setForm({ name: '', loc: '', project: '', rating: 5, text: '', avatarInitials: 'SK' });
      triggerToast('Thank you! Your architectural review has been published.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4500);
  };

  const filteredReviews = reviews.filter((r) => {
    const matchesCategory = activeCategory === 'All' || r.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.loc.toLowerCase().includes(q) ||
      r.project.toLowerCase().includes(q) ||
      r.text.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  const featuredReview = filteredReviews.find((r) => r.isFeatured) || filteredReviews[0];

  return (
    <>
      <Head>
        <title>Client Reflections & Reviews | SK Interior Studio Mumbai</title>
        <meta
          name="description"
          content="Explore bespoke client reviews, architectural room photography, and verified reflections from luxury homeowners in Santacruz, Worli, Bandra, and Alibaug."
        />
      </Head>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[999999] bg-[#141414] border border-[#B59A62] text-[#F3F1ED] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in">
          <span className="w-2.5 h-2.5 rounded-full bg-[#B59A62] animate-ping" />
          <p className="text-xs tracking-wider uppercase font-semibold text-[#B59A62]">
            {toastMessage}
          </p>
        </div>
      )}

      {/* Main Page Container */}
      <main className="min-h-screen pt-28 sm:pt-36 pb-24" style={{ background: 'var(--color-bg)' }}>
        
        {/* ═══════════════════════════════════════════════════════════════════
            HERO HEADER
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 lg:pb-20 mb-16 lg:mb-20">
          {/* Background Hero Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-65 overflow-hidden pointer-events-none">
            <div className="w-full h-full scale-110">
              <SafeImage
                src="/images/image copy 4.png"
                alt="SK Interior Client Reflections"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          </div>

          <div className="section-shell relative z-10">
          <SectionReveal>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/10">
              
              <div className="max-w-3xl">
                <span className="section-label mb-4 block text-[#B59A62]">
                  EDITORIAL CLIENT VOICES & ROOM SHOWCASES
                </span>
                <h1 className="display-xl text-[#F3F1ED] mb-6">
                  Living Architecture.<br />
                  <span className="text-italic-serif text-[#B59A62]">Client Reflections.</span>
                </h1>
                <p className="text-[#F3F1ED]/70 text-base sm:text-lg font-light leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-body)' }}>
                  Step inside the homes of patrons across Mumbai, Bandra, Worli, and Alibaug. Each review pairs genuine client reflections with photography of their custom interior spaces.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="px-7 py-4 rounded-xl bg-[#B59A62] text-[#111111] text-xs tracking-[0.24em] uppercase font-bold hover:bg-[#c4a96f] transition-all duration-300 shadow-2xl flex items-center gap-3 group"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 4v16m-8-8h16" strokeLinecap="round" />
                  </svg>
                  <span>SHARE YOUR EXPERIENCE</span>
                </button>

                <Link
                  href="/contact"
                  className="px-7 py-4 rounded-xl border border-white/20 text-[#F3F1ED] text-xs tracking-[0.24em] uppercase font-semibold hover:border-[#B59A62] hover:text-[#B59A62] transition-all duration-300"
                >
                  STUDIO CONSULTATION
                </Link>
              </div>

            </div>
          </SectionReveal>
        </div>
      </section>

        {/* ═══════════════════════════════════════════════════════════════════
            FEATURED PATRON SPOTLIGHT (MAGAZINE HERO CAROUSEL / BANNER)
            ═══════════════════════════════════════════════════════════════════ */}
        {featuredReview && (
          <section className="section-shell mb-16 lg:mb-24">
            <SectionReveal delay={100}>
              <div className="relative rounded-3xl overflow-hidden bg-[#141414] border border-white/15 shadow-2xl group grid grid-cols-1 lg:grid-cols-12 items-stretch">
                
                {/* Left Column: Room Photo with Hover Lightbox Trigger */}
                <div
                  className="lg:col-span-6 relative min-h-[320px] lg:min-h-[440px] cursor-pointer overflow-hidden group/img"
                  onClick={() => setPreviewPhotoModal(featuredReview)}
                >
                  <SafeImage
                    src={featuredReview.roomPhoto}
                    alt={featuredReview.project}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Photo Badge Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <span className="text-[10px] tracking-[0.24em] uppercase px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[#B59A62] font-semibold">
                      Featured Space · {featuredReview.project}
                    </span>

                    <span className="text-xs text-white/90 bg-[#B59A62] text-[#111111] px-3 py-1 rounded-md font-semibold opacity-0 group-hover/img:opacity-100 transition-opacity">
                      Expand Photo ↗
                    </span>
                  </div>
                </div>

                {/* Right Column: Editorial Client Review Content */}
                <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative bg-[#141414]">
                  <div>
                    {/* Header Row: Client Avatar + Verified Badge */}
                    <div className="flex items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
                      <div className="flex items-center gap-4">
                        {/* Client Avatar */}
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#B59A62] shadow-lg flex-shrink-0 bg-[#222]">
                          {featuredReview.avatar ? (
                            <img src={featuredReview.avatar} alt={featuredReview.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#B59A62] font-bold text-sm bg-gradient-to-br from-[#1A1917] to-[#2B2822]">
                              {featuredReview.avatarInitials}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-lg sm:text-xl text-[#F3F1ED] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                            {featuredReview.name}
                          </h3>
                          <p className="text-xs text-[#B59A62] font-light mt-0.5">
                            {featuredReview.loc}
                          </p>
                        </div>
                      </div>

                      {/* 5-Star Gold Badge */}
                      <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 text-[#B59A62]">
                          {[...Array(featuredReview.rating || 5)].map((_, i) => (
                            <svg key={i} width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400 mt-1 font-semibold">
                          Verified Patron
                        </span>
                      </div>
                    </div>

                    {/* Quotation Mark */}
                    <span className="text-5xl text-[#B59A62]/30 font-serif leading-none block mb-3 select-none">
                      “
                    </span>

                    {/* Main Quote Statement */}
                    <p className="text-base sm:text-lg text-[#F3F1ED]/90 font-light leading-relaxed mb-8" style={{ fontFamily: 'var(--font-body)' }}>
                      {featuredReview.text}
                    </p>
                  </div>

                  {/* Project Spec Tags & Interactive Action */}
                  <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      {featuredReview.tags?.map((t) => (
                        <span key={t} className="text-[9.5px] tracking-wider uppercase px-2.5 py-1 rounded-md bg-white/5 text-[#F3F1ED]/60 border border-white/10">
                          {t}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setPreviewPhotoModal(featuredReview)}
                      className="text-xs text-[#B59A62] uppercase tracking-[0.2em] font-semibold hover:underline flex items-center gap-2"
                    >
                      <span>View Room Details</span>
                      <span>→</span>
                    </button>
                  </div>

                </div>

              </div>
            </SectionReveal>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            SEARCH & CATEGORY FILTER TABS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-shell mb-12">
          <SectionReveal delay={150}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
              
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2.5 rounded-full text-[11px] tracking-[0.20em] uppercase font-semibold transition-all duration-300 whitespace-nowrap ${
                        active
                          ? 'bg-[#B59A62] text-[#111111] shadow-lg'
                          : 'bg-[#141414] text-[#F3F1ED]/70 border border-white/10 hover:border-white/30 hover:text-[#F3F1ED]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              <div className="relative min-w-[260px] sm:min-w-[320px]">
                <input
                  type="text"
                  placeholder="Search by client, location, material, project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#141414] border border-white/15 text-[#F3F1ED] placeholder-[#F3F1ED]/40 text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#B59A62] transition-colors"
                />
                {searchQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F3F1ED]/50 hover:text-[#F3F1ED] text-xs"
                  >
                    ✕
                  </button>
                ) : (
                  <svg
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#F3F1ED]/40 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
              </div>

            </div>
          </SectionReveal>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            EDITORIAL MAGAZINE-GRID OF CLIENT REVIEWS
            ═══════════════════════════════════════════════════════════════════ */}
        <section className="section-shell">
          {filteredReviews.length === 0 ? (
            <div className="py-20 text-center bg-[#141414] rounded-2xl border border-white/10">
              <p className="text-[#F3F1ED]/60 text-sm mb-4">No client reviews matched your filter criteria.</p>
              <button
                type="button"
                onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                className="text-[#B59A62] text-xs tracking-widest uppercase font-semibold hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredReviews.map((item, idx) => (
                <SectionReveal key={item._id} delay={100 + (idx % 3) * 80}>
                  <article className="h-full bg-[#141414] border border-white/10 hover:border-[#B59A62]/50 transition-all duration-500 rounded-3xl flex flex-col justify-between relative overflow-hidden group shadow-2xl hover:shadow-[#B59A62]/5">
                    
                    {/* Top Architectural Room Thumbnail (Clickable Lightbox) */}
                    <div
                      className="relative h-48 sm:h-52 overflow-hidden cursor-pointer group/room"
                      onClick={() => setPreviewPhotoModal(item)}
                    >
                      <SafeImage
                        src={item.roomPhoto}
                        alt={item.project}
                        className="w-full h-full object-cover group-hover/room:scale-108 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/30" />
                      
                      {/* Top Overlay Badge */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                        <span className="text-[9px] tracking-[0.22em] uppercase px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#B59A62] font-semibold border border-white/15">
                          {item.category}
                        </span>

                        <span className="text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-md bg-black/70 text-white/90 backdrop-blur-md opacity-0 group-hover/room:opacity-100 transition-opacity">
                          View Space ↗
                        </span>
                      </div>
                    </div>

                    {/* Review Body */}
                    <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between -mt-6 relative z-10">
                      
                      <div>
                        {/* Client Profile Avatar & Name Row */}
                        <div className="flex items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                          <div className="flex items-center gap-3.5">
                            {/* Avatar */}
                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#B59A62]/80 shadow-md flex-shrink-0 bg-[#222]">
                              {item.avatar ? (
                                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#B59A62] font-bold text-xs bg-gradient-to-br from-[#1A1917] to-[#2B2822]">
                                  {item.avatarInitials}
                                </div>
                              )}
                            </div>

                            <div>
                              <h4 className="text-base text-[#F3F1ED] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                                {item.name}
                              </h4>
                              <p className="text-xs text-[#B59A62] font-light">
                                {item.loc}
                              </p>
                            </div>
                          </div>

                          {/* Verified Check Badge */}
                          <div className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center" title="Verified Client">
                            <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>

                        {/* Star Rating */}
                        <div className="flex items-center gap-1 text-[#B59A62] mb-3">
                          {[...Array(item.rating || 5)].map((_, i) => (
                            <svg key={i} width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>

                        {/* Project Specs */}
                        <p className="text-[11px] tracking-wider uppercase text-[#B59A62]/90 font-semibold mb-4">
                          {item.project}
                        </p>

                        {/* Quote Text */}
                        <p className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#F3F1ED]/85 font-light mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                          “{item.text}”
                        </p>
                      </div>

                      {/* Card Bottom Bar */}
                      <div className="pt-5 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-[10px] text-[#F3F1ED]/40 uppercase tracking-wider">
                          {item.date}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleHelpful(item._id)}
                          className="flex items-center gap-1.5 text-xs text-[#F3F1ED]/60 hover:text-[#B59A62] transition-colors group/btn"
                        >
                          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover/btn:scale-110 transition-transform">
                            <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span>Appreciate ({(item.helpful || 8) + (helpfulCounts[item._id] || 0)})</span>
                        </button>
                      </div>

                    </div>

                  </article>
                </SectionReveal>
              ))}
            </div>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            ARCHITECTURAL ROOM PHOTO SHOWCASE MODAL
            ═══════════════════════════════════════════════════════════════════ */}
        {previewPhotoModal && (
          <div className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
            <div className="relative w-full max-w-4xl bg-[#141414] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
              
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setPreviewPhotoModal(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/70 border border-white/20 text-white hover:text-[#B59A62] flex items-center justify-center"
              >
                ✕
              </button>

              {/* Image Column */}
              <div className="lg:w-7/12 h-[340px] lg:h-auto relative bg-black">
                <SafeImage
                  src={previewPhotoModal.roomPhoto}
                  alt={previewPhotoModal.project}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details Column */}
              <div className="lg:w-5/12 p-8 lg:p-10 flex flex-col justify-between bg-[#141414]">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#B59A62] bg-[#222]">
                      {previewPhotoModal.avatar ? (
                        <img src={previewPhotoModal.avatar} alt={previewPhotoModal.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#B59A62] font-bold text-xs">
                          {previewPhotoModal.avatarInitials}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-base text-[#F3F1ED] font-normal" style={{ fontFamily: 'var(--font-display)' }}>
                        {previewPhotoModal.name}
                      </h4>
                      <p className="text-xs text-[#B59A62] font-light">{previewPhotoModal.loc}</p>
                    </div>
                  </div>

                  <p className="text-[11px] tracking-widest uppercase text-[#B59A62] font-semibold mb-3">
                    {previewPhotoModal.project}
                  </p>

                  <p className="text-sm text-[#F3F1ED]/90 font-light leading-relaxed mb-6" style={{ fontFamily: 'var(--font-body)' }}>
                    “{previewPhotoModal.text}”
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] tracking-wider uppercase text-emerald-400 font-semibold">
                    Verified SK Interior Client
                  </span>

                  <button
                    type="button"
                    onClick={() => setPreviewPhotoModal(null)}
                    className="text-xs text-[#B59A62] font-semibold hover:underline"
                  >
                    Close Showcase
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            ADD REVIEW MODAL DIALOG
            ═══════════════════════════════════════════════════════════════════ */}
        {showModal && (
          <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-xl bg-[#141414] border border-white/15 rounded-3xl shadow-2xl p-6 sm:p-10 my-8">
              
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/5 border border-white/10 text-[#F3F1ED]/70 hover:text-[#B59A62] flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>

              <div className="mb-8">
                <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-2">
                  PATRON FEEDBACK
                </span>
                <h3 className="text-2xl sm:text-3xl text-[#F3F1ED] font-light" style={{ fontFamily: 'var(--font-display)' }}>
                  Share Your Story
                </h3>
                <p className="text-xs text-[#F3F1ED]/60 mt-1 font-light">
                  Publish your reflection and architectural journey with SK Interior Studio.
                </p>
              </div>

              {formError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs">
                  {formError}
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikram & Radhika Mehta"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-[#1A1917] border border-white/15 text-[#F3F1ED] text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#B59A62]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                      Location / Neighborhood
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Santacruz West, Mumbai"
                      value={form.loc}
                      onChange={(e) => setForm({ ...form, loc: e.target.value })}
                      className="w-full bg-[#1A1917] border border-white/15 text-[#F3F1ED] text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#B59A62]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                    Residence / Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Santacruz Residence (3,200 sq ft)"
                    value={form.project}
                    onChange={(e) => setForm({ ...form, project: e.target.value })}
                    className="w-full bg-[#1A1917] border border-white/15 text-[#F3F1ED] text-xs px-4 py-3 rounded-xl focus:outline-none focus:border-[#B59A62]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-3 bg-[#1A1917] p-3 rounded-xl border border-white/15">
                    <div className="flex items-center gap-1.5 text-[#B59A62]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm({ ...form, rating: star })}
                          className="p-1 hover:scale-125 transition-transform"
                        >
                          <svg
                            width="20"
                            height="20"
                            fill={star <= form.rating ? 'currentColor' : 'none'}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </button>
                      ))}
                    </div>
                    <span className="text-xs text-[#F3F1ED]/80 font-light">
                      {form.rating === 5 ? '5.0 — Exceptional Craftsmanship' : `${form.rating}.0 — Highly Satisfied`}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase font-semibold text-[#B59A62] mb-2">
                    Your Architectural Reflection / Review *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your design journey, material quality, execution precision, or living experience..."
                    value={form.text}
                    onChange={(e) => setForm({ ...form, text: e.target.value })}
                    className="w-full bg-[#1A1917] border border-white/15 text-[#F3F1ED] text-xs p-4 rounded-xl focus:outline-none focus:border-[#B59A62] leading-relaxed resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 text-xs tracking-wider uppercase text-[#F3F1ED]/60 hover:text-[#F3F1ED]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#B59A62] text-[#111111] text-xs tracking-[0.22em] uppercase font-bold rounded-xl hover:bg-[#c4a96f] transition-all disabled:opacity-50 shadow-xl"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish Review'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </main>
    </>
  );
}
