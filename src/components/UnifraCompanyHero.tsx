import React, { useState, useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

interface UnifraCompanyHeroProps {
  theme?: 'light' | 'dark';
  onExploreProjects?: () => void;
  onNavigateOurStory?: () => void;
  onBookTour?: () => void;
}

interface HeroStage {
  id: string;
  label: string;
  headline: string[];
  sub: string;
}

const STAGES: HeroStage[] = [
  {
    id: 's1',
    label: 'CHENNAI — EAST COAST ROAD',
    headline: ['You deserve a home', 'worth coming back to.'],
    sub: 'Not just a house — a feeling. An address that says everything before you even open the door. Welcome to Unifra.'
  },
  {
    id: 's2',
    label: 'GATED VILLA COMMUNITIES',
    headline: ['Where the city ends,', 'your story begins.'],
    sub: 'Step through private gates into a world built entirely for you. Lush avenues. Absolute quiet. A life you\'ve always imagined.'
  },
  {
    id: 's3',
    label: 'LUXURY INDEPENDENT VILLAS',
    headline: ['Spaces that feel like', 'a deep breath.'],
    sub: 'Soaring 22-foot ceilings. Morning light that fills every room. A home so thoughtfully designed, it feels like it was made just for your family.'
  },
  {
    id: 's4',
    label: 'YOUR LEGACY STARTS HERE',
    headline: ['Build something that', 'outlasts everything.'],
    sub: 'A private pool. A garden at sunrise. A home your children will fight to inherit. This is what you\'ve been working towards — own it.'
  }
];

export const UnifraCompanyHero: React.FC<UnifraCompanyHeroProps> = ({
  onExploreProjects,
  onNavigateOurStory,
  onBookTour
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;

      const raw = -rect.top / total;
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);

      const idx = Math.min(STAGES.length - 1, Math.floor(clamped * STAGES.length));
      if (idx !== activeIdx) {
        setPrevIdx(activeIdx);
        setTransitioning(true);
        setActiveIdx(idx);
        setTimeout(() => setTransitioning(false), 600);
      }
      // Video plays freely — no currentTime scrubbing
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIdx]);

  const stage = STAGES[activeIdx];
  const pct = Math.round(scrollProgress * 100);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[300vh] bg-black"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">

        {/* ── VIDEO BACKGROUND ── */}
        <video
          ref={videoRef}
          src="/videos/scrollvideo.mp4"
          muted
          playsInline
          autoPlay
          loop
          preload="auto"
          onCanPlay={(e) => { (e.target as HTMLVideoElement).playbackRate = 0.8; }}
          className="absolute inset-0 w-full h-full object-cover scale-[1.04]"
        />

        {/* ── DARK OVERLAYS ── */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

        {/* ── TOP BRAND STRIP ── */}
        <div className="absolute top-16 sm:top-20 left-0 right-0 z-30 flex items-center justify-between px-8 sm:px-12 lg:px-16 py-3">
          {/* Stage label pill */}
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776] animate-pulse" />
            <span
              key={stage.id + '-label'}
              className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.3em] text-[#dfb776] font-semibold transition-all duration-500"
            >
              {stage.label}
            </span>
          </div>

          {/* Stage dots */}
          <div className="flex items-center gap-2">
            {STAGES.map((s, i) => (
              <span
                key={s.id}
                className={`block rounded-full transition-all duration-500 ${i === activeIdx
                    ? 'w-6 h-1.5 bg-[#dfb776]'
                    : 'w-1.5 h-1.5 bg-white/30'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ── CENTERED HERO TEXT ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-6 sm:px-12 text-center">

          {/* Headline — cross-fades on stage change */}
          <div
            key={stage.id}
            className={`transition-all duration-700 ease-out ${transitioning ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'
              }`}
          >
            <p className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-white/50 mb-6 sm:mb-8">
              {String(activeIdx + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
            </p>

            <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl lg:text-[96px] xl:text-[112px] font-normal text-white leading-[1.0] tracking-tight mb-6 sm:mb-8">
              {stage.headline[0]}
              <br />
              <em className="not-italic text-[#dfb776]">{stage.headline[1]}</em>
            </h1>

            <p className="text-sm sm:text-base text-white/60 font-light max-w-md sm:max-w-xl mx-auto leading-relaxed mb-10 sm:mb-12">
              {stage.sub}
            </p>

            {/* CTAs — only shown on first stage or always */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {onExploreProjects && (
                <button
                  onClick={onExploreProjects}
                  className="bg-[#dfb776] hover:bg-[#c9a76a] text-black font-semibold text-[11px] tracking-[0.22em] uppercase px-8 py-4 transition-all duration-200 cursor-pointer group flex items-center gap-3"
                >
                  <span>EXPLORE PROJECTS</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              )}
              {onNavigateOurStory && (
                <button
                  onClick={onNavigateOurStory}
                  className="border border-white/25 hover:border-white/60 text-white/80 hover:text-white text-[11px] tracking-[0.22em] uppercase px-8 py-4 transition-all duration-200 cursor-pointer backdrop-blur-sm bg-white/5"
                >
                  OUR STORY
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── BOTTOM SECTION FADE — smooth blend into next section ── */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0b0c0e] via-[#0b0c0e]/70 to-transparent pointer-events-none z-10" />

        {/* ── BOTTOM PROGRESS + SCROLL CUE ── */}
        <div className="absolute bottom-0 left-0 right-0 z-30">
          {/* Thin gold progress line */}
          <div className="w-full h-[2px] bg-white/10">
            <div
              className="h-full bg-[#dfb776] transition-all duration-300 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="flex items-end justify-between px-8 sm:px-12 lg:px-16 py-5">
            {/* Left: scroll % */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
                Scroll Progress
              </span>
              <span className="text-[11px] font-mono text-[#dfb776] font-semibold tabular-nums">
                {pct}%
              </span>
            </div>

            {/* Center: scroll cue (only at 0%) */}
            {pct < 5 && (
              <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex flex-col items-center gap-1.5 animate-bounce">
                <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/40">Scroll</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#dfb776]" />
              </div>
            )}

            {/* Right: location stamp */}
            <div className="text-right">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.25em]">
                Chennai, India — ECR & OMR
              </span>
            </div>
          </div>
        </div>

        {/* ── LEFT VERTICAL LABEL ── */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-4">
          <div
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            className="text-[9px] font-mono uppercase tracking-[0.35em] text-white/25"
          >
            Unifra Properties — Luxury Villas
          </div>
          <div className="w-px bg-white/15 flex-1 min-h-[60px]" />
        </div>

        {/* ── RIGHT VERTICAL COUNTER ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3">
          <span
            key={activeIdx}
            className="text-3xl font-serif-luxury text-[#dfb776] font-bold tabular-nums drop-shadow-lg"
          >
            {String(activeIdx + 1).padStart(2, '0')}
          </span>
          <div className="w-px h-16 bg-[#dfb776]/30" />
          <span className="text-3xl font-serif-luxury text-white/40 font-bold tabular-nums">
            {String(STAGES.length).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  );
};
