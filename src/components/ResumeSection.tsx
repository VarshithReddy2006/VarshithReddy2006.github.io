import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  Layers,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const ResumeSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { education, skills, experience, achievements, projects } = portfolioData;

  return (
    <section
      id="resume"
      aria-label="Resume"
      className="scroll-mt-24 py-20 sm:py-28 bg-[#F5F3EE] border-t border-[#E3E0D9] relative"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        {/* Section Header & Download Action Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#E3E0D9] gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono tracking-widest uppercase text-[#737780]">
                Curriculum Vitae
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-[#202124]">
              Resume & Credentials
            </h2>
            <p className="text-xs sm:text-sm text-[#737780] mt-2">
              Available in structured text format and downloadable official PDF.
            </p>
          </div>

          {/* Download & Open Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={portfolioData.resumePath}
              download="Shavva_Varshith_Reddy_Resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] text-[#F5F3EE] text-xs font-medium uppercase tracking-wider hover:bg-[#3C4043] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF (93 KB)</span>
            </a>

            <a
              href={portfolioData.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-[#E3E0D9] text-[#202124] text-xs font-medium uppercase tracking-wider hover:border-[#202124] hover:bg-[#FAF9F6] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
            >
              <span>View PDF</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Paper-styled Resume Container */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.5 }}
          className="bg-white border border-[#E3E0D9] rounded-3xl p-6 sm:p-12 shadow-editorial space-y-12 text-[#202124]"
        >
          {/* Resume Header */}
          <div className="border-b border-[#E3E0D9] pb-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h3 className="text-3xl sm:text-4xl font-serif font-semibold tracking-tight text-[#202124]">
                  {portfolioData.name}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-[#7895B2] font-semibold uppercase tracking-wider mt-1">
                  {portfolioData.role}
                </p>
              </div>

              {/* Contact meta pills */}
              <div className="text-xs font-mono text-[#737780] space-y-1 sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#202124]" />
                  <span>{portfolioData.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#202124]" />
                  <span>{portfolioData.phone}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#202124]" />
                  <a
                    href={`mailto:${portfolioData.email}`}
                    className="text-[#202124] hover:underline"
                  >
                    {portfolioData.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Profile Links Bar */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-6 pt-4 border-t border-[#E3E0D9]/60 text-xs font-mono">
              {portfolioData.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#737780] hover:text-[#202124] transition-colors inline-flex items-center gap-1"
                >
                  <span className="font-semibold text-[#202124]">{social.name}:</span>
                  <span className="truncate">{social.handle}</span>
                  <ExternalLink className="w-3 h-3 opacity-40" />
                </a>
              ))}
            </div>
          </div>

          {/* Section 1: Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E3E0D9] pb-2">
              <GraduationCap className="w-4 h-4 text-[#7895B2]" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#202124]">
                Education
              </h4>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
              <div>
                <h5 className="font-serif text-lg font-semibold text-[#202124]">
                  {education.institution}
                </h5>
                <p className="text-xs sm:text-sm text-[#737780]">
                  {education.degree} &bull; <strong className="text-[#202124]">CGPA: {education.cgpa}</strong>
                </p>
              </div>
              <div className="text-xs font-mono text-[#737780] sm:text-right">
                <span className="block font-medium text-[#202124]">{education.duration}</span>
                <span>{education.location}</span>
              </div>
            </div>
          </div>

          {/* Section 2: Technical Skills */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E3E0D9] pb-2">
              <Code2 className="w-4 h-4 text-[#7895B2]" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#202124]">
                Technical Skills
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
                <strong className="font-mono text-[11px] uppercase tracking-wider text-[#737780] block mb-1">
                  Languages:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {skills.languages.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#202124]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
                <strong className="font-mono text-[11px] uppercase tracking-wider text-[#737780] block mb-1">
                  Backend & Systems:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {skills.backend.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#202124]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
                <strong className="font-mono text-[11px] uppercase tracking-wider text-[#737780] block mb-1">
                  Frontend Development:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#202124]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
                <strong className="font-mono text-[11px] uppercase tracking-wider text-[#737780] block mb-1">
                  Databases:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {skills.databases.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#202124]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] md:col-span-2">
                <strong className="font-mono text-[11px] uppercase tracking-wider text-[#737780] block mb-1">
                  Tools, Platforms & Core CS:
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {[...skills.tools, ...skills.coreCS].map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#202124]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Experience */}
          <div id="resume-experience" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E3E0D9] pb-2">
              <Briefcase className="w-4 h-4 text-[#7895B2]" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#202124]">
                Experience
              </h4>
            </div>

            {experience.map((exp, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h5 className="font-serif text-base sm:text-lg font-semibold text-[#202124]">
                    {exp.organization} &mdash; <span className="font-normal italic text-[#737780]">{exp.role}</span>
                  </h5>
                  <span className="text-xs font-mono text-[#737780]">{exp.period}</span>
                </div>
                <ul className="space-y-1.5 text-xs sm:text-sm text-[#202124]/85">
                  {exp.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] mt-2 flex-shrink-0" />
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section 4: Projects (from Resume) */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-[#E3E0D9] pb-2">
              <Layers className="w-4 h-4 text-[#7895B2]" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#202124]">
                Projects
              </h4>
            </div>

            <div className="space-y-6">
              {projects.filter(p => p.id !== 'stratify').map((proj) => (
                <div key={proj.id} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <h5 className="font-serif text-base sm:text-lg font-semibold text-[#202124]">
                        {proj.title}
                      </h5>
                      {proj.links?.github && (
                        <a
                          href={proj.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-mono text-[#7895B2] hover:underline flex items-center gap-0.5"
                        >
                          <span>Link</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {proj.timeline && (
                      <span className="text-xs font-mono text-[#737780]">{proj.timeline}</span>
                    )}
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#202124]/85">
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] mt-2 flex-shrink-0" />
                        <span className="leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <span className="text-[11px] font-mono text-[#737780]">
                      <strong className="text-[#202124]">Technologies:</strong> {proj.tags.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Achievements & Certifications */}
          <div id="resume-achievements" className="scroll-mt-28 space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E3E0D9] pb-2">
              <Trophy className="w-4 h-4 text-[#7895B2]" />
              <h4 className="text-xs font-mono uppercase tracking-widest font-bold text-[#202124]">
                Achievements & Certifications
              </h4>
            </div>

            <ul className="space-y-2 text-xs sm:text-sm text-[#202124]/90">
              {achievements.map((item, aIdx) => (
                <li key={aIdx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
