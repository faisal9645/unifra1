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
  Building
} from 'lucide-react';
import { saveLead } from '../../utils/leadsStorage';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buying a MYSA Luxe Villa',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    saveLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@lead.unifra.in`,
      interestedUnit: formData.interest,
      source: 'Contact Page Direct Form',
      notes: formData.message
    });

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div className="pt-24 pb-20 bg-[#faf8f5] text-[#1a1918]">
      {/* 1. Hero Banner */}
      <section className="relative w-full mb-16 px-6 sm:px-10 lg:px-12">
        <div className="max-w-[1380px] mx-auto bg-[#fbf9f6] rounded-[32px] p-8 sm:p-14 lg:p-16 border border-[#eae4db] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c59b67]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#8c827a] font-medium">
                PRIVATE INQUIRIES & ADVISORY
              </span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1a1918] leading-[1.08]">
              Contact <span className="italic font-serif-luxury text-[#c59b67]">Unifra.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#68625d] font-light leading-relaxed max-w-xl">
              Ready to explore coastal architectural living? Connect with our senior advisory team for private guided previews, bespoke architectural plans, and investment consultations.
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

      {/* 2. Get In Touch Section */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            CONSULTATION
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Get <span className="italic font-serif-luxury text-[#c59b67]">In Touch</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
            Whether you are exploring purchasing an exclusive villa or seeking architectural consultancy for your land parcel in Chennai, our team is at your disposal.
          </p>
        </div>

        {/* Contact Form Card */}
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
                Your inquiry regarding <strong className="text-[#1a1918]">{formData.interest}</strong> has been received by our leadership team. We will contact you at <strong className="text-[#c59b67] font-mono">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', interest: 'Buying a MYSA Luxe Villa', message: '' });
                }}
                className="px-8 py-3.5 rounded-sm bg-[#1a1918] text-white text-xs font-mono uppercase tracking-wider font-medium hover:bg-[#2b2723] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className="w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2">
                    I'm interested in
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all"
                  >
                    <option value="Buying a MYSA Luxe Villa">Buying a MYSA Luxe Villa (ECR)</option>
                    <option value="Scheduling an ECR Site Visit">Scheduling an ECR Site Visit</option>
                    <option value="Azure Enclave Oceanfront">Azure Enclave Oceanfront Mansions</option>
                    <option value="Joint Venture">Joint Venture / Turnkey Plot Build</option>
                    <option value="Architectural Consultancy">Architectural Consultancy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8c827a] mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry, preferred villa size, or timeline..."
                  className="w-full px-4 py-3.5 rounded-sm border border-[#e5ded4] bg-[#faf8f5] focus:border-[#1a1918] outline-none text-sm text-[#1a1918] transition-all font-light"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white font-medium text-xs font-mono tracking-[0.2em] uppercase shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-3.5 h-3.5 text-[#c59b67]" />
                  <span>{submitting ? 'Sending Inquiry...' : 'Send Message'}</span>
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
