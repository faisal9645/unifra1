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
}

export const HeroOverlay: React.FC<HeroOverlayProps> = ({
  onExploreProjects,
  onOpenVirtualTour,
  onNavigateOurStory,
  onScrollDown,
  selectedHotspot,
  onCloseHotspot,
  onViewHotspotPhoto
}) => {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-16">
      {/* Top spacing */}
      <div className="h-16" />

      {/* Center Grid: Left Title & CTAs (Screenshot 7 & 6), Right Architectural Spec HUD Card */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 my-auto pt-8 sm:pt-12">
        {/* Left Column matching screenshot 7 & 6 */}
        <div className="max-w-2xl text-left">
          {/* Eyebrow */}
          <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#dfb776] mb-4 pointer-events-auto flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>INDEPENDENT HOMES / CHENNAI, INDIA</span>
          </div>

          {/* Heading with Italic Luxury Serif: "The art of arriving home." */}
          <h1 className="font-serif-luxury text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.04] mb-5 tracking-tight">
            The art of<br />
            <span className="italic font-serif-luxury text-[#dfb776]">
              arriving home.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-300 text-xs sm:text-sm md:text-[15px] font-light leading-relaxed max-w-xl mb-8">
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
              className="border border-white/25 hover:border-[#dfb776] hover:text-[#dfb776] bg-black/40 backdrop-blur-sm text-white text-xs tracking-[0.18em] uppercase px-6 py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>WATCH 3D TOUR</span>
            </button>

            {onNavigateOurStory && (
              <button
                onClick={onNavigateOurStory}
                className="hidden sm:flex border border-white/15 hover:border-white/40 text-gray-300 hover:text-white bg-black/20 backdrop-blur-sm text-xs tracking-[0.18em] uppercase px-5 py-4 rounded-sm transition-all duration-200 cursor-pointer items-center gap-1.5"
              >
                <span>OUR STORY</span>
                <span className="text-[11px]">↗</span>
              </button>
            )}
          </div>
        </div>

        {/* Right HUD Card: Matching "SIGNATURE PROJECT: Mysa Luxe Villas" & 3D controller info */}
        <div className="w-full lg:w-80 pointer-events-auto bg-[#121418]/94 backdrop-blur-xl border border-white/10 p-6 text-left rounded-sm shadow-2xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-[10px] font-mono tracking-[0.2em] text-gray-400 uppercase">
              SIGNATURE PROJECT
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#dfb776] uppercase border border-[#dfb776]/40 px-2 py-0.5 rounded-sm bg-[#dfb776]/10">
              ONGOING
            </span>
          </div>

          <h3
            onClick={onExploreProjects}
            className="font-serif-luxury text-xl font-bold text-white mb-4 hover:text-[#dfb776] cursor-pointer transition-colors"
          >
            Mysa Luxe Villas
          </h3>

          <div className="space-y-2.5 text-xs pb-4 border-b border-white/10 mb-4">
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-mono tracking-wider">DIMENSIONS</span>
              <span className="text-white font-mono text-[11px]">2,879 – 4,150 SQ.FT.</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-mono tracking-wider">CONFIGURATION</span>
              <span className="text-white font-mono text-[11px]">4 & 5 BHK</span>
            </div>
            <div className="flex justify-between items-center text-gray-400">
              <span className="text-[10px] font-mono tracking-wider">PRIVACY</span>
              <span className="text-white font-mono text-[11px]">NO COMMON WALLS</span>
            </div>
          </div>

          {/* Check bullets */}
          <div className="grid grid-cols-2 gap-y-2 text-[11px] text-gray-300 font-light mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776]" />
              <span>Smart Automation</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776]" />
              <span>Private Pool</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776]" />
              <span>EV Charging</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776]" />
              <span>Gated Entry</span>
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={onExploreProjects}
              className="text-[10px] font-mono tracking-widest text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>EXPLORE SHOWCASE</span>
              <span>→</span>
            </button>
            <span className="text-[#dfb776] flex items-center gap-1 text-[9px] font-mono">
              <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full animate-ping" />
              3D VILLA
            </span>
          </div>
        </div>
      </div>

      {/* Selected Hotspot Detail Card (Pop-up when clicking a 3D pin) */}
      {selectedHotspot && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm pointer-events-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#121418]/95 text-white p-4 sm:p-5 rounded-sm border border-[#dfb776]/40 shadow-2xl backdrop-blur-xl">
            <div className="flex items-start justify-between mb-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776]">
                  {selectedHotspot.subtitle}
                </span>
                <h4 className="font-serif-luxury text-lg font-bold text-white">
                  {selectedHotspot.name}
                </h4>
              </div>
              <button
                onClick={onCloseHotspot}
                className="p-1.5 rounded-sm bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
                title="Close inspection"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Authentic Architectural Photo Preview */}
            {selectedHotspot.imageUrl && (
              <div className="relative h-36 w-full rounded-sm overflow-hidden mb-3 border border-white/10 group">
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

            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {selectedHotspot.description}
            </p>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/10">
              {selectedHotspot.specs.map((s, idx) => (
                <div key={idx} className="bg-white/5 p-2 rounded-sm text-center">
                  <div className="text-[9px] text-gray-400 uppercase tracking-wider">{s.label}</div>
                  <div className="text-xs font-semibold text-[#dfb776] mt-0.5 truncate">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar: "SCROLL TO DISCOVER", "EAST COAST ROAD / VETTUVANKENI", and Concierge Actions */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-4 mt-auto gap-3">
        <div className="flex items-center gap-3">
          {onScrollDown ? (
            <button
              onClick={onScrollDown}
              className="pointer-events-auto flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-gray-400 hover:text-[#dfb776] uppercase transition-colors cursor-pointer group"
            >
              <span>SCROLL TO DISCOVER</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#dfb776] group-hover:translate-y-0.5 transition-transform animate-bounce" />
            </button>
          ) : (
            <span className="text-[10px] font-mono tracking-[0.25em] text-gray-400 uppercase">
              SCROLL TO DISCOVER
            </span>
          )}
        </div>

        <div className="text-[10px] font-mono tracking-widest text-gray-500 uppercase">
          <span>EAST COAST ROAD / VETTUVANKENI • CHENNAI</span>
        </div>

        {/* Concierge Direct Buttons (Screenshot 7 sub-bar) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href="tel:+917358222445"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:text-[#dfb776] uppercase border border-white/10 hover:border-[#dfb776]/40 px-3 py-1.5 rounded-sm bg-black/40 backdrop-blur-sm transition-colors"
          >
            <Phone className="w-3 h-3 text-[#dfb776]" />
            <span>+91 73582 22445</span>
          </a>

          <a
            href="https://wa.me/917358222445"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-gray-300 hover:text-green-400 uppercase border border-white/10 hover:border-green-500/40 px-3 py-1.5 rounded-sm bg-black/40 backdrop-blur-sm transition-colors"
          >
            <MessageCircle className="w-3 h-3 text-green-400" />
            <span>WHATSAPP</span>
          </a>
        </div>
      </div>
    </div>
  );
};
