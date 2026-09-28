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
    <div className="pt-24 pb-20 bg-[#faf8f5] text-[#1a1918]">
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
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 mt-12">
        <div className="bg-[#f4f0eb] text-[#1a1918] rounded-[24px] p-8 sm:p-12 border border-[#e5ded4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal mb-2 text-[#1a1918]">
              Have a plot along ECR or OMR?
            </h3>
            <p className="text-xs sm:text-sm text-[#68625d] max-w-xl font-light">
              We offer turnkey joint development and custom architectural building services. Partner with Unifra to create an iconic landmark.
            </p>
          </div>
          <button
            onClick={onOpenContact}
            className="shrink-0 px-8 py-4 rounded-sm bg-[#1a1918] text-white hover:bg-[#2b2723] font-medium text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-sm"
          >
            <span>Discuss Joint Venture</span>
          </button>
        </div>
      </div>
    </div>
  );
};
