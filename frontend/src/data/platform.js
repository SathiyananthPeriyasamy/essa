// ESAA Enterprise AI Platform — Platform Data Catalog
// All text derived directly from official platform capabilities and architecture specifications

export const PLATFORM_GROUPS = {
  ENTERPRISE_CONTEXT: "Enterprise Context",
  INTELLIGENCE_CONTROL: "Intelligence & Control",
  DEPLOYMENT: "Deployment",
  ASSISTANT: "ESAA Assistant",
  AGENTS: "ESAA Agents",
  ACTIONS: "Actions & Tools"
};

export const PLATFORM_ITEMS = [
  // --- Left Column: Enterprise Context & Control ---
  {
    slug: "50-enterprise-connectors",
    title: "50+ Enterprise Connectors",
    group: PLATFORM_GROUPS.ENTERPRISE_CONTEXT,
    tooltip: "Continuous sync across ERP, storage, communication, and engineering wikis",
    icon: "layers",
    lead: "Continuously index and synchronize knowledge from 50+ enterprise systems with automated incremental polling and webhook triggers.",
    overview: "ESAA connects natively to organizational applications across ERP (SAP S/4HANA, ServiceNow, Salesforce, HubSpot), Cloud Storage (Google Drive, SharePoint, OneDrive, Box, S3), Team Collaboration (Slack, Teams, Discord), and Knowledge Bases (Confluence, Jira, Notion, GitHub). It maintains automated incremental syncing and federated search capabilities across distributed silos without requiring manual document migration.",
    capabilities: [
      "Automated incremental sync and webhook-driven ingestion across 50+ enterprise sources",
      "Comprehensive coverage across ERP, cloud repositories, engineering wikis, and chat channels",
      "Federated live query execution for real-time sources without full bulk data indexing"
    ],
    relatedSlugs: ["document-level-acls", "model-agnostic-gateway", "deployment-options"]
  },
  {
    slug: "document-level-acls",
    title: "Document-Level ACLs",
    group: PLATFORM_GROUPS.ENTERPRISE_CONTEXT,
    tooltip: "Inherit file-level permissions directly from source repositories",
    icon: "shield-check",
    lead: "Strict source ACL mirroring ensures users only retrieve information derived from documents they are authorized to access.",
    overview: "Enterprise security demands that an AI platform respect organizational boundaries. ESAA mirrors access control lists (ACLs) from source systems like Google Drive, SharePoint, Confluence, and Slack. Every query evaluation filters candidate passages against the authenticated user's credentials and directory roles before ranking and generation occur.",
    capabilities: [
      "Native permission mirroring from Google Drive, SharePoint, Confluence, and Slack",
      "Pre-retrieval security filtering guaranteeing unauthorized data never enters model context",
      "Enterprise identity integration with SAML 2.0, OIDC, Okta, and Microsoft Entra ID"
    ],
    relatedSlugs: ["50-enterprise-connectors", "agent-governance-rbac", "model-agnostic-gateway"]
  },
  {
    slug: "model-agnostic-gateway",
    title: "Model-Agnostic Gateway",
    group: PLATFORM_GROUPS.INTELLIGENCE_CONTROL,
    tooltip: "Swap dynamically between OpenAI, Anthropic, Gemini, Bedrock, and self-hosted models",
    icon: "cpu",
    lead: "Unified routing infrastructure across foundational frontier LLMs and sovereign on-premise models without vendor lock-in.",
    overview: "Eliminate vendor lock-in with a unified model gateway. Route prompts dynamically between OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Azure OpenAI, and self-hosted open models (Ollama, vLLM). Enforce centralized rate limits, fallbacks, cost optimization policies, and custom guardrails across all business units.",
    capabilities: [
      "Instant switching between commercial cloud APIs and sovereign local vLLM/Ollama deployments",
      "Intelligent model routing based on query complexity, latency requirements, and context length",
      "Centralized prompt guardrails, PII masking, and unified API quota management"
    ],
    relatedSlugs: ["observability-evals", "deployment-options", "50-enterprise-connectors"]
  },
  {
    slug: "observability-evals",
    title: "Observability & Evals",
    group: PLATFORM_GROUPS.INTELLIGENCE_CONTROL,
    tooltip: "Measure retrieval recall, precision, latency, and model accuracy at enterprise scale",
    icon: "activity",
    lead: "End-to-end tracing, compliance audit logging, and built-in evaluation test harnesses for enterprise AI operations.",
    overview: "Monitor every step of reasoning and retrieval in production. ESAA integrates natively with OpenTelemetry, Langfuse, and Arize Phoenix to trace prompt-response cycles, tool executions, and retrieval relevance. Built-in evaluation test suites benchmark accuracy, ground-truth faithfulness, and latency across evolving model versions.",
    capabilities: [
      "Full trace telemetry for prompt-to-response lifecycles and intermediate tool invocations",
      "Built-in Evals test harness to measure retrieval recall, context precision, and hallucination rates",
      "Immutable compliance audit logs tracking all user queries, source citations, and agent actions"
    ],
    relatedSlugs: ["model-agnostic-gateway", "document-level-acls", "agent-governance-rbac"]
  },
  {
    slug: "deployment-options",
    title: "Deployment Options",
    group: PLATFORM_GROUPS.DEPLOYMENT,
    tooltip: "Run on-premises with Helm/Kubernetes, or use Lite Mode (under 1GB RAM)",
    icon: "server",
    lead: "Flexible deployment architecture supporting air-gapped private clouds, Kubernetes clusters, and lightweight edge environments.",
    overview: "Deploy ESAA entirely within your own security boundary. Choose between self-hosted Kubernetes with Helm charts, Terraform configurations for AWS/GCP/Azure, or simple Docker Compose setups. For air-gapped branches or constrained virtual machines, run Lite Mode (<1GB RAM) with full chat and tool execution capabilities.",
    capabilities: [
      "Production-ready Kubernetes Helm charts and Terraform templates for AWS, GCP, and Azure",
      "Air-gapped and sovereign private cloud deployment ensuring zero external data leakage",
      "Configurable Standard cluster mode or lightweight Lite Mode requiring under 1GB of RAM"
    ],
    relatedSlugs: ["model-agnostic-gateway", "document-level-acls", "50-enterprise-connectors"]
  },

  // --- Right Column 1: ESAA Assistant ---
  {
    slug: "hybrid-vector-bm25-rag",
    title: "Hybrid Vector + BM25 RAG",
    group: PLATFORM_GROUPS.ASSISTANT,
    tooltip: "Dense vector embeddings combined with BM25 sparse keyword matching and reciprocal rank fusion",
    icon: "search",
    lead: "Dual-engine retrieval uniting deep semantic comprehension with pinpoint exact-match precision for technical terms and IDs.",
    overview: "Traditional vector search often fails on alphanumeric product codes, error messages, and domain-specific terminology. ESAA combines dense vector semantic embeddings with BM25 keyword matching using Reciprocal Rank Fusion (RRF) and cross-encoder re-ranking. The result is sub-second retrieval that captures both conceptual intent and exact technical IDs.",
    capabilities: [
      "Fused dense vector and BM25 sparse keyword retrieval optimized for enterprise corpora",
      "Cross-encoder re-ranking to dynamically score candidate passages for maximum relevance",
      "Curated document sets allowing queries scoped to specific teams, policies, or project phases"
    ],
    relatedSlugs: ["verifiable-source-citations", "instant-file-ingestion", "document-canvas-artifacts", "slack-discord-bots"]
  },
  {
    slug: "verifiable-source-citations",
    title: "Verifiable Source Citations",
    group: PLATFORM_GROUPS.ASSISTANT,
    tooltip: "Every generated answer links back directly to the source document with exact citations",
    icon: "file-check",
    lead: "Eliminate hallucinations with transparent evidentiary lineage and inline clickable document references.",
    overview: "Every claim and numerical figure produced by the ESAA Assistant is backed by verified references to internal documentation. Inline citation badges indicate the source file, page number, and timestamp, allowing enterprise users to audit reasoning and inspect the original source text with a single click.",
    capabilities: [
      "Inline clickable citation badges anchored to verified enterprise source documents",
      "Instant side-panel document preview displaying extracted passages in original context",
      "Evidentiary lineage tracking to ensure factual answers and eliminate hallucinations"
    ],
    relatedSlugs: ["hybrid-vector-bm25-rag", "document-canvas-artifacts", "instant-file-ingestion", "slack-discord-bots"]
  },
  {
    slug: "slack-discord-bots",
    title: "Slack & Discord Bots",
    group: PLATFORM_GROUPS.ASSISTANT,
    tooltip: "Mention @ESAA in channels or DMs to get answers and trigger automated workflows",
    icon: "message-square",
    lead: "Bring enterprise intelligence and tool execution directly into your organization's daily communication channels.",
    overview: "Meet employees where they already work. Mention @ESAA in public Slack channels, private group chats, or Discord streams to query internal wikis, summarize discussions, and kick off multi-step workflows. Permissions and identities are automatically synced to maintain governance in chat conversations.",
    capabilities: [
      "Omnichannel conversational bots for Slack and Discord with threaded context preservation",
      "In-channel document search and interactive confirmation buttons for business actions",
      "Automatic identity mapping ensuring users only receive answers they are permitted to view"
    ],
    relatedSlugs: ["hybrid-vector-bm25-rag", "verifiable-source-citations", "document-canvas-artifacts", "instant-file-ingestion"]
  },
  {
    slug: "document-canvas-artifacts",
    title: "Document Canvas & Artifacts",
    group: PLATFORM_GROUPS.ASSISTANT,
    tooltip: "Live side-by-side creation of formatted documents, markdown deliverables, and scripts",
    icon: "file-edit",
    lead: "Dedicated workspace for co-editing living documents, structured reports, and visual diagrams alongside chat.",
    overview: "Move beyond ephemeral chat replies. ESAA provides a collaborative Document Canvas where digital coworkers craft formatted deliverables, technical specifications, and structured executive briefs. Artifacts can be iterated on iteratively, refined with prompt commands, and exported to Markdown, HTML, or PDF.",
    capabilities: [
      "Side-by-side interactive canvas for drafting and refining long-form enterprise deliverables",
      "Version history and iterative document tuning through natural language directives",
      "Export to standardized formats including clean Markdown, structured HTML, and executive PDF"
    ],
    relatedSlugs: ["hybrid-vector-bm25-rag", "verifiable-source-citations", "instant-file-ingestion", "slack-discord-bots"]
  },
  {
    slug: "instant-file-ingestion",
    title: "Instant File Ingestion",
    group: PLATFORM_GROUPS.ASSISTANT,
    tooltip: "Drag and drop PDFs, spreadsheets, and presentations directly into any conversation",
    icon: "upload-cloud",
    lead: "Ad-hoc multi-format file analysis with instant parsing, table extraction, and contextual indexing.",
    overview: "When working with transient files that aren't yet in an indexed repository, users can drag and drop PDFs, Excel spreadsheets, CSVs, Word documents, PowerPoint presentations, and text files directly into the chat session. ESAA parses tables, text, and structure in seconds for immediate analysis.",
    capabilities: [
      "Instant drag-and-drop ingestion of PDFs, Excel, CSV, DOCX, PPTX, and code files",
      "Deep structural parsing preserving tabular layouts, data schemas, and slide hierarchies",
      "Isolated in-memory session indexing preventing uncommitted files from contaminating global search"
    ],
    relatedSlugs: ["hybrid-vector-bm25-rag", "verifiable-source-citations", "document-canvas-artifacts", "slack-discord-bots"]
  },

  // --- Right Column 2: ESAA Agents ---
  {
    slug: "custom-persona-builder",
    title: "Custom Persona Builder",
    group: PLATFORM_GROUPS.AGENTS,
    tooltip: "Create specialized agents with bespoke instructions, temperature, and document sets",
    icon: "user-check",
    lead: "Design targeted digital coworkers customized for specific departments, operational playbooks, and domains.",
    overview: "Empower department leaders to build bespoke agents without writing code. Configure custom persona instructions, system prompts, reasoning temperatures, assigned document collections, and starter prompts. Personas can be scoped to individual specialists, restricted to departments, or published enterprise-wide.",
    capabilities: [
      "No-code persona studio with custom system prompts, temperature dials, and behavioral guardrails",
      "Targeted document collection scoping restricting agents to relevant knowledge domains",
      "Starter prompt suggestions guiding non-technical team members toward optimal workflows"
    ],
    relatedSlugs: ["autonomous-deep-research", "multi-step-tool-reasoning", "agent-governance-rbac", "pre-built-agent-library"]
  },
  {
    slug: "autonomous-deep-research",
    title: "Autonomous Deep Research",
    group: PLATFORM_GROUPS.AGENTS,
    tooltip: "Multi-step iterative inquiry breaking complex research questions into structured sub-queries",
    icon: "compass",
    lead: "Autonomous research agent synthesizing insights across enterprise repositories and external web sources.",
    overview: "Complex strategic inquiries require more than a single retrieval step. ESAA's Deep Research mode autonomously decomposes complex problems into sub-questions, executes parallel searches across internal document stores and live web sources, resolves conflicting evidence, and compiles publication-grade investigative briefs.",
    capabilities: [
      "Iterative inquiry planner that identifies information gaps and formulates targeted sub-queries",
      "Cross-source synthesis reconciling contradictory documentation across internal and external data",
      "Publication-ready executive summaries with comparative tables, gap analyses, and source citations"
    ],
    relatedSlugs: ["custom-persona-builder", "multi-step-tool-reasoning", "agent-governance-rbac", "pre-built-agent-library"]
  },
  {
    slug: "multi-step-tool-reasoning",
    title: "Multi-Step Tool Reasoning",
    group: PLATFORM_GROUPS.AGENTS,
    tooltip: "Execute sequential tool calls with error correction and human-in-the-loop approvals",
    icon: "git-branch",
    lead: "Orchestrate complex business processes across multiple tools with structured planning and safety checkpoints.",
    overview: "Empower autonomous agents to solve multi-system problems by chaining tools logically. ESAA agents plan their actions, inspect intermediate outputs, handle errors gracefully, and request human operator confirmation before committing irreversible changes to production systems.",
    capabilities: [
      "Dynamic tool chaining allowing agents to evaluate intermediate results before next steps",
      "Automated error recovery and alternative execution pathway discovery during task execution",
      "Mandatory human-in-the-loop approval gates for high-impact write operations and database mutations"
    ],
    relatedSlugs: ["custom-persona-builder", "autonomous-deep-research", "agent-governance-rbac", "pre-built-agent-library"]
  },
  {
    slug: "agent-governance-rbac",
    title: "Agent Governance & RBAC",
    group: PLATFORM_GROUPS.AGENTS,
    tooltip: "Granular administrative controls, permission scoping, and approval lifecycles",
    icon: "shield-check",
    lead: "Centralized lifecycle management, role-based access control, and compliance policies for enterprise agents.",
    overview: "Maintain absolute control over AI agent deployments across your enterprise. Designate who can create, configure, and publish agents with three-tiered role-based access control (Super Admin, Curator, and Basic User). Enforce strict tool execution boundaries and inspect agent behavior through centralized administrative dashboards.",
    capabilities: [
      "Three-tiered administrative hierarchy: Super Admin, Domain Curator, and Basic User",
      "Granular tool assignment restricting agents to approved APIs, sandboxes, and databases",
      "Centralized audit dashboard tracking agent usage, token consumption, and policy compliance"
    ],
    relatedSlugs: ["custom-persona-builder", "autonomous-deep-research", "multi-step-tool-reasoning", "pre-built-agent-library"]
  },
  {
    slug: "pre-built-agent-library",
    title: "Pre-Built Agent Library",
    group: PLATFORM_GROUPS.AGENTS,
    tooltip: "Ready-to-deploy agent blueprints for IT, HR, Sales, Legal, and Operations",
    icon: "book-open",
    lead: "Accelerate time-to-value with vetted, turnkey persona templates engineered for standard enterprise workloads.",
    overview: "Jumpstart organizational adoption with pre-configured agent templates designed for standard departmental operations. Deploy IT Helpdesk assistants with ServiceNow integration, RFP responders connected to Salesforce, HR policy guides, or financial audit coworkers with proven prompting patterns out of the box.",
    capabilities: [
      "Turnkey departmental agent blueprints for IT support, HR onboarding, legal review, and sales RFPs",
      "Pre-configured tool assignments and system instructions aligned with industry best practices",
      "Easily customizable templates that can be cloned and adapted to unique corporate requirements"
    ],
    relatedSlugs: ["custom-persona-builder", "autonomous-deep-research", "multi-step-tool-reasoning", "agent-governance-rbac"]
  },

  // --- Right Column 3: Actions & Tools ---
  {
    slug: "sap-s4hana-actions",
    title: "SAP S/4HANA Actions",
    group: PLATFORM_GROUPS.ACTIONS,
    tooltip: "Create sales orders, query OData business records, and inspect inventory from chat",
    icon: "database",
    lead: "Live bidirectional ERP execution connecting conversational AI to core SAP S/4HANA business objects.",
    overview: "Transform SAP ERP from a complex interface into an intuitive conversational workflow. Authorize agents to create sales orders, query material stocks, inspect vendor balances, and update business partner records in real-time through authenticated SAP OData and RFC services with strict validation rules.",
    capabilities: [
      "Conversational creation and validation of SAP Sales Orders directly from natural language prompts",
      "Real-time bidirectional querying of SAP OData entities, material stocks, and business partners",
      "Governed authentication supporting OAuth2, RFC credentials, and SAP audit log tracing"
    ],
    relatedSlugs: ["servicenow-incident-triage", "model-context-protocol-mcp", "openapi-rest-tool-importer", "sandboxed-python-execution"]
  },
  {
    slug: "servicenow-incident-triage",
    title: "ServiceNow Incident Triage",
    group: PLATFORM_GROUPS.ACTIONS,
    tooltip: "Auto-diagnose tickets, update incident states, and execute runbook remediations",
    icon: "life-buoy",
    lead: "Automated IT service management streamlining incident resolution, ticket updates, and runbook execution.",
    overview: "Accelerate IT resolution times and eliminate helpdesk backlog. ESAA interfaces directly with ServiceNow table APIs to search knowledge bases, triage incoming incident alerts, assign severity levels, update work notes, and resolve common infrastructure tickets with complete change auditing.",
    capabilities: [
      "Automated diagnosis and severity classification of IT incidents against technical runbooks",
      "Direct ticket creation, status updating, work note logging, and resolution via ServiceNow APIs",
      "Seamless integration with Slack and Teams for authenticated one-click operator confirmations"
    ],
    relatedSlugs: ["sap-s4hana-actions", "model-context-protocol-mcp", "openapi-rest-tool-importer", "sandboxed-python-execution"]
  },
  {
    slug: "model-context-protocol-mcp",
    title: "Model Context Protocol (MCP)",
    group: PLATFORM_GROUPS.ACTIONS,
    tooltip: "Connect to open-standard MCP servers for external tools, databases, and plugins",
    icon: "plug",
    lead: "Standardized tool extensibility connecting ESAA agents to the broader ecosystem of MCP-compatible servers.",
    overview: "Leverage the emerging open standard for AI extensibility. ESAA implements the Model Context Protocol (MCP), enabling digital coworkers to discover and invoke tools provided by standard MCP servers across databases, local utilities, third-party software, and internal microservices seamlessly.",
    capabilities: [
      "Native support for open-standard MCP server discovery and tool invocation",
      "Universal interoperability with community and commercial MCP tools without custom wrappers",
      "Scoped execution boundaries ensuring MCP plugins adhere to enterprise security governance"
    ],
    relatedSlugs: ["sap-s4hana-actions", "servicenow-incident-triage", "openapi-rest-tool-importer", "sandboxed-python-execution"]
  },
  {
    slug: "openapi-rest-tool-importer",
    title: "OpenAPI / REST Tool Importer",
    group: PLATFORM_GROUPS.ACTIONS,
    tooltip: "Import Swagger / OpenAPI specifications to convert internal APIs into LLM tools",
    icon: "code",
    lead: "Convert any existing internal enterprise REST API into an authenticated agent action in seconds.",
    overview: "Leverage your existing engineering investments. Simply paste or upload any OpenAPI 3.0 / Swagger JSON or YAML specification. ESAA automatically translates API endpoints, parameters, and schemas into LLM-callable tools with support for OAuth2, Bearer tokens, and custom API key headers.",
    capabilities: [
      "Instant conversion of Swagger and OpenAPI 3.0 specifications into callable agent tools",
      "Automated schema parsing, type coercion, and parameter validation for REST endpoints",
      "Flexible enterprise authentication management supporting OAuth2 flows, API keys, and mutual TLS"
    ],
    relatedSlugs: ["sap-s4hana-actions", "servicenow-incident-triage", "model-context-protocol-mcp", "sandboxed-python-execution"]
  },
  {
    slug: "sandboxed-python-execution",
    title: "Sandboxed Python Execution",
    group: PLATFORM_GROUPS.ACTIONS,
    tooltip: "Run statistical calculations, data analysis, and chart generation in isolated containers",
    icon: "terminal",
    lead: "Safe in-memory execution of Python code for deep data manipulation, statistical modeling, and charting.",
    overview: "Perform computational and statistical tasks with absolute safety. ESAA executes Python scripts within isolated ephemeral containers equipped with NumPy, Pandas, Scipy, and Altair. Agents clean tabular data, calculate complex statistics, and generate interactive visual charts on demand.",
    capabilities: [
      "Ephemeral, air-gapped container execution preventing host system access and unauthorized network calls",
      "Pre-installed data science stack including Pandas, NumPy, Scikit-learn, and Altair",
      "Dynamic chart generation and structured dataset transformations delivered directly in chat"
    ],
    relatedSlugs: ["sap-s4hana-actions", "servicenow-incident-triage", "model-context-protocol-mcp", "openapi-rest-tool-importer"]
  }
];

// Helper to look up an item by slug
export function getPlatformItemBySlug(slug) {
  return PLATFORM_ITEMS.find(item => item.slug === slug);
}

// Data for /platform/overview page
export const PLATFORM_OVERVIEW_DATA = {
  title: "Platform overview",
  lead: "ESAA is a unified, enterprise-grade AI platform that transforms foundational LLMs into secure, context-aware digital coworkers and autonomous agents connected to your core business systems.",
  
  challengesAnswers: [
    {
      challenge: "Data Fragmentation (knowledge scattered in Slack, Drive, Jira, SAP)",
      solution: "Unified Hybrid RAG & 50+ Connectors",
      benefit: "One search & chat bar across all enterprise knowledge."
    },
    {
      challenge: "Hallucinations & Untruthful Output",
      solution: "Agentic RAG with Real-Time Citations",
      benefit: "Every answer links back directly to the source document with exact citations."
    },
    {
      challenge: "Data Leaks & Security Concerns",
      solution: "Document-Level Permissions (ACLs) & SSO",
      benefit: "Users can only see answers derived from documents they are authorized to access."
    },
    {
      challenge: "Vendor Lock-in",
      solution: "Model & Infrastructure Agnostic",
      benefit: "Swap between OpenAI, Anthropic Claude, Google Gemini, AWS Bedrock, Azure, or local Ollama/vLLM anytime."
    },
    {
      challenge: "Static AI vs Actionable Workflows",
      solution: "Built-in Actions, SAP, ServiceNow & MCP",
      benefit: "Agents don't just talk; they trigger workflows, create sales orders, log tickets, and run code."
    }
  ],

  pillars: [
    {
      number: "01",
      icon: "database",
      tag: "Connectors",
      title: "Knowledge Ingestion & Enterprise Connectors (50+ Sources)",
      desc: "Continuous automated indexing and webhook sync across SAP S/4HANA, ServiceNow, Salesforce, Google Drive, SharePoint, Jira, and Slack.",
      slug: "50-enterprise-connectors"
    },
    {
      number: "02",
      icon: "search",
      tag: "Hybrid RAG",
      title: "Next-Generation Information Retrieval (Agentic Hybrid RAG)",
      desc: "Dual dense vector and BM25 sparse keyword retrieval with reciprocal rank fusion, cross-encoder re-ranking, and inline source citations.",
      slug: "hybrid-vector-bm25-rag"
    },
    {
      number: "03",
      icon: "bot",
      tag: "AI Personas",
      title: "Specialized AI Agents & Personas",
      desc: "Tailored agents with custom system instructions, domain parameters, scoped document collections, and granular tool assignments.",
      slug: "custom-persona-builder"
    },
    {
      number: "04",
      icon: "compass",
      tag: "Deep Research",
      title: "Autonomous Deep Research Mode",
      desc: "Multi-step iterative inquiry agent that decomposes complex questions, gathers internal and web evidence, and drafts analytical briefs.",
      slug: "autonomous-deep-research"
    },
    {
      number: "05",
      icon: "tools",
      tag: "Actions",
      title: "Enterprise Extensibility, Actions & Tools",
      desc: "Direct execution into SAP S/4HANA, ServiceNow incident resolution, Model Context Protocol (MCP), and custom OpenAPI REST tool imports.",
      slug: "sap-s4hana-actions"
    },
    {
      number: "06",
      icon: "file-edit",
      tag: "Artifacts",
      title: "Document Canvas & Artifacts Generation",
      desc: "Dedicated collaborative co-editing canvas for interactive drafting, markdown deliverables, scripts, and executive reports.",
      slug: "document-canvas-artifacts"
    },
    {
      number: "07",
      icon: "shield-check",
      tag: "Security",
      title: "Enterprise Security, Governance & Administration",
      desc: "Source document ACL mirroring, SAML 2.0 / SCIM 2.0 provisioning, three-tier RBAC, audit logging, and LLM tracing via OpenTelemetry.",
      slug: "document-level-acls"
    },
    {
      number: "08",
      icon: "message-square",
      tag: "Omnichannel",
      title: "Omnichannel Presence & Enterprise Customization",
      desc: "Native Slack and Discord bots, complete white-label branding, and sovereign on-premises or Kubernetes Helm private deployment.",
      slug: "slack-discord-bots"
    }
  ],

  layers: [
    {
      layer: "Layer 1: User & Interaction Layer",
      components: "Web UI • Slack Bot • Discord Bot • Voice Mode • Craft Sandbox",
      desc: "Unified interface across desktop, mobile, and communication platforms."
    },
    {
      layer: "Layer 2: Agentic AI & Orchestration",
      components: "Custom Agents • Deep Research • Multi-Step Reasoning • Prompt Tuning",
      desc: "Governed autonomous reasoning and iterative task execution engine."
    },
    {
      layer: "Layer 3: Information Retrieval (Hybrid RAG)",
      components: "Dense Vector • BM25 Keyword • RRF + Rerank • Document ACLs",
      desc: "Sub-second dual search with permission filtering and exact citation tracing."
    },
    {
      layer: "Layer 4: Native Tools & External Actions",
      components: "Python Sandbox • Code Execution • Web Search • MCP • OpenAPI • SAP • ServiceNow",
      desc: "Transactional write capabilities and sandboxed computational analysis."
    },
    {
      layer: "Layer 5: Enterprise Data Layer (50+ Sources)",
      components: "SAP • ServiceNow • Jira • Confluence • Google Drive • Slack • GitHub",
      desc: "Automated incremental synchronization and federated query connectivity."
    }
  ],

  closing: "From ingesting fragmented internal repositories to executing live transactional workflows with complete permission governance, ESAA delivers a sovereign, production-tested operating model for enterprise work."
};
