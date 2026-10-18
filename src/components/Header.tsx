import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact?: () => void;
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (typeof window !== 'undefined' && window.location.hash.startsWith('#project/')) {
        setActiveSection('projects');
        return;
      }

      const aboutEl = document.getElementById('about');
      const workEl = document.getElementById('featured-work');
      const expEl = document.getElementById('experience');
      const achEl = document.getElementById('achievements');
      const contactEl = document.getElementById('contact');

      const scrollPos = window.scrollY + 140;
      if (contactEl && scrollPos >= contactEl.offsetTop) {
        setActiveSection('contact');
      } else if (achEl && scrollPos >= achEl.offsetTop) {
        setActiveSection('achievements');
      } else if (expEl && scrollPos >= expEl.offsetTop) {
        setActiveSection('experience');
      } else if (workEl && scrollPos >= workEl.offsetTop) {
        setActiveSection('projects');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop) {
        setActiveSection('about');
      } else {
        setActiveSection('home');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('hashchange', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleScroll);
    };
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionKey?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (sectionKey) setActiveSection(sectionKey);

    if (window.location.hash.startsWith('#project/')) {
      window.location.hash = href;
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const headerOffset = 70;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }, 60);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const headerOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const navLinks = [
    { label: 'Home', href: '#hero', key: 'home' },
    { label: 'About', href: '#about', key: 'about' },
    { label: 'Projects', href: '#featured-work', key: 'projects' },
    { label: 'Experience', href: '#experience', key: 'experience' },
    { label: 'Achievements', href: '#achievements', key: 'achievements' },
    { label: 'Contact', href: '#contact', key: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E3E0D9] shadow-sm py-3'
          : 'bg-[#F5F3EE] py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand: Monogram + Name + Subtitle */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, '#hero', 'home')}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded-md"
          aria-label="Shavva Varshith Reddy Home"
        >
          <span className="w-8 h-8 rounded-full bg-[#202124] text-[#F5F3EE] flex items-center justify-center font-serif text-xs font-semibold tracking-normal group-hover:scale-105 transition-transform duration-200 shadow-sm">
            VR
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-sm sm:text-base font-semibold tracking-tight text-[#202124]">
              {portfolioData.name}
            </span>
            <span className="text-[10px] font-mono text-[#737780] tracking-widest uppercase">
              PORTFOLIO &bull; 2026
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs sm:text-sm font-medium text-[#737780]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.key;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.key)}
                className={`py-1 transition-colors relative hover:text-[#202124] ${
                  isActive ? 'text-[#202124] font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7895B2] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Download Resume Action */}
        <div className="hidden lg:flex items-center gap-3 justify-end">
          <a
            href={portfolioData.resumePath}
            download="Shavva_Varshith_Reddy_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#202124] bg-white border border-[#202124] rounded-full hover:bg-[#202124] hover:text-[#FAF9F6] transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] group"
          >
            <span>Download Resume</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#202124] group-hover:text-[#FAF9F6] group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Mobile & Tablet Header Actions */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenResume}
            className="px-3.5 py-1.5 text-xs font-semibold text-[#202124] bg-white border border-[#202124] rounded-full hover:bg-[#202124] hover:text-[#FAF9F6] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Resume</span>
            <ArrowDown className="w-3 h-3" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 text-[#202124] hover:bg-[#E3E0D9]/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E3E0D9] bg-[#FAF9F6] px-6 py-5 shadow-lg animate-fadeIn">
          <nav className="flex flex-col gap-3 text-sm font-medium text-[#202124]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href, link.key)}
                className="py-1.5 border-b border-[#E3E0D9]/60 hover:text-[#737780] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2">
              <a
                href={portfolioData.resumePath}
                download="Shavva_Varshith_Reddy_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 text-center text-xs font-semibold uppercase tracking-wider bg-[#202124] text-[#F5F3EE] rounded-full hover:bg-[#3C4043] transition-colors flex items-center justify-center gap-2"
              >
                <span>Download Resume</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* Cinematic Scroll Reading Progress Bar */}
      {!shouldReduceMotion && (
        <motion.div
          style={{ scaleX }}
          className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#4B6B94] via-[#7895B2] to-[#B9C9D8] origin-left pointer-events-none shadow-[0_0_8px_rgba(120,149,178,0.5)]"
          aria-hidden="true"
        />
      )}
    </header>
  );
};
