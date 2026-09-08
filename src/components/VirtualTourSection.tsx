import React from 'react';
import { Play, Sparkles, Compass, Eye, Volume2, Move } from 'lucide-react';

interface VirtualTourSectionProps {
  onOpenVirtualTour: () => void;
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ onOpenVirtualTour }) => {
  return (
    <section id="virtual-tour" className="py-20 sm:py-28 bg-[#0b0c0e] text-white relative overflow-hidden border-t border-white/10">
      {/* Background Architectural Blueprint Line Art */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] flex items-center justify-center">
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full max-w-5xl object-contain stroke-[#dfb776] fill-none"
          strokeWidth="1.2"
        >
          {/* Villa Blueprint Isometric Lines */}
          <polygon points="500,80 850,220 850,560 500,420" />
          <polygon points="500,80 150,220 150,560 500,420" />
          <line x1="500" y1="80" x2="500" y2="420" />
          <line x1="500" y1="420" x2="500" y2="660" />
          <line x1="150" y1="220" x2="500" y2="360" />
          <line x1="850" y1="220" x2="500" y2="360" />
          <line x1="220" y1="250" x2="430" y2="335" />
          <line x1="570" y1="335" x2="780" y2="250" />
          <line x1="220" y1="390" x2="430" y2="475" />
          <line x1="570" y1="475" x2="780" y2="390" />
          <rect x="250" y="270" width="80" height="90" strokeDasharray="3,3" />
          <rect x="670" y="270" width="80" height="90" strokeDasharray="3,3" />
          <circle cx="500" cy="420" r="120" strokeDasharray="4,4" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>INTERACTIVE SPATIAL EXPERIENCE</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            Experience <span className="italic font-serif-luxury text-[#dfb776]">Unifra</span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Take a virtual tour of our craftsmanship and see how we bring dreams to life at MYSA Luxe Villas.
          </p>
        </div>

        {/* Cinematic Video / 360 Walkthrough Preview Card */}
        <div className="max-w-4xl mx-auto">
          <div
            onClick={onOpenVirtualTour}
            className="group relative rounded-sm overflow-hidden shadow-2xl bg-[#121418] cursor-pointer border border-white/10 hover:border-[#dfb776]/50 transform hover:-translate-y-1 transition-all duration-500"
          >
            {/* High-res interior video poster image */}
            <img
              src="https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1400&q=80"
              alt="Unifra Building Dreams Architectural Tour"
              className="w-full h-[320px] sm:h-[460px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />

            {/* Dark gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20" />

            {/* Play Button in Center */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative flex items-center justify-center">
                <div className="absolute -inset-4 rounded-full bg-[#dfb776]/20 animate-ping opacity-75" />
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#dfb776] text-[#0b0c0e] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                  <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
                </div>
              </div>
            </div>

            {/* Top Bar Badges */}
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2">
              <span className="px-3 py-1 rounded-sm bg-black/70 backdrop-blur-md text-white text-[10px] font-mono tracking-wider border border-white/10 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>4K HDR 360° TOUR</span>
              </span>
              <span className="px-3 py-1 rounded-sm bg-black/70 backdrop-blur-md text-gray-300 text-[10px] font-mono tracking-wider border border-white/10 hidden sm:flex items-center gap-1.5">
                <Move className="w-3 h-3 text-[#dfb776]" />
                <span>Interactive Panoramic Pan</span>
              </span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-left">
              <h3 className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">
                Unifra: Building Dreams
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm font-light">
                See our premium villas and architectural excellence in real-time interactive 360°.
              </p>
            </div>
          </div>

          {/* Quick specs pill bar beneath */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-4 text-[10px] sm:text-[11px] font-mono text-gray-500 uppercase tracking-widest">
            <div>360° SPATIAL WALKTHROUGH READY</div>
            <div className="flex items-center gap-4">
              <span>DOLBY ATMOS AUDIO</span>
              <span>•</span>
              <span>GYROSCOPE COMPATIBLE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
