import React, { useState } from 'react';
import {
  ArrowRight,
  MapPin,
  BedDouble,
  Bath,
  Car,
  Maximize,
  FileText,
  Calendar,
  Sparkles,
  KeyRound,
  CheckCircle2,
  Lock
} from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/mockData';
import { ProjectItem } from '../types';

interface SignatureProjectsProps {
  onScheduleVisit: (project?: ProjectItem) => void;
  onDownloadBrochure: (project: ProjectItem) => void;
  onViewAllProjects?: () => void;
  onSelectProject?: (project: ProjectItem) => void;
  onExploreShowcase?: (project: ProjectItem) => void;
  isVillaUnlocked?: boolean;
}

export const SignatureProjects: React.FC<SignatureProjectsProps> = ({
  onScheduleVisit,
  onDownloadBrochure,
  onViewAllProjects,
  onSelectProject,
  onExploreShowcase,
  isVillaUnlocked = false
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Under Construction', 'Ready to Move', 'Upcoming'];

  const filteredProjects = activeFilter === 'All'
    ? SIGNATURE_PROJECTS
    : SIGNATURE_PROJECTS.filter((p) => p.status === activeFilter);

  const handleCardClick = (project: ProjectItem) => {
    if (onExploreShowcase) {
      onExploreShowcase(project);
    } else if (onSelectProject) {
      onSelectProject(project);
    } else {
      onScheduleVisit(project);
    }
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#0b0c0e] text-white border-t border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header matching screenshot 6: CURATED COLLECTIONS | Signature Developments */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-14 gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#dfb776] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
              <span>CURATED COLLECTIONS</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight">
              Signature <span className="italic font-serif-luxury text-[#dfb776]">Developments</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {/* Filter tags */}
            <div className="flex flex-wrap items-center gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3.5 py-1.5 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    activeFilter === f
                      ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                      : 'bg-[#121418] text-gray-400 hover:text-white border border-white/10'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {onViewAllProjects && (
              <button
                onClick={onViewAllProjects}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
              >
                <span>VIEW ALL PROJECTS</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects Grid matching screenshot 6 template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isMysa = project.id === 'mysa-villas' || project.id === 'mysa';
            return (
              <div
                key={project.id}
                data-cursor="EXPLORE"
                onClick={() => handleCardClick(project)}
                className="group bg-[#121418] rounded-sm overflow-hidden border border-white/10 hover:border-[#dfb776]/50 transition-all duration-300 flex flex-col justify-between shadow-xl cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-black/40">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/20 opacity-80" />

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-sm text-[9px] font-mono tracking-widest font-semibold uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                      {project.status}
                    </span>
                    {isMysa && (
                      <span className="px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-widest font-semibold uppercase bg-[#dfb776]/20 backdrop-blur-md text-[#dfb776] border border-[#dfb776]/40 flex items-center gap-1">
                        {isVillaUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            <span>SHOWCASE UNLOCKED</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-[#dfb776]" />
                            <span>VILLA SHOWCASE</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info block matching screenshot 6: Name & Location on left, Price on right */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-serif-luxury text-xl font-bold text-white group-hover:text-[#dfb776] transition-colors">
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono uppercase tracking-wider mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#dfb776]" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <div className="text-right whitespace-nowrap">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400">STARTING</div>
                        <div className="text-sm font-bold font-mono text-[#dfb776]">
                          {project.priceStarting}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-xs font-light leading-relaxed my-3 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Specs row in subtle dark aesthetic */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-y border-white/10 text-center mb-4 text-gray-300">
                      <div>
                        <BedDouble className="w-3.5 h-3.5 mx-auto text-[#dfb776] mb-1" />
                        <div className="text-[10px] font-mono">
                          {project.specs.bedrooms.includes('BHK') ? project.specs.bedrooms : `${project.specs.bedrooms} BHK`}
                        </div>
                      </div>
                      <div>
                        <Bath className="w-3.5 h-3.5 mx-auto text-[#dfb776] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.bathrooms} Baths</div>
                      </div>
                      <div>
                        <Maximize className="w-3.5 h-3.5 mx-auto text-[#dfb776] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.levels} Levels</div>
                      </div>
                      <div>
                        <Car className="w-3.5 h-3.5 mx-auto text-[#dfb776] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.parking} Cars</div>
                      </div>
                    </div>
                  </div>

                  {/* Explore Showcase Highlight Action */}
                  <div className="pt-1 pb-3 border-t border-white/5 mb-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project);
                      }}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-sm text-xs font-mono uppercase tracking-wider text-[#dfb776] group-hover:text-white transition-colors cursor-pointer hover:bg-[#dfb776]/10"
                    >
                      <span className="flex items-center gap-1.5">
                        {isMysa ? (
                          isVillaUnlocked ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>View Villa Showcase</span>
                            </>
                          ) : (
                            <>
                              <KeyRound className="w-3.5 h-3.5 text-[#dfb776]" />
                              <span>Explore Showcase (Details Required)</span>
                            </>
                          )
                        ) : (
                          <span>Explore Residence</span>
                        )}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Actions: Request Site Visit & Download Brochure */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadBrochure(project);
                      }}
                      className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-sm border border-white/15 hover:border-[#dfb776] text-xs font-mono uppercase tracking-wider text-gray-300 hover:text-white transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#dfb776]" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScheduleVisit(project);
                      }}
                      className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-xs font-semibold uppercase tracking-wider text-[#0b0c0e] transition-colors cursor-pointer shadow-md"
                    >
                      <Calendar className="w-3 h-3" />
                      <span>Site Visit</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
