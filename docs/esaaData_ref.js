// ESAA Enterprise AI Platform — Comprehensive Product Data
// Derived directly from the ESAA Technical Guide and Master Prompt Requirements

export const HERO_SLIDES = [
  {
    id: 1,
    eyebrow: "ENTERPRISE INTELLIGENCE",
    headline: "Bringing Enterprise Knowledge and People Together",
    description: "Connect your organization's knowledge, business systems, and everyday workflows through one secure enterprise platform.",
    primaryCta: "Explore ESAA",
    secondaryCta: "Discover Our Solutions",
    primaryLink: "#solutions",
    secondaryLink: "#capabilities",
    image: "/images/esaa_hero_enterprise_1791906875872.jpg",
    alt: "Professional enterprise team collaborating in a contemporary office reviewing information together on screen"
  },
  {
    id: 2,
    eyebrow: "CONNECTED BUSINESS SYSTEMS",
    headline: "Better Connected Workflows. Clearer Business Decisions.",
    description: "Bring enterprise information closer to the people who need it, with integrated search, analytics, and workflow capabilities.",
    primaryCta: "Explore Capabilities",
    secondaryCta: "View Integrations",
    primaryLink: "#capabilities",
    secondaryLink: "#integrations",
    image: "/images/esaa_workflows_carousel_1791906947520.jpg",
    alt: "Enterprise analyst and engineering team reviewing operational workflows in a modern corporate workplace"
  },
  {
    id: 3,
    eyebrow: "ENGINEERED FOR ENTERPRISE",
    headline: "Technology That Works Around Real Business Needs",
    description: "Combine enterprise search, research, data analysis, and configured integrations within a governed technical architecture.",
    primaryCta: "Explore the Platform",
    secondaryCta: "Contact Us",
    primaryLink: "#architecture",
    secondaryLink: "#contact",
    image: "/images/esaa_agents_carousel_1791906900161.jpg",
    alt: "Enterprise technology environment with engineers and operations leaders collaborating"
  }
];

export const SOLUTION_CATEGORIES = [
  {
    id: "knowledge-search",
    name: "Enterprise Knowledge Search",
    title: "Instant, Verifiable Discovery Across Distributed Silos",
    description: "Empower cross-functional teams to query organizational wikis, ticketing platforms, emails, and repositories with hybrid BM25 and vector search. Every answer links directly to verified source documents.",
    bullets: [
      "Natural-language query comprehension with semantic reranking",
      "Direct citations and clickable source document references",
      "Permission-aware retrieval respecting user access rights"
    ],
    ctaText: "Explore Search Capabilities",
    ctaLink: "#capabilities",
    image: "/images/esaa_solutions_diagram_1791907508483.jpg",
    alt: "Knowledge workers collaborating over documentation in a modern conference room"
  },
  {
    id: "research",
    name: "Research and Investigation",
    title: "Deep Multi-Step Investigation with Gap Analysis",
    description: "Transform complex operational questions into structured executive briefs. ESAA breaks down inquiries into sub-queries, reconciles conflicting sources, and highlights information gaps.",
    bullets: [
      "Automated sub-query decomposition across multiple datasets",
      "Contradiction detection across dated policies or reports",
      "Executive synthesis with transparent evidentiary lineage"
    ],
    ctaText: "View Research Features",
    ctaLink: "#capabilities",
    image: "/images/esaa_deep_research_1791907538796.jpg",
    alt: "Business analyst carefully examining multi-source research findings on workstation"
  },
  {
    id: "data-analysis",
    name: "Data Analysis and Reporting",
    title: "Human-Led Statistical Insights & Living Documents",
    description: "Inspect, clean, and analyze enterprise spreadsheets with native Python execution. Generate statistical distributions, custom charts, and collaborative design specs without leaving your workspace.",
    bullets: [
      "Native Pandas and NumPy data cleaning in sandboxed containers",
      "Altair-generated dynamic charts and statistical distributions",
      "Collaborative document crafting with export to PDF and Markdown"
    ],
    ctaText: "Discover Data Crafting",
    ctaLink: "#analytics",
    image: "/images/esaa_craft_workspace_1791907457010.jpg",
    alt: "Finance analyst reviewing analytical reports and spreadsheets"
  },
  {
    id: "workflows",
    name: "Connected Business Workflows",
    title: "Bridging Departmental Boundaries with Governed Tools",
    description: "Streamline repetitive multi-system tasks. Connect ERP records to customer service tickets and project tasks while keeping human operators firmly in the approval loop.",
    bullets: [
      "Cross-system orchestration between SAP, ServiceNow, and Jira",
      "Mandatory human-in-the-loop confirmation before record updates",
      "Comprehensive telemetry tracking all tool invocations and outcomes"
    ],
    ctaText: "Explore Workflows",
    ctaLink: "#workflows",
    image: "/images/esaa_automation_sap_1791907675949.jpg",
    alt: "Cross-functional operations team aligning on multi-system business processes"
  },
  {
    id: "operational-intel",
    name: "Operational Intelligence",
    title: "Full-Stack Telemetry & Infrastructure Visibility",
    description: "Provide IT leaders and system administrators with granular visibility into search chunk indices, cluster health, storage load, and enterprise connector throughput.",
    bullets: [
      "Real-time OpenSearch cluster health and chunk count monitoring",
      "Connector synchronization status and background worker queues",
      "Granular token consumption budgets per business department"
    ],
    ctaText: "Inspect Operations",
    ctaLink: "#analytics",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
    alt: "IT infrastructure manager monitoring system telemetry and cluster metrics"
  },
  {
    id: "governance",
    name: "Security and Governance",
    title: "Enterprise Identity, RBAC & Synchronized Permissions",
    description: "Enforce strict security boundaries with SAML 2.0, SCIM, and Okta integration. ESAA synchronizes upstream Google Drive ACLs and Confluence permissions automatically.",
    bullets: [
      "Role-based access controls for Admins, Curators, and Basic Users",
      "Automatic synchronization of native upstream ACLs and space rights",
      "Automated PII masking and immutable query audit logs"
    ],
    ctaText: "Review Security Architecture",
    ctaLink: "#security",
    image: "/images/esaa_security_gov_1791907699338.jpg",
    alt: "Chief security officer and enterprise risk team evaluating access policies"
  }
];

export const CORE_CAPABILITIES = [
  {
    id: "search",
    title: "Unified Knowledge Search",
    badge: "Information Retrieval",
    description: "Natural-language queries across wikis, ticketing platforms, emails, code repositories, and ERP records backed by exact source citations.",
    techDetails: "Hybrid BM25 keyword search + dense vector embeddings with cross-encoder semantic reranking. Clickable document references and permission-filtered results.",
    image: "/images/esaa_solutions_diagram_1791907508483.jpg"
  },
  {
    id: "agents",
    title: "Specialized AI Agents",
    badge: "Configurable Personas",
    description: "Purpose-built personas for HR, IT Support, Sales, DevOps, and Legal teams with tailored system prompts, curated document sets, and strict tool boundaries.",
    techDetails: "Optional platform capability. Configurable temperature, dedicated system instructions, tool assignment, and curator-managed document scopes.",
    image: "/images/esaa_agents_carousel_1791906900161.jpg"
  },
  {
    id: "research",
    title: "Deep Research Engine",
    badge: "Multi-Step Synthesis",
    description: "Autonomous sub-query decomposition, multi-document navigation, contradiction resolution, and executive report synthesis with explicit evidence trails.",
    techDetails: "Iterative retrieval loop across disparate archives, gap identification, source reconciliation, and structured synthesis generation.",
    image: "/images/esaa_deep_research_1791907538796.jpg"
  },
  {
    id: "analytics",
    title: "Analytics & Dashboards",
    badge: "Operational Health",
    description: "Comprehensive operational dashboards tracking OpenSearch cluster health, chunk indices, MinIO storage load, connector status, and SAP/ITSM activity.",
    techDetails: "Dedicated /analytics dashboard endpoint delivering real-time telemetry, connector sync rates, processing queues, and token usage budgets.",
    image: "/images/esaa_craft_workspace_1791907457010.jpg"
  },
  {
    id: "actions",
    title: "Enterprise Actions",
    badge: "Tool Execution",
    description: "Authorized execution of enterprise operations including SAP sales-order lookups, business-partner checks, and ServiceNow incident triage.",
    techDetails: "Secure Tool Engine with OAuth2/API key delegation, strict schema validation, execution auditing, and mandatory human confirmation gates.",
    image: "/images/esaa_automation_sap_1791907675949.jpg"
  },
  {
    id: "crafting",
    title: "Document Crafting & Data Analysis",
    badge: "Living Canvas (/craft)",
    description: "Collaborative drafting workspace with sandboxed Python code execution for dataset inspection, Pandas/NumPy cleaning, and Altair chart visualization.",
    techDetails: "Interactive living document interface at /craft supporting markdown, diagrams, spreadsheet loading, and secure statistical calculation.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  }
];

export const STATISTICS = [
  {
    value: "5",
    label: "Architecture Layers",
    desc: "Frontend, Application & API, Data & Indexing, Workers, and Integrations"
  },
  {
    value: "50+",
    label: "Documented Connectors",
    desc: "Pre-engineered connectors across ERP, Storage, CRM, Code, and Chat"
  },
  {
    value: "3",
    label: "Documented User Roles",
    desc: "Admin, Curator, and Basic User with granular permission scopes"
  },
  {
    value: "4",
    label: "Model Ecosystem Categories",
    desc: "Cloud LLMs, Self-hosted LLMs, Embeddings, and Cross-Encoder Rerankers"
  }
];

export const USE_CASES = [
  {
    id: "it-ops",
    title: "IT Service Operations",
    subtitle: "Accelerated Incident Triage & Knowledge Surfacing",
    desc: "Enable level-1 and level-2 support engineers to instantly query thousands of ServiceNow incident tickets, post-mortem documents, and runbooks to resolve complex tickets faster.",
    impact: "Reduces duplicate incident tickets and surfaces resolution steps with source references.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "research-investigation",
    title: "Enterprise Research",
    subtitle: "Synthesizing Market Intelligence & Regulatory Files",
    desc: "Strategic teams analyze industry reports, legal filings, and internal memos to build evidence-backed executive briefings with clear contradiction flagging.",
    impact: "Eliminates manual document skimming across siloed internal SharePoint libraries.",
    image: "/images/esaa_deep_research_1791907538796.jpg"
  },
  {
    id: "business-ops",
    title: "Business Operations",
    subtitle: "SAP S/4HANA Sales & Partner Alignment",
    desc: "Sales and account teams query real-time order statuses, distribution channels, and business partner credit metrics without demanding ad-hoc report generation from IT.",
    impact: "Provides secure, read-only operational visibility into mission-critical ERP records.",
    image: "/images/esaa_automation_sap_1791907675949.jpg"
  },
  {
    id: "data-reporting",
    title: "Data and Reporting",
    subtitle: "Sandboxed Spreadsheet Cleaning & Visuals",
    desc: "Business analysts load complex CSV/Excel files into the living canvas (/craft), clean missing entries using Python Pandas, and export presentation-ready charts.",
    impact: "Empowers non-technical analysts to run verified statistical computations reliably.",
    image: "/images/esaa_craft_workspace_1791907457010.jpg"
  },
  {
    id: "knowledge-management",
    title: "Knowledge Management",
    subtitle: "Unified Search Across Disparate Repositories",
    desc: "New team members and department leads locate SOPs, architectural guidelines, and policy updates across Google Drive, Confluence, and Notion through one interface.",
    impact: "Unlocks historical organizational knowledge trapped inside decommissioned tools.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "tech-devops",
    title: "Technology and DevOps",
    subtitle: "Engineering Context Discovery Across Repositories",
    desc: "Software engineers locate architectural decision records (ADRs), pull request discussions, and incident retrospectives across GitHub, GitLab, and Jira.",
    impact: "Preserves technical context across teams and accelerates architectural reviews.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
  }
];

export const ARCHITECTURE_LAYERS = [
  {
    layer: "Layer 1",
    name: "Frontend and Client",
    tech: "Next.js 16 • React 19 • TypeScript • Tailwind CSS",
    components: [
      "Chat & Agent Workspace (/)",
      "Analytics Dashboard (/analytics)",
      "Canvas & Living Documents (/craft)",
      "Admin & Governance Panel (/admin)"
    ],
    desc: "High-performance enterprise interface delivering accessible workflows, real-time streaming, and responsive data visualizations."
  },
  {
    layer: "Layer 2",
    name: "Application and API",
    tech: "FastAPI • Python 3.13 • Pydantic",
    components: [
      "OAuth2, SAML 2.0, OIDC, and SCIM Identity Engine",
      "Agent & RAG Orchestration Framework",
      "Secure Tool Execution Engine with Schema Validation",
      "Rate Limiting & Token Budget Management"
    ],
    desc: "Asynchronous backend orchestrating user sessions, access control tokens, retrieval pipelines, and enterprise tool dispatches."
  },
  {
    layer: "Layer 3",
    name: "Data and Indexing",
    tech: "PostgreSQL • OpenSearch / Vespa • MinIO Object Storage",
    components: [
      "PostgreSQL: Relational metadata, user accounts, audit trails",
      "OpenSearch / Vespa: Hybrid vector & BM25 inverted indices",
      "MinIO / S3: Document blob storage and file chunks"
    ],
    desc: "Scalable persistence layer separating structured relational data, vector index search embeddings, and raw document binaries."
  },
  {
    layer: "Layer 4",
    name: "Asynchronous Workers",
    tech: "Celery Workers • Redis Cache & Message Broker",
    components: [
      "Document ingestion and parsing workers (PDF, DOCX, CSV)",
      "Embedding generation and chunking pipelines",
      "Periodic connector sync jobs and incremental scrapers"
    ],
    desc: "Decoupled background task workers ensuring that long-running file parsing and synchronization do not block live user queries."
  },
  {
    layer: "Layer 5",
    name: "Enterprise Integrations",
    tech: "SAP S/4HANA • ServiceNow • Cloud Repositories • Multi-LLM",
    components: [
      "SAP OData & RFC Sales Order operations",
      "ServiceNow REST Incident & Knowledge base sync",
      "Multi-provider LLM gateways (Cloud & Self-Hosted)",
      "Upstream ACL synchronization (Google Drive, Confluence)"
    ],
    desc: "External enterprise systems, identity providers, and vetted language model endpoints bound through governed connectors."
  }
];

export const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Discover",
    role: "User Initiated",
    desc: "A team member inputs a natural language question or selects a configured operational workflow."
  },
  {
    step: "02",
    title: "Retrieve",
    role: "Hybrid Search",
    desc: "The platform queries connected sources via hybrid BM25 and vector search, filtered by user permissions."
  },
  {
    step: "03",
    title: "Analyze",
    role: "Evidence Structuring",
    desc: "The platform synthesizes findings, detects contradictions across documents, and notes missing information."
  },
  {
    step: "04",
    title: "Review",
    role: "Human Decision Point",
    desc: "The user reviews clickable source references, inspecting raw excerpts before taking action."
  },
  {
    step: "05",
    title: "Act",
    role: "Authorized Execution",
    desc: "With explicit human approval, authorized enterprise operations (e.g. SAP order, ServiceNow ticket) proceed."
  }
];

export const CONNECTORS_DATA = [
  // Enterprise & ERP
  { name: "SAP S/4HANA", category: "Enterprise & ERP", status: "Supported", auth: "OAuth2 / Basic / RFC", desc: "Sales orders, business partner lookups, distribution channels" },
  { name: "ServiceNow", category: "Enterprise & ERP", status: "Supported", auth: "OAuth2 / REST API", desc: "Incident triage, change requests, knowledge-article sync" },
  
  // Files & Cloud Storage
  { name: "Local File / Directory", category: "Files & Storage", status: "Supported", auth: "Filesystem Path", desc: "Local folder parsing (PDF, DOCX, CSV, TXT, Markdown)" },
  { name: "Google Drive", category: "Files & Storage", status: "Supported", auth: "Google OAuth / Service Account", desc: "Docs, Sheets, Slides, Drive folder sync with ACL inheritance" },
  { name: "Microsoft SharePoint", category: "Files & Storage", status: "Supported", auth: "Microsoft Graph / Entra ID", desc: "SharePoint sites, document libraries, list attachments" },
  { name: "OneDrive", category: "Files & Storage", status: "Supported", auth: "Microsoft Graph", desc: "Personal and enterprise OneDrive cloud directories" },
  { name: "Amazon S3", category: "Files & Storage", status: "Supported", auth: "AWS IAM / STS", desc: "Bucket object traversal, prefix filtering, automated ingestion" },
  { name: "Cloudflare R2", category: "Files & Storage", status: "Supported", auth: "S3-Compatible API Key", desc: "Edge storage bucket synchronization with zero egress costs" },
  { name: "Google Cloud Storage", category: "Files & Storage", status: "Supported", auth: "GCP Service Account", desc: "GCS bucket ingestion with lifecycle event triggers" },
  { name: "Box", category: "Files & Storage", status: "Supported", auth: "Box OAuth2 / JWT", desc: "Enterprise Box folder hierarchies and permission mapping" },
  { name: "Dropbox", category: "Files & Storage", status: "Supported", auth: "Dropbox OAuth2", desc: "Team folders and shared links synchronization" },
  { name: "Egnyte", category: "Files & Storage", status: "Supported", auth: "Egnyte API Key", desc: "Hybrid cloud file server and document repository ingestion" },
  { name: "OCI Storage", category: "Files & Storage", status: "Supported", auth: "Oracle Cloud IAM", desc: "Oracle Cloud Infrastructure Object Storage buckets" },

  // Communication & Messaging
  { name: "Slack", category: "Communication", status: "Supported", auth: "Slack Bot Token / OAuth", desc: "Public/private channels, thread replies, user ACL mapping" },
  { name: "Microsoft Teams", category: "Communication", status: "Supported", auth: "Graph API / Delegated", desc: "Team channel messages, chat threads, meeting transcripts" },
  { name: "Discord", category: "Communication", status: "Supported", auth: "Discord Bot Token", desc: "Server text channels and structured forum posts" },
  { name: "Zulip", category: "Communication", status: "Supported", auth: "Zulip API Key", desc: "Stream and topic-based message thread archives" },

  // Knowledge Bases & Docs
  { name: "Confluence", category: "Knowledge Bases", status: "Supported", auth: "Atlassian API Token", desc: "Space documents, child page hierarchies, space permission sync" },
  { name: "Notion", category: "Knowledge Bases", status: "Supported", auth: "Notion Integration Token", desc: "Databases, wiki pages, toggle blocks, and page metadata" },
  { name: "BookStack", category: "Knowledge Bases", status: "Supported", auth: "Token ID & Secret", desc: "Shelves, books, chapters, and markdown page content" },
  { name: "Outline", category: "Knowledge Bases", status: "Supported", auth: "API Key", desc: "Team collections and markdown wiki documents" },
  { name: "Guru", category: "Knowledge Bases", status: "Supported", auth: "Guru API Token", desc: "Verification cards, collections, and knowledge boards" },
  { name: "Slab", category: "Knowledge Bases", status: "Supported", auth: "Slab API Token", desc: "Topic organization, posts, and team handbook sync" },
  { name: "Coda", category: "Knowledge Bases", status: "Supported", auth: "Coda API Token", desc: "Doc tables, canvas documents, and team formulas" },
  { name: "Document360", category: "Knowledge Bases", status: "Supported", auth: "API Key", desc: "Customer-facing and internal documentation knowledge bases" },
  { name: "Axero", category: "Knowledge Bases", status: "Supported", auth: "REST API Key", desc: "Intranet portal content, wikis, and team blogs" },
  { name: "LumApps", category: "Knowledge Bases", status: "Supported", auth: "OAuth2", desc: "Social intranet and digital workplace CMS articles" },
  { name: "Drupal Wiki", category: "Knowledge Bases", status: "Supported", auth: "REST Services API", desc: "Enterprise wiki documentation and versioned revisions" },
  { name: "MediaWiki / Wikipedia", category: "Knowledge Bases", status: "Supported", auth: "MediaWiki Action API", desc: "Internal corporate MediaWiki installations and categories" },

  // Project Management & Issue Tracking
  { name: "Jira", category: "Project Management", status: "Supported", auth: "Atlassian API Token", desc: "Issues, epics, sprint boards, issue links, comments" },
  { name: "Linear", category: "Project Management", status: "Supported", auth: "Linear API Key", desc: "Issue tracking, projects, cycles, and markdown descriptions" },
  { name: "Asana", category: "Project Management", status: "Supported", auth: "Personal Access Token", desc: "Portfolios, projects, tasks, custom fields, and milestones" },
  { name: "ClickUp", category: "Project Management", status: "Supported", auth: "ClickUp API Key", desc: "Spaces, folders, lists, tasks, and attached docs" },
  { name: "Productboard", category: "Project Management", status: "Supported", auth: "Productboard API Key", desc: "Feature roadmaps, customer insights, and component tags" },
  { name: "TestRail", category: "Project Management", status: "Supported", auth: "TestRail Basic Auth", desc: "Test cases, test suites, execution runs, and defects" },

  // Code Repositories & DevOps
  { name: "GitHub", category: "DevOps & Code", status: "Supported", auth: "GitHub App / PAT", desc: "Repositories, pull requests, issues, discussions, markdown docs" },
  { name: "GitLab", category: "DevOps & Code", status: "Supported", auth: "GitLab Personal Token", desc: "Group projects, merge requests, wikis, snippet repositories" },
  { name: "Bitbucket", category: "DevOps & Code", status: "Supported", auth: "Bitbucket App Password", desc: "Repositories, pull requests, branch reviews, commit comments" },

  // CRM & Customer Support
  { name: "Salesforce", category: "CRM & Support", status: "Supported", auth: "Salesforce Connected App", desc: "Accounts, opportunities, cases, contacts, knowledge base" },
  { name: "HubSpot", category: "CRM & Support", status: "Supported", auth: "Private App Token", desc: "Contacts, company records, deals, and ticket conversations" },
  { name: "Zendesk", category: "CRM & Support", status: "Supported", auth: "Zendesk API Token", desc: "Support tickets, user comments, macros, Zendesk Guide articles" },
  { name: "Freshdesk", category: "CRM & Support", status: "Supported", auth: "Freshdesk API Key", desc: "Helpdesk tickets, satisfaction surveys, solutions articles" },
  { name: "Gong", category: "CRM & Support", status: "Supported", auth: "Gong API Key", desc: "Sales call recordings, transcripts, and account trackers" },
  { name: "Highspot", category: "CRM & Support", status: "Supported", auth: "Highspot API Key", desc: "Sales enablement collateral, pitch analytics, and playbooks" },
  { name: "Loopio", category: "CRM & Support", status: "Supported", auth: "Loopio API Token", desc: "RFP response archives and proposal content libraries" },

  // Email & Community
  { name: "Gmail", category: "Email & Community", status: "Supported", auth: "Google OAuth2", desc: "Subject lines, email bodies, thread replies, attachments" },
  { name: "IMAP", category: "Email & Community", status: "Supported", auth: "SSL/TLS Credentials", desc: "Standard mail server folder traversal and message indexing" },
  { name: "Fireflies.ai", category: "Email & Community", status: "Supported", auth: "Fireflies API Key", desc: "Meeting transcriptions, audio summaries, speaker tags" },
  { name: "Discourse", category: "Email & Community", status: "Supported", auth: "Discourse API Key", desc: "Community categories, topics, posts, and solutions" },
  { name: "XenForo", category: "Email & Community", status: "Supported", auth: "REST API Key", desc: "Discussion forum nodes, threads, and user posts" },

  // Custom Ingestion
  { name: "Ingestion API", category: "Custom Ingestion", status: "Supported", auth: "Bearer Token", desc: "REST payload submission for custom JSON/metadata streams" },
  { name: "Web Crawler", category: "Custom Ingestion", status: "Supported", auth: "Domain Allowlist", desc: "Configurable recursive crawler respecting robots.txt" }
];

export const TECH_STACK_GROUPS = [
  {
    category: "Frontend",
    desc: "Client workspace, living canvas, and administrative interfaces",
    items: [
      { name: "Next.js", desc: "Server-rendered & static React application architecture" },
      { name: "React", desc: "Component-driven reactive user experience" },
      { name: "TypeScript", desc: "End-to-end type safety and compile-time verification" },
      { name: "Tailwind CSS", desc: "Utility-first design tokens and responsive layouts" }
    ]
  },
  {
    category: "Backend & API",
    desc: "Asynchronous API layer, tool engine, and RAG orchestrator",
    items: [
      { name: "FastAPI", desc: "High-performance asynchronous Python web framework" },
      { name: "Python", desc: "Modern runtime for data engineering and AI orchestration" },
      { name: "Pydantic", desc: "Strict schema validation and data serialization" }
    ]
  },
  {
    category: "Data & Indexing",
    desc: "Scalable relational data, vector search, and object blob persistence",
    items: [
      { name: "PostgreSQL", desc: "Relational persistence for user accounts and audit logs" },
      { name: "OpenSearch", desc: "Distributed inverted index and k-NN vector search engine" },
      { name: "Vespa", desc: "High-scale vector search and semantic ranking engine" },
      { name: "MinIO", desc: "S3-compatible high-performance object storage" }
    ]
  },
  {
    category: "Background Processing",
    desc: "Decoupled asynchronous document parsing and ingestion pipelines",
    items: [
      { name: "Celery", desc: "Distributed task queue for asynchronous file ingestion" },
      { name: "Redis", desc: "In-memory message broker, task lock, and session cache" }
    ]
  },
  {
    category: "Language Models",
    desc: "Supported multi-provider cloud and self-hosted model engines",
    items: [
      { name: "OpenAI", desc: "GPT-4o, GPT-4o-mini, o1, o3-mini (source-documented)" },
      { name: "Anthropic", desc: "Claude 3.5 Sonnet, Claude 3 Haiku, Claude 3 Opus" },
      { name: "Google Gemini", desc: "Gemini 1.5 Pro, Gemini 2.0 Flash via Vertex/AI Studio" },
      { name: "Microsoft Azure OpenAI", desc: "Enterprise isolated OpenAI deployments with VNet peering" },
      { name: "AWS Bedrock", desc: "Governed model invocation across Amazon foundation models" },
      { name: "Ollama / vLLM", desc: "On-premise self-hosted Llama 3 and Mistral execution" },
      { name: "LiteLLM Proxy", desc: "Unified routing proxy across multiple model endpoints" }
    ]
  },
  {
    category: "Embedding Models",
    desc: "Dense semantic representation of documents and search queries",
    items: [
      { name: "Voyage AI", desc: "High-precision enterprise embedding models" },
      { name: "Cohere Embed", desc: "Multilingual semantic vector embeddings" },
      { name: "OpenAI Embeddings", desc: "text-embedding-3-small and text-embedding-3-large" },
      { name: "Hugging Face", desc: "Open-source sentence-transformers for air-gapped clusters" }
    ]
  },
  {
    category: "Reranking Models",
    desc: "Cross-encoder scoring to optimize retrieval relevance",
    items: [
      { name: "Cohere Rerank", desc: "State-of-the-art multilingual semantic reranker" },
      { name: "Mixedbread AI Rerank", desc: "High-speed cross-encoder reranking model" },
      { name: "BAAI BGE-Reranker", desc: "Self-hostable dense reranker for on-premise clusters" }
    ]
  }
];

export const SECURITY_ROLES = [
  {
    role: "Admin",
    badge: "Full Control",
    scope: "Platform Operations & Policy",
    permissions: [
      "System-wide configuration & environment settings",
      "Enterprise connector setup & credential management",
      "User provisioning, role assignment & SCIM directory sync",
      "Global API keys & department token quota management",
      "Complete immutable audit log inspection & export"
    ]
  },
  {
    role: "Curator",
    badge: "Domain Management",
    scope: "Knowledge & Agent Scopes",
    permissions: [
      "Document set curation & ingestion scheduling",
      "Specialized AI agent persona configuration",
      "Prompt template management for assigned business units",
      "Knowledge collection indexing and chunk review",
      "Team-level search performance inspection"
    ]
  },
  {
    role: "Basic User",
    badge: "Standard Access",
    scope: "Knowledge Consumer & Operator",
    permissions: [
      "Natural-language search across authorized document sets",
      "Interactive chat with assigned agent personas",
      "Personal document uploads within private sandbox",
      "Living document crafting at /craft",
      "Explicit confirmation of authorized enterprise tool actions"
    ]
  }
];

export const NEWS_INSIGHTS = [
  {
    id: 1,
    title: "Making Enterprise Knowledge Easier to Discover",
    category: "Knowledge Engineering",
    readTime: "5 min read",
    date: "October 2026",
    summary: "Why traditional keyword search fails modern organizations, and how hybrid BM25 and dense vector embeddings with cross-encoder reranking bridge the gap between unstructured documents and human specialists.",
    fullContent: `Modern organizations generate terabytes of unstructured documentation every week across wikis, messaging apps, and ticket queues. Keyword-only search algorithms fail when terminology evolves or when queries express concepts rather than literal words.

ESAA implements a dual-retrieval pipeline:
1. Lexical BM25 retrieval captures exact technical identifiers, error codes, and customer account numbers.
2. Dense semantic embeddings project documents into multi-dimensional meaning space, capturing contextual intent.
3. A cross-encoder reranker scores the combined candidate set, presenting the most pertinent passages alongside direct citations.

This ensures that knowledge workers find verified facts in seconds rather than spending hours cross-referencing outdated wikis.`,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Building Trustworthy Retrieval-Augmented Generation",
    category: "Architecture & RAG",
    readTime: "6 min read",
    date: "October 2026",
    summary: "Eliminating generative hallucinations through rigorous citation lineage, confidence scoring, and explicit source verification before enterprise output synthesis.",
    fullContent: `Generative language models produce compelling prose, but enterprise environments demand strict truthfulness. Fabricated answers in financial reporting or IT operations can result in costly missteps.

Trustworthy RAG in ESAA is grounded in three architectural guardrails:
- Source-Grounded Prompting: The language model is constrained to facts explicitly present within retrieved document chunks.
- Inline Hyperlinked Citations: Every claim maps directly back to the source page and paragraph.
- Contradiction Detection: When two internal documents disagree (such as a 2024 policy vs a 2026 revision), the system flags the discrepancy to the human reviewer rather than guessing.`,
    image: "/images/esaa_deep_research_1791907538796.jpg"
  },
  {
    id: 3,
    title: "Connected Data and Better Business Analysis",
    category: "Data Operations",
    readTime: "4 min read",
    date: "September 2026",
    summary: "How sandboxed Python execution within collaborative document canvases allows business teams to inspect, clean, and visualize complex spreadsheets securely.",
    fullContent: `Spreadsheets remain the lifeblood of business operations. However, disparate column headers, missing values, and ad-hoc calculations frequently lead to reporting discrepancies.

ESAA introduces the Living Document Canvas (/craft), pairing natural language instructions with sandboxed Python code execution:
- Automated Data Cleaning: Pandas routines identify anomalies, null entries, and format mismatches.
- Verified Statistical Summaries: NumPy calculations provide accurate medians, standard deviations, and quartile splits.
- Dynamic Visuals: Declarative Altair charts render interactive visualizations that can be directly exported into executive slide decks.`,
    image: "/images/esaa_craft_workspace_1791907457010.jpg"
  },
  {
    id: 4,
    title: "Practical Enterprise AI Governance",
    category: "Security & Compliance",
    readTime: "7 min read",
    date: "September 2026",
    summary: "A practical blueprint for integrating enterprise identity providers, synchronizing upstream ACLs, and auditing LLM telemetry without stifling workplace productivity.",
    fullContent: `Security leaders often fear that enterprise AI platforms will expose confidential files to unauthorized employees. If an executive compensation memo is indexed, can an entry-level worker discover it?

ESAA eliminates this risk through Upstream Permission Synchronization:
- Native ACL Mapping: Access permissions from Google Drive, Confluence spaces, and Slack channels are mirrored in real time.
- Pre-Filtering at Query Time: Search results are filtered before document chunks enter the prompt context.
- PII Masking: Personal identifiable information is masked before hitting external model gateways.
- Audit Telemetry: Every query, generated answer, and tool execution is immutably logged for governance review.`,
    image: "/images/esaa_security_gov_1791907699338.jpg"
  },
  {
    id: 5,
    title: "Designing Human-Centered AI Workflows",
    category: "Design & UX",
    readTime: "5 min read",
    date: "August 2026",
    summary: "Why the most successful enterprise platforms prioritize human oversight, thoughtful review interfaces, and operator autonomy over full automation.",
    fullContent: `The greatest gains from artificial intelligence emerge when technology empowers human experts rather than attempting to replace them. In complex business domains—such as SAP procurement or IT outage management—contextual nuance matters.

ESAA's design philosophy centers on:
- Human-in-the-Loop Decision Gates: Critical actions require explicit operator review.
- Explainable Intermediates: Showing the steps, references, and logic behind recommendations.
- Accessible Interfaces: Clean typography, intuitive controls, and distraction-free layouts that respect the professional user's focus.`,
    image: "/images/esaa_hero_enterprise_1791906875872.jpg"
  }
];
