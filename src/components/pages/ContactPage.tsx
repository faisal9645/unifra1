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

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    interest: 'Buying a Villa',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="pt-24 pb-20 bg-[#0b0c0e] text-[#f3f4f6]">
      {/* 1. Hero Banner */}
      <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="relative rounded-sm overflow-hidden min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-8 sm:p-14 shadow-2xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=80"
            alt="Contact Unifra Front Porch"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

          <div className="relative z-10 text-center max-w-3xl text-white">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
              <span>PRIVATE INQUIRIES & ADVISORY</span>
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4 text-white">
              Contact <span className="italic font-serif-luxury text-[#dfb776]">Unifra</span>
            </h1>
            <p className="text-xs sm:text-base text-gray-300 font-light leading-relaxed">
              Ready to buy your dream home? Get in touch with our expert team today.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Get In Touch Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            CONSULTATION
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-4">
            Get <span className="italic font-serif-luxury text-[#dfb776]">In Touch</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
            We'd love to help you find your perfect villa! Whether you're ready to buy or just exploring your options, our team is here to answer your questions and guide you through every step. Reach out to us today — we're excited to hear from you!
          </p>
        </div>

        {/* Contact Form Card */}
        <div className="max-w-3xl mx-auto bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl">
          {isSubmitted ? (
            <div className="text-center py-10 animate-in fade-in zoom-in-95 duration-400">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-2">
                Thank You, {formData.name || 'Valued Client'}!
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto mb-6 font-light">
                Your inquiry regarding <strong className="text-white">{formData.interest}</strong> has been received by Mr. Siddiq Ahmed and our leadership team. We will call you back at <strong className="text-[#dfb776]">{formData.phone}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: '', phone: '', email: '', interest: 'Buying a Villa', message: '' });
                }}
                className="px-6 py-2.5 rounded-sm bg-[#dfb776] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#c5a880] transition-colors cursor-pointer"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full px-4 py-3 rounded-sm border border-white/15 focus:border-[#dfb776] focus:ring-1 focus:ring-[#dfb776]/30 outline-none text-sm text-white transition-all bg-black/40"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className="w-full px-4 py-3 rounded-sm border border-white/15 focus:border-[#dfb776] focus:ring-1 focus:ring-[#dfb776]/30 outline-none text-sm text-white transition-all bg-black/40 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-sm border border-white/15 focus:border-[#dfb776] focus:ring-1 focus:ring-[#dfb776]/30 outline-none text-sm text-white transition-all bg-black/40 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                    I'm interested in
                  </label>
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-3 rounded-sm border border-white/15 focus:border-[#dfb776] focus:ring-1 focus:ring-[#dfb776]/30 outline-none text-sm text-white transition-all bg-[#0b0c0e]"
                  >
                    <option value="Buying a Villa">Buying a MYSA Luxe Villa</option>
                    <option value="Scheduling a Site Visit">Scheduling an ECR Site Visit</option>
                    <option value="Investment Advisory">Real Estate Investment Advisory</option>
                    <option value="Joint Venture">Joint Venture / Plot Development</option>
                    <option value="Architectural Consultancy">Architectural Consultancy</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more about your inquiry, preferred villa size, or timeline..."
                  className="w-full px-4 py-3 rounded-sm border border-white/15 focus:border-[#dfb776] focus:ring-1 focus:ring-[#dfb776]/30 outline-none text-sm text-white transition-all bg-black/40 font-light"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs font-mono tracking-wider uppercase shadow-lg shadow-[#dfb776]/10 flex items-center justify-center gap-2.5 transition-all cursor-pointer disabled:opacity-75"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Inquiry...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. Visit Our Office Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            HEADQUARTERS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-4">
            Visit <span className="italic font-serif-luxury text-[#dfb776]">Our Office</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
            Step into our office in T. Nagar, Chennai, to explore our villa designs and discuss how we can bring your dream home to life. Schedule a private consultation today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Office Contact Info Card */}
          <div className="bg-[#121418] rounded-sm p-8 border border-white/10 shadow-2xl space-y-6 text-left">
            <h3 className="font-serif-luxury text-2xl font-bold text-white">
              Chennai Corporate Office
            </h3>

            <div className="space-y-4 pt-2 text-xs sm:text-sm text-gray-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#dfb776] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Address:</strong>
                  <span>4/11, G R Mansion, 2nd Floor, Srinivasa Rd, T. Nagar, Chennai, Tamil Nadu 600017</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#dfb776] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Phone:</strong>
                  <a href="tel:7358222445" className="hover:text-[#dfb776] font-mono text-gray-300">
                    +91 73582 22445
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#dfb776] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Email:</strong>
                  <a href="mailto:info@unifra.in" className="hover:text-[#dfb776] font-mono text-gray-300">
                    info@unifra.in
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#dfb776] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block mb-0.5">Hours:</strong>
                  <span>Monday – Saturday: 9:00 AM – 6:00 PM</span>
                  <span className="text-[11px] text-gray-500 block mt-0.5">Sunday: Closed</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <a
                href="https://maps.google.com/?q=4/11+G+R+Mansion+Srinivasa+Rd+T+Nagar+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-sm border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:border-[#dfb776] hover:text-[#dfb776] transition-colors"
              >
                <Navigation className="w-4 h-4 text-[#dfb776]" />
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Visual */}
          <div className="lg:col-span-2 bg-[#121418] rounded-sm overflow-hidden border border-white/10 shadow-2xl relative min-h-[420px]">
            <div className="relative w-full h-[420px] bg-black/50 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1600&q=80"
                alt="Chennai T. Nagar Map"
                className="w-full h-full object-cover filter saturate-50 contrast-125 opacity-70"
              />
              <div className="absolute inset-0 bg-[#0b0c0e]/60 backdrop-blur-[1px]" />

              {/* Map Floating Card HUD */}
              <div className="absolute top-6 left-6 z-10 bg-[#121418]/90 backdrop-blur-md p-4 rounded-sm shadow-xl border border-white/10 max-w-xs text-left">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#dfb776] animate-ping" />
                  <span className="text-xs font-bold text-white">Unifra Headquarters</span>
                </div>
                <p className="text-[11px] text-gray-400 leading-tight">
                  4/11, G R Mansion, 2nd Floor, Srinivasa Rd, T. Nagar, Chennai 600017
                </p>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[9px] font-mono text-gray-500">
                  <span>LAT: 13.0418° N</span>
                  <span>LNG: 80.2341° E</span>
                </div>
              </div>

              {/* Map Marker Pin in Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
                <div className="bg-[#dfb776] text-[#0b0c0e] p-3 rounded-full shadow-2xl ring-4 ring-black/50">
                  <Building className="w-6 h-6" />
                </div>
                <div className="bg-[#0b0c0e] border border-[#dfb776]/40 text-[#dfb776] px-3 py-1 rounded-sm text-[10px] font-mono font-bold mt-2 shadow-lg tracking-wider">
                  UNIFRA HQ • T. NAGAR
                </div>
              </div>

              {/* Open in Google Maps button bottom right */}
              <div className="absolute bottom-6 right-6 z-10">
                <a
                  href="https://maps.google.com/?q=4/11+G+R+Mansion+Srinivasa+Rd+T+Nagar+Chennai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#121418] border border-white/20 hover:border-[#dfb776] text-white hover:text-[#dfb776] font-mono text-xs shadow-xl transition-all cursor-pointer"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#dfb776]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
