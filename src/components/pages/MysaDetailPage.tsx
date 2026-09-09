import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Download,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Shield,
  Zap,
  Droplets,
  Layers,
  Sparkles,
  Clock,
  Eye,
  Check,
  Compass,
  FileText,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Filter,
  Camera,
  KeyRound,
  ExternalLink,
  Image as ImageIcon
} from 'lucide-react';

import { ThreeHeroVilla } from '../ThreeHeroVilla';

export interface MysaPhoto {
  id: string;
  title: string;
  category: 'Facade' | 'Living' | 'Master Suite' | 'Kitchen & Dining' | 'Pool & Grounds' | 'Spa';
  categoryLabel: string;
  location: string;
  area: string;
  imageUrl: string;
  description: string;
}

export const MYSA_VILLA_PHOTOS: MysaPhoto[] = [
  {
    id: 'facade-butterfly',
    title: 'Scandinavian Butterfly Pitched Roof & Clerestory',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'MYSA Villas, Vettuvankeni ECR',
    area: 'Villa 01 & 02 • Level 2 Gable',
    imageUrl: '/images/mysa3d/02A.jpg',
    description: 'Signature Scandinavian butterfly pitched roof clad in dark bronze fascia with front-facing triangular clerestory gable glass and warm recessed soffit LED wash.'
  },
  {
    id: 'facade-granite',
    title: 'Cantilevered Dark Granite Balcony & Sconces',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'West Elevation & Arrival Portico',
    area: 'Villa 03 & 04 • Cantilever Terrace',
    imageUrl: '/images/mysa3d/03.jpg',
    description: 'Deep cantilevered dark granite balcony block with toughened glass balustrade, dual architectural satin brass sconces, integrated planter box, and double-car portico.'
  },
  {
    id: 'facade-dusk',
    title: 'MYSA Dusk Elevation & Golden Interior Illumination',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Main Gated Enclave Avenue',
    area: 'Full 3-Level Elevation • 5,800 Sq.Ft.',
    imageUrl: '/images/mysa3d/mysa.jpg',
    description: 'Evening twilight view capturing warm 2700K interior illumination through double-height glass atriums and coastal reflection lap pool.'
  },
  {
    id: 'lotus-gate',
    title: 'Illuminated Lotus Portal & Executive EV Portico',
    category: 'Facade',
    categoryLabel: 'Facade & Architecture',
    location: 'Gated Enclave Arrival Boulevard',
    area: 'Monolithic Gate Monument & Driveway',
    imageUrl: '/images/mysa3d/BAX00768.jpg',
    description: 'Monolithic black granite monument with illuminated brass lotus insignia, Belgian cobble arrival driveway, and covered executive EV portico.'
  },
  {
    id: 'furnished-salon',
    title: 'Completed Furnished Living Salon & Media Console',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Residence',
    area: '680 Sq.Ft. Finished Suite',
    imageUrl: '/images/mysa3d/BAX09923.jpg',
    description: 'Authentic photograph of the completed ground-floor salon featuring bespoke teak armchairs, floating media console, sheer drapery, and warm recessed ambient lighting.'
  },
  {
    id: 'grand-living',
    title: 'Double-Height Great Room & Floating Oak Staircase',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'Ground Level Central Atrium',
    area: '920 Sq.Ft. • 22-Ft Ceiling Volume',
    imageUrl: '/images/mysa3d/LIVING-VIEW1.jpg',
    description: 'Expansive 22-foot double-height living room featuring floating timber cantilever staircase, double-ring gold chandelier, and imported composite Italian marble.'
  },
  {
    id: 'culinary-studio',
    title: 'Minimalist Culinary Studio & Quartz Waterfall Island',
    category: 'Kitchen & Dining',
    categoryLabel: 'Dining & Kitchen',
    location: 'Ground Level Culinary Suite',
    area: '450 Sq.Ft. Gourmet Studio',
    imageUrl: '/images/mysa3d/KITCHEN.jpg',
    description: 'Seamless waterfall quartz kitchen island with breakfast bar, integrated premium appliances, Blum touch-to-open walnut joinery, and concealed ambient channels.'
  },
  {
    id: 'mezzanine-lounge',
    title: 'First Floor Family Mezzanine Lounge & Media Salon',
    category: 'Living',
    categoryLabel: 'Living & Great Room',
    location: 'First Level Entertainment Wing',
    area: '580 Sq.Ft.',
    imageUrl: '/images/mysa3d/LOUNGE.jpg',
    description: 'Intimate first-floor family salon and media lounge with bespoke floating credenza, designer sculptural seating, and warm engineered timber flooring.'
  },
  {
    id: 'master-sanctuary',
    title: 'Master Sanctuary Loft Suite & Timber Rafters',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level East Wing',
    area: '650 Sq.Ft. • Cathedral Volume',
    imageUrl: '/images/mysa3d/MASTER-BEDROOM5.jpg',
    description: 'Cathedral volume master suite under the butterfly pitched roof with exposed natural timber rafters, plush king bed suite, and floor-to-ceiling balcony glazing.'
  },
  {
    id: 'first-floor-suite',
    title: 'First Floor Luxury Guest Haven with Wood Slat Accent',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'First Level North Wing',
    area: '480 Sq.Ft. Ensuite',
    imageUrl: '/images/mysa3d/first-floor-bedroom.jpg',
    description: 'First floor ensuite bedroom featuring vertical wood slat headboard, integrated warm cove backlighting, and floor-to-ceiling garden glazing.'
  },
  {
    id: 'ground-floor-suite',
    title: 'Ground Floor Garden Suite & Pool Walkout',
    category: 'Master Suite',
    categoryLabel: 'Master Sanctuary & Suites',
    location: 'Ground Level Garden Wing',
    area: '460 Sq.Ft. Ensuite',
    imageUrl: '/images/mysa3d/ground-floor-bedroom.jpg',
    description: 'Ground level bedroom with floor-to-ceiling acoustic sliding glass doors opening directly to the private garden courtyard and lap pool.'
  }
];

interface MysaDetailPageProps {
  onOpenContact: () => void;
  onOpenVirtualTour: () => void;
  onOpenBrochure: () => void;
  onNavigateProjects?: () => void;
  onLockVilla?: () => void;
  onNavigateAdmin?: () => void;
}

export const MysaDetailPage: React.FC<MysaDetailPageProps> = ({
  onOpenContact,
  onOpenVirtualTour,
  onOpenBrochure,
  onNavigateProjects,
  onLockVilla,
  onNavigateAdmin
}) => {
  // Floor plan active tab
  const [activeFloorPlan, setActiveFloorPlan] = useState<'ground' | 'first' | 'second'>('ground');

  // Specs active category tab
  const [activeSpecCategory, setActiveSpecCategory] = useState<
    'painting' | 'plumbing' | 'electrical' | 'flooring' | 'joinery' | 'ventilation'
  >('painting');

  // FAQ expanded state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Gallery category filter
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Fullscreen Lightbox Modal state
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = selectedCategory === 'All'
    ? MYSA_VILLA_PHOTOS
    : MYSA_VILLA_PHOTOS.filter(photo => photo.category === selectedCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => (prev !== null ? (prev + 1) % MYSA_VILLA_PHOTOS.length : 0));
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => (prev !== null ? (prev - 1 + MYSA_VILLA_PHOTOS.length) % MYSA_VILLA_PHOTOS.length : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const floorPlanData = {
    ground: {
      title: 'Ground Floor Plan',
      area: '1,800 sq.ft.',
      description: 'Grand entrance foyer leading to expansive double-height living room, guest bedroom suite, modern open kitchen with pantry, powder room, covered dual-car garage, and private outdoor swimming deck with landscaped plunge pool.',
      image: '/images/mysa3d/ground-floor-bedroom.jpg',
      highlights: ['Double-Height Living & Dining', 'Private Lap Pool & Deck', 'Chef Kitchen with Prep Island', 'Guest Suite with Garden View']
    },
    first: {
      title: 'First Floor Plan',
      area: '2,400 sq.ft.',
      description: 'Master sanctuary suite with Scandinavian timber paneling, private sunrise balcony, walk-in dressing lounge, spa bathroom with freestanding soaking tub, plus two secondary ensuite bedrooms and family lounge.',
      image: '/images/mysa3d/first-floor-bedroom.jpg',
      highlights: ['Master Suite with Walk-In Closet', 'Private Sun Deck Balconies', 'Central Family Lounge', 'Luxury Ensuite Bathrooms']
    },
    second: {
      title: 'Second Floor Plan (Penthouse & Terrace)',
      area: '1,600 sq.ft.',
      description: 'Entertainment lounge / home theater studio, fitness wellness studio, barbecue terrace overlooking coastal treetops, covered pergola seating, and utility laundry area.',
      image: '/images/mysa3d/LOUNGE.jpg',
      highlights: ['Rooftop Stargazing Terrace', 'Private Gymnasium / Studio', 'Pergola Covered Seating', 'Solar & DG Integration Zone']
    }
  };

  const specCategories = {
    painting: {
      title: 'Painting & Finishes',
      items: [
        { label: 'External Walls', value: 'Weather-resistant acrylic exterior emulsion with textured protective coating' },
        { label: 'Internal Walls', value: 'Smooth Asian Paints Royal Luxury plastic emulsion over dual skim coats of putty' },
        { label: 'Ceilings', value: 'Premium acrylic emulsion paint in pure matte architectural white' },
        { label: 'Driveway & Car Park', value: 'Heavy-duty exterior pavers with non-slip polyurethane sealant coating' }
      ]
    },
    plumbing: {
      title: 'Plumbing & Sanitary',
      items: [
        { label: 'Sanitary Ware', value: 'Wall-hung rimless ceramic water closets with soft-close seat covers (Kohler / Grohe)' },
        { label: 'CP Fittings', value: 'Premium concealed thermostatic diverters with multi-flow rain showerheads' },
        { label: 'Hot Water Supply', value: 'Centralized heat-pump solar water heating with instant recirculation' },
        { label: 'Piping', value: 'CPVC & UPVC lead-free piping with dedicated hydro-pneumatic pressure boosting' }
      ]
    },
    electrical: {
      title: 'Electrical & Automation',
      items: [
        { label: 'Wiring & Cables', value: 'Concealed copper wiring with FRLS (Flame Retardant Low Smoke) insulation' },
        { label: 'Switches & Plates', value: 'Legrand Arteor / Schneider modular switches with brushed metallic plates' },
        { label: 'Power Backup', value: '100% DG power backup with automatic changeover switch (AMF)' },
        { label: 'Smart Home', value: 'App-controlled lighting automation, video door phone, and motorized curtain provision' }
      ]
    },
    flooring: {
      title: 'Flooring & Wall Tiling',
      items: [
        { label: 'Living & Dining', value: 'Imported Italian composite marble slabs with mirror polish finish' },
        { label: 'Master Bedroom', value: 'High-density engineered Scandinavian natural oak wooden flooring' },
        { label: 'Bathrooms', value: 'Full-body vitrified anti-skid floor tiles with full-height designer wall dado' },
        { label: 'Pool Deck & Balcony', value: 'Exterior weatherproof composite wood decking and flamed granite accents' }
      ]
    },
    joinery: {
      title: 'Joinery & Glass Windows',
      items: [
        { label: 'Main Entrance Door', value: '8-foot high Burma Teak wood frame and shutter with Yale biometric digital lock' },
        { label: 'Internal Doors', value: 'Solid core flush doors finished with natural timber veneer and Hafele hardware' },
        { label: 'Windows & Sliders', value: 'Schüco / Saint-Gobain heavy-gauge acoustic aluminum sliding doors with toughened DGU glass' },
        { label: 'Balcony Railings', value: 'Laminated toughened structural glass railings with minimalist SS 316 handrails' }
      ]
    },
    ventilation: {
      title: 'Ventilation & Air Conditioning',
      items: [
        { label: 'HVAC Provisions', value: 'Concealed copper piping & drainage designed for Daikin / Mitsubishi VRV multi-split systems' },
        { label: 'Cross-Ventilation', value: 'Optimal Scandinavian passive airflow orientation capturing cool Bay of Bengal evening breezes' },
        { label: 'Kitchen & Bath Exhaust', value: 'Low-noise inline acoustic centrifugal exhaust ducts in all wet zones' },
        { label: 'Skylight Wells', value: 'Thermal-insulated double-glazed skylight wells over internal courtyard atriums' }
      ]
    }
  };

  const faqItems = [
    {
      question: 'What is the total area of the MYSA Luxe Villas?',
      answer: 'Each MYSA Luxe Villa features a generous built-up area ranging from 4,450 to 5,800 square feet spread across three expansive levels, set on an individual land parcel of 2,800 to 3,600 square feet with a private pool and private parking for 2–3 luxury vehicles.'
    },
    {
      question: 'Are the villas part of a gated community?',
      answer: 'Yes. MYSA is an exclusive, highly secure private gated enclave of only 6 bespoke residences in Vettuvankeni, ECR. The community features 24/7 security personnel, biometric gate access, CCTV perimeter coverage, and dedicated maintenance staff.'
    },
    {
      question: 'What smart home features are included?',
      answer: 'Every villa is equipped with integrated home automation including smart app-controlled mood lighting, biometric front door access with digital passcode and mechanical override, integrated video door phone, smart climate control provisions, and sensor-activated security alerts.'
    },
    {
      question: 'Is there a power backup facility?',
      answer: 'Yes, 100% complete diesel generator (DG) power backup is provided for every villa, including all air-conditioning units, home elevators, pool pumps, and general lighting with seamless automatic changeover switches.'
    },
    {
      question: 'What are the customization options available?',
      answer: 'Homeowners who secure a villa during construction can select customized interior flooring materials, customized kitchen cabinetry designs, optional private hydraulic glass elevators, and bespoke landscape configurations for the poolside garden.'
    }
  ];

  return (
    <div className="pt-0 pb-20 bg-[#0b0c0e] text-[#f3f4f6] relative">
      {/* Floating Sticky Brochure Button on the Right */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <button
          onClick={onOpenBrochure}
          className="bg-[#121418] hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] px-3.5 py-4 rounded-l-sm shadow-2xl flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest [writing-mode:vertical-rl] rotate-180 cursor-pointer transition-all border-l border-y border-white/20 hover:border-[#dfb776]"
        >
          <FileText className="w-3.5 h-3.5 rotate-90 text-[#dfb776]" />
          <span>Brochure →</span>
        </button>
      </div>

      {/* 0. 4K Interactive Render Banner Carousel (Full Viewport Width & Height directly under Fixed Header) */}
      <ThreeHeroVilla
        theme="dark"
        onOpenVirtualTour={onOpenVirtualTour}
        onExploreProjects={onOpenContact}
      />

      {/* Top Breadcrumb & VIP Access Status Bar */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 my-8 flex flex-wrap items-center justify-between gap-4">
        {onNavigateProjects && (
          <button
            onClick={onNavigateProjects}
            className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#dfb776] uppercase tracking-wider transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </button>
        )}
        <div className="flex items-center gap-2.5 ml-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 text-[#dfb776] text-[10px] font-mono uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776] animate-pulse" />
            <span>VIP CLIENT SHOWCASE UNLOCKED</span>
          </div>

          {onLockVilla && (
            <button
              onClick={onLockVilla}
              className="px-2.5 py-1 rounded-sm border border-white/20 hover:border-amber-400 text-gray-300 hover:text-amber-300 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
              title="Lock villa to test the gate form again"
            >
              Lock & Re-test Gate
            </button>
          )}

          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="px-2.5 py-1 rounded-sm border border-[#dfb776]/40 bg-[#dfb776]/10 hover:bg-[#dfb776]/20 text-[#dfb776] text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>View Leads in /admin</span>
              <span className="text-[11px]">→</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. Header */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>VETTUVANKENI, EAST COAST ROAD, CHENNAI</span>
          </div>

          <h1 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-6 leading-[1.1]">
            MYSA Luxe Villas — A Deep Dive into <span className="italic font-serif-luxury text-[#dfb776]">Unparalleled Luxury</span>
          </h1>

          <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Discover 6 contemporary 4BHK Swedish-style villas in Vettuvankeni, Chennai, designed for a serene and inspired lifestyle. 'Mysa', a Swedish concept of cozy contentment, is at the heart of these homes, blending luxury with nature.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-semibold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
            >
              <span>Schedule Private Viewing</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenVirtualTour}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:border-[#dfb776] hover:text-[#dfb776] transition-colors shadow-sm cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#dfb776]" />
              <span>Launch 3D Walkthrough</span>
            </button>
          </div>
        </div>
      </section>



      {/* 3. Comprehensive MYSA Visual Architecture Gallery (All 11 Pictures) */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="text-left max-w-2xl">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-[#dfb776]" />
              <span>THE ARCHITECTURAL VISUAL COLLECTION</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-2">
              MYSA Villas <span className="italic font-serif-luxury text-[#dfb776]">Photo Showcase</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-light">
              Explore all 11 authentic photographs capturing the Scandinavian butterfly roof, cantilevered dark granite balcony, double-height great room, minimalist culinary studio, and master sanctuaries.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
            <span className="px-2.5 py-1 rounded-xs bg-white/5 border border-white/10 text-[#dfb776]">
              {filteredPhotos.length} / {MYSA_VILLA_PHOTOS.length} Photographs
            </span>
            <button
              onClick={() => setLightboxIndex(0)}
              className="px-3 py-1 rounded-xs bg-[#dfb776] text-[#0b0c0e] font-semibold hover:bg-[#c5a880] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Slideshow View
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar border-b border-white/10 text-xs font-mono">
          {[
            { id: 'All', label: 'All Pictures (11)' },
            { id: 'Facade', label: 'Facade & Architecture' },
            { id: 'Living', label: 'Living & Great Room' },
            { id: 'Master Suite', label: 'Suites & Sanctuaries' },
            { id: 'Kitchen & Dining', label: 'Culinary Studio' }
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-sm uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'bg-[#121418] text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Bento Grid of Villa Pictures */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => {
            const globalIdx = MYSA_VILLA_PHOTOS.findIndex(p => p.id === photo.id);
            return (
              <div
                key={photo.id}
                className="bg-[#121418] rounded-sm overflow-hidden border border-white/10 hover:border-[#dfb776]/60 transition-all flex flex-col shadow-xl group cursor-pointer"
                onClick={() => setLightboxIndex(globalIdx !== -1 ? globalIdx : 0)}
              >
                <div className="relative h-64 overflow-hidden bg-black">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Top tags */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-xs bg-black/75 backdrop-blur-md border border-white/20 text-[#dfb776]">
                      {photo.categoryLabel}
                    </span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-xs bg-black/75 backdrop-blur-md border border-white/20 text-gray-300">
                      {photo.area}
                    </span>
                  </div>

                  {/* Hover prompt */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xs bg-[#dfb776] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold shadow-2xl scale-95 group-hover:scale-100 transition-transform">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>View Full Resolution</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between text-left">
                  <div>
                    <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-white group-hover:text-[#dfb776] transition-colors mb-1.5">
                      {photo.title}
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-2">
                      {photo.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/5 text-[10px] font-mono text-gray-400">
                    <span className="flex items-center gap-1 text-gray-300">
                      <MapPin className="w-3 h-3 text-[#dfb776]" />
                      <span>{photo.location}</span>
                    </span>
                    <span className="text-[#dfb776] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      <span>Click to expand</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Villa Floor Plans */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            LAYOUT BLUEPRINTS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Villa <span className="italic font-serif-luxury text-[#dfb776]">Floor Plans</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Explore the thoughtfully designed layouts of MYSA Luxe Villas, crafted for comfort and elegance.
          </p>
        </div>

        {/* Floor Plan Switcher Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-[#121418] rounded-sm border border-white/10">
            {(['ground', 'first', 'second'] as const).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFloorPlan(key)}
                className={`px-4 sm:px-6 py-2 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFloorPlan === key
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {key === 'ground' ? 'Ground Floor' : key === 'first' ? 'First Floor' : 'Second Floor'}
              </button>
            ))}
          </div>
        </div>

        {/* Floor Plan Card */}
        <div className="bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5 text-left">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-sm bg-[#dfb776]/10 text-[#dfb776] border border-[#dfb776]/30 text-xs font-mono font-semibold">
                Total Area: {floorPlanData[activeFloorPlan].area}
              </span>
              <span className="text-xs font-mono text-emerald-400 font-medium">100% Vastu Compliant</span>
            </div>

            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-white">
              {floorPlanData[activeFloorPlan].title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              {floorPlanData[activeFloorPlan].description}
            </p>

            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-gray-400 font-medium block mb-2">
                KEY ARCHITECTURAL HIGHLIGHTS:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {floorPlanData[activeFloorPlan].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-300 bg-black/40 p-2.5 rounded-sm border border-white/10">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#dfb776] shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={onOpenBrochure}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download CAD Blueprint PDF</span>
              </button>
            </div>
          </div>

          <div className="rounded-sm overflow-hidden border border-white/10 bg-[#0b0c0e] p-4 relative flex items-center justify-center min-h-[320px]">
            {/* Architectural Blueprint Vector Render */}
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#121418] to-[#0b0c0e] rounded-sm p-6 text-white font-mono text-[11px] relative overflow-hidden flex flex-col justify-between border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-[#dfb776] tracking-widest uppercase font-bold text-[10px]">
                  UNIFRA ARCHITECTURAL BLUEPRINT
                </span>
                <span className="text-gray-500 text-[10px]">SCALE 1:50 MM</span>
              </div>

              <div className="grid grid-cols-3 gap-3 my-4">
                <div className="border border-white/10 rounded-sm p-2.5 bg-white/5">
                  <div className="text-[9px] text-[#dfb776] uppercase">Level</div>
                  <div className="font-bold text-xs">{floorPlanData[activeFloorPlan].title}</div>
                </div>
                <div className="border border-white/10 rounded-sm p-2.5 bg-white/5">
                  <div className="text-[9px] text-[#dfb776] uppercase">Built-Up</div>
                  <div className="font-bold text-xs">{floorPlanData[activeFloorPlan].area}</div>
                </div>
                <div className="border border-white/10 rounded-sm p-2.5 bg-white/5">
                  <div className="text-[9px] text-[#dfb776] uppercase">Status</div>
                  <div className="font-bold text-xs text-emerald-400">Approved</div>
                </div>
              </div>

              {/* Graphical schematic lines */}
              <div className="relative border border-dashed border-white/20 rounded-sm h-32 flex items-center justify-center p-2 text-center text-white/50 text-[10px]">
                <div className="absolute inset-x-4 top-2 h-0.5 bg-[#dfb776]/20" />
                <div className="absolute inset-y-4 left-1/3 w-0.5 bg-[#dfb776]/20" />
                <div className="absolute inset-y-4 right-1/3 w-0.5 bg-[#dfb776]/20" />
                <div className="space-y-1">
                  <Compass className="w-6 h-6 mx-auto text-[#dfb776] mb-1 opacity-80" />
                  <span className="text-white/80 font-sans font-medium block">
                    {floorPlanData[activeFloorPlan].title} Schematic Layout
                  </span>
                  <span className="text-gray-500">Click "Download CAD Blueprint PDF" for detailed dimensional drawings</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[9px] text-gray-400 pt-2 border-t border-white/10">
                <span className="font-mono">PROJECT: MYSA LUXE VILLAS</span>
                <button
                  type="button"
                  onClick={() => {
                    const targetId = activeFloorPlan === 'ground' ? 'grand-living' : activeFloorPlan === 'first' ? 'master-sanctuary' : 'mezzanine-lounge';
                    const idx = MYSA_VILLA_PHOTOS.findIndex(p => p.id === targetId);
                    setLightboxIndex(idx !== -1 ? idx : 0);
                  }}
                  className="inline-flex items-center gap-1.5 text-[#dfb776] hover:underline cursor-pointer font-mono font-semibold"
                >
                  <Camera className="w-3 h-3" />
                  <span>View Actual Photograph →</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. World-Class Amenities */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            LUXURY COMFORTS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            World-Class <span className="italic font-serif-luxury text-[#dfb776]">Amenities</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Experience a lifestyle of convenience and luxury with amenities designed to elevate every moment.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">Private Pools</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Dedicated temperature-balanced lap pools in each individual villa with perimeter timber sun deck.
              </p>
            </div>
          </div>

          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">24/7 Power Backup</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                100% DG generator backup covering all central air-conditioners, elevators, and appliances automatically.
              </p>
            </div>
          </div>

          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">Smart Home Automation</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Integrated app-controlled mood lighting, digital smart door locks, and video door surveillance.
              </p>
            </div>
          </div>

          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">Landscaped Gardens</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Curated botanical courtyard gardens with native tropical flora and automatic drip irrigation.
              </p>
            </div>
          </div>

          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">Biometric Security</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                Manned gated entry with computerized visitor verification, boom barriers, and HD infrared CCTV coverage.
              </p>
            </div>
          </div>

          <div className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 transition-all flex items-start gap-4 shadow-xl">
            <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776] shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-left">
              <h4 className="font-serif-luxury text-base font-bold text-white mb-1">EV Charging Stations</h4>
              <p className="text-xs text-gray-400 leading-relaxed font-light">
                High-speed dedicated fast-charging wallbox provisions in every covered private two-car portico.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Detailed Specifications */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            TECHNICAL SPECIFICATIONS
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Detailed <span className="italic font-serif-luxury text-[#dfb776]">Specifications</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Engineered using only certified premium tier-1 materials and international building standards.
          </p>
        </div>

        {/* Specification Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {(
            [
              { key: 'painting', label: 'Painting' },
              { key: 'plumbing', label: 'Plumbing & Sanitary' },
              { key: 'electrical', label: 'Electrical' },
              { key: 'flooring', label: 'Flooring' },
              { key: 'joinery', label: 'Joinery & Doors' },
              { key: 'ventilation', label: 'Ventilation' }
            ] as const
          ).map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveSpecCategory(cat.key)}
              className={`px-4 sm:px-6 py-2 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeSpecCategory === cat.key
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'bg-[#121418] text-gray-400 hover:text-white border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Specification List */}
        <div className="bg-[#121418] rounded-sm p-8 sm:p-10 border border-white/10 shadow-2xl max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <h3 className="font-serif-luxury text-xl font-bold text-white">
              {specCategories[activeSpecCategory].title}
            </h3>
            <span className="text-[10px] font-mono text-[#dfb776] font-semibold uppercase tracking-wider">Tier-1 Certified</span>
          </div>

          <div className="space-y-3">
            {specCategories[activeSpecCategory].items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-sm bg-black/40 border border-white/10 gap-2"
              >
                <div className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#dfb776] shrink-0" />
                  <span className="text-xs sm:text-sm font-semibold text-white">{item.label}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-400 text-left sm:text-right max-w-md font-light">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Project Status */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            TIMELINE
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Project <span className="italic font-serif-luxury text-[#dfb776]">Status</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Follow the journey of MYSA Luxe Villas from foundation to finish.
          </p>
        </div>

        {/* 5 Milestone Timeline */}
        <div className="bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold mb-3 shadow">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Foundation & Structure</h4>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">100% Complete</span>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold mb-3 shadow">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Blockwork & Plastering</h4>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">100% Complete</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-[#dfb776] text-[#0b0c0e] flex items-center justify-center font-bold mb-3 shadow-lg shadow-[#dfb776]/20 animate-pulse">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white mb-1">Electrical & Plumbing</h4>
              <span className="text-[10px] font-mono text-[#dfb776] font-semibold uppercase">In Progress (85%)</span>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 text-gray-500 flex items-center justify-center font-bold mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-400 mb-1">Finishing Touches</h4>
              <span className="text-[10px] font-mono text-gray-500 font-semibold uppercase">Q3 2025</span>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 text-gray-500 flex items-center justify-center font-bold mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-400 mb-1">Handover</h4>
              <span className="text-[10px] font-mono text-gray-500 font-semibold uppercase">Q4 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Location Advantage */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl">
          <div className="space-y-4 text-left">
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776]">
              SURROUNDINGS
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight">
              Location <span className="italic font-serif-luxury text-[#dfb776]">Advantage</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
              Situated in the serene locale of Vettuvankeni, MYSA Luxe Villas offer the perfect balance of peaceful coastal living and convenient urban access.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span><strong className="text-white">3 Mins:</strong> Prarthana Beach & ECR Drive-In</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span><strong className="text-white">8 Mins:</strong> The British International School & Gateway International</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span><strong className="text-white">12 Mins:</strong> Thiruvanmiyur & TIDEL IT Park OMR</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-gray-300">
                <MapPin className="w-4 h-4 text-[#dfb776] shrink-0" />
                <span><strong className="text-white">18 Mins:</strong> Adyar, Boat Club & Apollo Hospital</span>
              </div>
            </div>
          </div>

          {/* Location Map Visual */}
          <div className="rounded-sm overflow-hidden shadow-2xl h-72 sm:h-96 relative bg-black/40 border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80"
              alt="Chennai ECR Coastline Map"
              className="w-full h-full object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-black/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#dfb776] mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Vettuvankeni, Chennai</span>
              </div>
              <h4 className="font-serif-luxury text-xl font-normal text-white">ECR Coastal Sanctuary</h4>
              <p className="text-xs text-gray-400 mt-1 font-light">Peaceful seaside serenity within minutes of Chennai city center.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5. Official MYSA YouTube Walkthrough & Cinematic Film Section */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-20">
        <div className="bg-[#121418] rounded-sm border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                <span>OFFICIAL YOUTUBE VILLA FILM</span>
              </div>
              <h2 className="font-serif-luxury text-2xl sm:text-4xl font-normal text-white tracking-tight">
                MYSA Luxe Villas — <span className="italic font-serif-luxury text-[#dfb776]">Official Walkthrough Video</span>
              </h2>
            </div>
            <p className="text-xs font-mono text-gray-400 max-w-md">
              Watch the full-length architectural video tour of MYSA Luxe Villas on East Coast Road, showcasing double-height living spaces, master loft suites, and private poolside decks.
            </p>
          </div>

          {/* YouTube Video Player Container */}
          <div className="relative w-full aspect-video bg-black rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <iframe
              src="https://www.youtube.com/embed/XuMGAoSu3HE?rel=0&modestbranding=1"
              title="MYSA Luxe Villas Official Walkthrough & Cinematic Film"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4 px-2 text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            <div>MYSA LUXE VILLAS • VETTUVANKENI ECR</div>
            <div className="flex items-center gap-4">
              <span>HD 1080P ARCHITECTURAL FILM</span>
              <span>•</span>
              <span>FULL INTERIOR WALKTHROUGH</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="text-center mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-2">
            COMMON INQUIRIES
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white tracking-tight mb-3">
            Frequently Asked <span className="italic font-serif-luxury text-[#dfb776]">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Everything you need to know about purchasing a MYSA Luxe Villa.
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="bg-[#121418] rounded-sm border border-white/10 overflow-hidden transition-all shadow-xl"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className="font-serif-luxury text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div className="w-7 h-7 rounded-sm border border-white/15 flex items-center justify-center shrink-0 text-gray-400">
                    {isOpen ? <ChevronUp className="w-4 h-4 text-[#dfb776]" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/10 bg-black/30 font-light text-left">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Bottom CTA Banner */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="relative rounded-sm overflow-hidden p-8 sm:p-14 text-white shadow-2xl min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10 dark-overlay-card">
          <img
            src="/images/mysa3d/mysa.jpg"
            alt="MYSA Villa Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/70" />

          <div className="relative z-10 max-w-2xl text-center md:text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776] font-semibold mb-2 block">
              LIMITED AVAILABILITY • 3 OF 6 VILLAS REMAINING
            </span>
            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal mb-3 leading-tight text-white">
              Interested in MYSA Luxe Villas?
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Contact us today to schedule a private viewing and learn more about this exclusive project — and receive detailed brochure information.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#dfb776] text-[#0b0c0e] font-semibold text-xs font-mono uppercase tracking-wider hover:bg-[#c5a880] transition-all shadow-xl cursor-pointer"
            >
              <span>Get in Touch →</span>
            </button>
          </div>
        </div>
      </section>

      {/* 11. Fullscreen High-Resolution Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-serif-luxury text-white tracking-widest uppercase">
                MYSA LUXE VILLAS
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#dfb776] px-2 py-0.5 rounded-xs bg-[#dfb776]/10 border border-[#dfb776]/30">
                {MYSA_VILLA_PHOTOS[lightboxIndex].categoryLabel}
              </span>
            </div>

            {/* Counter */}
            <div className="text-xs font-mono text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-xs">
              <span className="text-white font-semibold">{lightboxIndex + 1}</span>
              <span className="text-gray-500"> / </span>
              <span>{MYSA_VILLA_PHOTOS.length}</span>
            </div>

            {/* Close */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-white border border-white/15 hover:border-red-500/40 text-xs font-mono transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Close (Esc)</span>
            </button>
          </div>

          {/* Center Stage with Previous and Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-3 overflow-hidden">
            {/* Previous Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + MYSA_VILLA_PHOTOS.length) % MYSA_VILLA_PHOTOS.length : 0))}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/20 hover:border-[#dfb776] flex items-center justify-center transition-all shadow-2xl cursor-pointer"
              aria-label="Previous photograph"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <div className="max-h-[66vh] max-w-5xl w-full flex items-center justify-center px-12">
              <img
                src={MYSA_VILLA_PHOTOS[lightboxIndex].imageUrl}
                alt={MYSA_VILLA_PHOTOS[lightboxIndex].title}
                className="max-h-[66vh] max-w-full object-contain rounded-xs border border-white/15 shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={() => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % MYSA_VILLA_PHOTOS.length : 0))}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-black/70 hover:bg-[#dfb776] text-white hover:text-[#0b0c0e] border border-white/20 hover:border-[#dfb776] flex items-center justify-center transition-all shadow-2xl cursor-pointer"
              aria-label="Next photograph"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Details Bar */}
          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-left max-w-2xl">
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#dfb776] mb-1">
                <span>{MYSA_VILLA_PHOTOS[lightboxIndex].area}</span>
                <span className="text-gray-600">•</span>
                <span className="text-gray-400">{MYSA_VILLA_PHOTOS[lightboxIndex].location}</span>
              </div>
              <h4 className="font-serif-luxury text-lg sm:text-xl text-white font-normal">
                {MYSA_VILLA_PHOTOS[lightboxIndex].title}
              </h4>
              <p className="text-xs text-gray-400 font-light mt-1 line-clamp-2">
                {MYSA_VILLA_PHOTOS[lightboxIndex].description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  onOpenVirtualTour();
                }}
                className="px-4 py-2.5 rounded-xs border border-white/20 text-white hover:border-[#dfb776] hover:text-[#dfb776] text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
              >
                3D Tour
              </button>
              <button
                onClick={() => {
                  setLightboxIndex(null);
                  onOpenContact();
                }}
                className="px-5 py-2.5 rounded-xs bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs font-mono uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Inquire on this Space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
