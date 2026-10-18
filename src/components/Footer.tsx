import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SocialLinks } from './SocialLinks';

interface FooterProps {
  onOpenContact?: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#F5F3EE] border-t border-[#E3E0D9] pt-20 pb-12 text-[#202124]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        {/* Top Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-[#E3E0D9]">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#737780]">
              Developer Portfolio &bull; 2026
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#202124]">
              {portfolioData.name}
            </h3>
            <p className="text-sm text-[#737780] max-w-md leading-relaxed">
              {portfolioData.role}. Building purposeful software architectures, developer platforms, and applied AI systems.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#737780] block">
              Navigation
            </span>
            <ul className="space-y-2 text-sm text-[#202124]">
              <li>
                <a href="#featured-work" className="hover:text-[#737780] transition-colors">
                  Featured Work
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#737780] transition-colors">
                  About & Background
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenResume}
                  className="hover:text-[#737780] transition-colors inline-flex items-center gap-1"
                >
                  <span>Resume</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#737780]" />
                </button>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#737780] transition-colors text-left block"
                >
                  Get in Touch
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="text-xs font-mono tracking-widest uppercase text-[#737780] block">
              Profiles & Coding
            </span>
            <SocialLinks socials={portfolioData.socials} variant="editorial" />
          </div>
        </div>

        {/* Bottom Bar: Copyright and Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737780]">
          <div className="flex items-center gap-2 font-mono">
            <span>&copy; {new Date().getFullYear()} {portfolioData.name}.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-[11px] text-[#737780]">
              Built with React, Vite & Tailwind
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top of page"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E3E0D9] bg-[#FAF9F6] hover:border-[#202124] hover:text-[#202124] transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
