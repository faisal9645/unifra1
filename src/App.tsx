import React, { useState, useEffect } from 'react';
import { Navbar, AppPage } from './components/Navbar';
import { ThreeHeroVilla } from './components/ThreeHeroVilla';
import { HeroOverlay } from './components/HeroOverlay';
import { ThreeCarousel } from './components/ThreeCarousel';
import { EditorialSections } from './components/EditorialSections';
import { VirtualTourSection } from './components/VirtualTourSection';
import { BlogSection } from './components/BlogSection';
import { SignatureProjects } from './components/SignatureProjects';
import { Footer } from './components/Footer';
import { SmoothScroll, useLenis } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';

// Full dedicated subpages matching Unifra's complete award-winning website
import { AboutStoryPage } from './components/pages/AboutStoryPage';
import { OurTeamPage } from './components/pages/OurTeamPage';
import { SignatureProjectsPage } from './components/pages/SignatureProjectsPage';
import { MysaDetailPage } from './components/pages/MysaDetailPage';
import { ContactPage } from './components/pages/ContactPage';
import { VenturesCareersPage } from './components/pages/VenturesCareersPage';
import { AdminLeadsPage } from './components/pages/AdminLeadsPage';

import {
  ConsultationModal,
  VirtualTourModal,
  GalleryLightbox,
  ArticleReaderModal
} from './components/Modals';
import { VillaAccessModal, ClientDetails } from './components/VillaAccessModal';
import { isVillaAccessUnlocked, setVillaAccessUnlocked } from './utils/leadsStorage';
import { SIGNATURE_PROJECTS } from './data/mockData';
import { Hotspot, GalleryItem, ProjectItem, BlogPost } from './types';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

function AppContent() {
  const { scrollTo } = useLenis();

  // Day / Night Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('unifra_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {
      // ignore
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('theme-light');
    } else {
      document.body.classList.remove('theme-light');
    }
    try {
      localStorage.setItem('unifra_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Page routing state
  const [currentPage, setCurrentPage] = useState<AppPage>('home');

  // Modal states
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isVirtualTourOpen, setIsVirtualTourOpen] = useState(false);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [selectedProjectForVisit, setSelectedProjectForVisit] = useState<ProjectItem | null>(null);

  // Villa showcase gated access state
  const [isVillaUnlocked, setIsVillaUnlocked] = useState<boolean>(() => isVillaAccessUnlocked());
  const [isVillaAccessModalOpen, setIsVillaAccessModalOpen] = useState(false);
  const [pendingVillaProject, setPendingVillaProject] = useState<ProjectItem | null>(null);
  const [villaAccessSource, setVillaAccessSource] = useState<string>('Villa Showcase Gate');

  // Listen for unlock state changes from admin portal or other components
  useEffect(() => {
    const handleUnlockChange = () => {
      setIsVillaUnlocked(isVillaAccessUnlocked());
    };
    window.addEventListener('unifra_unlock_state_changed', handleUnlockChange);
    return () => window.removeEventListener('unifra_unlock_state_changed', handleUnlockChange);
  }, []);

  // Support direct navigation to /admin or #admin
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || path.startsWith('/admin') || hash === '#admin') {
        setCurrentPage('admin');
      }
    };
    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  // Sync URL when page changes to admin
  useEffect(() => {
    if (currentPage === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else if (window.location.pathname === '/admin') {
      window.history.pushState(null, '', '/');
    }
  }, [currentPage]);

  // Scroll to top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenVillaShowcase = (project?: ProjectItem | null, source = 'Villa Showcase Gate') => {
    const targetProject = project || SIGNATURE_PROJECTS.find(p => p.id === 'mysa-villas') || null;
    setPendingVillaProject(targetProject);
    setVillaAccessSource(source);
    if (isVillaUnlocked) {
      setCurrentPage('mysa-detail');
      scrollTo(0, { immediate: true });
    } else {
      setIsVillaAccessModalOpen(true);
    }
  };

  const handleVillaAccessSuccess = (_clientDetails: ClientDetails) => {
    setIsVillaUnlocked(true);
    setIsVillaAccessModalOpen(false);
    setCurrentPage('mysa-detail');
    scrollTo(0, { immediate: true });
  };

  const handleNavigatePage = (page: AppPage) => {
    if (page === 'mysa-detail' && !isVillaUnlocked) {
      handleOpenVillaShowcase(SIGNATURE_PROJECTS.find(p => p.id === 'mysa-villas'), 'Navbar Menu - The Residences');
      return;
    }
    setCurrentPage(page);
    scrollTo(0, { immediate: true });
  };

  const scrollToSection = (id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        scrollTo(`#${id}`, { offset: -70, duration: 1.2 });
      }, 120);
    } else {
      scrollTo(`#${id}`, { offset: -70, duration: 1.2 });
    }
  };

  const handleOpenConsultation = (project?: ProjectItem) => {
    if (project) {
      setSelectedProjectForVisit(project);
    }
    setIsConsultationOpen(true);
  };

  const handleDownloadBrochure = (project: ProjectItem) => {
    setSelectedProjectForVisit(project);
    setIsConsultationOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0c0e] text-[#f3f4f6] font-sans antialiased selection:bg-[#dfb776]/30 selection:text-white">
      {/* Precision Luxury Custom Cursor */}
      <CustomCursor accentColor="#dfb776" />

      {/* 1. Global Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => handleOpenConsultation()}
        onOpenVillaAccess={(source) => handleOpenVillaShowcase(null, source || 'Navbar Menu - Mysa Villas')}
        isVillaUnlocked={isVillaUnlocked}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Main Body Content Based on Active Page */}
      <main className="relative">
        {currentPage === 'home' && (
          <>
            {/* Hero Section with Real-Time 3D Interactive Villa (Fixed scroll-through) */}
            <section id="hero" className="relative w-full h-screen min-h-[650px] max-h-[1080px] bg-[#0b0c0e]">
              <ThreeHeroVilla
                onSelectHotspot={(hotspot) => setSelectedHotspot(hotspot)}
                selectedHotspot={selectedHotspot}
                onSelectGalleryItem={(item) => setSelectedGalleryItem(item)}
              />
              <HeroOverlay
                onExploreProjects={() => handleNavigatePage('mysa-detail')}
                onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
                onNavigateOurStory={() => handleNavigatePage('about-story')}
                selectedHotspot={selectedHotspot}
                onCloseHotspot={() => setSelectedHotspot(null)}
                onViewHotspotPhoto={(item) => setSelectedGalleryItem(item)}
                onScrollDown={() => scrollToSection('dream-homes')}
              />
            </section>

            {/* 3D Coverflow / Cylindrical Gallery: "A Glimpse of Our Dream Homes" */}
            <div id="dream-homes">
              <ThreeCarousel onSelectImage={(item) => setSelectedGalleryItem(item)} />
            </div>

            {/* Editorial Architectural Lifestyle Sections (Screenshot 7 & 6 combined) */}
            <EditorialSections
              onOpenConsultation={() => handleOpenConsultation()}
              onNavigatePage={handleNavigatePage}
            />

            {/* Virtual Tour Section with Blueprint Wireframe Background */}
            <VirtualTourSection onOpenVirtualTour={() => setIsVirtualTourOpen(true)} />

            {/* From Our Blog */}
            <BlogSection onReadArticle={(post) => setSelectedBlogPost(post)} />

            {/* Explore Our Signature Projects */}
            <SignatureProjects
              onScheduleVisit={(project) => {
                if (project && (project.id === 'mysa' || project.id === 'mysa-villas')) {
                  handleOpenVillaShowcase(project, 'Home Card - Schedule Visit');
                } else {
                  handleOpenConsultation(project);
                }
              }}
              onDownloadBrochure={handleDownloadBrochure}
              onSelectProject={(project) => {
                if (project.id === 'mysa' || project.id === 'mysa-villas') {
                  handleOpenVillaShowcase(project, 'Home Card - Select Project');
                } else {
                  handleOpenConsultation(project);
                }
              }}
              onExploreShowcase={(project) => {
                if (project.id === 'mysa' || project.id === 'mysa-villas') {
                  handleOpenVillaShowcase(project, 'Home Card - Explore Showcase');
                } else {
                  handleOpenConsultation(project);
                }
              }}
              isVillaUnlocked={isVillaUnlocked}
              onViewAllProjects={() => handleNavigatePage('projects')}
            />
          </>
        )}

        {currentPage === 'about-story' && (
          <AboutStoryPage
            onOpenContact={() => handleOpenConsultation()}
            onNavigateTeam={() => handleNavigatePage('about-team')}
            onNavigateContact={() => handleNavigatePage('contact')}
            onNavigateProjects={() => handleNavigatePage('projects')}
          />
        )}

        {currentPage === 'about-team' && (
          <OurTeamPage
            onOpenContact={() => handleOpenConsultation()}
          />
        )}

        {currentPage === 'projects' && (
          <SignatureProjectsPage
            onSelectProject={(project) => {
              if (project.id === 'mysa' || project.id === 'mysa-villas') {
                handleOpenVillaShowcase(project, 'Projects Page - Select Card');
              } else {
                handleOpenConsultation(project);
              }
            }}
            onExploreShowcase={(project) => {
              if (project.id === 'mysa' || project.id === 'mysa-villas') {
                handleOpenVillaShowcase(project, 'Projects Page - Explore Showcase');
              } else {
                handleOpenConsultation(project);
              }
            }}
            onSelectMysa={() => handleOpenVillaShowcase(null, 'Projects Page - Hero Mysa')}
            onOpenContact={() => handleOpenConsultation()}
            isVillaUnlocked={isVillaUnlocked}
          />
        )}

        {currentPage === 'mysa-detail' && (
          <MysaDetailPage
            onOpenContact={() => handleOpenConsultation()}
            onOpenVirtualTour={() => setIsVirtualTourOpen(true)}
            onOpenBrochure={() => handleOpenConsultation()}
            onNavigateProjects={() => handleNavigatePage('projects')}
            onLockVilla={() => {
              setVillaAccessUnlocked(false);
              setIsVillaUnlocked(false);
              handleNavigatePage('projects');
            }}
            onNavigateAdmin={() => handleNavigatePage('admin')}
          />
        )}

        {currentPage === 'admin' && (
          <AdminLeadsPage
            onNavigateHome={() => handleNavigatePage('home')}
            onNavigateVilla={() => handleNavigatePage('mysa-detail')}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'blog' && (
          <div className="pt-16">
            <BlogSection onReadArticle={(post) => setSelectedBlogPost(post)} />
          </div>
        )}

        {currentPage === 'ventures' && (
          <VenturesCareersPage
            type="ventures"
            onOpenContact={() => handleOpenConsultation()}
          />
        )}

        {currentPage === 'careers' && (
          <VenturesCareersPage
            type="careers"
            onOpenContact={() => handleOpenConsultation()}
          />
        )}
      </main>

      {/* 3. Global Comprehensive Footer */}
      <Footer
        onNavigatePage={handleNavigatePage}
        onOpenContact={() => handleOpenConsultation()}
      />

      {/* Floating Concierge Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={() => scrollTo(0, { duration: 1.2 })}
            className="w-10 h-10 rounded-sm bg-[#121418] backdrop-blur border border-white/20 text-gray-300 shadow-lg flex items-center justify-center hover:border-[#dfb776] hover:text-[#dfb776] transition-all cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* WhatsApp VIP Concierge */}
        <a
          href="https://wa.me/917358222445?text=Hello%20Unifra%2C%20I%20would%20like%20to%20know%20more%20about%20MYSA%20Luxe%20Villas."
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:scale-110 transition-all duration-300"
          title="Direct WhatsApp with Unifra Concierge"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="sr-only">WhatsApp Us</span>
        </a>
      </div>

      {/* Global Interactive Modals */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        selectedProject={selectedProjectForVisit}
      />

      <VirtualTourModal
        isOpen={isVirtualTourOpen}
        onClose={() => setIsVirtualTourOpen(false)}
      />

      <GalleryLightbox
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
      />

      <ArticleReaderModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
      />

      {/* Gated Villa Showcase Registration Form Modal */}
      <VillaAccessModal
        isOpen={isVillaAccessModalOpen}
        onClose={() => setIsVillaAccessModalOpen(false)}
        project={pendingVillaProject}
        onSuccess={handleVillaAccessSuccess}
        source={villaAccessSource}
      />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <AppContent />
    </SmoothScroll>
  );
}

