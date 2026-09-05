import { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import SEO from '../components/SEO';
import SectionReveal from '../components/SectionReveal';
import SafeImage from '../components/SafeImage';
import { API } from '../lib/api';

const STUDIO_DETAILS = {
  name: 'SK Interior Design Studio',
  addressLine1: '25-B, New Kantwadi Road',
  addressLine2: 'Santacruz West',
  cityStateZip: 'Mumbai, Maharashtra 400054',
  phones: [
    { number: '+91 98707 60240', href: 'tel:9870760240' },
    { number: '+91 91674 01020', href: 'tel:9167401020' },
  ],
  email: 'hello@skinterior.in',
  hours: 'Monday – Saturday · 10:00 AM – 7:00 PM',
  appointmentNote: 'Consultations by appointment only.',
  whatsappUrl:
    'https://wa.me/919870760240?text=Hi%20SK%20Interior%2C%20I%27m%20interested%20in%20discussing%20an%20interior%20project.',
  googleMapsUrl:
    'https://maps.google.com/?q=Santacruz+West+Mumbai',
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

export default function ContactPage() {
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
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setServerError('');

    try {
      // Map to backend schema: name, email, phone, city, property, budget, date (mapped from timeline), message
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        property: form.property,
        budget: form.budget,
        date: form.timeline, // backend stores date/timeline as string
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
        description="Get in touch with SK Interior. Visit our studio in Santacruz, Mumbai or send us your project details to begin your spatial architecture journey."
        canonical="/contact"
      />

      <main className="overflow-x-hidden">
        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 1 — CONTACT HERO
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="relative min-h-[50vh] lg:min-h-[55vh] flex flex-col justify-end pt-[120px] pb-12 lg:pt-[140px] lg:pb-16"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15 blur-[120px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-wide relative z-10">
            <SectionReveal>
              <span className="section-label mb-6 text-[#B59A62] block">
                START A PROJECT
              </span>
            </SectionReveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <SectionReveal delay={100}>
                  <h1
                    className="text-[2.4rem] sm:text-[3.5rem] lg:text-[4.8rem] leading-[1.02] tracking-[-0.03em] font-light text-[#F3F1ED] uppercase"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    LET&apos;S START<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      A CONVERSATION.
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
                    Tell us about your space, your ideas, and what you want to create. We&apos;ll use the information to understand your project and begin the conversation.
                  </p>
                </SectionReveal>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 2 & 3 — MAIN CONTACT EXPERIENCE & PREMIUM ENQUIRY FORM
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-16 sm:py-24 lg:py-32"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* LEFT SIDE — LET'S TALK (Studio Details) */}
              <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-10">
                <SectionReveal>
                  <span className="section-label mb-4 block">
                    GET IN TOUCH
                  </span>
                  <h2
                    className="text-[2.1rem] sm:text-[2.8rem] lg:text-[3.2rem] leading-[1.05] tracking-[-0.025em] font-light uppercase text-[#151515] mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    TELL US<br />
                    WHAT YOU&apos;RE<br />
                    <span className="text-italic-serif text-[#B59A62]">
                      PLANNING.
                    </span>
                  </h2>
                  <p
                    className="text-[14px] sm:text-[15px] leading-relaxed text-[#151515]/70 font-light mb-8"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Whether you are starting a new residential build, renovating an existing residence, or designing a commercial flagship — we look forward to hearing from you.
                  </p>
                </SectionReveal>

                {/* Verified Studio Contact Details */}
                <SectionReveal delay={100}>
                  <div className="space-y-6 text-[14px] font-light text-[#151515]/80 border-t border-[#151515]/10 pt-6">
                    {/* Studio Address */}
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                        STUDIO LOCATION
                      </span>
                      <p className="leading-relaxed text-[#151515] font-normal">
                        {STUDIO_DETAILS.addressLine1},<br />
                        {STUDIO_DETAILS.addressLine2},<br />
                        {STUDIO_DETAILS.cityStateZip}
                      </p>
                    </div>

                    {/* Phones */}
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                        DIRECT PHONE
                      </span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {STUDIO_DETAILS.phones.map((p, i) => (
                          <a
                            key={i}
                            href={p.href}
                            className="hover:text-[#B59A62] transition-colors font-medium text-[#151515]"
                          >
                            {p.number}
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                        EMAIL ENQUIRIES
                      </span>
                      <a
                        href={`mailto:${STUDIO_DETAILS.email}`}
                        className="hover:text-[#B59A62] transition-colors font-medium text-[#151515] block"
                      >
                        {STUDIO_DETAILS.email}
                      </a>
                    </div>

                    {/* Studio Hours */}
                    <div className="space-y-1">
                      <span className="text-[10px] tracking-[0.24em] uppercase font-bold text-[#B59A62] block">
                        STUDIO HOURS
                      </span>
                      <p className="text-[#151515] font-normal">{STUDIO_DETAILS.hours}</p>
                      <p className="text-xs text-[#151515]/50 italic">{STUDIO_DETAILS.appointmentNote}</p>
                    </div>
                  </div>
                </SectionReveal>

                {/* WhatsApp & Review Note */}
                <SectionReveal delay={150}>
                  <div className="pt-6 border-t border-[#151515]/10 space-y-4">
                    <a
                      href={STUDIO_DETAILS.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-full border border-[#151515]/20 text-[10px] tracking-[0.22em] uppercase font-semibold text-[#151515] hover:bg-[#151515] hover:text-[#F3F1ED] transition-all duration-300 shadow-sm"
                    >
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                      </svg>
                      <span>Instant WhatsApp Inquiry</span>
                    </a>

                    <p className="text-[12px] text-[#151515]/60 leading-relaxed font-light text-center">
                      We&apos;ll review your enquiry and get back to you as soon as possible.
                    </p>
                  </div>
                </SectionReveal>
              </div>

              {/* RIGHT SIDE — PREMIUM ENQUIRY FORM */}
              <div className="lg:col-span-7">
                <SectionReveal delay={150}>
                  <div className="bg-[#111111] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl text-[#F3F1ED]">
                    
                    <div className="mb-8">
                      <span className="text-[9px] tracking-[0.28em] uppercase font-bold text-[#B59A62] block mb-2">
                        PROJECT ENQUIRY FORM
                      </span>
                      <h3
                        className="text-[1.8rem] sm:text-[2.2rem] font-light uppercase text-[#F3F1ED]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        SHARE YOUR <span className="text-italic-serif text-[#B59A62]">DETAILS</span>
                      </h3>
                    </div>

                    {/* SUCCESS STATE */}
                    {submitted ? (
                      <div className="py-12 px-6 text-center space-y-6 bg-white/5 rounded-2xl border border-white/10 my-4">
                        <div className="w-16 h-16 rounded-full border border-[#B59A62] bg-[#B59A62]/10 text-[#B59A62] flex items-center justify-center mx-auto text-2xl">
                          ✓
                        </div>

                        <div>
                          <span className="text-[10px] tracking-[0.28em] uppercase text-[#B59A62] font-semibold block mb-2">
                            THANK YOU
                          </span>
                          <h4
                            className="text-[1.8rem] sm:text-[2.2rem] font-light text-[#F3F1ED] uppercase"
                            style={{ fontFamily: 'var(--font-display)' }}
                          >
                            YOUR ENQUIRY HAS BEEN RECEIVED.
                          </h4>
                        </div>

                        <p
                          className="text-[14.5px] leading-relaxed text-[#F3F1ED]/70 font-light max-w-md mx-auto"
                          style={{ fontFamily: 'var(--font-body)' }}
                        >
                          We&apos;ll review the details of your project and continue the conversation from here within 24 business hours.
                        </p>

                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleReset}
                            className="px-8 py-3.5 rounded-full border border-[#B59A62] text-[#B59A62] text-[10px] tracking-[0.24em] uppercase font-bold hover:bg-[#B59A62] hover:text-[#111111] transition-all duration-300"
                          >
                            SEND ANOTHER ENQUIRY
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* FORM BODY */
                      <form onSubmit={handleSubmit} noValidate className="space-y-6">
                        
                        {/* Name & Email (Mobile stacks 1 col, Desktop 2 cols) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="field-group">
                            <label htmlFor="contact-name" className="field-label text-[#F3F1ED]/70">
                              Full Name *
                            </label>
                            <input
                              id="contact-name"
                              type="text"
                              value={form.name}
                              onChange={(e) => handleChange('name', e.target.value)}
                              placeholder="e.g. Ananya Sharma"
                              className={`field-input field-input-dark ${
                                errors.name ? '!border-red-500' : ''
                              }`}
                              aria-invalid={!!errors.name}
                              aria-describedby={errors.name ? 'err-name' : undefined}
                            />
                            {errors.name && (
                              <span id="err-name" className="text-xs text-red-400 font-light">
                                {errors.name}
                              </span>
                            )}
                          </div>

                          <div className="field-group">
                            <label htmlFor="contact-email" className="field-label text-[#F3F1ED]/70">
                              Email Address *
                            </label>
                            <input
                              id="contact-email"
                              type="email"
                              value={form.email}
                              onChange={(e) => handleChange('email', e.target.value)}
                              placeholder="ananya@example.com"
                              className={`field-input field-input-dark ${
                                errors.email ? '!border-red-500' : ''
                              }`}
                              aria-invalid={!!errors.email}
                              aria-describedby={errors.email ? 'err-email' : undefined}
                            />
                            {errors.email && (
                              <span id="err-email" className="text-xs text-red-400 font-light">
                                {errors.email}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Phone & City */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="field-group">
                            <label htmlFor="contact-phone" className="field-label text-[#F3F1ED]/70">
                              Phone Number *
                            </label>
                            <input
                              id="contact-phone"
                              type="tel"
                              value={form.phone}
                              onChange={(e) => handleChange('phone', e.target.value)}
                              placeholder="+91 98765 43210"
                              className={`field-input field-input-dark ${
                                errors.phone ? '!border-red-500' : ''
                              }`}
                              aria-invalid={!!errors.phone}
                              aria-describedby={errors.phone ? 'err-phone' : undefined}
                            />
                            {errors.phone && (
                              <span id="err-phone" className="text-xs text-red-400 font-light">
                                {errors.phone}
                              </span>
                            )}
                          </div>

                          <div className="field-group">
                            <label htmlFor="contact-city" className="field-label text-[#F3F1ED]/70">
                              City / Location
                            </label>
                            <input
                              id="contact-city"
                              type="text"
                              value={form.city}
                              onChange={(e) => handleChange('city', e.target.value)}
                              placeholder="e.g. Mumbai (Bandra), Alibaug"
                              className="field-input field-input-dark"
                            />
                          </div>
                        </div>

                        {/* Property Type & Budget */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="field-group">
                            <label htmlFor="contact-property" className="field-label text-[#F3F1ED]/70">
                              Project Type *
                            </label>
                            <select
                              id="contact-property"
                              value={form.property}
                              onChange={(e) => handleChange('property', e.target.value)}
                              className="field-input field-input-dark cursor-pointer bg-[#1A1A1A]"
                            >
                              <option value="Residential Apartment">Residential Apartment</option>
                              <option value="Independent Villa / House">Independent Villa / House</option>
                              <option value="Commercial / Office Space">Commercial / Office Space</option>
                              <option value="Hospitality / Café / Restaurant">Hospitality / Café / Restaurant</option>
                              <option value="Turnkey Renovation">Turnkey Renovation</option>
                              <option value="Other">Other Design Scope</option>
                            </select>
                          </div>

                          <div className="field-group">
                            <label htmlFor="contact-budget" className="field-label text-[#F3F1ED]/70">
                              Budget / Investment Range
                            </label>
                            <select
                              id="contact-budget"
                              value={form.budget}
                              onChange={(e) => handleChange('budget', e.target.value)}
                              className="field-input field-input-dark cursor-pointer bg-[#1A1A1A]"
                            >
                              <option value="₹15L – ₹25L">₹15L – ₹25L</option>
                              <option value="₹25L – ₹50L">₹25L – ₹50L</option>
                              <option value="₹50L – ₹1 Cr">₹50L – ₹1 Cr</option>
                              <option value="₹1 Cr+">₹1 Cr+</option>
                            </select>
                          </div>
                        </div>

                        {/* Target Timeline */}
                        <div className="field-group">
                          <label htmlFor="contact-timeline" className="field-label text-[#F3F1ED]/70">
                            Project Stage / Target Timeline
                          </label>
                          <select
                            id="contact-timeline"
                            value={form.timeline}
                            onChange={(e) => handleChange('timeline', e.target.value)}
                            className="field-input field-input-dark cursor-pointer bg-[#1A1A1A]"
                          >
                            <option value="Immediate (Within 1 month)">Immediate (Within 1 month)</option>
                            <option value="1 – 3 Months">1 – 3 Months</option>
                            <option value="3 – 6 Months">3 – 6 Months</option>
                            <option value="Planning / Future Stage">Planning / Future Stage</option>
                          </select>
                        </div>

                        {/* Project Details Message */}
                        <div className="field-group">
                          <label htmlFor="contact-message" className="field-label text-[#F3F1ED]/70">
                            Message & Project Details *
                          </label>
                          <textarea
                            id="contact-message"
                            rows={4}
                            value={form.message}
                            onChange={(e) => handleChange('message', e.target.value)}
                            placeholder="Tell us about the space size (approx sq ft), current condition, key requirements, and design preferences..."
                            className={`field-input field-input-dark resize-none ${
                              errors.message ? '!border-red-500' : ''
                            }`}
                            aria-invalid={!!errors.message}
                            aria-describedby={errors.message ? 'err-message' : undefined}
                          />
                          {errors.message && (
                            <span id="err-message" className="text-xs text-red-400 font-light">
                              {errors.message}
                            </span>
                          )}
                        </div>

                        {/* CALM INLINE SERVER ERROR */}
                        {serverError && (
                          <div className="p-4 rounded-xl bg-red-950/50 border border-red-800 text-red-300 text-xs leading-relaxed font-light">
                            {serverError}
                          </div>
                        )}

                        {/* SUBMIT BUTTON */}
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full min-h-[52px] py-4 rounded-full text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl"
                          style={{ background: 'var(--color-gold)', color: '#111111' }}
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-4 w-4 text-[#111111]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              <span>SENDING ENQUIRY...</span>
                            </>
                          ) : (
                            <span>SEND ENQUIRY</span>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                </SectionReveal>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 4 — WHAT HAPPENS NEXT
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 lg:py-28"
          style={{ background: 'var(--color-bg-alt)' }}
        >
          <div className="container-wide">
            <SectionReveal>
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="section-label text-[#B59A62] mb-4 block">
                  AFTER YOU GET IN TOUCH
                </span>
                <h2
                  className="text-[2.2rem] sm:text-[3rem] font-light uppercase text-[#F3F1ED]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  A SIMPLE <span className="text-italic-serif text-[#B59A62]">FIRST STEP.</span>
                </h2>
              </div>
            </SectionReveal>

            {/* 3-Column Editorial Grid on Desktop, Compact Vertical on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
              {NEXT_STEPS.map((step, idx) => (
                <SectionReveal key={step.num} delay={idx * 100}>
                  <div className="p-8 rounded-2xl bg-[#111111] border border-white/10 space-y-4 hover:border-[#B59A62]/40 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[2.5rem] font-light text-[#B59A62]"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {step.num}
                      </span>
                      <span className="w-8 h-px bg-[#B59A62]/40" />
                    </div>

                    <h3
                      className="text-[1.4rem] font-light text-[#F3F1ED] uppercase"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {step.title}
                    </h3>

                    <p
                      className="text-[13.5px] leading-relaxed text-[#F3F1ED]/60 font-light"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════════
            SECTION 5 — LOCATION / STUDIO (Verified Studio Info)
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-20 lg:py-28"
          style={{ background: 'var(--color-surface)' }}
        >
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Studio Info Left */}
              <div className="lg:col-span-6">
                <SectionReveal>
                  <span className="section-label mb-4 block">
                    OUR LOCATION
                  </span>
                  <h2
                    className="text-[2.2rem] sm:text-[3rem] font-light uppercase text-[#151515] mb-6"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    VISIT THE <span className="text-italic-serif text-[#B59A62]">STUDIO</span>
                  </h2>

                  <p
                    className="text-[14.5px] sm:text-[15.5px] leading-relaxed text-[#151515]/75 font-light mb-8 max-w-lg"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    Located in Pali Hill, Bandra West, our studio space hosts material consultations, 3D project reviews, and initial design discovery meetings by appointment.
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start gap-3 text-[14px] text-[#151515]/80 font-light">
                      <span className="w-2 h-2 rounded-full bg-[#B59A62] mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-[#151515]">{STUDIO_DETAILS.name}</p>
                        <p>{STUDIO_DETAILS.addressLine1}, {STUDIO_DETAILS.addressLine2}, {STUDIO_DETAILS.cityStateZip}</p>
                      </div>
                    </div>
                  </div>

                  <a
                    href={STUDIO_DETAILS.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#151515] text-[#F3F1ED] text-[10px] tracking-[0.24em] uppercase font-bold hover:bg-[#B59A62] hover:text-[#111111] transition-all duration-300"
                  >
                    <span>Get Directions on Google Maps</span>
                    <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </SectionReveal>
              </div>

              {/* Studio Architectural Image Frame Right */}
              <div className="lg:col-span-6">
                <SectionReveal direction="left" delay={150}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] w-full border border-[#151515]/10 shadow-xl group">
                    <SafeImage
                      src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
                      alt="SK Interior Santacruz Studio entrance"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end text-white">
                      <div>
                        <span className="text-[9px] tracking-[0.26em] uppercase font-semibold text-[#B59A62] block">
                          SANTACRUZ, MUMBAI
                        </span>
                        <p className="text-xs font-light opacity-80">
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
            SECTION 6 — FINAL EDITORIAL CTA
            ═══════════════════════════════════════════════════════════════════ */}
        <section
          className="py-24 lg:py-32 relative overflow-hidden"
          style={{ background: 'var(--color-bg)' }}
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute bottom-0 right-1/4 w-[500px] h-[300px] rounded-full pointer-events-none opacity-15 blur-[100px]"
            style={{ background: '#B59A62' }}
          />

          <div className="container-narrow text-center relative z-10">
            <SectionReveal>
              <span className="section-label text-[#B59A62] mb-6 justify-center block">
                STILL EXPLORING?
              </span>
            </SectionReveal>

            <SectionReveal delay={100}>
              <h2
                className="text-[2.2rem] sm:text-[3.2rem] lg:text-[4rem] leading-[1.05] tracking-[-0.03em] font-light uppercase text-[#F3F1ED] mb-8"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                SEE WHAT<br />
                <span className="text-italic-serif text-[#B59A62]">
                  WE&apos;VE CREATED.
                </span>
              </h2>
            </SectionReveal>

            <SectionReveal delay={200}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
                <Link
                  href="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:-translate-y-1 shadow-xl"
                  style={{ background: 'var(--color-gold)', color: '#111111' }}
                >
                  VIEW PROJECTS →
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-full border border-white/20 text-[#F3F1ED] text-[10px] tracking-[0.26em] uppercase font-bold transition-all duration-300 hover:border-[#B59A62] hover:text-[#B59A62] hover:-translate-y-1"
                >
                  EXPLORE SERVICES →
                </Link>
              </div>
            </SectionReveal>
          </div>
        </section>
      </main>
    </>
  );
}
