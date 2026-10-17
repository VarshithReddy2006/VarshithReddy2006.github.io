import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Eye,
  X,
  ExternalLink,
} from 'lucide-react';
import { portfolioData, MilestoneItem } from '../data/portfolioData';

export const AchievementsSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCertificate, setSelectedCertificate] = useState<MilestoneItem | null>(null);

  const items = portfolioData.recognitionItems || [];
  const featuredCertification = items.find((item) => item.featured) || items[0];
  const supportingMilestones = items.filter((item) => !item.featured);

  // Keyboard accessibility: Close on Escape key and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCertificate(null);
      }
    };

    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <section
      id="achievements"
      aria-label="Achievements & Recognition"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#F5F3EE] border-t border-[#E3E0D9] relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* ========================================================= */}
        {/* Section Header                                            */}
        {/* ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-8 border-b border-[#E3E0D9] gap-6">
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
                MILESTONES & RECOGNITION
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.05 }}
              className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#202124]"
            >
              Achievements & Recognition
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-[#737780] mt-3 font-sans leading-relaxed"
            >
              Milestones in AI, open-source engineering, competitive programming, and continuous technical growth.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs font-mono text-[#737780] flex items-center gap-2"
          >
            <Award className="w-3.5 h-3.5 text-[#7895B2]" />
            <span>Verified Credentials & Track Records</span>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* Featured Recognition: Oracle Agentic AI Certification     */}
        {/* ========================================================= */}
        {featuredCertification && (
          <motion.article
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={shouldReduceMotion ? {} : { y: -4, transition: { duration: 0.25, ease: 'easeOut' } }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
            className="mb-12 bg-white border border-[#202124]/30 ring-1 ring-[#202124]/5 hover:border-[#202124]/50 rounded-2xl sm:rounded-3xl p-6 sm:p-9 lg:p-10 shadow-editorial hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            aria-label={`Featured certification: ${featuredCertification.title}`}
          >
            {/* Top metadata row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#E3E0D9]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#737780] font-semibold">
                  {featuredCertification.category}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E3E0D9]" />
                <span className="text-xs font-mono text-[#202124] font-semibold">
                  {featuredCertification.issuer}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {featuredCertification.distinctionBadge && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#202124] text-[#F5F3EE] text-[10px] font-mono uppercase tracking-wider font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#B9C9D8]" />
                    <span>{featuredCertification.distinctionBadge}</span>
                  </span>
                )}
                {featuredCertification.period && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#7895B2] font-semibold">
                    <Calendar className="w-3.5 h-3.5 text-[#737780]" />
                    <span>{featuredCertification.period}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Title and Credential ID */}
            <div className="mb-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-[#202124] tracking-tight leading-tight">
                  {featuredCertification.title}
                </h3>
              </div>

              {featuredCertification.credentialId && (
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#737780] font-semibold">
                    Credential Identifier:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E3E0D9] font-mono text-xs font-bold text-[#202124]">
                    {featuredCertification.credentialId}
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#202124]/85 leading-relaxed font-sans mb-6 max-w-4xl">
              {featuredCertification.description}
            </p>

            {/* Verified Curriculum Highlights */}
            {featuredCertification.highlights && (
              <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9]">
                <span className="text-xs font-mono uppercase tracking-wider text-[#737780] font-semibold block mb-3">
                  Validated Competencies
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {featuredCertification.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="text-xs sm:text-sm text-[#202124]/90 flex items-start gap-2.5 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#7895B2] flex-shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags & Meta Chips */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#E3E0D9]">
              {featuredCertification.tags && (
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-[#737780] uppercase tracking-wider font-semibold mr-1">
                    Domain Topics:
                  </span>
                  {featuredCertification.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono bg-[#F5F3EE] border border-[#E3E0D9] rounded-md text-[#202124]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {featuredCertification.certificateImage && (
                <button
                  type="button"
                  onClick={() => setSelectedCertificate(featuredCertification)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#FAF9F6] text-[#202124] border border-[#202124]/20 hover:border-[#7895B2] hover:bg-[#F5F3EE] hover:text-[#7895B2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  aria-label={`View Certificate for ${featuredCertification.title}`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#7895B2]" />
                  <span>View Certificate</span>
                </button>
              )}
            </div>
          </motion.article>
        )}

        {/* ========================================================= */}
        {/* Supporting Milestones Grid                                */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {supportingMilestones.map((item: MilestoneItem, mIdx: number) => {
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                whileHover={shouldReduceMotion ? {} : { y: -5, transition: { duration: 0.22, ease: 'easeOut' } }}
                transition={{
                  duration: shouldReduceMotion ? 0.01 : 0.45,
                  delay: shouldReduceMotion ? 0 : mIdx * 0.08,
                }}
                className="bg-white border border-[#E3E0D9] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-editorial hover:border-[#7895B2]/70 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                aria-label={item.title}
              >
                <div>
                  {/* Card Header: Category & Distinction Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[#E3E0D9]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737780] font-semibold">
                      {item.category}
                    </span>

                    {item.distinctionBadge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono uppercase tracking-wider font-semibold">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{item.distinctionBadge}</span>
                      </span>
                    )}
                  </div>

                  {/* Provider & Duration / Issue Date */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#7895B2] mb-2 font-medium">
                    <span className="font-semibold text-[#202124]">{item.issuer}</span>
                    <div className="flex items-center gap-2 text-xs text-[#737780]">
                      {item.duration && (
                        <span className="px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] font-semibold text-[11px]">
                          {item.duration}
                        </span>
                      )}
                      {item.period && <span>{item.period}</span>}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif font-semibold text-[#202124] tracking-tight mb-2 group-hover:text-[#7895B2] transition-colors">
                    {item.title}
                  </h3>

                  {/* Certificate Number / Credential ID if present */}
                  {item.credentialId && (
                    <div className="flex items-center gap-2 text-xs font-mono mb-3">
                      <span className="text-[10px] uppercase tracking-wider text-[#737780] font-semibold">
                        Certificate No:
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] font-semibold text-[11px]">
                        {item.credentialId}
                      </span>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#202124]/80 leading-relaxed font-sans mb-4">
                    {item.description}
                  </p>

                  {/* Quantitative Metrics (for competitive programming) */}
                  {item.metrics && item.metrics.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF9F6] border border-[#E3E0D9] rounded-xl mb-4">
                      {item.metrics.map((metric, idx) => (
                        <div key={idx} className="text-center">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-[#737780] block">
                            {metric.label}
                          </span>
                          <span className="text-base sm:text-lg font-serif font-bold text-[#202124]">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights Bullet List */}
                  {item.highlights && item.highlights.length > 0 && (
                    <ul className="space-y-1.5 mb-5">
                      {item.highlights.map((hl, hIndex) => (
                        <li key={hIndex} className="text-xs text-[#202124]/85 flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] mt-1.5 flex-shrink-0" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Footer: Tags & Verified Action Links */}
                <div className="pt-4 border-t border-[#E3E0D9] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1">
                    {item.tags?.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] font-mono bg-[#F5F3EE] border border-[#E3E0D9] rounded text-[#202124]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    {item.certificateImage && (
                      <button
                        type="button"
                        onClick={() => setSelectedCertificate(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-[#FAF9F6] text-[#202124] border border-[#202124]/20 hover:border-[#7895B2] hover:bg-[#F5F3EE] hover:text-[#7895B2] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                        aria-label={`View Certificate for ${item.title}`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#7895B2]" />
                        <span>View Certificate</span>
                      </button>
                    )}

                    {item.links && item.links.length > 0 && (
                      <div className="flex items-center gap-2">
                        {item.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-mono text-[#7895B2] hover:text-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded px-1.5 py-0.5"
                            aria-label={`Visit verified link for ${link.label}`}
                          >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Accessible Certificate Preview Modal                     */}
      {/* ========================================================= */}
      <AnimatePresence>
        {selectedCertificate && selectedCertificate.certificateImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
            aria-describedby="certificate-modal-desc"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCertificate(null)}
              className="fixed inset-0 bg-[#202124]/75 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#E3E0D9] shadow-2xl max-w-4xl w-full z-10 overflow-hidden my-auto flex flex-col max-h-[92vh]"
            >
              {/* Header */}
              <div className="flex items-start justify-between p-4 sm:p-6 border-b border-[#E3E0D9] bg-[#FAF9F6] gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737780] font-semibold">
                      {selectedCertificate.category}
                    </span>
                    {selectedCertificate.distinctionBadge && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-mono uppercase tracking-wider font-semibold">
                        <Sparkles className="w-2.5 h-2.5 text-emerald-600" />
                        <span>{selectedCertificate.distinctionBadge}</span>
                      </span>
                    )}
                  </div>
                  <h3
                    id="certificate-modal-title"
                    className="text-lg sm:text-2xl font-serif font-semibold text-[#202124] tracking-tight"
                  >
                    {selectedCertificate.title}
                  </h3>
                  <p id="certificate-modal-desc" className="text-xs font-mono text-[#7895B2]">
                    Issued by <span className="font-semibold text-[#202124]">{selectedCertificate.issuer}</span>
                    {selectedCertificate.duration && ` · Duration: ${selectedCertificate.duration}`}
                    {selectedCertificate.period && ` · Date: ${selectedCertificate.period}`}
                    {selectedCertificate.credentialId && ` · No: ${selectedCertificate.credentialId}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedCertificate(null)}
                  className="p-2 rounded-xl text-[#737780] hover:text-[#202124] hover:bg-[#E3E0D9]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] flex-shrink-0"
                  aria-label="Close certificate preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body / Certificate Image Display */}
              <div className="p-3 sm:p-6 overflow-y-auto bg-[#F5F3EE]/60 flex flex-col items-center justify-center">
                <div className="relative rounded-xl overflow-hidden border border-[#E3E0D9] bg-white shadow-md max-w-full">
                  <img
                    src={selectedCertificate.certificateImage}
                    alt={`Certificate for ${selectedCertificate.title} awarded to Shavva Varshith Reddy by ${selectedCertificate.issuer}`}
                    className="w-full h-auto max-h-[60vh] object-contain block select-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 border-t border-[#E3E0D9] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2 text-center sm:text-left">
                  <span className="font-mono text-[#737780]">Verification:</span>
                  <span className="font-mono text-[#202124] font-medium">
                    Genuine certificate document ({selectedCertificate.credentialId || 'Verified'})
                  </span>
                  <span className="hidden sm:inline text-[#E3E0D9]">·</span>
                  <span className="text-[11px] font-sans text-[#737780]">
                    Awarded to Shavva Varshith Reddy · Preserved original document
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={selectedCertificate.certificateImage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E3E0D9] bg-[#FAF9F6] text-[#202124] hover:border-[#7895B2] hover:text-[#7895B2] font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Full Size</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSelectedCertificate(null)}
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-[#202124] text-white hover:bg-[#202124]/85 font-mono text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

