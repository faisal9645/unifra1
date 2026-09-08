import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/mockData';
import { GalleryItem } from '../types';

interface ThreeCarouselProps {
  onSelectImage: (item: GalleryItem) => void;
}

export const ThreeCarousel: React.FC<ThreeCarouselProps> = ({ onSelectImage }) => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Facade', 'Living', 'Master Suite', 'Dining'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0b0c0e] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>ARCHITECTURAL PORTFOLIO</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            A Glimpse of Our <span className="italic font-serif-luxury text-[#dfb776]">Dream Homes</span>
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Explore the modern aesthetics and functional elegance that define a Unifra residence.
          </p>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'bg-[#121418] text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Perspective Coverflow Carousel Stage */}
        <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center perspective-[1200px] my-6">
          {filteredItems.map((item, index) => {
            const total = filteredItems.length;
            let offset = index - currentIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 3;

            if (!isVisible) return null;

            const translateX = offset * 180;
            const translateZ = -Math.abs(offset) * 120;
            const rotateY = -offset * 30;
            const scale = Math.max(0.72, 1 - Math.abs(offset) * 0.12);
            const zIndex = 30 - Math.abs(offset) * 5;
            const opacity = Math.max(0.35, 1 - Math.abs(offset) * 0.25);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    onSelectImage(item);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                data-cursor="VIEW"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  zIndex,
                  opacity
                }}
                className={`absolute w-[260px] sm:w-[320px] lg:w-[370px] h-[360px] sm:h-[440px] lg:h-[490px] rounded-sm overflow-hidden cursor-pointer transition-all duration-500 ease-out shadow-2xl bg-[#121418] group border ${
                  isCenter ? 'border-[#dfb776]/60 shadow-[0_10px_35px_rgba(223,183,118,0.15)]' : 'border-white/10'
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

                {/* Card Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white pointer-events-none text-left">
                  <div className="inline-block text-[9px] font-mono tracking-widest text-[#dfb776] uppercase mb-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-[#dfb776]/30">
                    {item.category}
                  </div>
                  <h3 className="font-serif-luxury text-lg sm:text-xl font-bold leading-tight mb-1 text-white">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs font-mono">
                    <MapPin className="w-3 h-3 text-[#dfb776]" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>

                {/* Expand icon on center card */}
                {isCenter && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectImage(item);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-sm bg-black/60 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/20 transition-all shadow-lg pointer-events-auto cursor-pointer"
                    title="View full resolution"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}

          {/* Navigation Chevron Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-6 z-40 p-3 sm:p-3.5 rounded-sm bg-[#121418]/90 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] shadow-2xl backdrop-blur-md transition-all duration-200 border border-white/15 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-6 z-40 p-3 sm:p-3.5 rounded-sm bg-[#121418]/90 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] shadow-2xl backdrop-blur-md transition-all duration-200 border border-white/15 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {filteredItems.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-none transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? 'w-8 bg-[#dfb776]' : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
