import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import { API } from '../lib/api';

/* ─────────────────────────────────────────────────────────
   VERIFIED STUDIO DATA — DO NOT INVENT VALUES
   ───────────────────────────────────────────────────────── */
const STUDIO_DETAILS = {
  name: 'SK Interior Design Studio',
  addressLine1: '1012, Commercial Tower',
  addressLine2: 'Near Trade Centre, BKC',
  cityStateZip: 'Mumbai, Maharashtra',
  phones: [
    { number: '+91 98707 60240', href: 'tel:9870760240' },
    { number: '+91 91674 01020', href: 'tel:9167401020' },
  ],
  email: 'skinteriordesigner90@gmail.com',
  hours: 'Monday – Saturday · 10:00 AM – 7:00 PM',
  appointmentNote: 'Consultations by appointment only.',
  whatsappUrl:
    'https://wa.me/919870760240?text=Hi%20SK%20Interior%2C%20I%27m%20interested%20in%20discussing%20an%20interior%20project.',
<<<<<<< HEAD
  googleMapsUrl: 'https://maps.google.com/?q=Santacruz+West+Mumbai',
=======
  googleMapsUrl:
    'https://maps.google.com/?q=1012+Commercial+Tower+Near+Trade+Centre+BKC+Mumbai',
>>>>>>> upstream/main
};

const NEXT_STEPS = [
  {
    num: '01',
    title: 'WE REVIEW',
    description:
      'We examine your space size, architectural scope, and lifestyle goals to prepare for our initial discussion.',
  },
  {
    num: '02',
    title: 'WE CONNECT',
    description:
      'We schedule a conversation or studio visit to discuss preliminary ideas, spatial layouts, and project parameters.',
  },
  {
    num: '03',
    title: 'WE EXPLORE',
    description:
      'We present a structured project roadmap, fees, and creative framework outlining how your space can take shape.',
  },
];

/* ─────────────────────────────────────────────────────────
   ARCHITECTURAL FORM FIELD — Underline-only style
   ───────────────────────────────────────────────────────── */
function ArchField({ id, label, error, children, required }) {
  return (
    <div className="arch-field-group">
      <label htmlFor={id} className="arch-field-label">
        {label}
        {required && (
          <span className="text-[#B59A62] ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <span role="alert" className="arch-field-error">
          {error}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   PAGE
   ───────────────────────────────────────────────────────── */
export default function ContactPage() {
  /* ── Form state — matches backend payload exactly ── */
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    property: 'Residential Apartment',
    budget: '₹25L – ₹50L',
    timeline: '1 – 3 Months',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  /* ── Validation — identical to original ── */
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) {
      errs.name = 'Full name is required.';
    }
    if (!form.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required.';
    } else if (form.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid contact number.';
    }
    if (!form.message.trim()) {
      errs.message = 'Please share a brief description of your project.';
    }
    return errs;
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    if (serverError) setServerError('');
  };

  /* ── Submit — identical backend call ── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstKey = Object.keys(validationErrors)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        property: form.property,
        budget: form.budget,
        date: form.timeline,
        time: 'Flexible',
        message: form.message.trim(),
      };

      await axios.post(`${API}/bookings`, payload);
      setSubmitted(true);
    } catch (err) {
      setServerError(
        err.response?.data?.message ||
          "We couldn't send your enquiry right now. Please try again in a moment or call us directly at +91 98707 60240."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: '',
      email: '',
      phone: '',
      city: '',
      property: 'Residential Apartment',
      budget: '₹25L – ₹50L',
      timeline: '1 – 3 Months',
      message: '',
    });
    setErrors({});
    setServerError('');
    setSubmitted(false);
  };

  return (
    <>
      <SEO
        title="Start a Project — Contact Studio"
        description="Get in touch with SK Interior. Visit our studio in BKC, Mumbai or send us your project details to begin your spatial architecture journey."
        canonical="/contact"
      />

      {/* ══════════════════════════════════════════════════════════════
          CONTACT PAGE STYLES — scoped, no global side-effects
          ══════════════════════════════════════════════════════════════ */}
      <style>{`
        /* Architectural underline form fields */
        .arch-field-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .arch-field-label {
          font-size: 0.63rem;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          font-weight: 700;
          color: rgba(243,241,237,0.45);
          font-family: var(--font-body);
          transition: color 0.25s ease;
        }

        .arch-field-group:focus-within .arch-field-label {
          color: #B59A62;
        }

        .arch-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.15);
          border-radius: 0;
          padding: 12px 0 12px 0;
          font-family: var(--font-body);
          font-size: 0.93rem;
          color: #F3F1ED;
          outline: none;
          transition: border-color 0.25s ease;
          -webkit-appearance: none;
          appearance: none;
        }

        .arch-input::placeholder {
          color: rgba(243,241,237,0.25);
          font-weight: 300;
        }

        .arch-input:focus {
          border-bottom-color: #B59A62;
        }

        .arch-input.has-error {
          border-bottom-color: rgba(248,113,113,0.7);
        }

        .arch-select {
          background-color: transparent;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23B59A62' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0 center;
          padding-right: 20px;
          cursor: pointer;
        }

        .arch-select option {
          background: #1A1A1A;
          color: #F3F1ED;
        }

        .arch-field-error {
          font-size: 0.72rem;
          color: rgba(248,113,113,0.9);
          font-family: var(--font-body);
          font-weight: 400;
          letter-spacing: 0.01em;
        }

        /* Studio contact info rows */
        .studio-info-row {
          border-bottom: 1px solid rgba(21,21,21,0.08);
          padding-bottom: 20px;
        }

        /* Hover gold transition for contact links */
        .contact-link {
          transition: color 0.2s ease;
          color: #151515;
          font-weight: 500;
        }

        .contact-link:hover {
          color: #B59A62;
        }

        /* Next Step cards on dark bg */
        .next-step-card {
          border-bottom: 1px solid rgba(255,255,255,0.08);
          padding-bottom: 28px;
          transition: border-color 0.3s ease;
        }

        .next-step-card:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .next-step-card:hover {
          border-bottom-color: rgba(181,154,98,0.3);
        }

        /* Success fade-in */
        @keyframes successReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .success-reveal {
          animation: successReveal 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        /* WhatsApp button */
        .whatsapp-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          justify-content: center;
          padding: 13px 24px;
          border: 1px solid rgba(21,21,21,0.15);
          border-radius: 999px;
          font-size: 0.66rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 700;
          font-family: var(--font-body);
          color: #151515;
          transition: all 0.3s ease;
          background: transparent;
        }

        .whatsapp-btn:hover {
          background: #151515;
          color: #F3F1ED;
          border-color: #151515;
        }
      `}</style>

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — EDITORIAL HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col justify-end overflow-hidden pb-16 lg:pb-24"
          style={{
            background: 'var(--color-bg)',
            paddingTop: '140px',
          }}
        >
          {/* Background Hero Image Overlay */}
          <div className="absolute inset-0 z-0 opacity-65 overflow-hidden pointer-events-none">
            <div className="w-full h-full scale-110">
              <SafeImage
                src="/images/image.png"
                alt="SK Interior Contact Studio"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-black/30" />
          </div>
          {/* Ambient glow — top-left */}
          <div
            className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full pointer-events-none opacity-14 blur-[130px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal>
              <span className="section-label text-[#B59A62] mb-6 block">
                START A PROJECT
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-end">
              <div className="lg:col-span-7">
                <SectionReveal delay={80}>
                  <h1
                    className="display-xl text-[#F3F1ED] uppercase font-light leading-[1.04]"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    LET&apos;S START<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      A CONVERSATION.
                    </span>
                  </h1>
                </SectionReveal>
              </div>

              <div className="lg:col-span-5">
                <SectionReveal delay={160}>
                  <p
                    className="text-[15px] sm:text-[16px] leading-relaxed text-[#F3F1ED]/60 font-light mb-6"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Tell us about your space, your ideas, and what you want to create. We&apos;ll use the information to understand your project and begin the conversation.
                  </p>
                  {/* Quick-reach row */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {STUDIO_DETAILS.phones.map((p, i) => (
                      <a
                        key={i}
                        href={p.href}
                        className="text-[11.5px] tracking-[0.04em] text-[#F3F1ED]/50 hover:text-[#B59A62] transition-colors font-light"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {p.number}
                      </a>
                    ))}
                    <span className="text-[#F3F1ED]/20">·</span>
                    <a
                      href={`mailto:${STUDIO_DETAILS.email}`}
                      className="text-[11.5px] tracking-[0.04em] text-[#F3F1ED]/50 hover:text-[#B59A62] transition-colors font-light"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {STUDIO_DETAILS.email}
                    </a>
                  </div>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 — TWO-COLUMN MAIN: STUDIO INFO + ENQUIRY FORM
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

              {/* ── LEFT: STUDIO INFO (sticky) ── */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
                <SectionReveal>
                  <div>
                    <span className="section-label mb-4 block">
                      GET IN TOUCH
                    </span>
                    <h2
                      className="display-md text-[#151515] uppercase font-light leading-[1.06] mb-5"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      TELL US<br />
                      WHAT YOU&apos;RE<br />
                      <span className="text-italic-serif text-[#B59A62]">
                        PLANNING.
                      </span>
                    </h2>
                    <p
                      className="text-[14px] sm:text-[15px] leading-relaxed text-[#151515]/65 font-light"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      Whether you are starting a new residential build, renovating an existing residence, or designing a commercial flagship — we look forward to hearing from you.
                    </p>
                  </div>
                </SectionReveal>

                {/* ── Studio Contact Details ── */}
                <SectionReveal delay={80}>
                  <div className="space-y-5 border-t border-[#151515]/10 pt-8">
                    {/* Address */}
                    <div className="studio-info-row">
                      <span className="text-[9px] tracking-[0.26em] uppercase font-bold text-[#B59A62] block mb-2">
                        STUDIO LOCATION
                      </span>
                      <p
                        className="text-[14px] text-[#151515] font-normal leading-relaxed"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {STUDIO_DETAILS.addressLine1},<br />
                        {STUDIO_DETAILS.addressLine2},<br />
                        {STUDIO_DETAILS.cityStateZip}
                      </p>
                    </div>

                    {/* Phones */}
                    <div className="studio-info-row">
                      <span className="text-[9px] tracking-[0.26em] uppercase font-bold text-[#B59A62] block mb-2">
                        DIRECT PHONE
                      </span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {STUDIO_DETAILS.phones.map((p, i) => (
                          <a
                            key={i}
                            href={p.href}
                            className="contact-link text-[14px]"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            {p.number}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="studio-info-row">
                      <span className="text-[9px] tracking-[0.26em] uppercase font-bold text-[#B59A62] block mb-2">
                        EMAIL ENQUIRIES
                      </span>
                      <a
                        href={`mailto:${STUDIO_DETAILS.email}`}
                        className="contact-link text-[14px] block"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {STUDIO_DETAILS.email}
                      </a>
                    </div>

                    {/* Hours */}
                    <div>
                      <span className="text-[9px] tracking-[0.26em] uppercase font-bold text-[#B59A62] block mb-2">
                        STUDIO HOURS
                      </span>
                      <p
                        className="text-[14px] text-[#151515] font-normal"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {STUDIO_DETAILS.hours}
                      </p>
                      <p
                        className="text-[12px] text-[#151515]/50 font-light italic mt-0.5"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {STUDIO_DETAILS.appointmentNote}
                      </p>
                    </div>
                  </div>
                </SectionReveal>

                {/* ── WhatsApp CTA ── */}
                <SectionReveal delay={140}>
                  <div className="space-y-3">
                    <a
                      href={STUDIO_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-btn"
                    >
                      {/* WhatsApp icon */}
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Instant WhatsApp Inquiry</span>
                    </a>
                    <p
                      className="text-[11.5px] text-[#151515]/50 leading-relaxed font-light text-center"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      We&apos;ll review your enquiry and get back to you as soon as possible.
                    </p>
                  </div>
                </SectionReveal>
              </div>

              {/* ── RIGHT: ENQUIRY FORM (dark architectural) ── */}
              <div className="lg:col-span-7">
                <SectionReveal delay={120}>
                  {/* Form panel — dark, architectural */}
                  <div
                    className="relative overflow-hidden"
                    style={{
                      background: '#111111',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Subtle ambient corner */}
                    <div
                      className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none opacity-8 blur-[80px]"
                      style={{ background: '#B59A62' }}
                    />

                    <div className="relative z-10 p-8 sm:p-10 lg:p-12">
                      {/* Form Header */}
                      <div className="mb-10 pb-6 border-b border-white/8">
                        <span className="text-[8.5px] tracking-[0.30em] uppercase font-bold text-[#B59A62] block mb-3">
                          PROJECT ENQUIRY FORM
                        </span>
                        <h3
                          className="display-sm text-[#F3F1ED] uppercase font-light"
                          style={{ fontFamily: 'var(--font-display)' }}
                        >
                          SHARE YOUR{' '}
                          <span className="text-italic-serif text-[#B59A62]">DETAILS</span>
                        </h3>
                      </div>

                      {/* ── SUCCESS STATE ── */}
                      {submitted ? (
                        <div className="success-reveal py-12 text-center space-y-6">
                          {/* Checkmark ring */}
                          <div className="w-16 h-16 rounded-full border border-[#B59A62] flex items-center justify-center mx-auto">
                            <svg
                              width="24"
                              height="24"
                              fill="none"
                              stroke="#B59A62"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M5 12l5 5L19 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>

                          <div className="space-y-3">
                            <span className="text-[9px] tracking-[0.28em] uppercase text-[#B59A62] font-bold block">
                              THANK YOU
                            </span>
                            <h4
                              className="display-sm text-[#F3F1ED] uppercase font-light"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              YOUR ENQUIRY HAS BEEN RECEIVED.
                            </h4>
                          </div>

                          <p
                            className="text-[14px] leading-relaxed text-[#F3F1ED]/60 font-light max-w-sm mx-auto"
                            style={{ fontFamily: 'var(--font-body)' }}
                          >
                            We&apos;ll review the details of your project and continue the conversation from here within 24 business hours.
                          </p>

                          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                            <button
                              type="button"
                              onClick={handleReset}
                              className="px-7 py-3 border border-[#B59A62] text-[#B59A62] text-[10px] tracking-[0.22em] uppercase font-bold hover:bg-[#B59A62] hover:text-[#111111] transition-all duration-300 rounded-full"
                            >
                              SEND ANOTHER ENQUIRY
                            </button>
                            <Link
                              href="/projects"
                              className="px-7 py-3 border border-white/15 text-[#F3F1ED]/60 text-[10px] tracking-[0.22em] uppercase font-bold hover:border-white/30 hover:text-[#F3F1ED] transition-all duration-300 rounded-full"
                            >
                              VIEW OUR WORK
                            </Link>
                          </div>
                        </div>
                      ) : (
                        /* ── FORM BODY ── */
                        <form
                          onSubmit={handleSubmit}
                          noValidate
                          className="space-y-8"
                          aria-label="Project enquiry form"
                        >
                          {/* Row 1: Name + Email */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <ArchField
                              id="contact-name"
                              label="Full Name"
                              error={errors.name}
                              required
                            >
                              <input
                                id="contact-name"
                                type="text"
                                value={form.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g. Ananya Sharma"
                                autoComplete="name"
                                className={`arch-input${errors.name ? ' has-error' : ''}`}
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'err-name' : undefined}
                              />
                            </ArchField>

                            <ArchField
                              id="contact-email"
                              label="Email Address"
                              error={errors.email}
                              required
                            >
                              <input
                                id="contact-email"
                                type="email"
                                value={form.email}
                                onChange={(e) => handleChange('email', e.target.value)}
                                placeholder="ananya@example.com"
                                autoComplete="email"
                                className={`arch-input${errors.email ? ' has-error' : ''}`}
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'err-email' : undefined}
                              />
                            </ArchField>
                          </div>

                          {/* Row 2: Phone + City */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <ArchField
                              id="contact-phone"
                              label="Phone Number"
                              error={errors.phone}
                              required
                            >
                              <input
                                id="contact-phone"
                                type="tel"
                                value={form.phone}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                placeholder="+91 98765 43210"
                                autoComplete="tel"
                                className={`arch-input${errors.phone ? ' has-error' : ''}`}
                                aria-required="true"
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? 'err-phone' : undefined}
                              />
                            </ArchField>

                            <ArchField id="contact-city" label="City / Location">
                              <input
                                id="contact-city"
                                type="text"
                                value={form.city}
                                onChange={(e) => handleChange('city', e.target.value)}
                                placeholder="e.g. Mumbai (Bandra), Alibaug"
                                autoComplete="address-level2"
                                className="arch-input"
                              />
                            </ArchField>
                          </div>

                          {/* Row 3: Project Type + Budget */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <ArchField id="contact-property" label="Project Type">
                              <select
                                id="contact-property"
                                value={form.property}
                                onChange={(e) => handleChange('property', e.target.value)}
                                className="arch-input arch-select"
                              >
                                <option value="Residential Apartment">Residential Apartment</option>
                                <option value="Independent Villa / House">Independent Villa / House</option>
                                <option value="Commercial / Office Space">Commercial / Office Space</option>
                                <option value="Hospitality / Café / Restaurant">Hospitality / Café / Restaurant</option>
                                <option value="Turnkey Renovation">Turnkey Renovation</option>
                                <option value="Other">Other Design Scope</option>
                              </select>
                            </ArchField>

                            <ArchField id="contact-budget" label="Budget / Investment Range">
                              <select
                                id="contact-budget"
                                value={form.budget}
                                onChange={(e) => handleChange('budget', e.target.value)}
                                className="arch-input arch-select"
                              >
                                <option value="₹15L – ₹25L">₹15L – ₹25L</option>
                                <option value="₹25L – ₹50L">₹25L – ₹50L</option>
                                <option value="₹50L – ₹1 Cr">₹50L – ₹1 Cr</option>
                                <option value="₹1 Cr+">₹1 Cr+</option>
                              </select>
                            </ArchField>
                          </div>

                          {/* Row 4: Timeline (full width) */}
                          <ArchField
                            id="contact-timeline"
                            label="Project Stage / Target Timeline"
                          >
                            <select
                              id="contact-timeline"
                              value={form.timeline}
                              onChange={(e) => handleChange('timeline', e.target.value)}
                              className="arch-input arch-select"
                            >
                              <option value="Immediate (Within 1 month)">Immediate (Within 1 month)</option>
                              <option value="1 – 3 Months">1 – 3 Months</option>
                              <option value="3 – 6 Months">3 – 6 Months</option>
                              <option value="Planning / Future Stage">Planning / Future Stage</option>
                            </select>
                          </ArchField>

                          {/* Row 5: Message (full width) */}
                          <ArchField
                            id="contact-message"
                            label="Message & Project Details"
                            error={errors.message}
                            required
                          >
                            <textarea
                              id="contact-message"
                              rows={5}
                              value={form.message}
                              onChange={(e) => handleChange('message', e.target.value)}
                              placeholder="Tell us about the space size (approx sq ft), current condition, key requirements, and design preferences..."
                              className={`arch-input resize-none${errors.message ? ' has-error' : ''}`}
                              aria-required="true"
                              aria-invalid={!!errors.message}
                              aria-describedby={errors.message ? 'err-message' : undefined}
                            />
                          </ArchField>

                          {/* Server error */}
                          {serverError && (
                            <div
                              role="alert"
                              className="px-5 py-4 border border-red-900/50 text-red-300 text-[12.5px] leading-relaxed font-light"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              {serverError}
                            </div>
                          )}

                          {/* Divider before submit */}
                          <div className="border-t border-white/8 pt-6">
                            <button
                              type="submit"
                              disabled={loading}
                              id="contact-submit"
                              className="w-full min-h-[54px] flex items-center justify-center gap-3 text-[10px] tracking-[0.28em] uppercase font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-92 focus-visible:outline-offset-4"
                              style={{
                                background: 'var(--color-gold)',
                                color: '#111111',
                              }}
                              aria-busy={loading}
                              aria-disabled={loading}
                            >
                              {loading ? (
                                <>
                                  {/* Spinner */}
                                  <svg
                                    className="animate-spin h-4 w-4 text-[#111111] flex-shrink-0"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  <span>SENDING ENQUIRY...</span>
                                </>
                              ) : (
                                <>
                                  <span>SEND ENQUIRY</span>
                                  <svg
                                    width="14"
                                    height="14"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    className="submit-arrow"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M5 12h14M12 5l7 7-7 7"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </>
                              )}
                            </button>

                            {/* Required field note */}
                            <p
                              className="mt-4 text-[11px] text-[#F3F1ED]/30 font-light tracking-[0.02em]"
                              style={{ fontFamily: 'var(--font-body)' }}
                            >
                              Fields marked with * are required.
                            </p>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                </SectionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 3 — WHAT HAPPENS NEXT (Dark strip)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <SectionReveal>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
                <div className="lg:col-span-6">
                  <span className="section-label text-[#B59A62] mb-4 block">
                    AFTER YOU GET IN TOUCH
                  </span>
                  <h2
                    className="display-md text-[#F3F1ED] uppercase font-light"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    A SIMPLE{' '}
                    <span className="text-italic-serif text-[#B59A62]">FIRST STEP.</span>
                  </h2>
                </div>
                <div className="lg:col-span-6 lg:pt-4">
                  <p
                    className="text-[14.5px] leading-relaxed text-[#F3F1ED]/55 font-light"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Every great space begins with a focused conversation. Here is what happens after you reach out to the studio.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* 3-step list — editorial vertical layout */}
            <div className="space-y-0 border-t border-white/8">
              {NEXT_STEPS.map((step, idx) => (
                <SectionReveal key={step.num} delay={idx * 80}>
                  <div className="next-step-card grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start py-8">
                    {/* Step number */}
                    <div className="md:col-span-2">
                      <span
                        className="text-[2.8rem] font-light leading-none text-[#B59A62] opacity-70"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.num}
                      </span>
                    </div>

                    {/* Step content */}
                    <div className="md:col-span-4">
                      <h3
                        className="text-[1.2rem] font-light text-[#F3F1ED] uppercase tracking-[0.04em]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.title}
                      </h3>
                    </div>

                    <div className="md:col-span-6">
                      <p
                        className="text-[14px] leading-relaxed text-[#F3F1ED]/55 font-light"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {step.description}
                      </p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — VISIT THE STUDIO (Location + Image)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="section-padding"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

              {/* Studio info */}
              <div className="lg:col-span-5 order-2 lg:order-1">
                <SectionReveal>
                  <span className="section-label mb-4 block">
                    OUR LOCATION
                  </span>
                  <h2
                    className="display-md text-[#151515] uppercase font-light mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    VISIT THE{' '}
                    <span className="text-italic-serif text-[#B59A62]">STUDIO</span>
                  </h2>

                  <p
                    className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#151515]/70 font-light mb-8 max-w-lg"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
<<<<<<< HEAD
                    Located in Santacruz West, our studio space hosts material consultations, 3D project reviews, and initial design discovery meetings by appointment.
=======
                    Located in 1012 Commercial Tower, near Trade Centre, BKC, our studio space hosts material consultations, 3D project reviews, and initial design discovery meetings by appointment.
>>>>>>> upstream/main
                  </p>

                  <div className="space-y-4 mb-8 text-[14px]" style={{ fontFamily: 'var(--font-body)' }}>
                    <div className="flex items-start gap-3 text-[#151515]/75 font-light">
                      <span className="w-2 h-2 rounded-full bg-[#B59A62] mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-[#151515]">{STUDIO_DETAILS.name}</p>
                        <p>
                          {STUDIO_DETAILS.addressLine1}, {STUDIO_DETAILS.addressLine2},{' '}
                          {STUDIO_DETAILS.cityStateZip}
                        </p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={STUDIO_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#151515] text-[#F3F1ED] text-[10px] tracking-[0.24em] uppercase font-bold hover:bg-[#B59A62] hover:text-[#111111] transition-all duration-300 rounded-full group"
                  >
                    <span>Get Directions on Google Maps</span>
                    <svg
                      width="13"
                      height="13"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      <path
                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                </SectionReveal>
              </div>

              {/* Studio image */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <SectionReveal direction="left" delay={100}>
                  <div className="relative overflow-hidden aspect-[16/10] w-full border border-[#151515]/8 group">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
<<<<<<< HEAD
                      alt="SK Interior Santacruz Studio entrance"
                      className="w-full h-full object-cover transition-transform duration-900 ease-out group-hover:scale-104"
=======
                      alt="SK Interior BKC Studio entrance"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
>>>>>>> upstream/main
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent pointer-events-none" />
                    {/* Bottom caption */}
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
                      <div>
<<<<<<< HEAD
                        <span className="text-[8.5px] tracking-[0.28em] uppercase font-bold text-[#B59A62] block mb-0.5">
                          SANTACRUZ, MUMBAI
=======
                        <span className="text-[9px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block">
                          BKC, MUMBAI
>>>>>>> upstream/main
                        </span>
                        <p
                          className="text-[12px] font-light text-white/75"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          By Appointment · Monday – Saturday
                        </p>
                      </div>
                    </div>
                  </div>
                </SectionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — FINAL EDITORIAL CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative py-24 lg:py-32 overflow-hidden"
          style={{ background: 'var(--color-bg)' }}
        >
          <div
            className="absolute bottom-0 right-1/4 w-[480px] h-[280px] rounded-full pointer-events-none opacity-13 blur-[100px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            <SectionReveal>
              <span className="section-label text-[#B59A62] mb-6 justify-center block">
                STILL EXPLORING?
              </span>
            </SectionReveal>

            <SectionReveal delay={80}>
              <h2
                className="display-lg uppercase text-[#F3F1ED] mb-8 font-light"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SEE WHAT<br />
                <span className="text-italic-serif text-[#B59A62]">
                  WE&apos;VE CREATED.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={160}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: 'var(--color-gold)', color: '#111111' }}
                >
                  <span>VIEW PROJECTS</span>
                  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 border border-white/18 text-[#F3F1ED] text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:border-[#B59A62] hover:text-[#B59A62] hover:-translate-y-0.5 rounded-full"
                >
                  <span>EXPLORE SERVICES</span>
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
