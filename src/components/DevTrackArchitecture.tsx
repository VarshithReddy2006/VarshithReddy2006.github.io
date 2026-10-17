import React, { useState } from 'react';
import {
  Database,
  Globe,
  Radio,
  RefreshCw,
  CheckCircle2,
  Workflow,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

type FlowFilter = 'all' | 'sync' | 'queue' | 'sse';

export const DevTrackArchitecture: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FlowFilter>('all');

  return (
    <div className="space-y-6">
      {/* Interactive Flow Filter & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E0D9] gap-3">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-[#7895B2]" />
          <span className="text-xs font-mono uppercase tracking-wider text-[#737780] font-semibold">
            System Boundary Map & Execution Paths
          </span>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'all'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            All Paths
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('sync')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'sync'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            REST (Sync)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('queue')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'queue'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            BullMQ (Async)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('sse')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'sse'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            SSE (Stream)
          </button>
        </div>
      </div>

      {/* Main Multi-Tier Architecture Diagram Container */}
      <div className="rounded-2xl border border-[#E3E0D9] bg-[#FAF9F6] p-5 sm:p-7 space-y-6">
        {/* Tier 1: Client Layer (Frontend) */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'sync' || activeFilter === 'sse'
              ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#7895B2] font-bold">
                Tier 01 &bull; Frontend Client Surface
              </span>
              <span className="text-[11px] font-mono text-[#737780] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9]">
                SPA &bull; Port 5173
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#737780]">
              <span className="font-semibold text-[#202124]">React 19 + TypeScript + Vite</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">UI & Layout</span>
              <p className="font-medium text-[#202124]">Tailwind CSS + Framer Motion</p>
              <p className="text-[11px] text-[#737780]">Responsive dashboard & focus view</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">State Management</span>
              <p className="font-medium text-[#202124]">Zustand Store</p>
              <p className="text-[11px] text-[#737780]">Persisted progression & timer state</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Data Fetching</span>
              <p className="font-medium text-[#202124]">TanStack Query + Axios</p>
              <p className="text-[11px] text-[#737780]">Optimistic mutations & cache invalidation</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Real-Time Client</span>
              <p className="font-medium text-[#202124]">EventSource (SSE)</p>
              <p className="text-[11px] text-[#737780]">Direct live sync & mission telemetry</p>
            </div>
          </div>
        </div>

        {/* Directional Connector Channel 1: Client to API */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-2">
          {/* Channel A: Synchronous REST */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
              activeFilter === 'all' || activeFilter === 'sync'
                ? 'bg-white border-[#7895B2] text-[#202124] shadow-sm'
                : 'bg-white/50 border-[#E3E0D9] text-[#737780] opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#7895B2] rotate-90 md:rotate-0 flex-shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">Synchronous REST API</span>
                <span className="text-[10px] text-[#737780]">JSON &bull; Bearer JWT &bull; Axios</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[9px] uppercase font-bold text-[#7895B2]">
              Sync
            </span>
          </div>

          {/* Channel B: Real-time Telemetry (SSE) */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
              activeFilter === 'all' || activeFilter === 'sse'
                ? 'bg-white border-emerald-600/70 text-[#202124] shadow-sm'
                : 'bg-white/50 border-[#E3E0D9] text-[#737780] opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-pulse" />
              <div>
                <span className="font-bold block text-[11px]">Server-Sent Events (SSE)</span>
                <span className="text-[10px] text-[#737780]">EventSource &bull; /api/events</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-[9px] uppercase font-bold text-emerald-700">
              Stream
            </span>
          </div>

          {/* Channel C: Auth Handshake */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
              activeFilter === 'all' || activeFilter === 'sync'
                ? 'bg-white border-[#E3E0D9] text-[#202124]'
                : 'bg-white/50 border-[#E3E0D9] text-[#737780] opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#7895B2] flex-shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">Clerk Auth Handshake</span>
                <span className="text-[10px] text-[#737780]">Session Token Validation</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[9px] uppercase font-bold text-[#737780]">
              Auth
            </span>
          </div>
        </div>

        {/* Tier 2: Application API & Domain Services */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'sync' || activeFilter === 'sse' || activeFilter === 'queue'
              ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#202124]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                Tier 02 &bull; Application Server & Domain Services
              </span>
              <span className="text-[11px] font-mono text-[#737780] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9]">
                Express 5 &bull; Port 5000
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#737780]">
              <span className="font-semibold text-[#202124]">Node.js &bull; TypeScript &bull; Zod Middleware</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">01 &bull; DSA</span>
                <span className="font-medium text-[#202124] text-xs">Problem Tracking</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">02 &bull; CAREER</span>
                <span className="font-medium text-[#202124] text-xs">Roadmap Engine</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">03 &bull; FOCUS</span>
                <span className="font-medium text-[#202124] text-xs">Pomodoro & Missions</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">04 &bull; RESUME</span>
                <span className="font-medium text-[#202124] text-xs">ATS Parser Engine</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">05 &bull; EVOLUTION</span>
                <span className="font-medium text-[#202124] text-xs">Progression XP</span>
              </div>
              <div className="p-2.5 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] text-center">
                <span className="font-mono text-[10px] font-bold text-[#7895B2] block">06 &bull; SYNC</span>
                <span className="font-medium text-[#202124] text-xs">Platform Dispatch</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-[#737780] gap-2">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <span>Strict boundary isolation: 23 modular TypeScript domain services backed by Zod input schemas</span>
              </span>
              <span className="text-[11px] font-bold text-[#202124] bg-white px-2 py-0.5 rounded border border-[#E3E0D9] self-start sm:self-auto">
                23 Verified Services
              </span>
            </div>
          </div>
        </div>

        {/* Tier 3: Data Persistence & Background BullMQ Queue Infrastructure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Persistence: MongoDB 7 */}
          <div
            className={`p-5 rounded-xl bg-white border transition-all ${
              activeFilter === 'all' || activeFilter === 'sync'
                ? 'border-[#7895B2]/70 shadow-sm'
                : 'border-[#E3E0D9] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                  Primary Data Persistence
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                MongoDB 7 &bull; Mongoose
              </span>
            </div>
            <div className="space-y-2 text-xs font-sans text-[#3C4043]">
              <p className="font-mono text-xs font-semibold text-[#202124]">
                60+ Typed Schema Models
              </p>
              <p className="text-xs leading-relaxed">
                Atomic collections storing user profiles, DSA problem submissions, roadmap milestone trees, resume ASTs, daily mission state, and focus telemetry sessions.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px] text-[#737780]">
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Problems</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Roadmaps</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Resumes</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Evolution</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Telemetry</span>
              </div>
            </div>
          </div>

          {/* Asynchronous Queue Subsystem: Redis 7 + BullMQ */}
          <div
            className={`p-5 rounded-xl bg-white border transition-all ${
              activeFilter === 'all' || activeFilter === 'queue'
                ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
                : 'border-[#E3E0D9] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9]">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                  Asynchronous Background Queues
                </span>
              </div>
              <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
                Redis 7 &bull; BullMQ
              </span>
            </div>
            <div className="space-y-2 text-xs font-sans text-[#3C4043]">
              <p className="font-mono text-xs font-semibold text-[#202124]">
                6 Dedicated Worker Queues
              </p>
              <p className="text-xs leading-relaxed">
                Decouples heavy background work from synchronous HTTP responses: coding platform rate-limited sync, resume text indexing, and periodic evolution recalculation.
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5 font-mono text-[10px] text-[#737780]">
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Platform Sync</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Resume Parse</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Roadmap Gen</span>
                <span className="px-1.5 py-0.5 bg-[#FAF9F6] border border-[#E3E0D9] rounded">Evolution Recalc</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tier 4: External Integrations & Fallbacks */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'queue'
              ? 'border-[#7895B2]/70 shadow-sm'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <Globe className="w-4 h-4 text-[#7895B2]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#7895B2] font-bold">
                Tier 04 &bull; External Ingestion & AI Provider Gateways
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#737780]">
              Rate-limit buffers &bull; Graceful degradation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {/* Coding Platforms */}
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Coding Platforms</span>
              <p className="font-medium text-[#202124]">LeetCode &bull; Codeforces &bull; CodeChef</p>
              <p className="text-[11px] text-[#737780]">
                Ingests problem tags, acceptance rates, and submission heatmaps via background worker queues.
              </p>
            </div>

            {/* GitHub Sync */}
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Version Control</span>
              <p className="font-medium text-[#202124]">GitHub REST / GraphQL API</p>
              <p className="text-[11px] text-[#737780]">
                Tracks commit streaks, active repositories, and language distributions for developer profile telemetry.
              </p>
            </div>

            {/* AI Providers */}
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">AI Intelligence</span>
              <p className="font-medium text-[#202124]">OpenAI & Google Gemini</p>
              <p className="text-[11px] text-[#737780]">
                Heuristic fallbacks ensure full roadmap and ATS parsing operation even when API keys are omitted.
              </p>
            </div>
          </div>
        </div>

        {/* Central Architectural Invariant Banner */}
        <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-3">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#7895B2] flex-shrink-0" />
            <span className="font-sans text-[#202124]">
              <strong>Feedback-Driven Learning Loop:</strong> Daily missions and focus telemetry trigger asynchronous Evolution updates, recalibrating roadmap priorities automatically.
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#7895B2] uppercase font-bold px-2.5 py-1 bg-[#FAF9F6] border border-[#E3E0D9] rounded-lg flex-shrink-0 self-start sm:self-auto">
            Roadmap &rarr; Focus &rarr; Evolution &rarr; Roadmap
          </span>
        </div>
      </div>
    </div>
  );
};
