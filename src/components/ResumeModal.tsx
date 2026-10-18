import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  FileText,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Code2,
  Trophy,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'text'>('pdf');
  const [mounted, setMounted] = useState(false);
  const { education, skills, experience, achievements, projects } = portfolioData;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#202124]/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl sm:rounded-3xl shadow-2xl z-10 flex flex-col max-h-[92vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#E3E0D9] bg-white">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#737780]">
                  Official Curriculum Vitae
                </span>
                <h3 id="resume-modal-title" className="text-xl sm:text-2xl font-serif font-medium text-[#202124] mt-0.5">
                  {portfolioData.name} — Resume
                </h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="p-2 -mr-2 text-[#737780] hover:text-[#202124] rounded-lg hover:bg-[#E3E0D9]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-header Tabs & Quick Action Bar */}
            <div className="px-4 sm:px-6 py-3 bg-[#F5F3EE] border-b border-[#E3E0D9] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('pdf')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                    activeTab === 'pdf'
                      ? 'bg-white text-[#202124] font-semibold border border-[#E3E0D9] shadow-sm'
                      : 'text-[#737780] hover:text-[#202124]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5 text-[#4B6B94]" />
                  <span>PDF Document</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('text')}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-lg transition-colors ${
                    activeTab === 'text'
                      ? 'bg-white text-[#202124] font-semibold border border-[#E3E0D9] shadow-sm'
                      : 'text-[#737780] hover:text-[#202124]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-[#4B6B94]" />
                  <span>Text Format</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={portfolioData.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-[#E3E0D9] text-[#202124] hover:border-[#7895B2] hover:text-[#7895B2] transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Open in New Window</span>
                  <span className="sm:hidden">Open</span>
                </a>

                <a
                  href={portfolioData.resumePath}
                  download="Shavva_Varshith_Reddy_Resume.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-[#202124] text-[#F5F3EE] hover:bg-[#3C4043] transition-colors shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="p-3 sm:p-6 overflow-y-auto flex-1 text-[#202124]">
              {activeTab === 'pdf' ? (
                /* PDF Interactive Document View */
                <div className="space-y-3">
                  <div className="relative w-full h-[62vh] sm:h-[70vh] rounded-xl overflow-hidden border border-[#E3E0D9] bg-white shadow-sm flex flex-col">
                    <iframe
                      src={`${portfolioData.resumePath}#toolbar=0&navpanes=0`}
                      className="w-full h-full border-none"
                      title={`${portfolioData.name} Resume Document`}
                    />
                  </div>

                  {/* Fallback notification & direct open options */}
                  <div className="p-3 rounded-lg bg-white border border-[#E3E0D9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#737780]">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
                      <span>
                        Displaying verified resume document (<code className="font-mono text-[#202124]">Shavva_Varshith_Reddy_Resume.pdf</code>).
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      <a
                        href={portfolioData.resumePath}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#4B6B94] hover:underline flex items-center gap-1"
                      >
                        <span>Direct Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={() => setActiveTab('text')}
                        className="text-[#202124] hover:underline"
                      >
                        Switch to Text Format
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Structured Text Resume */
                <div className="space-y-6 bg-white p-5 sm:p-8 rounded-xl border border-[#E3E0D9] shadow-sm text-xs sm:text-sm">
                  {/* Top Contact Row */}
                  <div className="border-b border-[#E3E0D9] pb-4">
                    <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#202124]">
                      {portfolioData.name}
                    </h4>
                    <p className="text-xs font-mono text-[#737780] mt-1">
                      {portfolioData.location} &bull; {portfolioData.phone} &bull; {portfolioData.email}
                    </p>
                  </div>

                  {/* Education */}
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#7895B2] mb-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Education</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <strong className="text-xs sm:text-sm font-semibold">{education.institution}</strong>
                      <span className="text-[11px] font-mono text-[#737780]">{education.duration}</span>
                    </div>
                    <p className="text-xs text-[#737780] mt-0.5">
                      {education.degree} &bull; CGPA: <strong className="text-[#202124]">{education.cgpa}</strong>
                    </p>
                  </div>

                  {/* Technical Skills */}
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#7895B2] mb-2">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Technical Skills</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <p><strong className="font-mono text-[#737780]">Languages:</strong> {skills.languages.join(', ')}</p>
                      <p><strong className="font-mono text-[#737780]">Frontend:</strong> {skills.frontend.join(', ')}</p>
                      <p><strong className="font-mono text-[#737780]">Backend:</strong> {skills.backend.join(', ')}</p>
                      <p><strong className="font-mono text-[#737780]">Databases:</strong> {skills.databases.join(', ')}</p>
                      <p><strong className="font-mono text-[#737780]">Tools:</strong> {skills.tools.join(', ')}</p>
                      <p><strong className="font-mono text-[#737780]">Core CS:</strong> {skills.coreCS.join(', ')}</p>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#7895B2] mb-2">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>Experience</span>
                    </div>
                    {experience.map((exp, idx) => (
                      <div key={idx} className="space-y-1 mb-3">
                        <div className="flex justify-between items-baseline">
                          <strong className="text-xs font-semibold">{exp.organization} &mdash; {exp.role}</strong>
                          <span className="text-[11px] font-mono text-[#737780]">{exp.period}</span>
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-xs text-[#737780]">
                          {exp.points.map((pt, pIdx) => (
                            <li key={pIdx} className="leading-relaxed">{pt}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Key Projects */}
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#7895B2] mb-2">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Projects</span>
                    </div>
                    <div className="space-y-3">
                      {projects.filter(p => p.id !== 'stratify').map((proj) => (
                        <div key={proj.id} className="space-y-1">
                          <div className="flex justify-between items-baseline">
                            <strong className="text-xs font-semibold">{proj.title}</strong>
                            <span className="text-[11px] font-mono text-[#737780]">{proj.timeline}</span>
                          </div>
                          <ul className="list-disc pl-4 space-y-0.5 text-xs text-[#737780]">
                            {proj.highlights.map((h, hIdx) => (
                              <li key={hIdx}>{h}</li>
                            ))}
                          </ul>
                          <p className="text-[11px] font-mono text-[#737780]">
                            <strong className="text-[#202124]">Tech:</strong> {proj.tags.join(', ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider font-bold text-[#7895B2] mb-2">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>Achievements & Certifications</span>
                    </div>
                    <ul className="space-y-1 text-xs text-[#202124]">
                      {achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#E3E0D9] bg-[#FAF9F6] flex items-center justify-between text-xs text-[#737780]">
              <span className="font-mono">Shavva Varshith Reddy &bull; B.Tech CSE</span>
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-[#E3E0D9] font-medium text-[#202124] hover:bg-[#E3E0D9]/50 transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
