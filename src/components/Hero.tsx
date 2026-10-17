import React, { useState } from 'react';
import { motion, useReducedMotion, useMotionValue, useTransform, useSpring, Variants } from 'framer-motion';
import { ArrowRight, ArrowDown, FileText, UserCheck } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { SocialLinks } from './SocialLinks';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const [imageError, setImageError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // 3D Perspective interactive tilt on portrait
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), {
    stiffness: 180,
    damping: 24,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), {
    stiffness: 180,
    damping: 24,
  });

  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handlePortraitMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('featured-work');
    if (element) {
      const headerOffset = 76;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="scroll-mt-24 pt-24 pb-8 sm:pt-28 sm:pb-10 lg:pt-32 lg:pb-12 border-b border-[#E3E0D9] bg-[#F5F3EE] relative overflow-hidden"
    >
      {/* Decorative ambient background accents with gentle breathing loops */}
      <motion.div
        animate={shouldReduceMotion ? {} : { x: [0, 20, 0], y: [0, -16, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-8 w-96 lg:w-[28rem] h-96 lg:h-[28rem] bg-[#B9C9D8]/20 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <motion.div
        animate={shouldReduceMotion ? {} : { x: [0, -16, 0], y: [0, 18, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-4 w-72 h-72 bg-[#E3E0D9]/30 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center"
        >
          {/* Left Column: Typography, Introduction, Actions & Socials (6 cols) */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center relative z-20">
            {/* Eyebrow / Supertitle */}
            <motion.div variants={itemVariants} className="flex items-center gap-2 mb-3.5 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
              <span className="text-[11px] sm:text-xs font-mono tracking-[0.16em] uppercase text-[#525866] font-semibold">
                {portfolioData.role}
              </span>
            </motion.div>

            {/* Main Editorial Headline: "Shavva Varshith" on Line 1, "Reddy" on Line 2 */}
            <motion.div variants={itemVariants} className="relative mb-5 sm:mb-6">
              <h1 className="text-[clamp(2.6rem,4.5vw,5.1rem)] font-serif font-normal tracking-[-0.03em] text-[#202124] leading-[1.04]">
                <span className="block whitespace-nowrap">Shavva Varshith</span>
                <span className="relative inline-block text-[#4B6B94]">
                  Reddy
                  {/* Refined hand-drawn underline accent */}
                  <svg
                    className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-[#7895B2]/60 pointer-events-none"
                    viewBox="0 0 240 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 11.5C65 3.5 175 4 237 13"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
            </motion.div>

            {/* Core Introduction */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg lg:text-[1.125rem] text-[#202124]/85 leading-[1.62] max-w-lg mb-7 sm:mb-8 font-sans"
            >
              {portfolioData.introduction}
            </motion.p>

            {/* Actions: Explore My Work & View Resume */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 sm:gap-3.5 mb-7 sm:mb-8"
            >
              <a
                href="#featured-work"
                onClick={handleScrollToWork}
                className="relative overflow-hidden inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 h-12 rounded-full bg-[#202124] text-[#FAF9F6] text-sm font-semibold tracking-wide hover:bg-[#34373C] active:scale-[0.98] shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE] group"
              >
                {/* Cinematic shimmer light sweep reflection */}
                {!shouldReduceMotion && (
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 text-[#FAF9F6] group-hover:translate-x-1 transition-transform duration-200" />
              </a>

              <button
                type="button"
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#D2CEC4] text-[#202124] text-sm font-semibold tracking-wide hover:border-[#202124] hover:bg-white active:scale-[0.98] shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F3EE] group"
              >
                <FileText className="w-4 h-4 text-[#525866] group-hover:text-[#202124] transition-colors" />
                <span>View Resume</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#525866] group-hover:text-[#202124] group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Social Links Row with Clean Accent */}
            <motion.div variants={itemVariants} className="relative pt-1 flex items-center gap-6">
              <div>
                <span className="block text-[10.5px] font-mono tracking-[0.16em] uppercase text-[#737780] font-semibold mb-2.5">
                  CONNECT WITH ME
                </span>
                <SocialLinks
                  socials={portfolioData.socials}
                  variant="cards"
                  email={portfolioData.email}
                />
              </div>

              {/* Faint code watermark positioned cleanly beside social cards */}
              <div
                className="text-3xl font-mono text-[#7895B2]/20 font-light select-none pointer-events-none hidden sm:block self-end pb-1"
                aria-hidden="true"
              >
                &lt;/&gt;
              </div>
            </motion.div>
          </div>

          {/* Right Column: Prominent Portrait & Balanced Accents (6 cols) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-end relative mt-2 lg:mt-0"
          >
            {/* 4-point Star Sparkle near Top Right with continuous slow 360-degree rotation */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
              className="absolute -top-2 right-6 sm:right-10 lg:right-8 text-[#4B6B94] opacity-50 select-none pointer-events-none z-10"
              aria-hidden="true"
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z" />
              </svg>
            </motion.div>

            {/* Handwritten script slogan: "Build. Learn. Innovate." on the right edge with gentle floating bob */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="absolute top-[50%] right-0 sm:right-1 lg:-right-2 xl:right-1 transform -translate-y-1/2 rotate-6 z-10 pointer-events-none text-right select-none opacity-80 hover:opacity-100 transition-opacity"
              aria-hidden="true"
            >
              <div className="font-script text-2xl sm:text-3xl lg:text-[2rem] text-[#525866] leading-[1.08] tracking-wide space-y-0.5">
                <div className="block">Build.</div>
                <div className="block pl-2">Learn.</div>
                <div className="block pl-4 relative inline-block">
                  Innovate.
                  {/* Subtle underline beneath Innovate matching reference */}
                  <svg
                    className="absolute -bottom-1 left-0 w-full h-2 text-[#7895B2]/60"
                    viewBox="0 0 100 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 5C30 2 70 2 98 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>

            {/* Portrait Image Container: Interactive 3D perspective tilt on hover */}
            <motion.div
              style={shouldReduceMotion ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              className="relative w-full max-w-[22rem] sm:max-w-md lg:max-w-[31rem] xl:max-w-[34rem] [perspective:1000px]"
            >
              <div className="relative overflow-hidden [mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_86%,transparent_100%)]">
                {!imageError ? (
                  <img
                    src={portfolioData.portraitPath}
                    alt={`Portrait of ${portfolioData.name}`}
                    onError={() => setImageError(true)}
                    className="w-full h-auto object-contain object-bottom contrast-[1.02] filter transition-transform duration-300"
                    loading="eager"
                    width={1024}
                    height={844}
                  />
                ) : (
                  /* Graceful Editorial Fallback */
                  <div className="w-full aspect-[4/3] rounded-3xl bg-gradient-to-b from-[#FAF9F6] to-[#ECE9E1] border border-[#E3E0D9] p-8 flex flex-col justify-between text-[#202124]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#737780]">
                        Portrait Slot
                      </span>
                      <UserCheck className="w-5 h-5 text-[#737780]" />
                    </div>
                    <div className="text-center py-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-[#202124] text-[#F5F3EE] flex items-center justify-center font-serif text-2xl font-semibold mb-3">
                        VR
                      </div>
                      <h3 className="font-serif text-xl font-medium">{portfolioData.name}</h3>
                      <p className="text-xs font-mono text-[#737780] mt-1">{portfolioData.role}</p>
                    </div>
                    <div className="text-center text-xs font-mono text-[#737780]">
                      Expected path: {portfolioData.portraitPath}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
