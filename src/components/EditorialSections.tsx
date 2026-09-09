import React from 'react';
import {
  Shield,
  Sparkles,
  PenTool,
  Zap,
  Leaf,
  Users,
  MapPin,
  Phone,
  Mail,
  ArrowUpRight,
  Compass,
  ArrowRight,
  Building2,
  Check
} from 'lucide-react';
import { AppPage } from './Navbar';

interface EditorialSectionsProps {
  onOpenConsultation: () => void;
  onNavigatePage?: (page: AppPage) => void;
}

export const EditorialSections: React.FC<EditorialSectionsProps> = ({
  onOpenConsultation,
  onNavigatePage
}) => {
  const handleNavigate = (page: AppPage) => {
    if (onNavigatePage) {
      onNavigatePage(page);
    }
  };

  return (
    <div className="bg-[#0b0c0e] text-white">
      {/* SECTION 1: PHILOSOPHY / INTRO (EXCLUSIVE GATED COMMUNITIES) */}
      <section className="py-10 sm:py-14 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-3">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
              <span>EXCLUSIVE GATED COMMUNITIES</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.14]">
              Homes crafted for<br />
              <span className="italic font-serif-luxury text-[#dfb776]">
                peaceful & happy living.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              At Unifra, we develop private gated villa enclaves along Chennai's East Coast Road — where 24/7 security, serene coastal surroundings, lush greenery, and private amenities create an extraordinary living experience for your family.
            </p>

            <button
              onClick={() => handleNavigate('about-story')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
            >
              <span>EXPLORE OUR COMMUNITIES</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: 01 UNIFRA VISION & LIFESTYLE */}
      <section className="py-10 sm:py-14 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
              <span className="font-mono text-gray-500">01</span>
              <span>UNIFRA VISION & LIFESTYLE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Inspiring <span className="italic font-serif-luxury text-[#dfb776]">Villa Architecture.</span>
            </h2>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            CRAFTING CHENNAI'S FINEST COASTAL VILLA COMMUNITIES
          </div>
        </div>

        {/* Flagship Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual */}
          <div
            onClick={() => handleNavigate('projects')}
            className="lg:col-span-7 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 min-h-[380px] sm:min-h-[480px] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
              alt="Unifra Luxury Gated Villa Architecture & Lifestyle"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Tag Badge at bottom left */}
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono tracking-widest uppercase rounded-sm">
                UNIFRA / LIFESTYLE INSPIRATION
              </span>
            </div>
          </div>

          {/* Right Narrative & 4 Stat Metrics */}
          <div className="lg:col-span-5 bg-[#121418] border border-white/10 p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#dfb776]">
                THE FUTURE OF GATED LIVING
              </div>

              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                Unifra is dedicated to designing forward-thinking gated villa communities across East Coast Road and OMR. We blend Scandinavian-inspired clean lines, biophilic green courtyard gardens, 24/7 manned security, and premium structural engineering to build serene, joyful sanctuaries for families.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleNavigate('projects')}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
                >
                  <span>EXPLORE OUR VILLA PORTFOLIO</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 4 Stat Metrics Box */}
            <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">24/7</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  MANNED GATED SECURITY
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">100%</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  INDEPENDENT TITLES
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">ECR & OMR</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  PRIME COASTAL LOCATIONS
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-[#dfb776]">PREMIER</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  LUXURY QUALITY
                </div>
              </div>
            </div>

            {/* Location Footnote */}
            <div className="pt-6 mt-6 border-t border-white/10 text-[9px] font-mono tracking-widest text-gray-500 uppercase flex items-center justify-between">
              <span>EAST COAST ROAD & OMR CORRIDOR</span>
              <span>CHENNAI, TAMIL NADU</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 02 THE UNIFRA WAY / Designed around your life */}
      <section className="py-10 sm:py-14 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        <div className="text-left mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
            <span className="font-mono text-gray-500">02</span>
            <span>THE UNIFRA ADVANTAGE</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-2">
            Built for your family’s <span className="italic font-serif-luxury text-[#dfb776]">peace and happiness.</span>
          </h2>
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            THE PREMIER GATED VILLA EXPERIENCE IN CHENNAI
          </div>
        </div>

        {/* 3 Diamond Geometric Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01: Gated Security & Privacy */}
          <div
            onClick={() => handleNavigate('about-story')}
            className="group bg-[#121418] border border-white/10 hover:border-[#dfb776]/50 p-8 sm:p-9 rounded-sm flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl relative"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono tracking-widest text-gray-400 font-semibold">
                  01
                </span>
                {/* Geometric Diamond Emblem */}
                <div className="w-5 h-5 rotate-45 border border-[#dfb776]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 bg-[#dfb776]" />
                </div>
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3 group-hover:text-[#dfb776] transition-colors">
                24/7 Gated Security
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                Manned access portals, smart CCTV surveillance, zero common walls, and absolute peace of mind for your loved ones.
              </p>
            </div>

            <div className="pt-8 flex justify-end">
              <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform text-sm">
                ↗
              </span>
            </div>
          </div>

          {/* Card 02: Peaceful Coastal Living */}
          <div
            onClick={() => handleNavigate('about-story')}
            className="group bg-[#121418] border border-white/10 hover:border-[#dfb776]/50 p-8 sm:p-9 rounded-sm flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl relative"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono tracking-widest text-gray-400 font-semibold">
                  02
                </span>
                {/* Geometric Diamond Emblem */}
                <div className="w-5 h-5 rotate-45 border border-[#dfb776]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 bg-[#dfb776]" />
                </div>
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3 group-hover:text-[#dfb776] transition-colors">
                Peaceful Coastal Living
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                Quiet sea breeze, sunlit garden courtyards, private infinity plunge pools, and green spaces designed for joyful daily living.
              </p>
            </div>

            <div className="pt-8 flex justify-end">
              <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform text-sm">
                ↗
              </span>
            </div>
          </div>

          {/* Card 03: Independent Villa Ownership */}
          <div
            onClick={() => handleNavigate('about-story')}
            className="group bg-[#121418] border border-white/10 hover:border-[#dfb776]/50 p-8 sm:p-9 rounded-sm flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xl relative"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-xs font-mono tracking-widest text-gray-400 font-semibold">
                  03
                </span>
                {/* Geometric Diamond Emblem */}
                <div className="w-5 h-5 rotate-45 border border-[#dfb776]/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <div className="w-2 h-2 bg-[#dfb776]" />
                </div>
              </div>

              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-3 group-hover:text-[#dfb776] transition-colors">
                Independent Villa Ownership
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                100% clear titles, independent land ownership, bespoke interior choices, and hassle-free professional estate management.
              </p>
            </div>

            <div className="pt-8 flex justify-end">
              <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform text-sm">
                ↗
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: THE UNIFRA STANDARD (Luxury Gated Living Without Compromise) */}
      <section className="py-10 sm:py-14 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & 6 Feature Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>THE UNIFRA STANDARD</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.12]">
                Gated Community Living<br />
                <span className="italic font-serif-luxury text-[#dfb776]">Without Compromise</span>
              </h2>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Every Unifra villa community is engineered for security, family wellness, and long-term value. We don't just sell villas; we deliver secure, peaceful, and happy neighborhoods.
            </p>

            {/* 6 Feature Badges in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 pt-4">
              {/* 1. 24/7 Gated Security */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">24/7 Gated Security</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  MANNED ACCESS PORTALS AND SMART CCTV FOR TOTAL PEACE OF MIND.
                </p>
              </div>

              {/* 2. Serene Green Enclaves */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Leaf className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Serene Green Enclaves</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  LUSH LANDSCAPING, QUIET COASTAL BREEZE, AND CLEAN FAMILY ENVIRONMENT.
                </p>
              </div>

              {/* 3. Private Luxury Amenities */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Private Luxury Amenities</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  INDIVIDUAL PLUNGE POOLS, ROOFTOP DECKS, AND DOUBLE-HEIGHT LIVING ROOMS.
                </p>
              </div>

              {/* 4. Future-Ready Living */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Zap className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Future-Ready Living</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  FULL SMART HOME AUTOMATION AND DEDICATED HIGH-SPEED EV CHARGING STATIONS.
                </p>
              </div>

              {/* 5. Sustainable Elegance */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Leaf className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Sustainable Elegance</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  GREEN BUILDING PRACTICES WITH SOLAR INTEGRATION AND RAINWATER HARVESTING.
                </p>
              </div>

              {/* 6. Elite Community */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Users className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Elite Community</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  A SANCTUARY SHARED WITH LIKE-MINDED INDIVIDUALS IN A SECURE, GATED ENVIRONMENT.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Framed Image + 20+ AWARDS Gold Badge (Screenshot 6) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-sm overflow-hidden bg-[#121418] border border-white/10 shadow-2xl">
              <img
                src="/images/mysa3d/LIVING-VIEW1.jpg"
                alt="MYSA Double-Height Living Atrium"
                className="w-full h-[450px] sm:h-[540px] object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Offset Gold Accent Box matching screenshot 6 */}
              <div className="absolute bottom-0 right-0 bg-[#dfb776] text-[#0b0c0e] p-6 sm:p-7 max-w-[200px] sm:max-w-[220px] text-left shadow-2xl">
                <div className="font-serif-luxury text-3xl sm:text-4xl font-extrabold leading-none mb-1">
                  20+
                </div>
                <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase font-semibold leading-snug">
                  AWARDS FOR ARCHITECTURAL INNOVATION
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: THE UNIFRA PERSPECTIVE (Screenshot 7: The luxury of enough) */}
      <section className="py-10 sm:py-14 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo 1: Double-height window living room */}
          <div className="lg:col-span-4 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-[380px] sm:h-[460px]">
            <img
              src="/images/mysa3d/03.jpg"
              alt="The Material - Natural Light & Granite Balcony"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#dfb776] bg-black/60 px-2.5 py-1 rounded-sm border border-white/10">
                THE MATERIAL / LIGHT
              </span>
            </div>
          </div>

          {/* Center Editorial Card */}
          <div className="lg:col-span-4 text-center px-4 py-8 space-y-6">
            <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#dfb776]">
              THE UNIFRA PERSPECTIVE
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              The luxury<br />
              of <span className="italic font-serif-luxury text-[#dfb776]">enough.</span>
            </h2>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm mx-auto">
              No excess. No compromise. Just the rare feeling of everything being exactly where it should be.
            </p>

            <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase pt-2">
              U / 01 PHILOSOPHY
            </div>
          </div>

          {/* Photo 2: Tactile Luxury Detail */}
          <div className="lg:col-span-4 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-[380px] sm:h-[460px]">
            <img
              src="/images/mysa3d/first-floor-bedroom.jpg"
              alt="The Detail - Texture & Wood Slat Joinery"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5">
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#dfb776] bg-black/60 px-2.5 py-1 rounded-sm border border-white/10">
                THE DETAIL / TEXTURE
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: THE LIFESTYLE (Screenshot 6: An Unparalleled Experience) */}
      <section className="py-20 sm:py-28 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3">
            THE LIFESTYLE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            An Unparalleled <span className="italic font-serif-luxury text-[#dfb776]">Experience</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Life at Unifra transcends the boundaries of the ordinary. From serene mornings by the infinity pool to sunset gatherings on your private deck.
          </p>
        </div>

        {/* Asymmetrical 3-Image Grid matching screenshot 6 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left tall card: The Living Salon */}
          <div className="lg:col-span-5 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 min-h-[420px] lg:min-h-[540px] dark-overlay-card">
            <img
              src="/images/mysa3d/BAX09923.jpg"
              alt="The Living Salon - MYSA Finished Residence Interior"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                The Living Salon
              </h3>
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                ARTISANAL SOLID TEAK FURNISHINGS, FLOATING MEDIA WALL & RECESSED COVE ILLUMINATION.
              </p>
            </div>
          </div>

          {/* Right column: Two stacked wide cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top wide card: Culinary Theater */}
            <div className="relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-64 sm:h-72 dark-overlay-card">
              <img
                src="/images/mysa3d/KITCHEN.jpg"
                alt="Culinary Theater - MYSA Minimalist Kitchen Studio"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                  Culinary Theater
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                  WATERFALL QUARTZ ISLANDS & BLUM WALNUT TOUCH-TO-OPEN CABINETRY.
                </p>
              </div>
            </div>

            {/* Bottom wide card: Sanctuary Within */}
            <div className="relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-64 sm:h-72 dark-overlay-card">
              <img
                src="/images/mysa3d/MASTER-BEDROOM5.jpg"
                alt="Sanctuary Within - MYSA Master Loft Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                  Sanctuary Within
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                  MASTER LOFT SUITE WITH EXPOSED TIMBER RAFTERS & CATHEDRAL VOLUME.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: DUAL TESTIMONIALS (Screenshot 7 Founder Quote + Screenshot 6 Resident Quote) */}
      <section className="py-24 sm:py-32 bg-[#08090c] border-y border-white/10 px-4 sm:px-6 lg:px-8 testimonial-section">
        <div className="max-w-5xl mx-auto space-y-16">
          {/* Founder Quote (Screenshot 7) */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="font-serif-luxury text-5xl sm:text-6xl text-[#dfb776] leading-none select-none">
              “
            </div>
            <blockquote className="font-serif-luxury text-2xl sm:text-4xl font-normal italic text-white leading-snug">
              Dreams are meant to come true.<br />
              <span className="text-[#dfb776]">We'll make it happen for you.</span>
            </blockquote>
            <div className="pt-2 text-xs font-mono tracking-[0.25em] text-gray-400 uppercase">
              — SIDDIQ AHMED, FOUNDER & MANAGING DIRECTOR
            </div>
          </div>

          <div className="w-16 h-px bg-[#dfb776]/30 mx-auto" />

          {/* Resident Quote (Screenshot 6) */}
          <div className="text-center max-w-4xl mx-auto space-y-5">
            <blockquote className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-normal italic text-gray-300 leading-relaxed">
              "Unifra doesn't just build houses; they curate a lifestyle that perfectly balances modern discipline with timeless elegance. Our villa at ECR is more than a home; it's a sanctuary."
            </blockquote>
            <div className="pt-2 text-xs font-mono tracking-[0.22em] text-[#dfb776] uppercase">
              MR. & MRS. RAGHAVAN <span className="text-gray-600 px-2">|</span> EMINENT BUSINESS LEADERS <span className="text-gray-600 px-2">|</span> RESIDENTS SINCE 2024
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: PRIVATE VIEWING & ADVISORY CONCIERGE */}
      <section id="contact-section" className="py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="relative bg-[#121418] border border-[#dfb776]/40 p-8 sm:p-14 rounded-sm shadow-2xl overflow-hidden">
          {/* Subtle gold concentric rings decoration */}
          <div className="absolute -top-24 -right-24 w-72 h-72 border border-[#dfb776]/10 rounded-full pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 border border-[#dfb776]/15 rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: The Invitation */}
            <div className="lg:col-span-7 space-y-5 text-left">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>PRIVATE CLIENT ADVISORY</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.1]">
                Come see what <br />
                <span className="italic font-serif-luxury text-[#dfb776]">feels like yours.</span>
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl font-light">
                Schedule a bespoke private tour of our flagship Swedish-inspired villas in Vettuvankeni, ECR. Our private client advisors will curate every detail of your personal orientation.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onOpenConsultation}
                  className="bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-sm transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2 group"
                >
                  <span>BOOK A PRIVATE TOUR</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>

                {onNavigatePage && (
                  <button
                    onClick={() => handleNavigate('contact')}
                    className="border border-white/20 hover:border-[#dfb776] text-white hover:text-[#dfb776] text-xs font-mono tracking-wider uppercase px-6 py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
                  >
                    <span>STUDIO & DIRECTIONS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Col: Direct VIP Concierge Touchpoints */}
            <div className="lg:col-span-5 bg-black/40 border border-white/10 p-6 sm:p-8 rounded-sm space-y-5 text-left backdrop-blur-sm">
              <div className="text-[10px] font-mono tracking-widest uppercase text-[#dfb776] pb-2 border-b border-white/10">
                DIRECT CONCIERGE CHANNELS
              </div>

              {/* Corporate Studio */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#dfb776]/40 bg-[#dfb776]/10 flex items-center justify-center flex-shrink-0 text-[#dfb776]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Corporate Studio</div>
                  <div className="text-[11px] text-gray-400 font-light mt-0.5">
                    122 East Coast Road, Vettuvankeni, Chennai – 600115
                  </div>
                </div>
              </div>

              {/* Phone Line */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#dfb776]/40 bg-[#dfb776]/10 flex items-center justify-center flex-shrink-0 text-[#dfb776]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Private Client Desk</div>
                  <a href="tel:+917358222445" className="text-[11px] text-[#dfb776] font-mono hover:underline mt-0.5 block">
                    +91 73582 22445
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-full border border-[#dfb776]/40 bg-[#dfb776]/10 flex items-center justify-center flex-shrink-0 text-[#dfb776]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Private Inquiries</div>
                  <a href="mailto:info@unifrahomes.com" className="text-[11px] text-[#dfb776] font-mono hover:underline mt-0.5 block">
                    info@unifrahomes.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: HALLMARK BAR (Screenshot 7: Crafted for Coastal Living • Designed with Intention • Delivered with Care) */}
      <section className="py-8 bg-[#07080a] border-t border-white/10">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.22em] text-gray-400 uppercase">
              <span className="text-[#dfb776]">▤</span>
              <span>CRAFTED FOR COASTAL LIVING</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.22em] text-gray-400 uppercase">
              <span className="text-[#dfb776]">✛</span>
              <span>DESIGNED WITH INTENTION</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-xs font-mono tracking-[0.22em] text-gray-400 uppercase">
              <span className="text-[#dfb776]">✔</span>
              <span>DELIVERED WITH CARE</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
