import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  Layers,
  Sparkles,
  Maximize2,
  ChevronDown,
  Eye,
  CheckCircle2,
  Globe,
  Heart,
  Award
} from 'lucide-react';

interface UnifraCompanyHeroProps {
  theme?: 'light' | 'dark';
  onExploreProjects?: () => void;
  onNavigateOurStory?: () => void;
  onBookTour?: () => void;
}

interface WorldStage {
  id: string;
  stageNumber: string;
  eyebrow: string;
  titleMain: string;
  titleItalic: string;
  subtitle: string;
  imageUrl: string;
  badgeText: string;
  specs: { label: string; value: string }[];
  hotspot: { x: number; y: number; title: string; desc: string };
}

const WORLD_STAGES: WorldStage[] = [
  {
    id: 'stage-gate',
    stageNumber: '01',
    eyebrow: 'STAGE 01 / GATED VILLA COMMUNITIES',
    titleMain: 'Exclusive Gated',
    titleItalic: 'coastal sanctuaries.',
    subtitle: 'Pioneering private gated communities along Chennai’s East Coast Road — engineered with 24/7 security, lush green avenues, and peaceful living for your family.',
    imageUrl: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=2000&q=85',
    badgeText: 'GATED ENCLAVE LIVING',
    specs: [
      { label: 'Security', value: '24/7 Monitored Gated Access' },
      { label: 'Environment', value: 'Lush Green Tree Canopy' },
      { label: 'Location', value: 'Prime ECR & OMR Corridor' }
    ],
    hotspot: { x: 45, y: 65, title: '24/7 Gated Entry', desc: 'Secure perimeter access control and private cobblestone boulevard.' }
  },
  {
    id: 'stage-elevation',
    stageNumber: '02',
    eyebrow: 'STAGE 02 / INSPIRING ARCHITECTURE',
    titleMain: 'Inspiring',
    titleItalic: 'villa architecture.',
    subtitle: 'Bespoke independent luxury homes crafted with considered Scandinavian design, tactile natural materials, and zero common walls for total acoustic peace.',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    badgeText: 'INDEPENDENT LUXURY VILLAS',
    specs: [
      { label: 'Privacy', value: 'Zero Common Walls' },
      { label: 'Design', value: 'Scandinavian Minimalist' },
      { label: 'Materials', value: 'Honed Granite & Natural Cedar' }
    ],
    hotspot: { x: 55, y: 35, title: 'Minimalist Facade', desc: 'Natural wood louvers and solar low-E double-glazed glass.' }
  },
  {
    id: 'stage-atrium',
    stageNumber: '03',
    eyebrow: 'STAGE 03 / HAPPY HOME LIFESTYLE',
    titleMain: 'Serene & happy',
    titleItalic: 'family living.',
    subtitle: 'Voluminous 22-foot double-height living rooms, floating wooden staircases, and natural sunlit spaces where families connect, relax, and savor life.',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85',
    badgeText: 'DOUBLE-HEIGHT ATRIUMS',
    specs: [
      { label: 'Volume', value: '22-Foot Double-Height Atrium' },
      { label: 'Daylight', value: 'Double-Glazed Sunlit Glass' },
      { label: 'Craftsmanship', value: 'Floating Solid Teak Staircase' }
    ],
    hotspot: { x: 62, y: 50, title: 'Living Atrium', desc: 'Expansive double-height room filled with natural ambient light.' }
  },
  {
    id: 'stage-sanctuary',
    stageNumber: '04',
    eyebrow: 'STAGE 04 / FUTURE GOALS & COASTAL QUIET',
    titleMain: 'Future goals &',
    titleItalic: 'effortless quietude.',
    subtitle: 'Private reflection lap pools, sunlit garden decks, and sea-breeze terraces — built to deliver an effortless, high-trust luxury home experience for generations.',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85',
    badgeText: 'POOLSIDE SUN DECK',
    specs: [
      { label: 'Amenities', value: 'Private Lap Pool & Deck' },
      { label: 'Sustainability', value: 'Solar Photovoltaic Integration' },
      { label: 'Trust Record', value: '100% On-Time Villa Delivery' }
    ],
    hotspot: { x: 30, y: 55, title: 'Reflection Pool', desc: 'Temperature-balanced private swimming pool with stone terrace.' }
  }
];

export const UnifraCompanyHero: React.FC<UnifraCompanyHeroProps> = ({
  theme = 'dark',
  onExploreProjects,
  onNavigateOurStory,
  onBookTour
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [activeHotspotOpen, setActiveHotspotOpen] = useState(false);

  // Track scroll position inside the tall sticky container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableHeight = rect.height - windowHeight;

      if (totalScrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableHeight;
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);

      const stageIdx = Math.min(
        WORLD_STAGES.length - 1,
        Math.floor(clampedProgress * WORLD_STAGES.length)
      );
      setActiveStageIndex(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStageClick = (idx: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    const targetScrollTop = window.scrollY + rect.top + (idx / WORLD_STAGES.length) * totalScrollable;

    window.scrollTo({
      top: targetScrollTop + 10,
      behavior: 'smooth'
    });
  };

  const currentStage = WORLD_STAGES[activeStageIndex];
  const progressPercent = Math.round(scrollProgress * 100);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[300vh] bg-[#0b0c0e] text-[#f3f4f6]"
    >
      {/* STICKY FULLSCREEN VIEWPORT */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-20 sm:pt-24 pb-0 transition-colors duration-500">
        
        {/* 1. SCROLL-DRIVEN 3D BACKGROUND STAGES WITH CAMERA FLY-THROUGH */}
        <div className="absolute inset-0 z-0 bg-black">
          {WORLD_STAGES.map((stage, idx) => {
            const isCurrent = activeStageIndex === idx;

            // Camera Zoom Effect based on scroll progress inside each stage
            const stageProgress = (scrollProgress * WORLD_STAGES.length) - idx;
            const zoomScale = 1.02 + Math.max(0, Math.min(0.12, stageProgress * 0.08));

            return (
              <div
                key={stage.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                  isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={stage.imageUrl}
                  alt={stage.titleMain}
                  style={{ transform: `scale(${zoomScale})` }}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out contrast-[1.04] brightness-[1.02] select-none"
                />

                {/* Interactive Hotspot Pin */}
                <div
                  style={{ left: `${stage.hotspot.x}%`, top: `${stage.hotspot.y}%` }}
                  className="absolute z-30 -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                  onClick={() => setActiveHotspotOpen(!activeHotspotOpen)}
                >
                  <span className="relative flex h-6 w-6">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfb776] opacity-75" />
                    <span className="relative inline-flex rounded-full h-6 w-6 bg-[#dfb776] border-2 border-black text-[#0b0c0e] items-center justify-center text-[10px] font-bold shadow-xl">
                      +
                    </span>
                  </span>

                  {/* Hotspot Popup Card */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 w-56 p-3 rounded-sm bg-black/90 backdrop-blur-xl border border-[#dfb776]/50 text-white text-xs opacity-0 group-hover:opacity-100 transition-all pointer-events-none shadow-2xl space-y-1">
                    <div className="text-[10px] font-mono text-[#dfb776] uppercase tracking-wider font-semibold">
                      {stage.hotspot.title}
                    </div>
                    <div className="text-[11px] text-gray-300 font-light leading-snug">
                      {stage.hotspot.desc}
                    </div>
                  </div>
                </div>

                {/* Dark Luxury Ambient Gradients for Maximum Text Clarity */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0b0c0e]/95 via-[#0b0c0e]/75 to-transparent" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0b0c0e] via-transparent to-black/50" />
              </div>
            );
          })}
        </div>

        {/* 2. TOP SCROLL WORLD STATUS BAR */}
        <div className="relative z-20 w-full border-b backdrop-blur-md shrink-0 bg-black/40 border-white/10 text-white">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            {/* Left: World Title & Node Indicator */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#dfb776] animate-pulse" />
              <span className="uppercase font-semibold tracking-widest text-[#dfb776] flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>SCROLL 3D WORLD — {currentStage.badgeText}</span>
              </span>
              <span className="hidden sm:inline text-gray-400">
                • STAGE {currentStage.stageNumber} OF 04
              </span>
            </div>

            {/* Right: Stage Navigation Nodes */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 hidden lg:inline uppercase">Jump Stage:</span>
              <div className="flex items-center gap-1">
                {WORLD_STAGES.map((st, idx) => {
                  const isActive = activeStageIndex === idx;
                  return (
                    <button
                      key={st.id}
                      onClick={() => handleStageClick(idx)}
                      className={`px-2.5 py-1 rounded-xs text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer border ${
                        isActive
                          ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold border-[#dfb776]'
                          : 'bg-black/60 text-gray-400 hover:text-white border-white/15'
                      }`}
                    >
                      {st.stageNumber}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN CENTER HERO CONTENT WITH SMOOTH STAGE TRANSITION ANIMATION */}
        <div className="relative z-10 flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 lg:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Stage Editorial Copy */}
          <div
            key={currentStage.id}
            className="lg:col-span-7 xl:col-span-7 text-left max-w-2xl animate-in fade-in duration-700"
          >
            {/* Eyebrow */}
            <div className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3.5 flex items-center gap-2 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776]" />
              <span>{currentStage.eyebrow}</span>
            </div>

            {/* Main Luxury Heading */}
            <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-normal leading-[1.05] text-white mb-4 sm:mb-5 tracking-tight drop-shadow-md">
              {currentStage.titleMain}<br />
              <span className="italic font-serif-luxury text-[#dfb776]">
                {currentStage.titleItalic}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-200 font-light leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow">
              {currentStage.subtitle}
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4">
              {onExploreProjects && (
                <button
                  onClick={onExploreProjects}
                  className="bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs tracking-[0.18em] uppercase px-6 sm:px-8 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer shadow-xl flex items-center gap-2.5 group"
                >
                  <span>EXPLORE PROJECTS</span>
                  <ArrowRight className="w-4 h-4 text-[#0b0c0e] group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              {onNavigateOurStory && (
                <button
                  onClick={onNavigateOurStory}
                  className="border border-white/25 hover:border-[#dfb776] text-white hover:text-[#dfb776] bg-black/50 backdrop-blur-sm text-xs tracking-[0.18em] uppercase px-5 sm:px-6 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2"
                >
                  <span>OUR STORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#dfb776]" />
                </button>
              )}

              {onBookTour && (
                <button
                  onClick={onBookTour}
                  className="hidden sm:flex border border-white/15 hover:border-white/40 text-gray-300 hover:text-white bg-black/30 backdrop-blur-sm text-xs tracking-[0.18em] uppercase px-4 sm:px-5 py-3.5 sm:py-4 rounded-sm transition-all duration-200 cursor-pointer items-center gap-1.5"
                >
                  <span>BOOK TOUR</span>
                  <span className="text-[11px]">↗</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Stage 3D Specification HUD Card */}
          <div className="lg:col-span-5 xl:col-span-5 flex justify-end">
            <div
              key={`hud-${currentStage.id}`}
              className="w-full max-w-md bg-[#121418]/90 border border-white/10 backdrop-blur-xl p-5 sm:p-6 rounded-sm text-left shadow-2xl transition-all animate-in fade-in duration-500"
            >
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3 sm:mb-4">
                <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400">
                  UNIFRA LIFESTYLE HUD
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase border px-2 py-0.5 rounded-sm text-[#dfb776] border-[#dfb776]/40 bg-[#dfb776]/10 font-semibold">
                  STAGE {currentStage.stageNumber} / 04
                </span>
              </div>

              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-2">
                {currentStage.badgeText}
              </h3>

              <div className="space-y-2 text-xs font-mono pb-3 border-b border-white/10 mb-4">
                {currentStage.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="flex justify-between items-center">
                    <span className="text-[10px] text-gray-400 uppercase">{spec.label}</span>
                    <span className="text-[11px] font-semibold text-white">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#dfb776]" />
                  <span>24/7 GATED PRIVACY</span>
                </div>
                <span className="text-[9px] font-mono text-[#dfb776]">
                  UNIFRA BRAND VISION
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM STRIP: SCROLL WORLD PROGRESS TIMELINE & HUD CONTROLS */}
        <div className="relative z-20 w-full bg-black/75 backdrop-blur-md border-t border-white/10 py-3 sm:py-4 shrink-0 mt-auto">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            {/* Scroll Indicator & Progress Bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-[10px] text-[#dfb776] tracking-[0.2em] uppercase font-semibold">
                <Compass className="w-4 h-4 animate-spin text-[#dfb776] [animation-duration:8s]" />
                <span>SCROLL 3D WORLD ({progressPercent}%)</span>
              </div>

              {/* Visual Progress Track */}
              <div className="flex-1 sm:w-48 bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#dfb776] h-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Middle: Stage Selection Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {WORLD_STAGES.map((st, idx) => {
                const isActive = activeStageIndex === idx;
                return (
                  <button
                    key={st.id}
                    onClick={() => handleStageClick(idx)}
                    className={`px-3 py-1 rounded-xs text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap border ${
                      isActive
                        ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776]'
                        : 'bg-black/40 text-gray-400 hover:text-white border-white/10'
                    }`}
                  >
                    {st.stageNumber}. {st.badgeText}
                  </button>
                );
              })}
            </div>

            {/* Right: Down Prompt */}
            <div className="hidden lg:flex items-center gap-2 text-[10px] text-gray-400 tracking-widest uppercase">
              <span>CONTINUE SCROLLING DOWN</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#dfb776] animate-bounce" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
