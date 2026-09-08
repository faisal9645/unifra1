import React, { useState } from 'react';
import { ArrowRight, MapPin, KeyRound, CheckCircle2 } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../../data/mockData';
import { ProjectItem } from '../../types';

interface SignatureProjectsPageProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreShowcase?: (project: ProjectItem) => void;
  onSelectMysa?: () => void;
  onOpenContact: () => void;
  isVillaUnlocked?: boolean;
}

export const SignatureProjectsPage: React.FC<SignatureProjectsPageProps> = ({
  onSelectProject,
  onExploreShowcase,
  onSelectMysa,
  onOpenContact,
  isVillaUnlocked = false
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Under Construction' | 'Upcoming' | 'Ready to Move'>('All');

  const filterTabs = [
    { label: 'All', value: 'All' },
    { label: 'Ongoing', value: 'Under Construction' },
    { label: 'Upcoming', value: 'Upcoming' },
    { label: 'Completed', value: 'Ready to Move' }
  ] as const;

  const filteredProjects = SIGNATURE_PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.status === activeFilter;
  });

  const handleCardClick = (project: ProjectItem) => {
    if (onExploreShowcase) {
      onExploreShowcase(project);
    } else if (onSelectProject) {
      onSelectProject(project);
    } else if (project.id === 'mysa-villas' && onSelectMysa) {
      onSelectMysa();
    } else {
      onOpenContact();
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#0b0c0e] text-[#f3f4f6]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Page Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>PORTFOLIO SHOWCASE</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-4">
            Our <span className="italic font-serif-luxury text-[#dfb776]">Signature Projects</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light">
            Each development is a masterwork of architectural distinction, superior craftsmanship, and prime Chennai geography.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mb-14">
          <div className="inline-flex p-1 bg-[#121418] rounded-sm border border-white/10">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveFilter(tab.value)}
                className={`px-4 sm:px-6 py-2 rounded-sm text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.value
                    ? 'bg-[#dfb776] text-[#0b0c0e] font-semibold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {filteredProjects.map((project) => {
            const isMysa = project.id === 'mysa-villas';
            return (
              <div
                key={project.id}
                onClick={() => handleCardClick(project)}
                className="group bg-[#121418] rounded-sm overflow-hidden border border-white/10 hover:border-[#dfb776]/50 transition-all duration-300 flex flex-col cursor-pointer shadow-2xl"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-76 w-full overflow-hidden bg-black/40">
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121418] via-transparent to-black/30" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-sm text-[9px] font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-sm ${
                      project.status === 'Under Construction'
                        ? 'bg-emerald-700/80 text-white border border-emerald-500/30'
                        : project.status === 'Upcoming'
                        ? 'bg-amber-700/80 text-white border border-amber-500/30'
                        : 'bg-gray-800/80 text-white border border-white/20'
                    }`}>
                      {project.statusBadge || project.status}
                    </span>
                    {project.badgeDays && (
                      <span className="px-2.5 py-0.5 rounded-sm bg-black/70 text-gray-300 text-[9px] font-mono border border-white/10">
                        {project.badgeDays}
                      </span>
                    )}
                  </div>

                  {project.badgeSold && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-0.5 rounded-sm bg-black/70 text-[#dfb776] text-[9px] font-mono border border-[#dfb776]/40 backdrop-blur-md">
                        {project.badgeSold}
                      </span>
                    </div>
                  )}

                  {/* Location overlay bottom */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white text-xs font-mono drop-shadow">
                    <MapPin className="w-3.5 h-3.5 text-[#dfb776]" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex flex-col justify-between flex-1 text-left">
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-bold text-white group-hover:text-[#dfb776] transition-colors mb-2">
                      {project.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-5 font-light">
                      {project.description || project.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                      <span className="font-semibold text-white">{project.specs.bedrooms}</span>
                      <span>•</span>
                      <span>{project.carpetArea}</span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(project);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#dfb776] group-hover:text-white transition-colors cursor-pointer py-1 px-2 rounded-sm hover:bg-[#dfb776]/10"
                    >
                      {isMysa ? (
                        isVillaUnlocked ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>View Villa Showcase</span>
                          </>
                        ) : (
                          <>
                            <KeyRound className="w-3.5 h-3.5 text-[#dfb776]" />
                            <span>Explore Showcase</span>
                          </>
                        )
                      ) : (
                        <span>Inquire Now</span>
                      )}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquire Banner */}
        <div className="bg-[#121418] text-white rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mb-2">
              Have a plot along ECR or OMR?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl font-light">
              We offer turnkey joint development and custom architectural building services. Partner with Unifra to create an iconic landmark.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="shrink-0 px-7 py-3.5 rounded-sm bg-[#dfb776] text-[#0b0c0e] hover:bg-[#c5a880] font-semibold text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            <span>Discuss Joint Venture</span>
          </button>
        </div>
      </div>
    </div>
  );
};
