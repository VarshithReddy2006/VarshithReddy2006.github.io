export interface ProjectPerspective {
  title: string;
  subtitle: string;
  description: string;
}

export interface ProjectFeature {
  title: string;
  description: string;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface TechnicalTradeoff {
  title: string;
  description: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectContributionPillars {
  problem: string;
  problemPoints?: string[];
  engineeringDecisions: string[];
  evidence: string[];
}

export interface WorkflowStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  badge?: string;
  connectedCapabilities?: string[];
}

export interface CapabilityClusterItem {
  title: string;
  description: string;
}

export interface CapabilityCluster {
  title: string;
  badge: string;
  items: CapabilityClusterItem[];
}

export interface KnownLimitation {
  title: string;
  description: string;
}

export interface ProjectDetailContent {
  problem: string;
  approach: string;
  contributionPillars?: ProjectContributionPillars;
  workflowTitle?: string;
  workflowSubtitle?: string;
  workflowStages?: WorkflowStage[];
  perspectives?: ProjectPerspective[];
  feedbackLoop?: string;
  keyFeatures: ProjectFeature[];
  capabilityClusters?: CapabilityCluster[];
  techStack: TechStackGroup[];
  challengesAndTradeoffs: TechnicalTradeoff[];
  statusNote?: string;
  limitations?: string;
  knownLimitations?: KnownLimitation[];
  metrics?: MetricItem[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  image: string;
  featured?: boolean;
  timeline?: string;
  links?: {
    github?: string;
    live?: string;
    details?: string;
    githubUnavailable?: boolean;
    githubStatusNote?: string;
  };
  highlights: string[];
  details?: ProjectDetailContent;
}

export interface SocialLink {
  name: string;
  platform: 'github' | 'linkedin' | 'leetcode' | 'codeforces';
  url: string;
  handle: string;
}

export interface Education {
  institution: string;
  degree: string;
  cgpa: string;
  duration: string;
  location: string;
}

export interface ExperienceLink {
  label: string;
  url: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  points: string[];
  category?: string;
  description?: string;
  contributionReferences?: string[];
  engineeringPractices?: string[];
  technologies?: string[];
  distinctionBadge?: string;
  link?: ExperienceLink;
}

export interface TechnicalSkills {
  languages: string[];
  frontend: string[];
  backend: string[];
  databases: string[];
  tools: string[];
  coreCS: string[];
}

export interface MilestoneLink {
  label: string;
  url: string;
}

export interface MilestoneMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface MilestoneItem {
  id: string;
  title: string;
  issuer: string;
  category: string;
  period?: string;
  duration?: string;
  credentialId?: string;
  distinctionBadge?: string;
  featured?: boolean;
  type: 'certification' | 'recognition' | 'learning' | 'algorithmic' | 'engineering';
  description: string;
  highlights?: string[];
  metrics?: MilestoneMetric[];
  tags?: string[];
  links?: MilestoneLink[];
  certificateImage?: string;
}

export interface SkillCategoryGroup {
  id: string;
  title: string;
  iconName: 'code' | 'layout' | 'server' | 'database' | 'brain' | 'terminal' | 'cpu' | 'workflow';
  skills: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  introduction: string;
  location: string;
  phone: string;
  status: string;
  portraitPath: string;
  aboutPortraitPath?: string;
  resumePath: string;
  email: string;
  socials: SocialLink[];
  education: Education;
  skills: TechnicalSkills;
  skillCategories: SkillCategoryGroup[];
  experience: ExperienceItem[];
  achievements: string[];
  recognitionItems?: MilestoneItem[];
  projects: Project[];
}

export const portfolioData: ProfileData = {
  name: "Shavva Varshith Reddy",
  role: "Computer Science Engineer and Developer",
  introduction: "I build AI systems, developer tools, and products that solve meaningful problems.",
  location: "Hyderabad, India",
  phone: "+91 9948255529",
  status: "Available for engineering roles & collaborations",
  portraitPath: "/images/varshith-portrait.webp",
  aboutPortraitPath: "/images/varshith-about.jpg",
  resumePath: "/resume.pdf",
  email: "shavvavarshithreddy@gmail.com",
  socials: [
    {
      name: "GitHub",
      platform: "github",
      url: "https://github.com/VarshithReddy2006",
      handle: "@VarshithReddy2006",
    },
    {
      name: "LinkedIn",
      platform: "linkedin",
      url: "https://linkedin.com/in/shavva-varshith-reddy-401b59366",
      handle: "in/shavva-varshith-reddy",
    },
    {
      name: "LeetCode",
      platform: "leetcode",
      url: "https://leetcode.com/u/Varshithreddy8044/",
      handle: "Varshithreddy8044",
    },
    {
      name: "Codeforces",
      platform: "codeforces",
      url: "https://codeforces.com/profile/varshithreddy6147",
      handle: "varshithreddy6147",
    },
  ],
  education: {
    institution: "CVR College of Engineering",
    degree: "Bachelor of Technology (B.Tech), Computer Science & Engineering",
    cgpa: "8.49 / 10",
    duration: "Jul 2024 – Present",
    location: "Hyderabad, India",
  },
  skills: {
    languages: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
    frontend: ["React", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
    backend: ["Node.js", "Express.js", "FastAPI", "REST APIs"],
    databases: ["MongoDB", "Redis", "SQLite"],
    tools: ["Docker", "Git", "GitHub Actions", "CI/CD", "scikit-learn"],
    coreCS: ["Data Structures & Algorithms", "OOP", "System Design", "Database Design", "Database Optimization", "Operating Systems"],
  },
  skillCategories: [
    {
      id: "programming-languages",
      title: "Programming Languages",
      iconName: "code",
      skills: ["Java", "Python", "JavaScript", "TypeScript", "SQL"],
    },
    {
      id: "frontend-development",
      title: "Frontend Development",
      iconName: "layout",
      skills: ["HTML5", "CSS3", "React", "Tailwind CSS", "Bootstrap"],
    },
    {
      id: "backend-development-apis",
      title: "Backend Development & APIs",
      iconName: "server",
      skills: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "Server-Sent Events (SSE)"],
    },
    {
      id: "databases-storage",
      title: "Databases & Storage",
      iconName: "database",
      skills: ["MongoDB", "SQLite", "Redis"],
    },
    {
      id: "ai-ml-applications",
      title: "AI, Machine Learning & LLM Applications",
      iconName: "brain",
      skills: [
        "Machine Learning",
        "scikit-learn",
        "RAG",
        "LLM Applications",
        "AI Agents",
        "Embeddings and Semantic Search",
        "Hybrid Retrieval",
      ],
    },
    {
      id: "developer-tools-infra",
      title: "Developer Tools & Infrastructure",
      iconName: "terminal",
      skills: ["Git", "GitHub", "GitHub Actions", "Docker", "CI/CD", "VS Code", "Vite"],
    },
    {
      id: "cs-fundamentals",
      title: "Computer Science Fundamentals",
      iconName: "cpu",
      skills: [
        "Data Structures & Algorithms",
        "Object-Oriented Programming (OOP)",
        "Database Design",
        "Database Optimization",
        "Operating Systems",
        "System Design",
      ],
    },
  ],
  experience: [
    {
      role: "Open-Source Contributor",
      organization: "OpenMRS (Healthcare Platform)",
      category: "OPEN SOURCE · HEALTHCARE SOFTWARE",
      period: "Mar 2026 – Apr 2026",
      description:
        "Contributed to an established open-source healthcare platform, working with existing code, database migration workflows, and collaborative engineering practices.",
      contributionReferences: ["TRUNK-6276", "TRUNK-6589", "TRUNK-6593"],
      engineeringPractices: [
        "Navigated and analyzed an established enterprise Java medical records codebase with strict architectural layering and repository conventions.",
        "Refactored archiveVoidedObs to utilize bulk SQL operations (INSERT...SELECT, DELETE), eliminating N+1 queries and improving batch archiving throughput.",
        "Implemented idempotent, retry-safe database operations with NOT EXISTS guards and safe deletion logic to prevent duplicate processing during partial failures.",
        "Updated database schema migration scripts and changesets aligning with Liquibase versioning workflows.",
        "Participated in collaborative open-source workflows: issue triage, code review iterations, and automated regression testing with JUnit.",
      ],
      points: [
        "Contributed production-ready Java backend code to OpenMRS Core, improving database performance, reliability, and data consistency.",
        "Refactored archiveVoidedObs to use bulk SQL operations (INSERT...SELECT, DELETE), eliminating N+1 queries and improving batch archiving performance.",
        "Implemented idempotent, retry-safe archiving with NOT EXISTS guards and safe deletion logic, preventing duplicate processing and recovering cleanly from partial failures.",
        "Addressed contribution tickets TRUNK-6276, TRUNK-6589, and TRUNK-6593 following community code review workflows and Liquibase migrations.",
      ],
      technologies: ["Java", "SQL", "Liquibase", "JUnit", "Git", "Healthcare Systems"],
      link: {
        label: "openmrs.org",
        url: "https://openmrs.org",
      },
    },
    {
      role: "Open-Source Contributor & Mentee",
      organization: "GirlScript Summer of Code 2026",
      category: "OPEN SOURCE · DEVELOPER COMMUNITY",
      period: "2026",
      distinctionBadge: "RANKED #434 GLOBALLY",
      description:
        "Participated in GirlScript Summer of Code 2026 (Ranked #434 Globally with 10,044 points), contributing 31 merged pull requests across 8 open-source repositories in the Open Source Track and AI/Agents Track.",
      engineeringPractices: [
        "Engaged in global open-source community collaboration across multi-maintainer GitHub codebases.",
        "Worked across the Open Source Track and AI/Agents Track, building hands-on familiarity with autonomous agent patterns and developer tooling.",
        "Practiced professional Git workflows: issue analysis, feature branching, pull-request documentation, and reviewer feedback integration.",
        "Ranked #434 globally with a leaderboard score of 10,044, merging 31 pull requests across 8 open-source repositories.",
      ],
      points: [
        "Contributed to open-source codebases across the Open Source Track and AI/Agents Track, collaborating with global maintainers.",
        "Engaged in issue triage, pull-request review cycles, and feature implementations following repository conventions.",
        "Earned 13 badges for active community contributions and consistent code deliverables across participating projects.",
      ],
      technologies: ["Git", "GitHub Actions", "Python", "Agentic AI", "Open-Source Workflows"],
      link: {
        label: "Official GSSoC Profile",
        url: "https://gssoc.girlscript.org/profile/467d6693-3d6a-4405-b7de-594f4a6f5552",
      },
    },
  ],
  achievements: [
    "Top 8.46% globally on LeetCode (contest rating 1,798); solved 400+ Data Structures & Algorithms problems.",
    "Ranked #434 Globally — GSSoC 2026 (Score: 10,044, 31 merged PRs) | Production Contributor, OpenMRS Core.",
    "Oracle Certified Foundations Associate – Agentic AI, Oracle University, Aug 2026.",
    "AI & ML with Python — 12-Week Summer Internship & Training, EduVitae Services, Jul 2026.",
  ],
  recognitionItems: [
    {
      id: "oracle-agentic-ai",
      title: "Oracle Certified Foundations Associate — Agentic AI",
      issuer: "Oracle University",
      category: "CERTIFICATION · ARTIFICIAL INTELLIGENCE",
      period: "August 06, 2026",
      credentialId: "330390827AAI26OFA",
      distinctionBadge: "VERIFIED CREDENTIAL",
      featured: true,
      type: "certification",
      certificateImage: "/images/certificates/oracle-agentic-ai-certificate.png",
      description:
        "Foundational industry certification validating core technical competencies in agentic AI architectures, LLM orchestration, dynamic tool calling, autonomous agent decision boundaries, and retrieval-augmented reasoning patterns.",
      highlights: [
        "Autonomous agent workflows, multi-step reasoning loops, and prompt-driven execution pipelines",
        "Tool integration, parameter validation, and dynamic schema invocation for AI agents",
        "Context window optimization, token budgeting, and hallucination mitigation techniques",
        "Certificate of Recognition awarded to Varshith Reddy on August 06, 2026 (ID: 330390827AAI26OFA)",
      ],
      tags: ["Autonomous Agents", "LLM Tool Calling", "Agentic AI", "Oracle University", "330390827AAI26OFA"],
    },
    {
      id: "ai-ml-python-internship",
      title: "AI & ML with Python — 12-Week Summer Internship",
      issuer: "EduVitae Services",
      category: "INTERNSHIP · ARTIFICIAL INTELLIGENCE",
      period: "25 July 2026",
      duration: "12 Weeks",
      credentialId: "EVS/S26-27/691",
      distinctionBadge: "INTERNSHIP COMPLETION",
      type: "learning",
      certificateImage: "/images/certificates/ai-ml-python-internship.jpg",
      description:
        "Twelve-week Summer Internship & Training Program in AI & ML with Python organized by EduVitae Services. Recognitions displayed on the certificate include #startupindia and Ministry of MSME logos, along with IIT Hyderabad branding.",
      highlights: [
        "Completed 12-week intensive training program covering Python programming and applied machine learning foundations",
        "Official Certificate of Completion awarded to Shavva Varshith Reddy under Certificate No. EVS/S26-27/691",
        "Certificate features recognition from #startupindia and the Ministry of MSME, alongside IIT Hyderabad programme branding",
      ],
      tags: ["AI & ML", "Python", "EduVitae Services", "MSME Recognized", "EVS/S26-27/691"],
    },
    {
      id: "gssoc-2026",
      title: "GirlScript Summer of Code 2026",
      issuer: "GirlScript Foundation",
      category: "OPEN SOURCE · RECOGNITION",
      period: "2026",
      distinctionBadge: "RANKED #434 GLOBALLY",
      type: "recognition",
      certificateImage: "/images/certificates/gssoc-2026-certificate.png",
      description:
        "Ranked #434 Globally in GirlScript Summer of Code 2026 with a leaderboard score of 10,044, completing 31 merged pull requests across 8 open-source repositories and earning 13 badges.",
      metrics: [
        { label: "Global Rank", value: "#434", detail: "GSSoC Leaderboard" },
        { label: "Score", value: "10,044", detail: "13 badges earned" },
        { label: "Merged PRs", value: "31", detail: "Across 8 repositories" },
      ],
      highlights: [
        "Ranked #434 globally on the GSSoC 2026 leaderboard with 10,044 points",
        "31 pull requests merged across 8 open-source repositories with 13 badges earned",
        "Active contributions across the Open Source Track and AI/Agents Track with strict CI/CD workflows",
        "Official Certificate of Participation presented to Shavva Varshith Reddy by GirlScript Foundation",
      ],
      tags: ["Open Source", "Rank #434", "31 Merged PRs", "GSSoC 2026"],
      links: [
        {
          label: "Official GSSoC Profile",
          url: "https://gssoc.girlscript.org/profile/467d6693-3d6a-4405-b7de-594f4a6f5552",
        },
      ],
    },
    {
      id: "competitive-programming",
      title: "Competitive Programming & Problem Solving",
      issuer: "LeetCode & Codeforces",
      category: "PRACTICE MILESTONE · DSA",
      distinctionBadge: "TOP 8.46% GLOBALLY",
      type: "algorithmic",
      description:
        "Consistent algorithmic problem-solving practice focused on data structures, graph algorithms, dynamic programming, and system optimization.",
      metrics: [
        { label: "Problems Solved", value: "400+", detail: "LeetCode algorithmic challenges" },
        { label: "Contest Rating", value: "1,798", detail: "Top 8.46% globally on LeetCode" },
        { label: "Codeforces", value: "Active", detail: "Regular problem-solving rounds" },
      ],
      highlights: [
        "Solved 400+ problems spanning dynamic programming, graphs, trees, arrays, and binary search",
        "Contest rating of 1,798 on LeetCode, placing in the top 8.46% of global contest participants",
        "Ongoing competitive problem solving and algorithmic analysis on Codeforces",
      ],
      tags: ["Data Structures", "Algorithms", "LeetCode", "Codeforces"],
      links: [
        {
          label: "LeetCode Profile",
          url: "https://leetcode.com/u/Varshithreddy8044/",
        },
        {
          label: "Codeforces Profile",
          url: "https://codeforces.com/profile/varshithreddy6147",
        },
      ],
    },
    {
      id: "openmrs-milestone",
      title: "Production Open-Source Engineering",
      issuer: "OpenMRS Community",
      category: "ENGINEERING MILESTONE · HEALTHCARE",
      period: "Mar 2026 – Apr 2026",
      distinctionBadge: "PRODUCTION CONTRIBUTOR",
      type: "engineering",
      description:
        "Engineered production backend improvements for an established global healthcare records platform, addressing database bottlenecks and migration workflows.",
      highlights: [
        "Refactored archiveVoidedObs with bulk SQL operations (INSERT...SELECT, DELETE) eliminating N+1 queries",
        "Engineered idempotent archiving with NOT EXISTS safety guards and safe deletion logic",
        "Addressed contribution tickets TRUNK-6276, TRUNK-6589, and TRUNK-6593 with Liquibase migrations",
      ],
      tags: ["Java", "SQL", "Liquibase", "OpenMRS Core", "TRUNK-6276"],
      links: [
        {
          label: "openmrs.org",
          url: "https://openmrs.org",
        },
      ],
    },
  ],
  projects: [
    {
      id: "aria",
      number: "01",
      title: "ARIA — Repository Intelligence Agent",
      subtitle: "Autonomous Repository Intelligence & Codebase Understanding",
      description:
        "An autonomous repository intelligence platform that parses source code into structural ASTs, builds symbol indexes and semantic call graphs, and serves hybrid contextual retrieval for automated codebase reasoning and change impact analysis.",
      category: "AI & Developer Tools",
      tags: ["FastAPI", "Python", "Tree-sitter", "ChromaDB", "Qdrant", "React", "TypeScript", "Docker"],
      image: "/images/projects/aria-preview.webp",
      featured: true,
      timeline: "Jun 2026 – Sep 2026",
      links: {
        github: "https://github.com/VarshithReddy2006/ARIA",
      },
      highlights: [
        "Tree-sitter AST parsing, symbol indexing & cross-file semantic call graphs",
        "Change impact analysis and PR risk scoring over FastAPI with SSE streaming",
        "Comprehensive automated test suite covering AST parsing, graph traversal, and streaming endpoints",
      ],
      details: {
        problem:
          "Traditional code search and generic RAG treat source code as arbitrary text chunks. Flattening hierarchical code into disconnected text windows breaks structural relationships: call hierarchies are lost, type signatures are detached from implementations, and cross-file dependencies become invisible. When an LLM is queried about architectural implications or pull-request risk, text-only retrieval returns syntactic keyword matches rather than semantically relevant structural call chains, leading to hallucinated dependencies and shallow code reviews.",
        approach:
          "ARIA replaces flat text indexing with a Repository Intelligence Architecture. Codebases are parsed into language-accurate Abstract Syntax Trees (ASTs) using Tree-sitter. From these ASTs, ARIA generates three structural perspectives: the File Graph (organization & imports), the Call Graph (runtime execution & call paths), and the API Surface (exposed contracts & consumers). These graph perspectives are blended with dense vector embeddings into a hybrid retrieval engine served over a high-performance FastAPI backend with SSE streaming and Model Context Protocol (MCP) support.",
        perspectives: [
          {
            title: "File Graph",
            subtitle: "Organization & Coupling",
            description:
              "Maps physical file hierarchy, module boundaries, explicit imports/exports, and Git churn correlations to identify high-coupling architectural hotspots.",
          },
          {
            title: "Call Graph",
            subtitle: "Execution & Flow",
            description:
              "Traces caller-to-callee relationships, recursive invocations, and control-flow entrypoints across classes, methods, and functions.",
          },
          {
            title: "API Surface",
            subtitle: "Contracts & Boundaries",
            description:
              "Extracts exposed REST/GraphQL endpoints, public interfaces, parameter types, and downstream modules that depend on those contracts.",
          },
        ],
        keyFeatures: [
          {
            title: "Tree-sitter AST Parsing & Symbol Indexing",
            description:
              "Incrementally parses multi-language source code into syntax trees, extracting classes, functions, interfaces, and signatures with line-accurate coordinate offsets.",
          },
          {
            title: "Change Impact Analysis & PR Risk Assessment",
            description:
              "Traverses dependency graphs from modified diffs to quantify blast radius, identify downstream breaking changes, and calculate an evidence-grounded risk score.",
          },
          {
            title: "Hybrid Semantic Retrieval with Structural Context",
            description:
              "Combines dense semantic vector search with graph-walk expansions, ensuring context windows contain both semantic relevance and prerequisite call chains.",
          },
          {
            title: "Evidence-Grounded Repository Chat",
            description:
              "Streams conversational answers with direct file paths, line numbers, and symbol citations verified against the parsed repository state.",
          },
          {
            title: "Git Churn & Coupling Analysis",
            description:
              "Correlates historical commit frequency with topological graph metrics to pinpoint volatile files and fragile architectural seams.",
          },
          {
            title: "Incremental Analysis & Parse Tree Caching",
            description:
              "Caches symbol hashes and AST nodes, only re-analyzing modified files on subsequent commits for sub-second developer feedback.",
          },
          {
            title: "HTTP-based Model Context Protocol (MCP) Integration",
            description:
              "Implements a standard Model Context Protocol server endpoint, allowing IDE assistants and external AI agents to query ARIA's graph and symbols directly.",
          },
        ],
        techStack: [
          {
            category: "Core & Parsing",
            items: ["Python", "Tree-sitter (Multi-language ASTs)", "NetworkX In-Memory Graphs"],
          },
          {
            category: "Vector & Search",
            items: ["ChromaDB", "Qdrant", "Hybrid Semantic + BM25 Retrieval"],
          },
          {
            category: "API & Protocol",
            items: ["FastAPI", "Server-Sent Events (SSE)", "Model Context Protocol (MCP)", "Pydantic"],
          },
          {
            category: "Frontend & Platform",
            items: ["React", "TypeScript", "Tailwind CSS", "Docker Containerization"],
          },
          {
            category: "Quality & Testing",
            items: ["Pytest", "Automated Test Suite", "GitHub Actions CI/CD"],
          },
        ],
        contributionPillars: {
          problem:
            "Flat-text RAG algorithms destroy code semantics by chopping source files into arbitrary windows. This severs caller-to-callee hierarchies, detaches types from implementations, and renders cross-file dependency paths invisible, causing AI assistants to hallucinate dependencies and give brittle PR risk reviews.",
          engineeringDecisions: [
            "Employed Tree-sitter for multi-language, incremental AST generation with coordinate-accurate node offset indexing.",
            "Synthesized codebases into three linked structural models: File Graph (coupling), Call Graph (execution flow), and API Surface (contracts).",
            "Coupled dense semantic vector search with graph-walk expansion to supply LLMs with complete transitive structural context.",
            "Standardized external tool interoperability by exposing an HTTP-based Model Context Protocol (MCP) server.",
          ],
          evidence: [
            "Automated unit and integration test coverage across AST parsing, graph traversal, and streaming endpoints.",
            "Incremental re-indexing design targeted for sub-second to low-latency diff processing during active development.",
            "Resilient multi-provider LLM failover without dropping active Server-Sent Events (SSE) streaming connections.",
            "Open-source repository with full source code available on GitHub.",
          ],
        },
        workflowTitle: "End-to-End Repository Intelligence Architecture",
        workflowSubtitle: "From raw source trees to structural graphs, hybrid retrieval, and evidence-grounded insights",
        workflowStages: [
          {
            step: "01",
            title: "Repository Traversal & Ingestion",
            subtitle: "Source Discovery & Git Metadata",
            description: "Discovers source trees, respects .gitignore rules, identifies language targets, and extracts Git commit churn frequency.",
            badge: "Ingestion",
          },
          {
            step: "02",
            title: "Language-Aware AST Parsing",
            subtitle: "Tree-sitter Syntax Synthesis",
            description: "Parses source code into multi-language Abstract Syntax Trees with character-level node coordinates, capturing classes, methods, and types.",
            badge: "Parsing",
          },
          {
            step: "03",
            title: "Symbol Indexing & Scope Tables",
            subtitle: "Global Identifier Resolution",
            description: "Builds a fast symbol index resolving identifier declarations, import bindings, parameter signatures, and lexical scopes across files.",
            badge: "Indexing",
          },
          {
            step: "04",
            title: "Tri-Perspective Graph Synthesis",
            subtitle: "File Graph · Call Graph · API Surface",
            description: "Constructs linked graphs: File Graph (module dependencies), Call Graph (caller-to-callee paths), and API Surface (exposed contracts).",
            badge: "Graph Engine",
            connectedCapabilities: ["Change Impact Analysis", "PR Risk Assessment"],
          },
          {
            step: "05",
            title: "Hybrid Dense & Lexical Retrieval",
            subtitle: "Vector Embeddings + BM25 Search",
            description: "Blends dense semantic vector search (ChromaDB / Qdrant) with BM25 keywords and graph-walk expansions for comprehensive context.",
            badge: "Retrieval",
          },
          {
            step: "06",
            title: "Context-Grounded Analysis",
            subtitle: "Hallucination-Resistant Synthesis",
            description: "Feeds structured AST context and verified call paths into the LLM, grounding all reasoning in actual repository code relationships.",
            badge: "Analysis",
          },
          {
            step: "07",
            title: "Developer Insights & MCP Delivery",
            subtitle: "Chat, Impact Reports & MCP Protocol",
            description: "Streams evidence-backed repository chat, PR risk scoring, and change impact blast radius via SSE and HTTP-based MCP endpoints.",
            badge: "Delivery",
          },
        ],
        challengesAndTradeoffs: [
          {
            title: "AST Depth vs. Parsing Latency",
            description:
              "Full ASTs generate millions of syntax nodes on enterprise codebases. ARIA uses selective symbol extraction, pruning leaf-level expressions while indexing structural definitions.",
          },
          {
            title: "Multi-Provider LLM Failover",
            description:
              "Engineered transparent failover across model providers (Anthropic, OpenAI, local models) with fallback tokenizers without dropping active SSE streaming connections.",
          },
          {
            title: "Bounded Graph Walks",
            description:
              "Transitive call graph traversal can lead to exponential explosion in complex codebases. Implemented bounded BFS/DFS traversals with depth limits and cycle detection.",
          },
        ],
        metrics: [
          {
            label: "Quality & Testing",
            value: "Pytest",
            detail: "Automated test coverage across AST parsing, graph indexing, and API routes",
          },
          {
            label: "Diff Processing",
            value: "Incremental",
            detail: "Targeted sub-second re-indexing for active development diffs",
          },
          {
            label: "Model Protocol",
            value: "MCP HTTP",
            detail: "Standardized IDE & agent interoperability",
          },
        ],
      },
    },
    {
      id: "stratify",
      number: "02",
      title: "Stratify — AI-Powered Trade Intelligence Operating System",
      subtitle: "Automated Customs Compliance, Document Reconciliation & Trade Governance",
      description:
        "An enterprise AI operating system built for cross-border shipping logistics, automated customs verification, Harmonized System tariff classification, and auditable decision governance.",
      category: "Software Architecture & Tooling",
      tags: ["TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "OCR & Vision", "React", "Docker"],
      image: "/images/projects/stratify-preview.png",
      timeline: "2026",
      links: {
        github: "https://github.com/VarshithReddy2006/Stratify",
      },
      highlights: [
        "Probabilistic OCR & vision parsing paired with deterministic regulatory & tariff calculation engines",
        "Spatial coordinate bounding-box tracking on extracted invoice & shipping bill line items",
        "Cross-document reconciliation matrix & cryptographic SHA-256 hash-chained decision ledger",
      ],
      details: {
        problem:
          "Global trade operations rely on millions of heterogeneous, physical, and semi-structured documents (Commercial Invoices, Bills of Lading, Packing Lists, Certificates of Origin). Discrepancies between paperwork—such as mismatched line-item quantities, conflicting Incoterms, or inaccurate Harmonized System (HS) tariff codes—cause costly customs delays, severe port demurrage, and regulatory penalties. Traditional OCR tools lack semantic domain context, while pure generative LLMs hallucinate calculations and cannot be trusted for financial and regulatory compliance.",
        approach:
          "Stratify implements a dual-layer architectural pipeline that strictly decouples probabilistic extraction from deterministic compliance. First, layout-aware OCR and vision models parse multi-format paperwork into structured JSON entities, scoring each token with an explicit confidence score. Second, deterministic, rule-based verification services reconcile line items across corresponding documents, verify Incoterms against ICC rules, and compute exact customs duties using official tariff tables. Every automated finding links to spatial bounding-box coordinates on the source paperwork, with low-confidence extractions routed to a human-in-the-loop review queue before committing to a cryptographic SHA-256 hash-chained decision ledger.",
        keyFeatures: [
          {
            title: "Layout-Aware OCR & Structured Document Extraction",
            description:
              "Extracts structured data from multi-page shipping manifests, bills of lading, and complex tabular commercial invoices with spatial coordinate tracking.",
          },
          {
            title: "Cross-Document Reconciliation Engine",
            description:
              "Cross-references line-item quantities, packaging units, and totals across packing lists, invoices, and shipping bills with explicit commercial vs physical unit validation.",
          },
          {
            title: "HS Tariff Classification & Duty Estimation",
            description:
              "Recommends Harmonized System codes based on commodity characteristics, evaluating ad valorem and compound duties via deterministic tariff rulepacks.",
          },
          {
            title: "Incoterm Verification & Compliance Risk Scoring",
            description:
              "Validates declared commercial Incoterms (FOB, CIF, DDP, EXW) against insurance and freight liability terms to surface regulatory non-compliance risks.",
          },
          {
            title: "Centralised Multi-Provider AI Gateway",
            description:
              "Routes document intelligence queries across OpenAI, Anthropic, Gemini, DeepSeek, and local Ollama models with token budgeting, PII scrubbing, and failover.",
          },
          {
            title: "Trade Entity Knowledge Graphs",
            description:
              "Maintains structural relationships between shippers, consignees, freight forwarders, and commodity HS codes paired with pgvector hybrid search.",
          },
          {
            title: "Stateful Asynchronous Document Workflows",
            description:
              "Orchestrates multi-stage extraction, reconciliation, and validation pipelines asynchronously using Celery task workers backed by Redis priority queues.",
          },
          {
            title: "Multi-Tenant Security & Audit Traceability",
            description:
              "Enforces 5-tier role-based access control (RBAC), tenant-scoped database queries, and an insert-only SHA-256 hash-chained decision ledger.",
          },
        ],
        techStack: [
          {
            category: "AI & Document Vision",
            items: ["PaddleOCR / Layout-Aware OCR", "Multi-Provider AI Gateway (OpenAI, Claude, Gemini, Ollama)", "PII Scrubbing", "Redis Semantic Cache"],
          },
          {
            category: "Backend & Systems",
            items: ["Python 3.12", "FastAPI (REST & SSE)", "Celery Distributed Workers", "Pydantic V2", "SQLAlchemy ORM"],
          },
          {
            category: "Data & Storage",
            items: ["PostgreSQL 16", "pgvector (HNSW Indexes)", "Redis (Broker & Semantic Cache)", "Local / S3 Storage"],
          },
          {
            category: "Frontend & UI",
            items: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Interactive Bounding-Box Viewer"],
          },
          {
            category: "Security & Governance",
            items: ["5-Tier RBAC", "Organization-Level Query Scoping", "SHA-256 Hash Chained Ledger", "Human Review Queues"],
          },
        ],
        contributionPillars: {
          problem:
            "Global shipping operations rely on heterogeneous paperwork (Invoices, Bills of Lading, Packing Lists) where discrepancies cause severe customs delays and port demurrage. While LLMs extract unstructured text, unconstrained generative models hallucinate arithmetic and cannot be trusted for deterministic tariff classification or duty calculation.",
          problemPoints: [
            "Heterogeneous Paperwork Noise: Degraded scans, faxes, and non-standard layouts break rigid rule-based parsing scripts.",
            "Generative Arithmetic Hallucination: Unconstrained LLMs cannot be trusted with deterministic duty rates, tax schedules, or landed costs.",
            "Cross-Document Discrepancies: Packaging counts, item weights, and commercial quantities diverge across paperwork without reconciliation.",
            "Audit Trail Opacity: Black-box AI proposals lack verifiable spatial coordinate citations back to source document bounding boxes.",
          ],
          engineeringDecisions: [
            "Decoupled OCR & Logic: Decoupled probabilistic OCR/vision entity extraction from deterministic compliance and financial calculations.",
            "Spatial Coordinate Tracking: Implemented bounding-box coordinates ([x, y, w, h]) for every extracted field to maintain end-to-end auditability.",
            "Automated Reconciliation Matrix: Cross-verifies commercial quantities against physical package counts across diverse trade documents.",
            "Cryptographic Decision Ledger: Built an insert-only ledger backed by SHA-256 hash chaining separating AI proposals from operator approvals.",
          ],
          evidence: [
            "Zero Arithmetic Hallucination: Pure rule-based mathematical calculation engine eliminating generative arithmetic hallucination in tariff duties.",
            "Pixel-Level Document Citations: Direct pixel-level bounding-box citations on all extracted invoice and shipping bill line items.",
            "Scoped 5-Tier RBAC: Organization-level scoping enforced at the database query layer with full multi-tenancy isolation.",
            "Automated Test Coverage: Verified backend architecture with 270 automated test suites across API, domain, and worker layers.",
          ],
        },
        workflowTitle: "Document Extraction & Compliance Verification Pipeline",
        workflowSubtitle: "Decoupling probabilistic vision extraction from deterministic regulatory validation",
        workflowStages: [
          {
            step: "01",
            title: "Document Ingestion & Image Normalization",
            subtitle: "Deskewing, Binarization & DPI Enhancement",
            description: "Ingests scanned PDFs and noisy faxes, executing contrast normalization and orientation correction before processing.",
            badge: "Ingestion",
          },
          {
            step: "02",
            title: "Layout-Aware Vision Extraction",
            subtitle: "Spatial Bounding-Box OCR",
            description: "Extracts key-value pairs and tabular line items, mapping each token to exact pixel coordinates on the source document.",
            badge: "OCR & Vision",
          },
          {
            step: "03",
            title: "Statistical Confidence Scoring",
            subtitle: "Token-Level Uncertainty Filtering",
            description: "Scores extraction certainty across critical fields (HS codes, unit prices, weights), routing low-confidence reads to human reviewers.",
            badge: "Scoring",
          },
          {
            step: "04",
            title: "Cross-Document Reconciliation",
            subtitle: "Multi-Document Consistency Matrix",
            description: "Cross-verifies line-item counts and weights between Invoices, Packing Lists, and Bills of Lading to catch packaging discrepancies.",
            badge: "Reconciliation",
            connectedCapabilities: ["Tariff Classification", "Incoterm Liability Verification"],
          },
          {
            step: "05",
            title: "Deterministic Tariff & Duty Engine",
            subtitle: "Rule-Based Regulatory Computation",
            description: "Executes verified mathematical calculations using official HS tariff schedules and trade agreements without generative hallucinations.",
            badge: "Compliance",
          },
          {
            step: "06",
            title: "Human-in-the-Loop Governance",
            subtitle: "Discrepancy Triage & Visual Validation",
            description: "Provides compliance officers with visual side-by-side verification with highlighted bounding boxes on original documents.",
            badge: "Review",
          },
          {
            step: "07",
            title: "Audit Logging & Customs Export",
            subtitle: "Cryptographic Audit Trail",
            description: "Generates export-ready customs filings with immutable verification records and complete decision histories.",
            badge: "Export",
          },
        ],
        challengesAndTradeoffs: [
          {
            title: "Probabilistic AI vs. Deterministic Compliance",
            description:
              "LLMs are strictly barred from performing math or final duty calculations. Language models extract text entities with statistical confidence scores, while pure Python algorithms execute mathematical verification, ICC Incoterm rules, and official HS tariff calculations.",
          },
          {
            title: "Noisy Physical Scans & Document Skew",
            description:
              "Engineered multi-stage image pre-processing (deskewing, binarization, DPI normalization) and spatial layout bounding-box extraction to handle degraded faxes, non-standard tabular invoices, and multi-page shipping bills.",
          },
          {
            title: "Auditable Decision Ledger vs. Opaque Automation",
            description:
              "Strictly enforced an architectural invariant (AI_PROPOSAL != FINAL_DECISION). AI generates structured proposals linked to source coordinates; human operators review flagged discrepancies, and confirmed actions are recorded in an insert-only, SHA-256 hash-chained audit ledger.",
          },
        ],
        metrics: [
          {
            label: "Validation Engine",
            value: "100% Deterministic",
            detail: "Rule-based tariff math & regulatory checks without LLM arithmetic",
          },
          {
            label: "Audit Provenance",
            value: "Bounding Box",
            detail: "Direct spatial pixel coordinates for every extracted field",
          },
          {
            label: "Decision Governance",
            value: "Human-in-Loop",
            detail: "Automated discrepancy triage queues with SHA-256 hash chaining",
          },
          {
            label: "Test Verification",
            value: "270 Test Suites",
            detail: "Comprehensive backend unit, integration, and contract tests",
          },
        ],
      },
    },
    {
      id: "devtrack",
      number: "03",
      title: "DevTrack — Developer Productivity & Career Readiness OS",
      subtitle: "Unified Developer Workspace, DSA Analytics & Career Intelligence",
      description:
        "A unified workspace for tracking coding progress, managing projects, analysing resumes, identifying skill gaps, and turning career goals into actionable daily missions.",
      category: "Developer Productivity & Career Intelligence",
      tags: ["React 19", "TypeScript", "Express 5", "MongoDB", "Redis", "BullMQ", "Zustand", "Docker", "SSE"],
      image: "/images/projects/devtrack-preview.webp",
      timeline: "2026",
      links: {
        github: "https://github.com/VarshithReddy2006/DevTrack",
      },
      highlights: [
        "Feedback-driven learning loop: Roadmap → Focus → Evolution → Roadmap",
        "Consolidated DSA tracking across LeetCode, Codeforces, and CodeChef",
        "Resume intelligence with ATS scoring, evidence claim linkage, and skill-gap analysis",
      ],
      details: {
        statusNote: "Private Beta Candidate — Undergoing active validation with modular domain services and roadmap iteration.",
        problem:
          "Developer progress is often fragmented across coding platforms, GitHub repositories, project trackers, resumes, and learning plans. This makes it difficult to connect completed work with career goals and identify what to improve next.",
        approach:
          "DevTrack couples a React 19 and TypeScript frontend with an Express 5 backend, MongoDB for application data, and Redis with BullMQ for asynchronous background jobs. It establishes a closed-loop system: Roadmap intelligence identifies skill gaps, Focus mode converts priorities into daily missions and timed work sessions, Evolution logs progress metrics, and the roadmap recalculates dynamically.",
        feedbackLoop: "Roadmap → Focus → Evolution → Roadmap",
        keyFeatures: [
          {
            title: "Unified DSA Workspace & Problem Analytics",
            description:
              "Consolidates problem counts, topic tags, difficulty distributions, and contest rating trajectories from LeetCode, Codeforces, and CodeChef into unified visual graphs.",
          },
          {
            title: "Activity Ingestion Workers (with Documented Boundaries)",
            description:
              "Resilient background workers ingest platform statistics while respecting API rate limits, rate throttling, and scraping resilience.",
          },
          {
            title: "Engineering Project & Task Management",
            description:
              "Developer-centric task boards featuring sprint planning, Git branch linking, and technical milestone tracking.",
          },
          {
            title: "Focus Mode, Daily Missions & Timers",
            description:
              "Distraction-free Pomodoro session tracking that associates deep work intervals directly with specific coding tasks.",
          },
          {
            title: "Resume Parsing, ATS Scoring & Claim Validation",
            description:
              "Parses resume bullet points against industry ATS rubrics, cross-referencing listed project claims with actual repository metrics.",
          },
          {
            title: "Skill-Gap Analysis & Personalized Roadmaps",
            description:
              "Evaluates user performance against targeted engineering job roles to recommend targeted DSA topics and missing stack components.",
          },
          {
            title: "Gamification Through XP, Streaks & Badges",
            description:
              "Encourages consistent practice through XP leveling, daily submission streaks, milestone achievements, and developer challenges.",
          },
          {
            title: "Real-time SSE Dashboard Updates",
            description:
              "Server-Sent Events push live progress updates to client dashboards without aggressive client polling.",
          },
        ],
        capabilityClusters: [
          {
            title: "Coding & DSA Workspace",
            badge: "Algorithms",
            items: [
              {
                title: "Multi-Platform Aggregation",
                description: "Consolidates problem counts, topic tags, difficulty curves, and contest ratings across LeetCode, Codeforces, and CodeChef.",
              },
              {
                title: "Topic Analytics & Heatmaps",
                description: "Visualizes algorithmic topic coverage, submission frequency heatmaps, and difficulty distributions.",
              },
              {
                title: "Resilient Ingestion Handlers",
                description: "Asynchronous workers poll platform profiles with exponential backoff and Redis caching to respect public rate limits.",
              },
            ],
          },
          {
            title: "Projects & Focus",
            badge: "Execution",
            items: [
              {
                title: "Daily Mission Control",
                description: "Converts roadmap priorities into daily missions with estimated durations, checklist tags, and persistent Zustand state.",
              },
              {
                title: "Milestone Task Boards",
                description: "Developer-centric sprint planning, persistent task tracking, and milestone completion velocity.",
              },
              {
                title: "Integrated Focus Timers",
                description: "Distraction-free Pomodoro and stopwatch timers directly bound to specific coding tickets to measure deep work velocity.",
              },
            ],
          },
          {
            title: "Resume Intelligence",
            badge: "Verification",
            items: [
              {
                title: "Multi-Format Parsing",
                description: "Parses PDF and DOCX resumes, extracting technical skills, libraries, frameworks, and deployment signals.",
              },
              {
                title: "ATS-Oriented Scoring",
                description: "Evaluates keyword coverage, formatting structure, readability indices, and industry compatibility.",
              },
              {
                title: "Evidence Claim Linkage",
                description: "Cross-references claimed resume skills against active code proofs, GitHub commits, and project activities.",
              },
            ],
          },
          {
            title: "Career Readiness",
            badge: "Readiness",
            items: [
              {
                title: "Skill-Gap Analysis",
                description: "Evaluates candidate skills against target roles (Backend, AI Engineer, DevOps) to identify missing prerequisites.",
              },
              {
                title: "Evolution Growth Timeline",
                description: "Chronological event ledger recording milestones, skill masteries, and target company tier benchmarks.",
              },
              {
                title: "Blocker Identification",
                description: "Dynamically isolates the primary engineering roadblock and recommends concrete avenues for resolution.",
              },
            ],
          },
          {
            title: "Progression & Gamification",
            badge: "Engagement",
            items: [
              {
                title: "XP & Leveling System",
                description: "Awards experience points strictly tied to verified task completions, problem milestones, and deep work intervals.",
              },
              {
                title: "Streak Trajectory & Freezes",
                description: "Tracks daily engineering habits with streak protections to encourage consistent practice.",
              },
              {
                title: "Milestone Badges",
                description: "Awards verifiable engineering achievements based on sustained practice and technical milestones.",
              },
            ],
          },
          {
            title: "Real-Time & Operations",
            badge: "Systems",
            items: [
              {
                title: "Server-Sent Events (SSE) Bus",
                description: "Pushes real-time timer ticks, task state transitions, and XP gains to the frontend without polling overhead.",
              },
              {
                title: "BullMQ Asynchronous Queues",
                description: "6 dedicated background worker queues manage compute-heavy parsing, scraping, and telemetry independently.",
              },
            ],
          },
        ],
        techStack: [
          {
            category: "Frontend Architecture",
            items: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Zustand (Persistent)", "TanStack Query", "Axios", "Framer Motion", "Clerk"],
          },
          {
            category: "Backend & APIs",
            items: ["Node.js", "Express 5", "TypeScript", "Mongoose", "Zod", "Server-Sent Events (SSE)", "Clerk Express"],
          },
          {
            category: "Data & Asynchronous Queues",
            items: ["MongoDB 7", "Redis 7", "BullMQ (6 Worker Queues)", "Exponential Backoff"],
          },
          {
            category: "AI & Career Intelligence",
            items: ["OpenAI / Gemini Integrations", "ATS Scoring Heuristics", "Resume Evidence Claims", "Skill-Gap Recommendation"],
          },
          {
            category: "Testing & Infrastructure",
            items: ["Vitest", "Playwright (E2E)", "Docker Compose", "GitHub Actions", "Vercel / Railway"],
          },
        ],
        contributionPillars: {
          problem:
            "Developer progress is often fragmented across coding platforms, GitHub repositories, project trackers, resumes, and learning plans. This makes it difficult to connect completed work with career goals and identify what to improve next.",
          problemPoints: [
            "Fragmented Activity Silos: Submissions on LeetCode, GitHub commits, and local tasks live apart without unified progression tracking.",
            "Disconnected Career Trajectory: Resume claims rarely map to verifiable project code, leaving candidates unprepared for technical screenings.",
            "Static Unresponsive Roadmaps: Learning plans remain rigid checklists that fail to adapt when topics are mastered or blockers arise.",
            "Superficial Productivity Metrics: Generic commit streaks fail to measure actual deep-work focus velocity or algorithmic mastery.",
          ],
          engineeringDecisions: [
            "Closed-Loop Growth Engine: Architected a cyclical progression loop: Roadmap → Focus → Evolution → Roadmap.",
            "Asynchronous BullMQ Queues: Decoupled compute-intensive resume parsing and external platform ingestion into 6 background worker queues.",
            "Centralized Zustand Store: Synchronizes active missions, deep-work timers, and XP progression across views without state tearing.",
            "Real-Time SSE Telemetry: Streams live mission updates, timer ticks, and achievement notifications without client-side polling overhead.",
          ],
          evidence: [
            "Modular Service Architecture: 23 modular domain services and 60+ typed schemas running containerized with Docker Compose.",
            "Sub-50ms Response Latency: Sub-50ms REST API response latencies maintained by delegating heavy ingestion to Redis priority queues.",
            "Resilient Platform Ingestion: Exponential backoff handlers and caching respect rate limits across LeetCode, CodeChef, and Codeforces.",
            "Comprehensive Test Suites: Integrated Vitest and Playwright test suites validating domain controllers, stores, and critical paths.",
          ],
        },
        workflowTitle: "The DevTrack Learning & Growth Workflow",
        workflowSubtitle: "Closed-loop progression from resume parsing to daily mission execution and dynamic roadmap recalculation",
        workflowStages: [
          {
            step: "01",
            title: "Resume Upload",
            subtitle: "Multi-Format Ingestion & Claim Extraction",
            description: "Parses PDF and DOCX resumes, extracting technical skills, libraries, and project scopes while verifying bullet-point strength against industry ATS rubrics.",
            badge: "Ingestion",
          },
          {
            step: "02",
            title: "Career Discovery",
            subtitle: "Target Role Alignment & Intent Setup",
            description: "Captures career intent, target company tiers, and timeline expectations to benchmark current proficiencies against target role requirements.",
            badge: "Discovery",
          },
          {
            step: "03",
            title: "Roadmap Intelligence",
            subtitle: "Skill-Gap Analysis & Learning Milestones",
            description: "Compares current skills against industry expectations, identifying missing dependencies and prioritizing high-value learning milestones.",
            badge: "Roadmap",
            connectedCapabilities: ["Skill-Gap Analysis", "Target-Role Customization"],
          },
          {
            step: "04",
            title: "Focus (Daily Mission Control)",
            subtitle: "Task Execution & Deep Work Telemetry",
            description: "Converts priorities into daily missions, persistent task lists, and timed Pomodoro intervals to capture true engineering execution velocity.",
            badge: "Focus",
            connectedCapabilities: ["Daily Missions", "Pomodoro Timers"],
          },
          {
            step: "05",
            title: "Evolution Intelligence",
            subtitle: "Milestone Growth Timeline & Blocker Logs",
            description: "Maintains an interactive growth timeline, logging completed milestones, XP progression, daily streaks, and identifying active engineering roadblocks.",
            badge: "Evolution",
          },
          {
            step: "06",
            title: "Roadmap Recalculation",
            subtitle: "Dynamic Feedback-Driven Adaptation",
            description: "Recalculates target role alignment scores and adapts remaining learning path nodes in real-time as focus tasks and milestones are completed, cycling back to Roadmap Intelligence.",
            badge: "Feedback Loop",
            connectedCapabilities: ["Continuous Recalculation", "Closed-Loop Growth"],
          },
        ],
        challengesAndTradeoffs: [
          {
            title: "Third-Party Coding Platform API Constraints",
            description:
              "Competitive platforms lack standardized public submission APIs. Implemented resilient Redis caching layers and exponential-backoff ingestion workers to respect rate boundaries while avoiding account throttling.",
          },
          {
            title: "Heavy Worker Isolation & Latency Control",
            description:
              "Offloaded compute-heavy ATS resume parsing, external scraping, and telemetry processing to 6 BullMQ worker queues, keeping synchronous Express API response latencies under 50ms.",
          },
          {
            title: "Authentic Progression vs. Superficial Gamification",
            description:
              "Designed XP generation, streak counters, and levels to be strictly bound to verifiable task completions, code commits, and problem milestones, preventing artificial score inflation.",
          },
        ],
        knownLimitations: [
          {
            title: "LeetCode Synchronisation Scope",
            description: "Partial synchronisation due to public API rate limits and the absence of an official public submission history endpoint.",
          },
          {
            title: "CodeChef Historical Granularity",
            description: "Ingestion captures high-level profile statistics and contest ratings, but granular problem submission history is restricted.",
          },
          {
            title: "Simulated ATS Scoring Engine",
            description: "Evaluates resumes against internal ATS rubrics rather than live direct Greenhouse or Workday enterprise OAuth APIs.",
          },
          {
            title: "Resume Upload File Ceiling",
            description: "Document ingestion is constrained to 5 MB per upload for PDF and DOCX formats.",
          },
          {
            title: "Graceful AI Provider Degradation",
            description: "Core tracking, DSA metrics, and roadmap features remain fully operational with rule-based heuristics when external AI provider credentials are not configured.",
          },
        ],
        metrics: [
          {
            label: "Domain Modules",
            value: "23 Services",
            detail: "Modular architecture with explicit service boundaries",
          },
          {
            label: "Database Schemas",
            value: "60+ Models",
            detail: "Comprehensive typed data structures in MongoDB",
          },
          {
            label: "Queue Workers",
            value: "6 BullMQ Types",
            detail: "Asynchronous background platform ingestion & parsing",
          },
          {
            label: "Project Status",
            value: "Private Beta",
            detail: "Active validation candidate with Docker Compose environment",
          },
        ],
      },
    },
    {
      id: "phishguard-ai",
      number: "04",
      title: "PhishGuard AI — Real-Time Phishing Detection",
      subtitle: "Local-first URL intelligence, browser protection, and adaptive model retraining.",
      description:
        "An ML-powered phishing detection system that analyses URL structure using 58 engineered features. A Flask API, web dashboard, and Chrome Extension work together to classify suspicious links and support a local feedback-driven retraining workflow.",
      category: "Cybersecurity · Applied Machine Learning",
      tags: ["Python", "Flask", "scikit-learn", "JavaScript", "Chrome Extension V3", "Gradient Boosting", "Random Forest"],
      image: "/images/projects/phishguard-preview.webp",
      timeline: "2026",
      links: {
        github: "https://github.com/VarshithReddy2006/PhishingWebsite_Detection",
      },
      highlights: [
        "58 engineered structural and lexical URL features with sub-15 ms local inference",
        "Reported 90.83% test-split validation accuracy for Gradient Boosting (90.04% Random Forest)",
        "Local feedback loop with automated background retraining & zero-downtime model hot-reloading",
      ],
      details: {
        problem:
          "Static blocklists may not recognise newly created phishing URLs immediately, while cloud-based threat lookups introduce network dependencies and privacy concerns. Furthermore, URL-only classifiers have limited visibility into full DOM content and compromised trusted domains.",
        approach:
          "PhishGuard AI operates completely local-first. An incoming URL is normalized and parsed into 58 handcrafted features (character entropy, IP address usage, sub-domain depth, URL shortening tokens, anchor tags, prefix-suffix delimiters, and sensitive keyword density). The extracted numerical feature vector is evaluated locally using an optimized Gradient Boosting classifier running in a lightweight Python Flask service. A Manifest V3 Chrome Extension intercepts navigation requests, queries the local service, and blocks malicious pages with sub-15 ms latency without leaking browsing habits to third parties.",
        keyFeatures: [
          {
            title: "58 Engineered URL Structural & Lexical Features",
            description:
              "Extracts domain length, subdomain counts, hyphen usage, entropy, suspicious TLDs, IP presence, and brand-token variations.",
          },
          {
            title: "Sub-15 Millisecond Local Inference",
            description:
              "Optimized feature extraction and tree evaluation executes locally in under 15 ms, avoiding browsing lag or page load stutter.",
          },
          {
            title: "Manifest V3 Chrome Extension",
            description:
              "Leverages declarativeNetRequest and service workers to inspect URL requests in real time with lightweight browser overhead.",
          },
          {
            title: "Feedback Submission & Automated Local Retraining",
            description:
              "Enables users to report misclassified URLs, storing samples in a verified feedback buffer for periodic retraining runs.",
          },
          {
            title: "Dynamic Model Hot-Reloading",
            description:
              "Updates and swaps model weights in memory upon retraining completion without restarting the Flask server or dropping active requests.",
          },
          {
            title: "Privacy-Preserving Architecture",
            description:
              "Zero external threat-intelligence lookups during classification—user navigation history never leaves the local machine.",
          },
        ],
        capabilityClusters: [
          {
            title: "URL Feature Engineering",
            badge: "Analysis",
            items: [
              {
                title: "Structural Decomposition",
                description: "Analyzes scheme, host, subdomain count, path depth, query parameter counts, and port anomalies.",
              },
              {
                title: "Lexical & Character Entropy",
                description: "Measures Shannon entropy of hostname tokens, dot/hyphen frequency, and symbol distributions.",
              },
              {
                title: "Brand Impersonation & TLDs",
                description: "Flags high-risk registries (.xyz, .top, etc.) and deceptive brand-name tokens embedded in subdomains.",
              },
              {
                title: "Zero-Network Extraction",
                description: "All 58 features are derived statically from the URL string in under 5 ms without external DNS lookups.",
              },
            ],
          },
          {
            title: "Local ML Inference",
            badge: "Prediction",
            items: [
              {
                title: "Gradient Boosting Engine",
                description: "Evaluates numeric vectors using scikit-learn GradientBoostingClassifier for low-latency tabular classification.",
              },
              {
                title: "Feature Matrix Alignment",
                description: "Validates column ordering against serialized feature names to guarantee consistency between training and runtime.",
              },
              {
                title: "Prediction In-Memory Cache",
                description: "Maintains an in-memory dictionary of recent classifications to eliminate redundant feature extraction on repeat visits.",
              },
              {
                title: "Confidence Safeguard",
                description: "Escalates marginal classifications (< 60% probability) to 'Suspicious' to prevent false negatives on deceptive URLs.",
              },
            ],
          },
          {
            title: "Browser & Dashboard Integration",
            badge: "Interface",
            items: [
              {
                title: "Chrome Extension (MV3)",
                description: "Uses declarativeNetRequest and background service workers for passive, zero-click browsing protection.",
              },
              {
                title: "Sandboxed Warning Banners",
                description: "Injects warning prompts on confirmed phishing targets without modifying the destination page's scripts.",
              },
              {
                title: "Flask REST API Services",
                description: "Exposes lightweight /predict, /features, and /feedback JSON endpoints on localhost port 5000.",
              },
              {
                title: "Local Management Dashboard",
                description: "Vanilla HTML5/JS dashboard for classification history, manual test inputs, and retraining status.",
              },
            ],
          },
          {
            title: "Feedback & Model Lifecycle",
            badge: "Lifecycle",
            items: [
              {
                title: "Flat-File CSV Persistence",
                description: "Stores verified training samples in dataset.csv and user-reported corrections in feedback.csv.",
              },
              {
                title: "Background File Watcher",
                description: "Dedicated daemon thread polls feedback.csv modification timestamps with a 60-second cooldown period.",
              },
              {
                title: "Automated Retraining Pipeline",
                description: "Validates and merges eligible feedback samples into the dataset and executes retraining automatically.",
              },
              {
                title: "Dynamic Model Hot-Reload",
                description: "Swaps active model weights in Flask memory atomically, applying updates without restarting the server.",
              },
            ],
          },
        ],
        techStack: [
          {
            category: "Machine Learning & Data",
            items: ["Python 3.10+", "scikit-learn", "pandas", "NumPy", "joblib"],
          },
          {
            category: "Backend Architecture",
            items: ["Flask REST API", "Flask-CORS", "In-Memory Prediction Cache", "Dynamic Hot-Reloader"],
          },
          {
            category: "Client & Browser Integration",
            items: ["Chrome Extension (Manifest V3)", "HTML5 / Vanilla JavaScript", "Web Dashboard UI"],
          },
          {
            category: "Optional Semantic Path",
            items: ["PyTorch (Optional)", "Hugging Face Transformers (DistilBERT Path)"],
          },
          {
            category: "Persistence & Storage",
            items: ["dataset.csv (11,438 records)", "feedback.csv (User Queue)", "Serialized Pickles (.pkl)"],
          },
        ],
        contributionPillars: {
          problem:
            "Static blocklists may not recognise newly created phishing URLs immediately, while cloud-based threat lookups introduce network dependencies and privacy concerns. Furthermore, URL-only classifiers have limited visibility into full DOM content and compromised trusted domains.",
          problemPoints: [
            "Zero-Hour Blocklist Lag: Static threat feeds fail to recognize newly registered phishing domains before campaigns execute.",
            "Cloud Telemetry Exposure: Remote URL checks introduce network latency and leak real-time user browsing patterns to third parties.",
            "Structural Visibility Ceiling: Lexical-only URL heuristics cannot inspect active DOM content or compromised legitimate sub-paths.",
            "Low-Confidence False Negatives: Edge-case lookups on ambiguous URLs risk clearing phishing pages without automated safeguards.",
          ],
          engineeringDecisions: [
            "In-Memory Feature Extraction: Extracts 58 structural, lexical, and statistical URL features in memory to achieve sub-15 ms local inference.",
            "Classifier Benchmarking: Compared Random Forest (90.04% test accuracy) and Gradient Boosting (90.83% test accuracy), deploying Gradient Boosting for superior precision.",
            "Dual-Surface Delivery: Integrated a lightweight Flask prediction API with a web dashboard and Chrome Extension Manifest V3 with prediction and feedback caching.",
            "Automated Retraining Loop: Implemented a background file watcher monitoring feedback submissions, executing retraining and hot-swapping model artifacts in memory without server restarts.",
            "Confidence Safeguard: Enforced a low-confidence threshold flagging classifications under 60% probability as suspicious rather than clearing them as legitimate.",
          ],
          evidence: [
            "Gradient Boosting Accuracy: Reported 90.83% test-split accuracy (90.75% precision, 90.91% recall, 90.83% F1 score) on held-out evaluation.",
            "Random Forest Baseline: Reported 90.04% test-split accuracy (89.85% precision, 90.15% recall, 90.00% F1 score) on identical partition.",
            "Balanced Evaluation Corpus: Evaluated on 11,438 curated URLs (5,722 legitimate, 5,716 phishing) using an 80/20 stratified split.",
            "End-to-End Delivery: Verified integration across Chrome Extension (Manifest V3), Flask REST API (/predict, /features, /feedback), and local retraining pipeline.",
          ],
        },
        workflowTitle: "Five-Stage Local Threat Detection & Retraining Pipeline",
        workflowSubtitle: "Sub-15 ms in-memory feature engineering, risk classification, and background retraining loop",
        workflowStages: [
          {
            step: "01",
            title: "URL Input & Normalization",
            subtitle: "Browser Navigation Interception",
            description: "The browser navigation event is intercepted by the Chrome Extension or submitted via the web dashboard; the raw URL string is normalized and length-validated.",
            badge: "Input",
          },
          {
            step: "02",
            title: "58-Feature Extraction",
            subtitle: "Lexical & Structural Analysis",
            description: "Extracts 58 structural and lexical indicators—length ratios, symbol counts, hostname entropy, suspicious TLDs, and keyword density in under 5 ms.",
            badge: "Extraction",
          },
          {
            step: "03",
            title: "Model Inference & Scoring",
            subtitle: "Tabular Classification Engine",
            description: "Evaluates the validated 58-feature vector using the active Gradient Boosting Classifier, generating decision probabilities and explainability paths.",
            badge: "Inference",
            connectedCapabilities: ["Gradient Boosting", "Confidence Scoring"],
          },
          {
            step: "04",
            title: "Risk Presentation & Safeguards",
            subtitle: "Decision Enforcement Gate",
            description: "Displays risk classification (Legitimate, Suspicious, or Phishing) with a low-confidence safeguard escalating predictions under 60% to Suspicious.",
            badge: "Enforcement",
            connectedCapabilities: ["Sandboxed Alert Banner", "Low-Confidence Safeguard"],
          },
          {
            step: "05",
            title: "User Feedback & Retraining Loop",
            subtitle: "Adaptive Background Retraining",
            description: "Users submit false-positive or false-negative corrections to feedback.csv, triggering the background watcher thread to execute retraining and memory reload.",
            badge: "Retraining",
            connectedCapabilities: ["Background Watcher", "Hot-Reload"],
          },
        ],
        challengesAndTradeoffs: [
          {
            title: "Local Inference vs. External Threat Intelligence",
            description:
              "Local execution guarantees complete browsing privacy and sub-15 ms latency without third-party network dependencies, but cannot perform live DNS reputation queries, WHOIS age checks, or active SSL certificate validation.",
          },
          {
            title: "URL Lexical Features vs. Full Page DOM Inspection",
            description:
              "Extracting structural features from URL strings is fast and pre-navigation safe, but blind to page content, form action targets, and phishing hosted on compromised legitimate cloud domains (e.g. Google Forms, SharePoint).",
          },
          {
            title: "Automated Retraining vs. Model Drift & Label Noise",
            description:
              "Continuous local feedback allows the model to adapt to new phishing patterns, but introduces susceptibility to noisy feedback and potential model drift requiring a 60-second cooldown threshold and validation checks.",
          },
        ],
        knownLimitations: [
          {
            title: "Compromised Trusted Domain Blindness",
            description: "Phishing attacks hosted on otherwise legitimate platforms (e.g. Google Forms, SharePoint, Canva) evade detection because their domain authority and lexical structure appear legitimate.",
          },
          {
            title: "Adversarial URL Manipulation",
            description: "Attackers can craft benign-looking lexical structures or use redirect chains that mask the ultimate destination until network resolution.",
          },
          {
            title: "Validation Metrics vs. Real-World Efficacy",
            description: "Reported 90.83% test-split accuracy reflects the evaluation dataset and split methodology; it does not constitute a guaranteed real-world catch rate.",
          },
          {
            title: "Local CSV Storage & Concurrency",
            description: "Flat CSV files lack enterprise concurrency controls and cryptographic integrity verification, making them suited for single-user local deployment.",
          },
          {
            title: "Development-Only CORS Configuration",
            description: "The Flask API is configured with wildcard CORS (origins: '*') for local extension development, which must be restricted in any multi-user deployment.",
          },
        ],
        metrics: [
          {
            label: "Gradient Boosting",
            value: "90.83%",
            detail: "Reported 80/20 test split validation accuracy (Selected model)",
          },
          {
            label: "Random Forest",
            value: "90.04%",
            detail: "Reported 80/20 test split validation accuracy on benchmark split",
          },
          {
            label: "Dataset Size",
            value: "11,438 URLs",
            detail: "Balanced dataset (5,722 legitimate, 5,716 phishing samples)",
          },
          {
            label: "Engineered Features",
            value: "58 Features",
            detail: "Structural, lexical, and statistical URL indicators",
          },
        ],
      },
    },
  ],
};
