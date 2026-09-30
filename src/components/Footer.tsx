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

  const isLight = true;

  return (
    <footer className={`pt-10 pb-8 border-t relative overflow-hidden transition-colors ${
      isLight ? 'bg-[#faf8f5] text-[#1a1918] border-[#eae4db]' : 'bg-[#07080a] text-white border-white/10'
    }`}>
      <div className="w-full max-w-[1380px] mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        {/* Main Grid matching editorial screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-10 border-b border-[#eae4db]">
          {/* Column 1: Official UNIFRA Brand Logo & Philosophy */}
          <div className="lg:col-span-4 space-y-5 text-left">
            <button
              onClick={() => handleLinkClick('home')}
              className="cursor-pointer focus:outline-none block group text-left"
              aria-label="Unifra - Creating Desires"
            >
              <img
                src="/images/unifra-logo-stacked.png"
                alt="Unifra Properties - Creating Desires"
                className="h-14 sm:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </button>

            <p className="text-[#68625d] text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Where quality craftsmanship, innovative design, and customer satisfaction come together to create remarkable homes that stand out in both style and substance.
            </p>

            <div className="pt-1">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[#c59b67] hover:text-[#1a1918] uppercase transition-colors cursor-pointer group"
              >
                <span>BEGIN A CONVERSATION</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
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
                  className="w-8 h-8 rounded-sm border border-[#d8cebe] hover:border-[#1a1918] text-[#68625d] hover:text-[#1a1918] flex items-center justify-center transition-colors duration-200"
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
            <ul className="space-y-2.5 text-xs text-[#68625d] tracking-wider font-light">
              <li>
                <button onClick={() => handleLinkClick('about-story')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  OUR STORY
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('mysa-detail')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  THE RESIDENCES
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('projects')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  ALL PROJECTS
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('about-team')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  OUR TEAM
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('ventures')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  VENTURES & CAREERS
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-[#1a1918] transition-colors cursor-pointer uppercase">
                  EDITORIAL JOURNAL
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: VISIT & CONNECT (Screenshot 7 & 6) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#1a1918] uppercase font-semibold">
              VISIT & CONNECT
            </h4>
            <div className="space-y-3 text-xs text-[#68625d] font-light">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#8c827a] block mb-0.5">ADDRESS</span>
                <p className="leading-relaxed">
                  4/11, G R Mansion, 2nd Floor, Srinivasa Rd,<br />
                  T. Nagar, Chennai, Tamil Nadu 600017
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#8c827a] block mb-0.5">CONTACTS</span>
                <a href="tel:+917358222445" className="hover:text-[#1a1918] transition-colors font-mono block">
                  +91 73582 22445
                </a>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase text-[#8c827a] block mb-0.5">EMAIL</span>
                <a href="mailto:info@unifra.in" className="hover:text-[#1a1918] transition-colors font-mono">
                  info@unifra.in
                </a>
              </div>
            </div>
          </div>

          {/* Column 4: UPDATES Newsletter */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-[11px] font-mono tracking-[0.25em] text-[#1a1918] uppercase font-semibold">
              UPDATES
            </h4>
            <p className="text-xs text-[#68625d] font-light leading-relaxed">
              Receive exclusive previews of our upcoming luxury coastal developments.
            </p>

            <form onSubmit={handleSubscribe} className="pt-2">
              <div className="flex items-center border-b border-[#d8cebe] focus-within:border-[#1a1918] transition-colors py-1.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  required
                  className="w-full bg-transparent text-xs text-[#1a1918] placeholder-[#a8a199] focus:outline-none uppercase font-mono tracking-wider"
                />
                <button
                  type="submit"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#1a1918] hover:text-[#c59b67] transition-colors cursor-pointer ml-2 whitespace-nowrap font-medium"
                >
                  {isSubscribed ? <Check className="w-3.5 h-3.5 text-[#c59b67]" /> : 'SEND'}
                </button>
              </div>

              {isSubscribed && (
                <p className="text-[11px] text-[#c59b67] font-mono mt-2">
                  Thank you. You will receive private previews.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar matching screenshot 7 & 6 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono text-[#8c827a] uppercase tracking-widest">
          <div>
            © 2025 UNIFRA HOMES. ALL RIGHTS RESERVED.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => handleLinkClick('contact')} className="hover:text-[#1a1918] transition-colors">
              PRIVACY
            </button>
            <button onClick={() => handleLinkClick('contact')} className="hover:text-[#1a1918] transition-colors">
              TERMS
            </button>
            <span className="hidden md:inline text-[#d8cebe]">•</span>
            <span className="text-[#c59b67]">CRAFTED WITH INTENTION IN CHENNAI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
