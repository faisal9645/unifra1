import React from 'react';
import { ArrowRight, Compass, Award, Hammer, Star, CheckCircle2, Home } from 'lucide-react';
import { CoreValues } from '../CoreValues';

interface AboutStoryPageProps {
  onNavigateTeam: () => void;
  onNavigateContact?: () => void;
  onNavigateProjects?: () => void;
  onOpenContact?: () => void;
}

export const AboutStoryPage: React.FC<AboutStoryPageProps> = ({
  onNavigateTeam,
  onNavigateContact,
  onNavigateProjects,
  onOpenContact
}) => {
  return (
    <div className="pt-20 pb-12 bg-[#0b0c0e] text-[#f3f4f6]">
      {/* 1. Hero Banner */}
      <section className="relative w-full overflow-hidden mb-10">
        <div className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-8 sm:p-14 shadow-2xl border-y border-white/10 dark-overlay-card">
          <img
            src="/images/mysa3d/mysa.jpg"
            alt="MYSA Luxe Villas Twilight Elevation"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/60" />

          <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>THE UNIFRA HERITAGE</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight mb-4">
                About <span className="italic font-serif-luxury text-[#dfb776]">Unifra</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                Dreams are meant to come true. We'll make it happen for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Journey Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            CHRONICLE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Our <span className="italic font-serif-luxury text-[#dfb776]">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Three years of passion, dedication, and crafting dream homes for our valued customers.
          </p>
        </div>

        {/* 3 Chronological Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 2022 */}
          <div className="bg-[#121418] rounded-sm p-7 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#dfb776] mb-3">
              <Star className="w-4 h-4 fill-[#dfb776]" />
              <span>2022: A Vision for Chennai</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              Unifra was founded with a clear mission: to create exceptional living spaces in Chennai that blend Scandinavian calm, contemporary luxury, and sustainable architectural craft.
            </p>
          </div>

          {/* 2023 */}
          <div className="bg-[#121418] rounded-sm p-7 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#dfb776] mb-3">
              <Star className="w-4 h-4 fill-[#dfb776]" />
              <span>2023: Bringing MYSA to Life</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              Construction commenced on MYSA Luxe Villas in Vettuvankeni, ECR. This milestone year was defined by meticulous structural engineering, bespoke floor planning, and zero-compromise sourcing.
            </p>
          </div>

          {/* 2024-2025 */}
          <div className="bg-[#121418] rounded-sm p-7 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#dfb776] mb-3">
              <Star className="w-4 h-4 fill-[#dfb776]" />
              <span>2024–2025: A Legacy of Trust</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
              We proudly handed over keys to our first homeowners at MYSA, expanding our architectural pipeline to upcoming signature developments across Chennai’s most coveted coastal and urban enclaves.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Get to know us */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
          PHILOSOPHY
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-6">
          Get to know <span className="italic font-serif-luxury text-[#dfb776]">us</span>
        </h2>
        <div className="text-xs sm:text-sm text-gray-300 leading-relaxed space-y-4 max-w-4xl mx-auto font-light">
          <p>
            At Unifra Homes Pvt. Ltd., we don't just build houses, we create personalized living experiences that mirror your aspirations and lifestyle. Established with a vision to redefine residential architecture, Unifra blends aesthetics, functionality, and sustainability in every project.
          </p>
          <p>
            Rooted in Chennai, we've built our legacy on trust, innovation, and craftsmanship. Every brick we lay reflects a promise — a promise of quality, timely delivery, and transparency that homeowners can count on. Whether it's a serene villa by the coast or a modern home in the city, Unifra stands for architecture that inspires and endures.
          </p>
        </div>
      </section>

      {/* 4. Our Guiding Principles */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            TENETS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Our Guiding <span className="italic font-serif-luxury text-[#dfb776]">Principles</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            The core beliefs that drive our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776] font-semibold">
              CORE PURPOSE
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              To craft bespoke living spaces where modern elegance meets everyday comfort. We are devoted to delivering homes that are not only architecturally striking, but also environmentally conscious, intuitively planned, and built to withstand generations.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span>Uncompromising architectural precision and structural integrity</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span>Complete financial and construction milestone transparency</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span>Personalized client advisory from initial deed to final key handover</span>
              </div>
            </div>
          </div>

          <div className="rounded-sm overflow-hidden border border-white/10 h-72 sm:h-96">
            <img
              src="/images/mysa3d/KITCHEN.jpg"
              alt="MYSA Minimalist Culinary Studio & Island"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* Foundational Pillars (Core Values) */}
      <CoreValues />

      {/* 5. See Our Services */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            CAPABILITIES
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            See our <span className="italic font-serif-luxury text-[#dfb776]">services</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            From consulting and strategy development to implementation and support, our comprehensive services can help your residential dreams thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white mb-2">
                Land & Site Acquisition Advisory
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Expert due-diligence, title clearance, and strategic plot selection along prime corridors like ECR and OMR.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#dfb776] uppercase tracking-wider mt-4">Due Diligence • Clearance</span>
          </div>

          {/* Service 2 */}
          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white mb-2">
                Design & Architectural Consultancy
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Nordic minimalism paired with tropical climate adaptability, passive cooling, and smart space planning.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#dfb776] uppercase tracking-wider mt-4">3D Modeling • BIM Blueprints</span>
          </div>

          {/* Service 3 */}
          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] mb-4">
                <Hammer className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white mb-2">
                Turn-key Construction Management
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                End-to-end execution with licensed structural engineers, vendor management, and scheduled milestone sign-offs.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#dfb776] uppercase tracking-wider mt-4">End-to-End • On Schedule</span>
          </div>

          {/* Service 4 */}
          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white mb-2">
                Custom Home Builds & Bespoke Villas
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Tailored residential sanctuaries with private plunge pools, home automation, double-height atriums, and custom timber joinery.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#dfb776] uppercase tracking-wider mt-4">Luxury Finishes • Tailored</span>
          </div>
        </div>
      </section>

      {/* 6. Our Craftsmanship */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="rounded-sm overflow-hidden border border-white/10 h-72 sm:h-96 order-2 lg:order-1">
            <img
              src="/images/mysa3d/03.jpg"
              alt="MYSA Cantilevered Granite Balcony & Craftsmanship"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="space-y-4 order-1 lg:order-2 text-left">
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white">
              Our <span className="italic font-serif-luxury text-[#dfb776]">Craftsmanship</span>
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              What makes Unifra homes stand out is not just design — it's execution excellence. We work with top architects, engineers, and certified vendors to ensure best-in-class materials, safety, and precision.
            </p>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Each home undergoes a multi-layer inspection at every phase to guarantee flawless, on-time delivery with zero compromises on quality.
            </p>
            <div className="pt-2">
              <button
                onClick={onNavigateProjects}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#dfb776] text-[#0b0c0e] text-xs font-semibold uppercase tracking-wider hover:bg-[#c5a880] transition-colors cursor-pointer"
              >
                <span>Explore Our Completed Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Meet Our Team CTA Banner */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="relative rounded-sm overflow-hidden p-8 sm:p-14 text-white shadow-xl bg-[#121418] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776] font-medium mb-2 block">
              THE PEOPLE BEHIND UNIFRA
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-normal mb-3">
              Meet Our Team
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Discover the passionate professionals and visionary leaders who are dedicated to bringing your dream home to life.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onNavigateTeam}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
            >
              <span>View Our Team</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
