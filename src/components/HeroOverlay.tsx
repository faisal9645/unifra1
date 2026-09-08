import React from 'react';
import { ArrowRight, ArrowUpRight, Play, ChevronDown, X, Phone, MessageCircle, Maximize2, ExternalLink } from 'lucide-react';
import { Hotspot, GalleryItem } from '../types';

interface HeroOverlayProps {
  onExploreProjects: () => void;
  onOpenVirtualTour: () => void;
  onNavigateOurStory?: () => void;
  onScrollDown?: () => void;
  selectedHotspot: Hotspot | null;
  onCloseHotspot: () => void;
  onViewHotspotPhoto?: (photo: { title: string; imageUrl: string; description: string; category: string; location: string; area: string }) => void;
  theme?: 'light' | 'dark';
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  onExploreProjects,
  onOpenVirtualTour,
  onNavigateOurStory,
  onScrollDown,
  selectedHotspot,
  onCloseHotspot,
  onViewHotspotPhoto,
  theme = 'dark'
}) => {
  const isLight = theme === 'light';

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
      {/* Top spacing */}
      <div className="h-16" />

      {/* Center Grid: Left Title & CTAs (Screenshot 7 & 6), Right Architectural Spec HUD Card */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 my-auto pt-8 sm:pt-12">
        {/* Left Column matching screenshot 7 & 6 */}
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className={`text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] mb-4 pointer-events-auto flex items-center gap-2 ${
            isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
            <span>INDEPENDENT HOMES / CHENNAI, INDIA</span>
          </div>

          {/* Heading with Italic Luxury Serif: "The art of arriving home." */}
          <h1 className={`font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.04] mb-5 tracking-tight ${
            isLight ? 'text-gray-950' : 'text-white'
          }`}>
            The art of<br />
            <span className={`italic font-serif-luxury ${
              isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'
            }`}>
              arriving home.
            </span>
          </h1>

          {/* Subtitle */}
          <p className={`text-xs sm:text-sm md:text-[15px] font-light leading-relaxed max-w-xl mb-8 ${
            isLight ? 'text-gray-800' : 'text-gray-300'
          }`}>
            We create addresses with a point of view — considered architecture, tactile materials, and the kind of quiet that stays with you. Timeless luxury and effortless living on Chennai's East Coast Road.
          </p>

          {/* Action Buttons: EXPLORE MYSA ↗, WATCH 3D TOUR, OUR STORY ↗ */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pointer-events-auto">
            <button
              onClick={onExploreProjects}
              className="bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-8 py-4 rounded-sm transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2 group"
            >
              <span>EXPLORE MYSA</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            <button
              onClick={onOpenVirtualTour}
              className={`border text-xs tracking-[0.18em] uppercase px-6 py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                isLight
                  ? 'border-black/20 hover:border-[#9b6f1e] text-gray-900 hover:text-[#9b6f1e] bg-white/80 backdrop-blur-md shadow-md'
                  : 'border-white/25 hover:border-[#dfb776] text-white hover:text-[#dfb776] bg-black/40 backdrop-blur-sm'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>WATCH 3D TOUR</span>
            </button>

            {onNavigateOurStory && (
              <button
                onClick={onNavigateOurStory}
                className={`hidden sm:flex border text-xs tracking-[0.18em] uppercase px-5 py-4 rounded-sm transition-all duration-200 cursor-pointer items-center gap-1.5 ${
                  isLight
                    ? 'border-black/15 hover:border-black/40 text-gray-800 hover:text-black bg-white/60 backdrop-blur-md shadow-xs'
                    : 'border-white/15 hover:border-white/40 text-gray-300 hover:text-white bg-black/20 backdrop-blur-sm'
                }`}
              >
                <span>OUR STORY</span>
                <span className="text-[11px]">↗</span>
              </button>
            )}
          </div>
        </div>

        {/* Right HUD Card: Matching "SIGNATURE PROJECT: Mysa Luxe Villas" & 3D controller info */}
        <div className={`w-full lg:w-80 pointer-events-auto backdrop-blur-xl border p-6 text-left rounded-sm transition-all ${
          isLight
            ? 'bg-white/94 border-black/15 text-gray-900 shadow-xl'
            : 'bg-[#121418]/94 border-white/10 text-white shadow-2xl'
        }`}>
          <div className={`flex items-center justify-between pb-3 border-b mb-4 ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}>
            <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${
              isLight ? 'text-gray-600' : 'text-gray-400'
            }`}>
              SIGNATURE PROJECT
            </span>
            <span className={`text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 rounded-sm ${
              isLight
                ? 'text-amber-900 border-amber-600/40 bg-amber-500/15 font-semibold'
                : 'text-[#dfb776] border-[#dfb776]/40 bg-[#dfb776]/10'
            }`}>
              ONGOING
            </span>
          </div>

          <h3
            onClick={onExploreProjects}
            className={`font-serif-luxury text-xl font-bold mb-4 cursor-pointer transition-colors ${
              isLight ? 'text-gray-900 hover:text-[#9b6f1e]' : 'text-white hover:text-[#dfb776]'
            }`}
          >
            Mysa Luxe Villas
          </h3>

          <div className={`space-y-2.5 text-xs pb-4 border-b mb-4 ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-mono tracking-wider ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>DIMENSIONS</span>
              <span className={`font-mono text-[11px] font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>2,879 – 4,150 SQ.FT.</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-mono tracking-wider ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>CONFIGURATION</span>
              <span className={`font-mono text-[11px] font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>4 & 5 BHK</span>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-[10px] font-mono tracking-wider ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>PRIVACY</span>
              <span className={`font-mono text-[11px] font-semibold ${isLight ? 'text-gray-900' : 'text-white'}`}>NO COMMON WALLS</span>
            </div>
          </div>

          {/* Check bullets */}
          <div className={`grid grid-cols-2 gap-y-2 text-[11px] font-light mb-4 ${
            isLight ? 'text-gray-800' : 'text-gray-300'
          }`}>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
              <span>Smart Automation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
              <span>Private Pool</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
              <span>EV Charging</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
              <span>Gated Entry</span>
            </div>
          </div>

          <div className={`pt-3 border-t flex items-center justify-between ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}>
            <button
              onClick={onExploreProjects}
              className={`text-[10px] font-mono tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                isLight ? 'text-[#9b6f1e] hover:text-black font-semibold' : 'text-[#dfb776] hover:text-white'
              }`}
            >
              <span>EXPLORE SHOWCASE</span>
              <span>→</span>
            </button>
            <span className={`flex items-center gap-1 text-[9px] font-mono ${
              isLight ? 'text-[#9b6f1e] font-semibold' : 'text-[#dfb776]'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full animate-ping ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
              3D VILLA
            </span>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detail Card (Pop-up when clicking a 3D pin) */}
      {selectedHotspot && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`p-4 sm:p-5 rounded-sm shadow-2xl backdrop-blur-xl border ${
            isLight ? 'bg-white/96 text-gray-900 border-[#9b6f1e]/40' : 'bg-[#121418]/95 text-white border-[#dfb776]/40'
          }`}>
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className={`text-[10px] font-mono uppercase tracking-widest ${
                  isLight ? 'text-[#9b6f1e] font-semibold' : 'text-[#dfb776]'
                }`}>
                  {selectedHotspot.subtitle}
                </span>
                <h4 className={`font-serif-luxury text-lg font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  {selectedHotspot.name}
                </h4>
              </div>
              <button
                onClick={onCloseHotspot}
                className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                  isLight ? 'bg-black/5 hover:bg-black/10 text-gray-700' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
                title="Close inspection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Authentic Architectural Photo Preview */}
            {selectedHotspot.imageUrl && (
              <div className={`relative h-36 w-full rounded-sm overflow-hidden mb-3 border group ${
                isLight ? 'border-black/10' : 'border-white/10'
              }`}>
                <img
                  src={selectedHotspot.imageUrl}
                  alt={selectedHotspot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                  <span className="text-[9px] font-mono tracking-wider text-[#dfb776] bg-black/70 px-2 py-0.5 rounded-xs border border-[#dfb776]/30 uppercase">
                    {selectedHotspot.categoryLabel || 'ARCHITECTURAL PERSPECTIVE'}
                  </span>

                  {onViewHotspotPhoto && (
                    <button
                      onClick={() => onViewHotspotPhoto({
                        title: selectedHotspot.name,
                        imageUrl: selectedHotspot.imageUrl!,
                        description: selectedHotspot.description,
                        category: selectedHotspot.categoryLabel || 'Interior/Exterior',
                        location: 'MYSA Villas • ECR Chennai',
                        area: selectedHotspot.specs[0]?.value || 'Architectural Feature'
                      })}
                      className="text-[10px] font-mono text-white hover:text-[#dfb776] flex items-center gap-1 bg-black/70 hover:bg-black/90 px-2 py-0.5 rounded-xs border border-white/20 transition-colors cursor-pointer"
                      title="View High-Resolution Image"
                    >
                      <Maximize2 className="w-3 h-3 text-[#dfb776]" />
                      <span>EXPAND</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            <p className={`text-xs leading-relaxed mb-3 ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
              {selectedHotspot.description}
            </p>

            <div className={`grid grid-cols-3 gap-2 pt-3 border-t ${isLight ? 'border-black/10' : 'border-white/10'}`}>
              {selectedHotspot.specs.map((s, idx) => (
                <div key={idx} className={`p-2 rounded-sm text-center ${isLight ? 'bg-black/5' : 'bg-white/5'}`}>
                  <div className={`text-[9px] uppercase tracking-wider ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>{s.label}</div>
                  <div className={`text-xs font-semibold mt-0.5 truncate ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: "SCROLL TO DISCOVER", "EAST COAST ROAD / VETTUVANKENI", and Concierge Actions */}
      <div className={`w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col sm:flex-row items-center justify-between border-t pt-4 mt-auto gap-3 ${
        isLight ? 'border-black/15' : 'border-white/10'
      }`}>
        <div className="flex items-center gap-3">
          {onScrollDown ? (
            <button
              onClick={onScrollDown}
              className={`pointer-events-auto flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] uppercase transition-colors cursor-pointer group ${
                isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-400 hover:text-[#dfb776]'
              }`}
            >
              <span>SCROLL TO DISCOVER</span>
              <ChevronDown className={`w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform animate-bounce ${
                isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'
              }`} />
            </button>
          ) : (
            <span className={`text-[10px] font-mono tracking-[0.25em] uppercase ${
              isLight ? 'text-gray-700' : 'text-gray-400'
            }`}>
              SCROLL TO DISCOVER
            </span>
          )}
        </div>

        <div className={`text-[10px] font-mono tracking-widest uppercase ${
          isLight ? 'text-gray-600 font-medium' : 'text-gray-500'
        }`}>
          <span>EAST COAST ROAD / VETTUVANKENI • CHENNAI</span>
        </div>

        {/* Concierge Direct Buttons */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href="tel:+917358222445"
            className={`flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase border px-3 py-1.5 rounded-sm transition-colors ${
              isLight
                ? 'border-black/15 text-gray-800 hover:border-[#9b6f1e] bg-white/80 backdrop-blur-md shadow-xs'
                : 'border-white/10 text-gray-300 hover:text-[#dfb776] hover:border-[#dfb776]/40 bg-black/40 backdrop-blur-sm'
            }`}
          >
            <Phone className={`w-3 h-3 ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`} />
            <span>+91 73582 22445</span>
          </a>

          <a
            href="https://wa.me/917358222445"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1.5 text-[10px] font-mono tracking-wider uppercase border px-3 py-1.5 rounded-sm transition-colors ${
              isLight
                ? 'border-emerald-600/30 text-emerald-900 hover:border-emerald-600 bg-emerald-50/80 backdrop-blur-md shadow-xs font-semibold'
                : 'border-white/10 text-gray-300 hover:text-green-400 hover:border-green-500/40 bg-black/40 backdrop-blur-sm'
            }`}
          >
            <MessageCircle className="w-3 h-3 text-emerald-500" />
            <span>WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
};
