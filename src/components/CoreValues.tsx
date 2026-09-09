import React from 'react';
import { Compass, Zap, Shield } from 'lucide-react';
import { CORE_VALUES } from '../data/mockData';

export const CoreValues: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#dfb776]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#dfb776]" />;
      case 'Shield':
      default:
        return <Shield className="w-6 h-6 text-[#dfb776]" />;
    }
  };

  return (
    <section id="values" className="py-10 sm:py-14 bg-[#0b0c0e] text-white relative border-t border-white/10">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#dfb776] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#dfb776] rounded-full" />
            <span>FOUNDATIONAL PILLARS</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-white tracking-tight mb-4">
            Our Core <span className="italic font-serif-luxury text-[#dfb776]">Values</span>
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            The principles that define our work and our commitment to you.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val) => (
            <div
              key={val.id}
              className="group relative bg-[#121418] rounded-sm p-8 sm:p-10 border border-white/10 hover:border-[#dfb776]/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center shadow-xl"
            >
              {/* Circular Badge with Icon */}
              <div className="w-14 h-14 rounded-full bg-[#dfb776]/10 border border-[#dfb776]/30 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:bg-[#dfb776] group-hover:text-[#0b0c0e] transition-all duration-300">
                {getIcon(val.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#dfb776] transition-colors">
                {val.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                {val.description}
              </p>

              {/* Subtle hover accent mark */}
              <div className="w-8 h-0.5 bg-white/10 group-hover:w-16 group-hover:bg-[#dfb776] transition-all duration-300 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
