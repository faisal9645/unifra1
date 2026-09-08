import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, Sparkles, ShieldCheck, Sun, Moon } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';

export type AppPage = 'home' | 'about-story' | 'about-team' | 'projects' | 'mysa-detail' | 'contact' | 'blog' | 'ventures' | 'careers' | 'admin';

interface NavbarProps {
  currentPage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
  onOpenVillaAccess?: (source?: string) => void;
  isVillaUnlocked?: boolean;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenContact,
  onOpenVillaAccess,
  isVillaUnlocked = false,
  theme,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  // Refs for tracking outside clicks and grace period timeouts
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsTimerRef = useRef<NodeJS.Timeout | null>(null);
  const aboutTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen for outside clicks/touches to close dropdowns reliably on touch devices & desktop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (projectsRef.current && !projectsRef.current.contains(target)) {
        setProjectsDropdownOpen(false);
      }
      if (aboutRef.current && !aboutRef.current.contains(target)) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      if (projectsTimerRef.current) clearTimeout(projectsTimerRef.current);
      if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    };
  }, []);

  const handleProjectsMouseEnter = () => {
    if (projectsTimerRef.current) {
      clearTimeout(projectsTimerRef.current);
      projectsTimerRef.current = null;
    }
    setProjectsDropdownOpen(true);
  };

  const handleProjectsMouseLeave = () => {
    if (projectsTimerRef.current) clearTimeout(projectsTimerRef.current);
    // 350ms grace timeout prevents sudden disappearing when moving down across boundaries
    projectsTimerRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 350);
  };

  const handleProjectsToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (projectsTimerRef.current) {
      clearTimeout(projectsTimerRef.current);
      projectsTimerRef.current = null;
    }
    setProjectsDropdownOpen(prev => !prev);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current);
      aboutTimerRef.current = null;
    }
    setAboutDropdownOpen(true);
  };

  const handleAboutMouseLeave = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    aboutTimerRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 350);
  };

  const handleAboutToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (aboutTimerRef.current) {
      clearTimeout(aboutTimerRef.current);
      aboutTimerRef.current = null;
    }
    setAboutDropdownOpen(prev => !prev);
  };

  const handleNavClick = (page: AppPage) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setProjectsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = theme === 'light';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isLight
            ? 'bg-white/95 backdrop-blur-md border-b border-black/10 py-3 shadow-md'
            : 'bg-[#0b0c0e]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : isLight
            ? 'bg-gradient-to-b from-white/95 via-white/70 to-transparent backdrop-blur-[2px] py-4 sm:py-5'
            : 'bg-gradient-to-b from-[#0b0c0e]/90 via-[#0b0c0e]/60 to-transparent backdrop-blur-[2px] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo matching screenshot 7 & 6 combination: Gold "U" monogram + "UNIFRA" */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            {/* Monogram U Badge */}
            <div className="w-9 h-9 sm:w-10 sm:h-10 border border-[#dfb776] bg-[#dfb776]/10 flex items-center justify-center text-[#dfb776] group-hover:bg-[#dfb776] group-hover:text-[#0b0c0e] transition-all duration-300">
              <span className="font-serif-luxury text-xl sm:text-2xl font-bold leading-none">U</span>
            </div>

            <div className="flex flex-col">
              <span className={`font-serif-luxury text-xl sm:text-2xl font-bold tracking-[0.22em] uppercase group-hover:text-[#dfb776] transition-colors leading-none ${
                isLight ? 'text-[#121418]' : 'text-white'
              }`}>
                UNIFRA
              </span>
              <span className="text-[6.5px] sm:text-[7.5px] font-mono tracking-[0.32em] text-[#dfb776] uppercase mt-1">
                LEGACY OF LUXURY LIVING
              </span>
            </div>
          </button>

          {/* Desktop Nav Links (Clean header navigation: PROJECTS, ABOUT US, LIFESTYLE, CONTACT) */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* PROJECTS */}
            <div
              ref={projectsRef}
              className="relative"
              onMouseEnter={handleProjectsMouseEnter}
              onMouseLeave={handleProjectsMouseLeave}
            >
              <button
                type="button"
                onClick={handleProjectsToggle}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors py-2 cursor-pointer select-none ${
                  currentPage === 'projects' || currentPage === 'mysa-detail'
                    ? isLight ? 'text-black font-bold' : 'text-white font-semibold'
                    : isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
                }`}
                aria-expanded={projectsDropdownOpen}
                aria-haspopup="true"
              >
                <span>PROJECTS</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  projectsDropdownOpen
                    ? isLight ? 'rotate-180 text-[#9b6f1e]' : 'rotate-180 text-[#dfb776]'
                    : isLight ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </button>

              {/* Dropdown Container */}
              {projectsDropdownOpen && (
                <div
                  className="absolute top-full -left-3 w-80 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={handleProjectsMouseEnter}
                  onMouseLeave={handleProjectsMouseLeave}
                >
                  <div className={`backdrop-blur-2xl border shadow-2xl rounded-sm overflow-hidden py-1 ${
                    isLight ? 'bg-white/98 border-black/15 text-gray-900' : 'bg-[#121418]/98 border-white/15 text-white'
                  }`}>
                    {/* ALL PROJECTS item */}
                    <button
                      type="button"
                      onClick={() => handleNavClick('projects')}
                      className={`w-full text-left px-4 py-3 text-xs tracking-wider transition-colors flex items-center justify-between border-b group cursor-pointer ${
                        isLight
                          ? 'text-gray-900 border-black/10 hover:bg-black/5 hover:text-[#9b6f1e]'
                          : 'text-white border-white/10 hover:bg-white/5 hover:text-[#dfb776]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold tracking-[0.18em] uppercase">ALL PROJECTS</span>
                        <p className={`text-[10px] font-light mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Explore our portfolio across Chennai</p>
                      </div>
                      <span className={`text-xs group-hover:translate-x-1 transition-transform ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>→</span>
                    </button>

                    {/* All residences below ALL PROJECTS */}
                    <div className={`py-1 divide-y ${isLight ? 'divide-black/5' : 'divide-white/5'}`}>
                      {SIGNATURE_PROJECTS.map((proj) => {
                        const isMysa = proj.id === 'mysa-villas';
                        return (
                          <button
                            key={proj.id}
                            type="button"
                            onClick={() => {
                              if (isMysa && !isVillaUnlocked && onOpenVillaAccess) {
                                setProjectsDropdownOpen(false);
                                onOpenVillaAccess('Navbar Dropdown - Mysa Villas');
                              } else {
                                handleNavClick(isMysa ? 'mysa-detail' : 'projects');
                              }
                            }}
                            className={`w-full text-left px-4 py-3 text-xs tracking-wider transition-all flex items-center justify-between group cursor-pointer ${
                              isLight
                                ? 'text-gray-700 hover:bg-amber-500/10 hover:text-black'
                                : 'text-gray-300 hover:bg-[#dfb776]/10 hover:text-white'
                            }`}
                          >
                            <div className="flex flex-col pr-2">
                              <div className="flex items-center gap-1.5">
                                {isMysa && <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />}
                                <span className={`font-semibold transition-colors ${
                                  isMysa
                                    ? isLight ? 'text-gray-900 group-hover:text-[#9b6f1e]' : 'text-white group-hover:text-[#dfb776]'
                                    : isLight ? 'text-gray-800 group-hover:text-[#9b6f1e]' : 'text-gray-200 group-hover:text-[#dfb776]'
                                }`}>
                                  {proj.name.toUpperCase()}
                                </span>
                              </div>
                              <span className={`text-[10px] mt-0.5 font-light ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                {proj.location} • {proj.specs.bedrooms}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className={`text-[9px] px-2 py-0.5 font-mono tracking-wider uppercase rounded-xs shrink-0 ${
                                proj.status === 'Under Construction'
                                  ? isLight ? 'bg-amber-500/20 border border-amber-600/30 text-amber-900 font-semibold' : 'bg-[#dfb776]/15 border border-[#dfb776]/30 text-[#dfb776]'
                                  : proj.status === 'Upcoming'
                                  ? 'bg-amber-500/15 border border-amber-500/30 text-amber-500'
                                  : 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-500'
                              }`}>
                                {proj.statusBadge || (proj.status === 'Under Construction' ? 'ACTIVE' : proj.status === 'Upcoming' ? 'UPCOMING' : 'COMPLETED')}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Footer bar */}
                    <div className={`px-4 py-2 flex items-center justify-between text-[9px] font-mono border-t ${
                      isLight ? 'bg-gray-100 border-black/10 text-gray-600' : 'bg-black/40 border-white/5 text-gray-400'
                    }`}>
                      <span>4 RESIDENCES IN CHENNAI</span>
                      <span className={isLight ? 'text-[#9b6f1e] font-semibold' : 'text-[#dfb776]'}>SELECT TO VIEW</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ABOUT US */}
            <div
              ref={aboutRef}
              className="relative"
              onMouseEnter={handleAboutMouseEnter}
              onMouseLeave={handleAboutMouseLeave}
            >
              <button
                type="button"
                onClick={handleAboutToggle}
                className={`flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors py-2 cursor-pointer select-none ${
                  currentPage === 'about-story' || currentPage === 'about-team'
                    ? isLight ? 'text-black font-bold' : 'text-white font-semibold'
                    : isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
                }`}
                aria-expanded={aboutDropdownOpen}
                aria-haspopup="true"
              >
                <span>ABOUT US</span>
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${
                  aboutDropdownOpen
                    ? isLight ? 'rotate-180 text-[#9b6f1e]' : 'rotate-180 text-[#dfb776]'
                    : isLight ? 'text-gray-500' : 'text-gray-400'
                }`} />
              </button>

              {aboutDropdownOpen && (
                <div
                  className="absolute top-full left-0 w-60 pt-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                  onMouseEnter={handleAboutMouseEnter}
                  onMouseLeave={handleAboutMouseLeave}
                >
                  <div className={`backdrop-blur-2xl border shadow-2xl rounded-sm overflow-hidden py-1 ${
                    isLight ? 'bg-white/98 border-black/15 text-gray-900' : 'bg-[#121418]/98 border-white/15 text-white'
                  }`}>
                    <button
                      type="button"
                      onClick={() => handleNavClick('about-story')}
                      className={`w-full text-left px-4 py-3 text-xs tracking-wider transition-colors flex items-center justify-between group cursor-pointer ${
                        isLight ? 'text-gray-700 hover:bg-black/5 hover:text-[#9b6f1e]' : 'text-gray-300 hover:bg-white/5 hover:text-[#dfb776]'
                      }`}
                    >
                      <div>
                        <span className={`font-semibold transition-colors ${isLight ? 'text-gray-900 group-hover:text-[#9b6f1e]' : 'text-white group-hover:text-[#dfb776]'}`}>OUR STORY</span>
                        <p className={`text-[10px] font-light mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Philosophy & founder vision</p>
                      </div>
                      <span className={`text-xs group-hover:translate-x-1 transition-transform ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>→</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleNavClick('about-team')}
                      className={`w-full text-left px-4 py-3 text-xs tracking-wider transition-colors flex items-center justify-between border-t group cursor-pointer ${
                        isLight
                          ? 'text-gray-700 border-black/10 hover:bg-black/5 hover:text-[#9b6f1e]'
                          : 'text-gray-300 border-white/5 hover:bg-white/5 hover:text-[#dfb776]'
                      }`}
                    >
                      <div>
                        <span className={`font-semibold transition-colors ${isLight ? 'text-gray-900 group-hover:text-[#9b6f1e]' : 'text-white group-hover:text-[#dfb776]'}`}>OUR TEAM</span>
                        <p className={`text-[10px] font-light mt-0.5 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Leadership & master builders</p>
                      </div>
                      <span className={`text-xs group-hover:translate-x-1 transition-transform ${isLight ? 'text-[#9b6f1e]' : 'text-[#dfb776]'}`}>→</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* LIFESTYLE */}
            <button
              onClick={() => handleNavClick('blog')}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1.5 cursor-pointer relative ${
                currentPage === 'blog'
                  ? isLight
                    ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9b6f1e]'
                    : 'text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#dfb776]'
                  : isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
              }`}
            >
              LIFESTYLE
            </button>

            {/* CONTACT */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors py-1.5 cursor-pointer relative ${
                currentPage === 'contact'
                  ? isLight
                    ? 'text-black font-bold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#9b6f1e]'
                    : 'text-white font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#dfb776]'
                  : isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
              }`}
            >
              CONTACT
            </button>
          </nav>

          {/* Right Action side: Day/Night Mode Toggle + Phone + BOOK A PRIVATE TOUR button + ADMIN CRM */}
          <div className="hidden sm:flex items-center gap-3.5">
            {/* Day and Night Mode Switcher Button */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none font-sans ${
                isLight
                  ? 'bg-amber-50/90 hover:bg-amber-100/90 text-amber-950 border-amber-300/80 shadow-xs'
                  : 'bg-white/[0.08] hover:bg-white/15 text-amber-200 border-white/20 shadow-inner'
              }`}
              title={isLight ? 'Switch to Night Mode (Dark)' : 'Switch to Day Mode (Light)'}
              aria-label="Toggle Day and Night Mode"
            >
              <div className={`flex items-center justify-center w-4 h-4 rounded-full transition-all duration-300 ${
                isLight
                  ? 'text-amber-700'
                  : 'text-amber-300'
              }`}>
                {isLight ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                {isLight ? 'DAY MODE' : 'NIGHT MODE'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`inline-flex items-center gap-2 text-[11px] font-mono tracking-wider px-3 py-1.5 rounded-xs border transition-all uppercase cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-[#dfb776]/20 text-[#dfb776] border-[#dfb776] font-medium shadow-[0_0_15px_rgba(223,183,118,0.25)] ring-1 ring-[#dfb776]/50'
                  : isLight
                    ? 'border-black/15 text-gray-700 hover:text-black hover:border-[#dfb776] bg-black/[0.03]'
                    : 'border-white/15 text-gray-300 hover:text-white hover:border-[#dfb776]/60 bg-white/[0.03]'
              }`}
              title="Executive Admin CRM (/admin)"
            >
              <ShieldCheck className={`w-3.5 h-3.5 transition-colors ${
                currentPage === 'admin' ? 'text-[#dfb776]' : isLight ? 'text-gray-500' : 'text-gray-400'
              }`} />
              <span className="font-semibold tracking-wider">CRM</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-xs transition-colors ${
                currentPage === 'admin'
                  ? 'bg-[#dfb776]/25 text-[#dfb776] border border-[#dfb776]/40 font-semibold'
                  : isLight
                    ? 'bg-black/5 text-gray-600 border border-black/10'
                    : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
                /admin
              </span>
              {currentPage === 'admin' && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776] shadow-[0_0_6px_#dfb776] animate-pulse" />
              )}
            </button>

            <a
              href="tel:+917358222445"
              className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#dfb776]" />
              <span>+91 73582 22445</span>
            </a>

            <button
              onClick={onOpenContact}
              className="border border-[#dfb776] hover:border-[#dfb776] bg-[#dfb776] hover:bg-[#c59b4c] text-[#0b0c0e] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-sm transition-all duration-200 cursor-pointer shadow-sm flex items-center gap-1.5"
            >
              <span>BOOK A PRIVATE TOUR</span>
              <span className="text-[12px]">↗</span>
            </button>
          </div>

          {/* Mobile Actions: Day/Night Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isLight
                  ? 'bg-black/5 text-gray-800 border-black/15'
                  : 'bg-white/5 text-gray-200 border-white/15'
              }`}
              title={isLight ? 'Switch to Night Mode' : 'Switch to Day Mode'}
              aria-label="Toggle Day and Night Mode"
            >
              {isLight ? <Moon className="w-4 h-4 text-[#9b6f1e]" /> : <Sun className="w-4 h-4 text-[#dfb776]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded transition-colors focus:outline-none ${
                isLight ? 'text-gray-800 hover:bg-black/5' : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-6 py-6 shadow-2xl max-h-[85vh] overflow-y-auto ${
          isLight ? 'bg-white border-black/10 text-gray-900' : 'bg-[#0e1014] border-white/10 text-white'
        }`}>
          <div className="flex flex-col gap-3">
            {/* Day / Night Toggle inside Mobile Drawer */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`w-full py-2.5 px-3 rounded-xs border text-xs font-mono uppercase tracking-widest flex items-center justify-between cursor-pointer transition-colors ${
                isLight
                  ? 'bg-black/5 text-gray-800 border-black/15'
                  : 'bg-white/5 text-gray-200 border-white/10'
              }`}
            >
              <div className="flex items-center gap-2">
                {isLight ? <Moon className="w-4 h-4 text-[#9b6f1e]" /> : <Sun className="w-4 h-4 text-[#dfb776]" />}
                <span>{isLight ? 'SWITCH TO NIGHT MODE' : 'SWITCH TO DAY MODE'}</span>
              </div>
              <span className="text-[10px] font-semibold text-[#dfb776]">
                {isLight ? 'CURRENT: DAY' : 'CURRENT: NIGHT'}
              </span>
            </button>

            {/* Mobile PROJECTS Expandable Accordion */}
            <div className={`border-b pb-2 ${isLight ? 'border-black/5' : 'border-white/5'}`}>
              <button
                type="button"
                onClick={() => setMobileProjectsOpen(prev => !prev)}
                className={`w-full flex items-center justify-between py-2 text-xs uppercase tracking-widest hover:text-[#dfb776] ${
                  isLight ? 'text-gray-800' : 'text-gray-200'
                }`}
              >
                <span className={currentPage === 'projects' || currentPage === 'mysa-detail' ? 'text-[#dfb776] font-semibold' : ''}>
                  PROJECTS
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${mobileProjectsOpen ? 'rotate-180 text-[#dfb776]' : ''}`} />
              </button>

              {mobileProjectsOpen && (
                <div className={`mt-2 pl-3 space-y-1 border-l border-[#dfb776]/30 py-1 rounded-xs ${
                  isLight ? 'bg-black/[0.02]' : 'bg-white/[0.02]'
                }`}>
                  <button
                    onClick={() => handleNavClick('projects')}
                    className={`w-full text-left py-2 px-2 text-xs hover:text-[#dfb776] flex items-center justify-between ${
                      isLight ? 'text-[#121418]' : 'text-white'
                    }`}
                  >
                    <span className="font-semibold uppercase tracking-wider">ALL PROJECTS</span>
                    <span className="text-xs text-[#dfb776]">→</span>
                  </button>

                  {SIGNATURE_PROJECTS.map((proj) => {
                    const isMysa = proj.id === 'mysa-villas';
                    return (
                      <button
                        key={proj.id}
                        onClick={() => {
                          handleNavClick(isMysa ? 'mysa-detail' : 'projects');
                        }}
                        className={`w-full text-left py-2 px-2 text-xs flex items-center justify-between border-t ${
                          isLight
                            ? 'border-black/5 text-gray-700 hover:text-black'
                            : 'border-white/5 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={isMysa ? 'font-semibold text-[#dfb776]' : ''}>
                            {proj.name.toUpperCase()}
                          </span>
                          <span className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                            {proj.location} • {proj.specs.bedrooms}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] px-1.5 py-0.5 font-mono rounded-xs ${
                            proj.status === 'Under Construction'
                              ? 'bg-[#dfb776]/20 text-[#dfb776]'
                              : proj.status === 'Upcoming'
                              ? 'bg-amber-500/20 text-amber-600'
                              : 'bg-emerald-500/20 text-emerald-600'
                          }`}>
                            {proj.statusBadge || (proj.status === 'Under Construction' ? 'ACTIVE' : proj.status === 'Upcoming' ? 'UPCOMING' : 'COMPLETED')}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('about-story')}
              className={`text-left py-2.5 text-xs uppercase tracking-widest hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/5 text-gray-800' : 'border-white/5 text-gray-200'
              }`}
            >
              ABOUT US (OUR STORY)
            </button>

            <button
              onClick={() => handleNavClick('about-team')}
              className={`text-left py-2.5 text-xs uppercase tracking-widest hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/5 text-gray-800' : 'border-white/5 text-gray-200'
              }`}
            >
              OUR TEAM
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`text-left py-2.5 text-xs uppercase tracking-widest hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/5 text-gray-800' : 'border-white/5 text-gray-200'
              }`}
            >
              LIFESTYLE & BLOG
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2.5 text-xs uppercase tracking-widest hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/5 text-gray-800' : 'border-white/5 text-gray-200'
              }`}
            >
              CONTACT
            </button>

            {/* Mobile Admin Portal Link */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('admin');
              }}
              className={`text-left py-2.5 px-3 text-xs uppercase tracking-widest rounded-xs flex items-center justify-between font-mono transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-[#dfb776]/20 text-[#dfb776] border border-[#dfb776] font-semibold shadow-md ring-1 ring-[#dfb776]/40'
                  : 'text-[#dfb776] hover:text-white bg-[#dfb776]/10 border border-[#dfb776]/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>ADMIN LEADS CRM (/admin)</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#dfb776]">
                {currentPage === 'admin' ? '● ACTIVE' : '→'}
              </span>
            </button>

            <div className="pt-2 flex flex-col gap-3">
              <a
                href="tel:+917358222445"
                className={`flex items-center justify-center gap-2 text-xs font-mono py-2 border ${
                  isLight ? 'border-black/10 text-gray-800' : 'border-white/10 text-gray-300'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#dfb776]" />
                <span>+91 73582 22445</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full py-3 bg-[#dfb776] hover:bg-[#c59b4c] text-[#0b0c0e] text-xs font-semibold tracking-widest uppercase text-center transition-colors"
              >
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
