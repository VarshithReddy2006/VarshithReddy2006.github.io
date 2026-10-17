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
  Info,
  Layers,
  X,
} from 'lucide-react';

export type PerspectiveType = 'file' | 'call' | 'api';

interface PerspectiveNodeDetail {
  id: string;
  name: string;
  typeBadge: string;
  category: string;
  primaryMetric: string;
  secondaryMetric: string;
  description: string;
  dependencies: string[];
}

// Custom Perspective Node Component with 4 directional handles & summary metric
interface PerspectiveNodeComponentProps {
  data: {
    id: string;
    label: string;
    typeBadge: string;
    primaryMetric: string;
    isSelected: boolean;
    isNeighbor: boolean;
    onSelect: (id: string) => void;
  };
}

const PerspectiveCustomNode: React.FC<PerspectiveNodeComponentProps> = ({ data }) => {
  const { id, label, typeBadge, primaryMetric, isSelected, isNeighbor, onSelect } = data;

  let borderStyle = 'border-[#E3E0D9] hover:border-[#7895B2] hover:shadow-md';
  let badgeStyle = 'bg-[#FAF9F6] text-[#525866] border-[#E3E0D9]';

  if (isSelected) {
    borderStyle = 'border-[#202124] ring-2 ring-[#7895B2]/60 shadow-editorial bg-white';
    badgeStyle = 'bg-[#202124] text-[#F5F3EE] border-[#202124]';
  } else if (isNeighbor) {
    borderStyle = 'border-[#7895B2] bg-[#FAF9F6] shadow-sm';
    badgeStyle = 'bg-[#7895B2]/15 text-[#3D5A80] border-[#7895B2]/40 font-semibold';
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
      aria-label={`Select ${label}`}
      className={`w-[250px] min-h-[82px] p-3.5 rounded-xl bg-white border transition-all cursor-pointer text-left flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#202124] select-none ${borderStyle}`}
    >
      {/* 4 Handles for clean multi-directional edge routing */}
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

      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`text-[9.5px] font-mono uppercase px-2 py-0.5 rounded border tracking-wider font-semibold ${badgeStyle}`}
        >
          {typeBadge}
        </span>
        {isSelected && (
          <span className="text-[9px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold">
            Selected
          </span>
        )}
      </div>

      <p
        className="font-mono text-xs font-bold text-[#202124] leading-snug break-words line-clamp-2"
        title={label}
      >
        {label}
      </p>

      <span className="text-[10px] font-mono text-[#525866] mt-1 line-clamp-1 border-t border-[#E3E0D9]/70 pt-1">
        {primaryMetric}
      </span>

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
  perspectiveNode: PerspectiveCustomNode,
};

// Deterministic Sample Data for File Graph (Perserving Exact Historical Data)
const FILE_GRAPH_DETAILS: Record<string, PerspectiveNodeDetail> = {
  'f-server': {
    id: 'f-server',
    name: 'src/aria/api/server.py',
    typeBadge: 'API CONTROLLER',
    category: 'REST & SSE Interface Layer',
    primaryMetric: 'Fan-Out: 3 Modules',
    secondaryMetric: 'Lines of Code: 480',
    description: 'Central FastAPI entrypoint establishing HTTP routers, Model Context Protocol server endpoints, and Server-Sent Events response channels.',
    dependencies: ['retrieval/hybrid.py', 'mcp/protocol.py', 'core/parser.py'],
  },
  'f-hybrid': {
    id: 'f-hybrid',
    name: 'src/aria/retrieval/hybrid.py',
    typeBadge: 'RETRIEVAL',
    category: 'Dense & Structural Search Layer',
    primaryMetric: 'Coupling: Medium',
    secondaryMetric: 'ChromaDB + BM25 Blending',
    description: 'Implements dual-channel retrieval merging vector proximity search with topological graph walks across caller-callee hierarchies.',
    dependencies: ['graph/call_graph.py', 'graph/file_graph.py'],
  },
  'f-call': {
    id: 'f-call',
    name: 'src/aria/graph/call_graph.py',
    typeBadge: 'GRAPH ENGINE',
    category: 'Topological Execution Flow',
    primaryMetric: 'NetworkX DirectedGraph',
    secondaryMetric: 'Complexity: O(V + E)',
    description: 'Constructs in-memory directed graphs tracking cross-file function calls, class instantiations, and recursive control-flow paths.',
    dependencies: ['core/ast_builder.py'],
  },
  'f-file': {
    id: 'f-file',
    name: 'src/aria/graph/file_graph.py',
    typeBadge: 'GRAPH ENGINE',
    category: 'Coupling & Blast Radius Module',
    primaryMetric: 'Git Churn Normalized',
    secondaryMetric: 'Adjacency Matrix Cache',
    description: 'Tracks explicit file imports, module boundaries, and correlates commit churn frequency to locate volatile architectural seams.',
    dependencies: ['core/parser.py'],
  },
  'f-parser': {
    id: 'f-parser',
    name: 'src/aria/core/parser.py',
    typeBadge: 'CORE ENGINE',
    category: 'Source Ingestion & Parsing',
    primaryMetric: 'Multi-Language AST',
    secondaryMetric: 'Incremental Cache Safe',
    description: 'Wraps Tree-sitter bindings for multi-language syntax tree generation with concrete line and column coordinate annotations.',
    dependencies: ['core/ast_builder.py'],
  },
  'f-ast': {
    id: 'f-ast',
    name: 'src/aria/core/ast_builder.py',
    typeBadge: 'CORE AST',
    category: 'Syntax Tree & Scope Resolver',
    primaryMetric: 'Coordinate Offsets',
    secondaryMetric: 'Zero Hallucination Anchor',
    description: 'Traverses syntax trees to generate coordinate-accurate node hierarchies and extract symbol definitions with scope boundaries.',
    dependencies: [],
  },
  'f-mcp': {
    id: 'f-mcp',
    name: 'src/aria/mcp/protocol.py',
    typeBadge: 'PROTOCOL',
    category: 'Model Context Protocol Server',
    primaryMetric: 'JSON-RPC 2.0 / SSE',
    secondaryMetric: 'Tool Handlers: 6',
    description: 'Implements standard Model Context Protocol server exposing repository search, symbol inspection, and blast-radius tools to external AI agents.',
    dependencies: [],
  },
};

// Deterministic Sample Data for Call Graph (Perserving Exact Historical Data)
const CALL_GRAPH_DETAILS: Record<string, PerspectiveNodeDetail> = {
  'c-entry': {
    id: 'c-entry',
    name: 'parse_repository()',
    typeBadge: 'ENTRYPOINT',
    category: 'Repository Coordinator Function',
    primaryMetric: 'Call Depth: 0 (Root)',
    secondaryMetric: 'Root Orchestrator',
    description: 'Primary workflow coordinator that orchestrates filesystem discovery, tree parsing, and multi-perspective graph assembly.',
    dependencies: ['build_ast_forest()', 'synthesize_call_matrix()'],
  },
  'c-forest': {
    id: 'c-forest',
    name: 'build_ast_forest()',
    typeBadge: 'COORDINATOR',
    category: 'AST Generation Coordinator',
    primaryMetric: 'Call Depth: 1',
    secondaryMetric: 'Concurrent Threads: 4',
    description: 'Distributes files across workers to construct individual Abstract Syntax Trees with coordinate mappings.',
    dependencies: ['tree_sitter_parse()', 'extract_symbols()'],
  },
  'c-parse': {
    id: 'c-parse',
    name: 'tree_sitter_parse()',
    typeBadge: 'PARSER',
    category: 'C-Binding Parser Routine',
    primaryMetric: 'Call Depth: 2',
    secondaryMetric: 'Memory: Sub-50MB',
    description: 'Low-level grammar evaluator parsing raw byte buffers into language-accurate concrete syntax trees.',
    dependencies: [],
  },
  'c-symbols': {
    id: 'c-symbols',
    name: 'extract_symbols()',
    typeBadge: 'INDEXER',
    category: 'Scope & Identifier Resolution',
    primaryMetric: 'Call Depth: 2',
    secondaryMetric: 'Symbol Registry Table',
    description: 'Traverses AST nodes to extract declared functions, classes, interfaces, and local/global lexical scope boundaries.',
    dependencies: ['resolve_scope_chains()'],
  },
  'c-scope': {
    id: 'c-scope',
    name: 'resolve_scope_chains()',
    typeBadge: 'RESOLVER',
    category: 'Lexical Scope Table Resolver',
    primaryMetric: 'Call Depth: 3',
    secondaryMetric: 'Cross-File Resolution',
    description: 'Resolves imported identifier references against export registries to link cross-module call connections.',
    dependencies: [],
  },
  'c-matrix': {
    id: 'c-matrix',
    name: 'synthesize_call_matrix()',
    typeBadge: 'SYNTHESIS',
    category: 'Topological Graph Assembly',
    primaryMetric: 'Call Depth: 1',
    secondaryMetric: 'Directed Call Edges',
    description: 'Assembles caller-to-callee pairings into an in-memory NetworkX directed graph for topological path queries.',
    dependencies: ['calculate_blast_radius()'],
  },
  'c-blast': {
    id: 'c-blast',
    name: 'calculate_blast_radius()',
    typeBadge: 'ANALYZER',
    category: 'Impact Radius Calculation',
    primaryMetric: 'Call Depth: 2',
    secondaryMetric: 'Transitive Graph Walk',
    description: 'Executes breadth-first graph traversal from modified symbol nodes to identify all affected downstream consumer functions.',
    dependencies: [],
  },
};

// Deterministic Sample Data for API Surface (Perserving Exact Historical Data)
const API_SURFACE_DETAILS: Record<string, PerspectiveNodeDetail> = {
  'a-ide': {
    id: 'a-ide',
    name: 'IDE Assistant Client',
    typeBadge: 'CONSUMER',
    category: 'Developer Client Integration',
    primaryMetric: 'Protocol: HTTP / SSE',
    secondaryMetric: 'Context: Active Editor File',
    description: 'Client environment (Cursor, VS Code, or Web UI) issuing natural language queries and repository inspection commands.',
    dependencies: ['POST /api/v1/query/stream', 'POST /mcp/v1/tools/call'],
  },
  'a-ci': {
    id: 'a-ci',
    name: 'Automated CI Pipeline',
    typeBadge: 'CONSUMER',
    category: 'Continuous Integration Bot',
    primaryMetric: 'Protocol: REST Webhook',
    secondaryMetric: 'Trigger: Pull Request Diff',
    description: 'GitHub Actions workflow triggering automated PR change impact analysis and blast radius evaluation.',
    dependencies: ['POST /api/v1/analyze/diff'],
  },
  'a-stream': {
    id: 'a-stream',
    name: 'POST /api/v1/query/stream',
    typeBadge: 'ENDPOINT',
    category: 'Server-Sent Events Endpoint',
    primaryMetric: 'Output: text/event-stream',
    secondaryMetric: 'Citation Precision: 100%',
    description: 'Streams conversational codebase insights with line-level AST citations and verified caller-callee context.',
    dependencies: ['RepositoryQueryContract'],
  },
  'a-diff': {
    id: 'a-diff',
    name: 'POST /api/v1/analyze/diff',
    typeBadge: 'ENDPOINT',
    category: 'PR Risk Scoring Endpoint',
    primaryMetric: 'Output: application/json',
    secondaryMetric: 'Latency: Sub-2.5s',
    description: 'Analyzes Git unified diffs against the repository call graph to calculate a blast radius score and downstream breaking risk report.',
    dependencies: ['ChangeImpactPayload'],
  },
  'a-mcp-call': {
    id: 'a-mcp-call',
    name: 'POST /mcp/v1/tools/call',
    typeBadge: 'MCP PROTOCOL',
    category: 'Model Context Protocol Execution',
    primaryMetric: 'JSON-RPC 2.0',
    secondaryMetric: 'Agent Tool Interface',
    description: 'Allows external AI agents to programmatically query symbols, navigate AST graphs, and inspect dependencies.',
    dependencies: [],
  },
  'a-contract-query': {
    id: 'a-contract-query',
    name: 'RepositoryQueryContract',
    typeBadge: 'SCHEMA',
    category: 'Pydantic Query Specification',
    primaryMetric: 'Strict Type Validation',
    secondaryMetric: 'Fields: query, target_files',
    description: 'Defines valid user search queries, active editor coordinates, and optional file boundary filters.',
    dependencies: [],
  },
  'a-contract-impact': {
    id: 'a-contract-impact',
    name: 'ChangeImpactPayload',
    typeBadge: 'SCHEMA',
    category: 'Pydantic Response Specification',
    primaryMetric: 'Risk Score (0–100)',
    secondaryMetric: 'Blast Radius List',
    description: 'Standardized response schema containing risk severity, affected caller nodes, and suggested test targets.',
    dependencies: [],
  },
};

// Canvas Component with React Flow
const PerspectivesCanvas: React.FC<{
  perspective: PerspectiveType;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
  onToggleExpand?: () => void;
  isExpanded?: boolean;
}> = ({ perspective, selectedNodeId, onSelectNode, onToggleExpand, isExpanded = false }) => {
  const { fitView } = useReactFlow();
  const shouldReduceMotion = useReducedMotion();

  // Data for active perspective
  const currentDetails = useMemo(() => {
    switch (perspective) {
      case 'file':
        return FILE_GRAPH_DETAILS;
      case 'call':
        return CALL_GRAPH_DETAILS;
      case 'api':
        return API_SURFACE_DETAILS;
    }
  }, [perspective]);

  const activeNode = currentDetails[selectedNodeId] || Object.values(currentDetails)[0];
  const dependencySet = useMemo(() => new Set(activeNode?.dependencies || []), [activeNode]);

  // Construct Nodes with balanced 2D layouts (950px × ~400px) eliminating horizontal elongation
  const nodes: Node[] = useMemo(() => {
    const positions: Record<string, Record<string, { x: number; y: number }>> = {
      file: {
        'f-server': { x: 40, y: 130 },
        'f-mcp': { x: 40, y: 290 },
        'f-hybrid': { x: 370, y: 40 },
        'f-call': { x: 370, y: 180 },
        'f-file': { x: 370, y: 310 },
        'f-parser': { x: 700, y: 110 },
        'f-ast': { x: 700, y: 260 },
      },
      call: {
        'c-entry': { x: 40, y: 160 },
        'c-forest': { x: 370, y: 60 },
        'c-matrix': { x: 370, y: 280 },
        'c-parse': { x: 700, y: 20 },
        'c-symbols': { x: 700, y: 130 },
        'c-scope': { x: 700, y: 240 },
        'c-blast': { x: 700, y: 350 },
      },
      api: {
        'a-ide': { x: 40, y: 70 },
        'a-ci': { x: 40, y: 270 },
        'a-stream': { x: 370, y: 30 },
        'a-mcp-call': { x: 370, y: 140 },
        'a-diff': { x: 370, y: 270 },
        'a-contract-query': { x: 700, y: 30 },
        'a-contract-impact': { x: 700, y: 270 },
      },
    };

    const currentPositions = positions[perspective];

    return Object.values(currentDetails).map((item) => {
      const isSelected = item.id === selectedNodeId;
      const isNeighbor = dependencySet.has(item.id) || dependencySet.has(item.name);

      return {
        id: item.id,
        type: 'perspectiveNode',
        position: currentPositions[item.id] || { x: 0, y: 0 },
        data: {
          id: item.id,
          label: item.name,
          typeBadge: item.typeBadge,
          primaryMetric: item.primaryMetric,
          isSelected,
          isNeighbor,
          onSelect: onSelectNode,
        },
      };
    });
  }, [perspective, currentDetails, selectedNodeId, dependencySet, onSelectNode]);

  // Construct Edges with precise handles to prevent crossing and guarantee clean flow
  const edges: Edge[] = useMemo(() => {
    const edgeDefinitions: Record<
      string,
      {
        id: string;
        source: string;
        target: string;
        label: string;
        sourceHandle?: string;
        targetHandle?: string;
      }[]
    > = {
      file: [
        { id: 'fe-1', source: 'f-server', target: 'f-hybrid', label: 'imports', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'fe-2', source: 'f-server', target: 'f-mcp', label: 'mounts', sourceHandle: 'source-bottom', targetHandle: 'target-top' },
        { id: 'fe-3', source: 'f-hybrid', target: 'f-call', label: 'walks', sourceHandle: 'source-bottom', targetHandle: 'target-top' },
        { id: 'fe-4', source: 'f-hybrid', target: 'f-file', label: 'reads', sourceHandle: 'source-bottom', targetHandle: 'target-top' },
        { id: 'fe-5', source: 'f-call', target: 'f-ast', label: 'queries', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'fe-6', source: 'f-file', target: 'f-parser', label: 'imports', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'fe-7', source: 'f-parser', target: 'f-ast', label: 'synthesizes', sourceHandle: 'source-bottom', targetHandle: 'target-top' },
      ],
      call: [
        { id: 'ce-1', source: 'c-entry', target: 'c-forest', label: 'calls', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ce-2', source: 'c-entry', target: 'c-matrix', label: 'calls', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ce-3', source: 'c-forest', target: 'c-parse', label: 'invokes', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ce-4', source: 'c-forest', target: 'c-symbols', label: 'extracts', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ce-5', source: 'c-symbols', target: 'c-scope', label: 'resolves', sourceHandle: 'source-bottom', targetHandle: 'target-top' },
        { id: 'ce-6', source: 'c-matrix', target: 'c-blast', label: 'computes', sourceHandle: 'source-right', targetHandle: 'target-left' },
      ],
      api: [
        { id: 'ae-1', source: 'a-ide', target: 'a-stream', label: 'initiates SSE', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ae-2', source: 'a-ide', target: 'a-mcp-call', label: 'executes tool', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ae-3', source: 'a-ci', target: 'a-diff', label: 'posts diff', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ae-4', source: 'a-stream', target: 'a-contract-query', label: 'validates', sourceHandle: 'source-right', targetHandle: 'target-left' },
        { id: 'ae-5', source: 'a-diff', target: 'a-contract-impact', label: 'serializes', sourceHandle: 'source-right', targetHandle: 'target-left' },
      ],
    };

    return edgeDefinitions[perspective].map((conn) => {
      const isConnected = conn.source === selectedNodeId || conn.target === selectedNodeId;
      const strokeColor = isConnected ? '#4B6B94' : '#D2CEC4';
      const strokeWidth = isConnected ? 2.5 : 1.5;
      const animated = isConnected && !shouldReduceMotion;

      return {
        id: conn.id,
        source: conn.source,
        target: conn.target,
        sourceHandle: conn.sourceHandle,
        targetHandle: conn.targetHandle,
        animated,
        label: conn.label,
        labelStyle: {
          fill: isConnected ? '#202124' : '#525866',
          fontSize: 10.5,
          fontFamily: 'monospace',
          fontWeight: isConnected ? 700 : 500,
        },
        labelBgStyle: {
          fill: isConnected ? '#FFFFFF' : '#FAF9F6',
          fillOpacity: 0.98,
          stroke: isConnected ? '#4B6B94' : '#E3E0D9',
          strokeWidth: isConnected ? 1.5 : 1,
          rx: 5,
        },
        labelBgPadding: [6, 3] as [number, number],
        style: {
          stroke: strokeColor,
          strokeWidth,
          transition: 'all 0.25s ease',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: strokeColor,
          width: 14,
          height: 14,
        },
      };
    });
  }, [perspective, selectedNodeId, shouldReduceMotion]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fitView({ padding: 0.12, duration: 350 });
    }, 80);
    return () => clearTimeout(timer);
  }, [perspective, fitView]);

  return (
    <div className={`relative w-full rounded-2xl bg-[#FAF9F6] border border-[#E3E0D9] overflow-hidden shadow-inner ${isExpanded ? 'h-full' : 'h-[470px] sm:h-[530px]'}`}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.35}
        maxZoom={1.6}
        panOnScroll={false}
        zoomOnPinch={true}
        panOnDrag={true}
        preventScrolling={false}
        aria-label={`Interactive ${perspective} graph visualization`}
      >
        <Background color="#D2CEC4" gap={22} size={1} />
      </ReactFlow>

      {/* Floating Canvas Controls */}
      <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm border border-[#E3E0D9] rounded-xl p-1.5 shadow-sm">
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
            if (perspective === 'file') onSelectNode('f-server');
            if (perspective === 'call') onSelectNode('c-entry');
            if (perspective === 'api') onSelectNode('a-ide');
            fitView({ padding: 0.12, duration: 400 });
          }}
          title="Reset graph view"
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

      {/* Legend */}
      <div className="absolute bottom-3.5 left-3.5 z-10 flex items-center gap-3.5 bg-white/95 backdrop-blur-sm border border-[#E3E0D9] rounded-xl px-3.5 py-1.5 text-[11px] font-mono text-[#525866] shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded border border-[#202124] bg-white ring-2 ring-[#7895B2]/60" />
          <span className="font-medium text-[#202124]">Selected Node</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-[2px] bg-[#4B6B94]" />
          <span>Directional Path</span>
        </div>
      </div>
    </div>
  );
};

export const AriaPerspectivesGraph: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PerspectiveType>('call');
  const [selectedNodeId, setSelectedNodeId] = useState<string>('c-entry');
  const [isExpandedModal, setIsExpandedModal] = useState<boolean>(false);
  const [mobileViewMode, setMobileViewMode] = useState<'canvas' | 'catalog'>('canvas');

  const currentDetails = useMemo(() => {
    switch (activeTab) {
      case 'file':
        return FILE_GRAPH_DETAILS;
      case 'call':
        return CALL_GRAPH_DETAILS;
      case 'api':
        return API_SURFACE_DETAILS;
    }
  }, [activeTab]);

  const activeNode = currentDetails[selectedNodeId] || Object.values(currentDetails)[0];

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

  const handleTabChange = (tab: PerspectiveType) => {
    setActiveTab(tab);
    if (tab === 'file') setSelectedNodeId('f-server');
    if (tab === 'call') setSelectedNodeId('c-entry');
    if (tab === 'api') setSelectedNodeId('a-ide');
  };

  const perspectiveInfo = {
    file: {
      title: 'File Graph Perspective',
      badge: 'TOPOLOGICAL COUPLING',
      focus: 'Physical files, module boundaries, explicit imports/exports, and commit churn hotspots.',
      metricLabel: 'Coupling Focus:',
      metricValue: 'Import Fan-in & Fan-out',
    },
    call: {
      title: 'Call Graph Perspective',
      badge: 'EXECUTION FLOW',
      focus: 'Functions, methods, caller-to-callee dependencies, recursive paths, and entrypoint routes.',
      metricLabel: 'Traversal Focus:',
      metricValue: 'Transitive Caller Chains',
    },
    api: {
      title: 'API Surface Perspective',
      badge: 'CONTRACTS & CONSUMERS',
      focus: 'Exposed REST endpoints, SSE streams, Model Context Protocol tools, and external consumers.',
      metricLabel: 'Protocol Focus:',
      metricValue: 'Pydantic & MCP Schemas',
    },
  }[activeTab];

  return (
    <div className="space-y-6">
      {/* Header & Perspective Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E3E0D9]">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#7895B2] font-semibold block mb-1">
            MULTI-PERSPECTIVE CODEBASE SYNTHESIS
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#202124]">
            {perspectiveInfo.title}
          </h3>
          <p className="text-xs text-[#737780] mt-1 max-w-xl">{perspectiveInfo.focus}</p>
        </div>

        {/* Perspective Toggle Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9] self-start sm:self-auto">
          <button
            type="button"
            onClick={() => handleTabChange('file')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124] ${
              activeTab === 'file'
                ? 'bg-[#202124] text-[#F5F3EE] shadow-sm'
                : 'text-[#525866] hover:text-[#202124] hover:bg-white'
            }`}
          >
            File Graph
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('call')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124] ${
              activeTab === 'call'
                ? 'bg-[#202124] text-[#F5F3EE] shadow-sm'
                : 'text-[#525866] hover:text-[#202124] hover:bg-white'
            }`}
          >
            Call Graph
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('api')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#202124] ${
              activeTab === 'api'
                ? 'bg-[#202124] text-[#F5F3EE] shadow-sm'
                : 'text-[#525866] hover:text-[#202124] hover:bg-white'
            }`}
          >
            API Surface
          </button>
        </div>
      </div>

      {/* Illustrative Demonstration Disclaimer Callout (Strictly Preserved) */}
      <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950 flex items-start gap-2.5 text-xs">
        <Info className="w-4 h-4 text-amber-800 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="font-semibold font-mono uppercase tracking-wider text-amber-900">
            Demonstration Architecture:{' '}
          </strong>
          This interactive model shows deterministic sample nodes and directional connections from ARIA's internal architecture to illustrate its tri-perspective indexing methodology. No live repository is connected in this session.
        </p>
      </div>

      {/* Mobile Mode Switcher (visible on small mobile screens <640px) */}
      <div className="flex sm:hidden items-center justify-between p-1.5 rounded-xl bg-[#FAF9F6] border border-[#E3E0D9]">
        <span className="text-[11px] font-mono font-semibold text-[#525866] pl-2">
          Perspective View:
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
            onClick={() => setMobileViewMode('catalog')}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
              mobileViewMode === 'catalog'
                ? 'bg-[#202124] text-[#F5F3EE]'
                : 'text-[#525866] hover:bg-white'
            }`}
          >
            Node Cards
          </button>
        </div>
      </div>

      {/* Main Graph Area */}
      {mobileViewMode === 'catalog' ? (
        // Mobile-friendly readable card list for small screens
        <div className="space-y-2.5 sm:hidden">
          {Object.values(currentDetails).map((item) => {
            const isSelected = item.id === selectedNodeId;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedNodeId(item.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedNodeId(item.id);
                  }
                }}
                className={`p-3.5 rounded-xl border transition-all text-left cursor-pointer ${
                  isSelected
                    ? 'border-[#202124] bg-white ring-2 ring-[#7895B2]/50 shadow-sm'
                    : 'border-[#E3E0D9] bg-[#FAF9F6] hover:bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9.5px] font-mono uppercase px-2 py-0.5 rounded bg-white border border-[#E3E0D9] text-[#525866] font-semibold">
                    {item.typeBadge}
                  </span>
                  {isSelected && (
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#4B6B94] font-bold">
                      Active
                    </span>
                  )}
                </div>
                <h4 className="font-mono text-xs font-bold text-[#202124] leading-snug">
                  {item.name}
                </h4>
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#525866] border-t border-[#E3E0D9]/70 pt-1.5">
                  <span>{item.primaryMetric}</span>
                  <span className="text-[#202124] font-medium">{item.secondaryMetric}</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Canvas */
        <ReactFlowProvider>
          <PerspectivesCanvas
            perspective={activeTab}
            selectedNodeId={selectedNodeId}
            onSelectNode={setSelectedNodeId}
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
                  EXPANDED PERSPECTIVE VIEW ({perspectiveInfo.badge})
                </span>
                <h3 className="text-base sm:text-lg font-serif font-semibold text-[#202124]">
                  {perspectiveInfo.title}
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
                <PerspectivesCanvas
                  perspective={activeTab}
                  selectedNodeId={selectedNodeId}
                  onSelectNode={setSelectedNodeId}
                  isExpanded={true}
                />
              </ReactFlowProvider>
            </div>
          </div>
        </div>
      )}

      {/* Node Inspector Bar */}
      {activeNode && (
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E3E0D9] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E3E0D9] gap-2">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#FAF9F6] border border-[#E3E0D9] text-[#4B6B94] font-bold">
                {activeNode.typeBadge}
              </span>
              <h4 className="font-mono text-sm sm:text-base font-bold text-[#202124]">{activeNode.name}</h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-[#525866]">
              <span>{activeNode.primaryMetric}</span>
              <span className="w-1 h-1 rounded-full bg-[#E3E0D9]" />
              <span className="text-[#202124] font-semibold">{activeNode.secondaryMetric}</span>
            </div>
          </div>

          <p className="text-sm text-[#202124] leading-relaxed font-sans">
            {activeNode.description}
          </p>

          {activeNode.dependencies.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-[11px] uppercase tracking-wider text-[#525866] font-bold">
                Direct Dependencies:
              </span>
              {activeNode.dependencies.map((dep) => (
                <span
                  key={dep}
                  className="px-2.5 py-1 rounded-md bg-[#FAF9F6] border border-[#E3E0D9] text-[#202124] text-[11px] font-medium"
                >
                  {dep}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
