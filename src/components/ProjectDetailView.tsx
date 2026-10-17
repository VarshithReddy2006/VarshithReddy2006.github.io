import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Network,
  Workflow,
  Cpu,
  ShieldCheck,
  Lock,
  RotateCcw,
} from 'lucide-react';
import { Project, portfolioData } from '../data/portfolioData';
import { GithubIcon } from './SocialLinks';
import { AriaArchitectureFlow } from './AriaArchitectureFlow';
import { AriaPerspectivesGraph } from './AriaPerspectivesGraph';
import { DevTrackArchitecture } from './DevTrackArchitecture';
import { PhishGuardArchitecture } from './PhishGuardArchitecture';

interface ProjectDetailViewProps {
  project: Project;
  onBack: () => void;
  onSelectProject: (id: string) => void;
}

// Concise captions describing what each screenshot demonstrates
const projectCaptions: Record<string, string> = {
  aria: 'Interface & Graph Inspection: Tree-sitter AST visualization, multi-perspective call graph traversal, and evidence-grounded repository chat with line-level citations.',
  stratify: 'Document Verification Workspace: Layout-aware OCR pipeline, spatial bounding-box field coordinates with confidence scoring (86%–98%), automated invoice-vs-bill-of-lading discrepancy alerts, and operator review triage.',
  devtrack: 'Developer Operations Dashboard: Consolidated DSA problem trajectory charts, sprint roadmap boards, Pomodoro telemetry, and ATS resume scoring.',
  'phishguard-ai': 'PhishGuard workspace: URL risk classification, confidence-aware results, and feedback submission across a local dashboard and browser extension.',
};

export const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({
  project,
  onBack,
  onSelectProject,
}) => {
  const [imageError, setImageError] = useState(false);
  const [stratifyPreviewTab, setStratifyPreviewTab] = useState<'document' | 'trade'>('document');
  const [showTechnicalSpecs, setShowTechnicalSpecs] = useState(false);

  // Scroll to top on mount or when project changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setImageError(false);
    setStratifyPreviewTab('document');
    setShowTechnicalSpecs(false);
  }, [project.id]);

  // Handle ESC key to return
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack]);

  const isFlagship = project.id === 'aria';
  const hasValidGithub = Boolean(
    project.links?.github && project.links.github !== '#' && project.links.github !== ''
  );
  const hasValidLive = Boolean(
    project.links?.live && project.links.live !== '#' && project.links.live !== ''
  );
  const isGithubUnavailable = Boolean(project.links?.githubUnavailable);

  const relatedProjects = portfolioData.projects.filter((p) => p.id !== project.id);

  const activeImageSrc =
    project.id === 'stratify' && stratifyPreviewTab === 'trade'
      ? '/images/projects/stratify-trade-intelligence.png'
      : project.image;

  const captionText =
    project.id === 'stratify'
      ? stratifyPreviewTab === 'trade'
        ? 'Trade Intelligence Console: Harmonized System (HS) code classification, ad valorem duty calculation, and Incoterm liability risk scoring.'
        : 'Document Verification Workspace: Layout-aware OCR pipeline, spatial bounding-box field coordinates with confidence scoring (86%–98%), automated invoice-vs-bill-of-lading discrepancy alerts, and operator review triage.'
      : projectCaptions[project.id] || `${project.title} — Architectural & Interface Preview`;

  return (
    <article
      aria-label={`Detailed engineering documentation for ${project.title}`}
      className="min-h-screen bg-[#F5F3EE] text-[#202124] pt-24 pb-20 sm:pt-28 sm:pb-24"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-10">
        {/* ========================================================= */}
        {/* 1. Top Navigation & Breadcrumb Action Bar                 */}
        {/* ========================================================= */}
        <nav aria-label="Project Navigation" className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-[#E3E0D9] gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#737780] hover:text-[#202124] transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] py-1.5 px-2.5 rounded-lg -ml-2.5"
            aria-label="Back to projects overview"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#7895B2]" />
            <span className="font-semibold">Back to Selected Projects</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#737780]">
              Project <strong className="text-[#202124] font-semibold">{project.number}</strong> of 04
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E3E0D9]" />
            <span className="text-xs font-mono text-[#7895B2] uppercase font-semibold">
              {project.timeline || '2026'}
            </span>
          </div>
        </nav>

        {/* ========================================================= */}
        {/* 2. Project Header: Category, Title, Subtitle, Actions     */}
        {/* ========================================================= */}
        <header className="space-y-6 mb-12">
          {/* Eyebrow badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
            <span className="text-xs font-mono uppercase tracking-widest text-[#737780] font-semibold">
              {project.category}
            </span>
            {isFlagship && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#202124] text-[#F5F3EE] text-[10px] font-mono uppercase tracking-wider font-semibold ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B9C9D8] animate-pulse" />
                <span>Flagship Case Study</span>
              </span>
            )}
            {project.id === 'stratify' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] text-[#7895B2] text-[10px] font-mono uppercase tracking-wider font-semibold ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>v2.0.0-rc1 Release Candidate</span>
              </span>
            )}
            {project.id === 'devtrack' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] text-[#7895B2] text-[10px] font-mono uppercase tracking-wider font-semibold ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span>Private Beta Candidate</span>
              </span>
            )}
            {project.id === 'phishguard-ai' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] text-[#7895B2] text-[10px] font-mono uppercase tracking-wider font-semibold ml-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Applied ML Defense &bull; Local-First</span>
              </span>
            )}
          </div>

          {/* Large Editorial Title with balanced line-wrapping */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight text-[#202124] leading-[1.12] sm:leading-[1.08] text-balance max-w-4xl">
            {project.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base font-mono uppercase tracking-wider text-[#7895B2] font-semibold">
            {project.subtitle}
          </p>

          {/* Executive Overview */}
          <p className="text-base sm:text-lg text-[#202124]/90 leading-relaxed font-sans max-w-3xl">
            {project.description}
          </p>

          {/* Recruiter Quick-Scan Briefing Card for Stratify */}
          {project.id === 'stratify' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#E3E0D9] shadow-sm font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#737780] font-semibold block">
                  Problem Solved
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Cross-border paperwork discrepancies, tariff misclassification, and port demurrage.
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-[#7895B2] font-semibold block">
                  Candidate Engineering Role
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Full-stack & systems architecture (FastAPI, Next.js, Celery, PostgreSQL, Redis).
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
                  Release & Test Status
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  v2.0.0-rc1 Release Candidate &bull; 270 automated backend pytest suites.
                </span>
              </div>
            </div>
          )}

          {/* Recruiter Quick-Scan Briefing Card for DevTrack */}
          {project.id === 'devtrack' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#E3E0D9] shadow-sm font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#737780] font-semibold block">
                  Problem Solved
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Fragmented developer activity across LeetCode, GitHub, resumes, and isolated roadmaps.
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-[#7895B2] font-semibold block">
                  Candidate Engineering Role
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Full-stack TypeScript architecture (React 19, Express 5, MongoDB, Redis, BullMQ).
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold block">
                  Release & Validation Status
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Private Beta Candidate &bull; 23 domain services, 6 BullMQ queues & Dockerized.
                </span>
              </div>
            </div>
          )}

          {/* Recruiter Quick-Scan Briefing Card for PhishGuard AI */}
          {project.id === 'phishguard-ai' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white border border-[#E3E0D9] shadow-sm font-mono text-xs">
              <div className="space-y-1">
                <span className="text-[10px] uppercase tracking-wider text-[#737780] font-semibold block">
                  Detection Pipeline
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  58 engineered URL structural & lexical features extracted in memory (&lt; 5 ms).
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-[#7895B2] font-semibold block">
                  Validation Results
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  90.83% reported test-split accuracy for Gradient Boosting (90.04% Random Forest).
                </span>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E3E0D9] sm:pl-3">
                <span className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold block">
                  Delivery Architecture
                </span>
                <span className="text-[#202124] font-medium font-sans text-xs block leading-snug">
                  Flask REST API + Web Dashboard + Chrome Extension Manifest V3.
                </span>
              </div>
            </div>
          )}

          {/* Status Note Banner (e.g. for DevTrack beta candidate) */}
          {project.details?.statusNote && (
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-900 flex items-start gap-3 text-xs sm:text-sm font-sans">
              <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
              <span>
                <strong className="font-semibold font-mono uppercase tracking-wider text-amber-900 block sm:inline mr-1">
                  Development Status:
                </strong>
                {project.details.statusNote}
              </span>
            </div>
          )}

          {/* Links & Repository Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {hasValidGithub && (
              <a
                href={project.links!.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#202124] text-[#F5F3EE] text-xs font-mono uppercase tracking-wider font-semibold hover:bg-[#3C4043] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                aria-label={`View ${project.title} repository on GitHub`}
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Repository</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B9C9D8]" />
              </a>
            )}

            {isGithubUnavailable && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#FAF9F6] border border-[#E3E0D9] text-[#737780] text-xs font-mono uppercase tracking-wider font-medium"
                title="Exact repository link is private or restricted to authorized reviewers"
              >
                <Lock className="w-3.5 h-3.5 text-[#7895B2]" />
                <span>{project.links?.githubStatusNote || 'Repository Available Upon Request'}</span>
              </div>
            )}

            {hasValidLive && (
              <a
                href={project.links!.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E3E0D9] text-[#202124] text-xs font-mono uppercase tracking-wider font-semibold hover:border-[#202124] hover:bg-[#FAF9F6] transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                aria-label={`Visit live deployment for ${project.title}`}
              >
                <span>Live Application</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#7895B2]" />
              </a>
            )}
          </div>
        </header>

        {/* ========================================================= */}
        {/* 3. Project Visual Showcase & Framed Evidence              */}
        {/* ========================================================= */}
        <section aria-label="System Interface & Evidence" className="mb-14 sm:mb-16">
          <div className="overflow-hidden rounded-2xl border border-[#E3E0D9] bg-white shadow-editorial">
            {/* Authentic Surface Switcher for Stratify */}
            {project.id === 'stratify' && (
              <div className="flex items-center justify-between px-5 py-3 bg-[#FAF9F6] border-b border-[#E3E0D9] flex-wrap gap-2 text-xs font-mono">
                <span className="text-[#737780] uppercase tracking-wider font-semibold text-[11px]">
                  Verified Interface Surface:
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStratifyPreviewTab('document');
                      setImageError(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                      stratifyPreviewTab === 'document'
                        ? 'bg-[#202124] text-[#F5F3EE] shadow-sm'
                        : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
                    }`}
                  >
                    01 · Document Intelligence & Bounding Boxes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStratifyPreviewTab('trade');
                      setImageError(false);
                    }}
                    className={`px-3 py-1.5 rounded-md text-xs font-mono font-medium transition-all ${
                      stratifyPreviewTab === 'trade'
                        ? 'bg-[#202124] text-[#F5F3EE] shadow-sm'
                        : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
                    }`}
                  >
                    02 · Trade Intelligence & Duty Calculator
                  </button>
                </div>
              </div>
            )}

            <div className="relative w-full bg-[#1A1E24] overflow-hidden flex items-center justify-center p-2 sm:p-4">
              {!imageError && activeImageSrc ? (
                <img
                  src={activeImageSrc}
                  alt={`Interface and visual evidence for ${project.title}`}
                  onError={() => setImageError(true)}
                  className="w-full h-auto max-h-[640px] object-contain mx-auto rounded-lg shadow-sm"
                  width={1024}
                  height={1024}
                  loading="eager"
                />
              ) : (
                <div className="w-full min-h-[320px] sm:min-h-[420px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#FAF9F6] to-[#ECE9E1]">
                  <span className="font-serif text-xl sm:text-2xl font-medium text-[#202124]">
                    {project.title}
                  </span>
                  <span className="text-xs font-mono text-[#7895B2] uppercase tracking-wider mt-2">
                    Architectural & Interface Evidence Artifact
                  </span>
                </div>
              )}
            </div>
            <div className="px-5 py-3.5 bg-white border-t border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#737780] gap-2">
              <span className="leading-snug text-[#202124]/90 font-sans sm:font-mono text-xs">
                {captionText}
              </span>
              <span className="text-[#7895B2] uppercase text-[11px] font-semibold flex-shrink-0">
                Verified System Artifact
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. Three-Part Engineering Contributions & Outcomes        */}
        {/* ========================================================= */}
        {project.details?.contributionPillars && (
          <section
            aria-labelledby="contributions-heading"
            className="mb-14 sm:mb-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  ENGINEERING CONTRIBUTIONS & EVIDENCE
                </span>
              </div>
              <h2
                id="contributions-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                Problem, Decisions & Demonstrated Evidence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1: The Problem */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] flex flex-col justify-between space-y-4 hover:border-[#7895B2]/50 hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/70">
                    <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider">
                      01 · The Problem
                    </span>
                    <span className="text-[10px] font-mono text-[#737780] bg-white px-2 py-0.5 rounded border border-[#E3E0D9]">
                      Core Blocker
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#202124] mb-1">
                    What Needed Solving
                  </h3>
                  <span className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold block mb-3">
                    Problem Domain & Constraints
                  </span>

                  {project.details.contributionPillars.problemPoints && project.details.contributionPillars.problemPoints.length > 0 ? (
                    <ul className="space-y-2.5 pt-2 border-t border-[#E3E0D9]/60">
                      {project.details.contributionPillars.problemPoints.map((point, pIdx) => {
                        const colonIndex = point.indexOf(':');
                        const hasColon = colonIndex !== -1 && colonIndex < 45;
                        const title = hasColon ? point.slice(0, colonIndex).trim() : '';
                        const desc = hasColon ? point.slice(colonIndex + 1).trim() : point;
                        return (
                          <li key={pIdx} className="text-xs text-[#202124] flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] flex-shrink-0 mt-1.5" />
                            <div>
                              {hasColon ? (
                                <>
                                  <strong className="font-semibold text-[#202124]">{title}: </strong>
                                  <span className="text-[#525866]">{desc}</span>
                                </>
                              ) : (
                                <span className="text-[#3C4043]">{point}</span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <div className="pt-2 border-t border-[#E3E0D9]/60">
                      <p className="text-xs sm:text-sm text-[#3C4043] leading-relaxed">
                        {project.details.contributionPillars.problem}
                      </p>
                    </div>
                  )}
                </div>
                <div className="pt-3 border-t border-[#E3E0D9]/80 flex items-center justify-between text-[11px] font-mono text-[#525866]">
                  <span>Core technical impediment</span>
                  <span className="text-[10px] font-mono text-[#7895B2] uppercase font-semibold">Verified Scope</span>
                </div>
              </div>

              {/* Pillar 2: Engineering Decisions */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] flex flex-col justify-between space-y-4 hover:border-[#7895B2]/50 hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/70">
                    <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider">
                      02 · Architecture
                    </span>
                    <span className="text-[10px] font-mono text-[#737780] bg-white px-2 py-0.5 rounded border border-[#E3E0D9]">
                      System Design
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#202124] mb-1">
                    Engineering Decisions
                  </h3>
                  <span className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold block mb-3">
                    Architecture & Implementation
                  </span>
                  <ul className="space-y-2.5 pt-2 border-t border-[#E3E0D9]/60">
                    {project.details.contributionPillars.engineeringDecisions.map((decision, dIdx) => {
                      const colonIndex = decision.indexOf(':');
                      const hasColon = colonIndex !== -1 && colonIndex < 45;
                      const title = hasColon ? decision.slice(0, colonIndex).trim() : '';
                      const desc = hasColon ? decision.slice(colonIndex + 1).trim() : decision;
                      return (
                        <li key={dIdx} className="text-xs text-[#202124] flex items-start gap-2.5 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] flex-shrink-0 mt-1.5" />
                          <div>
                            {hasColon ? (
                              <>
                                <strong className="font-semibold text-[#202124]">{title}: </strong>
                                <span className="text-[#525866]">{desc}</span>
                              </>
                            ) : (
                              <span className="text-[#3C4043]">{decision}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#E3E0D9]/80 flex items-center justify-between text-[11px] font-mono text-[#525866]">
                  <span>System design & trade-offs</span>
                  <span className="text-[10px] font-mono text-[#7895B2] uppercase font-semibold">Strategy & Decisions</span>
                </div>
              </div>

              {/* Pillar 3: Demonstrated Evidence */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] flex flex-col justify-between space-y-4 hover:border-[#7895B2]/50 hover:shadow-sm transition-all">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/70">
                    <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider">
                      03 · Verification
                    </span>
                    <span className="text-[10px] font-mono text-[#737780] bg-white px-2 py-0.5 rounded border border-[#E3E0D9]">
                      Empirical Tests
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-[#202124] mb-1">
                    Demonstrated Evidence
                  </h3>
                  <span className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold block mb-3">
                    Benchmarks & System Results
                  </span>
                  <ul className="space-y-2.5 pt-2 border-t border-[#E3E0D9]/60">
                    {project.details.contributionPillars.evidence.map((ev, eIdx) => {
                      const colonIndex = ev.indexOf(':');
                      const hasColon = colonIndex !== -1 && colonIndex < 45;
                      const title = hasColon ? ev.slice(0, colonIndex).trim() : '';
                      const desc = hasColon ? ev.slice(colonIndex + 1).trim() : ev;
                      return (
                        <li key={eIdx} className="text-xs text-[#202124] flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#7895B2] flex-shrink-0 mt-0.5" />
                          <div>
                            {hasColon ? (
                              <>
                                <strong className="font-semibold text-[#202124]">{title}: </strong>
                                <span className="text-[#525866]">{desc}</span>
                              </>
                            ) : (
                              <span className="text-[#3C4043]">{ev}</span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="pt-3 border-t border-[#E3E0D9]/80 flex items-center justify-between text-[11px] font-mono text-[#525866]">
                  <span>Empirical tests & metrics</span>
                  <span className="text-[10px] font-mono text-[#7895B2] uppercase font-semibold">Reported Results</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 5. Visual Architecture & Workflow Walkthrough             */}
        {/* ========================================================= */}
        {project.details?.workflowStages && (
          <section
            aria-labelledby="architecture-flow-heading"
            className="mb-14 sm:mb-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm"
          >
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  {isFlagship ? 'FLAGSHIP ARCHITECTURAL WALKTHROUGH' : 'WORKFLOW & ARCHITECTURE PIPELINE'}
                </span>
              </div>
              <h2
                id="architecture-flow-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124] mb-2"
              >
                {project.details.workflowTitle || 'End-to-End Architectural Pipeline'}
              </h2>
              <p className="text-xs sm:text-sm font-mono text-[#7895B2] uppercase tracking-wider font-semibold">
                {project.details.workflowSubtitle || 'From raw inputs to verified outputs'}
              </p>
            </div>

            {/* Flagship ARIA Interactive Architecture Flowchart */}
            {isFlagship ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#E3E0D9]">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#737780] font-semibold flex items-center gap-2">
                    <Workflow className="w-3.5 h-3.5 text-[#7895B2]" />
                    <span>Interactive Architectural Flowchart</span>
                  </span>
                  <span className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold">
                    Directional Data Path &bull; Select Nodes To Inspect
                  </span>
                </div>
                <AriaArchitectureFlow />
              </div>
            ) : project.id === 'devtrack' ? (
              <div className="space-y-6">
                {/* Horizontal Stepper Grid on Desktop */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-4">
                  {project.details.workflowStages.map((stage, sIdx) => {
                    const isLastStage = sIdx === project.details!.workflowStages!.length - 1;
                    return (
                      <div
                        key={stage.step}
                        className={`p-5 rounded-xl bg-[#FAF9F6] border transition-all flex flex-col justify-between space-y-3 ${
                          isLastStage
                            ? 'border-[#7895B2] bg-[#FAF9F6] ring-1 ring-[#7895B2]/20'
                            : 'border-[#E3E0D9] hover:border-[#7895B2]/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/80">
                            <span className="text-xs font-mono font-bold text-[#7895B2]">
                              Stage {stage.step}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#E3E0D9] text-[#737780] font-medium">
                              {stage.badge || `Stage 0${sIdx + 1}`}
                            </span>
                          </div>
                          <h3 className="font-serif text-base font-semibold text-[#202124] mb-1">
                            {stage.title}
                          </h3>
                          <p className="text-[11px] font-mono text-[#7895B2] uppercase tracking-wider font-semibold mb-2">
                            {stage.subtitle}
                          </p>
                          <p className="text-xs text-[#3C4043] leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        {stage.connectedCapabilities && stage.connectedCapabilities.length > 0 && (
                          <div className="pt-2 border-t border-[#E3E0D9]/60 flex flex-wrap gap-1.5">
                            {stage.connectedCapabilities.map((cap) => (
                              <span
                                key={cap}
                                className="px-2 py-0.5 rounded bg-white border border-[#E3E0D9] font-mono text-[10px] text-[#202124]"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Rail for Mobile & Tablet */}
                <div className="lg:hidden relative border-l-2 border-[#E3E0D9] ml-3 pl-5 space-y-6">
                  {project.details.workflowStages.map((stage) => (
                    <div
                      key={stage.step}
                      className="relative p-5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]"
                    >
                      <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-white border-2 border-[#7895B2] ring-4 ring-[#F5F3EE]" />
                      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#E3E0D9]/80">
                        <span className="text-xs font-mono font-bold text-[#7895B2]">
                          Stage {stage.step}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#E3E0D9] text-[#737780]">
                          {stage.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#202124] mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold mb-2">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs text-[#3C4043] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Visual Feedback Loop Container linking Stage 06 back to Stage 03 */}
                <div className="p-5 rounded-xl bg-white border border-[#E3E0D9] space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                        Continuous Calibration: The Feedback Loop
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7895B2] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9] self-start sm:self-auto font-semibold">
                      Human-in-the-Loop &bull; Recalibration
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                    <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">03 &bull; ROADMAP</span>
                      <span className="text-[#202124] text-xs font-sans">Identifies Gaps</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">04 &bull; FOCUS</span>
                      <span className="text-[#202124] text-xs font-sans">Daily Missions</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">05 &bull; EVOLUTION</span>
                      <span className="text-[#202124] text-xs font-sans">Records Progress</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#7895B2] ring-1 ring-[#7895B2]/20">
                      <span className="text-[#7895B2] font-bold block text-[10px]">06 &bull; RECALC</span>
                      <span className="text-[#202124] text-xs font-sans">Updates Priorities &circlearrowleft;</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#525866] leading-relaxed font-sans pt-1">
                    Completed tasks and focus sessions contribute to progress tracking, while identified skill gaps help guide future learning priorities. Recommendations provide advisory structure rather than assuming automated perfection.
                  </p>
                </div>
              </div>
            ) : project.id === 'phishguard-ai' ? (
              <div className="space-y-6">
                {/* Horizontal Stepper Grid on Desktop */}
                <div className="hidden lg:grid lg:grid-cols-5 gap-3.5">
                  {project.details.workflowStages.map((stage, sIdx) => {
                    const isRetrainingStage = sIdx === project.details!.workflowStages!.length - 1;
                    return (
                      <div
                        key={stage.step}
                        className={`p-4 rounded-xl bg-[#FAF9F6] border transition-all flex flex-col justify-between space-y-2.5 ${
                          isRetrainingStage
                            ? 'border-[#7895B2] bg-[#FAF9F6] ring-1 ring-[#7895B2]/20'
                            : 'border-[#E3E0D9] hover:border-[#7895B2]/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/80">
                            <span className="text-xs font-mono font-bold text-[#7895B2]">
                              Stage {stage.step}
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#E3E0D9] text-[#737780] font-medium">
                              {stage.badge}
                            </span>
                          </div>
                          <h3 className="font-serif text-sm font-semibold text-[#202124] mb-1">
                            {stage.title}
                          </h3>
                          <p className="text-[10px] font-mono text-[#7895B2] uppercase tracking-wider font-semibold mb-1.5">
                            {stage.subtitle}
                          </p>
                          <p className="text-xs text-[#3C4043] leading-relaxed">
                            {stage.description}
                          </p>
                        </div>

                        {stage.connectedCapabilities && stage.connectedCapabilities.length > 0 && (
                          <div className="pt-2 border-t border-[#E3E0D9]/60 flex flex-wrap gap-1">
                            {stage.connectedCapabilities.map((cap) => (
                              <span
                                key={cap}
                                className="px-1.5 py-0.5 rounded bg-white border border-[#E3E0D9] font-mono text-[9px] text-[#202124]"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Vertical Rail for Mobile & Tablet */}
                <div className="lg:hidden relative border-l-2 border-[#E3E0D9] ml-3 pl-5 space-y-6">
                  {project.details.workflowStages.map((stage) => (
                    <div
                      key={stage.step}
                      className="relative p-5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]"
                    >
                      <div className="absolute -left-[27px] top-6 w-3 h-3 rounded-full bg-white border-2 border-[#7895B2] ring-4 ring-[#F5F3EE]" />
                      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#E3E0D9]/80">
                        <span className="text-xs font-mono font-bold text-[#7895B2]">
                          Stage {stage.step}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-[#E3E0D9] text-[#737780]">
                          {stage.badge}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-[#202124] mb-1">
                        {stage.title}
                      </h3>
                      <p className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold mb-2">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs text-[#3C4043] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Dedicated Closed-Loop Retraining Visual */}
                <div className="p-5 rounded-xl bg-white border border-[#E3E0D9] space-y-3 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                        Continuous Local Retraining Loop
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7895B2] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9] self-start sm:self-auto font-semibold">
                      Online Inference &bull; Background Watcher
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">01 &bull; PREDICT</span>
                      <span className="text-[#202124] text-[11px] font-sans">URL Scoring</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">02 &bull; FEEDBACK</span>
                      <span className="text-[#202124] text-[11px] font-sans">User Report</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">03 &bull; BUFFER</span>
                      <span className="text-[#202124] text-[11px] font-sans">feedback.csv</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">04 &bull; RETRAIN</span>
                      <span className="text-[#202124] text-[11px] font-sans">retrain.py</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                      <span className="text-[#7895B2] font-bold block text-[10px]">05 &bull; SWAP</span>
                      <span className="text-[#202124] text-[11px] font-sans">model_v1.pkl</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#7895B2] ring-1 ring-[#7895B2]/20">
                      <span className="text-[#7895B2] font-bold block text-[10px]">06 &bull; RELOAD</span>
                      <span className="text-[#202124] text-[11px] font-sans">Hot Reload &circlearrowleft;</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#525866] leading-relaxed font-sans pt-1">
                    User corrections are persisted locally and monitored by a background daemon thread with a 60-second cooldown to trigger automated retraining. <strong>Data-Quality Caveat:</strong> Unfiltered feedback introduces the risk of model drift or label noise; human auditing and stratified offline cross-validation remain essential safeguards.
                  </p>
                </div>
              </div>
            ) : (
              /* Connected Stepped Pipeline Track for non-flagship projects */
              <div className="relative border-l-2 border-[#E3E0D9] ml-3 sm:ml-5 pl-5 sm:pl-7 space-y-6 sm:space-y-7">
                {project.details.workflowStages.map((stage, sIdx) => (
                  <div
                    key={stage.step}
                    className="relative p-5 sm:p-6 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] hover:border-[#7895B2]/60 transition-colors"
                  >
                    {/* Stepper Node Dot on Rail */}
                    <div className="absolute -left-[27px] sm:-left-[35px] top-6 w-3 h-3 rounded-full bg-white border-2 border-[#7895B2] ring-4 ring-[#F5F3EE]" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-[#E3E0D9]/80">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-mono font-bold text-[#7895B2]">
                          Stage {stage.step}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#E3E0D9]" />
                        <h3 className="font-serif text-base sm:text-lg font-semibold text-[#202124]">
                          {stage.title}
                        </h3>
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white border border-[#E3E0D9] text-[#737780] font-medium self-start sm:self-auto">
                        {stage.badge || `Stage 0${sIdx + 1}`}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#7895B2] uppercase tracking-wider font-semibold">
                        {stage.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#3C4043] leading-relaxed">
                        {stage.description}
                      </p>

                      {stage.connectedCapabilities && stage.connectedCapabilities.length > 0 && (
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono text-[#737780] uppercase tracking-wider font-semibold">
                            Linked Capabilities:
                          </span>
                          {stage.connectedCapabilities.map((cap) => (
                            <span
                              key={cap}
                              className="px-2 py-0.5 rounded-md bg-white border border-[#E3E0D9] font-mono text-[10px] text-[#202124] font-medium"
                            >
                              {cap}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* 6. Narrative: Problem Deep-Dive & Architecture Approach    */}
        {/* ========================================================= */}
        <div className="space-y-12 mb-14 sm:mb-16">
          {/* Problem Narrative */}
          {project.details?.problem && (
            <section
              aria-labelledby="problem-heading"
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#525866] font-semibold">
                  TECHNICAL CHALLENGE
                </span>
              </div>
              <h2
                id="problem-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124] mb-4"
              >
                {isFlagship
                  ? 'Why Flat-Text RAG Fails on Code Repositories'
                  : project.id === 'stratify'
                  ? 'The Regulatory Compliance & Document Discrepancy Problem'
                  : 'The problem being solved.'}
              </h2>

              {isFlagship ? (
                <div className="space-y-5">
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans">
                    Traditional code search and generic RAG treat source code as arbitrary text chunks. Flattening hierarchical code into disconnected token windows destroys compiler semantics and breaks critical structural relationships.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        01 · Broken Call Chains
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Severed Hierarchies
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Arbitrary text slicing cuts across caller and callee boundaries, preventing LLMs from resolving prerequisite dependencies.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        02 · Type Detachment
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Lost Contracts
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Exported interfaces, class types, and function signatures lose association with implementations, causing hallucinated calls.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        03 · Blind Blast Radius
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Unseen PR Risk
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Pull request diffs cannot be evaluated for breaking changes without traversing the transitive dependency graph.
                      </p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'stratify' ? (
                <div className="space-y-5">
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    Cross-border trade operations process millions of physical, scanned, and semi-structured shipping records. Mismatches across paperwork cause immediate customs delays, expensive port demurrage, and regulatory penalties.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        01 · Document Heterogeneity
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Multi-Format Noise
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Bills of Lading, Invoices, and Packing Lists arrive in degraded scans and non-standard layouts that break simple OCR parsers.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        02 · Arithmetic Risk
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        LLM Calculation Failure
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Unconstrained language models hallucinate tariff math, tax brackets, and regulatory duty rates, making them unsafe for customs compliance.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        03 · Reconciliation Gaps
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Cross-Document Discrepancy
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Line-item quantities, shipping weights, and declared Incoterms often disagree across paperwork without automated cross-verification.
                      </p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'devtrack' ? (
                <div className="space-y-5">
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    Developer progress is often fragmented across coding platforms, GitHub repositories, project trackers, resumes, and learning plans. This makes it difficult to connect completed work with career goals and identify what to improve next.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        01 · Fragmented Activity
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Siloed Developer Data
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        DSA submissions on LeetCode, commit logs on GitHub, and task boards live in isolation, leaving no unified record of engineering consistency.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        02 · Uncalibrated Gaps
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Disconnected Career Intent
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Resumes and target roles are rarely connected with day-to-day coding, resulting in blind spots when preparing for technical interviews.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        03 · Static Roadmaps
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        No Closed Feedback Loop
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Learning paths remain static checklists that never recalculate or adapt as actual problems are solved or focus sessions are completed.
                      </p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'phishguard-ai' ? (
                <div className="space-y-5">
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    Phishing attacks cycle through short-lived domains in minutes. Centralized defenses introduce latency and privacy leaks, while URL-only models face intrinsic visibility limits.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        01 · Blocklist Lag
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Zero-Hour Blindness
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Static domain blacklists fail against zero-hour phishing campaigns that spin up new deceptive hosts minutes before sending attacks.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        02 · Cloud Telemetry Risk
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Privacy & Latency
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Querying remote threat intelligence APIs transmits personal user browsing history over the network and adds 100–300 ms round-trip latency.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        03 · Structural Limits
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Domain-Only Boundaries
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        URL lexical analysis cannot inspect page DOM or form payloads, missing attacks hosted on compromised legitimate cloud platforms.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans">
                  {project.details.problem}
                </p>
              )}
            </section>
          )}

          {/* Architectural Approach Narrative */}
          {project.details?.approach && (
            <section
              aria-labelledby="approach-heading"
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#525866] font-semibold">
                  ENGINEERING DESIGN
                </span>
              </div>
              <h2
                id="approach-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124] mb-4"
              >
                {isFlagship
                  ? 'Multi-Perspective Repository Intelligence'
                  : project.id === 'stratify'
                  ? 'Dual-Layer Architecture: Decoupling Vision from Compliance'
                  : project.id === 'devtrack'
                  ? 'Multi-Tier Modular Architecture & Closed Learning Loop'
                  : project.id === 'phishguard-ai'
                  ? 'Local-First Inference Pipeline & Closed Retraining Loop'
                  : 'Architectural approach & engineering design.'}
              </h2>

              {isFlagship ? (
                <>
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans mb-6">
                    {project.details.approach}
                  </p>
                  <div className="mt-8 pt-8 border-t border-[#E3E0D9]">
                    <AriaPerspectivesGraph />
                  </div>
                </>
              ) : project.id === 'stratify' ? (
                <div className="space-y-6">
                  {/* Central Architectural Invariant Callout */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] space-y-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
                      <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#7895B2]">
                        Central Architectural Decision
                      </span>
                    </div>
                    <p className="text-sm font-sans font-medium text-[#202124] leading-relaxed">
                      <strong>Probabilistic extraction handles uncertain, noisy documents; deterministic application logic performs compliance checks and financial calculations.</strong>
                    </p>
                    <p className="text-xs text-[#525866] leading-relaxed font-sans">
                      Large language models and vision parsers extract textual entities with statistical confidence scores and spatial bounding-box coordinates. High-stakes calculations—line-item arithmetic, landed cost math, and official Harmonized System tariff rules—are executed strictly by deterministic, verifiable Python services without generative model hallucinations.
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    {project.details.approach}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        Layer 01 · Vision & Extraction
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Probabilistic Parsing
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Layout-aware OCR and vision models convert document scans into structured JSON records with spatial pixel coordinates and token certainty scores.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        Layer 02 · Compliance Engine
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Deterministic Rules
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Verified algorithms cross-reconcile document line items, validate Incoterm liabilities against ICC rules, and compute exact tariff duties.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold block">
                        Layer 03 · Governance & Audit
                      </span>
                      <h4 className="font-serif text-sm font-semibold text-[#202124]">
                        Human-in-the-Loop
                      </h4>
                      <p className="text-xs text-[#525866] leading-relaxed">
                        Low-confidence extractions and regulatory discrepancies route to operator review with visual bounding-box highlights on source documents.
                      </p>
                    </div>
                  </div>
                </div>
              ) : project.id === 'devtrack' ? (
                <div className="space-y-6">
                  {/* Central Invariant Callout */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] space-y-2">
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
                      <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#7895B2]">
                        Central Architectural Decision & Learning Loop
                      </span>
                    </div>
                    <p className="text-sm font-sans font-medium text-[#202124] leading-relaxed">
                      <strong>The Feedback-Driven Learning Loop: Roadmap &rarr; Focus &rarr; Evolution &rarr; Roadmap</strong>
                    </p>
                    <p className="text-xs text-[#525866] leading-relaxed font-sans">
                      Roadmap intelligence identifies gaps and structures priorities. Focus converts priorities into daily missions and timed sessions. Evolution telemetry records empirical progress and surfaces blockers, which automatically recalculates roadmap priorities as developer skills advance.
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    {project.details.approach}
                  </p>

                  {/* Architecture Diagram with System Boundaries */}
                  <div className="pt-2">
                    <DevTrackArchitecture />
                  </div>
                </div>
              ) : project.id === 'phishguard-ai' ? (
                <div className="space-y-6">
                  {/* Central Invariant Callout */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] space-y-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="font-mono text-xs uppercase tracking-wider font-bold text-[#7895B2]">
                        Central Architectural Decision
                      </span>
                    </div>
                    <p className="text-sm font-sans font-medium text-[#202124] leading-relaxed">
                      <strong>Local-First Offline Inference: Zero URLs or browsing history leave the user's localhost boundary.</strong>
                    </p>
                    <p className="text-xs text-[#525866] leading-relaxed font-sans">
                      All 58 structural and lexical indicators are extracted in-memory in under 5 ms. Pre-trained tabular classifiers (Gradient Boosting) evaluate feature vectors locally in under 10 ms without querying remote APIs, eliminating network latency and browsing telemetry leaks.
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans max-w-4xl">
                    {project.details.approach}
                  </p>

                  {/* Architecture Diagram with System Boundaries */}
                  <div className="pt-2">
                    <PhishGuardArchitecture />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm sm:text-base text-[#202124] leading-relaxed font-sans mb-6">
                    {project.details.approach}
                  </p>
                  {project.details.perspectives && project.details.perspectives.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[#E3E0D9]">
                      <h3 className="text-xs font-mono uppercase tracking-wider text-[#525866] font-semibold mb-4">
                        The Three Core Structural Perspectives
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {project.details.perspectives.map((perspective) => (
                          <div
                            key={perspective.title}
                            className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-2"
                          >
                            <div className="flex items-center gap-1.5">
                              <Network className="w-3.5 h-3.5 text-[#4B6B94]" />
                              <h4 className="font-serif text-base font-semibold text-[#202124]">
                                {perspective.title}
                              </h4>
                            </div>
                            <span className="text-[11px] font-mono text-[#4B6B94] uppercase tracking-wider font-semibold block">
                              {perspective.subtitle}
                            </span>
                            <p className="text-xs text-[#525866] leading-relaxed">
                              {perspective.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.details.feedbackLoop && (
                    <div className="mt-6 p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Workflow className="w-4 h-4 text-[#4B6B94]" />
                        <span className="text-xs font-mono uppercase tracking-wider text-[#525866] font-semibold">
                          Core Developer Feedback Loop:
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-lg bg-white border border-[#E3E0D9] font-mono text-xs text-[#202124] font-semibold">
                        {project.details.feedbackLoop}
                      </span>
                    </div>
                  )}
                </>
              )}
            </section>
          )}
        </div>

        {/* ========================================================= */}
        {/* 7. Key Features & Documented Capabilities                 */}
        {/* ========================================================= */}
        {((project.details?.capabilityClusters && project.details.capabilityClusters.length > 0) ||
          (project.details?.keyFeatures && project.details.keyFeatures.length > 0)) && (
          <section aria-labelledby="features-heading" className="mb-14 sm:mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#525866] font-semibold">
                  CAPABILITIES
                </span>
              </div>
              <h2
                id="features-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                {project.id === 'devtrack'
                  ? 'Core Capabilities by Functional Domain'
                  : 'Key capabilities & system features.'}
              </h2>
            </div>

            {project.details?.capabilityClusters && project.details.capabilityClusters.length > 0 ? (
              <div
                className={`grid gap-5 sm:gap-6 ${
                  project.details.capabilityClusters.length === 4
                    ? 'grid-cols-1 md:grid-cols-2'
                    : project.details.capabilityClusters.length % 3 === 0
                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {project.details.capabilityClusters.map((cluster, cIdx) => (
                  <div
                    key={cIdx}
                    className="p-5 sm:p-6 bg-white border border-[#E3E0D9] rounded-2xl shadow-sm space-y-3 hover:border-[#7895B2]/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#E3E0D9]/70">
                        <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider">
                          Cluster 0{cIdx + 1}
                        </span>
                        <span className="text-[10px] font-mono text-[#737780] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9]">
                          {cluster.items.length} Modules
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-[#202124] mb-1">
                        {cluster.title}
                      </h3>
                      <span className="text-[11px] font-mono text-[#7895B2] uppercase font-semibold block mb-3">
                        {cluster.badge} Domain
                      </span>
                      <ul className="space-y-2 pt-1 border-t border-[#E3E0D9]/50">
                        {cluster.items.map((item, iIdx) => (
                          <li key={iIdx} className="text-xs text-[#202124] flex items-start gap-2 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2] flex-shrink-0 mt-1.5" />
                            <div>
                              <strong className="font-semibold text-[#202124]">{item.title}: </strong>
                              <span className="text-[#525866]">{item.description}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 text-[10px] font-mono text-[#7895B2] uppercase font-semibold">
                      Verified Subsystem
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {project.details?.keyFeatures?.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="p-5 sm:p-6 bg-white border border-[#E3E0D9] rounded-2xl shadow-sm space-y-2 hover:border-[#7895B2]/50 transition-colors"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#4B6B94] flex-shrink-0 mt-0.5" />
                      <h3 className="font-serif text-base font-semibold text-[#202124]">
                        {feat.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#525866] leading-relaxed pl-6.5">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Tasteful Collapsible Technical Deep-Dive for Recruiters */}
            {project.id === 'stratify' && (
              <div className="mt-8 rounded-2xl border border-[#E3E0D9] bg-white overflow-hidden shadow-sm">
                <button
                  type="button"
                  onClick={() => setShowTechnicalSpecs((prev) => !prev)}
                  aria-expanded={showTechnicalSpecs}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#FAF9F6] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
                >
                  <div className="flex items-center gap-3">
                    <Workflow className="w-4 h-4 text-[#7895B2]" />
                    <div>
                      <span className="font-serif text-base font-semibold text-[#202124] block">
                        Detailed System Specifications & Enterprise Architecture
                      </span>
                      <span className="text-xs font-mono text-[#737780] block">
                        AI Gateway failover, Knowledge Graph topology, Celery workers, and SHA-256 ledger guarantees
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#7895B2] uppercase font-semibold flex items-center gap-1">
                    {showTechnicalSpecs ? 'Collapse [-]' : 'Expand [+]'}
                  </span>
                </button>

                {showTechnicalSpecs && (
                  <div className="p-6 border-t border-[#E3E0D9] bg-[#FAF9F6] space-y-5 text-xs text-[#3C4043] leading-relaxed font-sans">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] space-y-2">
                        <span className="font-mono font-bold text-[#4B6B94] uppercase tracking-wider text-[11px] block">
                          01 · Centralized AI Gateway Hub
                        </span>
                        <p>
                          Intercepts all LLM interactions with in-flight regex PII scrubbing, per-organization monthly token budgeting, Redis semantic response caching, and transparent automatic failover across OpenAI, Anthropic Claude, Google Gemini, DeepSeek, and local Ollama.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] space-y-2">
                        <span className="font-mono font-bold text-[#4B6B94] uppercase tracking-wider text-[11px] block">
                          02 · Trade Knowledge Graph & Vector RAG
                        </span>
                        <p>
                          Constructs relational graphs linking commercial entities (<code className="font-mono text-[10px] bg-[#FAF9F6] px-1 py-0.5 rounded">Shipper &rarr; SHIPPED_BY &rarr; Commodity &rarr; CLASSIFIED_AS &rarr; HS Code</code>) paired with PostgreSQL <code className="font-mono text-[10px] bg-[#FAF9F6] px-1 py-0.5 rounded">pgvector</code> HNSW cosine similarity search.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] space-y-2">
                        <span className="font-mono font-bold text-[#4B6B94] uppercase tracking-wider text-[11px] block">
                          03 · Asynchronous Worker Architecture
                        </span>
                        <p>
                          Compute-heavy OCR pre-processing and embedding indexing are decoupled from API response cycles via Celery distributed workers backed by Redis priority queues, ensuring sub-200ms REST response latencies.
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] space-y-2">
                        <span className="font-mono font-bold text-[#4B6B94] uppercase tracking-wider text-[11px] block">
                          04 · Cryptographic SHA-256 Decision Ledger
                        </span>
                        <p>
                          Enforces concurrency-safe sequence allocation and SHA-256 hash chaining (<code className="font-mono text-[10px] bg-[#FAF9F6] px-1 py-0.5 rounded">compute_hash_chain_link_v2</code>). AI proposals (<code className="font-mono text-[10px] bg-[#FAF9F6] px-1 py-0.5 rounded">AI_PROPOSAL</code>) are strictly separated from operator approvals (<code className="font-mono text-[10px] bg-[#FAF9F6] px-1 py-0.5 rounded">FINAL_DECISION</code>).
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* 8. Quantitative Metrics & Validation Results              */}
        {/* ========================================================= */}
        {project.details?.metrics && project.details.metrics.length > 0 && (
          <section aria-label="Performance Metrics & Validation" className="mb-14 sm:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#525866] font-semibold">
                  RESULTS & VALIDATION
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]">
                Verified results, tests & benchmarks.
              </h2>
            </div>

            <div className={`grid gap-4 ${project.details.metrics.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
              {project.details.metrics.map((m, mIdx) => (
                <div
                  key={mIdx}
                  className="p-5 sm:p-6 bg-white border border-[#E3E0D9] rounded-2xl shadow-sm space-y-1.5 hover:border-[#7895B2]/40 transition-colors"
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#525866] block font-bold">
                    {m.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-serif font-semibold text-[#202124]">
                    {m.value}
                  </div>
                  <p className="text-xs text-[#525866] leading-snug">
                    {m.detail}
                  </p>
                </div>
              ))}
            </div>

            {project.id === 'phishguard-ai' && (
              <div className="mt-8 space-y-6">
                {/* Model Comparison Table / Cards */}
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[#E3E0D9]/70 gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider block">
                        Supervised Classification Benchmark
                      </span>
                      <h3 className="text-lg font-serif font-semibold text-[#202124]">
                        Reported 80/20 Test-Split Classifier Performance
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono text-[#525866] bg-[#FAF9F6] px-3 py-1 rounded-full border border-[#E3E0D9] self-start sm:self-auto">
                      Held-Out Test Set (N = 2,288)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {/* Gradient Boosting Card */}
                    <div className="p-5 rounded-xl bg-[#FAF9F6] border-2 border-[#7895B2]/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4B6B94] block">
                            Production Model Artifact
                          </span>
                          <h4 className="text-base font-serif font-semibold text-[#202124]">
                            Gradient Boosting Classifier (GBC)
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#E8EEF5] text-[#2C4A6F] border border-[#B8CEE2]">
                          Primary Engine
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#E3E0D9]/60 text-center">
                        <div className="p-2 rounded-lg bg-white border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Accuracy</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.83%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Precision</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.75%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Recall</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.91%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-white border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">F1-Score</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.83%</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#525866] leading-relaxed">
                        Demonstrated slightly higher recall (+0.76%) and lower false-negative rates on subtle lexical permutations, making it the preferred serialized candidate for real-time endpoint deployment.
                      </p>
                    </div>

                    {/* Random Forest Card */}
                    <div className="p-5 rounded-xl bg-white border border-[#E3E0D9] space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#737780] block">
                            Evaluated Baseline
                          </span>
                          <h4 className="text-base font-serif font-semibold text-[#202124]">
                            Random Forest Classifier (RFC)
                          </h4>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FAF9F6] text-[#737780] border border-[#E3E0D9]">
                          Comparative
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 pt-1 border-t border-[#E3E0D9]/60 text-center">
                        <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Accuracy</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.04%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Precision</span>
                          <span className="text-base font-serif font-bold text-[#202124]">89.85%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">Recall</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.15%</span>
                        </div>
                        <div className="p-2 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]">
                          <span className="text-[10px] font-mono text-[#737780] uppercase block">F1-Score</span>
                          <span className="text-base font-serif font-bold text-[#202124]">90.00%</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#525866] leading-relaxed">
                        Provided fast parallel tree building and strong baseline stability across all 58 features, performing within 0.79% overall accuracy of Gradient Boosting.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dataset Breakdown & Methodological Caveat */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-5 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[#4B6B94] uppercase tracking-wider block">
                      Dataset Composition
                    </span>
                    <div className="text-xl font-serif font-semibold text-[#202124]">
                      11,438 Total URLs
                    </div>
                    <div className="space-y-1.5 text-xs text-[#525866] pt-1 border-t border-[#E3E0D9]/50">
                      <div className="flex justify-between items-center">
                        <span>Legitimate Samples:</span>
                        <span className="font-mono font-semibold text-[#202124]">5,722 (50.0%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Phishing Samples:</span>
                        <span className="font-mono font-semibold text-[#202124]">5,716 (50.0%)</span>
                      </div>
                      <div className="text-[11px] text-[#737780] pt-1">
                        Balanced binary class distribution preventing majority-class bias.
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[#4B6B94] uppercase tracking-wider block">
                      Evaluation Methodology
                    </span>
                    <div className="text-xl font-serif font-semibold text-[#202124]">
                      80 / 20 Stratified Split
                    </div>
                    <div className="space-y-1.5 text-xs text-[#525866] pt-1 border-t border-[#E3E0D9]/50">
                      <div className="flex justify-between items-center">
                        <span>Training Corpus:</span>
                        <span className="font-mono font-semibold text-[#202124]">9,150 URLs (80%)</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Held-Out Test:</span>
                        <span className="font-mono font-semibold text-[#202124]">2,288 URLs (20%)</span>
                      </div>
                      <div className="text-[11px] text-[#737780] pt-1">
                        Preserves exact 50/50 legitimate-to-phishing balance across train and test partitions.
                      </div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] shadow-sm space-y-2">
                    <span className="text-[11px] font-mono font-bold text-[#7895B2] uppercase tracking-wider block">
                      Evaluation Boundary & Caveat
                    </span>
                    <div className="text-xs font-serif font-semibold text-[#202124]">
                      Reported Validation vs. Live Evasion
                    </div>
                    <p className="text-xs text-[#525866] leading-relaxed pt-1 border-t border-[#E3E0D9]/50">
                      Reported test-split metrics reflect static evaluation on curated historical threat feeds. Real-world catch rates naturally vary based on threat freshness, domain reputation shifts, and advanced adversarial URL cloaking.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ========================================================= */}
        {/* 9. Technology Stack Grouped by Responsibility             */}
        {/* ========================================================= */}
        {project.details?.techStack && project.details.techStack.length > 0 && (
          <section
            aria-labelledby="techstack-heading"
            className="mb-14 sm:mb-16 p-6 sm:p-8 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  TECHNOLOGY STACK
                </span>
              </div>
              <h2
                id="techstack-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                Grouped by technical responsibility.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.details.techStack.map((group) => (
                <div key={group.category} className="space-y-2.5">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[#7895B2] font-semibold">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 text-xs font-mono bg-[#FAF9F6] border border-[#E3E0D9] rounded-md text-[#202124]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 10. Challenges & Technical Trade-offs                     */}
        {/* ========================================================= */}
        {project.details?.challengesAndTradeoffs && project.details.challengesAndTradeoffs.length > 0 && (
          <section aria-labelledby="tradeoffs-heading" className="mb-14 sm:mb-16">
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  CHALLENGES & TRADE-OFFS
                </span>
              </div>
              <h2
                id="tradeoffs-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                Difficult decisions & engineering rationale.
              </h2>
            </div>

            <div className="space-y-4">
              {project.details.challengesAndTradeoffs.map((item, tIdx) => (
                <div
                  key={tIdx}
                  className="p-5 sm:p-6 bg-white border border-[#E3E0D9] rounded-2xl shadow-sm space-y-2 hover:border-[#7895B2]/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#7895B2]">
                      0{tIdx + 1} ·
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-[#202124]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#525866] leading-relaxed pl-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 11. Known Limitations & Scope Constraints                 */}
        {/* ========================================================= */}
        {project.details?.knownLimitations && project.details.knownLimitations.length > 0 && (
          <section aria-labelledby="limitations-heading" className="mb-14 sm:mb-16">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  ENGINEERING INTEGRITY & TRANSPARENCY
                </span>
              </div>
              <h2
                id="limitations-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                Documented Limitations & Scope Constraints
              </h2>
              <p className="text-xs sm:text-sm text-[#737780] mt-1 font-sans">
                Transparent architectural boundaries and platform restrictions identified during active private-beta validation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.details.knownLimitations.map((lim, lIdx) => (
                <div
                  key={lIdx}
                  className="p-5 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm space-y-2 hover:border-[#7895B2]/40 transition-colors"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E3E0D9]/60">
                    <span className="font-mono text-xs font-bold text-[#202124]">
                      {lim.title}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-[#FAF9F6] border border-[#E3E0D9] text-[#7895B2]">
                      Documented Scope
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3C4043] leading-relaxed font-sans">
                    {lim.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* 12. Related Projects Navigation                           */}
        {/* ========================================================= */}
        <section aria-labelledby="related-heading" className="pt-12 border-t border-[#E3E0D9]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7895B2]" />
                <span className="text-xs font-mono tracking-widest uppercase text-[#737780] font-semibold">
                  RELATED CASE STUDIES
                </span>
              </div>
              <h2
                id="related-heading"
                className="text-2xl sm:text-3xl font-serif font-normal text-[#202124]"
              >
                Other Selected Systems
              </h2>
            </div>

            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#7895B2] hover:text-[#202124] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] rounded-md px-2 py-1"
            >
              <span>Back to all projects</span>
              <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedProjects.map((rel) => (
              <div
                key={rel.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectProject(rel.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(rel.id);
                  }
                }}
                aria-label={`View case study for ${rel.title}`}
                className="p-5 bg-white border border-[#E3E0D9] rounded-2xl shadow-sm hover:border-[#7895B2]/60 hover:shadow-editorial transition-all cursor-pointer flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124]"
              >
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#7895B2]">
                      {rel.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#737780]">
                      {rel.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-base font-semibold text-[#202124] group-hover:text-[#7895B2] transition-colors line-clamp-2 min-h-[44px]">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-[#737780] line-clamp-2 leading-relaxed">
                    {rel.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E3E0D9]/70 flex items-center justify-between text-xs font-mono text-[#202124]">
                  <span className="font-semibold uppercase text-[11px] group-hover:underline">Explore Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#7895B2] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
};
