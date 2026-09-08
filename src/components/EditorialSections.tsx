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
      {/* SECTION 1: PHILOSOPHY / INTRO (Screenshot 7: A DIFFERENT KIND OF DEVELOPER) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-3">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
              <span>A DIFFERENT KIND OF DEVELOPER</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.14]">
              Homes that hold<br />
              <span className="italic font-serif-luxury text-[#dfb776]">
                your becoming.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
              At Unifra, we believe a home should do more than look beautiful. It should make space for your rituals, your people, and the life still unfolding.
            </p>

            <button
              onClick={() => handleNavigate('about-story')}
              className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
            >
              <span>WHAT WE BELIEVE</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: 01 THE FLAGSHIP RESIDENCE / Meet MYSA (Screenshot 7) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
              <span className="font-mono text-gray-500">01</span>
              <span>THE FLAGSHIP RESIDENCE</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Meet <span className="italic font-serif-luxury text-[#dfb776]">MYSA.</span>
            </h2>
          </div>

          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            SIX CONTEMPORARY VILLAS ON CHENNAI'S ECR
          </div>
        </div>

        {/* Flagship Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Visual: Twilight Pool & Villa Façade */}
          <div
            onClick={() => handleNavigate('mysa-detail')}
            className="lg:col-span-7 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 min-h-[380px] sm:min-h-[480px] cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1400&q=80"
              alt="MYSA Exterior Architecture & Infinity Pool"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Tag Badge at bottom left */}
            <div className="absolute bottom-6 left-6">
              <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/15 text-white text-[10px] font-mono tracking-widest uppercase rounded-sm">
                MYSA / EXTERIOR
              </span>
            </div>
          </div>

          {/* Right Narrative & 4 Stat Metrics */}
          <div className="lg:col-span-5 bg-[#121418] border border-white/10 p-8 sm:p-10 rounded-sm flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#dfb776]">
                MYSA LUXE VILLAS / 2024
              </div>

              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                A low-density collection where warm light, open skies, and considered proportions come together. Six private residences, each with an infinity plunge pool and its own rhythm.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => handleNavigate('mysa-detail')}
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
                >
                  <span>VIEW THE RESIDENCE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* 4 Stat Metrics Box */}
            <div className="grid grid-cols-2 gap-4 pt-8 mt-8 border-t border-white/10">
              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">06</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  PRIVATE VILLAS
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">2,879</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  SQ. FT. CRAFTED
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-white">4-5</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  BHK RESIDENCES
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-serif-luxury text-3xl font-bold text-[#dfb776]">₹3.25 Cr+</div>
                <div className="text-[10px] font-mono tracking-wider text-gray-400 uppercase">
                  STARTING FROM
                </div>
              </div>
            </div>

            {/* Location Footnote */}
            <div className="pt-6 mt-6 border-t border-white/10 text-[9px] font-mono tracking-widest text-gray-500 uppercase flex items-center justify-between">
              <span>VETTUVANKENI, EAST COAST ROAD</span>
              <span>CHENNAI, TAMIL NADU</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: 02 THE UNIFRA WAY / Designed around your life (Screenshot 7) */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="text-left mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
            <span className="font-mono text-gray-500">02</span>
            <span>THE UNIFRA WAY</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-2">
            Designed around <span className="italic font-serif-luxury text-[#dfb776]">your life.</span>
          </h2>
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-gray-400 uppercase">
            EVERY DETAIL INTENTIONALLY MADE TO LAST
          </div>
        </div>

        {/* 3 Diamond Geometric Pillars Cards matching Screenshot 7 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01: Architecture */}
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
                Architecture
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                Quietly bold forms, drawn around the way you want to live. Zero common walls and harmonious natural illumination.
              </p>
            </div>

            <div className="pt-8 flex justify-end">
              <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform text-sm">
                ↗
              </span>
            </div>
          </div>

          {/* Card 02: Bespoke interiors */}
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
                Bespoke interiors
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                Material palettes and details that feel entirely, unmistakably yours. Imported Italian marble, teakwood joinery, and German fittings.
              </p>
            </div>

            <div className="pt-8 flex justify-end">
              <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform text-sm">
                ↗
              </span>
            </div>
          </div>

          {/* Card 03: Turnkey delivery */}
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
                Turnkey delivery
              </h3>

              <p className="text-gray-400 text-xs sm:text-[13px] font-light leading-relaxed">
                One considered journey from first sketch to the key in your hand. Flawless execution backed by 100% legal clarity.
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

      {/* SECTION 4: THE UNIFRA STANDARD (Screenshot 6: Luxury Re-imagined Without Compromise) */}
      <section className="py-20 sm:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Copy & 6 Feature Badges */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>THE UNIFRA STANDARD</span>
              </div>

              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight leading-[1.12]">
                Luxury Re-imagined<br />
                <span className="italic font-serif-luxury text-[#dfb776]">Without Compromise</span>
              </h2>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl">
              Every Unifra Home is a masterpiece of architectural discipline. We don't just build villas; we curate environments that empower your lifestyle and preserve your legacy.
            </p>

            {/* 6 Feature Badges in 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 pt-4">
              {/* 1. Supreme Privacy */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Supreme Privacy</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  ARCHITECTED WITH ZERO COMMON WALLS TO ENSURE ABSOLUTE ACOUSTIC AND VISUAL SECLUSION.
                </p>
              </div>

              {/* 2. Swedish-Inspired Design */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Swedish-Inspired Design</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  CONTEMPORARY AESTHETICS BLENDED WITH FUNCTIONAL LUXURY AND ORGANIC MATERIALS.
                </p>
              </div>

              {/* 3. Masterful Craftsmanship */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-white">
                  <PenTool className="w-4 h-4 text-[#dfb776]" />
                  <h4 className="font-serif-luxury text-base font-bold">Masterful Craftsmanship</h4>
                </div>
                <p className="text-[11px] text-gray-400 leading-relaxed uppercase tracking-wider font-mono">
                  UTILIZING TOP-TIER ITALIAN MARBLE, BURMA TEAK, AND PRECISION GERMAN FITTINGS.
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
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="Unifra Standard Living Room"
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
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Photo 1: Double-height window living room */}
          <div className="lg:col-span-4 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-[380px] sm:h-[460px]">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="The Material - Natural Light"
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
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
              alt="The Detail - Texture & Marble"
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
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/10">
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
          {/* Left tall card: The Blue Oasis */}
          <div className="lg:col-span-5 relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 min-h-[420px] lg:min-h-[540px]">
            <img
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1000&q=80"
              alt="The Blue Oasis Infinity Pool"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="font-serif-luxury text-2xl font-bold text-white mb-1">
                The Blue Oasis
              </h3>
              <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                TEMPERATURE-CONTROLLED INFINITY POOLS WITH PANORAMIC ECR VIEWS.
              </p>
            </div>
          </div>

          {/* Right column: Two stacked wide cards */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Top wide card: Culinary Theater */}
            <div className="relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-64 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80"
                alt="Culinary Theater Designer Kitchen"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                  Culinary Theater
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                  CUSTOM DESIGNER KITCHENS FOR THE ULTIMATE HOST.
                </p>
              </div>
            </div>

            {/* Bottom wide card: Sanctuary Within */}
            <div className="relative group rounded-sm overflow-hidden bg-[#121418] border border-white/10 h-64 sm:h-72">
              <img
                src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80"
                alt="Sanctuary Within Master Suite"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                  Sanctuary Within
                </h3>
                <p className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#dfb776]">
                  MASTER SUITES THAT BLEND INDOOR LUXURY WITH PRIVATE TERRACES.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: DUAL TESTIMONIALS (Screenshot 7 Founder Quote + Screenshot 6 Resident Quote) */}
      <section className="py-24 sm:py-32 bg-[#08090c] border-y border-white/10 px-4 sm:px-6 lg:px-8">
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
      <section id="contact-section" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
