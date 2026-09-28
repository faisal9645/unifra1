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
    <div className="pt-24 pb-20 bg-[#faf8f5] text-[#1a1918]">
      {/* 1. Hero Banner */}
      <section className="relative w-full mb-16 px-6 sm:px-10 lg:px-12">
        <div className="max-w-[1380px] mx-auto bg-[#fbf9f6] rounded-[32px] p-8 sm:p-14 lg:p-16 border border-[#eae4db] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-sm">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c59b67]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#8c827a] font-medium">
                THE UNIFRA HERITAGE
              </span>
            </div>
            <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#1a1918] leading-[1.08]">
              About <span className="italic font-serif-luxury text-[#c59b67]">Unifra.</span>
            </h1>
            <p className="text-base sm:text-lg text-[#68625d] font-light leading-relaxed max-w-xl">
              Dreams are meant to come true. We craft bespoke architectural sanctuaries that blend Scandinavian calm, coastal luxury, and sustainable building craft.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-[#8c827a]">
              <div><strong className="text-[#1a1918] text-sm block">2022</strong> Founded in Chennai</div>
              <div className="w-px h-6 bg-[#eae4db]" />
              <div><strong className="text-[#1a1918] text-sm block">6 Villas</strong> MYSA Gated Enclave</div>
              <div className="w-px h-6 bg-[#eae4db]" />
              <div><strong className="text-[#1a1918] text-sm block">100%</strong> Bespoke Craft</div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-t-[140px] rounded-b-[24px] overflow-hidden border border-[#eae4db] shadow-md h-[340px] sm:h-[400px]">
              <img
                src="/images/mysa3d/mysa.jpg"
                alt="MYSA Luxe Villas Twilight Elevation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 p-3.5 bg-white/90 backdrop-blur-md rounded-lg border border-white/40 text-center">
                <span className="text-[10px] font-mono tracking-widest text-[#1a1918] uppercase block font-medium">
                  FLAGSHIP ENCLAVE • VETTUVANKENI ECR
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Journey Section */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            CHRONICLE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-3">
            Our <span className="italic font-serif-luxury text-[#c59b67]">Journey</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d]">
            Three years of passion, dedication, and crafting dream homes for our valued customers.
          </p>
        </div>

        {/* 3 Chronological Milestones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 2022 */}
          <div className="bg-white rounded-[16px] p-8 border border-[#eae4db] hover:border-[#c59b67] transition-all shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#c59b67] mb-3">
              <Star className="w-4 h-4 fill-[#c59b67]" />
              <span>2022: A Vision for Chennai</span>
            </div>
            <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
              Unifra was founded with a clear mission: to create exceptional living spaces in Chennai that blend Scandinavian calm, contemporary luxury, and sustainable architectural craft.
            </p>
          </div>

          {/* 2023 */}
          <div className="bg-white rounded-[16px] p-8 border border-[#eae4db] hover:border-[#c59b67] transition-all shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#c59b67] mb-3">
              <Star className="w-4 h-4 fill-[#c59b67]" />
              <span>2023: Bringing MYSA to Life</span>
            </div>
            <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
              Construction commenced on MYSA Luxe Villas in Vettuvankeni, ECR. This milestone year was defined by meticulous structural engineering, bespoke floor planning, and zero-compromise sourcing.
            </p>
          </div>

          {/* 2024-2025 */}
          <div className="bg-white rounded-[16px] p-8 border border-[#eae4db] hover:border-[#c59b67] transition-all shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#c59b67] mb-3">
              <Star className="w-4 h-4 fill-[#c59b67]" />
              <span>2024–2025: A Legacy of Trust</span>
            </div>
            <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
              We proudly handed over keys to our first homeowners at MYSA, expanding our architectural pipeline to upcoming signature developments across Chennai’s most coveted coastal enclaves.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Get to know us */}
      <section className="max-w-4xl mx-auto px-6 sm:px-10 mb-24 text-center">
        <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
          PHILOSOPHY
        </div>
        <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-6">
          Get to know <span className="italic font-serif-luxury text-[#c59b67]">us</span>
        </h2>
        <div className="text-xs sm:text-sm text-[#68625d] leading-relaxed space-y-4 max-w-3xl mx-auto font-light">
          <p>
            At Unifra Homes Pvt. Ltd., we don't just build houses, we create personalized living experiences that mirror your aspirations and lifestyle. Established with a vision to redefine residential architecture, Unifra blends aesthetics, functionality, and sustainability in every project.
          </p>
          <p>
            Rooted in Chennai, we've built our legacy on trust, innovation, and craftsmanship. Every brick we lay reflects a promise — a promise of quality, timely delivery, and transparency that homeowners can count on. Whether it's a serene villa by the coast or a modern home in the city, Unifra stands for architecture that inspires and endures.
          </p>
        </div>
      </section>

      {/* 4. Our Guiding Principles */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            TENETS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-3">
            Our Guiding <span className="italic font-serif-luxury text-[#c59b67]">Principles</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d]">
            The core beliefs that drive our commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#f4f0eb] rounded-[24px] p-8 sm:p-12 border border-[#e5ded4] shadow-sm">
          <div className="space-y-4 text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c59b67] font-semibold">
              CORE PURPOSE
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#1a1918]">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
              To craft bespoke living spaces where modern elegance meets everyday comfort. We are devoted to delivering homes that are not only architecturally striking, but also environmentally conscious, intuitively planned, and built to withstand generations.
            </p>
            <div className="pt-2 flex flex-col gap-2.5">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1a1918]">
                <CheckCircle2 className="w-4 h-4 text-[#c59b67] shrink-0" />
                <span>Uncompromising architectural precision and structural integrity</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1a1918]">
                <CheckCircle2 className="w-4 h-4 text-[#c59b67] shrink-0" />
                <span>Complete financial and construction milestone transparency</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#1a1918]">
                <CheckCircle2 className="w-4 h-4 text-[#c59b67] shrink-0" />
                <span>Personalized client advisory from initial deed to final key handover</span>
              </div>
            </div>
          </div>

          <div className="rounded-[16px] overflow-hidden border border-[#eae4db] h-72 sm:h-96">
            <img
              src="/images/mysa3d/KITCHEN.jpg"
              alt="MYSA Minimalist Culinary Studio & Island"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </section>

      {/* 5. See Our Services */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-2">
            CAPABILITIES
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-3">
            See our <span className="italic font-serif-luxury text-[#c59b67]">services</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed">
            From consulting and strategy development to implementation and support, our comprehensive services can help your residential dreams thrive.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Service 1 */}
          <div className="bg-white rounded-[16px] p-6 border border-[#eae4db] hover:border-[#c59b67] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center text-[#c59b67] mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-[#1a1918] mb-2">
                Land & Site Acquisition Advisory
              </h4>
              <p className="text-xs text-[#68625d] leading-relaxed font-light">
                Expert due-diligence, title clearance, and strategic plot selection along prime corridors like ECR and OMR.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#c59b67] uppercase tracking-wider mt-4">Due Diligence • Clearance</span>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-[16px] p-6 border border-[#eae4db] hover:border-[#c59b67] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center text-[#c59b67] mb-4">
                <Home className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-[#1a1918] mb-2">
                Design & Architectural Consultancy
              </h4>
              <p className="text-xs text-[#68625d] leading-relaxed font-light">
                Nordic minimalism paired with tropical climate adaptability, passive cooling, and smart space planning.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#c59b67] uppercase tracking-wider mt-4">3D Modeling • BIM Blueprints</span>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-[16px] p-6 border border-[#eae4db] hover:border-[#c59b67] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center text-[#c59b67] mb-4">
                <Hammer className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-[#1a1918] mb-2">
                Turn-key Construction Management
              </h4>
              <p className="text-xs text-[#68625d] leading-relaxed font-light">
                End-to-end execution with licensed structural engineers, vendor management, and scheduled milestone sign-offs.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#c59b67] uppercase tracking-wider mt-4">End-to-End • On Schedule</span>
          </div>

          {/* Service 4 */}
          <div className="bg-white rounded-[16px] p-6 border border-[#eae4db] hover:border-[#c59b67] transition-all flex flex-col justify-between shadow-sm">
            <div>
              <div className="w-10 h-10 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center text-[#c59b67] mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-[#1a1918] mb-2">
                Custom Home Builds & Bespoke Villas
              </h4>
              <p className="text-xs text-[#68625d] leading-relaxed font-light">
                Tailored residential sanctuaries with private plunge pools, home automation, double-height atriums, and custom timber joinery.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#c59b67] uppercase tracking-wider mt-4">Luxury Finishes • Tailored</span>
          </div>
        </div>
      </section>

      {/* 6. Meet Our Team CTA Banner */}
      <section className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="relative rounded-[24px] overflow-hidden p-8 sm:p-14 bg-[#f4f0eb] border border-[#e5ded4] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#c59b67] font-medium mb-2 block">
              THE PEOPLE BEHIND UNIFRA
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-4xl font-normal mb-3 text-[#1a1918]">
              Meet Our Team
            </h3>
            <p className="text-xs sm:text-sm text-[#68625d] font-light leading-relaxed">
              Discover the passionate professionals and visionary leaders who are dedicated to bringing your dream home to life.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onNavigateTeam}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white font-medium text-xs font-mono uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer"
            >
              <span>View Our Team</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b67]" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
