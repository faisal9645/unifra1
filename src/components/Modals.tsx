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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-[#faf8f5] rounded-[24px] shadow-2xl border border-[#eae4db] overflow-hidden text-[#1a1918]">
        {/* Modal Header */}
        <div className="bg-[#f4f0eb] p-6 sm:p-8 flex items-start justify-between border-b border-[#eae4db]">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#c59b67] block mb-1 font-semibold">
              PRIVATE CONCIERGE
            </span>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1a1918]">
              Schedule a VIP Site Visit
            </h3>
            <p className="text-[#68625d] text-xs mt-1 font-light">
              Experience the craftsmanship and tranquil coastal air of Vettuvankeni in person.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-sm border border-[#d8cebe] hover:border-[#1a1918] text-[#68625d] hover:text-[#1a1918] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#c59b67]/15 border border-[#c59b67] text-[#c59b67] flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-luxury text-2xl font-normal text-[#1a1918]">
                Reservation Confirmed
              </h4>
              <p className="text-xs sm:text-sm text-[#68625d] max-w-md mx-auto leading-relaxed font-light">
                Thank you, <span className="font-semibold text-[#1a1918]">{formData.name}</span>. Our Senior Villa Advisor will contact you at <span className="font-semibold text-[#c59b67]">{formData.phone}</span> to coordinate your private guided walkthrough.
              </p>
              <div className="bg-white p-4 rounded-sm border border-[#eae4db] text-left max-w-md mx-auto text-xs space-y-2 font-mono text-[#68625d]">
                <div><strong className="text-[#1a1918]">Project:</strong> {formData.project}</div>
                <div><strong className="text-[#1a1918]">Requested Slot:</strong> {formData.preferredDate || 'Upcoming Weekend'} • {formData.preferredTime}</div>
                <div><strong className="text-[#1a1918]">Chauffeur Pick-up:</strong> {formData.chauffeurPickUp ? 'Requested' : 'Self-Driven'}</div>
              </div>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-[#1a1918] text-white rounded-sm text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#2b2723] transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#8c827a] absolute left-3 top-3.5" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Mr. Siddharth Rao"
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] placeholder:text-[#8c827a]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Phone Number *</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#8c827a] absolute left-3 top-3.5" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98400 XXXXX"
                      className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] font-mono placeholder:text-[#8c827a]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-[#8c827a] absolute left-3 top-3.5" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="siddharth@domain.com"
                    className="w-full pl-9 pr-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] font-mono placeholder:text-[#8c827a]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Select Development</label>
                <select
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] font-mono text-xs cursor-pointer"
                >
                  <option>MYSA Luxe Villas (Vettuvankeni ECR)</option>
                  <option>Azure Enclave (ECR)</option>
                  <option>The Pearl Residences (ECR)</option>
                  <option>Orchid Gardens (Kottivakkam)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#68625d] mb-1">Time Window</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-[#d8cebe] focus:outline-none focus:border-[#1a1918] bg-white text-[#1a1918] cursor-pointer"
                  >
                    <option>10:00 AM - Morning Light</option>
                    <option>02:30 PM - Afternoon</option>
                    <option>05:00 PM - Sunset Experience</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Mercedes Chauffeur Service */}
              <div className="p-3.5 rounded-sm bg-white border border-[#eae4db] flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center text-[#c59b67]">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[#1a1918] text-xs">Complimentary Chauffeur Pick-up</div>
                    <div className="text-[10px] text-[#68625d] font-light">Private luxury pickup from your residence or airport</div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.chauffeurPickUp}
                  onChange={(e) => setFormData({ ...formData, chauffeurPickUp: e.target.checked })}
                  className="w-4 h-4 accent-[#1a1918]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-md cursor-pointer"
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-5xl h-[85vh] bg-[#faf8f5] rounded-[24px] overflow-hidden flex flex-col shadow-2xl border border-[#eae4db]">
        {/* Top Header Controls */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#eae4db] bg-[#f4f0eb] z-20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#c59b67] animate-pulse" />
            <div>
              <h3 className="text-[#1a1918] font-serif-luxury text-base sm:text-xl font-normal leading-snug">
                {viewMode === 'video'
                  ? 'Unifra MYSA Official Walkthrough Film'
                  : rooms[currentRoom].name}
              </h3>
              <div className="text-[10px] font-mono text-[#8c827a]">
                {viewMode === 'video'
                  ? 'HD Official Video Tour • Vettuvankeni ECR Gated Villa Enclave'
                  : `${rooms[currentRoom].level} • ${rooms[currentRoom].specs}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Switcher */}
            <div className="bg-white p-1 rounded-full border border-[#eae4db] flex items-center gap-1 shadow-sm">
              <button
                onClick={() => setViewMode('video')}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === 'video'
                    ? 'bg-[#1a1918] text-white font-semibold shadow-sm'
                    : 'text-[#68625d] hover:text-[#1a1918]'
                }`}
              >
                <Video className="w-3.5 h-3.5" />
                <span>Official Video</span>
              </button>
              <button
                onClick={() => setViewMode('360')}
                className={`px-3 py-1.5 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                  viewMode === '360'
                    ? 'bg-[#1a1918] text-white font-semibold shadow-sm'
                    : 'text-[#68625d] hover:text-[#1a1918]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>360° View</span>
              </button>
            </div>

            {viewMode === '360' && (
              <button
                onClick={() => setPanX(0)}
                className="p-2 rounded-sm border border-[#d8cebe] hover:border-[#1a1918] text-[#1a1918] transition-colors cursor-pointer"
                title="Recenter view"
              >
                <RotateCw className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-sm border border-[#d8cebe] hover:border-[#1a1918] text-[#1a1918] transition-colors cursor-pointer"
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
              className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing select-none bg-[#eae5dc]"
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
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#eae4db] text-[#1a1918] text-[10px] font-mono pointer-events-none flex items-center gap-2 shadow-md">
                <span>← DRAG HORIZONTALLY TO ROTATE 360° VIEW →</span>
              </div>
            </div>

            {/* Bottom Room Selector Tabs */}
            <div className="p-4 bg-[#f4f0eb] border-t border-[#eae4db] flex flex-wrap items-center justify-center gap-2 z-20">
              {(Object.keys(rooms) as (keyof typeof rooms)[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentRoom(key);
                    setPanX(0);
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    currentRoom === key
                      ? 'bg-[#1a1918] text-white font-medium shadow-md'
                      : 'bg-white text-[#68625d] hover:text-[#1a1918] border border-[#d8cebe]'
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-white rounded-[24px] overflow-hidden border border-[#eae4db] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-sm bg-white/90 backdrop-blur-md border border-[#d8cebe] hover:border-[#1a1918] text-[#1a1918] transition-colors cursor-pointer shadow-sm"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative h-[380px] sm:h-[460px] bg-[#eae5dc]">
          <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 sm:p-8 bg-[#faf8f5] border-t border-[#eae4db] text-left">
          <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#c59b67]/15 text-[#c59b67] font-semibold border border-[#c59b67]/30">
            {item.category}
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mt-2.5 mb-1.5 text-[#1a1918]">
            {item.title}
          </h3>
          <p className="text-[#68625d] text-xs sm:text-sm max-w-xl mb-3 font-light leading-relaxed">
            {item.description}
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-[#8c827a] pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c59b67]" />
              {item.location}
            </span>
            <span>•</span>
            <span>{item.area}</span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-2xl bg-[#faf8f5] rounded-[24px] overflow-hidden shadow-2xl border border-[#eae4db] max-h-[85vh] flex flex-col text-[#1a1918]">
        <div className="relative h-64 sm:h-72 flex-shrink-0">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-sm bg-white/80 backdrop-blur-md border border-white/40 hover:border-[#1a1918] text-[#1a1918] transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white text-left">
            <span className="px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase bg-white/95 backdrop-blur-md text-[#1a1918] font-semibold border border-white/20">
              {post.tag}
            </span>
            <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal mt-2 text-white drop-shadow">
              {post.title}
            </h3>
            <div className="text-xs text-[#c59b67] font-mono mt-1 drop-shadow">
              {post.date} • {post.readTime}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#68625d] leading-relaxed text-left font-light">
          {post.content.map((paragraph, idx) => (
            <p key={idx} className="first-of-type:font-medium first-of-type:text-[#1a1918]">
              {paragraph}
            </p>
          ))}

          <div className="pt-6 mt-6 border-t border-[#eae4db] flex items-center justify-between">
            <div className="text-[10px] text-[#8c827a] font-mono uppercase tracking-wider">Published by Unifra Design Studio</div>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-sm bg-[#1a1918] text-white text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#2b2723] transition-colors cursor-pointer"
            >
              Done Reading
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
