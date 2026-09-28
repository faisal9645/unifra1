import React from 'react';
import { Play, Sparkles } from 'lucide-react';

interface VirtualTourSectionProps {
  onOpenVirtualTour: () => void;
}

export const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ onOpenVirtualTour }) => {
  return (
    <section id="virtual-tour" className="py-14 sm:py-20 bg-[#faf8f5] text-[#1a1918] relative overflow-hidden border-t border-[#eae4db]">
      {/* Background Architectural Blueprint Line Art */}
      <div className="absolute inset-0 pointer-events-none opacity-20 flex items-center justify-center">
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full max-w-5xl object-contain stroke-[#c59b67] fill-none"
          strokeWidth="0.8"
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

      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
            <span>INTERACTIVE SPATIAL EXPERIENCE</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Experience <span className="italic font-serif-luxury text-[#c59b67]">Unifra</span>
          </h2>

          <p className="text-[#68625d] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            Explore our vision for luxury gated villa living, architectural discipline, and peaceful coastal home environments.
          </p>
        </div>

        {/* Cinematic Video / 360 Walkthrough Preview Card */}
        <div className="max-w-4xl mx-auto">
          <div
            onClick={onOpenVirtualTour}
            className="group relative rounded-[24px] overflow-hidden shadow-lg hover:shadow-2xl bg-white cursor-pointer border border-[#eae4db] hover:border-[#c59b67] transform hover:-translate-y-1 transition-all duration-500"
          >
            {/* High-res interior video poster image */}
            <div className="relative h-[340px] sm:h-[480px] lg:h-[540px] overflow-hidden">
              <img
                src="/images/mysa3d/LIVING-VIEW1.jpg"
                alt="Unifra Architectural Villa Showcase & Cinematic Film"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />

              {/* Lighting gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Play Button in Center */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="relative flex items-center justify-center">
                  <div className="absolute -inset-4 rounded-full bg-white/30 animate-ping opacity-75" />
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white text-[#1a1918] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#1a1918] group-hover:text-white">
                    <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current" />
                  </div>
                </div>
              </div>

              {/* Top Bar Badges */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[10px] font-mono tracking-wider font-semibold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>OFFICIAL YOUTUBE VILLA FILM</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#1a1918] text-[10px] font-mono tracking-wider border border-[#eae4db] hidden sm:flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="w-3 h-3 text-[#c59b67]" />
                  <span>UNIFRA LIFESTYLE</span>
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white text-left">
                <h3 className="font-serif-luxury text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1.5 drop-shadow">
                  Unifra Architectural Vision & Cinematic Villa Showcase
                </h3>
                <p className="text-white/80 text-xs sm:text-sm font-light drop-shadow">
                  Watch the official full-length architectural video film showcasing Unifra's design philosophy and peaceful gated community living.
                </p>
              </div>
            </div>
          </div>

          {/* Quick specs pill bar beneath */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 px-4 text-[10px] sm:text-[11px] font-mono text-[#8c827a] uppercase tracking-widest">
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
