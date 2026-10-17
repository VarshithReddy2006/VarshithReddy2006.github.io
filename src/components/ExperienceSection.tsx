import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  GitPullRequest,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowUpRight,
  BookmarkCheck,
  Tag,
} from 'lucide-react';
import { portfolioData, ExperienceItem } from '../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      aria-label="Experience & Open Source"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#F5F3EE] border-t border-[#E3E0D9] relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* ========================================================= */}
        {/* Section Header with Editorial Meta                        */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#E3E0D9] gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
              className="flex items-center gap-2 mb-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                ENGINEERING JOURNEY
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#202124]"
            >
              Experience & Open Source
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-[#737780] mt-3 font-sans leading-relaxed"
            >
              Building practical engineering skills through real codebases, open-source contributions, and developer-focused systems.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-mono text-[#737780] flex items-center gap-2"
          >
            <GitPullRequest className="w-3.5 h-3.5 text-[#7895B2]" />
            <span>Verified Contributions & Community Programs</span>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Timeline Stream                                           */}
        {/* ========================================================= */}
        <div className="relative">
          {/* Vertical Timeline Guide Line */}
          <div
            className="hidden sm:block absolute left-6 lg:left-8 top-3 bottom-8 w-px bg-[#E3E0D9]"
            aria-hidden="true"
          />

          <div className="space-y-12 sm:space-y-14">
            {experience.map((item: ExperienceItem, idx: number) => {
              const isFirst = idx === 0;

              return (
                <motion.article
                  key={`${item.organization}-${idx}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{
                    duration: shouldReduceMotion ? 0.01 : 0.45,
                    delay: shouldReduceMotion ? 0 : idx * 0.1,
                  }}
                  className="relative sm:pl-16 lg:pl-20 group"
                  aria-label={`${item.role} at ${item.organization}`}
                >
                  {/* Timeline Marker (Desktop & Tablet) */}
                  <div
                    className="hidden sm:flex absolute left-6 lg:left-8 top-7 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F5F3EE] border-2 border-[#7895B2] items-center justify-center shadow-sm z-10 group-hover:scale-110 transition-transform"
                    aria-hidden="true"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#202124]" />
                  </div>

                  {/* Experience Card */}
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.22, ease: 'easeOut' } }}
                    className={`bg-white border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-9 shadow-editorial transition-all duration-300 hover:shadow-2xl ${
                      isFirst
                        ? 'border-[#202124]/30 ring-1 ring-[#202124]/5 hover:border-[#202124]/60'
                        : 'border-[#E3E0D9] hover:border-[#7895B2]/70'
                    }`}
                  >
                    {/* Top Row: Category, Timeline Period & Distinction Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-[#E3E0D9]">
                      <div className="flex flex-wrap items-center gap-2">
                        {item.category && (
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#737780] font-semibold">
                            {item.category}
                          </span>
                        )}

                        {item.distinctionBadge && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono uppercase tracking-wider font-semibold">
                            <Sparkles className="w-3 h-3 text-emerald-600" />
                            <span>{item.distinctionBadge}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#7895B2] font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-[#737780]" />
                        <span>{item.period}</span>
                      </div>
                    </div>

                    {/* Role & Organisation */}
                    <div className="mb-4">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                        <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#202124] tracking-tight">
                          {item.organization}
                        </h3>
                        {item.link && (
                          <a
                            href={item.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#7895B2] hover:text-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded-md px-1.5 py-0.5 -ml-1.5 sm:ml-0"
                            aria-label={`Visit official page for ${item.organization}`}
                          >
                            <span>{item.link.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-sm font-mono text-[#7895B2] uppercase tracking-wider font-semibold mt-1">
                        {item.role}
                      </p>
                    </div>

                    {/* Short Overview */}
                    {item.description && (
                      <p className="text-xs sm:text-sm text-[#202124]/85 leading-relaxed font-sans mb-5">
                        {item.description}
                      </p>
                    )}

                    {/* Contribution References (e.g. TRUNK tickets for OpenMRS) */}
                    {item.contributionReferences && item.contributionReferences.length > 0 && (
                      <div className="mb-5 p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-[#737780] font-semibold uppercase tracking-wider mr-1">
                          <BookmarkCheck className="w-3.5 h-3.5 text-[#7895B2]" />
                          <span>Contribution References:</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {item.contributionReferences.map((ref) => (
                            <span
                              key={ref}
                              className="px-2.5 py-1 rounded-md bg-white border border-[#E3E0D9] font-mono text-xs font-semibold text-[#202124]"
                            >
                              {ref}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Contributions & Engineering Practices */}
                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#737780] font-semibold block">
                        Engineering Practices & Key Work
                      </span>
                      <ul className="space-y-2">
                        {(item.engineeringPractices || item.points).map((point, pIdx) => (
                          <li
                            key={pIdx}
                            className="text-xs sm:text-sm text-[#202124]/90 flex items-start gap-2.5 leading-relaxed"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#7895B2] flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies Used (Restrained Chips) */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="pt-4 border-t border-[#E3E0D9] flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-1 text-[11px] font-mono text-[#737780] uppercase tracking-wider font-semibold mr-1">
                          <Tag className="w-3 h-3 text-[#7895B2]" />
                          <span>Stack:</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-0.5 text-[11px] font-mono bg-[#F5F3EE] border border-[#E3E0D9] rounded-md text-[#202124]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
