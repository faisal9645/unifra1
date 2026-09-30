import React, { useState } from 'react';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  ExternalLink,
  Navigation,
  Building,
  Car,
  CalendarDays,
  User,
  MessageSquare
} from 'lucide-react';
import { saveLead } from '../../utils/leadsStorage';

interface ContactPageProps {
  /** Preselects the "I'm interested in" field, e.g. when arriving from a project CTA. */
  presetInterest?: string;
}

const INTEREST_OPTIONS = [
  'Buying a MYSA Luxe Villa (ECR)',
  'Scheduling an ECR Site Visit',
  'Azure Enclave Oceanfront Mansions',
  'Joint Venture / Turnkey Plot Build',
  'Architectural Consultancy',
  'General Inquiry'
];

const TIME_SLOTS = [
  '11:00 AM — Morning',
  '2:00 PM — Afternoon',
  '4:30 PM — Golden Hour'
];

export const ContactPage: React.FC<ContactPageProps> = ({ presetInterest }) => {
  const interestOptions =
    presetInterest && !INTEREST_OPTIONS.includes(presetInterest)
      ? [presetInterest, ...INTEREST_OPTIONS]
      : INTEREST_OPTIONS;

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: presetInterest || 'Buying a MYSA Luxe Villa (ECR)',
    preferredDate: '',
    preferredTime: TIME_SLOTS[0],
    chauffeurPickUp: true,
    pickupLocation: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    const wantsVisit = formData.interest === 'Scheduling an ECR Site Visit';
    const notes = [
      formData.message,
      wantsVisit || formData.preferredDate
        ? `Preferred visit: ${formData.preferredDate || 'flexible'} • ${formData.preferredTime}.`
        : '',
      formData.chauffeurPickUp && (wantsVisit || formData.preferredDate)
        ? `Chauffeur pick-up: Yes${formData.pickupLocation ? ` (${formData.pickupLocation})` : ''}.`
        : ''
    ].filter(Boolean).join(' ');

    saveLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@lead.unifra.in`,
      interestedUnit: formData.interest,
      source: 'Contact Page — Unified Inquiry Form',
      notes,
      status: wantsVisit ? 'VIP Visit Scheduled' : 'New Lead'
    });

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const inputCls =
    'w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all';
  const labelCls = 'block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2';

  return (
    <div className="pt-20 pb-12 bg-[#faf8f5] text-[#1a1918]">
      {/* 1. Hero Banner */}
      <section className="relative w-full mb-10 px-6 sm:px-10 lg:px-12">
        <div className="max-w-[1380px] mx-auto bg-[#fbf9f6] rounded-[32px] p-8 sm:p-14 lg:p-16 border border-[#eae4db] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c59b67]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#8c827a] font-medium">
                PRIVATE INQUIRIES, VISITS & ADVISORY
              </span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1a1918] leading-[1.08]">
              Contact <span className="italic font-serif-luxury text-[#c59b67]">Unifra.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#68625d] font-light leading-relaxed max-w-xl">
              One form for everything — general inquiries, private ECR site visits with chauffeur pick-up, villa purchases, joint ventures, and architectural consultancy.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#8c827a]">
              <div><strong className="text-[#1a1918] text-sm block">Direct Line</strong> +91 73582 22445</div>
              <div className="w-px h-6 bg-[#eae4db]" />
              <div><strong className="text-[#1a1918] text-sm block">Concierge</strong> info@unifra.in</div>
              <div className="w-px h-6 bg-[#eae4db]" />
              <div><strong className="text-[#1a1918] text-sm block">Experience</strong> Vettuvankeni ECR</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-t-[140px] rounded-b-[24px] overflow-hidden border border-[#eae4db] shadow-md h-[340px] sm:h-[400px]">
              <img
                src="/images/mysa3d/BAX00768.jpg"
                alt="MYSA Lotus Gate Entrance & Portico"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 p-3.5 bg-white/90 backdrop-blur-md rounded-lg border border-white/40 text-center">
                <span className="text-[10px] font-mono tracking-widest text-[#1a1918] uppercase block font-medium">
                  LOTUS GATE & ARRIVAL BOULEVARD • ECR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Unified Form Section */}
      <section id="inquiry-form" className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-14">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            ONE FORM • EVERY PURPOSE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Begin Your <span className="italic font-serif-luxury text-[#c59b67]">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
            Tell us what you're looking for. Our senior advisory team responds within 2 business hours.
          </p>
        </div>

        {/* Unified Form Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-[24px] p-8 sm:p-12 border border-[#eae4db] shadow-sm">
          {isSubmitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-[#c59b67]/10 text-[#c59b67] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1a1918] mb-2">
                Thank You, {formData.name || 'Valued Client'}!
              </h3>
              <p className="text-xs sm:text-sm text-[#68625d] max-w-md mx-auto mb-6 font-light">
                Your inquiry regarding <strong className="text-[#1a1918]">{formData.interest}</strong> has been received.
                {formData.preferredDate || formData.interest === 'Scheduling an ECR Site Visit'
                  ? ` We will confirm your visit for ${formData.preferredDate || 'an upcoming day'} at ${formData.preferredTime.split(' — ')[0]} at `
                  : ' We will contact you at '}
                <strong className="text-[#c59b67] font-mono">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    interest: 'Buying a MYSA Luxe Villa (ECR)',
                    preferredDate: '',
                    preferredTime: TIME_SLOTS[0],
                    chauffeurPickUp: true,
                    pickupLocation: '',
                    message: ''
                  });
                }}
                className="px-8 py-3.5 rounded-sm bg-[#1a1918] text-white text-xs font-mono uppercase tracking-wider font-medium hover:bg-[#2b2723] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              {/* Identity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>
                    <span className="inline-flex items-center gap-1.5"><User className="w-3 h-3 text-[#c59b67]" /> Your Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className={labelCls}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className={`${inputCls} font-mono`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className={`${inputCls} font-mono`}
                  />
                </div>

                <div>
                  <label className={labelCls}>I'm interested in</label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className={inputCls}
                  >
                    {interestOptions.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Visit scheduling (shown for site visit, optional otherwise) */}
              <div className="rounded-[16px] border border-[#eae4db] bg-[#fbf9f6] p-5 sm:p-6 space-y-5">
                <div className="flex items-center gap-2 text-[10px] font-mono font-semibold uppercase tracking-wider text-[#c59b67]">
                  <CalendarDays className="w-3.5 h-3.5" />
                  <span>Preferred Visit — Optional (or required for Site Visit requests)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Preferred Date</label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className={`${inputCls} font-mono`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Time</label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className={inputCls}
                    >
                      {TIME_SLOTS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formData.chauffeurPickUp}
                    onChange={(e) => setFormData({ ...formData, chauffeurPickUp: e.target.checked })}
                    className="w-4 h-4 accent-[#c59b67] cursor-pointer"
                  />
                  <span className="inline-flex items-center gap-1.5 text-xs text-[#1a1918]">
                    <Car className="w-3.5 h-3.5 text-[#c59b67]" />
                    Arrange complimentary chauffeur pick-up
                  </span>
                </label>

                {formData.chauffeurPickUp && (
                  <div>
                    <label className={labelCls}>Pick-up Location</label>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="Residence, hotel, or Chennai International Airport"
                      className={inputCls}
                    />
                  </div>
                )}
              </div>

              <div>
                <label className={labelCls}>
                  <span className="inline-flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-[#c59b67]" /> Message</span>
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry, preferred villa size, or timeline..."
                  className={`${inputCls} font-light`}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white font-medium text-xs font-mono tracking-[0.2em] uppercase shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-3.5 h-3.5 text-[#c59b67]" />
                  <span>{submitting ? 'Sending Inquiry...' : 'Submit Inquiry'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. Visit Our Office Section */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            HEADQUARTERS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Visit <span className="italic font-serif-luxury text-[#c59b67]">Our Office</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
            Step into our corporate office or schedule a preview at our ECR Experience Pavilion to discuss your residential aspirations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Office Contact Info Card */}
          <div className="bg-white rounded-[20px] p-8 border border-[#eae4db] shadow-sm space-y-6 text-left">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1a1918]">
              Chennai Corporate Office
            </h3>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#68625d]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Address:</strong>
                  <span>4/11, G R Mansion, 2nd Floor, Srinivasa Rd, T. Nagar, Chennai, Tamil Nadu 600017</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Phone:</strong>
                  <a href="tel:7358222445" className="hover:text-[#c59b67] font-mono text-[#1a1918]">
                    +91 73582 22445
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Email:</strong>
                  <a href="mailto:info@unifra.in" className="hover:text-[#c59b67] font-mono text-[#1a1918]">
                    info@unifra.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Operating Hours:</strong>
                  <span>Monday – Saturday: 9:30 AM – 6:30 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* ECR Experience Pavilion Card */}
          <div className="bg-white rounded-[20px] p-8 border border-[#eae4db] shadow-sm space-y-6 text-left">
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1a1918]">
              ECR Experience Pavilion
            </h3>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-[#68625d]">
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Site Location:</strong>
                  <span>MYSA Enclave, 122 East Coast Road, Vettuvankeni, Chennai – 600115</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Experience Center:</strong>
                  <span>Sample Villa Walkthrough, Material Library, 3D Virtual Flythrough</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#c59b67] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1a1918] block mb-0.5">Site Visit Hours:</strong>
                  <span>Daily: 10:00 AM – 6:00 PM (Prior Appointment Advised)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map / Directions Card */}
          <div className="bg-[#f4f0eb] rounded-[20px] p-8 border border-[#e5ded4] shadow-sm space-y-5 text-left flex flex-col justify-between h-full">
            <div>
              <h3 className="font-serif-luxury text-2xl font-bold text-[#1a1918] mb-2">
                Need Directions?
              </h3>
              <p className="text-xs sm:text-sm text-[#68625d] font-light leading-relaxed">
                Our site team can arrange a chauffeur pick-up from Chennai International Airport or your residence for VIP site previews.
              </p>
            </div>

            <div className="pt-4 border-t border-[#e5ded4]">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white text-xs font-mono uppercase tracking-wider transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#c59b67]" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
