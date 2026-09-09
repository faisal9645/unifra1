import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, Sparkles, ShieldCheck } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';

export type AppPage = 'home' | 'about-story' | 'about-team' | 'projects' | 'mysa-detail' | 'contact' | 'blog' | 'ventures' | 'careers' | 'admin';

interface NavbarProps {
  currentPage: AppPage;
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
  onOpenVillaAccess?: (source?: string) => void;
  isVillaUnlocked?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenContact,
  onOpenVillaAccess,
  isVillaUnlocked = false
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
      let scrolled = false;
      if (currentPage === 'home') {
        // On home page, header shrinks ONLY AFTER scroll-world 3D animation is completed (past 1.85x window height)
        const scrollWorldHeight = window.innerHeight * 1.85;
        scrolled = window.scrollY > scrollWorldHeight;
      } else {
        scrolled = window.scrollY > 40;
      }
      setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

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

  const isLight = false;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'bg-[#0b0c0e]/95 backdrop-blur-xl border-b border-[#dfb776]/30 py-2.5 sm:py-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)]'
          : 'bg-transparent py-4 sm:py-5.5'
      }`}
    >
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between">
          {/* Logo matching screenshot 7 & 6 combination: Gold "U" monogram + "UNIFRA" */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none"
          >
            {/* Monogram U Badge */}
            <div
              className={`border border-[#dfb776] bg-[#dfb776]/10 flex items-center justify-center text-[#dfb776] group-hover:bg-[#dfb776] group-hover:text-[#0b0c0e] transition-all duration-300 rounded-xs ${
                isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
              }`}
            >
              <span
                className={`font-serif-luxury font-bold leading-none transition-all duration-300 ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}
              >
                U
              </span>
            </div>

            <div className="flex flex-col">
              <span
                className={`font-serif-luxury font-bold tracking-[0.22em] uppercase group-hover:text-[#dfb776] transition-all duration-300 leading-none text-white ${
                  isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                }`}
              >
                UNIFRA
              </span>
              <span
                className={`font-mono tracking-[0.32em] text-[#dfb776] uppercase transition-all duration-300 overflow-hidden ${
                  isScrolled
                    ? 'max-h-0 opacity-0 mt-0 text-[0px]'
                    : 'max-h-4 opacity-100 mt-1 text-[6.5px] sm:text-[7.5px]'
                }`}
              >
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

          {/* Right Action side: Phone + BOOK A PRIVATE TOUR button + ADMIN CRM */}
          <div className="hidden sm:flex items-center gap-3.5">

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
              className={`border border-[#dfb776] hover:border-[#dfb776] bg-[#dfb776] hover:bg-[#c59b4c] text-[#0b0c0e] font-semibold tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5 ${
                isScrolled ? 'px-3 py-1.5 text-[10px]' : 'px-4 py-2 text-[10px] sm:text-[11px]'
              }`}
            >
              <span>BOOK A PRIVATE TOUR</span>
              <span className="text-[12px]">↗</span>
            </button>
          </div>

          {/* Mobile Actions: Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
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

      {/* Mobile Full-Height Drawer Overlay with Smooth Animation */}
      <div
        className={`fixed inset-0 z-[100] mobile-menu-overlay lg:hidden flex flex-col justify-between transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        } ${
          isLight ? 'bg-white text-gray-900' : 'bg-[#0b0c0e] text-white'
        }`}
      >
        {/* Top Header inside Mobile Menu Drawer */}
        <div className={`px-4 sm:px-8 py-4 sm:py-5 border-b flex items-center justify-between shrink-0 ${
          isLight ? 'border-black/10' : 'border-white/10'
        }`}>
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 border border-[#dfb776] bg-[#dfb776]/10 flex items-center justify-center text-[#dfb776]">
              <span className="font-serif-luxury text-xl font-bold leading-none">U</span>
            </div>
            <div className="flex flex-col">
              <span className={`font-serif-luxury text-lg font-bold tracking-[0.22em] uppercase ${
                isLight ? 'text-[#121418]' : 'text-white'
              }`}>
                UNIFRA
              </span>
              <span className="text-[6.5px] font-mono tracking-[0.32em] text-[#dfb776] uppercase">
                LEGACY OF LUXURY LIVING
              </span>
            </div>
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isLight ? 'border-black/15 text-gray-800 hover:bg-black/5' : 'border-white/15 text-white hover:bg-white/10'
            }`}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Full-Height Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3 sm:gap-4">

            {/* Mobile PROJECTS Expandable Accordion */}
            <div className={`border-b pb-3 ${isLight ? 'border-black/10' : 'border-white/10'}`}>
              <button
                type="button"
                onClick={() => setMobileProjectsOpen(prev => !prev)}
                className={`w-full flex items-center justify-between py-2.5 text-sm uppercase tracking-widest font-semibold hover:text-[#dfb776] ${
                  isLight ? 'text-gray-900' : 'text-white'
                }`}
              >
                <span className={currentPage === 'projects' || currentPage === 'mysa-detail' ? 'text-[#dfb776]' : ''}>
                  PROJECTS
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${mobileProjectsOpen ? 'rotate-180 text-[#dfb776]' : ''}`} />
              </button>

              {mobileProjectsOpen && (
                <div className={`mt-2 pl-3 space-y-2 border-l-2 border-[#dfb776] py-2 rounded-xs ${
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
                        className={`w-full text-left py-2.5 px-2 text-xs flex items-center justify-between border-t ${
                          isLight
                            ? 'border-black/5 text-gray-700 hover:text-black'
                            : 'border-white/5 text-gray-300 hover:text-white'
                        }`}
                      >
                        <div className="flex flex-col">
                          <span className={isMysa ? 'font-semibold text-[#dfb776]' : 'font-medium'}>
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
              className={`text-left py-3 text-sm uppercase tracking-widest font-semibold hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/10 text-gray-900' : 'border-white/10 text-white'
              }`}
            >
              ABOUT US (OUR STORY)
            </button>

            <button
              onClick={() => handleNavClick('about-team')}
              className={`text-left py-3 text-sm uppercase tracking-widest font-semibold hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/10 text-gray-900' : 'border-white/10 text-white'
              }`}
            >
              OUR TEAM
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`text-left py-3 text-sm uppercase tracking-widest font-semibold hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/10 text-gray-900' : 'border-white/10 text-white'
              }`}
            >
              LIFESTYLE & BLOG
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-3 text-sm uppercase tracking-widest font-semibold hover:text-[#dfb776] border-b ${
                isLight ? 'border-black/10 text-gray-900' : 'border-white/10 text-white'
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
              className={`text-left py-3 px-4 text-xs uppercase tracking-widest rounded-sm flex items-center justify-between font-mono transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'bg-[#dfb776]/20 text-[#dfb776] border border-[#dfb776] font-semibold shadow-md'
                  : 'text-[#dfb776] hover:text-white bg-[#dfb776]/10 border border-[#dfb776]/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#dfb776]" />
                <span>ADMIN LEADS CRM (/admin)</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#dfb776]">
                {currentPage === 'admin' ? '● ACTIVE' : '→'}
              </span>
            </button>
          </div>

          {/* Bottom Actions */}
          <div className="pt-4 flex flex-col gap-3 shrink-0">
            <a
              href="tel:+917358222445"
              className={`flex items-center justify-center gap-2 text-xs font-mono py-3 rounded-sm border transition-all ${
                isLight ? 'border-black/15 text-gray-900 hover:border-black/30' : 'border-white/15 text-gray-200 hover:border-white/30'
              }`}
            >
              <Phone className="w-4 h-4 text-[#dfb776]" />
              <span>+91 73582 22445</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-3.5 bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-bold tracking-[0.2em] uppercase text-center transition-colors rounded-sm shadow-xl cursor-pointer"
            >
              BOOK PRIVATE TOUR ↗
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
