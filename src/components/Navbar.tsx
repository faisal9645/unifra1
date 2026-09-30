import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Menu, X, Phone, Sparkles } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';

// Portfolio status groups shown in the PROJECTS menu (MYSA leads its group)
const PROJECT_STATUS_ORDER = ['Ongoing', 'Upcoming', 'Completed'] as const;

const STATUS_META: Record<string, { label: string; dot: string; pulse?: boolean }> = {
  Ongoing: { label: 'Ongoing', dot: 'bg-[#9b6f1e]', pulse: true },
  Upcoming: { label: 'Upcoming', dot: 'bg-gray-400' },
  Completed: { label: 'Completed', dot: 'bg-emerald-600' }
};

const groupProjectsByStatus = () =>
  PROJECT_STATUS_ORDER
    .map((status) => ({
      status,
      projects: SIGNATURE_PROJECTS.filter((p) => (p.statusBadge || 'Upcoming') === status)
    }))
    .filter((group) => group.projects.length > 0);

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
      const scrolled = window.scrollY > 40;
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
    };
  }, []);

  const handleProjectsToggle = () => {
    if (projectsTimerRef.current) clearTimeout(projectsTimerRef.current);
    setProjectsDropdownOpen(prev => !prev);
    setAboutDropdownOpen(false);
  };

  const handleAboutToggle = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setAboutDropdownOpen(prev => !prev);
    setProjectsDropdownOpen(false);
  };

  const handleProjectsMouseEnter = () => {
    if (projectsTimerRef.current) clearTimeout(projectsTimerRef.current);
    setProjectsDropdownOpen(true);
    setAboutDropdownOpen(false);
  };

  const handleProjectsMouseLeave = () => {
    projectsTimerRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 250);
  };

  const handleAboutMouseEnter = () => {
    if (aboutTimerRef.current) clearTimeout(aboutTimerRef.current);
    setAboutDropdownOpen(true);
    setProjectsDropdownOpen(false);
  };

  const handleAboutMouseLeave = () => {
    aboutTimerRef.current = setTimeout(() => {
      setAboutDropdownOpen(false);
    }, 250);
  };

  const handleNavClick = (page: AppPage) => {
    onNavigatePage(page);
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
    setProjectsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = true;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out will-change-transform [transform:translateZ(0)] ${
        isScrolled
          ? 'bg-[#faf8f5] border-b border-[#eae4db] py-3 sm:py-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)]'
          : 'bg-[#faf8f5] border-b border-transparent py-4 sm:py-5.5'
      }`}
    >
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Official Unifra Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none py-1"
            aria-label="Unifra - Creating Desires"
          >
            <img
              src="/images/unifra-logo-stacked.png"
              alt="Unifra Properties - Creating Desires"
              className={`w-auto object-contain transition-all duration-300 group-hover:opacity-90 ${
                isScrolled ? '-my-1.5 h-12 sm:h-14' : '-my-2 h-16 sm:h-18'
              }`}
            />
          </button>

          {/* Desktop Nav Links (Clean header navigation: PROJECTS, ABOUT US, LIFESTYLE, CONTACT) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
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

                    {/* Status-grouped portfolio: ONGOING / UPCOMING / COMPLETED */}
                    <div className="py-1">
                      {groupProjectsByStatus().map(({ status, projects }) => {
                        const meta = STATUS_META[status] || STATUS_META.Upcoming;
                        return (
                          <div key={status} className="pt-1.5 border-t border-black/5 first:border-t-0 first:pt-0">
                            {/* Status group header */}
                            <div className="px-4 pt-2 pb-1 flex items-center justify-between">
                              <div className="flex items-center gap-1.5">
                                <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${meta.pulse ? 'animate-pulse' : ''}`} />
                                <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-gray-500">
                                  {meta.label}
                                </span>
                              </div>
                              <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
                                {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                              </span>
                            </div>

                            {/* Projects within this status (MYSA leads its group) */}
                            {projects.map((proj) => {
                              const isMysa = proj.id === 'mysa-villas';
                              return (
                                <button
                                  key={proj.id}
                                  type="button"
                                  onClick={() => {
                                    if (!isMysa) {
                                      setProjectsDropdownOpen(false);
                                      handleNavClick('projects');
                                      return;
                                    }
                                    if (!isVillaUnlocked && onOpenVillaAccess) {
                                      setProjectsDropdownOpen(false);
                                      onOpenVillaAccess('Navbar Dropdown - Mysa Villas');
                                    } else {
                                      handleNavClick('mysa-detail');
                                    }
                                  }}
                                  className={`w-full text-left px-4 py-2.5 text-xs tracking-wider transition-all flex items-center justify-between group cursor-pointer ${
                                    isMysa
                                      ? isLight
                                        ? 'text-gray-700 hover:bg-amber-500/10 hover:text-black'
                                        : 'text-gray-300 hover:bg-[#dfb776]/10 hover:text-white'
                                      : 'cursor-default opacity-60'
                                  }`}
                                >
                                  <div className={`flex flex-col pr-2 ${isMysa ? '' : 'blur-[3px] select-none'}`}>
                                    <div className="flex items-center gap-1.5">
                                      {isMysa && <span className={`w-1.5 h-1.5 rounded-full ${isLight ? 'bg-[#9b6f1e]' : 'bg-[#dfb776]'}`} />}
                                      <span className={`font-semibold transition-colors ${
                                        isMysa
                                          ? isLight ? 'text-gray-900 group-hover:text-[#9b6f1e]' : 'text-white group-hover:text-[#dfb776]'
                                          : isLight ? 'text-gray-800' : 'text-gray-200'
                                      }`}>
                                        {proj.name.toUpperCase()}
                                      </span>
                                    </div>
                                    <span className={`text-[10px] mt-0.5 font-light ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
                                      {proj.location} • {proj.specs.bedrooms}
                                    </span>
                                  </div>
                                  {isMysa && (
                                    <span className={`text-[9px] px-2 py-0.5 font-mono tracking-wider uppercase rounded-xs shrink-0 ${
                                      isLight ? 'bg-amber-500/20 border border-amber-600/30 text-amber-900 font-semibold' : 'bg-[#dfb776]/15 border border-[#dfb776]/30 text-[#dfb776]'
                                    }`}>
                                      {proj.statusBadge || 'ONGOING'}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer bar */}
                    <div className={`px-4 py-2 flex items-center justify-between text-[9px] font-mono border-t ${
                      isLight ? 'bg-gray-100 border-black/10 text-gray-600' : 'bg-black/40 border-white/5 text-gray-400'
                    }`}>
                      <span>MYSA LUXE VILLAS — NOW SELLING</span>
                      <span className={isLight ? 'text-[#9b6f1e] font-semibold' : 'text-[#dfb776]'}>MORE COMING SOON</span>
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

          {/* Right Action side: Phone + BOOK A PRIVATE TOUR button */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3.5">

            <a
              href="tel:+917358222445"
              className={`flex items-center gap-2 text-xs font-mono transition-colors ${
                isLight ? 'text-gray-700 hover:text-[#9b6f1e]' : 'text-gray-300 hover:text-[#dfb776]'
              }`}
            >
              <Phone className={`w-3.5 h-3.5 ${isLight ? 'text-[#c59b67]' : 'text-[#dfb776]'}`} />
              <span className="hidden xl:inline">+91 73582 22445</span>
            </a>

            <button
              onClick={onOpenContact}
              className={`bg-[#1a1918] hover:bg-[#2b2723] text-white font-medium tracking-[0.2em] uppercase rounded-sm transition-all duration-300 cursor-pointer shadow-sm flex items-center gap-2 ${
                isScrolled ? 'px-3.5 py-2 text-[10px]' : 'px-3.5 lg:px-5 py-2.5 text-[10px]'
              }`}
            >
              <span>BOOK A PRIVATE TOUR</span>
              <span className="text-[11px] text-[#c59b67]">↗</span>
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
          isLight ? 'bg-[#faf8f5] text-[#1a1918]' : 'bg-[#0b0c0e] text-white'
        }`}
      >
        {/* Top Header inside Mobile Menu Drawer */}
        <div className={`px-4 sm:px-8 py-4 sm:py-5 border-b flex items-center justify-between shrink-0 ${
          isLight ? 'border-[#eae4db]' : 'border-white/10'
        }`}>
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group cursor-pointer focus:outline-none py-1"
            aria-label="Unifra - Creating Desires"
          >
            <img
              src="/images/unifra-logo-stacked.png"
              alt="Unifra Properties - Creating Desires"
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isLight ? 'border-[#d8cebe] text-[#1a1918] hover:bg-black/5' : 'border-white/15 text-white hover:bg-white/10'
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

                  {groupProjectsByStatus().map(({ status, projects }) => {
                    const meta = STATUS_META[status] || STATUS_META.Upcoming;
                    return (
                      <div key={status} className="pt-2">
                        {/* Status group header */}
                        <div className="flex items-center gap-1.5 px-2 pb-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot} ${meta.pulse ? 'animate-pulse' : ''}`} />
                          <span className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-gray-500">
                            {meta.label}
                          </span>
                          <span className="ml-auto text-[9px] font-mono uppercase tracking-wider text-gray-400">
                            {projects.length} {projects.length === 1 ? 'Project' : 'Projects'}
                          </span>
                        </div>

                        {projects.map((proj) => {
                          const isMysa = proj.id === 'mysa-villas';
                          return (
                            <button
                              key={proj.id}
                              onClick={() => {
                                if (isMysa) {
                                  handleNavClick('mysa-detail');
                                } else {
                                  setMobileMenuOpen(false);
                                  handleNavClick('projects');
                                }
                              }}
                              className={`w-full text-left py-2.5 px-2 text-xs flex items-center justify-between border-t border-black/5 ${
                                isMysa
                                  ? 'text-gray-700 hover:text-black'
                                  : 'cursor-default'
                              }`}
                            >
                              <div className={`flex flex-col ${isMysa ? '' : 'blur-[3px] select-none'}`}>
                                <span className={isMysa ? 'font-semibold text-[#dfb776]' : 'font-medium text-gray-600'}>
                                  {proj.name.toUpperCase()}
                                </span>
                                <span className="text-[10px] text-gray-500">
                                  {proj.location} • {proj.specs.bedrooms}
                                </span>
                              </div>
                              {isMysa && (
                                <span className="text-[9px] px-1.5 py-0.5 font-mono rounded-xs bg-[#dfb776]/20 text-[#dfb776] uppercase tracking-wider shrink-0">
                                  {proj.statusBadge || 'ONGOING'}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
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
              className="w-full py-4 bg-[#1a1918] hover:bg-[#2b2723] text-white text-xs font-mono tracking-[0.2em] uppercase text-center transition-colors rounded-sm shadow-sm cursor-pointer"
            >
              BOOK PRIVATE TOUR ↗
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
