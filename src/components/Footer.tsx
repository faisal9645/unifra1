import React, { useState } from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  ArrowUpRight,
  Check,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import { AppPage } from './Navbar';

interface FooterProps {
  onNavigatePage: (page: AppPage) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigatePage, onOpenContact }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setIsSubscribed(false);
    }, 4000);
  };

  const handleLinkClick = (page: AppPage) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080a] text-white pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Giant subtle watermark "U" in background (Screenshot 7) */}
      <div className="absolute right-8 -bottom-16 pointer-events-none select-none opacity-[0.035] font-serif-luxury text-[320px] lg:text-[420px] leading-none text-[#dfb776]">
        U
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Main Grid: Screenshot 7 & 6 combined */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Philosophy (Screenshot 7: For the life you imagine) */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="text-[10px] font-mono tracking-[0.28em] text-[#dfb776] uppercase">
              UNIFRA HOMES / CHENNAI
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-white leading-tight">
              For the life<br />
              <span className="italic font-serif-luxury text-[#dfb776]">you imagine.</span>
            </h3>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              We create addresses with a point of view — considered architecture, tactile materials, and the kind of quiet that stays with you.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#dfb776] hover:text-white uppercase transition-colors cursor-pointer group"
              >
                <span>BEGIN A CONVERSATION</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              {[
                { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { icon: Facebook, label: 'Facebook', href: 'https://facebook.com' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
                { icon: Twitter, label: 'Twitter', href: 'https://x.com' }
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="w-8 h-8 rounded-sm border border-white/15 hover:border-[#dfb776] text-gray-400 hover:text-[#dfb776] flex items-center justify-center transition-colors duration-200"
                >
                  <item.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: EXPLORE (Screenshot 7 & 6) */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#dfb776] uppercase font-semibold">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-xs text-gray-400 tracking-wider font-light">
              <li>
                <button onClick={() => handleLinkClick('about-story')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  OUR STORY
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('mysa-detail')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  THE RESIDENCES
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('projects')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  ALL PROJECTS
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about-team')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  OUR TEAM
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('ventures')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  VENTURES & CAREERS
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-white transition-colors cursor-pointer uppercase">
                  EDITORIAL JOURNAL
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('admin')} className="text-[#dfb776] hover:text-white transition-colors cursor-pointer uppercase flex items-center gap-1.5 font-mono text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dfb776] animate-pulse" />
                  <span>ADMIN CRM (/admin)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: VISIT & CONNECT (Screenshot 7 & 6) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#dfb776] uppercase font-semibold">
              VISIT & CONNECT
            </h4>
            <div className="space-y-3 text-xs text-gray-400 font-light">
              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">LOCATION</span>
                <p className="leading-relaxed">
                  122, East Coast Road, Vettuvankeni,<br />
                  Chennai – 600115, Tamil Nadu, India
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">DIRECT CONCIERGE</span>
                <a href="tel:+917358222445" className="hover:text-[#dfb776] transition-colors font-mono">
                  +91 73582 22445
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-gray-500 block mb-0.5">EMAIL</span>
                <a href="mailto:info@unifrahomes.com" className="hover:text-[#dfb776] transition-colors font-mono">
                  info@unifrahomes.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: UPDATES Newsletter */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#dfb776] uppercase font-semibold">
              UPDATES
            </h4>
            <p className="text-xs text-gray-400 font-light leading-relaxed">
              Receive exclusive previews of our upcoming luxury coastal developments.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex items-center border-b border-white/20 focus-within:border-[#dfb776] transition-colors py-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent text-xs text-white placeholder-gray-600 focus:outline-none uppercase font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#dfb776] hover:text-white transition-colors cursor-pointer ml-2 whitespace-nowrap"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 text-[#dfb776]" /> : 'SEND'}
                </button>
              </div>

              {isSubscribed && (
                <p className="text-[11px] text-[#dfb776] font-mono mt-2">
                  Thank you. You will receive private previews.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar matching screenshot 7 & 6 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-gray-500 uppercase tracking-widest">
          <div>
            © 2025 UNIFRA HOMES. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleLinkClick('contact')} className="hover:text-gray-300 transition-colors">
              PRIVACY
            </button>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-gray-300 transition-colors">
              TERMS
            </button>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="text-[#dfb776]">CRAFTED WITH INTENTION IN CHENNAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
