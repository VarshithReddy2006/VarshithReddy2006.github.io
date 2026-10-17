import React, { useState } from 'react';
import {
  ShieldCheck,
  Cpu,
  RefreshCw,
  ArrowRight,
  Database,
  Radio,
  Workflow,
} from 'lucide-react';

type FlowFilter = 'all' | 'predict' | 'retrain';

export const PhishGuardArchitecture: React.FC = () => {
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
            onClick={() => setActiveFilter('predict')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'predict'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            Prediction (Online)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('retrain')}
            className={`px-2.5 py-1 rounded-md text-[11px] transition-all ${
              activeFilter === 'retrain'
                ? 'bg-[#202124] text-[#F5F3EE] font-semibold shadow-sm'
                : 'bg-white text-[#737780] hover:text-[#202124] border border-[#E3E0D9]'
            }`}
          >
            Retraining (Async)
          </button>
        </div>
      </div>

      {/* Main Multi-Tier Architecture Diagram Container */}
      <div className="rounded-2xl border border-[#E3E0D9] bg-[#FAF9F6] p-5 sm:p-7 space-y-6">
        {/* Tier 1: Client Interfaces */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'predict'
              ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#7895B2]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#7895B2] font-bold">
                Tier 01 &bull; Client Delivery Surfaces
              </span>
              <span className="text-[11px] font-mono text-[#737780] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9]">
                Zero-Telemetry
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#737780]">
              <span className="font-semibold text-[#202124]">Chrome Extension (MV3) + Web Dashboard</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Browser Interception</span>
              <p className="font-medium text-[#202124]">Chrome Service Worker</p>
              <p className="text-[11px] text-[#737780]">Manifest V3 background script intercepts top-level navigation</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Warning Enforcement</span>
              <p className="font-medium text-[#202124]">Content Script Injection</p>
              <p className="text-[11px] text-[#737780]">Injects sandboxed alert banner on confirmed phishing URLs</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9]/80 space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Admin Dashboard</span>
              <p className="font-medium text-[#202124]">HTML5 & Vanilla JavaScript</p>
              <p className="text-[11px] text-[#737780]">Direct URL testing, historical inspection & feedback submission</p>
            </div>
          </div>
        </div>

        {/* Directional Interconnects: Client to Local Flask API */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 px-2">
          {/* Path A: Synchronous Predict */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
              activeFilter === 'all' || activeFilter === 'predict'
                ? 'bg-white border-[#7895B2] text-[#202124] shadow-sm'
                : 'bg-white/50 border-[#E3E0D9] text-[#737780] opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[#7895B2] rotate-90 md:rotate-0 flex-shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">POST /predict</span>
                <span className="text-[10px] text-[#737780]">JSON &bull; URL payload &bull; Sub-15 ms target latency</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[9px] uppercase font-bold text-[#7895B2]">
              Online
            </span>
          </div>

          {/* Path B: Feedback Submission */}
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center justify-between transition-all ${
              activeFilter === 'all' || activeFilter === 'retrain'
                ? 'bg-white border-amber-600/70 text-[#202124] shadow-sm'
                : 'bg-white/50 border-[#E3E0D9] text-[#737780] opacity-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <div>
                <span className="font-bold block text-[11px]">POST /feedback</span>
                <span className="text-[10px] text-[#737780]">Correction label &bull; Appends to feedback.csv</span>
              </div>
            </div>
            <span className="px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-[9px] uppercase font-bold text-amber-700">
              Async Queue
            </span>
          </div>
        </div>

        {/* Tier 2: Local Application Layer (Flask API) */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'predict' || activeFilter === 'retrain'
              ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#202124]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                Tier 02 &bull; Local Application Server & Caching
              </span>
              <span className="text-[11px] font-mono text-[#737780] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9]">
                Flask &bull; Port 5000 &bull; 127.0.0.1
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#737780] font-semibold">
              Python 3.10+ &bull; Flask-CORS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#7895B2] uppercase block">Prediction Cache</span>
              <p className="font-medium text-[#202124]">In-Memory Hashmap</p>
              <p className="text-[11px] text-[#737780]">Avoids redundant feature extraction for repeated URL queries</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#7895B2] uppercase block">Feedback Cache</span>
              <p className="font-medium text-[#202124]">O(1) Memory Lookup</p>
              <p className="text-[11px] text-[#737780]">Auto-refreshes from disk via mtime check on user feedback records</p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] font-bold text-[#7895B2] uppercase block">Safety Guard</span>
              <p className="font-medium text-[#202124]">Low-Confidence Rule</p>
              <p className="text-[11px] text-[#737780]">Escalates marginal Legitimate predictions (&lt; 60%) to Suspicious</p>
            </div>
          </div>
        </div>

        {/* Tier 3: Feature Engineering & ML Inference Engine */}
        <div
          className={`p-5 rounded-xl bg-white border transition-all ${
            activeFilter === 'all' || activeFilter === 'predict'
              ? 'border-[#7895B2]/70 shadow-sm'
              : 'border-[#E3E0D9] opacity-60'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-4 h-4 text-[#7895B2]" />
              <span className="text-xs font-mono uppercase tracking-wider text-[#7895B2] font-bold">
                Tier 03 &bull; Feature Engineering & ML Inference Engine
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#737780]">
              scikit-learn &bull; Gradient Boosting
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">58 Features</span>
              <p className="font-medium text-[#202124]">Structural & Lexical</p>
              <p className="text-[11px] text-[#737780]">
                Length ratios, dot/hyphen counts, IP literals, Shannon entropy & suspicious keywords extracted in &lt; 5 ms.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Active Model</span>
              <p className="font-medium text-[#202124]">Gradient Boosting (GBC)</p>
              <p className="text-[11px] text-[#737780]">
                90.83% reported test-split validation accuracy; selected over Random Forest (90.04%).
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[#FAF9F6] border border-[#E3E0D9] space-y-1">
              <span className="font-mono text-[10px] uppercase text-[#737780] font-semibold block">Matrix Alignment</span>
              <p className="font-medium text-[#202124]">feature_names.pkl</p>
              <p className="text-[11px] text-[#737780]">
                Guarantees column sequence match between training time and runtime inference.
              </p>
            </div>
          </div>
        </div>

        {/* Tier 4 & 5: Background Retraining & Local Storage */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Background Retraining Lifecycle */}
          <div
            className={`p-5 rounded-xl bg-white border transition-all ${
              activeFilter === 'all' || activeFilter === 'retrain'
                ? 'border-[#7895B2]/70 shadow-sm ring-1 ring-[#7895B2]/20'
                : 'border-[#E3E0D9] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9]">
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#7895B2]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                  Background Retraining Lifecycle
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#7895B2] bg-[#FAF9F6] px-2 py-0.5 rounded border border-[#E3E0D9] font-semibold">
                60s Cooldown
              </span>
            </div>
            <div className="space-y-2 text-xs font-sans text-[#3C4043]">
              <p className="font-mono text-xs font-semibold text-[#202124]">
                Automated Watcher & Hot-Reload
              </p>
              <p className="text-xs leading-relaxed">
                A background daemon thread monitors <code className="font-mono text-[11px] bg-[#FAF9F6] px-1 py-0.5 rounded">feedback.csv</code>. Upon new entries, it triggers <code className="font-mono text-[11px] bg-[#FAF9F6] px-1 py-0.5 rounded">retrain.py</code>, produces an updated <code className="font-mono text-[11px] bg-[#FAF9F6] px-1 py-0.5 rounded">model_v1.pkl</code>, and atomically swaps weights in Flask memory without restarting the process.
              </p>
            </div>
          </div>

          {/* Local Flat-File Storage */}
          <div
            className={`p-5 rounded-xl bg-white border transition-all ${
              activeFilter === 'all' || activeFilter === 'predict' || activeFilter === 'retrain'
                ? 'border-[#7895B2]/70 shadow-sm'
                : 'border-[#E3E0D9] opacity-60'
            }`}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3E0D9]">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-emerald-700" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#202124] font-bold">
                  Local CSV Persistence
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Flat-File Architecture
              </span>
            </div>
            <div className="space-y-2 text-xs font-sans text-[#3C4043]">
              <p className="font-mono text-xs font-semibold text-[#202124]">
                11,438 Balanced Records
              </p>
              <p className="text-xs leading-relaxed">
                <code className="font-mono text-[11px] bg-[#FAF9F6] px-1 py-0.5 rounded">dataset.csv</code> holds 5,722 legitimate and 5,716 phishing URLs. User reports accumulate in <code className="font-mono text-[11px] bg-[#FAF9F6] px-1 py-0.5 rounded">feedback.csv</code> before merging into the training pool.
              </p>
            </div>
          </div>
        </div>

        {/* Central Closed-Loop Invariant Banner */}
        <div className="p-4 rounded-xl bg-white border border-[#E3E0D9] flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono gap-3 shadow-sm">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-sans text-[#202124]">
              <strong>Closed-Loop Feedback Architecture:</strong> In-memory classification &rarr; User correction &rarr; Feedback CSV &rarr; Automated retraining &rarr; In-memory model hot-reload.
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#7895B2] uppercase font-bold px-2.5 py-1 bg-[#FAF9F6] border border-[#E3E0D9] rounded-lg flex-shrink-0 self-start sm:self-auto">
            Zero Telemetry Leakage
          </span>
        </div>
      </div>
    </div>
  );
};
