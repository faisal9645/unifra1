import React from 'react';
import { ArrowUpRight, ArrowRight, ShieldCheck, Award, MapPin, Phone } from 'lucide-react';

interface UnifraCompanyHeroProps {
  theme?: 'light' | 'dark';
  onExploreProjects?: () => void;
  onNavigateOurStory?: () => void;
  onBookTour?: () => void;
}

export const UnifraCompanyHero: React.FC<UnifraCompanyHeroProps> = ({
  theme = 'dark',
  onExploreProjects,
  onNavigateOurStory,
  onBookTour
}) => {
  const isLight = theme === 'light';

  return (
    <section
      id="hero"
      className={`relative w-full h-screen min-h-[680px] lg:min-h-[740px] flex flex-col justify-between pt-20 sm:pt-24 pb-0 overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#ebf2f8]' : 'bg-[#0b0c0e]'
      }`}
    >
      {/* Background Architectural Render Image - Full View Edge-to-Edge */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/mysa3d/mysa-day.jpg"
          alt="UNIFRA Signature Luxury Architecture"
          className="w-full h-full object-cover select-none scale-105 transition-transform duration-1000 contrast-[1.03] brightness-[1.02]"
        />

        {/* Ambient Gradients - Luminous Daylight Fade in Day mode, Obsidian Twilight in Night mode */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isLight
              ? 'bg-gradient-to-r from-white/90 via-white/60 to-transparent'
              : 'bg-gradient-to-r from-[#0b0c0e]/95 via-[#0b0c0e]/75 to-transparent'
          }`}
        />
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLight
              ? 'bg-gradient-to-t from-white/85 via-transparent to-white/40'
              : 'bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/50'
          }`}
        />
      </div>

      {/* 1. TOP BRAND BADGE STRIP (Light Glass in Day Mode, Dark Glass in Night Mode) */}
      <div className={`relative z-20 w-full border-b backdrop-blur-md shrink-0 transition-colors ${
        isLight ? 'bg-white/80 border-black/10 text-gray-900' : 'bg-black/40 border-white/10 text-white'
      }`}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full animate-pulse ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
            <span className={`uppercase font-semibold tracking-widest ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>
              UNIFRA HOMES & ESTATES
            </span>
            <span className={`hidden sm:inline ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>• CHENNAI'S PREMIER LUXURY BUILDER</span>
          </div>

          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-1.5 text-[11px] uppercase tracking-wider ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
              <ShieldCheck className={`w-3.5 h-3.5 ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`} />
              <span>24/7 GATED SECURITY & PRIVACY</span>
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN CENTER HERO CONTENT */}
      <div className="relative z-10 flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-6 sm:py-8 lg:py-12 flex flex-col justify-center text-left">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className={`text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] mb-4 flex items-center gap-2 ${
              isLight ? 'text-[#9b6f1e] font-semibold' : 'text-[#dfb776]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
            <span>PREMIER GATED VILLA ENCLAVES / CHENNAI, INDIA</span>
          </div>

          {/* Company Main Headline */}
          <h1
            className={`font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.06] mb-6 tracking-tight drop-shadow-sm ${
              isLight ? 'text-gray-950' : 'text-white'
            }`}
          >
            Exclusive Gated Villas.<br />
            <span className={`italic font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>
              Peaceful Coastal Living.
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl mb-8 ${
              isLight ? 'text-gray-800 font-normal' : 'text-gray-200'
            }`}
          >
            Discover bespoke independent luxury villas in Chennai’s finest gated communities — crafted for peaceful living, absolute 24/7 security, lush green surroundings, and joyful family life on East Coast Road.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            {onExploreProjects && (
              <button
                onClick={onExploreProjects}
                className="bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs tracking-[0.18em] uppercase px-7 sm:px-9 py-4 rounded-sm transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2.5 group"
              >
                <span>EXPLORE VILLAS</span>
                <ArrowRight className="w-4 h-4 text-[#0b0c0e] group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {onNavigateOurStory && (
              <button
                onClick={onNavigateOurStory}
                className={`border text-xs tracking-[0.18em] uppercase px-6 py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isLight
                    ? 'border-black/20 hover:border-[#9b6f1e] text-gray-900 hover:text-[#9b6f1e] bg-white/90 backdrop-blur-md shadow-md'
                    : 'border-white/25 hover:border-[#dfb776] text-white hover:text-[#dfb776] bg-black/50 backdrop-blur-sm'
                }`}
              >
                <span>OUR STORY</span>
                <ArrowUpRight className={`w-3.5 h-3.5 ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`} />
              </button>
            )}

            {onBookTour && (
              <button
                onClick={onBookTour}
                className={`hidden sm:flex border text-xs tracking-[0.18em] uppercase px-6 py-4 rounded-sm transition-all duration-200 cursor-pointer items-center gap-2 ${
                  isLight
                    ? 'border-black/15 hover:border-black/40 text-gray-900 hover:text-black bg-white/75 backdrop-blur-md shadow-sm'
                    : 'border-white/15 hover:border-white/40 text-gray-300 hover:text-white bg-black/30 backdrop-blur-sm'
                }`}
              >
                <span>BOOK PRIVATE VILLA TOUR</span>
                <span className="text-[12px]">↗</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. COMPANY HIGHLIGHTS BOTTOM STRIP (Light Glass in Day Mode, Dark Glass in Night Mode) */}
      <div className={`relative z-20 w-full border-t backdrop-blur-md py-4 sm:py-5 shrink-0 mt-auto transition-colors ${
        isLight ? 'bg-white/90 border-black/10 text-gray-900 shadow-sm' : 'bg-black/60 border-white/10 text-white'
      }`}>
        <div className={`w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x ${
          isLight ? 'divide-black/10' : 'divide-white/10'
        }`}>
          <div className="px-2">
            <div className={`text-lg sm:text-xl font-bold font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>GATED ENCLAVE</div>
            <div className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>24/7 SECURE LIVING</div>
          </div>
          <div className="px-2">
            <div className={`text-lg sm:text-xl font-bold font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>INDEPENDENT</div>
            <div className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>LUXURY PRIVATE VILLAS</div>
          </div>
          <div className="px-2">
            <div className={`text-lg sm:text-xl font-bold font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>ECR & OMR</div>
            <div className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>PRIME COASTAL LOCATION</div>
          </div>
          <div className="px-2">
            <div className={`text-lg sm:text-xl font-bold font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>PEACEFUL HAVEN</div>
            <div className={`text-[10px] font-mono uppercase tracking-wider mt-0.5 ${isLight ? 'text-gray-700 font-medium' : 'text-gray-400'}`}>SERENE & HAPPY LIFESTYLE</div>
          </div>
        </div>
      </div>
    </section>
  );
};
