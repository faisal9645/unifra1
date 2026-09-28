import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Compass,
  Phone,
  Mail,
  MapPin,
  FileText,
  Check,
  ChevronDown,
  Play
} from 'lucide-react';
import { AppPage } from './Navbar';
import { ProjectItem } from '../types';
import { SIGNATURE_PROJECTS } from '../data/mockData';
import { saveLead } from '../utils/leadsStorage';

interface UnifraEditorialTemplateProps {
  onOpenConsultation: () => void;
  onNavigatePage: (page: AppPage) => void;
  onOpenVillaAccess?: (source?: string) => void;
  onSelectProject?: (project: ProjectItem) => void;
  isVillaUnlocked?: boolean;
}

export const UnifraEditorialTemplate: React.FC<UnifraEditorialTemplateProps> = ({
  onOpenConsultation,
  onNavigatePage,
  onOpenVillaAccess,
  onSelectProject,
  isVillaUnlocked = false
}) => {
  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    residence: 'MYSA Luxe Villas — ECR'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedSpec, setExpandedSpec] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.emailOrPhone.trim()) return;

    const isEmail = formData.emailOrPhone.includes('@');
    saveLead({
      name: formData.name,
      email: isEmail ? formData.emailOrPhone : `${formData.name.toLowerCase().replace(/\s+/g, '')}@lead.unifra.in`,
      phone: isEmail ? '+91 98840 00000' : formData.emailOrPhone,
      interestedUnit: formData.residence,
      source: 'Editorial Homepage — Begin Your Journey Form',
      notes: 'Requested private presentation from editorial home page.'
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', emailOrPhone: '', residence: 'MYSA Luxe Villas — ECR' });
    }, 4000);
  };

  const handleOpenMysa = () => {
    const mysa = SIGNATURE_PROJECTS.find(p => p.id === 'mysa-villas');
    if (mysa && onSelectProject) {
      onSelectProject(mysa);
    } else if (onOpenVillaAccess) {
      onOpenVillaAccess('Editorial Hero — Mysa Villas');
    } else {
      onNavigatePage('projects');
    }
  };

  const specifications = [
    {
      id: 0,
      number: '01',
      title: 'Materials',
      desc: 'Hand-selected Burmese teakwood, imported Greek Thassos & Italian Statuario marble, acoustic double-glazed thermal glass, and weathered brass hardware.'
    },
    {
      id: 1,
      number: '02',
      title: 'Concept',
      desc: 'Biophilic passive airflow design featuring Scandinavian asymmetrical butterfly rooflines that naturally capture morning marine breezes along the ECR coastline.'
    },
    {
      id: 2,
      number: '03',
      title: 'Space',
      desc: '24ft double-height living pavilions, private interior reflection courtyards, and seamless flush threshold transitions to private reflection lap pools.'
    },
    {
      id: 3,
      number: '04',
      title: 'Sustainability',
      desc: 'Solar-ready infrastructure, dual high-speed EV charging bays, zero-runoff rainwater harvesting, and intelligent circadian twilight lighting.'
    }
  ];

  return (
    <div className="bg-[#faf8f5] text-[#1a1918] font-sans selection:bg-[#c59b67]/20 selection:text-[#1a1918]">
      {/* =========================================================================
          SECTION 1: HERO — "Whispering Sanctuaries."
          ========================================================================= */}
      <section className="relative min-h-screen pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden">
        {/* Subtle architectural background orbital lines (matching reference) */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-35">
          <svg viewBox="0 0 800 800" fill="none" className="w-full h-full stroke-[#d8cebe]">
            <circle cx="400" cy="400" r="380" strokeWidth="0.8" strokeDasharray="4 6" />
            <circle cx="400" cy="400" r="280" strokeWidth="0.8" />
            <circle cx="400" cy="400" r="180" strokeWidth="0.8" strokeDasharray="2 4" />
          </svg>
        </div>

        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-6 xl:col-span-5 pr-0 lg:pr-6 space-y-6 sm:space-y-8">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#c59b67]" />
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c827a] font-medium">
                AN EXCLUSIVE SANCTUARY ON CHENNAI ECR
              </span>
            </div>

            {/* Main Editorial Headline */}
            <h1 className="font-serif-luxury text-5xl sm:text-7xl xl:text-[88px] font-normal tracking-tight text-[#1a1918] leading-[1.04]">
              Whispering
              <br />
              <span className="italic font-serif-luxury text-[#c59b67] font-normal">
                Sanctuaries.
              </span>
            </h1>

            {/* Editorial description */}
            <p className="text-[#68625d] text-base sm:text-lg font-light leading-relaxed max-w-lg">
              Private coastal living nestled between the quiet serenity of Chennai's shoreline and world-class architectural discipline. Each residence is an enduring dialogue with nature.
            </p>

            {/* Actions: Solid Black Button + Watch Film */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                onClick={() => onNavigatePage('projects')}
                className="bg-[#1a1918] hover:bg-[#2b2723] text-white px-8 py-4 text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 hover:shadow-lg hover:shadow-black/10 flex items-center gap-3 group cursor-pointer"
              >
                <span>EXPLORE COLLECTION</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onOpenConsultation()}
                className="text-[#1a1918] hover:text-[#c59b67] text-xs font-medium tracking-[0.2em] uppercase transition-colors flex items-center gap-2.5 py-4 cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full border border-[#1a1918]/30 flex items-center justify-center group-hover:border-[#c59b67]">
                  <Play className="w-2.5 h-2.5 fill-[#1a1918] ml-0.5" />
                </div>
                <span>WATCH FILM</span>
              </button>
            </div>
          </div>

          {/* Right Column: Architectural Arch Window with Video */}
          <div className="lg:col-span-6 xl:col-span-7 flex justify-center lg:justify-end relative">
            {/* The Arch Window Container */}
            <div className="relative w-full max-w-[540px] xl:max-w-[600px] h-[520px] sm:h-[640px] xl:h-[720px] rounded-t-[280px] rounded-b-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.12)] border border-[#eae4db] bg-[#eae5dc] group">
              {/* Desktop Video (hidden on mobile) */}
              <video
                src="/videos/scrollvideo.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="w-full h-full object-cover hidden md:block group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Mobile Video */}
              <video
                src="/videos/mobile_friendly_v.mp4"
                muted
                playsInline
                autoPlay
                loop
                preload="auto"
                className="w-full h-full object-cover md:hidden group-hover:scale-105 transition-transform duration-1000 ease-out"
              />

              {/* Soft lighting overlay to preserve architectural luxury mood */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />

              {/* Floating note card on bottom left of arch window */}
              <div className="absolute bottom-6 left-6 right-6 p-5 sm:p-6 bg-white/92 backdrop-blur-md rounded-lg border border-white/40 shadow-lg">
                <p className="font-serif-luxury italic text-lg sm:text-xl text-[#1a1918] leading-snug">
                  "Where quiet luxury becomes your daily rhythm."
                </p>
                <span className="text-[10px] font-mono tracking-widest text-[#8c827a] uppercase mt-2 block">
                  EAST COAST ROAD • SCANDINAVIAN COASTAL DESIGN
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: "The Residences."
          ========================================================================= */}
      <section id="residences" className="py-20 sm:py-32 bg-[#fbf9f6] border-t border-[#eee9e0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-3">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c827a]">
              CURATED LIVING ON CHENNAI ECR
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight">
              The Residences.
            </h2>
          </div>

          {/* Residence Cards Grid with Arched Tops */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 mb-14">
            {/* Card 1: Mysa Villas (Pool & Modern Facade matching reference) */}
            <div
              onClick={handleOpenMysa}
              className="group cursor-pointer bg-white rounded-t-[100px] rounded-b-[24px] overflow-hidden border border-[#eae4db] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
            >
              <div className="relative h-[380px] sm:h-[480px] overflow-hidden">
                <img
                  src="/images/mysa3d/02A.jpg"
                  alt="Mysa Villas Scandinavian Butterfly Pitched Roof & Reflection Pool"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-8">
                  <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-[#1a1918] rounded-full border border-[#e5ded4]">
                    FLAGSHIP ENCLAVE
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-center justify-between border-t border-[#f0ece4]">
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1a1918] group-hover:text-[#c59b67] transition-colors">
                    Mysa Villas
                  </h3>
                  <p className="text-xs sm:text-sm text-[#766f68] font-light mt-1">
                    Vettuvankeni, East Coast Road • 4-5 BHK Pool Villas
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d8cebe] flex items-center justify-center group-hover:bg-[#1a1918] group-hover:text-white group-hover:border-[#1a1918] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>

            {/* Card 2: Azure Enclave / Unifra Aurelia Oceanfront */}
            <div
              onClick={() => onNavigatePage('projects')}
              className="group cursor-pointer bg-white rounded-t-[100px] rounded-b-[24px] overflow-hidden border border-[#eae4db] shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col"
            >
              <div className="relative h-[380px] sm:h-[480px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                  alt="Azure Enclave Coastal Residence"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute top-6 left-8">
                  <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-[#1a1918] rounded-full border border-[#e5ded4]">
                    OCEANFRONT ESTATES
                  </span>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex items-center justify-between border-t border-[#f0ece4]">
                <div>
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#1a1918] group-hover:text-[#c59b67] transition-colors">
                    Azure Enclave
                  </h3>
                  <p className="text-xs sm:text-sm text-[#766f68] font-light mt-1">
                    Akkarai, East Coast Road • 6,200 Sq.Ft. Mansions
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full border border-[#d8cebe] flex items-center justify-center group-hover:bg-[#1a1918] group-hover:text-white group-hover:border-[#1a1918] transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Wide Callout Banner (Matching reference screenshot) */}
          <div className="rounded-[24px] bg-[#f4f0eb] border border-[#e5ded4] p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center md:text-left">
              <h4 className="font-serif-luxury text-xl sm:text-2xl text-[#1a1918]">
                Curate your own collection of private sanctuary residences.
              </h4>
              <p className="text-xs sm:text-sm text-[#766f68] font-light">
                Discover private plots, beachfront estates, and custom turnkey villas across Chennai.
              </p>
            </div>
            <button
              onClick={() => onNavigatePage('projects')}
              className="bg-[#1a1918] hover:bg-[#2b2723] text-white px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase transition-all duration-300 shrink-0 cursor-pointer"
            >
              VIEW ALL RESIDENCES
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: "Detailing the Sublime." (Materials & Architecture)
          ========================================================================= */}
      <section className="py-20 sm:py-32 bg-[#faf8f5]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Arched Interior Window */}
          <div className="lg:col-span-6 xl:col-span-5">
            <div className="relative max-w-[520px] mx-auto h-[480px] sm:h-[620px] rounded-t-[260px] rounded-b-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.08)] border border-[#eae4db] bg-[#eae5dc]">
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1400&q=80"
                alt="Detailing the Sublime Living Architecture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column: Specifications List */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-8">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c827a]">
                MATERIALS & CRAFTSMANSHIP
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight mt-2">
                Detailing the
                <br />
                <span className="italic font-serif-luxury text-[#c59b67]">
                  Sublime.
                </span>
              </h2>
            </div>

            {/* Specifications list */}
            <div className="divide-y divide-[#e5ded4] border-t border-b border-[#e5ded4]">
              {specifications.map((spec) => (
                <div
                  key={spec.id}
                  onClick={() => setExpandedSpec(expandedSpec === spec.id ? null : spec.id)}
                  className="py-5 sm:py-6 cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <span className="text-xs font-mono text-[#c59b67] font-semibold">
                        {spec.number}
                      </span>
                      <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#1a1918] group-hover:text-[#c59b67] transition-colors">
                        {spec.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#8c827a] transition-transform duration-300 ${expandedSpec === spec.id ? 'rotate-180 text-[#c59b67]' : ''}`} />
                  </div>

                  {expandedSpec === spec.id && (
                    <p className="mt-3 text-sm text-[#68625d] font-light leading-relaxed pl-9 animate-in fade-in duration-200">
                      {spec.desc}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* CTA action */}
            <div className="pt-2">
              <button
                onClick={() => onOpenConsultation()}
                className="text-[#1a1918] hover:text-[#c59b67] text-xs font-medium tracking-[0.2em] uppercase transition-colors flex items-center gap-3 py-2 cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-full border border-[#1a1918]/20 flex items-center justify-center group-hover:border-[#c59b67] transition-colors">
                  <FileText className="w-3.5 h-3.5 text-[#1a1918] group-hover:text-[#c59b67] transition-colors" />
                </div>
                <span>DOWNLOAD ARCHITECTURAL MANIFESTO</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: "Artistry in Living."
          ========================================================================= */}
      <section className="py-20 sm:py-32 bg-[#fbf9f6] border-t border-[#eee9e0]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Narrative & Metrics */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c827a]">
              THE SANCTUARY EXPERIENCE
            </span>
            <h2 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight">
              Artistry in
              <br />
              <span className="italic font-serif-luxury text-[#c59b67]">
                Living.
              </span>
            </h2>

            <p className="text-[#68625d] text-base font-light leading-relaxed">
              Every detail is calibrated to celebrate coastal tranquility. High ceilings, shaded verandahs, and ocean air create an effortless indoor-outdoor flow designed for generations.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#e5ded4]">
              <div>
                <span className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#1a1918]">
                  80%
                </span>
                <p className="text-xs font-mono tracking-widest text-[#8c827a] uppercase mt-1">
                  GREENERY & OPEN COURTYARDS
                </p>
              </div>
              <div>
                <span className="font-serif-luxury text-4xl sm:text-5xl font-normal text-[#1a1918]">
                  100%
                </span>
                <p className="text-xs font-mono tracking-widest text-[#8c827a] uppercase mt-1">
                  BESPOKE PRIVACY & SECURITY
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bedroom Suite Image with Floating Circular Badge */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[640px] h-[440px] sm:h-[560px] rounded-[28px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.1)] border border-[#eae4db]">
              <img
                src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1400&q=80"
                alt="Luxury Master Bedroom Suite"
                className="w-full h-full object-cover"
              />

              {/* Floating Circular Black Luxury Seal Button (Matches reference image) */}
              <button
                onClick={() => onOpenConsultation()}
                className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#1a1918] text-white flex flex-col items-center justify-center p-2 shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer group border-2 border-white/20"
              >
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-center leading-tight">
                  BOOK A
                  <br />
                  <strong className="text-[#c59b67] font-serif-luxury text-xs sm:text-sm">VISIT</strong>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#c59b67] mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: FULL-WIDTH EDITORIAL TESTIMONIAL QUOTE
          ========================================================================= */}
      <section className="py-24 sm:py-36 px-6 sm:px-10 lg:px-12 bg-[#faf8f5] text-center border-t border-[#eee9e0]">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="font-serif-luxury italic text-2xl sm:text-4xl md:text-5xl text-[#1a1918] leading-[1.25] tracking-tight">
            "Unifra didn't just build homes; they created an aesthetic discipline with timeless elegance. Our villa on ECR is more than a home; it's a sanctuary."
          </p>
          <div className="pt-4">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#1a1918] font-semibold block">
              MR. VIKRAM CHANDRAN
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8c827a] uppercase mt-1 block">
              RESIDENT, MYSA ECR • ARCHITECTURAL PATRON
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: "Begin your journey." (Enquiry & Private Consultation)
          ========================================================================= */}
      <section id="contact" className="py-16 sm:py-24 bg-[#faf8f5]">
        <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
          <div className="rounded-[32px] bg-[#f4f0eb] border border-[#e5ded4] p-8 sm:p-14 lg:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#8c827a]">
                PRIVATE CONSULTATION
              </span>
              <h2 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight">
                Begin your
                <br />
                <span className="italic font-serif-luxury text-[#c59b67]">
                  journey.
                </span>
              </h2>

              <p className="text-[#68625d] text-sm sm:text-base font-light leading-relaxed">
                Schedule a discreet preview at our ECR Experience Pavilion or request a private architectural portfolio presentation.
              </p>

              <div className="pt-4 space-y-3 text-xs sm:text-sm font-mono text-[#1a1918]">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#c59b67]" />
                  <span>East Coast Road, Chennai, Tamil Nadu</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-[#c59b67]" />
                  <span>+91 73582 22445 / Concierge Desk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-[#c59b67]" />
                  <span>private@unifra.in</span>
                </div>
              </div>
            </div>

            {/* Right Column: Minimalist Form */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-[24px] border border-[#eae4db] shadow-sm">
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#c59b67]/10 text-[#c59b67] flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-luxury text-2xl text-[#1a1918]">
                    Inquiry Received
                  </h3>
                  <p className="text-sm text-[#68625d] font-light max-w-sm mx-auto">
                    Our Senior Architectural Advisory will contact you within 2 business hours for a private consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8c827a] block mb-2">
                      YOUR FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Singhania"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#e5ded4] px-4 py-3.5 text-sm text-[#1a1918] placeholder-[#a8a199] rounded-sm focus:outline-none focus:border-[#1a1918]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8c827a] block mb-2">
                      PHONE NUMBER OR EMAIL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 98840 00000 or client@domain.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#e5ded4] px-4 py-3.5 text-sm text-[#1a1918] placeholder-[#a8a199] rounded-sm focus:outline-none focus:border-[#1a1918]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono tracking-widest uppercase text-[#8c827a] block mb-2">
                      PREFERRED RESIDENCE
                    </label>
                    <select
                      value={formData.residence}
                      onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                      className="w-full bg-[#faf8f5] border border-[#e5ded4] px-4 py-3.5 text-sm text-[#1a1918] rounded-sm focus:outline-none focus:border-[#1a1918]"
                    >
                      <option value="MYSA Luxe Villas — ECR">MYSA Luxe Villas — ECR (₹ 5.85 Cr*)</option>
                      <option value="Azure Enclave — Akkarai">Azure Enclave — Akkarai (₹ 7.45 Cr*)</option>
                      <option value="Custom Beachfront Land Parcel">Custom Beachfront Land Parcel</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#1a1918] hover:bg-[#2b2723] text-white py-4 text-xs font-medium tracking-[0.22em] uppercase transition-all duration-300 cursor-pointer"
                    >
                      REQUEST PRIVATE PRESENTATION
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};
