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
      index: '01',
      image: '/images/team/siddiq-ahmed.png',
      bio: 'With a vision to redefine luxury living in Chennai, Mr. Siddiq Ahmed founded Unifra to create homes that blend contemporary aesthetics with timeless elegance. His leadership and passion for excellence are the driving forces behind our commitment to quality and innovation.',
      linkedin: 'https://linkedin.com',
      email: 'siddiq@unifra.in'
    },
    {
      name: 'Nikesh Jothi Rajan',
      role: 'Project Manager',
      index: '02',
      image: '/images/team/nikesh-rajan.png',
      bio: 'As Project Manager, Nikesh orchestrates every phase of construction with precision and foresight. His expertise in timeline management and quality control ensures that every Unifra project is delivered on schedule and to the highest standards, turning blueprints into beautiful homes.',
      linkedin: 'https://linkedin.com',
      email: 'nikesh@unifra.in'
    },
    {
      name: 'Thunku Abdel Rehman',
      role: 'General Manager',
      index: '03',
      image: 'https://ui-avatars.com/api/?name=Thunku+Abdel+Rehman&background=eae5dc&color=1a1918&size=800',
      bio: 'As General Manager, Thunku Abdel Rehman brings operational discipline and a client-first mindset to every Unifra engagement. From transparent communication to meticulous handovers, he ensures the home-buying journey remains seamless and deeply satisfying for every family.',
      linkedin: 'https://linkedin.com',
      email: 'info@unifra.in'
    }
  ];

  return (
    <div className="pt-20 sm:pt-24 pb-12 sm:pb-14 bg-[#faf8f5] text-[#1a1918]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
            <span>LEADERSHIP & ARCHITECTURAL MINDS</span>
          </div>

          <h1 className="font-serif-luxury text-5xl sm:text-7xl font-normal text-[#1a1918] tracking-tight mb-5">
            Our <span className="italic font-serif-luxury text-[#c59b67]">Team</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#68625d] font-light leading-relaxed">
            Our strength lies in our individuality. Set up by Mr. Siddiq Ahmed, the team strives to bring in the best talent in various fields, from architecture to interior design and sales.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-[#d8cebe]" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-[#8c827a] uppercase">Chennai • Est. 2022</span>
            <span className="h-px w-16 bg-[#d8cebe]" />
          </div>
        </div>

        {/* Team Grid — vertical editorial profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-14">
          {teamMembers.map((member) => (
            <article key={member.name} className="group flex flex-col">
              {/* Arched portrait */}
              <div className="relative overflow-hidden rounded-t-[240px] rounded-b-[20px] border border-[#eae4db] bg-[#eae5dc] shadow-[0_20px_50px_rgba(0,0,0,0.06)]">
                <div className="aspect-[4/5] sm:aspect-[5/5]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" style={{ height: '45%' }} />
                <span className="absolute bottom-5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white/92 backdrop-blur-md border border-[#e5ded4] text-[9px] font-mono font-semibold uppercase tracking-[0.22em] text-[#1a1918]">
                  {member.role}
                </span>
                <span className="absolute top-6 right-7 font-serif-luxury italic text-4xl text-white/85 drop-shadow-sm">
                  {member.index}
                </span>
              </div>

              {/* Details */}
              <div className="pt-8 sm:pt-9 flex-1 flex flex-col">
                <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#1a1918] tracking-tight group-hover:text-[#9b6f1e] transition-colors">
                  {member.name}
                </h3>
                <div className="mt-2 text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-[#c59b67]">
                  {member.role} • Unifra
                </div>
                <p className="mt-5 text-xs sm:text-sm text-[#68625d] leading-relaxed font-light">
                  {member.bio}
                </p>

                <div className="mt-7 pt-5 border-t border-[#eae4db] flex items-center gap-3">
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-sm border border-[#d8cebe] text-[#68625d] hover:border-[#1a1918] hover:text-[#1a1918] transition-colors"
                    title={`Connect with ${member.name} on LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${member.email}`}
                    className="p-2.5 rounded-sm border border-[#d8cebe] text-[#68625d] hover:border-[#1a1918] hover:text-[#1a1918] transition-colors"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                  <span className="text-[10px] font-mono text-[#8c827a] tracking-wider truncate">
                    {member.email}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="bg-[#f4f0eb] rounded-[28px] p-10 sm:p-16 border border-[#e5ded4] shadow-sm text-center max-w-4xl mx-auto">
          <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#c59b67]">Collaborate</span>
          <h3 className="mt-4 font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Want to collaborate with <span className="italic text-[#c59b67]">our leadership?</span>
          </h3>
          <p className="text-xs sm:text-sm text-[#68625d] max-w-xl mx-auto mb-8 font-light leading-relaxed">
            Whether you are exploring purchasing an exclusive villa or seeking architectural consultancy for your land parcel in Chennai, our team is at your disposal.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-[#1a1918] hover:bg-[#2b2723] text-white text-xs font-mono uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              <span>Schedule a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#c59b67]" />
            </button>
            <button
              onClick={onNavigateStory}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-sm border border-[#d8cebe] text-[#1a1918] text-xs font-mono uppercase tracking-wider hover:border-[#1a1918] transition-colors cursor-pointer"
            >
              <span>Read Our Story</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
