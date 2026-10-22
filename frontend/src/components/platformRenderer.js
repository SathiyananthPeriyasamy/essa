// Platform Views & Dropdown Renderer for ESAA
import { PLATFORM_GROUPS, PLATFORM_ITEMS, PLATFORM_OVERVIEW_DATA, getPlatformItemBySlug } from '../data/platform.js';

// Lucide-style clean SVG icons
export function getLucideSvg(iconName, width = 18, height = 18, strokeWidth = 1.9) {
  switch (iconName) {
    case 'layers':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`;
    case 'shield-check':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`;
    case 'cpu':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="15" x2="23" y2="15"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="15" x2="4" y2="15"></line></svg>`;
    case 'activity':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>`;
    case 'server':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`;
    case 'search':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`;
    case 'file-check':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><path d="m9 15 2 2 4-4"></path></svg>`;
    case 'message-square':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    case 'file-edit':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`;
    case 'upload-cloud':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>`;
    case 'user-check':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>`;
    case 'compass':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>`;
    case 'git-branch':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9a9 9 0 0 1-9 9"></path></svg>`;
    case 'book-open':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
    case 'database':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
    case 'life-buoy':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line><line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line><line x1="14.83" y1="9.17" x2="19.07" y2="4.93"></line><line x1="4.93" y1="19.07" x2="9.17" y2="14.83"></line></svg>`;
    case 'plug':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"></path><path d="M9 8V2"></path><path d="M15 2v6"></path><path d="M18 8v5a6 6 0 0 1-12 0V8z"></path></svg>`;
    case 'code':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    case 'terminal':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`;
    case 'bot':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8.01" y2="16"></line><line x1="16" y1="16" x2="16.01" y2="16"></line></svg>`;
    case 'network':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="2" width="6" height="6" rx="1"></rect><rect x="16" y="16" width="6" height="6" rx="1"></rect><rect x="2" y="16" width="6" height="6" rx="1"></rect><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"></path><path d="M12 12V8"></path></svg>`;
    case 'tools':
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg>`;
    default:
      return `<svg width="${width}" height="${height}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${strokeWidth}"><circle cx="12" cy="12" r="9"></circle></svg>`;
  }
}

// 1. RENDER PLATFORM DROPDOWN (Complete Replacement)
export function renderPlatformDropdown() {
  const assistantItems = PLATFORM_ITEMS.filter(i => i.group === PLATFORM_GROUPS.ASSISTANT);
  const agentItems = PLATFORM_ITEMS.filter(i => i.group === PLATFORM_GROUPS.AGENTS);
  const actionItems = PLATFORM_ITEMS.filter(i => i.group === PLATFORM_GROUPS.ACTIONS);

  return `
    <div class="platform-nav-dropdown">
      <!-- Left Column: Feature card & Small Groups -->
      <div class="platform-nav-left">
        <!-- Feature Card: Soft blue to pink gradient block -->
        <a href="/platform/overview" class="platform-feature-card" title="See how ESAA works across your enterprise">
          <div class="platform-feature-gradient">
            <div class="platform-feature-card-glow"></div>
            <div class="platform-feature-card-badge">Platform Overview</div>
          </div>
          <div class="platform-feature-info">
            <div class="platform-feature-title">Platform overview</div>
            <div class="platform-feature-sub">See how ESAA works across your enterprise &rarr;</div>
          </div>
        </a>

        <div class="platform-built-label">Built for enterprise AI.</div>

        <div class="platform-tree-groups">
          <!-- Enterprise Context -->
          <div class="platform-tree-group">
            <div class="platform-group-header">Enterprise Context</div>
            <ul class="platform-indented-list">
              <li>
                <a href="/platform/50-enterprise-connectors" class="platform-sublink" title="Continuous sync across ERP, storage, communication, and engineering wikis">
                  <span class="tree-bullet">└</span>
                  <span>50+ Enterprise Connectors</span>
                </a>
              </li>
              <li>
                <a href="/platform/document-level-acls" class="platform-sublink" title="Inherit file-level permissions directly from source repositories">
                  <span class="tree-bullet">└</span>
                  <span>Document-Level ACLs</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Intelligence & Control -->
          <div class="platform-tree-group">
            <div class="platform-group-header">Intelligence & Control</div>
            <ul class="platform-indented-list">
              <li>
                <a href="/platform/model-agnostic-gateway" class="platform-sublink" title="Swap dynamically between OpenAI, Anthropic, Gemini, Bedrock, and self-hosted models">
                  <span class="tree-bullet">└</span>
                  <span>Model-Agnostic Gateway</span>
                </a>
              </li>
              <li>
                <a href="/platform/observability-evals" class="platform-sublink" title="Measure retrieval recall, precision, latency, and model accuracy at enterprise scale">
                  <span class="tree-bullet">└</span>
                  <span>Observability &amp; Evals</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Deployment -->
          <div class="platform-tree-group">
            <div class="platform-group-header">Deployment</div>
            <ul class="platform-indented-list">
              <li>
                <a href="/platform/deployment-options" class="platform-sublink" title="Run on-premises with Helm/Kubernetes, or use Lite Mode (under 1GB RAM)">
                  <span class="tree-bullet">└</span>
                  <span>Deployment Options</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Thin Vertical Divider -->
      <div class="platform-nav-divider" aria-hidden="true"></div>

      <!-- Right Area: 3 Columns + Bottom Strip -->
      <div class="platform-nav-right">
        <div class="platform-nav-columns">
          <!-- Column 1: ESAA Assistant -->
          <div class="platform-nav-col">
            <div class="platform-col-head">
              <div class="platform-icon-square" aria-hidden="true">
                ${getLucideSvg('bot', 20, 20, 2)}
              </div>
              <div class="platform-col-meta">
                <div class="platform-col-title">ESAA Assistant</div>
                <div class="platform-col-sub">Your enterprise AI coworker</div>
              </div>
            </div>
            <ul class="platform-items-list">
              ${assistantItems.map(item => `
                <li>
                  <a href="/platform/${item.slug}" class="platform-item-link" title="${item.tooltip}">
                    <span class="platform-item-icon">${getLucideSvg(item.icon, 16, 16)}</span>
                    <span class="platform-item-name">${item.title}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Column 2: ESAA Agents -->
          <div class="platform-nav-col">
            <div class="platform-col-head">
              <div class="platform-icon-square" aria-hidden="true">
                ${getLucideSvg('network', 20, 20, 2)}
              </div>
              <div class="platform-col-meta">
                <div class="platform-col-title">ESAA Agents</div>
                <div class="platform-col-sub">Build and manage agents</div>
              </div>
            </div>
            <ul class="platform-items-list">
              ${agentItems.map(item => `
                <li>
                  <a href="/platform/${item.slug}" class="platform-item-link" title="${item.tooltip}">
                    <span class="platform-item-icon">${getLucideSvg(item.icon, 16, 16)}</span>
                    <span class="platform-item-name">${item.title}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Column 3: Actions & Tools -->
          <div class="platform-nav-col">
            <div class="platform-col-head">
              <div class="platform-icon-square" aria-hidden="true">
                ${getLucideSvg('tools', 20, 20, 2)}
              </div>
              <div class="platform-col-meta">
                <div class="platform-col-title">Actions &amp; Tools</div>
                <div class="platform-col-sub">Do work in your systems</div>
              </div>
            </div>
            <ul class="platform-items-list">
              ${actionItems.map(item => `
                <li>
                  <a href="/platform/${item.slug}" class="platform-item-link" title="${item.tooltip}">
                    <span class="platform-item-icon">${getLucideSvg(item.icon, 16, 16)}</span>
                    <span class="platform-item-name">${item.title}</span>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
        </div>

        <!-- Bottom Strip -->
        <a href="/platform/deployment-options" class="platform-nav-bottom-strip" title="Explore sovereign deployment options">
          <div class="platform-bottom-strip-content">
            <span class="platform-pill-badge">Featured</span>
            <span class="platform-bottom-bold">Sovereign deployment</span>
            <span class="platform-bottom-grey">Run on-premises with Helm, or use Lite Mode (under 1GB RAM) &rarr;</span>
          </div>
        </a>
      </div>
    </div>
  `;
}

// 2. RENDER PLATFORM OVERVIEW PAGE
export function renderPlatformOverviewPage() {
  const d = PLATFORM_OVERVIEW_DATA;

  return `
    <div class="platform-page-container platform-overview-page">
      <!-- Breadcrumb -->
      <nav class="platform-breadcrumb" aria-label="Breadcrumb">
        <a href="/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">Platform Overview</span>
      </nav>

      <!-- Hero Header -->
      <header class="platform-page-header">
        <h1 class="platform-page-h1">${d.title}</h1>
        <p class="platform-page-lead">${d.lead}</p>
        <div class="platform-header-actions">
          <button class="btn btn-primary demo-trigger-btn">Get a demo</button>
          <a href="/platform/50-enterprise-connectors" class="btn btn-outline">See all connectors &rarr;</a>
        </div>
      </header>

      <!-- Table: Five challenges, five answers -->
      <section class="platform-section platform-table-section">
        <div class="platform-section-header">
          <h2 class="platform-section-title">Five challenges, five answers</h2>
          <p class="platform-section-sub">How ESAA eliminates the core operational hurdles in enterprise generative AI.</p>
        </div>

        <div class="platform-table-wrapper">
          <table class="platform-challenges-table">
            <thead>
              <tr>
                <th scope="col" style="width: 32%;">Business Challenge</th>
                <th scope="col" style="width: 34%;">The Platform Solution</th>
                <th scope="col" style="width: 34%;">Client Benefit</th>
              </tr>
            </thead>
            <tbody>
              ${d.challengesAnswers.map(row => `
                <tr>
                  <td class="col-challenge"><strong>${row.challenge}</strong></td>
                  <td class="col-solution">${row.solution}</td>
                  <td class="col-benefit">${row.benefit}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- 8 Pillar Cards -->
      <section class="platform-section platform-pillars-section">
        <div class="platform-section-header">
          <h2 class="platform-section-title">Eight Core Pillars of the Platform</h2>
          <p class="platform-section-sub">Engineered from ground up for enterprise governance, retrieval recall, and transactional execution.</p>
        </div>

        <div class="platform-pillars-grid">
          ${d.pillars.map((p, idx) => `
            <a href="/platform/${p.slug}" class="platform-pillar-card" style="--card-index: ${idx};" title="${p.title}">
              <div class="pillar-card-glow-bar" aria-hidden="true"></div>
              <div class="pillar-card-top">
                <div class="pillar-card-badges">
                  <span class="pillar-card-num">${p.number}</span>
                  ${p.tag ? `<span class="pillar-card-tag">${p.tag}</span>` : ''}
                </div>
                <div class="pillar-card-icon" aria-hidden="true">
                  ${getLucideSvg(p.icon || 'layers', 18, 18, 2)}
                </div>
              </div>
              <h3 class="pillar-card-title">${p.title}</h3>
              <p class="pillar-card-desc">${p.desc}</p>
              <div class="pillar-card-arrow">
                <span class="arrow-text">Learn more</span>
                <span class="arrow-symbol">&rarr;</span>
              </div>
            </a>
          `).join('')}
        </div>
      </section>

      <!-- How the layers connect (5 rows) -->
      <section class="platform-section platform-architecture-section">
        <div class="platform-section-header">
          <h2 class="platform-section-title">How the layers connect</h2>
          <p class="platform-section-sub">Unified 5-tier architecture connecting enterprise interfaces to internal business databases.</p>
        </div>

        <div class="platform-layers-stack">
          ${d.layers.map((l, index) => `
            <div class="platform-layer-row" style="--layer-order: ${index};">
              <div class="layer-badge">${index + 1}</div>
              <div class="layer-content">
                <div class="layer-name">${l.layer}</div>
                <div class="layer-components">${l.components}</div>
                <div class="layer-desc">${l.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Short Closing Paragraph -->
      <section class="platform-closing-section">
        <div class="platform-closing-card">
          <p class="platform-closing-text">${d.closing}</p>
        </div>
      </section>

      <!-- Demo CTA Band -->
      <section class="platform-cta-band">
        <div class="platform-cta-inner">
          <div>
            <h2 class="platform-cta-title">Ready to evaluate ESAA for your organization?</h2>
            <p class="platform-cta-sub">Schedule a 30-minute architectural walkthrough with our engineering team.</p>
          </div>
          <div>
            <button class="btn btn-primary btn-lg demo-trigger-btn">Get a demo</button>
          </div>
        </div>
      </section>
    </div>
  `;
}

// 3. RENDER DETAIL PAGE (One reusable data-driven template for all 20 pages)
export function renderPlatformDetailPage(item) {
  // Related items
  const relatedItems = (item.relatedSlugs || [])
    .map(slug => getPlatformItemBySlug(slug))
    .filter(Boolean);

  return `
    <div class="platform-page-container platform-detail-page">
      <!-- Breadcrumb: Home / Platform / Group -->
      <nav class="platform-breadcrumb" aria-label="Breadcrumb">
        <a href="/" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-sep">/</span>
        <a href="/platform/overview" class="breadcrumb-link">Platform</a>
        <span class="breadcrumb-sep">/</span>
        <span class="breadcrumb-current">${item.group}</span>
      </nav>

      <div class="platform-detail-layout">
        <!-- Main Content Area -->
        <article class="platform-detail-main">
          <header class="detail-article-header">
            <span class="platform-group-tag">${item.group}</span>
            <h1 class="platform-detail-h1">${item.title}</h1>
            <p class="platform-detail-lead">${item.lead}</p>
          </header>

          <!-- Section 1: Overview -->
          <section class="detail-section" id="detail-overview">
            <h2 class="detail-section-heading">Overview</h2>
            <div class="detail-overview-body">
              <p>${item.overview}</p>
            </div>
          </section>

          <!-- Section 2: Key capabilities (3 bullets) -->
          <section class="detail-section" id="detail-capabilities">
            <h2 class="detail-section-heading">Key capabilities</h2>
            <ul class="detail-capabilities-list">
              ${item.capabilities.map(cap => `
                <li class="detail-capability-item">
                  <span class="capability-check">${getLucideSvg('shield-check', 16, 16)}</span>
                  <span>${cap}</span>
                </li>
              `).join('')}
            </ul>
          </section>

          <!-- Section 3: Related pages -->
          <section class="detail-section" id="detail-related">
            <h2 class="detail-section-heading">Related pages</h2>
            <div class="detail-related-grid">
              ${relatedItems.map(rel => `
                <a href="/platform/${rel.slug}" class="detail-related-card" title="${rel.title}">
                  <div class="related-card-top">
                    <span class="related-icon">${getLucideSvg(rel.icon, 18, 18)}</span>
                    <span class="related-group">${rel.group}</span>
                  </div>
                  <h3 class="related-card-title">${rel.title}</h3>
                  <p class="related-card-lead">${rel.lead}</p>
                  <div class="related-card-link">View details &rarr;</div>
                </a>
              `).join('')}
            </div>
          </section>
        </article>

        <!-- Sticky Sidebar: On this page -->
        <aside class="platform-detail-sidebar" aria-label="Page navigation">
          <div class="platform-sidebar-sticky">
            <div class="sidebar-toc-card">
              <div class="sidebar-toc-title">On this page</div>
              <ul class="sidebar-toc-list">
                <li>
                  <button type="button" class="sidebar-toc-btn is-active" data-scroll-to="detail-overview">
                    Overview
                  </button>
                </li>
                <li>
                  <button type="button" class="sidebar-toc-btn" data-scroll-to="detail-capabilities">
                    Key capabilities
                  </button>
                </li>
                <li>
                  <button type="button" class="sidebar-toc-btn" data-scroll-to="detail-related">
                    Related pages
                  </button>
                </li>
              </ul>
            </div>

            <!-- Questions? Want a demo? Card -->
            <div class="sidebar-demo-card">
              <div class="sidebar-demo-icon">${getLucideSvg('bot', 24, 24)}</div>
              <div class="sidebar-demo-title">Questions? Want a demo?</div>
              <p class="sidebar-demo-desc">Speak directly with an enterprise solutions architect to evaluate ESAA for your architecture.</p>
              <button class="btn btn-primary btn-block demo-trigger-btn">Get a demo</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}
