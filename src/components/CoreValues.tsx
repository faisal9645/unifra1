import React from 'react';
import { Compass, Zap, Shield } from 'lucide-react';
import { CORE_VALUES } from '../data/mockData';

export const CoreValues: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-[#c59b67]" />;
      case 'Zap':
        return <Zap className="w-6 h-6 text-[#c59b67]" />;
      case 'Shield':
      default:
        return <Shield className="w-6 h-6 text-[#c59b67]" />;
    }
  };

  return (
    <section id="values" className="py-16 sm:py-24 bg-[#faf8f5] text-[#1a1918] relative border-t border-[#eee9e0]">
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.28em] text-[#c59b67] mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-[#c59b67] rounded-full" />
            <span>FOUNDATIONAL PILLARS</span>
          </div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl font-normal text-[#1a1918] tracking-tight mb-4">
            Our Core <span className="italic font-serif-luxury text-[#c59b67]">Values</span>
          </h2>
          <p className="text-[#68625d] text-xs sm:text-sm leading-relaxed max-w-xl mx-auto font-light">
            The principles that define our work and our commitment to you.
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CORE_VALUES.map((val) => (
            <div
              key={val.id}
              className="group relative bg-white rounded-[20px] p-8 sm:p-10 border border-[#eae4db] hover:border-[#c59b67] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col items-center text-center shadow-sm hover:shadow-lg"
            >
              {/* Circular Badge with Icon */}
              <div className="w-14 h-14 rounded-full bg-[#c59b67]/10 border border-[#c59b67]/30 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#1a1918] group-hover:text-white transition-all duration-300">
                {getIcon(val.iconName)}
              </div>

              {/* Title */}
              <h3 className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1a1918] mb-3 group-hover:text-[#c59b67] transition-colors">
                {val.title}
              </h3>

              {/* Description */}
              <p className="text-[#68625d] text-xs sm:text-sm leading-relaxed font-light">
                {val.description}
              </p>

              {/* Subtle hover accent mark */}
              <div className="w-8 h-0.5 bg-[#eae4db] group-hover:w-16 group-hover:bg-[#c59b67] transition-all duration-300 mt-6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
