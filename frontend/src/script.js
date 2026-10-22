/**
 * ESAA Enterprise AI Platform — Production Vanilla JavaScript
 */
import { initConnectorsCard } from './components/ConnectorsAnimatedCard.js';
import { initSecurityTabs } from './components/SecurityTabs.js';
import { renderPlatformDropdown, renderPlatformOverviewPage, renderPlatformDetailPage } from './components/platformRenderer.js';
import { getPlatformItemBySlug } from './data/platform.js';

function initActionsCarousel() {
  const actionsSection = document.getElementById('actions');
  const track = document.getElementById('actions-carousel-track');
  const prevBtn = document.getElementById('actions-prev-btn');
  const nextBtn = document.getElementById('actions-next-btn');
  const counter = document.getElementById('actions-counter');
  if (!actionsSection || !track) return;

  const cards = track.querySelectorAll('.action-card');
  if (!cards.length) return;

  function getStep() {
    const firstCard = cards[0];
    const gap = parseFloat(window.getComputedStyle(track).gap) || 16;
    return firstCard.offsetWidth + gap;
  }

  // Arrow button clicks
  prevBtn?.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  nextBtn?.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  });

  // Counter and button states
  function updateState() {
    const step = getStep();
    const scrollLeft = track.scrollLeft;
    const maxScroll = track.scrollWidth - track.clientWidth;

    const currentIndex = Math.min(cards.length, Math.max(1, Math.round(scrollLeft / step) + 1));
    if (counter) {
      counter.textContent = `${String(currentIndex).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    }

    if (prevBtn) {
      prevBtn.disabled = scrollLeft <= 4;
    }
    if (nextBtn) {
      nextBtn.disabled = scrollLeft >= maxScroll - 4;
    }
  }

  track.addEventListener('scroll', updateState, { passive: true });
  window.addEventListener('resize', updateState);
  updateState();

  // Mouse drag support
  let isDragging = false;
  let startX = 0;
  let startScrollLeft = 0;
  let dragMoved = false;

  track.addEventListener('mousedown', (e) => {
    if (e.target.closest('a')) return;
    isDragging = true;
    dragMoved = false;
    startX = e.pageX - track.offsetLeft;
    startScrollLeft = track.scrollLeft;
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      track.classList.remove('is-dragging');
      setTimeout(() => {
        dragMoved = false;
      }, 80);
    }
  });

  track.addEventListener('mouseleave', () => {
    if (isDragging) {
      isDragging = false;
      track.classList.remove('is-dragging');
      setTimeout(() => {
        dragMoved = false;
      }, 80);
    }
  });

  track.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX - track.offsetLeft;
    const walk = x - startX;
    if (Math.abs(walk) > 5) {
      dragMoved = true;
      track.classList.add('is-dragging');
      e.preventDefault();
      track.scrollLeft = startScrollLeft - walk;
    }
  });

  // Keyboard navigation when track or card is focused
  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      track.scrollBy({ left: -getStep(), behavior: 'smooth' });
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      track.scrollBy({ left: getStep(), behavior: 'smooth' });
    }
  });

  // Touch tap handling & mouseenter/mouseleave hover class
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.classList.add('is-hovered');
    });
    card.addEventListener('mouseleave', () => {
      card.classList.remove('is-hovered');
    });
    card.addEventListener('focus', () => {
      card.classList.add('is-hovered');
    });
    card.addEventListener('blur', () => {
      card.classList.remove('is-hovered');
    });
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      if (dragMoved) return;

      const wasActive = card.classList.contains('is-active');
      cards.forEach(c => c.classList.remove('is-active'));
      if (!wasActive) {
        card.classList.add('is-active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#actions-carousel-track')) {
      cards.forEach(c => c.classList.remove('is-active'));
    }
  });

  // Entrance animation: 25% visible, play once
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          actionsSection.classList.add('is-entered');
          setTimeout(() => {
            actionsSection.classList.add('entrance-complete');
          }, 1200);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(actionsSection);
  } else {
    actionsSection.classList.add('is-entered', 'entrance-complete');
  }
}

function initApp() {
  initConnectorsCard();
  initSecurityTabs();
  initActionsCarousel();
  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. TOAST SYSTEM
     ========================================================================== */
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'info', duration = 3500) {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'success' ? 'toast-success' : ''}`;
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
      setTimeout(() => toast.remove(), 260);
    }, duration);
  }


  /* ==========================================================================
     3. STICKY HEADER & SCROLL BEHAVIOR
     ========================================================================== */
  const stickyHeader = document.getElementById('sticky-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      stickyHeader?.classList.add('scrolled');
    } else {
      stickyHeader?.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ==========================================================================
     4. MOBILE NAV PANEL
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNavPanel = document.getElementById('mobile-nav-panel');

  if (hamburgerBtn && mobileNavPanel) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = mobileNavPanel.classList.toggle('is-open');
      hamburgerBtn.classList.toggle('is-active', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavPanel.classList.remove('is-open');
        hamburgerBtn.classList.remove('is-active');
        hamburgerBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Handle data-switch-tab links (e.g. Agents, Craft in header & mobile nav)
  document.querySelectorAll('[data-switch-tab]').forEach(el => {
    el.addEventListener('click', (e) => {
      const tabTarget = el.getAttribute('data-switch-tab');
      const tabBtn = document.querySelector(`.tab-btn[data-tab="${tabTarget}"]`);
      if (tabBtn) {
        tabBtn.click();
      }
    });
  });

  /* ==========================================================================
     4b. MEGA MENU DATA & LOGIC
     ========================================================================== */
  const megaMenuData = {
    platform: {
      col1: {
        title: "Platform Capabilities",
        links: [
          { text: "Hybrid Vector + BM25 RAG", desc: "Enterprise semantic and exact keyword search", target: "#statement" },
          { text: "Autonomous Deep Research", desc: "Multi-step iterative inquiry & web synthesis", target: "#dark-section" },
          { text: "Containerized Agent Sandbox", desc: "Containerized tool generation with live preview", target: "#dark-section" }
        ]
      },
      col2: {
        title: "Integrations & Tools",
        links: [
          { text: "50+ Enterprise Connectors", desc: "Continuous sync with SAP, Drive, and Jira", target: "#stats" },
          { text: "ServiceNow & SAP Actions", desc: "Live record updates, tickets, and sales orders", target: "#accordion" },
          { text: "Model Context Protocol (MCP)", desc: "Open standard tool connections & agents", target: "#accordion" }
        ]
      },
      col3: {
        title: "Security & Governance",
        links: [
          { text: "Document-Level Permissions", desc: "Inherit native permissions straight from source", target: "#accordion" },
          { text: "SAML 2.0 & SCIM Sync", desc: "Automated provisioning with Okta & Entra ID", target: "#stats" },
          { text: "Evals Benchmark Harness", desc: "Measure latency, accuracy, and recall", target: "#dark-section" }
        ]
      },
      promo: {
        title: "Enterprise Architecture",
        desc: "Unified AI orchestration designed specifically for regulated enterprise workloads.",
        btn: "Schedule Demo",
        action: "demo"
      }
    },
    customers: {
      col1: {
        title: "Industry Solutions",
        links: [
          { text: "Financial Services & Banking", desc: "Private on-premise RAG with strict auditing", target: "#stats" },
          { text: "Life Sciences & Pharma", desc: "Literature synthesis & patent document search", target: "#tabs" },
          { text: "High-Tech Manufacturing", desc: "SAP S/4HANA supply chain orchestration", target: "#accordion" }
        ]
      },
      col2: {
        title: "Customer Impact",
        links: [
          { text: "Sub-Second Search Latency", desc: "Single query across 20+ enterprise wikis", target: "#statement" },
          { text: "Verifiable Source Citations", desc: "Inline citations on every generated answer", target: "#statement" },
          { text: "Fast Air-Gapped Deployment", desc: "<1GB RAM containerized Lite mode", target: "#stats" }
        ]
      },
      col3: {
        title: "Enterprise Governance",
        links: [
          { text: "Enterprise Security Overview", desc: "Supports SAML 2.0, OIDC, and SCIM 2.0", target: "#resources" },
          { text: "Document-Level Permissions", desc: "Strict source ACL mirroring & audit logging", target: "#resources" },
          { text: "Configurable Data Retention", desc: "Strict enterprise deletion and retention policies", target: "#tabs" }
        ]
      },
      promo: {
        title: "Enterprise Case Studies",
        desc: "Read how security-focused teams deploy digital coworkers with full document-level ACLs.",
        btn: "Read Studies",
        action: "demo"
      }
    },
    solutions: {
      col1: {
        title: "By Department",
        links: [
          { text: "IT & Helpdesk Automation", desc: "Auto-resolve ServiceNow tickets via Slack", target: "#accordion" },
          { text: "Enterprise Legal & Compliance", desc: "Contract analysis with exact paragraph links", target: "#statement" },
          { text: "Engineering & Dev Productivity", desc: "GitHub, Linear, and Jira cross-reference", target: "#tabs" }
        ]
      },
      col2: {
        title: "By Architecture",
        links: [
          { text: "Sovereign Private Cloud", desc: "Deploy within AWS, Azure, GCP, or bare metal", target: "#accordion" },
          { text: "Air-Gapped Kubernetes", desc: "Helm charts with zero external model calls", target: "#stats" },
          { text: "Multi-Model Gateway", desc: "Route between OpenAI, Bedrock, and Ollama", target: "#dark-section" }
        ]
      },
      col3: {
        title: "Workflows",
        links: [
          { text: "From Knowledge to Action", desc: "Formulate remediation steps and execute", target: "#action-plan" },
          { text: "Automated Ticket Triage", desc: "Extract error stacks and notify Slack", target: "#action-plan" },
          { text: "Executive Briefings", desc: "Scheduled deep research digest generation", target: "#tabs" }
        ]
      },
      promo: {
        title: "Custom Workflows",
        desc: "Equip your custom AI agents with scoped API tools and verified document sets.",
        btn: "Request Architecture",
        action: "demo"
      }
    },
    resources: {
      col1: {
        title: "Documentation & Guides",
        links: [
          { text: "Hybrid RAG Architecture Paper", desc: "Deep vector embeddings + BM25 keyword", target: "#resources" },
          { text: "Connector Reference Matrix", desc: "API limits and indexing speeds for 50+ tools", target: "#stats" },
          { text: "Enterprise Security Overview", desc: "Document ACL inheritance in detail", target: "#resources" }
        ]
      },
      col2: {
        title: "Developer Tools",
        links: [
          { text: "Model Evaluations CLI", desc: "Run benchmark test suites against RAG recall", target: "#dark-section" },
          { text: "OpenAPI Tool Importer", desc: "Convert existing REST endpoints to LLM tools", target: "#accordion" },
          { text: "OpenTelemetry & Langfuse", desc: "Trace latency and token cost per agent", target: "#accordion" }
        ]
      },
      col3: {
        title: "Community & Events",
        links: [
          { text: "Enterprise AI Summit 2026", desc: "Keynotes on sovereign LLMs and RAG", target: "#resources" },
          { text: "Product Release Notes", desc: "SAP S/4HANA OData and SCIM 2.0 updates", target: "#statement" },
          { text: "Technical Briefing: Zero-Trust AI", desc: "Implementing document permissions at scale", target: "#resources" }
        ]
      },
      promo: {
        title: "Technical Benchmark",
        desc: "Discover how ESAA achieves 98.4% retrieval recall on enterprise knowledge benchmarks.",
        btn: "Get Benchmark",
        action: "demo"
      }
    },
    company: {
      col1: {
        title: "About ESAA",
        links: [
          { text: "Our Mission", desc: "Unlocking enterprise intelligence without compromise", target: "#hero" },
          { text: "Leadership & Team", desc: "Pioneers in distributed systems and NLP", target: "#statement" },
          { text: "Careers at ESAA", desc: "Join our engineering and research teams", target: "#resources" }
        ]
      },
      col2: {
        title: "Governance",
        links: [
          { text: "Trust & Safety Center", desc: "PII masking and toxic input guardrails", target: "#accordion" },
          { text: "Privacy Policy", desc: "Zero training on enterprise client data", target: "#resources" },
          { text: "Security Standards", desc: "End-to-end encryption at rest and in transit", target: "#accordion" }
        ]
      },
      col3: {
        title: "Contact & Partners",
        links: [
          { text: "Global Partner Program", desc: "System integrators and SAP consultants", target: "#stats" },
          { text: "Press & Media Kit", desc: "Brand assets and executive headshots", target: "#resources" },
          { text: "Contact Sales", desc: "Get in touch with an account executive", target: "#hero" }
        ]
      },
      promo: {
        title: "Join the Partner Network",
        desc: "Partner with ESAA to deliver sovereign AI solutions to enterprise clients.",
        btn: "Become a Partner",
        action: "demo"
      }
    }
  };
  megaMenuData.product = megaMenuData.platform;

  const navItems = document.querySelectorAll('#desktop-nav-menu .nav-item');
  const megaMenuPanel = document.getElementById('mega-menu-panel');
  const megaMenuOverlay = document.getElementById('mega-menu-overlay');
  const megaMenuContent = document.getElementById('mega-menu-content');
  let currentActiveMenu = null;
  let megaMenuTimeout = null;

  function renderMegaMenu(key) {
    if (!megaMenuContent) return;

    if (key === 'platform' || key === 'product') {
      megaMenuContent.innerHTML = renderPlatformDropdown();
    } else if (key === 'solutions') {
      megaMenuContent.innerHTML = `
        <div class="solutions-mega-layout">
          <!-- Column 1: DEPARTMENTS -->
          <div class="solutions-column">
            <div class="solutions-column-header">Departments</div>
            <div class="solutions-two-col-grid">
              <ul class="solutions-nav-list">
                <li>
                  <a href="#hero" class="solutions-item-link mega-link" data-card="all">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </span>
                    <span>All Teams</span>
                  </a>
                </li>
                <li>
                  <a href="#statement" class="solutions-item-link mega-link is-active" data-card="engineering">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </span>
                    <span>Engineering</span>
                  </a>
                </li>
                <li>
                  <a href="#accordion" class="solutions-item-link mega-link" data-card="customer-service">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
                    </span>
                    <span>Customer Service</span>
                  </a>
                </li>
                <li>
                  <a href="#action-plan" class="solutions-item-link mega-link" data-card="it">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                    </span>
                    <span>IT</span>
                  </a>
                </li>
              </ul>

              <ul class="solutions-nav-list">
                <li class="solutions-tree-group">
                  <a href="#resources" class="solutions-item-link mega-link" data-card="marketing">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                    </span>
                    <span>Marketing</span>
                  </a>
                </li>
                <li>
                  <a href="#company" class="solutions-item-link mega-link" data-card="people">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    </span>
                    <span>People</span>
                  </a>
                </li>
                <li>
                  <a href="#stats" class="solutions-item-link mega-link" data-card="finance">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="2" y="4" width="20" height="16" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                    </span>
                    <span>Finance</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Column 2: INDUSTRIES -->
          <div class="solutions-column">
            <div class="solutions-column-header">Industries</div>
            <div class="solutions-two-col-grid">
              <ul class="solutions-nav-list">
                <li>
                  <a href="#tabs" class="solutions-item-link mega-link" data-card="consumer-goods">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                    </span>
                    <span>Consumer Goods</span>
                  </a>
                </li>
                <li class="solutions-tree-group">
                  <a href="#accordion" class="solutions-item-link mega-link" data-card="industrials">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M2 20h20"></path><path d="M4 20V9l4-3v14"></path><path d="M12 20V4l6 4v12"></path></svg>
                    </span>
                    <span>Industrials</span>
                  </a>
                </li>
                <li class="solutions-tree-group">
                  <a href="#tabs" class="solutions-item-link mega-link" data-card="professional-services">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                    </span>
                    <span>Professional Services</span>
                  </a>
                </li>
              </ul>

              <ul class="solutions-nav-list">
                <li class="solutions-tree-group">
                  <a href="#stats" class="solutions-item-link mega-link" data-card="financial-services">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </span>
                    <span>Financial Services</span>
                  </a>
                </li>
                <li>
                  <a href="#statement" class="solutions-item-link mega-link" data-card="government">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M3 21h18"></path><path d="M5 21V10"></path><path d="M9 21V10"></path><path d="M15 21V10"></path><path d="M19 21V10"></path><path d="M2 10h20L12 3 2 10z"></path></svg>
                    </span>
                    <span>Government</span>
                  </a>
                </li>
                <li class="solutions-tree-group">
                  <a href="#tabs" class="solutions-item-link mega-link" data-card="healthcare">
                    <span class="solutions-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M12 8v8"></path><path d="M8 12h8"></path></svg>
                    </span>
                    <span>Healthcare</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- Column 3: The Featured Card -->
          <div class="solutions-featured-card">
            <div class="luminous-banner-wrap">
              <div class="luminous-mesh-wrap">
                <div class="luminous-blob luminous-blob-1"></div>
                <div class="luminous-blob luminous-blob-2"></div>
                <div class="luminous-blob luminous-blob-3"></div>
                <div class="luminous-blob luminous-blob-4"></div>
                <div class="luminous-blob luminous-blob-5"></div>
              </div>
              <div class="luminous-overlay-glass"></div>
              <div class="luminous-banner-title" id="solutions-banner-title">AI for Engineering</div>
            </div>
            <div class="solutions-card-body-two-col">
              <div class="solutions-card-col-left">
                <div class="solutions-card-heading" id="solutions-card-heading">What's the state of your AI stack for software engineering?</div>
                <a href="#stats" class="solutions-card-cta mega-link" id="solutions-card-cta">
                  <span id="solutions-card-btn-text">Explore solutions</span>
                  <span class="cta-arrow">&rarr;</span>
                </a>
              </div>
              <div class="solutions-card-col-right">
                <div class="solutions-card-desc" id="solutions-card-desc">See how your engineering AI stack performs across delivery speed, incident response, and context access with document-level security.</div>
              </div>
            </div>
          </div>
        </div>
      `;

      const solutionsData = {
        'engineering': {
          title: "AI for Engineering",
          heading: "What's the state of your AI stack for software engineering?",
          desc: "See how your engineering AI stack performs across delivery speed, incident response, and context access with document-level security.",
          cta: "Explore solutions",
          link: "#stats"
        },
        'customer-service': {
          title: "AI for Customer Service",
          heading: "Accelerate first-contact resolution with verified enterprise RAG",
          desc: "Connect ServiceNow, Zendesk, and internal playbooks to resolve client tickets with verified inline citations and complete source auditability.",
          cta: "Explore customer service",
          link: "#accordion"
        },
        'sales': {
          title: "AI for Enterprise Sales",
          heading: "Real-time CRM context & automated proposal acceleration",
          desc: "Equip account executives with instant cross-repository customer intelligence, RFP answering, and automated Salesforce updates.",
          cta: "Explore sales solutions",
          link: "#stats"
        },
        'it': {
          title: "AI for IT & Helpdesk",
          heading: "Automate tier-1 incident triage & ServiceNow actions",
          desc: "Allow digital coworkers to auto-diagnose infrastructure alerts, query runbooks, and perform authenticated remediations in Slack.",
          cta: "Explore IT workflows",
          link: "#action-plan"
        },
        'marketing': {
          title: "AI for Marketing",
          heading: "Context-grounded campaign generation & brand consistency",
          desc: "Produce high-converting B2B and B2C campaigns backed by organizational knowledge assets, brand guides, and compliance rules.",
          cta: "Explore marketing AI",
          link: "#resources"
        },
        'people': {
          title: "AI for HR & People Teams",
          heading: "Instant onboarding, benefits lookup & policy navigation",
          desc: "Give every employee instant, permission-aware answers to HR, health insurance, and holiday policies with document citations.",
          cta: "Explore HR solutions",
          link: "#company"
        },
        'finance': {
          title: "AI for Finance & Operations",
          heading: "Automated SAP S/4HANA invoice and order reconciliation",
          desc: "Reconcile vendor payments, query general ledger anomalies, and generate financial reports directly from ERP data.",
          cta: "Explore finance AI",
          link: "#stats"
        },
        'legal': {
          title: "AI for Legal & Compliance",
          heading: "Instant clause comparison & strict privacy controls",
          desc: "Review MSAs, DPAs, and NDAs against standard terms with exact clause citations while maintaining air-gapped data privacy.",
          cta: "Explore legal AI",
          link: "#statement"
        },
        'financial-services': {
          title: "AI for Financial Services",
          heading: "Sovereign on-premise RAG with strict auditing & ACLs",
          desc: "Deploy air-gapped LLMs with document-level permissions and audit logging for banks, PE/VC, and asset managers.",
          cta: "Explore financial solutions",
          link: "#stats"
        },
        'healthcare': {
          title: "AI for Healthcare & Life Sciences",
          heading: "HIPAA-ready clinical synthesis & literature research",
          desc: "Synthesize research papers, clinical trial protocols, and medical records within a zero-data-retention security boundary.",
          cta: "Explore healthcare AI",
          link: "#tabs"
        },
        'retail': {
          title: "AI for Retail & Consumer Goods",
          heading: "Omnichannel inventory intelligence & supply chain tracking",
          desc: "Integrate SAP S/4HANA supply chain data with conversational commerce and store operational playbooks.",
          cta: "Explore retail solutions",
          link: "#stats"
        },
        'industrials': {
          title: "AI for Industrials & Manufacturing",
          heading: "Real-time shop-floor documentation & SAP maintenance",
          desc: "Empower plant managers and engineers with instant access to technical schematics, maintenance manuals, and ERP parts inventory.",
          cta: "Explore industrial solutions",
          link: "#accordion"
        },
        'all': {
          title: "AI for All Teams",
          heading: "Unified enterprise intelligence across every department",
          desc: "Connect 50+ enterprise systems, preserve document ACLs, and deploy autonomous digital coworkers across Slack, Web, and Teams.",
          cta: "Schedule a demo",
          link: "#hero"
        }
      };

      const bannerTitle = document.getElementById('solutions-banner-title');
      const cardHeading = document.getElementById('solutions-card-heading');
      const cardDesc = document.getElementById('solutions-card-desc');
      const cardCta = document.getElementById('solutions-card-cta');
      const cardBtnText = document.getElementById('solutions-card-btn-text');

      megaMenuContent.querySelectorAll('[data-card]').forEach(link => {
        link.addEventListener('mouseenter', () => {
          const cardKey = link.getAttribute('data-card');
          const itemData = solutionsData[cardKey];
          if (itemData) {
            megaMenuContent.querySelectorAll('.solutions-item-link').forEach(el => el.classList.remove('is-active'));
            link.classList.add('is-active');
            if (bannerTitle) bannerTitle.textContent = itemData.title;
            if (cardHeading) cardHeading.textContent = itemData.heading;
            if (cardDesc) cardDesc.textContent = itemData.desc;
            if (cardBtnText) cardBtnText.textContent = itemData.cta;
            if (cardCta) cardCta.setAttribute('href', itemData.link);
          }
        });
      });

    } else if (key === 'resources') {
      megaMenuContent.innerHTML = `
        <div class="resources-mega-layout">
          <!-- Left 3 Columns + Bottom Full Width Strip -->
          <div class="resources-main-content">
            <div class="resources-columns-row">
              <!-- Column 1: EXPLORE -->
              <div class="resources-column">
                <div class="solutions-column-header">Explore</div>
                <a href="#resources" class="content-hub-card mega-link" data-resource="content-hub">
                  <div class="content-hub-text">
                    <span class="content-hub-bold">Content</span>
                    <span class="content-hub-serif">Hub</span>
                  </div>
                  <div class="content-hub-art-wrap">
                    <div class="content-hub-optic-wave"></div>
                  </div>
                </a>
              </div>

              <!-- Column 2: ENGAGE -->
              <div class="resources-column">
                <div class="solutions-column-header">Engage</div>
                <ul class="resources-links-list">
                  <li>
                    <a href="#resources" class="resources-text-link mega-link" data-resource="esaa-go">
                      ESAA:GO 2026
                    </a>
                  </li>
                  <li>
                    <a href="#company" class="resources-text-link mega-link" data-resource="community">
                      ESAAverse Community
                    </a>
                  </li>
                </ul>
              </div>

              <!-- Column 3: SUPPORT & SERVICES -->
              <div class="resources-column">
                <div class="solutions-column-header">Support &amp; Services</div>
                <ul class="resources-links-list">
                  <li>
                    <a href="#resources" class="resources-text-link mega-link" data-resource="help-center">
                      Help Center
                    </a>
                  </li>
                  <li>
                    <a href="#accordion" class="resources-text-link mega-link" data-resource="developers">
                      Developers
                    </a>
                  </li>
                  <li>
                    <a href="#stats" class="resources-text-link mega-link" data-resource="partners">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Full-width Bottom Strip across columns 1, 2, 3 -->
            <a href="#statement" class="work-ai-institute-bar mega-link" data-resource="institute">
              <span class="work-ai-title">Work AI Institute</span>
              <span class="work-ai-arrow">&rarr;</span>
            </a>
          </div>

          <!-- Column 4 (Right): Featured Card with Luminous Sunset Fluid Mesh -->
          <div class="resources-featured-card">
            <div class="luminous-banner-wrap luminous-sunset-mesh">
              <div class="luminous-mesh-wrap luminous-sunset-gradient">
                <div class="luminous-blob luminous-sunset-blob-1"></div>
                <div class="luminous-blob luminous-sunset-blob-2"></div>
                <div class="luminous-blob luminous-blob-3"></div>
                <div class="luminous-blob luminous-sunset-blob-4"></div>
                <div class="luminous-blob luminous-blob-5"></div>
                <div class="luminous-stipple-dots"></div>
              </div>
              <div class="luminous-overlay-glass"></div>
              <div class="luminous-banner-title luminous-sunset-title" id="resources-banner-title">
                The Tokenomics<br>of Enterprise AI
              </div>
            </div>
            <div class="solutions-card-body">
              <div class="solutions-card-heading" id="resources-card-heading">The AI Token Savings Story</div>
              <div class="solutions-card-desc" id="resources-card-desc">Explore how context and model routing affect token costs, output quality, and savings at scale.</div>
              <a href="#stats" class="solutions-card-cta mega-link" id="resources-card-cta">
                <span id="resources-card-btn-text">Explore the story</span>
                <span class="cta-arrow">&rarr;</span>
              </a>
            </div>
          </div>
        </div>
      `;

      const resourcesCardData = {
        'default': {
          title: "The Tokenomics<br>of Enterprise AI",
          heading: "The AI Token Savings Story",
          desc: "Explore how context and model routing affect token costs, output quality, and savings at scale.",
          cta: "Explore the story",
          link: "#stats"
        },
        'content-hub': {
          title: "Enterprise Knowledge<br>&amp; Insights",
          heading: "The Unified Hybrid RAG Benchmark",
          desc: "Read how dense vector + BM25 keyword retrieval achieves 98.4% recall across internal wikis and documents.",
          cta: "Read benchmark paper",
          link: "#resources"
        },
        'esaa-go': {
          title: "ESAA:GO 2026<br>Global Summit",
          heading: "Keynotes on Sovereign LLMs & Autonomous Agents",
          desc: "Join enterprise AI leaders, security officers, and systems architects for our annual virtual summit.",
          cta: "Register for ESAA:GO",
          link: "#resources"
        },
        'community': {
          title: "ESAAverse<br>Community",
          heading: "Connect with 12,000+ Enterprise Builders",
          desc: "Share custom agent templates, discuss MCP tool integrations, and learn production prompting patterns.",
          cta: "Join community",
          link: "#company"
        },
        'help-center': {
          title: "Enterprise<br>Help Center",
          heading: "Deployment Runbooks & Connector Setup Guides",
          desc: "Step-by-step guides for connecting SAP S/4HANA, ServiceNow, Salesforce, and configuring SCIM 2.0 provisioning.",
          cta: "Search help center",
          link: "#resources"
        },
        'developers': {
          title: "Developer Hub<br>&amp; MCP Tools",
          heading: "Build Custom Agents with Scoped API Tools",
          desc: "Convert OpenAPI specs into live LLM tools, run benchmark test suites, and inspect traces in Langfuse.",
          cta: "Explore developer docs",
          link: "#accordion"
        },
        'partners': {
          title: "Global Partner<br>Ecosystem",
          heading: "Deliver Governed AI with Certified SI Partners",
          desc: "Partner with ESAA to deploy air-gapped on-premise RAG and SAP digital coworkers for leading enterprise clients.",
          cta: "Become a partner",
          link: "#stats"
        },
        'institute': {
          title: "Work AI<br>Institute",
          heading: "State of Enterprise Digital Coworkers Report",
          desc: "Independent research on how autonomous agents transform worker productivity, ticket resolution, and decision speed.",
          cta: "Download report",
          link: "#statement"
        }
      };

      const resBannerTitle = document.getElementById('resources-banner-title');
      const resHeading = document.getElementById('resources-card-heading');
      const resDesc = document.getElementById('resources-card-desc');
      const resCta = document.getElementById('resources-card-cta');
      const resBtnText = document.getElementById('resources-card-btn-text');

      megaMenuContent.querySelectorAll('[data-resource]').forEach(link => {
        link.addEventListener('mouseenter', () => {
          const resKey = link.getAttribute('data-resource');
          const data = resourcesCardData[resKey];
          if (data) {
            if (resBannerTitle) resBannerTitle.innerHTML = data.title;
            if (resHeading) resHeading.textContent = data.heading;
            if (resDesc) resDesc.textContent = data.desc;
            if (resBtnText) resBtnText.textContent = data.cta;
            if (resCta) resCta.setAttribute('href', data.link);
          }
        });
      });

    } else {
      const data = megaMenuData[key];
      if (!data) return;

      megaMenuContent.innerHTML = `
        <div class="mega-standard-grid">
          <div>
            <div class="mega-col-title">${data.col1.title}</div>
            <ul class="mega-link-list">
              ${data.col1.links.map(l => `
                <li class="mega-link-item">
                  <a href="${l.target}" class="mega-link">
                    <div class="mega-link-title">${l.text}</div>
                    <div class="mega-link-desc">${l.desc}</div>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <div class="mega-col-title">${data.col2.title}</div>
            <ul class="mega-link-list">
              ${data.col2.links.map(l => `
                <li class="mega-link-item">
                  <a href="${l.target}" class="mega-link">
                    <div class="mega-link-title">${l.text}</div>
                    <div class="mega-link-desc">${l.desc}</div>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          <div>
            <div class="mega-col-title">${data.col3.title}</div>
            <ul class="mega-link-list">
              ${data.col3.links.map(l => `
                <li class="mega-link-item">
                  <a href="${l.target}" class="mega-link">
                    <div class="mega-link-title">${l.text}</div>
                    <div class="mega-link-desc">${l.desc}</div>
                  </a>
                </li>
              `).join('')}
            </ul>
          </div>
          <div class="mega-promo-card">
            <div>
              <div class="mega-promo-title">${data.promo.title}</div>
              <div class="mega-promo-text">${data.promo.desc}</div>
            </div>
            <div>
              <button class="btn btn-sm btn-black ${data.promo.action === 'demo' ? 'demo-trigger-btn' : ''}">
                ${data.promo.btn} &rarr;
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // Attach demo triggers for any buttons inside mega-menu
    megaMenuContent.querySelectorAll('.demo-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMegaMenu();
        if (typeof openDemoModal === 'function') {
          openDemoModal();
        }
      });
    });

    // Smooth scroll and close on link click
    megaMenuContent.querySelectorAll('.mega-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          closeMegaMenu();
          const targetEl = document.querySelector(href);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
          }
        }
      });
    });
  }

  function openMegaMenu(key, itemEl) {
    clearTimeout(megaMenuTimeout);
    currentActiveMenu = key;
    navItems.forEach(el => {
      el.classList.remove('is-active');
      el.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    itemEl.classList.add('is-active');
    itemEl.querySelector('button')?.setAttribute('aria-expanded', 'true');
    renderMegaMenu(key);
    megaMenuPanel?.classList.add('is-open');
    megaMenuOverlay?.classList.add('is-open');
  }

  function closeMegaMenu() {
    clearTimeout(megaMenuTimeout);
    currentActiveMenu = null;
    navItems.forEach(el => {
      el.classList.remove('is-active');
      el.querySelector('button')?.setAttribute('aria-expanded', 'false');
    });
    megaMenuPanel?.classList.remove('is-open');
    megaMenuOverlay?.classList.remove('is-open');
  }

  navItems.forEach(item => {
    const key = item.getAttribute('data-menu');
    item.addEventListener('mouseenter', () => {
      openMegaMenu(key, item);
    });

    item.addEventListener('click', (e) => {
      e.stopPropagation();
      // On desktop a click must NOT close a menu that hover already opened
      if (currentActiveMenu === key && megaMenuPanel?.classList.contains('is-open')) {
        return;
      }
      openMegaMenu(key, item);
    });

    item.addEventListener('mouseleave', () => {
      megaMenuTimeout = setTimeout(() => {
        closeMegaMenu();
      }, 200);
    });
  });

  megaMenuPanel?.addEventListener('mouseenter', () => {
    clearTimeout(megaMenuTimeout);
  });

  megaMenuPanel?.addEventListener('mouseleave', () => {
    megaMenuTimeout = setTimeout(() => {
      closeMegaMenu();
    }, 200);
  });

  megaMenuOverlay?.addEventListener('click', closeMegaMenu);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (megaMenuPanel?.classList.contains('is-open')) {
        closeMegaMenu();
      }
      if (typeof closeDemoModal === 'function') {
        closeDemoModal();
      }
    }
  });

  /* ==========================================================================
     5. HERO PROMPT TYPING EFFECT
     ========================================================================== */
  const heroTypingTarget = document.getElementById('hero-typing-target');
  const heroQueries = [
    "Which launch blocker is buried in legal edits, release notes, and field notes?",
    "Show Q3 revenue impact from APAC supply chain delays across SAP & Salesforce",
    "Draft an incident response plan and sync Jira ticket with ServiceNow",
    "Synthesize customer feedback from Slack, Zendesk, and Confluence"
  ];

  // Interactive connector chips click in hero
  const heroChips = document.querySelectorAll('.hero-search-card .chip');
  heroChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const src = chip.getAttribute('data-source');
      heroChips.forEach(c => c.style.borderColor = 'rgba(0, 0, 0, 0.05)');
      chip.style.borderColor = '#2a52ff';
      chip.style.backgroundColor = '#edf1ff';
      if (heroTypingTarget) {
        heroTypingTarget.textContent = `Search all ${src} docs and tickets for latest product updates...`;
      }
    });
  });

  let queryIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 42;

  function typeHeroQuery() {
    if (!heroTypingTarget) return;
    const currentQuery = heroQueries[queryIndex];

    if (prefersReducedMotion) {
      heroTypingTarget.textContent = currentQuery;
      return;
    }

    if (isDeleting) {
      heroTypingTarget.textContent = currentQuery.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 20;
    } else {
      heroTypingTarget.textContent = currentQuery.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 45;
    }

    if (!isDeleting && charIndex === currentQuery.length) {
      typingDelay = 3200;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      queryIndex = (queryIndex + 1) % heroQueries.length;
      typingDelay = 400;
    }

    setTimeout(typeHeroQuery, typingDelay);
  }
  typeHeroQuery();

  /* ==========================================================================
     6. STATS & HERO COUNTERS ANIMATION (SCROLLED INTO VIEW ONCE)
     ========================================================================== */
  const statsElements = document.querySelectorAll('.stat-num-val, .hatched-number');

  function animateCountUp(element) {
    const target = parseFloat(element.getAttribute('data-target') || element.getAttribute('data-count') || '0');
    const isDecimal = element.getAttribute('data-decimal') === 'true';
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = prefersReducedMotion ? 0 : 1600;
    const startTime = performance.now();

    function updateNumber(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = target * easeProgress;

      if (isDecimal) {
        element.textContent = currentVal.toFixed(1) + suffix;
      } else {
        element.textContent = Math.floor(currentVal) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      } else {
        element.textContent = (isDecimal ? target.toFixed(1) : target) + suffix;
      }
    }

    requestAnimationFrame(updateNumber);
  }

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statsElements.forEach(el => statObserver.observe(el));

  /* ==========================================================================
     7. TABS SECTION & CRAFT SANDBOX
     ========================================================================== */
  const tabsData = {
    knowledge: {
      badge: "Pillar 1 & 2",
      headline: "Unified Enterprise Knowledge & Agentic RAG",
      bullets: [
        { title: "Hybrid Dense + Sparse Indexing", desc: "Combines vector embeddings with BM25 keyword matching for exact part numbers, SKUs, and jargon." },
        { title: "Cross-Encoder Re-Ranking", desc: "Dynamically scores candidate passages so LLMs receive the most accurate semantic context." },
        { title: "Document Sets & Inline Citations", desc: "Group knowledge by department; every generated answer links directly back to verified source files." }
      ],
      promptTag: "Live RAG Query",
      promptText: "Locate the latest enterprise compliance policy across Confluence and Google Drive, then highlight data retention obligations.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.45), rgba(10, 16, 32, 0.78)), url('tab-knowledge.png') center/cover no-repeat"
    },
    agents: {
      badge: "Pillar 3",
      headline: "Specialized Agents, Personas & Guardrails",
      bullets: [
        { title: "Scoped Permissions & Roles", desc: "Assign custom tools, system prompts, and strict document visibility to specific agent personas." },
        { title: "Global vs Department Sharing", desc: "Publish agents company-wide or restrict access to vetted engineering or executive groups." },
        { title: "Starter Guidance", desc: "Equip non-technical staff with one-click contextual prompt buttons for repeatable accuracy." }
      ],
      promptTag: "Agent Persona",
      promptText: "Act as Senior IT Helpdesk Specialist. Validate the user's Okta session and inspect active VPN gateways.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.45), rgba(10, 16, 32, 0.78)), url('tab-agents.png') center/cover no-repeat"
    },
    "deep-research": {
      badge: "Pillar 4",
      headline: "Autonomous Multi-Step Deep Research",
      bullets: [
        { title: "Iterative Sub-Query Decomposition", desc: "Breaks intricate enterprise queries into multi-step investigative hypotheses automatically." },
        { title: "Cross-Corroboration", desc: "Simultaneously queries internal documentation and live web search engines to confirm facts." },
        { title: "Publication-Grade Deliverables", desc: "Produces structured analytical executive dossiers with comparative metrics and bibliography." }
      ],
      promptTag: "Deep Research Mode",
      promptText: "Perform full competitive breakdown between Q3 regional supplier quotes and identify price drift anomalies.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.42), rgba(15, 23, 42, 0.8)), url('autonomous-deep-research.jpg') center/cover no-repeat"
    },
    actions: {
      badge: "Pillar 5",
      headline: "Enterprise Extensibility & Live Actions",
      bullets: [
        { title: "SAP S/4HANA & ServiceNow Tools", desc: "Create sales orders, query OData tables, and resolve IT incident tickets straight from chat." },
        { title: "Model Context Protocol (MCP)", desc: "Plug into local or remote MCP servers for instantaneous integration with enterprise tools." },
        { title: "Isolated Python Sandbox", desc: "Safely execute mathematical routines, parse raw CSV dumps, and generate dynamic visual plots." }
      ],
      promptTag: "Live Tool Execution",
      promptText: "Create a High-Priority incident in ServiceNow for server cluster 'eu-west-04' and notify on-call in #devops-alerts.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.4), rgba(10, 16, 32, 0.75)), url('tab-actions.png') center/cover no-repeat"
    },
    craft: {
      badge: "Pillar 6",
      headline: "Craft / Build Mode (Agentic Sandbox)",
      bullets: [
        { title: "Isolated Container Environment", desc: "A development environment where AI agents write, test, and render interactive tools, web apps, and scripts in isolated containers with live preview." },
        { title: "Interactive Live Preview", desc: "Instantly render live web apps, custom dashboards, and interactive mini-tools directly within the chat workspace." },
        { title: "Tool & Code Generation", desc: "Agents generate purpose-built scripts, calculators, and API interfaces on the fly to solve ad-hoc enterprise problems." }
      ],
      promptTag: "Craft Build Prompt",
      promptText: "Build a real-time SAP order tracking dashboard with search, status filters, and export to CSV in an isolated preview container.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.45), rgba(10, 16, 32, 0.8)), url('tab-workflows.png') center/cover no-repeat"
    },
    security: {
      badge: "Pillar 7",
      headline: "Zero-Trust Security, SCIM & ACL Mirroring",
      bullets: [
        { title: "Document-Level Permissions", desc: "Mirror original access rights from Google Drive, Confluence, and Slack so users only see what they own." },
        { title: "Identity & SCIM 2.0 Provisioning", desc: "Native SAML 2.0, Okta, and Microsoft Entra ID integration with automatic offboarding." },
        { title: "PII Masking & Evals CLI", desc: "Intercept sensitive prompts in flight and benchmark model adherence against compliance tests." }
      ],
      promptTag: "Security Governance",
      promptText: "Audit query: Verify that Employee #4092 cannot access executive compensation folders during salary review.",
      gradient: "linear-gradient(135deg, rgba(15, 23, 42, 0.45), rgba(10, 16, 32, 0.8)), url('tab-security.png') center/cover no-repeat"
    }
  };

  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabIndicator = document.getElementById('tab-indicator');
  const tabBadge = document.getElementById('tab-badge');
  const tabHeadline = document.getElementById('tab-headline');
  const tabBullets = document.getElementById('tab-bullets');
  const tabGradientPanel = document.getElementById('tab-gradient-panel');
  const tabPromptTag = document.getElementById('tab-prompt-tag');
  const tabPromptText = document.getElementById('tab-prompt-text');
  let activeTabKey = 'knowledge';
  let tabTypeTimeout = null;

  function updateTabIndicator(activeBtn) {
    if (!tabIndicator || !activeBtn) return;
    const parentRect = activeBtn.parentElement.parentElement.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    tabIndicator.style.left = `${btnRect.left - parentRect.left}px`;
    tabIndicator.style.width = `${btnRect.width}px`;
  }

  function typeTabPrompt(text) {
    if (!tabPromptText) return;
    clearTimeout(tabTypeTimeout);

    if (prefersReducedMotion) {
      tabPromptText.textContent = `"${text}"`;
      return;
    }

    tabPromptText.textContent = '"';
    let idx = 0;

    function step() {
      if (idx < text.length) {
        tabPromptText.textContent += text.charAt(idx);
        idx++;
        tabTypeTimeout = setTimeout(step, 18);
      } else {
        tabPromptText.textContent += '"';
      }
    }
    step();
  }

  function activateTab(tabKey, btn) {
    const data = tabsData[tabKey];
    if (!data) return;
    activeTabKey = tabKey;

    tabButtons.forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    updateTabIndicator(btn);

    if (tabBadge) tabBadge.textContent = data.badge;
    if (tabHeadline) tabHeadline.textContent = data.headline;
    if (tabBullets) {
      tabBullets.innerHTML = data.bullets.map(b => `
        <li class="tab-bullet-item">
          <div class="tab-bullet-title">${b.title}</div>
          <div class="tab-bullet-desc">${b.desc}</div>
        </li>
      `).join('');
    }
    if (tabGradientPanel) tabGradientPanel.style.background = data.gradient;
    if (tabPromptTag) tabPromptTag.textContent = data.promptTag;

    typeTabPrompt(data.promptText);
  }

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-tab');
      activateTab(key, btn);
    });
  });

  const initialTab = document.querySelector('.tab-btn.is-active');
  if (initialTab) {
    setTimeout(() => updateTabIndicator(initialTab), 100);
  }
  window.addEventListener('resize', () => {
    const cur = document.querySelector('.tab-btn.is-active');
    if (cur) updateTabIndicator(cur);
  });

  /* ==========================================================================
     8. CONNECTOR CATALOG (50+ CONNECTORS SEARCH & FILTER)
     ========================================================================== */
  const connectorCatalog = [
    // ERP / Business
    { name: "SAP S/4HANA", cat: "erp", desc: "Live ERP sales orders, inventory, and finance records." },
    { name: "ServiceNow", cat: "erp", desc: "Incident management, CMDB tables, and IT service catalog." },
    { name: "Salesforce", cat: "erp", desc: "CRM accounts, opportunities, leads, and customer cases." },
    { name: "HubSpot", cat: "erp", desc: "Inbound marketing contacts, pipeline deals, and support tickets." },
    { name: "Zendesk", cat: "erp", desc: "Customer support tickets, macros, and help center articles." },
    { name: "Freshdesk", cat: "erp", desc: "Multi-channel customer service tickets and SLA trackers." },
    { name: "Gong", cat: "erp", desc: "Sales call recordings, customer interaction transcripts, and deal intelligence." },
    { name: "Highspot", cat: "erp", desc: "Sales enablement collateral, pitch decks, and buyer engagement metrics." },
    { name: "Loopio", cat: "erp", desc: "RFP automation, proposal response libraries, and security questionnaires." },

    // Storage
    { name: "Google Drive", cat: "storage", desc: "Docs, Sheets, Slides, and shared drives with user ACL mirroring." },
    { name: "SharePoint", cat: "storage", desc: "Enterprise intranet libraries, team sites, and document repositories." },
    { name: "OneDrive", cat: "storage", desc: "Personal enterprise cloud storage and office document synchronization." },
    { name: "Box", cat: "storage", desc: "Secure enterprise file sharing, metadata attributes, and collaboration folders." },
    { name: "Dropbox", cat: "storage", desc: "Team folders, cloud file sync, and document version history." },
    { name: "Egnyte", cat: "storage", desc: "Hybrid cloud content governance, compliance archives, and file servers." },
    { name: "Amazon S3", cat: "storage", desc: "Cloud object storage buckets, unstructured raw data lakes, and archives." },
    { name: "Cloudflare R2", cat: "storage", desc: "Zero-egress-fee distributed object storage for media and document assets." },
    { name: "Google Cloud Storage", cat: "storage", desc: "Unified GCP bucket object storage for analytical files and logs." },
    { name: "Oracle OCI", cat: "storage", desc: "High-performance cloud storage volumes and database archives." },
    { name: "Local Files", cat: "storage", desc: "PDF, DOCX, CSV, Excel, TXT, and audio uploads in container sandbox." },

    // Communication
    { name: "Slack", cat: "communication", desc: "Public/private channels, direct messages, and real-time thread indexing." },
    { name: "Microsoft Teams", cat: "communication", desc: "Organization channels, chat histories, and shared meeting transcripts." },
    { name: "Discord", cat: "communication", desc: "Community server channels, developer forums, and technical chats." },
    { name: "Zulip", cat: "communication", desc: "Topic-threaded team messaging, engineering streams, and organizational announcements." },
    { name: "Gmail", cat: "communication", desc: "Corporate email threads, attachments, and customer communication histories." },
    { name: "IMAP", cat: "communication", desc: "Standard mail server protocol for on-premise exchange and secure mailboxes." },
    { name: "Fireflies.ai", cat: "communication", desc: "Automated voice meeting notes, action items, and conversation summaries." },
    { name: "Discourse", cat: "communication", desc: "Enterprise community knowledge forums, Q&A boards, and discussions." },
    { name: "XenForo", cat: "communication", desc: "Forum discussions, community threads, and specialized member archives." },

    // Knowledge
    { name: "Confluence", cat: "knowledge", desc: "Engineering spaces, product requirement PRDs, and organizational wikis." },
    { name: "Notion", cat: "knowledge", desc: "Department workspaces, databases, project roadmaps, and guidelines." },
    { name: "BookStack", cat: "knowledge", desc: "Hierarchical structured documentation organized into books, chapters, and pages." },
    { name: "Outline", cat: "knowledge", desc: "Fast markdown-based collaborative knowledge base for development teams." },
    { name: "Guru", cat: "knowledge", desc: "Verified cards, contextual knowledge delivery, and browser extensions." },
    { name: "Slab", cat: "knowledge", desc: "Modern team knowledge wiki with real-time editing and unified search." },
    { name: "Coda", cat: "knowledge", desc: "Interactive documents, workflow tables, and team coordination docs." },
    { name: "Document360", cat: "knowledge", desc: "Customer-facing and internal technical knowledge base documentation." },
    { name: "Axero", cat: "knowledge", desc: "Social intranet, internal company portals, and corporate communication wikis." },
    { name: "Lumapps", cat: "knowledge", desc: "Employee experience platform, digital intranet, and internal news." },
    { name: "Drupal Wiki", cat: "knowledge", desc: "Enterprise collaborative wiki solution with workflow approvals." },
    { name: "MediaWiki / Wikipedia", cat: "knowledge", desc: "Open wiki reference libraries, internal encyclopedias, and glossaries." },

    // Project Management
    { name: "Jira", cat: "pm", desc: "Sprint boards, issue tracking, bug reports, and epic roadmaps." },
    { name: "Linear", cat: "pm", desc: "Fast issue tracking, engineering cycles, and product initiatives." },
    { name: "Asana", cat: "pm", desc: "Cross-team projects, milestone tracking, and task dependencies." },
    { name: "ClickUp", cat: "pm", desc: "Unified task management, time tracking, and customizable sprint docs." },
    { name: "Productboard", cat: "pm", desc: "Customer feature requests, product strategy roadmaps, and prioritization." },
    { name: "TestRail", cat: "pm", desc: "QA test management, test run execution, and defect tracking." },

    // Code
    { name: "GitHub", cat: "code", desc: "Repositories, pull requests, commit diffs, issues, and code search." },
    { name: "GitLab", cat: "code", desc: "Source code management, CI/CD pipeline logs, and merge requests." },
    { name: "Bitbucket", cat: "code", desc: "Enterprise Git repository hosting, pull requests, and Jira integrations." },

    // Custom
    { name: "Ingestion API", cat: "custom", desc: "REST endpoints to push custom enterprise documents and metadata." },
    { name: "Web Crawler", cat: "custom", desc: "Automated crawling of public or internal corporate web portals." }
  ];

  const connectorGrid = document.getElementById('connector-grid');
  if (connectorGrid) {
    const connectorSearchInput = document.getElementById('connector-search-input');
    const catPills = document.querySelectorAll('#connector-category-filters .cat-pill');
    let currentConnectorCat = 'all';

    function renderConnectors() {
      if (!connectorGrid) return;
      const query = connectorSearchInput?.value.trim().toLowerCase() || '';

      const filtered = connectorCatalog.filter(item => {
        const matchCat = (currentConnectorCat === 'all' || item.cat === currentConnectorCat);
        const matchQuery = !query || item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query);
        return matchCat && matchQuery;
      });

      if (filtered.length === 0) {
        connectorGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 32px; text-align: center; color: var(--muted); font-size: 14.5px;">
            No connectors found matching your query.
          </div>
        `;
        return;
      }

      connectorGrid.innerHTML = filtered.map(item => `
        <div class="connector-card">
          <div class="conn-top">
            <span class="conn-name">${item.name}</span>
            <span class="conn-cat-tag">${item.cat}</span>
          </div>
          <p class="conn-desc">${item.desc}</p>
        </div>
      `).join('');
    }

    catPills.forEach(pill => {
      pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('is-active'));
        pill.classList.add('is-active');
        currentConnectorCat = pill.getAttribute('data-cat') || 'all';
        renderConnectors();
      });
    });

    connectorSearchInput?.addEventListener('input', renderConnectors);
    renderConnectors();
  }

  /* ==========================================================================
     9. ACCORDION (8 PILLARS)
     ========================================================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');

    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      accordionItems.forEach(other => {
        other.classList.remove('is-open');
        other.querySelector('.accordion-trigger')?.setAttribute('aria-expanded', 'false');
        const otherContent = other.querySelector('.accordion-content');
        if (otherContent) otherContent.style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        if (content) content.style.maxHeight = `${content.scrollHeight + 30}px`;
      }
    });
  });



  /* ==========================================================================
     11. DARK SECTION: ROW HOVER & THUMBNAIL
     ========================================================================== */
  const darkRows = document.querySelectorAll('.dark-row-item');
  const cursorThumbnail = document.getElementById('cursor-thumbnail');

  darkRows.forEach(row => {
    row.addEventListener('mouseenter', () => {
      const thumbGrad = row.getAttribute('data-thumb');
      if (cursorThumbnail && thumbGrad) {
        if (thumbGrad.startsWith('url(')) {
          cursorThumbnail.style.background = 'none';
          cursorThumbnail.style.backgroundImage = thumbGrad;
          cursorThumbnail.style.backgroundSize = 'cover';
        } else {
          cursorThumbnail.style.backgroundImage = 'none';
          cursorThumbnail.style.background = thumbGrad;
        }
        cursorThumbnail.style.opacity = '1';
        cursorThumbnail.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });

    row.addEventListener('mousemove', (e) => {
      if (cursorThumbnail) {
        cursorThumbnail.style.left = `${e.clientX}px`;
        cursorThumbnail.style.top = `${e.clientY}px`;
      }
    });

    row.addEventListener('mouseleave', () => {
      if (cursorThumbnail) {
        cursorThumbnail.style.opacity = '0';
        cursorThumbnail.style.transform = 'translate(-50%, -50%) scale(0.85)';
      }
    });
  });

  /* ==========================================================================
     12. ACTION PLAN CHECKLIST CARD INTERACTIVE ANIMATION
     ========================================================================== */
  const planTriggerCard = document.getElementById('plan-trigger-card');
  const checkItems = document.querySelectorAll('.checklist-item');
  const planProgressBar = document.getElementById('plan-progress-bar');
  const planCounter = document.getElementById('plan-counter');
  const planStatusLabel = document.getElementById('plan-status-label');
  let planCompleted = false;

  planTriggerCard?.addEventListener('click', () => {
    if (planCompleted) return;
    executePlanSimulation();
  });

  function executePlanSimulation() {
    planCompleted = true;
    let completed = 0;
    if (planStatusLabel) {
      planStatusLabel.textContent = 'Executing...';
      planStatusLabel.style.color = '#2a52ff';
    }

    const interval = prefersReducedMotion ? 100 : 700;
    checkItems.forEach((item, index) => {
      setTimeout(() => {
        item?.classList.add('is-done');
        completed++;
        const percent = (completed / checkItems.length) * 100;
        if (planProgressBar) planProgressBar.style.width = `${percent}%`;
        if (planCounter) planCounter.textContent = `${completed} of ${checkItems.length} completed`;

        if (completed === checkItems.length) {
          if (planStatusLabel) {
            planStatusLabel.textContent = 'All steps verified';
            planStatusLabel.style.color = '#1cb561';
            planStatusLabel.style.fontWeight = '600';
          }
        }
      }, (index + 1) * interval);
    });
  }


  /* ==========================================================================
     14. SEARCH MODAL (⌘K / Ctrl+K)
     ========================================================================== */
  const searchModal = document.getElementById('search-modal');
  const openSearchBtn = document.getElementById('open-search-btn');
  const mobileSearchBtn = document.getElementById('mobile-search-btn');
  const searchModalClose = document.getElementById('search-modal-close');
  const searchQueryInput = document.getElementById('search-query-input');
  const searchResultsContainer = document.getElementById('search-results-container');

  const siteTopics = [
    { title: "Platform Overview", badge: "Hero", target: "#hero" },
    { title: "Enterprise Search & Hybrid RAG", badge: "Search", target: "#statement" },
    { title: "50+ Enterprise Connectors", badge: "Connectors", target: "#connectors" },
    { title: "Live Dashboards Preview", badge: "Analytics", target: "#analytics" },
    { title: "Supported AI Models & Gateways", badge: "Models", target: "#models" },
    { title: "Actions & Tools (SAP, ServiceNow, Python)", badge: "Actions", target: "#actions" },
    { title: "8 Pillars of Enterprise AI", badge: "Pillars", target: "#accordion" },
    { title: "Sovereign AI & Frontier Evals", badge: "Governance", target: "#dark-section" },
    { title: "Autonomous Deep Research", badge: "Research", target: "#dark-section" },
    { title: "Craft / Build Mode (Agentic Sandbox)", badge: "Craft", target: "#tabs" },
    { title: "SAP S/4HANA Sales Order Actions", badge: "Actions", target: "#actions" },
    { title: "ServiceNow Incident Resolution", badge: "Actions", target: "#actions" },
    { title: "Model Context Protocol (MCP)", badge: "Actions", target: "#actions" },
    { title: "Document-Level ACL Mirroring & Governance", badge: "Governance", target: "#statement" },
    { title: "Schedule an Enterprise Demo", badge: "Demo", target: "demo" }
  ];

  function renderSearchResults(query = '') {
    if (!searchResultsContainer) return;
    const cleanQ = query.trim().toLowerCase();
    const filtered = cleanQ
      ? siteTopics.filter(t => t.title.toLowerCase().includes(cleanQ) || t.badge.toLowerCase().includes(cleanQ))
      : siteTopics;

    if (filtered.length === 0) {
      searchResultsContainer.innerHTML = `
        <li style="padding: 20px; text-align: center; color: var(--muted); font-size: 14px;">
          No matching platform topics found for "${query}"
        </li>
      `;
      return;
    }

    searchResultsContainer.innerHTML = filtered.map((item, idx) => `
      <li class="search-result-item ${idx === 0 ? 'is-selected' : ''}" data-target="${item.target}">
        <span class="search-result-title">${item.title}</span>
        <span class="search-result-badge">${item.badge}</span>
      </li>
    `).join('');

    searchResultsContainer.querySelectorAll('.search-result-item').forEach(el => {
      el.addEventListener('click', () => {
        selectSearchResult(el.getAttribute('data-target'));
      });
    });
  }

  function selectSearchResult(target) {
    closeSearchModal();
    if (target === 'demo') {
      openDemoModal();
    } else if (target && target.startsWith('#')) {
      const targetEl = document.querySelector(target);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
    }
  }

  function openSearchModal() {
    if (!searchModal) return;
    searchModal.classList.add('is-open');
    renderSearchResults('');
    setTimeout(() => searchQueryInput?.focus(), 50);
  }

  function closeSearchModal() {
    searchModal?.classList.remove('is-open');
    if (searchQueryInput) searchQueryInput.value = '';
  }

  openSearchBtn?.addEventListener('click', openSearchModal);
  mobileSearchBtn?.addEventListener('click', () => {
    mobileNavPanel?.classList.remove('is-open');
    hamburgerBtn?.classList.remove('is-active');
    openSearchModal();
  });
  searchModalClose?.addEventListener('click', closeSearchModal);

  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearchModal();
  });

  searchQueryInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value);
  });

  searchQueryInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchModal();
    } else if (e.key === 'Enter') {
      const firstItem = searchResultsContainer?.querySelector('.search-result-item');
      if (firstItem) {
        selectSearchResult(firstItem.getAttribute('data-target'));
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal?.classList.contains('is-open')) {
        closeSearchModal();
      } else {
        openSearchModal();
      }
    }
  });

  /* ==========================================================================
     15. "GET A DEMO" MODAL (VALIDATION & ENDPOINT SUBMISSION)
     ========================================================================== */
  const demoModal = document.getElementById('demo-modal');
  const demoModalClose = document.getElementById('demo-modal-close');
  const demoForm = document.getElementById('demo-form');
  const demoFormContainer = document.getElementById('demo-form-container');
  const demoSuccessScreen = document.getElementById('demo-success-screen');
  const demoSubmitBtn = document.getElementById('demo-submit-btn');

  const demoNameInput = document.getElementById('demo-name');
  const demoEmailInput = document.getElementById('demo-email');
  const demoCompanyInput = document.getElementById('demo-company');
  const demoNameError = document.getElementById('demo-name-error');
  const demoEmailError = document.getElementById('demo-email-error');
  const demoCompanyError = document.getElementById('demo-company-error');
  const demoGeneralError = document.getElementById('demo-general-error');

  function openDemoModal() {
    if (!demoModal) return;
    if (demoFormContainer) demoFormContainer.style.display = 'block';
    if (demoSuccessScreen) demoSuccessScreen.style.display = 'none';
    clearDemoErrors();
    if (demoForm) demoForm.reset();
    if (demoSubmitBtn) {
      demoSubmitBtn.disabled = false;
      demoSubmitBtn.textContent = 'Schedule Enterprise Demo';
    }
    demoModal.classList.add('is-open');
    setTimeout(() => demoNameInput?.focus(), 80);
  }

  function closeDemoModal() {
    demoModal?.classList.remove('is-open');
  }

  function clearDemoErrors() {
    [demoNameError, demoEmailError, demoCompanyError, demoGeneralError].forEach(el => {
      if (el) {
        el.textContent = '';
        el.classList.remove('is-visible');
      }
    });
    [demoNameInput, demoEmailInput, demoCompanyInput].forEach(el => {
      el?.classList.remove('is-invalid');
    });
  }

  document.querySelectorAll('.demo-trigger-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDemoModal();
    });
  });

  demoModalClose?.addEventListener('click', closeDemoModal);
  demoModal?.addEventListener('click', (e) => {
    if (e.target === demoModal) closeDemoModal();
  });

  demoForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearDemoErrors();

    const name = demoNameInput?.value.trim() || '';
    const email = demoEmailInput?.value.trim() || '';
    const company = demoCompanyInput?.value.trim() || '';

    let hasError = false;

    if (!name || name.length < 2) {
      if (demoNameError) {
        demoNameError.textContent = 'Full name is required (min 2 characters).';
        demoNameError.classList.add('is-visible');
      }
      demoNameInput?.classList.add('is-invalid');
      hasError = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      if (demoEmailError) {
        demoEmailError.textContent = 'A valid corporate email address is required.';
        demoEmailError.classList.add('is-visible');
      }
      demoEmailInput?.classList.add('is-invalid');
      hasError = true;
    }

    if (!company || company.length < 2) {
      if (demoCompanyError) {
        demoCompanyError.textContent = 'Company name is required.';
        demoCompanyError.classList.add('is-visible');
      }
      demoCompanyInput?.classList.add('is-invalid');
      hasError = true;
    }

    if (hasError) return;

    // Disable button while sending
    if (demoSubmitBtn) {
      demoSubmitBtn.disabled = true;
      demoSubmitBtn.textContent = 'Sending request...';
    }

    try {
      const endpoint = import.meta.env.VITE_FORM_ENDPOINT;
      if (endpoint && endpoint.trim()) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            company,
            submittedAt: new Date().toISOString()
          })
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status: ${response.status}`);
        }
      } else {
        // Fallback simulated async submission in local dev
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // Success
      if (demoFormContainer) demoFormContainer.style.display = 'none';
      if (demoSuccessScreen) demoSuccessScreen.style.display = 'block';
      showToast('Demo request received! Our team will get in touch.', 'success');

      setTimeout(() => {
        closeDemoModal();
      }, 3500);

    } catch (err) {
      if (demoGeneralError) {
        demoGeneralError.textContent = 'Unable to submit your request at this moment. Please try again or contact support.';
        demoGeneralError.classList.add('is-visible');
      }
      showToast('Submission error. Please try again.', 'error');
      if (demoSubmitBtn) {
        demoSubmitBtn.disabled = false;
        demoSubmitBtn.textContent = 'Schedule Enterprise Demo';
      }
    }
  });

  /* ==========================================================================
     16. SIGN IN / SSO MODAL (REQUEST ACCESS & SSO NOTICE - NO FAKE LOGIN)
     ========================================================================== */
  const signinModal = document.getElementById('signin-modal');
  const signinBtn = document.getElementById('sign-in-btn');
  const mobileSigninBtn = document.getElementById('mobile-sign-in-btn');
  const signinModalClose = document.getElementById('signin-modal-close');
  const signinForm = document.getElementById('signin-form');
  const signinEmailInput = document.getElementById('signin-email');
  const signinEmailError = document.getElementById('signin-email-error');
  const ssoSigninBtn = document.getElementById('sso-signin-btn');
  const ssoNotice = document.getElementById('sso-notice');

  function openSignInModal() {
    signinModal?.classList.add('is-open');
    signinForm?.reset();
    if (signinEmailError) {
      signinEmailError.textContent = '';
      signinEmailError.classList.remove('is-visible');
    }
    signinEmailInput?.classList.remove('is-invalid');
    if (ssoNotice) ssoNotice.style.display = 'none';
    setTimeout(() => signinEmailInput?.focus(), 80);
  }

  function closeSignInModal() {
    signinModal?.classList.remove('is-open');
  }

  signinBtn?.addEventListener('click', openSignInModal);
  mobileSigninBtn?.addEventListener('click', () => {
    mobileNavPanel?.classList.remove('is-open');
    hamburgerBtn?.classList.remove('is-active');
    openSignInModal();
  });
  signinModalClose?.addEventListener('click', closeSignInModal);
  signinModal?.addEventListener('click', (e) => {
    if (e.target === signinModal) closeSignInModal();
  });

  ssoSigninBtn?.addEventListener('click', () => {
    if (ssoNotice) {
      ssoNotice.style.display = ssoNotice.style.display === 'none' ? 'block' : 'none';
    }
  });

  signinForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signinEmailInput?.value.trim() || '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      if (signinEmailError) {
        signinEmailError.textContent = 'Please enter a valid corporate work email.';
        signinEmailError.classList.add('is-visible');
      }
      signinEmailInput?.classList.add('is-invalid');
      return;
    }

    closeSignInModal();
    showToast(`Access request received for ${email}. Our team will get in touch.`, 'success');
  });

  /* ==========================================================================
     17. "SEE IN ACTION" MODAL (ILLUSTRATIVE EXAMPLE WITH CITATIONS)
     ========================================================================== */
  const actionExampleModal = document.getElementById('action-example-modal');
  const actionModalClose = document.getElementById('action-modal-close');
  const actionModalDoneBtn = document.getElementById('action-modal-done-btn');
  const openActionExampleBtn = document.getElementById('open-action-example-btn');
  const actionModalTitle = document.getElementById('action-modal-title');
  const actionModalPrompt = document.getElementById('action-modal-prompt');
  const actionModalAnswer = document.getElementById('action-modal-answer');
  const actionModalCitations = document.getElementById('action-modal-citations');

  const actionExamples = {
    knowledge: {
      title: "Hybrid RAG & Verified Source Citations",
      prompt: "Locate the latest enterprise compliance policy across Confluence and Google Drive, then highlight data retention obligations.",
      answer: "Based on the Enterprise Data Retention Standard v3.2, customer records must be retained for 7 years from transaction completion, while temporary operational telemetry must be redacted after 90 days.",
      citations: "Sources cited: [Confluence: Legal/Policy-2026-v3] • [Google Drive: Legal-Retention-Schedule.pdf (p. 14)]"
    },
    agents: {
      title: "Specialized IT Agent Execution",
      prompt: "Act as Senior IT Helpdesk Specialist. Validate the user's Okta session and inspect active VPN gateways.",
      answer: "Okta session verified for user alex@enterprise.com (MFA active). VPN Gateway eu-west-02 is operational at 42% capacity with zero packet loss.",
      citations: "Sources cited: [Okta System Log API: Event #9281] • [Network/Gateway-Telemetry-v2]"
    },
    "deep-research": {
      title: "Autonomous Deep Research Synthesis",
      prompt: "Perform full competitive breakdown between Q3 regional supplier quotes and identify price drift anomalies.",
      answer: "Identified a 6.4% price drift anomaly across APAC vendor quotes compared to European baselines. Freight surcharges account for 4.1% of the deviation.",
      citations: "Sources cited: [SAP: S/4HANA Vendor Invoice Database] • [Procurement/Q3-Suppliers-Digest.xlsx]"
    },
    actions: {
      title: "ServiceNow & SAP Live Action Execution",
      prompt: "Create a High-Priority incident in ServiceNow for server cluster 'eu-west-04' and notify on-call in #devops-alerts.",
      answer: "Created incident INC0094182 with Priority 2 (High). Assigned to DevOps Infrastructure group. Broadcast notification dispatched to #devops-alerts.",
      citations: "Sources cited: [ServiceNow REST API: INC0094182] • [Slack Webhook: #devops-alerts]"
    },
    craft: {
      title: "Craft Sandbox: Containerized Tool Generation",
      prompt: "Build a real-time SAP order tracking dashboard with search, status filters, and export to CSV in an isolated preview container.",
      answer: "Generated interactive React dashboard component in isolated container sandbox with live preview. Filters enabled for Open, Shipped, and In Review orders with instant CSV download.",
      citations: "Sources cited: [Craft Sandbox: Container #c7a91f] • [SAP OData API: SalesOrderSet]"
    },
    security: {
      title: "Zero-Trust Document ACL Verification",
      prompt: "Audit query: Verify that Employee #4092 cannot access executive compensation folders during salary review.",
      answer: "Permission check passed. Employee #4092 has Basic User role with no access permissions to restricted Google Drive folder 'Executive Compensation 2026'. ACL mirroring verified.",
      citations: "Sources cited: [Drive ACL Mirroring Sync: Audit ID #5519] • [SCIM 2.0 Role Directory]"
    }
  };

  function openActionExampleModal() {
    if (!actionExampleModal) return;
    const example = actionExamples[activeTabKey] || actionExamples.knowledge;

    if (actionModalTitle) actionModalTitle.textContent = example.title;
    if (actionModalPrompt) actionModalPrompt.textContent = `"${example.prompt}"`;
    if (actionModalAnswer) actionModalAnswer.textContent = example.answer;
    if (actionModalCitations) actionModalCitations.innerHTML = `<strong>Sources cited:</strong> ${example.citations.replace('Sources cited: ', '')}`;

    actionExampleModal.classList.add('is-open');
  }

  function closeActionExampleModal() {
    actionExampleModal?.classList.remove('is-open');
  }

  openActionExampleBtn?.addEventListener('click', openActionExampleModal);
  actionModalClose?.addEventListener('click', closeActionExampleModal);
  actionModalDoneBtn?.addEventListener('click', closeActionExampleModal);
  actionExampleModal?.addEventListener('click', (e) => {
    if (e.target === actionExampleModal) closeActionExampleModal();
  });

  /* ==========================================================================
     18. "SEE INTERACTIVE WORKFLOW" MODAL (ANIMATED STEP-BY-STEP)
     ========================================================================== */
  const workflowModal = document.getElementById('workflow-modal');
  const workflowModalClose = document.getElementById('workflow-modal-close');
  const openWorkflowModalBtn = document.getElementById('open-workflow-modal-btn');
  const wfPlayBtn = document.getElementById('wf-play-btn');
  const wfReplayBtn = document.getElementById('wf-replay-btn');
  const wfSummaryText = document.getElementById('wf-summary-text');
  let wfAnimationTimer = null;

  function openWorkflowModal() {
    if (!workflowModal) return;
    workflowModal.classList.add('is-open');
    resetWorkflowAnimation();
    setTimeout(playWorkflowAnimation, 400);
  }

  function closeWorkflowModal() {
    workflowModal?.classList.remove('is-open');
    clearTimeout(wfAnimationTimer);
  }

  function resetWorkflowAnimation() {
    clearTimeout(wfAnimationTimer);
    for (let i = 1; i <= 3; i++) {
      const node = document.getElementById(`wf-node-${i}`);
      const status = document.getElementById(`wf-status-${i}`);
      node?.classList.remove('is-active', 'is-complete');
      if (status) status.textContent = 'Standby';
    }
    if (wfSummaryText) wfSummaryText.textContent = 'Ready to execute';
  }

  function playWorkflowAnimation() {
    resetWorkflowAnimation();
    if (wfSummaryText) wfSummaryText.textContent = 'Step 1 of 3: Fetching SAP ledger...';

    const node1 = document.getElementById('wf-node-1');
    const status1 = document.getElementById('wf-status-1');
    node1?.classList.add('is-active');
    if (status1) status1.textContent = 'Fetching...';

    wfAnimationTimer = setTimeout(() => {
      node1?.classList.remove('is-active');
      node1?.classList.add('is-complete');
      if (status1) status1.textContent = 'Fetched (Q3 Ledger)';

      const node2 = document.getElementById('wf-node-2');
      const status2 = document.getElementById('wf-status-2');
      node2?.classList.add('is-active');
      if (status2) status2.textContent = 'Verifying...';
      if (wfSummaryText) wfSummaryText.textContent = 'Step 2 of 3: Verifying policy doc anomalies...';

      wfAnimationTimer = setTimeout(() => {
        node2?.classList.remove('is-active');
        node2?.classList.add('is-complete');
        if (status2) status2.textContent = 'Verified (1 Discrepancy)';

        const node3 = document.getElementById('wf-node-3');
        const status3 = document.getElementById('wf-status-3');
        node3?.classList.add('is-active');
        if (status3) status3.textContent = 'Pushing...';
        if (wfSummaryText) wfSummaryText.textContent = 'Step 3 of 3: Pushing remediation to ServiceNow & Slack...';

        wfAnimationTimer = setTimeout(() => {
          node3?.classList.remove('is-active');
          node3?.classList.add('is-complete');
          if (status3) status3.textContent = 'Pushed & Notified';
          if (wfSummaryText) wfSummaryText.textContent = 'Completed: Incident resolved and audited.';
        }, 900);
      }, 900);
    }, 900);
  }

  openWorkflowModalBtn?.addEventListener('click', openWorkflowModal);
  workflowModalClose?.addEventListener('click', closeWorkflowModal);
  workflowModal?.addEventListener('click', (e) => {
    if (e.target === workflowModal) closeWorkflowModal();
  });
  wfPlayBtn?.addEventListener('click', playWorkflowAnimation);
  wfReplayBtn?.addEventListener('click', playWorkflowAnimation);

  // Global Escape Key Closes All Modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchModal();
      closeDemoModal();
      closeSignInModal();
      closeActionExampleModal();
      closeWorkflowModal();
    }
  });

  /* ==========================================================================
     19. ESA CHAT ASSISTANT (RESTRICTED ONLY TO PART 3 KNOWLEDGE)
     ========================================================================== */
  const chatGreetingBubble = document.getElementById('chat-greeting-bubble');
  const chatBubbleClose = document.getElementById('chat-bubble-close');
  const chatToggleBtn = document.getElementById('chat-toggle-btn');
  const chatPanel = document.getElementById('chat-panel');
  const chatCloseBtn = document.getElementById('chat-close-btn');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatTypingIndicator = document.getElementById('chat-typing-indicator');
  const chatChips = document.querySelectorAll('.chat-chip-btn');

  chatBubbleClose?.addEventListener('click', (e) => {
    e.stopPropagation();
    chatGreetingBubble?.remove();
  });

  chatToggleBtn?.addEventListener('click', () => {
    const isOpen = chatPanel?.classList.toggle('is-open');
    if (isOpen) {
      chatGreetingBubble?.remove();
      setTimeout(() => chatInput?.focus(), 80);
    }
  });

  chatCloseBtn?.addEventListener('click', () => {
    chatPanel?.classList.remove('is-open');
  });

  // Strict Knowledge Base extracted strictly from Part 3:
  const part3Knowledge = [
    {
      keywords: ['connector', 'connectors', 'integrate', 'sources', 'catalog', 'integrations'],
      answer: "ESAA supports 50+ connectors across 7 categories: ERP/Business (SAP S/4HANA, ServiceNow, Salesforce, HubSpot, Zendesk, Freshdesk, Gong, Highspot, Loopio), Storage (Google Drive, SharePoint, OneDrive, Box, Dropbox, Egnyte, Amazon S3, Cloudflare R2, Google Cloud Storage, Oracle OCI, local files), Communication (Slack, Teams, Discord, Zulip, Gmail, IMAP, Fireflies.ai, Discourse, XenForo), Knowledge (Confluence, Notion, BookStack, Outline, Guru, Slab, Coda, Document360, Axero, Lumapps, Drupal Wiki, MediaWiki/Wikipedia), Project Management (Jira, Linear, Asana, ClickUp, Productboard, TestRail), Code (GitHub, GitLab, Bitbucket), and Custom (Ingestion API, Web crawler)."
    },
    {
      keywords: ['architecture', 'layer', 'layers', 'fastapi', 'celery', 'redis', 'postgres', 'opensearch', 'vespa', 'minio'],
      answer: "ESAA's architecture consists of 5 layers: 1) Frontend: Next.js web app, chat & agent workspace, analytics dashboard, Craft, admin panel; 2) Application/API: FastAPI backend, Auth & RBAC (OAuth2, SAML, OIDC, SCIM), agent & RAG orchestration, tool engine (SAP, ServiceNow, Python, Sheets); 3) Async workers: Celery task workers, Redis cache & broker; 4) Data & indexing: PostgreSQL, OpenSearch/Vespa (hybrid BM25 + vector), MinIO object store; 5) Integrations: SAP S/4HANA, ServiceNow, cloud storage, Slack/Teams/Confluence/Jira, and LLMs."
    },
    {
      keywords: ['security', 'secure', 'role', 'roles', 'admin', 'curator', 'basic user', 'acl', 'audit', 'pii', 'budget', 'rate limit'],
      answer: "ESAA provides three role tiers: Admin (full management, connectors, invites, API keys), Curator (document sets and agents for groups), and Basic User (search, chat, personas, uploads). Security controls include document ACL sync, tamper-proof audit logging, in-flight PII masking, token budgets per user/group, and sliding-window rate limiting."
    },
    {
      keywords: ['model', 'models', 'llm', 'llms', 'openai', 'claude', 'gemini', 'bedrock', 'azure', 'ollama', 'vllm', 'embedding', 'rerank'],
      answer: "Supported models include: LLMs: OpenAI (GPT-4o, GPT-4o-mini, o1, o3-mini), Anthropic Claude, Google Gemini, Azure OpenAI, AWS Bedrock; Local LLMs: Ollama, LiteLLM Proxy, vLLM, LocalAI; Embeddings: Voyage AI, Cohere, OpenAI, Hugging Face; Rerankers: Cohere, Mixedbread, BAAI BGE."
    },
    {
      keywords: ['deploy', 'deployment', 'hosting', 'kubernetes', 'docker', 'aws', 'gcp', 'azure', 'on-premise', 'private cloud', 'lite', 'standard'],
      answer: "ESAA offers Standard vs Lite deployment: Standard provides full enterprise RAG, while Lite is a lightweight chat UI running under 1GB RAM. Hosting options include Kubernetes (Helm/Terraform), Docker Compose, AWS, GCP, Azure, and private on-premise cloud."
    },
    {
      keywords: ['action', 'actions', 'tool', 'tools', 'sap', 'servicenow', 'sheets', 'python', 'mcp', 'openapi', 'voice', 'image', 'web search'],
      answer: "Supported live actions include SAP (create sales orders, partner lookups, OData read/update), ServiceNow (create/update/resolve incidents, KB lookup), Google Sheets & chart engine (load, clean, aggregate, Altair chart), isolated Python sandbox, Model Context Protocol (MCP), OpenAPI import, live web search (Google PSE, Serper, Brave, SearXNG, Exa, Firecrawl), voice STT/TTS, and image generation."
    },
    {
      keywords: ['dashboard', 'dashboards', 'analytics', 'overview', 'itsm', 'ingestion'],
      answer: "ESAA includes 4 live dashboard views: Platform Overview (cluster health, chunk counts, storage, connector health), SAP Operational (sales order status, net values, channels, partners), ServiceNow ITSM (incidents by state/priority, KB health), and File Ingestion (formats PDF/DOCX/CSV/TXT, processing time, storage load)."
    },
    {
      keywords: ['craft', 'sandbox', 'build mode'],
      answer: "Craft / Build Mode (Agentic Sandbox) is a development environment where AI agents write, test, and render interactive tools, web apps, and scripts in isolated containers with live preview."
    },
    {
      keywords: ['demo', 'schedule', 'contact', 'access', 'request access'],
      answer: "You can request access or schedule a tailored walkthrough with our enterprise architecture team by clicking any 'Get a demo' button on this page."
    }
  ];

  function getEsaReply(userInput) {
    const clean = userInput.toLowerCase();
    for (const item of part3Knowledge) {
      if (item.keywords.some(k => clean.includes(k))) {
        return item.answer;
      }
    }
    return "I don't have that information. Please request a demo.";
  }

  function appendChatMessage(text, sender = 'esa') {
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-msg ${sender}`;
    msgDiv.textContent = text;
    chatMessages.insertBefore(msgDiv, chatTypingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleUserChatSubmission(query) {
    if (!query) return;
    appendChatMessage(query, 'user');
    if (chatInput) chatInput.value = '';

    if (chatTypingIndicator) {
      chatTypingIndicator.style.display = 'inline-flex';
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    const reply = getEsaReply(query);

    setTimeout(() => {
      if (chatTypingIndicator) chatTypingIndicator.style.display = 'none';
      appendChatMessage(reply, 'esa');
    }, 450);
  }

  chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput?.value.trim() || '';
    handleUserChatSubmission(query);
  });

  chatChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const q = chip.textContent?.trim() || '';
      handleUserChatSubmission(q);
    });
  });

  /* ==========================================================================
     18. CLIENT-SIDE ROUTER FOR PLATFORM PAGES
     ========================================================================== */
  const homeView = document.getElementById('home-view');
  const platformPageView = document.getElementById('platform-page-view');

  function updateMetaDescription(text) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', text);
  }

  function handleRoute(path) {
    const cleanPath = (path || '/').split('?')[0].split('#')[0];
    
    // Always close mega menu on navigation
    closeMegaMenu();

    if (cleanPath === '/platform/overview') {
      if (homeView) homeView.style.display = 'none';
      if (platformPageView) {
        platformPageView.style.display = 'block';
        platformPageView.innerHTML = renderPlatformOverviewPage();
      }
      document.title = "Platform Overview — ESAA Enterprise AI Platform";
      updateMetaDescription("ESAA is a unified, enterprise-grade AI platform that transforms foundational LLMs into secure, context-aware digital coworkers and autonomous agents connected to your core business systems.");
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    if (cleanPath.startsWith('/platform/')) {
      const slug = cleanPath.replace(/^\/platform\//, '').replace(/\/$/, '');
      const item = getPlatformItemBySlug(slug);

      if (item) {
        if (homeView) homeView.style.display = 'none';
        if (platformPageView) {
          platformPageView.style.display = 'block';
          platformPageView.innerHTML = renderPlatformDetailPage(item);

          // Attach smooth scroll for TOC buttons without changing URL hash
          platformPageView.querySelectorAll('.sidebar-toc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
              e.preventDefault();
              const targetId = btn.getAttribute('data-scroll-to');
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
                platformPageView.querySelectorAll('.sidebar-toc-btn').forEach(b => b.classList.remove('is-active'));
                btn.classList.add('is-active');
              }
            });
          });
        }
        document.title = `${item.title} — ESAA Platform`;
        updateMetaDescription(item.lead);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      } else {
        navigateTo('/platform/overview');
        return;
      }
    }

    // Default / Home
    if (homeView) homeView.style.display = 'block';
    if (platformPageView) {
      platformPageView.style.display = 'none';
      platformPageView.innerHTML = '';
    }
    document.title = "ESAA — Governed Enterprise AI Platform & Autonomous Execution";
    updateMetaDescription("ESAA turns foundational LLMs into secure, context-aware digital coworkers and autonomous agents connected to SAP, ServiceNow, Salesforce, Jira, Google Drive and communication channels.");
    
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' }), 50);
      }
    }
  }

  function navigateTo(path) {
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    handleRoute(path);
  }

  window.addEventListener('popstate', () => {
    handleRoute(window.location.pathname);
  });

  // Global link interception for SPA routes
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;

    if (href.startsWith('/platform') || href === '/') {
      e.preventDefault();
      closeMegaMenu();
      if (mobileNavPanel?.classList.contains('is-open')) {
        mobileNavPanel.classList.remove('is-open');
        hamburgerBtn?.classList.remove('is-active');
        hamburgerBtn?.setAttribute('aria-expanded', 'false');
      }
      navigateTo(href);
    }
  });

  // Mobile Platform Accordion Trigger
  const mobilePlatformTrigger = document.getElementById('mobile-platform-trigger');
  const mobilePlatformContent = document.getElementById('mobile-platform-content');
  if (mobilePlatformTrigger && mobilePlatformContent) {
    mobilePlatformTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isHidden = mobilePlatformContent.style.display === 'none';
      mobilePlatformContent.style.display = isHidden ? 'block' : 'none';
      mobilePlatformTrigger.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      mobilePlatformTrigger.classList.toggle('is-open', isHidden);
    });
  }

  // Delegated handler for any .demo-trigger-btn
  document.addEventListener('click', (e) => {
    const demoBtn = e.target.closest('.demo-trigger-btn');
    if (demoBtn) {
      e.preventDefault();
      closeMegaMenu();
      openDemoModal();
    }
  });

  // Execute initial routing on page load
  handleRoute(window.location.pathname);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
