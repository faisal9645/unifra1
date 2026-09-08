import React, { useState } from 'react';
import { Briefcase, Handshake, Building, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface VenturesCareersPageProps {
  type: 'ventures' | 'careers';
  onOpenContact: () => void;
}

export const VenturesCareersPage: React.FC<VenturesCareersPageProps> = ({ type, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'ventures' | 'careers'>(type);

  return (
    <div className="pt-24 pb-20 bg-[#0b0c0e] text-[#f3f4f6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Switcher */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1 bg-[#121418] rounded-sm border border-white/10">
            <button
              onClick={() => setActiveTab('ventures')}
              className={`px-6 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'ventures'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Handshake className="w-3.5 h-3.5" />
              <span>Joint Ventures & Land</span>
            </button>
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-6 py-2.5 rounded-sm text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === 'careers'
                  ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers at Unifra</span>
            </button>
          </div>
        </div>

        {activeTab === 'ventures' ? (
          /* Joint Ventures Content */
          <div className="space-y-16 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>PARTNERSHIPS & ACQUISITION</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
                Partner With Us on <span className="italic font-serif-luxury text-[#dfb776]">Land & Development</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                Do you own prime residential land along Chennai's ECR, OMR, or prime city locations? Unlock unmatched value through transparent joint ventures and custom luxury villa developments with Unifra.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#121418] rounded-sm p-8 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-2xl text-left">
                <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 text-[#dfb776] flex items-center justify-center mb-6">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">Prime Land Acquisition</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Direct outright purchase of clear-titled residential land plots in Chennai from 2 grounds up to 5 acres.
                </p>
              </div>

              <div className="bg-[#121418] rounded-sm p-8 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-2xl text-left">
                <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 text-[#dfb776] flex items-center justify-center mb-6">
                  <Handshake className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">Joint Development (JD)</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  Attractive revenue or area-sharing models backed by bank guarantees, architectural excellence, and fast turnarounds.
                </p>
              </div>

              <div className="bg-[#121418] rounded-sm p-8 border border-white/10 hover:border-[#dfb776]/50 transition-all shadow-2xl text-left">
                <div className="w-12 h-12 rounded-sm bg-[#dfb776]/10 border border-[#dfb776]/30 text-[#dfb776] flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-serif-luxury text-xl font-bold text-white mb-2">Turnkey Villa Development</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  End-to-end bespoke villa construction for private landowners seeking Swedish or European contemporary design.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-xl"
              >
                <span>Propose a Land Parcel or Joint Venture</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Careers Content */
          <div className="space-y-16 animate-in fade-in duration-300">
            <div className="text-center max-w-3xl mx-auto">
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
                <span>OPPORTUNITIES</span>
              </div>
              <h1 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
                Build the Future of <span className="italic font-serif-luxury text-[#dfb776]">Luxury Living</span>
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                Join a dynamic team of architects, project engineers, interior curators, and customer concierges redefining contemporary residential design in South India.
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
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
              ].map((job, idx) => (
                <div
                  key={idx}
                  className="bg-[#121418] rounded-sm p-6 border border-white/10 hover:border-[#dfb776]/50 shadow-xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-serif-luxury text-lg font-bold text-white">{job.title}</h3>
                      <span className="px-2 py-0.5 rounded-sm bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono font-semibold uppercase">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 max-w-xl font-light">{job.desc}</p>
                    <div className="flex items-center gap-4 text-[10px] font-mono text-gray-500 pt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#dfb776]" />
                        {job.location}
                      </span>
                      <span>Exp: {job.exp}</span>
                    </div>
                  </div>

                  <button
                    onClick={onOpenContact}
                    className="shrink-0 px-5 py-2.5 rounded-sm border border-white/20 text-xs font-mono uppercase tracking-wider text-white hover:border-[#dfb776] hover:text-[#dfb776] transition-colors cursor-pointer"
                  >
                    Apply Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
