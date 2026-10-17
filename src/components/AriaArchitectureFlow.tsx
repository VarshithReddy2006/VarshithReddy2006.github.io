import React, { useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  MarkerType,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useReducedMotion } from 'framer-motion';
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  ArrowRight,
  Info,
  Layers,
  X,
} from 'lucide-react';

export interface StageDetail {
  id: string;
  step: string;
  title: string;
  badge: string;
  role: string;
  summary: string;
  inputs: string[];
  outputs: string[];
  relationships: {
    incoming: { id: string; label: string }[];
    outgoing: { id: string; label: string }[];
  };
  technicalNotes: string;
}

export const ARIA_STAGES_DATA: Record<string, StageDetail> = {
  'stage-1': {
    id: 'stage-1',
    step: '01',
    title: 'Repository Traversal & Ingestion',
    badge: 'INGESTION',
    role: 'Recursively explores repository source tree while respecting .gitignore rules, detecting language targets, and extracting Git historical commit churn frequency.',
    summary: 'Git walk, churn analysis & .gitignore compliance',
    inputs: ['Local or Remote Git Repository Directory', '.gitignore Specifications', 'Git Commit History & Metadata'],
    outputs: ['Filtered Source File Manifest', 'Multi-Language File Classification Map', 'File Churn Frequency Weights'],
    relationships: {
      incoming: [],
      outgoing: [
        { id: 'stage-2', label: 'Filtered Source Manifest → Language Parsing' },
        { id: 'stage-4', label: 'Git Churn Weights → Coupling Analysis' },
      ],
    },
    technicalNotes: 'Implements incremental walk logic; caches directory hashes to avoid redundant I/O operations across repeated analysis passes.',
  },
  'stage-2': {
    id: 'stage-2',
    step: '02',
    title: 'Language-Aware AST Parsing',
    badge: 'PARSING',
    role: 'Synthesizes raw source files into language-accurate Abstract Syntax Trees using Tree-sitter parsers, capturing exact character and line/column coordinate offsets.',
    summary: 'Tree-sitter ASTs & character/line coordinates',
    inputs: ['Filtered Source Code Files', 'Tree-sitter Language Grammars (Python, TS, Java)'],
    outputs: ['Abstract Syntax Tree (AST) Forests', 'Node Coordinate Hierarchy Trees', 'Import & Module Directives'],
    relationships: {
      incoming: [{ id: 'stage-1', label: 'Source File Manifest' }],
      outgoing: [{ id: 'stage-3', label: 'AST Nodes & Coordinates → Symbol Table' }],
    },
    technicalNotes: 'Preserves concrete node coordinates for line-level precision; handles syntax faults gracefully through resilient Tree-sitter error recovery.',
  },
  'stage-3': {
    id: 'stage-3',
    step: '03',
    title: 'Symbol Indexing & Scope Tables',
    badge: 'INDEXING',
    role: 'Resolves lexical scopes, generates unique symbol keys, indexes definitions, and tracks cross-file identifier references across namespaces.',
    summary: 'Lexical scopes, symbol keys & cross-file refs',
    inputs: ['AST Hierarchy Trees', 'Scope Context Rules & Type Signatures'],
    outputs: ['Symbol Definition Registry', 'Lexical Scope Symbol Tables', 'Cross-File Reference Coordinates'],
    relationships: {
      incoming: [{ id: 'stage-2', label: 'AST Nodes & Coordinate Hierarchy' }],
      outgoing: [
        { id: 'stage-4', label: 'Scoped Symbols → Structural Synthesis' },
        { id: 'stage-5', label: 'Symbol Tokens → BM25 Lexical Index' },
      ],
    },
    technicalNotes: 'Constructs fast in-memory hash indexes mapping every symbol to its declaring file, coordinate bounds, and export status.',
  },
  'stage-4': {
    id: 'stage-4',
    step: '04',
    title: 'Tri-Perspective Graph Synthesis',
    badge: 'SYNTHESIS',
    role: 'Constructs three synchronized structural models: File Graph (coupling & boundaries), Call Graph (execution flow), and API Surface (contracts & endpoints).',
    summary: 'File Graph, Call Graph & API Surface synthesis',
    inputs: ['Symbol Registry', 'AST Import Directives', 'Caller-Callee Bindings', 'Commit Churn Weights'],
    outputs: ['NetworkX In-Memory Call & File Graphs', 'Topological Dependency Metrics', 'Blast Radius Adjacency Matrices'],
    relationships: {
      incoming: [
        { id: 'stage-1', label: 'Git Commit Churn Weights' },
        { id: 'stage-3', label: 'Scoped Symbol Registry' },
      ],
      outgoing: [
        { id: 'stage-5', label: 'Graph Adjacencies → Structural Retrieval' },
        { id: 'stage-6', label: 'Topological Metrics → Blast Radius Analysis' },
      ],
    },
    technicalNotes: 'Synthesizes cross-file dependencies and detects high-coupling hotspots with an incremental in-memory cache architecture.',
  },
  'stage-5': {
    id: 'stage-5',
    step: '05',
    title: 'Hybrid Dense & Lexical Retrieval',
    badge: 'RETRIEVAL',
    role: 'Fuses dense vector embeddings (ChromaDB / Qdrant) with graph-walk structural expansions and BM25 lexical search for comprehensive context window assembly.',
    summary: 'Dense vectors, graph walks & BM25 fused search',
    inputs: ['User or Agent Analysis Query', 'Dense Vector Collections', 'Synthesized Graph Adjacencies', 'Symbol Lexical Tables'],
    outputs: ['Rank-Ordered Context Chunks', 'Transitive Prerequisite Call Chains', 'Verifiable Line-Level Citations'],
    relationships: {
      incoming: [
        { id: 'stage-3', label: 'Lexical Symbol Tables' },
        { id: 'stage-4', label: 'Graph Adjacencies & Topological Paths' },
      ],
      outgoing: [{ id: 'stage-6', label: 'Hybrid Structural Context → Grounded Analysis' }],
    },
    technicalNotes: 'Prevents shallow keyword-only matches by forcing context windows to contain the complete transitive caller-callee prerequisites.',
  },
  'stage-6': {
    id: 'stage-6',
    step: '06',
    title: 'Context-Grounded Analysis',
    badge: 'ANALYSIS',
    role: 'Executes change impact analysis, evaluates downstream breaking risks, and calculates an evidence-grounded risk score with direct line citations.',
    summary: 'Blast radius scoring & AST-grounded citations',
    inputs: ['Hybrid Structural Context', 'Pull Request Git Diffs', 'Analysis Evaluation Prompts'],
    outputs: ['Blast Radius Quantification', 'PR Risk Score (0–100)', 'Evidence-Grounded Explanations with Citations'],
    relationships: {
      incoming: [
        { id: 'stage-4', label: 'Adjacency Matrices & Blast Radius' },
        { id: 'stage-5', label: 'Hybrid Structural Context' },
      ],
      outgoing: [{ id: 'stage-7', label: 'Analysis Insights → SSE & MCP Dispatch' }],
    },
    technicalNotes: 'Every assertion links directly to verified AST node coordinates, eliminating hallucinated function calls and dependencies.',
  },
  'stage-7': {
    id: 'stage-7',
    step: '07',
    title: 'Developer Insights & MCP Delivery',
    badge: 'DELIVERY',
    role: 'Delivers structured analysis via Server-Sent Events (SSE) streaming and Model Context Protocol (MCP) server endpoints to IDEs and external AI agents.',
    summary: 'SSE streaming & Model Context Protocol server',
    inputs: ['Grounded Analysis Payloads', 'MCP Tool Call Requests', 'IDE Client SSE Connections'],
    outputs: ['IDE Assistant Responses (MCP)', 'Terminal CLI Outputs', 'Automated PR Review Commentaries'],
    relationships: {
      incoming: [{ id: 'stage-6', label: 'Verified Grounded Analysis Results' }],
      outgoing: [],
    },
    technicalNotes: 'Standardized HTTP-based MCP server exposes graph navigation, symbol lookup, and PR risk assessment to Claude, Cursor, and custom agents.',
  },
};

// Custom Stage Node Component for React Flow with 4 directional handles
interface StageNodeProps {
  data: {
    id: string;
    step: string;
    title: string;
    badge: string;
    summary: string;
    isSelected: boolean;
    isIncoming: boolean;
    isOutgoing: boolean;
    onSelect: (id: string) => void;
  };
}

const StageNode: React.FC<StageNodeProps> = ({ data }) => {
  const { id, step, title, badge, summary, isSelected, isIncoming, isOutgoing, onSelect } = data;

  let borderStyle = 'border-[#E3E0D9] hover:border-[#7895B2] hover:shadow-md';
  let badgeBg = 'bg-[#FAF9F6] text-[#525866] border-[#E3E0D9]';

  if (isSelected) {
    borderStyle = 'border-[#202124] ring-2 ring-[#7895B2]/60 shadow-editorial bg-white';
    badgeBg = 'bg-[#202124] text-[#F5F3EE] border-[#202124]';
  } else if (isIncoming || isOutgoing) {
    borderStyle = 'border-[#7895B2] bg-[#FAF9F6] shadow-sm';
    badgeBg = 'bg-[#7895B2]/15 text-[#3D5A80] border-[#7895B2]/40 font-semibold';
  }

  return (
    <div
      onClick={() => onSelect(id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(id);
        }
      }}
      aria-label={`Select stage ${step}: ${title}`}
      className={`w-[270px] p-4 rounded-xl bg-white border transition-all cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] select-none ${borderStyle}`}
    >
      {/* Handles on 4 sides for clean, non-crossing directional edges */}
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        className="!w-2.5 !h-2.5 !bg-[#7895B2] !border-white"
        aria-hidden="true"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        className="!w-2.5 !h-2.5 !bg-[#7895B2] !border-white"
        aria-hidden="true"
      />

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-xs font-bold text-[#4B6B94]">{step}</span>
          <span className="text-[10px] font-mono text-[#737780]">/ 07</span>
        </div>
        <span
          className={`text-[9.5px] font-mono uppercase px-2 py-0.5 rounded border tracking-wider font-semibold ${badgeBg}`}
        >
          {badge}
        </span>
      </div>

      <h4 className="font-serif text-[14px] font-semibold text-[#202124] leading-snug line-clamp-2">
        {title}
      </h4>

      <p className="mt-1.5 font-sans text-[11px] text-[#525866] leading-tight line-clamp-1 border-t border-[#E3E0D9]/70 pt-1.5">
        {summary}
      </p>

      {(isIncoming || isOutgoing) && !isSelected && (
        <span className="mt-2 inline-block text-[9.5px] font-mono text-[#4B6B94] uppercase tracking-wide font-bold bg-[#7895B2]/10 px-1.5 py-0.5 rounded">
          {isIncoming ? '← Feeds Active Stage' : '→ Receives Output'}
        </span>
      )}

      <Handle
        type="source"
        position={Position.Right}
        id="source-right"
        className="!w-2.5 !h-2.5 !bg-[#7895B2] !border-white"
        aria-hidden="true"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="source-bottom"
        className="!w-2.5 !h-2.5 !bg-[#7895B2] !border-white"
        aria-hidden="true"
      />
    </div>
  );
};

const nodeTypes = {
  stageNode: StageNode,
};

// Internal Canvas Component with React Flow
const FlowCanvas: React.FC<{
  selectedStageId: string;
  onSelectStage: (id: string) => void;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}> = ({ selectedStageId, onSelectStage, onToggleExpand, isExpanded = false }) => {
  const { fitView } = useReactFlow();
  const shouldReduceMotion = useReducedMotion();

  const selectedStage = ARIA_STAGES_DATA[selectedStageId] || ARIA_STAGES_DATA['stage-1'];

  const incomingIds = useMemo(
    () => new Set(selectedStage.relationships.incoming.map((r) => r.id)),
    [selectedStage]
  );
  const outgoingIds = useMemo(
    () => new Set(selectedStage.relationships.outgoing.map((r) => r.id)),
    [selectedStage]
  );

  // Balanced 3-tier layout (980px × 455px) matching natural container aspect ratio
  const rawNodes: Node[] = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {
      'stage-1': { x: 30, y: 35 },
      'stage-2': { x: 370, y: 35 },
      'stage-3': { x: 710, y: 35 },
      'stage-4': { x: 370, y: 200 },
      'stage-5': { x: 710, y: 200 },
      'stage-6': { x: 370, y: 365 },
      'stage-7': { x: 710, y: 365 },
    };

    return Object.values(ARIA_STAGES_DATA).map((stage) => {
      const isSelected = stage.id === selectedStageId;
      const isIncoming = incomingIds.has(stage.id);
      const isOutgoing = outgoingIds.has(stage.id);

      return {
        id: stage.id,
        type: 'stageNode',
        position: positions[stage.id] || { x: 0, y: 0 },
        data: {
          id: stage.id,
          step: stage.step,
          title: stage.title,
          badge: stage.badge,
          summary: stage.summary,
          isSelected,
          isIncoming,
          isOutgoing,
          onSelect: onSelectStage,
        },
      };
    });
  }, [selectedStageId, incomingIds, outgoingIds, onSelectStage]);

  // Directed edges with handles tailored to eliminate crossing and maintain flow
  const rawEdges: Edge[] = useMemo(() => {
    const connections = [
      { id: 'e1-2', source: 'stage-1', target: 'stage-2', sourceHandle: 'source-right', targetHandle: 'target-left', label: 'Source files' },
      { id: 'e1-4', source: 'stage-1', target: 'stage-4', sourceHandle: 'source-bottom', targetHandle: 'target-left', label: 'Git churn metrics' },
      { id: 'e2-3', source: 'stage-2', target: 'stage-3', sourceHandle: 'source-right', targetHandle: 'target-left', label: 'AST nodes' },
      { id: 'e3-4', source: 'stage-3', target: 'stage-4', sourceHandle: 'source-bottom', targetHandle: 'target-top', label: 'Scoped symbols' },
      { id: 'e3-5', source: 'stage-3', target: 'stage-5', sourceHandle: 'source-bottom', targetHandle: 'target-top', label: 'BM25 tokens' },
      { id: 'e4-5', source: 'stage-4', target: 'stage-5', sourceHandle: 'source-right', targetHandle: 'target-left', label: 'Call & file graphs' },
      { id: 'e4-6', source: 'stage-4', target: 'stage-6', sourceHandle: 'source-bottom', targetHandle: 'target-top', label: 'Blast radius metrics' },
      { id: 'e5-6', source: 'stage-5', target: 'stage-6', sourceHandle: 'source-bottom', targetHandle: 'target-top', label: 'Hybrid context' },
      { id: 'e6-7', source: 'stage-6', target: 'stage-7', sourceHandle: 'source-right', targetHandle: 'target-left', label: 'Grounded insights' },
    ];

    return connections.map((conn) => {
      const isConnectedToSelected =
        conn.source === selectedStageId || conn.target === selectedStageId;

      let strokeColor = '#D2CEC4';
      let strokeWidth = 1.5;
      let opacity = 0.7;
      let animated = false;

      if (isConnectedToSelected) {
        strokeColor = '#4B6B94';
        strokeWidth = 2.5;
        opacity = 1;
        animated = !shouldReduceMotion;
      }

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        sourceHandle: conn.sourceHandle,
        targetHandle: conn.targetHandle,
        animated,
        label: isConnectedToSelected ? conn.label : undefined,
        labelStyle: {
          fill: '#202124',
          fontSize: 11,
          fontFamily: 'monospace',
          fontWeight: 700,
        },
        labelBgStyle: {
          fill: '#FFFFFF',
          fillOpacity: 0.98,
          stroke: '#4B6B94',
          strokeWidth: 1.5,
          rx: 6,
        },
        labelBgPadding: [8, 4] as [number, number],
        style: {
          stroke: strokeColor,
          strokeWidth,
          opacity,
          transition: 'all 0.25s ease',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
          width: 15,
          height: 15,
        },
      };
    });
  }, [selectedStageId, shouldReduceMotion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.12, duration: 400 });
    }, 100);
    return () => clearTimeout(timer);
  }, [fitView]);

  return (
    <div className={`relative w-full rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] overflow-hidden shadow-inner ${isExpanded ? 'h-full' : 'h-[470px] sm:h-[530px]'}`}>
      <ReactFlow
        nodes={rawNodes}
        edges={rawEdges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.4}
        maxZoom={1.6}
        panOnScroll={false}
        zoomOnPinch={true}
        panOnDrag={true}
        preventScrolling={false}
        aria-label="Interactive ARIA Architecture Flowchart"
      >
        <Background color="#D2CEC4" gap={24} size={1} />
      </ReactFlow>

      {/* Floating Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#E3E0D9] rounded-xl p-1.5 shadow-sm">
        <button
          type="button"
          onClick={() => fitView({ padding: 0.12, duration: 400 })}
          title="Fit graph to view"
          aria-label="Fit graph to view"
          className="p-1.5 rounded-lg text-[#525866] hover:text-[#202124] hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            onSelectStage('stage-1');
            fitView({ padding: 0.12, duration: 400 });
          }}
          title="Reset graph view to Stage 1"
          aria-label="Reset graph view"
          className="p-1.5 rounded-lg text-[#525866] hover:text-[#202124] hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        {onToggleExpand && (
          <button
            type="button"
            onClick={onToggleExpand}
            title={isExpanded ? 'Close expanded view' : 'Open fullscreen inspector'}
            aria-label={isExpanded ? 'Close expanded view' : 'Open fullscreen inspector'}
            className="p-1.5 rounded-lg text-[#525866] hover:text-[#202124] hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>

      {/* Bottom Canvas Legend */}
      <div className="absolute bottom-3 left-4 right-4 sm:right-auto z-10 flex flex-wrap items-center gap-3.5 bg-white/95 backdrop-blur-sm border border-[#E3E0D9] rounded-xl px-3.5 py-2 text-[11px] font-mono text-[#525866] shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-[#202124] bg-white ring-2 ring-[#7895B2]/60" />
          <span className="font-medium text-[#202124]">Selected Stage</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-[#7895B2] bg-[#FAF9F6]" />
          <span>Connected Dependency</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-[2px] bg-[#4B6B94]" />
          <span>Active Data Path</span>
        </div>
      </div>
    </div>
  );
};

export const AriaArchitectureFlow: React.FC = () => {
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-4');
  const [isExpandedModal, setIsExpandedModal] = useState<boolean>(false);
  const [mobileViewMode, setMobileViewMode] = useState<'canvas' | 'pipeline'>('canvas');

  const selectedStage = ARIA_STAGES_DATA[selectedStageId] || ARIA_STAGES_DATA['stage-4'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpandedModal) {
        setIsExpandedModal(false);
      }
    };
    if (isExpandedModal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isExpandedModal]);

  return (
    <div className="space-y-6">
      {/* Mobile Mode Switcher (visible on small mobile screens <640px) */}
      <div className="flex sm:hidden items-center justify-between p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
        <span className="text-[11px] font-mono font-semibold text-[#525866] pl-2">
          Flowchart View:
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setMobileViewMode('canvas')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              mobileViewMode === 'canvas'
                ? 'bg-[#202124] text-[#F5F3EE]'
                : 'text-[#525866] hover:bg-white'
            }`}
          >
            Interactive Map
          </button>
          <button
            type="button"
            onClick={() => setMobileViewMode('pipeline')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              mobileViewMode === 'pipeline'
                ? 'bg-[#202124] text-[#F5F3EE]'
                : 'text-[#525866] hover:bg-white'
            }`}
          >
            Step Pipeline
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      {mobileViewMode === 'pipeline' ? (
        // Mobile-friendly step-by-step pipeline view with rich readable cards
        <div className="space-y-2.5 sm:hidden">
          {Object.values(ARIA_STAGES_DATA).map((stage) => {
            const isSelected = stage.id === selectedStageId;
            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedStageId(stage.id);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'border-[#202124] bg-white ring-2 ring-[#7895B2]/50 shadow-sm'
                    : 'border-[#E3E0D9] bg-[#FAF9F6] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#4B6B94]">{stage.step}</span>
                    <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#525866] font-semibold">
                      {stage.badge}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold">
                      Active
                    </span>
                  )}
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#202124] leading-snug">
                  {stage.title}
                </h4>
                <p className="mt-1 font-sans text-xs text-[#525866] leading-relaxed">
                  {stage.summary}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        /* Interactive Graph Canvas wrapped in ReactFlowProvider */
        <ReactFlowProvider>
          <FlowCanvas
            selectedStageId={selectedStageId}
            onSelectStage={setSelectedStageId}
            onToggleExpand={() => setIsExpandedModal(true)}
          />
        </ReactFlowProvider>
      )}

      {/* Fullscreen Expanded View Modal */}
      {isExpandedModal && (
        <div className="fixed inset-0 z-50 bg-[#202124]/70 backdrop-blur-sm flex flex-col p-3 sm:p-6 animate-fadeIn">
          <div className="bg-[#FAF9F6] border border-[#E3E0D9] rounded-2xl flex-1 flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E3E0D9] bg-white">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#7895B2] font-semibold block">
                  EXPANDED ARCHITECTURE VIEW
                </span>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-[#202124]">
                  ARIA 7-Stage Architectural Pipeline
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsExpandedModal(false)}
                title="Close expanded view"
                aria-label="Close expanded view"
                className="p-2 rounded-xl text-[#525866] hover:text-[#202124] hover:bg-[#F5F3EE] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Flow Canvas */}
            <div className="flex-1 relative">
              <ReactFlowProvider>
                <FlowCanvas
                  selectedStageId={selectedStageId}
                  onSelectStage={setSelectedStageId}
                  isExpanded={true}
                />
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      )}

      {/* Stage Detail Inspector Panel */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm space-y-5 animate-fadeIn">
        {/* Panel Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E3E0D9] gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#4B6B94]">
              {selectedStage.step}
            </span>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[#525866] font-semibold tracking-wider mr-2">
                {selectedStage.badge}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#202124] inline">
                {selectedStage.title}
              </h3>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#525866]">
            Select any node on the graph to inspect inputs, outputs & connections
          </div>
        </div>

        {/* Role & Description */}
        <p className="text-sm text-[#202124] leading-relaxed font-sans">
          {selectedStage.role}
        </p>

        {/* Inputs & Outputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Inputs */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525866] font-bold block">
              Stage Inputs
            </span>
            <ul className="space-y-1.5">
              {selectedStage.inputs.map((inp, idx) => (
                <li key={idx} className="text-xs text-[#202124] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4B6B94] flex-shrink-0 mt-1.5" />
                  <span className="leading-snug">{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outputs */}
          <div className="p-4 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] space-y-2.5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#525866] font-bold block">
              Stage Outputs
            </span>
            <ul className="space-y-1.5">
              {selectedStage.outputs.map((out, idx) => (
                <li key={idx} className="text-xs text-[#202124] flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#202124] flex-shrink-0 mt-1.5" />
                  <span className="leading-snug">{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verified Relationships Section */}
        <div className="pt-2 border-t border-[#E3E0D9] space-y-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#525866] font-bold block">
            Verified Architectural Relationships
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {/* Incoming Connections */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#4B6B94] font-semibold block">
                ← Feeds Into This Stage:
              </span>
              {selectedStage.relationships.incoming.length > 0 ? (
                selectedStage.relationships.incoming.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setSelectedStageId(rel.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-white border border-[#E3E0D9] hover:border-[#7895B2] text-[#202124] hover:text-[#4B6B94] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
                  >
                    <span className="truncate pr-2 font-medium">{rel.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4B6B94] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                ))
              ) : (
                <span className="text-[11px] text-[#737780] italic block py-1">
                  Root Pipeline Ingestion Stage (No incoming pipeline dependencies)
                </span>
              )}
            </div>

            {/* Outgoing Connections */}
            <div className="space-y-1.5">
              <span className="text-[11px] text-[#4B6B94] font-semibold block">
                → Propagates Downstream To:
              </span>
              {selectedStage.relationships.outgoing.length > 0 ? (
                selectedStage.relationships.outgoing.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => setSelectedStageId(rel.id)}
                    className="w-full text-left p-2.5 rounded-lg bg-white border border-[#E3E0D9] hover:border-[#7895B2] text-[#202124] hover:text-[#4B6B94] transition-colors flex items-center justify-between group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124]"
                  >
                    <span className="truncate pr-2 font-medium">{rel.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#4B6B94] group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
                  </button>
                ))
              ) : (
                <span className="text-[11px] text-[#737780] italic block py-1">
                  Terminal Delivery Stage (Client integration endpoints)
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Technical implementation note */}
        <div className="p-3.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] flex items-start gap-2.5 text-xs text-[#525866]">
          <Info className="w-4 h-4 text-[#4B6B94] flex-shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            <strong className="text-[#202124] font-mono">Engineering Verification: </strong>
            {selectedStage.technicalNotes}
          </span>
        </div>
      </div>
    </div>
  );
};
