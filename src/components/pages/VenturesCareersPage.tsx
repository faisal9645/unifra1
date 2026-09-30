import React, { useState } from 'react';
import { Briefcase, Handshake, ArrowRight, MapPin, Clock } from 'lucide-react';

interface VenturesCareersPageProps {
  type: 'ventures' | 'careers';
  onOpenContact: () => void;
}

const VENTURE_MODELS = [
  {
    index: '01',
    title: 'Prime Land Acquisition',
    desc: 'Direct outright purchase of clear-titled residential land plots in Chennai from 2 grounds up to 5 acres.'
  },
  {
    index: '02',
    title: 'Joint Development (JD)',
    desc: 'Attractive revenue or area-sharing models backed by bank guarantees, architectural excellence, and fast turnarounds.'
  },
  {
    index: '03',
    title: 'Turnkey Villa Development',
    desc: 'End-to-end bespoke villa construction for private landowners seeking Swedish or European contemporary design.'
  }
];

const OPEN_ROLES = [
  {
    title: 'Senior Architectural Project Manager',
    type: 'Full-time',
    location: 'Chennai (T. Nagar HQ & ECR Sites)',
    exp: '5-8 Years',
    desc: 'Lead execution of luxury villa enclaves, oversee structural contractors, and enforce high-tolerance finishes.'
  },
  {
    title: 'Interior Design Curator & 3D Visualizer',
    type: 'Full-time',
    location: 'Chennai HQ',
    exp: '3-5 Years',
    desc: 'Curate Scandinavian and European interior palettes, millwork joinery details, and spatial styling.'
  },
  {
    title: 'Luxury Real Estate Client Relationship Manager',
    type: 'Full-time',
    location: 'Chennai & ECR Experience Center',
    exp: '2-4 Years',
    desc: 'Manage high-net-worth client relationships, coordinate private villa viewings, and guide buying journeys.'
  }
];

export const VenturesCareersPage: React.FC<VenturesCareersPageProps> = ({ type, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'ventures' | 'careers'>(type);

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-14 bg-[#faf8f5] text-[#1a1918]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Editorial tab switcher */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mb-10 sm:mb-12">
          <button
            onClick={() => setActiveTab('ventures')}
            className={`group flex items-center gap-2.5 pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'ventures'
                ? 'border-[#c59b67] text-[#1a1918]'
                : 'border-transparent text-[#8c827a] hover:text-[#1a1918]'
            }`}
          >
            <Handshake className={`w-4 h-4 ${activeTab === 'ventures' ? 'text-[#c59b67]' : 'text-[#b3aaa0] group-hover:text-[#c59b67]'} transition-colors`} />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] font-semibold">Joint Ventures & Land</span>
          </button>
          <span className="h-6 w-px bg-[#d8cebe]" />
          <button
            onClick={() => setActiveTab('careers')}
            className={`group flex items-center gap-2.5 pb-3 border-b-2 transition-all cursor-pointer ${
              activeTab === 'careers'
                ? 'border-[#c59b67] text-[#1a1918]'
                : 'border-transparent text-[#8c827a] hover:text-[#1a1918]'
            }`}
          >
            <Briefcase className={`w-4 h-4 ${activeTab === 'careers' ? 'text-[#c59b67]' : 'text-[#b3aaa0] group-hover:text-[#c59b67]'} transition-colors`} />
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.22em] font-semibold">Careers at Unifra</span>
          </button>
        </div>

        {activeTab === 'ventures' ? (
          <div className="animate-in fade-in duration-300">
            {/* Split hero */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-14 sm:mb-16">
              <div className="lg:col-span-6 space-y-6">
                <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
                  <span>PARTNERSHIPS & ACQUISITION</span>
                </div>
                <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight leading-[1.05]">
                  Partner With Us on{' '}
                  <span className="italic font-serif-luxury text-[#c59b67]">Land & Development</span>
                </h1>
                <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light max-w-xl">
                  Do you own prime residential land along Chennai's ECR, OMR, or prime city locations? Unlock unmatched value through transparent joint ventures and custom luxury villa developments with Unifra.
                </p>
                <button
                  onClick={onOpenContact}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white font-medium text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                >
                  <span>Propose a Land Parcel or Joint Venture</span>
                  <ArrowRight className="w-4 h-4 text-[#c59b67]" />
                </button>
              </div>

              <div className="lg:col-span-6">
                <div className="relative max-w-[520px] mx-auto h-[420px] sm:h-[520px] rounded-t-[260px] rounded-b-[24px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.10)] border border-[#eae4db] bg-[#eae5dc]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
                    alt="Unifra coastal residence"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Numbered engagement models */}
            <div className="border-t border-[#eae4db]">
              {VENTURE_MODELS.map((model) => (
                <div
                  key={model.index}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-8 sm:py-10 border-b border-[#eae4db] hover:bg-[#f4f0eb]/60 transition-colors px-2 sm:px-4"
                >
                  <span className="md:col-span-1 font-serif-luxury italic text-2xl sm:text-3xl text-[#c59b67]">
                    {model.index}
                  </span>
                  <h3 className="md:col-span-4 font-serif-luxury text-2xl sm:text-3xl font-normal text-[#1a1918] tracking-tight group-hover:text-[#9b6f1e] transition-colors">
                    {model.title}
                  </h3>
                  <p className="md:col-span-6 text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
                    {model.desc}
                  </p>
                  <span className="hidden md:block md:col-span-1 text-right text-[#c59b67] opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            {/* Careers hero */}
            <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-4 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
                <span>OPPORTUNITIES</span>
              </div>
              <h1 className="font-serif-luxury text-4xl sm:text-6xl font-normal text-[#1a1918] tracking-tight mb-5 leading-[1.05]">
                Build the Future of{' '}
                <span className="italic font-serif-luxury text-[#c59b67]">Luxury Living</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
                Join a dynamic team of architects, project engineers, interior curators, and customer concierges redefining contemporary residential design in South India.
              </p>
            </div>

            {/* Editorial job listings */}
            <div className="max-w-4xl mx-auto border-t border-[#eae4db]">
              {OPEN_ROLES.map((job) => (
                <div
                  key={job.title}
                  className="group grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 items-start py-8 sm:py-9 border-b border-[#eae4db] hover:bg-[#f4f0eb]/60 transition-colors px-2 sm:px-4"
                >
                  <div className="sm:col-span-8 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-serif-luxury text-xl sm:text-2xl font-normal text-[#1a1918] tracking-tight group-hover:text-[#9b6f1e] transition-colors">
                        {job.title}
                      </h3>
                      <span className="px-2.5 py-1 rounded-sm bg-[#c59b67]/12 border border-[#c59b67]/25 text-[#9b6f1e] text-[9px] font-mono font-semibold uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#68625d] max-w-xl font-light leading-relaxed">{job.desc}</p>
                    <div className="flex flex-wrap items-center gap-5 text-[10px] font-mono text-[#8c827a] pt-1 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#c59b67]" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#c59b67]" />
                        Exp: {job.exp}
                      </span>
                    </div>
                  </div>
                  <div className="sm:col-span-4 sm:text-right">
                    <button
                      onClick={onOpenContact}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-[#d8cebe] text-[10px] font-mono uppercase tracking-wider text-[#1a1918] hover:border-[#1a1918] hover:bg-[#1a1918] hover:text-white transition-all cursor-pointer"
                    >
                      <span>Apply Now</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#c59b67]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-[10px] font-mono uppercase tracking-[0.24em] text-[#8c827a] mt-10">
              Don't see your role? Write to <span className="text-[#9b6f1e] font-semibold">careers@unifra.in</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
