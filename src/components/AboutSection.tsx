import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Terminal,
  Cpu,
  Workflow,
  Sparkles,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface AboutSectionProps {
  onOpenContact?: () => void;
  onOpenResume?: () => void;
}

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'code':
      return <Code2 className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'layout':
      return <Layout className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'server':
      return <Server className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'database':
      return <Database className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'brain':
      return <BrainCircuit className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'terminal':
      return <Terminal className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'cpu':
      return <Cpu className="w-3.5 h-3.5 text-[#7895B2]" />;
    case 'workflow':
      return <Workflow className="w-3.5 h-3.5 text-[#7895B2]" />;
    default:
      return <Code2 className="w-3.5 h-3.5 text-[#7895B2]" />;
  }
};

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  const shouldReduceMotion = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="about"
      aria-label="About and Skills"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#FAF9F6] border-y border-[#E3E0D9] relative overflow-hidden"
    >
      {/* Subtle ambient background accents with gentle breathing loops */}
      <motion.div
        animate={shouldReduceMotion ? {} : { x: [0, 15, 0], y: [0, -12, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-0 w-96 h-96 bg-[#B9C9D8]/18 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : { x: [0, -12, 0], y: [0, 15, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-0 w-80 h-80 bg-[#E3E0D9]/30 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        {/* ========================================================= */}
        {/* 1. Two-Column Story + Editorial Photograph               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 lg:mb-20">
          {/* Left Column: My Story (7 cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
              className="flex items-center gap-2.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                BEHIND THE CODE
              </span>
            </motion.div>

            {/* Editorial Heading */}
            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.05 }}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-serif font-normal tracking-tight text-[#202124] leading-[1.15]"
            >
              A little about the person who{' '}
              <span className="relative inline-block text-[#7895B2]">
                builds.
                {/* Hand-drawn curved underline accent */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#B9C9D8]"
                  viewBox="0 0 140 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5C40 2.5 100 3 137 9.5"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h2>

            {/* Introduction Biography */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.1 }}
              className="space-y-4 text-sm sm:text-base text-[#202124]/85 leading-relaxed font-sans font-normal"
            >
              <p>
                I'm Shavva Varshith Reddy, a Computer Science Engineering student who enjoys turning ideas into useful software.
              </p>
              <p>
                I'm particularly interested in artificial intelligence, developer tools, and building products that solve real-world problems. I enjoy exploring how systems work, learning new technologies, and bringing ideas to life through hands-on projects.
              </p>
              <p>
                I believe good engineering combines curiosity, thoughtful problem-solving, and consistent iteration. Every project is an opportunity to learn something new and create something better.
              </p>
            </motion.div>

            {/* Micro-Details Pill */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#737780]"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E3E0D9] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[#202124]">B.Tech CSE &bull; Hyderabad, India</span>
              </span>
              <span className="hidden sm:inline text-[#E3E0D9]">&bull;</span>
              <span className="inline-flex items-center gap-1.5 text-[#7895B2]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curiosity &bull; Problem Solving &bull; Iteration</span>
              </span>
            </motion.div>
          </div>

          {/* Right Column: Editorial Photograph (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.55, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="relative w-full max-w-sm sm:max-w-md mx-auto lg:max-w-none">
              {/* Soft background breathing glow */}
              <motion.div
                animate={shouldReduceMotion ? {} : { opacity: [0.6, 0.9, 0.6], scale: [0.99, 1.02, 0.99] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2.5 sm:-inset-3 bg-gradient-to-tr from-[#E3E0D9]/60 via-[#B9C9D8]/30 to-[#E3E0D9]/50 rounded-3xl blur-md -z-10"
              />

              {/* Editorial Frame */}
              <div className="overflow-hidden rounded-2xl border border-[#E3E0D9] bg-white shadow-editorial hover:shadow-2xl transition-shadow duration-300">
                <div className="relative aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] w-full overflow-hidden bg-[#ECE9E1]">
                  {!imgError ? (
                    <img
                      src={portfolioData.aboutPortraitPath || '/images/varshith-about.jpg'}
                      alt="Shavva Varshith Reddy standing on a wet street at sunset wearing a muted purple shirt and glasses"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover object-[50%_18%] transition-transform duration-700 ease-out hover:scale-[1.02]"
                      loading="lazy"
                      width={768}
                      height={1024}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F6]">
                      <span className="font-serif text-lg font-medium text-[#202124] mb-1">
                        Shavva Varshith Reddy
                      </span>
                      <span className="text-xs font-mono text-[#737780]">
                        Computer Science Engineer
                      </span>
                    </div>
                  )}

                  {/* Top-right badge */}
                  <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full bg-[#FAF9F6]/90 backdrop-blur-sm border border-[#E3E0D9] shadow-sm pointer-events-none">
                    <span className="text-[10px] font-mono tracking-widest font-semibold text-[#7895B2] uppercase">
                      LEARN &bull; BUILD &bull; ITERATE
                    </span>
                  </div>
                </div>

                {/* Caption below photograph */}
                <div className="px-5 py-3.5 bg-white border-t border-[#E3E0D9] flex items-center justify-between">
                  <span className="text-[11px] font-mono tracking-widest text-[#737780] uppercase font-semibold">
                    THE PERSON BEHIND THE PROJECTS
                  </span>
                  <span className="text-[10px] font-mono text-[#7895B2] uppercase">
                    Portfolio
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* 2. Compact Editorial Skills (Natural Continuation)        */}
        {/* ========================================================= */}
        <div className="pt-12 sm:pt-14 border-t border-[#E3E0D9]">
          <div className="max-w-xl mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                TOOLS OF THE TRADE
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, delay: 0.05 }}
              className="text-2xl sm:text-3xl font-serif font-normal text-[#202124] tracking-tight"
            >
              What I work with.
            </motion.h3>
          </div>

          {/* Compact 2-column layout on desktop, 1-column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-7 sm:gap-y-8">
            {portfolioData.skillCategories.map((group, idx) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.35,
                  delay: shouldReduceMotion ? 0 : idx * 0.03,
                }}
                className="space-y-2.5 pb-2"
              >
                {/* Category label with subtle icon indicator */}
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-[#F5F3EE] border border-[#E3E0D9] flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(group.iconName)}
                  </div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#202124] font-semibold">
                    {group.title}
                  </h4>
                </div>

                {/* Understated skill chips with micro spring hover */}
                <div className="flex flex-wrap gap-1.5 pl-7">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="px-2.5 py-1 text-xs font-mono bg-white border border-[#E3E0D9] rounded-md text-[#202124] hover:border-[#7895B2] hover:bg-[#FAF9F6] transition-colors shadow-2xs cursor-default select-none"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. Simple Closing Call-to-Action Element                  */}
        {/* ========================================================= */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.45 }}
          className="pt-12 sm:pt-14 mt-12 sm:mt-16 border-t border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-xl sm:text-2xl font-serif italic text-[#202124] tracking-tight">
              &ldquo;Curious by nature. Building by practice.&rdquo;
            </p>
            <p className="text-xs font-mono text-[#737780] mt-1">
              Shavva Varshith Reddy &bull; 2026
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#featured-work"
              onClick={(e) => handleScrollTo(e, '#featured-work')}
              className="relative overflow-hidden inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] text-[#F5F3EE] text-xs font-medium uppercase tracking-wider hover:bg-[#3C4043] transition-all shadow-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
            >
              {!shouldReduceMotion && (
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              )}
              <span>Explore My Projects</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {onOpenResume && (
              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E3E0D9] text-[#202124] text-xs font-medium uppercase tracking-wider hover:border-[#202124] hover:bg-[#FAF9F6] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                <FileText className="w-3.5 h-3.5 text-[#7895B2]" />
                <span>View Resume</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
