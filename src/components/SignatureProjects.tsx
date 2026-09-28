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
    <section id="projects" className="py-10 sm:py-14 bg-[#faf8f5] text-[#1a1918] border-t border-[#eae4db]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section header: editorial title row + underline filter tabs */}
        <div className="mb-8 sm:mb-10 pb-6 border-b border-[#eae4db]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#c59b67] mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
                <span>EXCLUSIVE VILLA COMMUNITIES</span>
              </div>
              <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight">
                Signature <span className="italic font-serif-luxury text-[#c59b67]">Villa Enclaves</span>
              </h2>
            </div>

            {onViewAllProjects && (
              <button
                onClick={onViewAllProjects}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#c59b67] hover:text-[#1a1918] uppercase transition-colors cursor-pointer group shrink-0"
              >
                <span>VIEW ALL PROJECTS</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            )}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`pb-1.5 border-b-2 text-[11px] font-mono uppercase tracking-[0.18em] transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'border-[#c59b67] text-[#1a1918] font-semibold'
                    : 'border-transparent text-[#8c827a] hover:text-[#1a1918]'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto hidden sm:inline text-[10px] font-mono tracking-[0.2em] text-[#8c827a] uppercase">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Residence' : 'Residences'}
            </span>
          </div>
        </div>

        {/* Projects Grid matching editorial template */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const isMysa = project.id === 'mysa-villas' || project.id === 'mysa';
            return (
              <div
                key={project.id}
                data-cursor="EXPLORE"
                onClick={() => handleCardClick(project)}
                className="group bg-white rounded-t-[40px] rounded-b-[20px] overflow-hidden border border-[#eae4db] hover:border-[#c59b67] transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-xl cursor-pointer"
              >
                {/* Project Image */}
                <div className="relative h-72 sm:h-80 overflow-hidden bg-[#eae5dc]">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70" />

                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-sm text-[9px] font-mono tracking-widest font-semibold uppercase bg-white/95 backdrop-blur-md text-[#1a1918] border border-[#e5ded4]">
                      {project.status}
                    </span>
                    {isMysa && (
                      <span className="px-2.5 py-1 rounded-sm text-[9px] font-mono tracking-widest font-semibold uppercase bg-[#c59b67]/20 backdrop-blur-md text-[#c59b67] border border-[#c59b67]/40 flex items-center gap-1">
                        {isVillaUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>SHOWCASE UNLOCKED</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-3 h-3 text-[#c59b67]" />
                            <span>VILLA SHOWCASE</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Info block: Name & Location on left, Price on right */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-serif-luxury text-xl font-bold text-[#1a1918] group-hover:text-[#c59b67] transition-colors">
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-[#8c827a] font-mono uppercase tracking-wider mt-1">
                          <MapPin className="w-3.5 h-3.5 text-[#c59b67]" />
                          <span>{project.location}</span>
                        </div>
                      </div>

                      <div className="text-right whitespace-nowrap">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-[#8c827a]">STARTING</div>
                        <div className="text-sm font-bold font-mono text-[#c59b67]">
                          {project.priceStarting}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#68625d] text-xs font-light leading-relaxed my-3 line-clamp-2">
                      {project.tagline}
                    </p>

                    {/* Specs row in subtle light aesthetic */}
                    <div className="grid grid-cols-4 gap-2 py-3 border-y border-[#eee9e0] text-center mb-4 text-[#68625d]">
                      <div>
                        <BedDouble className="w-3.5 h-3.5 mx-auto text-[#c59b67] mb-1" />
                        <div className="text-[10px] font-mono">
                          {project.specs.bedrooms.includes('BHK') ? project.specs.bedrooms : `${project.specs.bedrooms} BHK`}
                        </div>
                      </div>
                      <div>
                        <Bath className="w-3.5 h-3.5 mx-auto text-[#c59b67] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.bathrooms} Baths</div>
                      </div>
                      <div>
                        <Maximize className="w-3.5 h-3.5 mx-auto text-[#c59b67] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.levels} Levels</div>
                      </div>
                      <div>
                        <Car className="w-3.5 h-3.5 mx-auto text-[#c59b67] mb-1" />
                        <div className="text-[10px] font-mono">{project.specs.parking} Cars</div>
                      </div>
                    </div>
                  </div>

                  {/* Explore Showcase Highlight Action */}
                  <div className="pt-2 pb-1 border-t border-[#f0ece4]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project);
                      }}
                      className="w-full flex items-center justify-between py-2 px-3 rounded-sm text-xs font-mono uppercase tracking-wider text-[#1a1918] group-hover:text-[#c59b67] transition-colors cursor-pointer hover:bg-[#faf8f5]"
                    >
                      <span className="flex items-center gap-1.5 font-medium">
                        {isMysa ? (
                          isVillaUnlocked ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>View Villa Showcase</span>
                            </>
                          ) : (
                            <>
                              <KeyRound className="w-3.5 h-3.5 text-[#c59b67]" />
                              <span>Explore Showcase (Details Required)</span>
                            </>
                          )
                        ) : (
                          <span>Explore Residence</span>
                        )}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#c59b67]" />
                    </button>
                  </div>
                  {/* Actions: Request Site Visit & Download Brochure */}
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDownloadBrochure(project);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm border border-[#d8cebe] hover:border-[#1a1918] text-xs font-mono uppercase tracking-wider text-[#1a1918] transition-colors cursor-pointer"
                    >
                      <FileText className="w-3 h-3 text-[#c59b67]" />
                      <span>Brochure</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onScheduleVisit(project);
                      }}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-xs font-semibold uppercase tracking-wider text-white transition-colors cursor-pointer shadow-sm"
                    >
                      <Calendar className="w-3 h-3 text-[#c59b67]" />
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
