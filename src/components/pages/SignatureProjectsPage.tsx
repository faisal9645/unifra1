import React from 'react';
import { SignatureProjects } from '../SignatureProjects';
import { ProjectItem } from '../../types';

interface SignatureProjectsPageProps {
  onSelectProject?: (project: ProjectItem) => void;
  onExploreShowcase?: (project: ProjectItem) => void;
  onSelectMysa?: () => void;
  onOpenContact: () => void;
  onDownloadBrochure?: (project: ProjectItem) => void;
  isVillaUnlocked?: boolean;
}

export const SignatureProjectsPage: React.FC<SignatureProjectsPageProps> = ({
  onSelectProject,
  onExploreShowcase,
  onSelectMysa,
  onOpenContact,
  onDownloadBrochure,
  isVillaUnlocked = false
}) => {
  return (
    <div className="pt-20 pb-20 bg-[#0b0c0e] text-[#f3f4f6]">
      {/* Signature Villa Enclaves Component */}
      <SignatureProjects
        onScheduleVisit={(project) => {
          if (project && (project.id === 'mysa' || project.id === 'mysa-villas')) {
            if (onSelectMysa) onSelectMysa();
            else if (onExploreShowcase) onExploreShowcase(project);
          } else {
            onOpenContact();
          }
        }}
        onDownloadBrochure={(project) => {
          if (onDownloadBrochure) onDownloadBrochure(project);
          else onOpenContact();
        }}
        onSelectProject={onSelectProject}
        onExploreShowcase={onExploreShowcase}
        isVillaUnlocked={isVillaUnlocked}
      />

      {/* Joint Venture Inquire Banner */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 mt-12">
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
