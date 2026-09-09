import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  ArrowUpRight,
  ChevronDown,
  Phone,
  MessageCircle,
  Eye,
  Check
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem, Hotspot } from '../types';

export interface ThreeHeroVillaProps {
  theme?: 'light' | 'dark';
  onExploreProjects?: () => void;
  onOpenVirtualTour?: () => void;
  onNavigateOurStory?: () => void;
  onSelectGalleryItem?: (item: GalleryItem) => void;
  onScrollDown?: () => void;
  // Kept for backward compatibility if passed
  onSelectHotspot?: (hotspot: Hotspot) => void;
  selectedHotspot?: Hotspot | null;
}

export const ThreeHeroVilla: React.FC<ThreeHeroVillaProps> = ({
  theme = 'dark',
  onExploreProjects,
  onOpenVirtualTour,
  onNavigateOurStory,
  onSelectGalleryItem,
  onScrollDown
}) => {
  const isLight = theme === 'light';
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);

  // Auto-play slideshow timer
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const currentItem = GALLERY_ITEMS[photoIndex];

  const handlePrev = () => {
    setPhotoIndex((prev) => (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
  };

  const handleNext = () => {
    setPhotoIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  return (
    <section
      id="hero"
      className={`relative w-full h-screen min-h-[680px] lg:min-h-[740px] flex flex-col justify-between pt-20 sm:pt-24 pb-0 overflow-hidden transition-colors duration-500 ${
        isLight ? 'bg-[#ebf2f8]' : 'bg-[#0b0c0e]'
      }`}
    >
      {/* Background 4K Architectural Render - Full View Edge-to-Edge */}
      <div className="absolute inset-0 z-0">
        <img
          key={currentItem.id}
          src={currentItem.imageUrl}
          alt={currentItem.title}
          className="w-full h-full object-cover animate-in fade-in duration-700 select-none contrast-[1.04] brightness-[1.02]"
        />

        {/* Luxury Ambient Gradients ensuring maximum readability & crystal clear 4K renders */}
        <div
          className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
            isLight
              ? 'bg-gradient-to-r from-white/90 via-white/60 to-transparent'
              : 'bg-gradient-to-r from-black/90 via-black/60 to-transparent'
          }`}
        />
        <div
          className={`absolute inset-0 pointer-events-none ${
            isLight
              ? 'bg-gradient-to-t from-white/85 via-transparent to-white/40'
              : 'bg-gradient-to-t from-black/90 via-transparent to-black/40'
          }`}
        />
      </div>

      {/* 1. TOP CONTROLS BAR: Render Metadata & Playback (Container aligned) */}
      <div className={`relative z-20 w-full border-b backdrop-blur-md shrink-0 transition-colors ${
        isLight ? 'bg-white/80 border-black/10 text-gray-900' : 'bg-black/40 border-white/10 text-white'
      }`}>
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Left: Render Category & Index */}
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#dfb776] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase bg-[#dfb776] text-[#0b0c0e] px-2.5 py-0.5 rounded-xs font-semibold">
              {currentItem.categoryLabel || currentItem.category}
            </span>
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded-xs border ${
                isLight
                  ? 'bg-white/80 text-gray-900 border-black/10'
                  : 'bg-black/60 text-[#dfb776] border-white/10'
              }`}
            >
              {String(photoIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
            </span>
            <span className="hidden md:inline text-xs font-mono text-gray-300 font-light truncate max-w-xs">
              • {currentItem.title}
            </span>
          </div>

          {/* Right: Fullscreen Inspection & Slideshow Controls */}
          <div className="flex items-center gap-2">
            {onSelectGalleryItem && (
              <button
                onClick={() => onSelectGalleryItem(currentItem)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[11px] font-mono uppercase tracking-wider bg-black/60 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/15 hover:border-[#dfb776] transition-all shadow-md cursor-pointer"
                title="Inspect 4K Full Resolution"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Inspect 4K</span>
              </button>
            )}

            {/* Play/Pause Auto-Advancing */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                isAutoPlay
                  ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]/50'
                  : 'bg-black/60 text-gray-300 hover:text-white border-white/15'
              }`}
              title={isAutoPlay ? 'Pause Slideshow' : 'Play Slideshow'}
            >
              {isAutoPlay ? <Pause className="w-3 h-3 text-[#dfb776]" /> : <Play className="w-3 h-3" />}
              <span className="hidden sm:inline">{isAutoPlay ? 'Auto-Advancing' : 'Paused'}</span>
            </button>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-xs bg-black/60 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/15 transition-colors cursor-pointer"
                title="Previous 4K Render"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 rounded-xs bg-black/60 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/15 transition-colors cursor-pointer"
                title="Next 4K Render"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN CENTER BODY: Editorial Typography & Signature HUD Card (Container aligned, fill height) */}
      <div className="relative z-10 flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center overflow-y-auto">
        {/* Left Column: Brand Typography & CTAs */}
        <div key={currentItem.id} className="lg:col-span-7 xl:col-span-7 text-left max-w-2xl animate-in fade-in duration-500">
          {/* Eyebrow */}
          <div
            className={`text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] mb-3 sm:mb-4 flex items-center gap-2 ${
              isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />
            <span>{currentItem.heroEyebrow || 'INDEPENDENT HOMES / CHENNAI, INDIA'}</span>
          </div>

          {/* Main Luxury Heading */}
          <h1
            className={`font-serif-luxury text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.05] mb-4 sm:mb-5 tracking-tight drop-shadow-md ${
              isLight ? 'text-gray-950' : 'text-white'
            }`}
          >
            {currentItem.heroHeadlineMain || 'The art of'}<br />
            <span className={`italic font-serif-luxury ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>
              {currentItem.heroHeadlineItalic || 'arriving home.'}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xs sm:text-sm md:text-[15px] font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow ${
              isLight ? 'text-gray-800' : 'text-gray-200'
            }`}
          >
            {currentItem.heroSubtitle || "We create addresses with a point of view — considered Scandinavian architecture, tactile materials, and the kind of quiet that stays with you. Timeless luxury and effortless living on Chennai's East Coast Road."}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
            {onExploreProjects && (
              <button
                onClick={onExploreProjects}
                className="bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2 group"
              >
                <span>EXPLORE MYSA</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            )}

            {onOpenVirtualTour && (
              <button
                onClick={onOpenVirtualTour}
                className={`border text-xs tracking-[0.18em] uppercase px-5 sm:px-6 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isLight
                    ? 'border-black/20 hover:border-[#9b6f1e] text-gray-900 hover:text-[#9b6f1e] bg-white/80 backdrop-blur-md shadow-md'
                    : 'border-white/25 hover:border-[#dfb776] text-white hover:text-[#dfb776] bg-black/50 backdrop-blur-sm'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>LAUNCH 360° TOUR</span>
              </button>
            )}

            {onNavigateOurStory && (
              <button
                onClick={onNavigateOurStory}
                className={`hidden sm:flex border text-xs tracking-[0.18em] uppercase px-4 sm:px-5 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer items-center gap-1.5 ${
                  isLight
                    ? 'border-black/15 hover:border-black/40 text-gray-800 hover:text-black bg-white/60 backdrop-blur-md'
                    : 'border-white/15 hover:border-white/40 text-gray-300 hover:text-white bg-black/30 backdrop-blur-sm'
                }`}
              >
                <span>OUR STORY</span>
                <span className="text-[11px]">↗</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Column: Signature Project & Render HUD Card */}
        <div className="lg:col-span-5 xl:col-span-5 flex justify-end">
          <div
            className={`w-full max-w-md backdrop-blur-xl border p-5 sm:p-6 rounded-sm text-left shadow-2xl transition-all ${
              isLight
                ? 'bg-white/90 border-black/15 text-gray-900'
                : 'bg-[#121418]/90 border-white/10 text-white'
            }`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3 sm:mb-4">
              <span className={`text-[10px] font-mono tracking-[0.2em] uppercase ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                SIGNATURE PROJECT
              </span>
              <span className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 rounded-sm text-[#dfb776] border-[#dfb776]/40 bg-[#dfb776]/10 font-semibold">
                ONGOING
              </span>
            </div>

            {/* Title */}
            <h3
              onClick={onExploreProjects}
              className={`font-serif-luxury text-xl sm:text-2xl font-bold mb-1.5 sm:mb-2 cursor-pointer transition-colors ${
                isLight ? 'text-gray-900 hover:text-[#9b6f1e]' : 'text-white hover:text-[#dfb776]'
              }`}
            >
              Mysa Luxe Villas
            </h3>

            {/* Active Perspective Info */}
            <div className="mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-white/10">
              <div className="text-xs font-mono text-[#dfb776] font-semibold mb-1">
                {currentItem.title}
              </div>
              <div className={`text-[11px] leading-relaxed font-light ${isLight ? 'text-gray-700' : 'text-gray-300'}`}>
                {currentItem.description}
              </div>
            </div>

            {/* Spatial Specifications */}
            <div className="space-y-1.5 sm:space-y-2 text-xs pb-2.5 sm:pb-3 border-b border-white/10 mb-3 font-mono">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>AREA / VOLUME</span>
                <span className="text-[11px] font-semibold">{currentItem.area}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>LOCATION</span>
                <span className="text-[11px] font-semibold">{currentItem.location}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-[10px] ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>PRIVACY</span>
                <span className="text-[11px] font-semibold text-[#dfb776]">ZERO COMMON WALLS</span>
              </div>
            </div>

            {/* Feature Chips */}
            <div className="grid grid-cols-2 gap-y-1.5 text-[11px] font-light mb-3 sm:mb-4 text-gray-300">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>4 & 5 BHK Layouts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>Private Lap Pool</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>Executive EV Bay</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>Gated Lotus Entry</span>
              </div>
            </div>

            {/* Bottom Card Action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={onExploreProjects}
                className={`text-[10px] font-mono tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isLight ? 'text-[#9b6f1e] hover:text-black font-semibold' : 'text-[#dfb776] hover:text-white'
                }`}
              >
                <span>EXPLORE SHOWCASE</span>
                <span>→</span>
              </button>
              <span className="text-[9px] font-mono text-gray-400">
                4K ARCHITECTURE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM STRIP: 11 Authentic 4K Render Thumbnails & Sub-footer (Pinned at bottom edge) */}
      <div className="relative z-20 w-full bg-black/60 backdrop-blur-md border-t border-white/10 py-3 sm:py-4 shrink-0 mt-auto">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-3">
          {/* Horizontal Thumbnail Switcher Strip */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = photoIndex === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setPhotoIndex(idx)}
                  className={`relative flex-shrink-0 w-14 h-10 sm:w-18 sm:h-12 rounded-xs overflow-hidden border transition-all cursor-pointer ${
                    isActive
                      ? 'border-[#dfb776] ring-2 ring-[#dfb776]/50 scale-105 shadow-xl shadow-black'
                      : 'border-white/15 hover:border-white/50 opacity-60 hover:opacity-100'
                  }`}
                  title={`${item.title} (${item.area})`}
                >
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20" />
                  <span className="absolute bottom-0.5 right-1 text-[8px] font-mono text-white bg-black/70 px-1 rounded-xs">
                    {idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Sub-footer: Scroll to Discover, Address & Direct Concierge */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-white/10 text-xs font-mono">
            {/* Scroll Down */}
            <div className="flex items-center gap-2">
              {onScrollDown && (
                <button
                  onClick={onScrollDown}
                  className={`flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase transition-colors cursor-pointer group ${
                    isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-400 hover:text-[#dfb776]'
                  }`}
                >
                  <span>SCROLL TO DISCOVER</span>
                  <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform animate-bounce text-[#dfb776]" />
                </button>
              )}
            </div>

            {/* Address */}
            <div className={`text-[10px] tracking-widest uppercase ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
              EAST COAST ROAD / VETTUVANKENI • CHENNAI
            </div>

            {/* Concierge Hotline */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+917358222445"
                className="flex items-center gap-1.5 text-[10px] uppercase border px-3 py-1 rounded-xs transition-colors border-white/15 text-gray-300 hover:text-[#dfb776] hover:border-[#dfb776]/40 bg-black/40"
              >
                <Phone className="w-3 h-3 text-[#dfb776]" />
                <span>+91 73582 22445</span>
              </a>

              <a
                href="https://wa.me/917358222445"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] uppercase border px-3 py-1 rounded-xs transition-colors border-white/15 text-gray-300 hover:text-green-400 hover:border-green-500/40 bg-black/40"
              >
                <MessageCircle className="w-3 h-3 text-emerald-400" />
                <span>WHATSAPP</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
