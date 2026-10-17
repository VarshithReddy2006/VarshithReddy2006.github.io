import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface StoryIntroProps {
  onComplete: () => void;
}

interface NarrativeSection {
  id: string;
  number: string;
  title: string;
  eyebrow?: string;
  headline: string;
  supporting: string;
  closingLine?: string;
  footerDetail: string;
}

const NARRATIVE_SECTIONS: NarrativeSection[] = [
  {
    id: 'beginning',
    number: '01',
    title: 'THE BEGINNING',
    eyebrow: 'A NOTE BEFORE WE BEGIN',
    headline: 'Every expert was once a beginner.',
    supporting:
      'Every meaningful journey starts before you feel ready. Mine began with curiosity, a willingness to learn, and the decision to keep going.',
    footerDetail: '01 / THE BEGINNING',
  },
  {
    id: 'struggle',
    number: '02',
    title: 'THE STRUGGLE',
    headline: 'You will feel behind. Learn anyway.',
    supporting:
      'There will always be someone who knows more. Let that inspire you to grow, not convince you to stop.',
    footerDetail: '02 / THE STRUGGLE',
  },
  {
    id: 'practice',
    number: '03',
    title: 'THE PRACTICE',
    headline: 'Small steps. Repeated relentlessly.',
    supporting:
      'One problem solved. One concept understood. One project improved. Progress is rarely dramatic, but consistency compounds.',
    footerDetail: '03 / THE PRACTICE',
  },
  {
    id: 'failures',
    number: '04',
    title: 'THE FAILURES',
    headline: 'Your failures are not your final version.',
    supporting:
      'Not every attempt works. Every setback is an opportunity to understand what went wrong, adapt, and return a little wiser.',
    footerDetail: '04 / THE FAILURES',
  },
  {
    id: 'possibility',
    number: '05',
    title: 'THE POSSIBILITY',
    headline: "You don't need permission to start building.",
    supporting:
      'Start with what you know. Build with what you have. Let your work become the evidence of what you can do.',
    footerDetail: '05 / THE POSSIBILITY',
  },
  {
    id: 'climax',
    number: '06',
    title: 'THE NEXT CHAPTER',
    headline: 'The person you want to become is built by what you do today.',
    supporting: 'Your next chapter starts now.',
    closingLine: 'And this is my story.',
    footerDetail: '06 / THE NEXT CHAPTER',
  },
];

export const StoryIntro: React.FC<StoryIntroProps> = ({ onComplete }) => {
  const shouldReduceMotion = useReducedMotion();

  // Scroll reading progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      role="region"
      aria-label="Editorial Introduction Story"
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
              INTRODUCTORY NOTE &bull; 2026
            </span>
          </div>
        </div>

        {/* Minimal Skip Action */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onComplete}
            aria-label="Skip introduction and enter portfolio directly"
            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono tracking-wider uppercase text-[#525866] hover:text-[#202124] hover:bg-white rounded-full border border-transparent hover:border-[#E3E0D9] transition-all shadow-2xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
          >
            <span>Skip to Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#737780] group-hover:text-[#202124] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Unobtrusive Scroll Progress Line */}
        {!shouldReduceMotion && (
          <motion.div
            style={{ scaleX }}
            className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#4B6B94] via-[#7895B2] to-[#B9C9D8] origin-left pointer-events-none"
            aria-hidden="true"
          />
        )}
      </header>

      {/* ========================================================= */}
      {/* CONTINUOUS VERTICAL EDITORIAL NARRATIVE                   */}
      {/* ========================================================= */}
      <main className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12">
        {NARRATIVE_SECTIONS.map((section, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === NARRATIVE_SECTIONS.length - 1;

          return (
            <motion.section
              key={section.id}
              initial={{
                opacity: 0,
                y: shouldReduceMotion ? 0 : 28,
              }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{
                duration: shouldReduceMotion ? 0.01 : 0.65,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`min-h-[75vh] sm:min-h-[85vh] lg:min-h-[88vh] flex flex-col justify-between py-16 sm:py-24 lg:py-28 ${
                !isFirst ? 'border-t border-[#E3E0D9]/70' : ''
              }`}
            >
              {/* Top Meta Area */}
              <div className="pt-2">
                {section.eyebrow ? (
                  <div className="flex items-center gap-2 mb-6 sm:mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#525866] font-semibold">
                      {section.eyebrow}
                    </span>
                  </div>
                ) : (
                  <div className="mb-6 sm:mb-8">
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-[#7895B2] font-semibold">
                      PART {section.number}
                    </span>
                  </div>
                )}
              </div>

              {/* Main Text Content */}
              <div className="my-auto max-w-2xl sm:max-w-3xl">
                {/* Large Editorial Headline */}
                <h2 className="text-[clamp(2.2rem,4.5vw,4.5rem)] font-serif font-normal text-[#202124] tracking-[-0.025em] leading-[1.12] mb-6 sm:mb-8">
                  {section.headline}
                </h2>

                {/* Supporting Editorial Paragraph */}
                <p className="text-base sm:text-lg lg:text-xl text-[#525866] leading-[1.7] font-sans font-normal max-w-2xl">
                  {section.supporting}
                </p>

                {/* Section 06 Signature & Primary Enter Portfolio Action */}
                {isLast && (
                  <div className="pt-10 sm:pt-12 space-y-8">
                    {section.closingLine && (
                      <div className="border-l-2 border-[#7895B2]/60 pl-5 sm:pl-6 py-1">
                        <p className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#202124] tracking-tight">
                          &ldquo;{section.closingLine}&rdquo;
                        </p>
                        <span className="text-xs font-mono text-[#737780] block mt-2">
                          Shavva Varshith Reddy &bull; 2026
                        </span>
                      </div>
                    )}

                    {/* Primary CTA Button */}
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={onComplete}
                        className="relative overflow-hidden group inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 rounded-full bg-[#202124] text-[#FAF9F6] text-xs sm:text-sm font-mono uppercase tracking-wider font-semibold hover:bg-[#34373C] active:scale-[0.98] transition-all shadow-md hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                      >
                        {/* Subtle Shimmer Reflection */}
                        {!shouldReduceMotion && (
                          <span
                            className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                            aria-hidden="true"
                          />
                        )}
                        <span>ENTER PORTFOLIO</span>
                        <ArrowRight className="w-4 h-4 text-[#FAF9F6] group-hover:translate-x-1.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Subtle Scroll Hint on First Section */}
                {isFirst && (
                  <div className="pt-10 flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-[#737780] select-none pointer-events-none">
                    <ArrowDown className="w-3.5 h-3.5 text-[#7895B2] animate-bounce" />
                    <span>Scroll to read narrative</span>
                  </div>
                )}
              </div>

              {/* Section Footer Detail */}
              <div className="pt-8 flex items-center justify-between border-t border-[#E3E0D9]/50 text-xs font-mono text-[#737780]">
                <span>{section.footerDetail}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#7895B2]/70">
                  {idx + 1} / {NARRATIVE_SECTIONS.length}
                </span>
              </div>
            </motion.section>
          );
        })}
      </main>

      {/* ========================================================= */}
      {/* EDITORIAL BOTTOM TRANSITION STRIP                         */}
      {/* ========================================================= */}
      <footer className="border-t border-[#E3E0D9] py-10 px-6 sm:px-10 text-center bg-[#F5F3EE]">
        <div className="max-w-xl mx-auto flex flex-col items-center gap-4">
          <p className="text-xs font-mono text-[#737780] tracking-wider uppercase">
            END OF INTRODUCTORY NOTE
          </p>
          <button
            type="button"
            onClick={onComplete}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#202124] hover:text-[#7895B2] font-semibold underline underline-offset-4 transition-colors"
          >
            <span>Proceed directly to portfolio overview &rarr;</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
