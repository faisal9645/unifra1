import React from 'react';
import { Linkedin, Mail, ArrowRight } from 'lucide-react';

interface OurTeamPageProps {
  onNavigateContact: () => void;
  onNavigateStory: () => void;
}

export const OurTeamPage: React.FC<OurTeamPageProps> = ({
  onNavigateContact,
  onNavigateStory
}) => {
  const teamMembers = [
    {
      name: 'Mr. Siddiq Ahmed',
      role: 'Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
      bio: 'With a vision to redefine luxury living in Chennai, Mr. Siddiq Ahmed founded Unifra to create homes that blend contemporary aesthetics with timeless elegance. His leadership and passion for excellence are the driving forces behind our commitment to quality and innovation.',
      linkedin: 'https://linkedin.com',
      email: 'siddiq@unifra.in'
    },
    {
      name: 'Nikesh Jothi Rajan',
      role: 'Project Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
      bio: 'As Project Manager, Nikesh orchestrates every phase of construction with precision and foresight. His expertise in timeline management and quality control ensures that every Unifra project is delivered on schedule and to the highest standards, turning blueprints into beautiful homes.',
      linkedin: 'https://linkedin.com',
      email: 'nikesh@unifra.in'
    },
    {
      name: 'Priya Sundaram',
      role: 'Principal Architect',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      bio: 'Priya specializes in Scandinavian spatial planning and climate-responsive coastal design. She brings over 12 years of architectural experience translating Scandinavian warmth into Chennai’s tropical landscape with natural ventilation and double-height light wells.',
      linkedin: 'https://linkedin.com',
      email: 'priya@unifra.in'
    },
    {
      name: 'Vikram Raghavan',
      role: 'Head of Client Relations',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
      bio: 'Vikram leads private client advisory and bespoke customization journeys. He ensures transparent updates throughout structural milestones, private site visits, and personalized material selections for our homeowners.',
      linkedin: 'https://linkedin.com',
      email: 'vikram@unifra.in'
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-[#0b0c0e] text-[#f3f4f6]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>LEADERSHIP & ARCHITECTURAL MINDS</span>
          </div>

          <h1 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight mb-4">
            Our <span className="italic font-serif-luxury text-[#dfb776]">Team</span>
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 font-light">
            Our strength lies in our individuality and shared passion for excellence.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#121418] rounded-sm p-7 sm:p-9 border border-white/10 hover:border-[#dfb776]/50 transition-all duration-300 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-xl"
            >
              {/* Portrait */}
              <div className="w-36 h-44 sm:w-40 sm:h-52 rounded-sm overflow-hidden shadow-md shrink-0 bg-black/40 border border-white/10">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Bio Details */}
              <div className="flex flex-col justify-between flex-1 text-center sm:text-left h-full">
                <div>
                  <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#dfb776] mb-3">
                    {member.role}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-light line-clamp-5 sm:line-clamp-none">
                    {member.bio}
                  </p>
                </div>

                {/* Social links */}
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-5 pt-4 border-t border-white/10">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-sm border border-white/15 hover:border-[#dfb776] text-gray-400 hover:text-[#dfb776] transition-colors"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2 rounded-sm border border-white/15 hover:border-[#dfb776] text-gray-400 hover:text-[#dfb776] transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] font-mono text-gray-500 ml-1">
                    {member.email}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#121418] rounded-sm p-8 sm:p-12 border border-white/10 shadow-2xl text-center max-w-4xl mx-auto">
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-normal text-white mb-3">
            Want to collaborate with our leadership?
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6 font-light">
            Whether you are exploring purchasing an exclusive villa or seeking architectural consultancy for your land parcel in Chennai, our team is at your disposal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm bg-[#dfb776] hover:bg-[#c5a880] text-[#0b0c0e] text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-md"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onNavigateStory}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-sm border border-white/20 text-white text-xs font-mono uppercase tracking-wider hover:border-[#dfb776] hover:text-[#dfb776] transition-colors cursor-pointer"
            >
              <span>Read Our Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
