import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Lock,
  KeyRound,
  CheckCircle2,
  Shield,
  ShieldCheck,
  User,
  Phone,
  Mail,
  MapPin,
  Building,
  ArrowRight,
  Sparkles,
  Clock,
  Eye
} from 'lucide-react';
import { ProjectItem } from '../types';
import { saveLead } from '../utils/leadsStorage';

export interface ClientDetails {
  name: string;
  phone: string;
  email: string;
  city: string;
  timeline: string;
  interestedUnit?: string;
  notes?: string;
}

interface VillaAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  onSuccess: (clientDetails: ClientDetails) => void;
  source?: string;
}

export const VillaAccessModal: React.FC<VillaAccessModalProps> = ({
  isOpen,
  onClose,
  project,
  onSuccess,
  source = 'Villa Showcase Gate'
}) => {
  const [formData, setFormData] = useState<ClientDetails>({
    name: '',
    phone: '',
    email: '',
    city: 'Chennai',
    timeline: 'Immediate (0 – 30 Days)',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Reset states on open
  useEffect(() => {
    if (isOpen) {
      setIsGranted(false);
      setIsSubmitting(false);
      setErrorMessage('');
      // Pre-fill existing lead if saved in session
      const savedName = sessionStorage.getItem('unifra_client_name') || '';
      const savedPhone = sessionStorage.getItem('unifra_client_phone') || '';
      const savedEmail = sessionStorage.getItem('unifra_client_email') || '';
      if (savedName || savedPhone || savedEmail) {
        setFormData(prev => ({
          ...prev,
          name: savedName || prev.name,
          phone: savedPhone || prev.phone,
          email: savedEmail || prev.email
        }));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Primary validation: Phone number and Email address mainly
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMessage('Please provide a valid contact phone number.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const clientName = formData.name.trim() || 'Valued Guest';

    setIsSubmitting(true);

    // Save lead details to CRM Leads database & session
    try {
      saveLead({
        name: clientName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city || 'Chennai',
        timeline: formData.timeline || 'Immediate (0 – 30 Days)',
        interestedUnit: formData.interestedUnit || (project ? project.name : 'MYSA Luxe Villas'),
        source: source || 'Menu - Mysa Villa Showcase',
        notes: formData.notes
      });
    } catch {
      // safe storage fallback
    }

    // Trigger luxury celebratory confetti
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#dfb776', '#c5a880', '#ffffff', '#e5c158']
      });
    } catch {
      // safe fallback
    }

    setIsGranted(true);
    setIsSubmitting(false);

    // After a brief delight transition, notify parent to unlock & navigate to villa page
    setTimeout(() => {
      onSuccess({
        ...formData,
        name: clientName
      });
    }, 1000);
  };

  const activeProjectName = project ? project.name : 'MYSA Luxe Villas';
  const activeLocation = project ? project.location : 'Vettuvankeni, ECR Chennai';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#121418] rounded-sm shadow-2xl border border-[#dfb776]/40 overflow-hidden text-[#f3f4f6]">
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 bg-[#dfb776]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="bg-[#0b0c0e] p-6 sm:p-7 flex items-start justify-between border-b border-white/10 relative z-10">
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm bg-[#dfb776]/15 border border-[#dfb776]/40 text-[#dfb776] text-[10px] font-mono uppercase tracking-widest font-semibold">
                <KeyRound className="w-3 h-3 text-[#dfb776]" />
                <span>EXCLUSIVE VILLA SHOWCASE ACCESS</span>
              </span>
            </div>
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white">
              Unlock {activeProjectName}
            </h3>
            <p className="text-gray-400 text-xs mt-1.5 font-light leading-relaxed max-w-md">
              Submit your details to gain instant access to architectural floorplans, high-res galleries, unit availability, and pricing schedules.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-sm border border-white/10 hover:border-[#dfb776] text-gray-400 hover:text-white transition-colors cursor-pointer flex-shrink-0 ml-3"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[78vh] overflow-y-auto relative z-10">
          {isGranted ? (
            <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#dfb776]/20 border border-[#dfb776] text-[#dfb776] flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#dfb776] block mb-1">
                  ACCESS GRANTED
                </span>
                <h4 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white">
                  Welcome to {activeProjectName}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto leading-relaxed font-light">
                Your credentials have been verified. Opening the full architectural showcase and floorplans...
              </p>
              <div className="pt-2 flex items-center justify-center gap-2 text-xs font-mono text-[#dfb776]">
                <span className="w-2 h-2 rounded-full bg-[#dfb776] animate-ping" />
                <span>Redirecting to Villa Showcase...</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {/* Project Preview Badge */}
              <div className="p-3.5 rounded-sm bg-black/40 border border-white/10 flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-sm overflow-hidden bg-black flex-shrink-0 border border-white/10">
                  <img
                    src={project?.imageUrl || '/images/mysa3d/02A.jpg'}
                    alt={activeProjectName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-white text-xs font-semibold truncate font-serif-luxury">
                    {activeProjectName}
                  </div>
                  <div className="text-[11px] text-[#dfb776] flex items-center gap-1 font-mono truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span>{activeLocation}</span>
                  </div>
                  <div className="text-[10px] text-gray-400 font-light mt-0.5">
                    4 & 5 BHK Swedish Coastal Villas • 3 of 6 Available
                  </div>
                </div>
              </div>

              {/* What You'll Unlock Pills */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="p-2 rounded-sm bg-[#0b0c0e] border border-white/5 text-center">
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">FLOORPLANS</div>
                  <div className="text-[11px] text-[#dfb776] font-semibold mt-0.5">G + 2 Layouts</div>
                </div>
                <div className="p-2 rounded-sm bg-[#0b0c0e] border border-white/5 text-center">
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">PRICING</div>
                  <div className="text-[11px] text-[#dfb776] font-semibold mt-0.5">From ₹5.85 Cr*</div>
                </div>
                <div className="p-2 rounded-sm bg-[#0b0c0e] border border-white/5 text-center">
                  <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider">PROGRESS</div>
                  <div className="text-[11px] text-[#dfb776] font-semibold mt-0.5">Live On-Site</div>
                </div>
              </div>

              {errorMessage && (
                <div className="p-2.5 rounded-sm bg-red-950/50 border border-red-500/40 text-red-300 text-xs">
                  {errorMessage}
                </div>
              )}

              {/* Notice that Phone & Email are mainly required */}
              <div className="p-3 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#dfb776] shrink-0 mt-0.5" />
                <div className="text-[11px] text-gray-300 font-light leading-snug">
                  <span className="font-semibold text-white">Direct Verification:</span> Enter your <span className="text-[#dfb776] font-semibold">Phone Number</span> and <span className="text-[#dfb776] font-semibold">Email Address</span> below to immediately unlock the villa page, architectural plans, and view stored records in <span className="font-mono text-[#dfb776]">/admin</span>.
                </div>
              </div>

              {/* Primary Fields: Phone Number & Email Address (Mainly Required) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-[#dfb776] font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3 h-3 text-[#dfb776]" />
                      <span>PHONE NUMBER *</span>
                    </span>
                    <span className="text-[9px] text-[#dfb776]/80 lowercase font-mono">required</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-[#dfb776]/40 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs font-mono placeholder:text-gray-600 transition-colors shadow-inner"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-[#dfb776] font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#dfb776]" />
                      <span>EMAIL ADDRESS *</span>
                    </span>
                    <span className="text-[9px] text-[#dfb776]/80 lowercase font-mono">required</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-[#dfb776]/40 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs placeholder:text-gray-600 transition-colors shadow-inner"
                  />
                </div>
              </div>

              {/* Secondary Fields: Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-gray-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3 h-3 text-gray-400" />
                      <span>FULL NAME</span>
                    </span>
                    <span className="text-[9px] text-gray-500 lowercase font-mono">optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="E.g. Siddharth Rao (Optional)"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs placeholder:text-gray-600 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono tracking-widest uppercase text-gray-400 flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-gray-400" />
                    <span>CURRENT CITY</span>
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-sm border border-white/15 focus:outline-none focus:border-[#dfb776] bg-[#0b0c0e] text-white text-xs cursor-pointer transition-colors"
                  >
                    <option value="Chennai">Chennai (Local Resident)</option>
                    <option value="Bengaluru">Bengaluru / Karnataka</option>
                    <option value="Mumbai">Mumbai / Maharashtra</option>
                    <option value="Hyderabad">Hyderabad / Telangana</option>
                    <option value="Delhi-NCR">Delhi / NCR</option>
                    <option value="NRI - UAE/Gulf">NRI (UAE / Dubai / Middle East)</option>
                    <option value="NRI - USA/Canada">NRI (USA / Canada)</option>
                    <option value="NRI - Singapore/UK">NRI (Singapore / UK / Europe)</option>
                    <option value="Other">Other City / Overseas</option>
                  </select>
                </div>
              </div>

              {/* Timeline for Purchase */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono tracking-widest uppercase text-gray-300 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#dfb776]" />
                  <span>ESTIMATED PURCHASE TIMELINE</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  {[
                    'Immediate (0 – 30 Days)',
                    '1 – 3 Months',
                    '3 – 6 Months',
                    'Exploring Options'
                  ].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeline: option })}
                      className={`p-2 rounded-sm border text-center transition-all cursor-pointer ${
                        formData.timeline === option
                          ? 'border-[#dfb776] bg-[#dfb776]/15 text-[#dfb776] font-semibold'
                          : 'border-white/10 bg-[#0b0c0e] text-gray-400 hover:text-white hover:border-white/25'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidentiality Notice */}
              <div className="pt-2 flex items-center gap-2 text-[11px] text-gray-400 font-light">
                <Shield className="w-3.5 h-3.5 text-[#dfb776] shrink-0" />
                <span>Your information remains strictly confidential with Unifra Private Client Advisory.</span>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-4 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-2xl cursor-pointer flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <Eye className="w-4 h-4" />
                <span>{isSubmitting ? 'VERIFYING DETAILS...' : 'UNLOCK & VIEW VILLA SHOWCASE'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
