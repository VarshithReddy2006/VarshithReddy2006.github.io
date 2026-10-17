import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface StoryIntroProps {
  onComplete: () => void;
}

interface ChapterConfig {
  id: string;
  number: string;
  eyebrow?: string;
  lines: string[];
  highlightLineIndex?: number;
  supporting: string;
  footerTag: string;
}

const CHAPTERS: ChapterConfig[] = [
  {
    id: 'beginning',
    number: '01',
    eyebrow: 'A NOTE BEFORE WE BEGIN',
    lines: ['Every expert', 'was once a beginner.'],
    supporting:
      'Every meaningful journey starts before you feel ready. Mine began with curiosity, a willingness to learn, and the decision to keep going.',
    footerTag: '01 / THE BEGINNING',
  },
  {
    id: 'struggle',
    number: '02',
    lines: ['You will feel behind.', 'Learn anyway.'],
    highlightLineIndex: 1, // Resolute emphasis on "Learn anyway."
    supporting:
      'There will always be someone who knows more. Let that inspire you to grow, not convince you to stop.',
    footerTag: '02 / THE STRUGGLE',
  },
  {
    id: 'practice',
    number: '03',
    lines: ['Small steps.', 'Repeated relentlessly.'],
    supporting:
      'One problem solved. One concept understood. One project improved. Progress is rarely dramatic, but consistency compounds.',
    footerTag: '03 / THE PRACTICE',
  },
  {
    id: 'failures',
    number: '04',
    lines: ['Your failures', 'are not your final version.'],
    supporting:
      'Not every attempt works. Every setback is an opportunity to understand what went wrong, adapt, and return a little wiser.',
    footerTag: '04 / THE FAILURES',
  },
  {
    id: 'possibility',
    number: '05',
    lines: ["You don't need permission", 'to start building.'],
    highlightLineIndex: 1, // Momentum on "to start building."
    supporting:
      'Start with what you know. Build with what you have. Let your work become the evidence of what you can do.',
    footerTag: '05 / THE POSSIBILITY',
  },
  {
    id: 'climax',
    number: '06',
    lines: ['The person you want to become', 'is built by what you do today.'],
    supporting: 'Your next chapter starts now.',
    footerTag: '06 / THE NEXT CHAPTER',
  },
];

interface ChapterSectionProps {
  chapter: ChapterConfig;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  shouldReduceMotion: boolean | null;
  onComplete: () => void;
}

const ChapterSection: React.FC<ChapterSectionProps> = ({
  chapter,
  isFirst,
  isLast,
  shouldReduceMotion,
  onComplete,
}) => {
  const containerRef = useRef<HTMLElement>(null);

  // Track natural scroll progress through this chapter
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Continuous scroll-linked motion transforms for cinematic typography
  const opacity = useTransform(
    scrollYProgress,
    [0.08, 0.28, 0.74, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.12]
  );

  const y = useTransform(
    scrollYProgress,
    [0.08, 0.28, 0.74, 0.96],
    shouldReduceMotion ? [0, 0, 0, 0] : [42, 0, 0, -32]
  );

  const scale = useTransform(
    scrollYProgress,
    [0.08, 0.28, 0.74, 0.96],
    shouldReduceMotion ? [1, 1, 1, 1] : [0.98, 1, 1, 0.99]
  );

  const filter = useTransform(
    scrollYProgress,
    [0.08, 0.24, 0.76, 0.96],
    shouldReduceMotion
      ? ['none', 'none', 'none', 'none']
      : ['blur(7px)', 'blur(0px)', 'blur(0px)', 'blur(5px)']
  );

  return (
    <section
      ref={containerRef}
      className={`min-h-[82vh] sm:min-h-[88vh] lg:min-h-[92vh] flex flex-col justify-between py-16 sm:py-24 lg:py-28 relative ${
        !isFirst ? 'border-t border-[#E3E0D9]/60' : ''
      }`}
    >
      {/* Scroll-linked transform container */}
      <motion.div
        style={{
          opacity,
          y,
          scale,
          filter,
        }}
        className="my-auto max-w-3xl"
      >
        {/* Top Eyebrow / Chapter Label */}
        <div className="mb-6 sm:mb-8">
          {chapter.eyebrow ? (
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#525866] font-semibold">
                {chapter.eyebrow}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7895B2] font-semibold">
                PART {chapter.number}
              </span>
            </div>
          )}
        </div>

        {/* Cinematic Headline: Line-by-line staggered entrance */}
        <h2 className="text-[clamp(2.3rem,4.8vw,4.8rem)] font-serif font-normal tracking-[-0.03em] leading-[1.12] text-[#202124] mb-6 sm:mb-8">
          {chapter.lines.map((line, lIdx) => {
            const isHighlighted = chapter.highlightLineIndex === lIdx;
            return (
              <motion.span
                key={lIdx}
                initial={{
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 22,
                  filter: shouldReduceMotion ? 'none' : 'blur(6px)',
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.65,
                  delay: shouldReduceMotion ? 0 : lIdx * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block ${
                  isHighlighted ? 'text-[#4B6B94] font-medium' : 'text-[#202124]'
                }`}
              >
                {line}
              </motion.span>
            );
          })}
        </h2>

        {/* Supporting Editorial Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.6,
            delay: shouldReduceMotion ? 0 : chapter.lines.length * 0.16 + 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="text-base sm:text-lg lg:text-xl text-[#525866] leading-[1.72] font-sans font-normal max-w-2xl"
        >
          {chapter.supporting}
        </motion.p>

        {/* Chapter 06: Grand Climax Signature & Final CTA */}
        {isLast && (
          <div className="pt-10 sm:pt-14 space-y-8">
            {/* Closing Signature Line */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.65,
                delay: shouldReduceMotion ? 0 : 0.45,
              }}
              className="border-l-2 border-[#7895B2]/60 pl-5 sm:pl-6 py-1"
            >
              <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#202124] tracking-tight">
                &ldquo;And this is my story.&rdquo;
              </p>
              <span className="text-xs font-mono text-[#737780] block mt-2">
                Shavva Varshith Reddy &bull; 2026
              </span>
            </motion.div>

            {/* Primary Enter Portfolio Button */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5% 0px' }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.65,
                delay: shouldReduceMotion ? 0 : 0.65,
              }}
              className="pt-2"
            >
              <button
                type="button"
                onClick={onComplete}
                className="relative overflow-hidden group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#202124] text-[#FAF9F6] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold hover:bg-[#34373C] active:scale-[0.98] transition-all shadow-md hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                {!shouldReduceMotion && (
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                )}
                <span>ENTER PORTFOLIO</span>
                <ArrowRight className="w-4 h-4 text-[#FAF9F6] group-hover:translate-x-1.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}

        {/* Chapter 01: Subtle Scroll Indicator */}
        {isFirst && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="pt-10 flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#737780] select-none pointer-events-none"
          >
            <ArrowDown className="w-3.5 h-3.5 text-[#7895B2] animate-bounce" />
            <span>Scroll to read story</span>
          </motion.div>
        )}
      </motion.div>

      {/* Chapter Footer Tag */}
      <div className="pt-8 flex items-center justify-between text-xs font-mono text-[#737780] border-t border-[#E3E0D9]/40">
        <span>{chapter.footerTag}</span>
        <span className="text-[11px] font-mono tracking-wider uppercase text-[#7895B2]/70">
          {isLast ? 'DESTINATION' : 'NARRATIVE'}
        </span>
      </div>
    </section>
  );
};

export const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  // Global reading-progress indicator smoothly driven by vertical scroll
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      role="region"
      aria-label="Cinematic Editorial Story"
      className="min-h-screen bg-[#F5F3EE] text-[#202124] relative selection:bg-[#7895B2]/20 font-sans"
    >
      {/* ========================================================= */}
      {/* MINIMAL STICKY HEADER WITH PROGRESS INDICATOR             */}
      {/* ========================================================= */}
      <header className="sticky top-0 left-0 right-0 z-40 bg-[#F5F3EE]/95 backdrop-blur-md border-b border-[#E3E0D9]/80 py-3.5 sm:py-4 px-6 sm:px-10 lg:px-14 flex items-center justify-between transition-all">
        {/* Monogram Brand Mark */}
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-full bg-[#202124] text-[#F5F3EE] flex items-center justify-center font-serif text-xs font-semibold tracking-normal shadow-xs">
            VR
          </span>
          <div className="flex flex-col">
            <span className="font-serif text-xs sm:text-sm font-semibold tracking-tight text-[#202124]">
              {portfolioData.name}
            </span>
            <span className="text-[10px] font-mono text-[#737780] tracking-widest uppercase">
              EDITORIAL ESSAY &bull; 2026
            </span>
          </div>
        </div>

        {/* Minimal Skip Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onComplete}
            aria-label="Skip story and enter portfolio directly"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#525866] hover:text-[#202124] hover:bg-white rounded-full border border-transparent hover:border-[#E3E0D9] transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            <span>Skip to Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#737780] group-hover:text-[#202124] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Smooth Scroll Reading Progress Line */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleX }}
            className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#4B6B94] via-[#7895B2] to-[#B9C9D8] origin-left pointer-events-none"
            aria-hidden="true"
          />
        )}
      </header>

      {/* ========================================================= */}
      {/* CONTINUOUS VERTICAL NARRATIVE                             */}
      {/* ========================================================= */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        {CHAPTERS.map((chapter, idx) => (
          <ChapterSection
            key={chapter.id}
            chapter={chapter}
            index={idx}
            isFirst={idx === 0}
            isLast={idx === CHAPTERS.length - 1}
            shouldReduceMotion={shouldReduceMotion}
            onComplete={onComplete}
          />
        ))}
      </main>

      {/* ========================================================= */}
      {/* BOTTOM TRANSITION STRIP                                   */}
      {/* ========================================================= */}
      <footer className="border-t border-[#E3E0D9] py-12 px-6 sm:px-10 text-center bg-[#F5F3EE]">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <p className="text-xs font-mono text-[#737780] tracking-wider uppercase">
            END OF INTRODUCTORY ESSAY
          </p>
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#202124] hover:text-[#7895B2] font-semibold underline underline-offset-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            <span>Proceed to portfolio &rarr;</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
