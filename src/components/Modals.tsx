import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Car,
  CheckCircle2,
  RotateCw,
  MapPin,
  User,
  Phone,
  Mail,
  Video,
  Compass
} from 'lucide-react';
import { GalleryItem, ProjectItem, BlogPost } from '../types';
import { saveLead } from '../utils/leadsStorage';

/* =========================================================================
   1. VIP SITE VISIT & CONSULTATION MODAL
   ========================================================================= */
interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject?: ProjectItem | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  selectedProject
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    project: selectedProject ? selectedProject.name : 'MYSA Luxe Villas (Vettuvankeni ECR)',
    preferredDate: '',
    preferredTime: '11:00 AM - Morning',
    chauffeurPickUp: true,
    pickupLocation: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setFormData((prev) => ({ ...prev, project: selectedProject.name }));
    }
  }, [selectedProject]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      saveLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        interestedUnit: formData.project,
        source: 'Concierge Site Visit Consultation',
        notes: `Preferred: ${formData.preferredDate || 'Flexible'} at ${formData.preferredTime}. Chauffeur: ${formData.chauffeurPickUp ? 'Yes (' + formData.pickupLocation + ')' : 'No'}.`,
        status: 'VIP Visit Scheduled'
      });
    } catch {
      // safe fallback
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#dfb776', '#c5a880', '#ffffff', '#e5c158']
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#121418] rounded-sm shadow-2xl border border-white/10 overflow-hidden text-[#f3f4f6]">
        {/* Modal Header */}
        <div className="bg-[#0b0c0e] p-6 sm:p-8 flex items-start justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#dfb776] block mb-1">
              PRIVATE CONCIERGE
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white">
              Schedule a VIP Site Visit
            </h3>
            <p className="text-gray-400 text-xs mt-1 font-light">
              Experience the craftsmanship and tranquil coastal air of Vettuvankeni in person.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-sm border border-white/10 hover:border-[#dfb776] text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-normal text-white">
                Reservation Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed font-light">
                Thank you, <span className="font-semibold text-white">{formData.name}</span>. Our Senior Villa Advisor will contact you at <span className="font-semibold text-[#dfb776]">{formData.phone}</span> to coordinate your private guided walkthrough.
              </p>
              <div className="bg-black/40 p-4 rounded-sm border border-white/10 text-left max-w-md mx-auto text-xs space-y-2 font-mono text-gray-400">
                <div><strong className="text-white">Project:</strong> {formData.project}</div>
                <div><strong className="text-white">Requested Slot:</strong> {formData.preferredDate || 'Upcoming Weekend'} • {formData.preferredTime}</div>
                <div><strong className="text-white">Chauffeur Pick-up:</strong> {formData.chauffeurPickUp ? 'Requested' : 'Self-Driven'}</div>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-[#dfb776] text-[#0b0c0e] rounded-sm text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#c5a880] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Mr. Siddharth Rao"
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-black/40 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 XXXXX"
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-black/40 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-gray-500 absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="siddharth@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-black/40 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Select Development</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white font-mono text-xs"
                >
                  <option>MYSA Luxe Villas (Vettuvankeni ECR)</option>
                  <option>The Pearl Residences (ECR)</option>
                  <option>Orchid Gardens (Kottivakkam)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-black/40 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-gray-400 mb-1">Time Window</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white"
                  >
                    <option>10:00 AM - Morning Light</option>
                    <option>02:30 PM - Afternoon</option>
                    <option>05:00 PM - Sunset Experience</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Mercedes Chauffeur Service */}
              <div className="p-3.5 rounded-sm bg-black/40 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center text-[#dfb776]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs">Complimentary Chauffeur Pick-up</div>
                    <div className="text-[10px] text-gray-400 font-light">Private luxury pickup from your residence or airport</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.chauffeurPickUp}
                  onChange={(e) => setFormData({ ...formData, chauffeurPickUp: e.target.checked })}
                  className="w-4 h-4 accent-[#dfb776]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl cursor-pointer"
              >
                Confirm Site Visit Booking →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. 360° INTERACTIVE VIRTUAL WALKTHROUGH SIMULATOR
   ========================================================================= */
interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'video' | '360'>('video');
  const [currentRoom, setCurrentRoom] = useState<'living' | 'master' | 'salon' | 'terrace' | 'kitchen' | 'lounge'>('living');
  const [panX, setPanX] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  // YouTube Video ID provided by user: XuMGAoSu3HE
  const youtubeVideoId = 'XuMGAoSu3HE';
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;

  const rooms = {
    living: {
      name: 'Double-Height Great Room',
      level: 'Ground Floor Central Atrium',
      imageUrl: '/images/mysa3d/LIVING-VIEW1.jpg',
      specs: '22-Ft Ceiling Volume • Floating Timber Stairs • Double-Ring Chandelier'
    },
    master: {
      name: 'Master Sanctuary Loft Suite',
      level: 'Level 1 East Wing',
      imageUrl: '/images/mysa3d/MASTER-BEDROOM5.jpg',
      specs: 'Cathedral Volume • Exposed Timber Rafters • Balcony Glazing'
    },
    salon: {
      name: 'Furnished Living Salon',
      level: 'Ground Level Residence',
      imageUrl: '/images/mysa3d/BAX09923.jpg',
      specs: 'Solid Teak Furnishings • Built-in Media Wall • Sheer Linen Drapes & Recessed Lighting'
    },
    terrace: {
      name: 'Scandinavian Butterfly Gable',
      level: 'Level 2 Elevation & Façade',
      imageUrl: '/images/mysa3d/02A.jpg',
      specs: 'Angled Zinc-Bronze Roof • Clerestory Gable Window • Cantilevered Planter'
    },
    kitchen: {
      name: 'Minimalist Culinary Studio',
      level: 'Ground Level Culinary Wing',
      imageUrl: '/images/mysa3d/KITCHEN.jpg',
      specs: 'Calacatta Marble Backsplash • Integrated Oven Tower • Blum Touch-to-Open Joinery'
    },
    lounge: {
      name: 'Family Mezzanine Lounge',
      level: 'Level 1 Entertainment',
      imageUrl: '/images/mysa3d/LOUNGE.jpg',
      specs: 'First Floor Entertainment Salon • Engineered Oak • Bespoke Credenza'
    }
  };

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX - panX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const newPan = e.clientX - startX.current;
    setPanX(Math.max(-280, Math.min(280, newPan)));
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#0b0c0e] rounded-sm overflow-hidden flex flex-col shadow-2xl border border-white/10">
        {/* Top Header Controls */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 bg-[#121418] z-20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#dfb776] animate-pulse" />
            <div>
              <h3 className="text-white font-serif-luxury text-base sm:text-xl font-normal leading-snug">
                {viewMode === 'video'
                  ? 'Unifra MYSA Official Walkthrough Film'
                  : rooms[currentRoom].name}
              </h3>
              <div className="text-[10px] font-mono text-gray-400">
                {viewMode === 'video'
                  ? 'HD Official Video Tour • Vettuvankeni ECR Gated Villa Enclave'
                  : `${rooms[currentRoom].level} • ${rooms[currentRoom].specs}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Switcher */}
            <div className="bg-black/60 p-1 rounded-sm border border-white/10 flex items-center gap-1">
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1.5 rounded-sm text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Official Video</span>
              </button>
              <button
                onClick={() => setViewMode('360')}
                className={`px-3 py-1.5 rounded-sm text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === '360'
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>360° View</span>
              </button>
            </div>

            {viewMode === '360' && (
              <button
                onClick={() => setPanX(0)}
                className="p-2 rounded-sm border border-white/10 hover:border-[#dfb776] text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Recenter view"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-sm border border-white/10 hover:border-[#dfb776] text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Body */}
        {viewMode === 'video' ? (
          <div className="relative flex-1 w-full bg-black flex items-center justify-center overflow-hidden">
            <iframe
              src={youtubeEmbedUrl}
              title="Unifra MYSA Official Walkthrough & Cinematic Film"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        ) : (
          <>
            {/* 360 Pan Canvas Simulation */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            >
              <div
                style={{
                  transform: `scale(1.15) translateX(${panX * 0.4}px)`,
                  transition: isDragging.current ? 'none' : 'transform 0.4s ease-out'
                }}
                className="w-full h-full"
              >
                <img
                  src={rooms[currentRoom].imageUrl}
                  alt={rooms[currentRoom].name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Centered Drag Indicator */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-sm border border-white/15 text-[#dfb776] text-[10px] font-mono pointer-events-none flex items-center gap-2">
                <span>← DRAG HORIZONTALLY TO ROTATE 360° VIEW →</span>
              </div>
            </div>

            {/* Bottom Room Selector Tabs */}
            <div className="p-4 bg-[#121418] border-t border-white/10 flex flex-wrap items-center justify-center gap-2 z-20">
              {(Object.keys(rooms) as (keyof typeof rooms)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentRoom(key);
                    setPanX(0);
                  }}
                  className={`px-4 py-2 rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    currentRoom === key
                      ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-lg'
                      : 'bg-black/40 text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {rooms[key].name}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   3. GALLERY LIGHTBOX MODAL
   ========================================================================= */
interface GalleryLightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#121418] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-sm bg-black/70 border border-white/15 hover:border-[#dfb776] text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-[420px] sm:h-[500px]">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-black/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-[#dfb776] text-[#0b0c0e] font-semibold">
              {item.category}
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mt-2 mb-1">
              {item.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm max-w-xl mb-3 font-light">
              {item.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfb776]" />
                {item.location}
              </span>
              <span>•</span>
              <span>{item.area}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. BLOG ARTICLE READER MODAL
   ========================================================================= */
interface ArticleReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#121418] rounded-sm overflow-hidden shadow-2xl border border-white/10 max-h-[85vh] flex flex-col text-[#f3f4f6]">
        <div className="relative h-64 sm:h-72 flex-shrink-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-black/40 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-sm bg-black/70 border border-white/15 hover:border-[#dfb776] text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-[#dfb776] text-[#0b0c0e] font-semibold">
              {post.tag}
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal mt-2">
              {post.title}
            </h3>
            <div className="text-xs text-[#dfb776] font-mono mt-1">
              {post.date} • {post.readTime}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed text-left font-light">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="first-of-type:font-normal first-of-type:text-white">
              {paragraph}
            </p>
          ))}

          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
            <div className="text-[10px] text-gray-500 font-mono uppercase tracking-wider">Published by Unifra Design Studio</div>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-sm bg-[#dfb776] text-[#0b0c0e] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#c5a880] transition-colors"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
