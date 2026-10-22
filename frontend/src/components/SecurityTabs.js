/**
 * Security & Governance Tabs Component
 * 4 interactive tabs with smooth transitions, staggered chip entrances,
 * live SVG drawing animations, and full accessibility support.
 */

export function initSecurityTabs() {
  const container = document.getElementById('security');
  if (!container) return;

  const tabs = container.querySelectorAll('.sec-tab-btn');
  const indicator = container.querySelector('.sec-tab-indicator');
  const panelVisual = container.querySelector('.sec-visual-container');
  const panelText = container.querySelector('.sec-desc-text');

  if (!tabs.length || !panelVisual || !panelText) return;

  let activeIndex = -1;
  let hoverTimeout = null;
  let fadeTimeout = null;
  let textTimeout = null;
  let sequenceTimeouts = [];
  let tab3PulseInterval = null;

  const tabData = [
    {
      id: 'deploy',
      title: 'Secure Deployment',
      text: 'Deploy on Kubernetes or Docker in your own AWS, Azure, or GCP account. Run on-premise or fully air-gapped with a local model, and use Lite Mode (under 1GB RAM) for edge sites.',
      renderVisual: renderTab1Visual
    },
    {
      id: 'identity',
      title: 'Identity & Access',
      text: 'Single sign-on with SAML 2.0 and OIDC through Okta or Microsoft Entra ID, and automatic user provisioning and deprovisioning with SCIM 2.0. Roles: Admin, Curator, and Basic User.',
      renderVisual: renderTab2Visual
    },
    {
      id: 'safety',
      title: 'Generative AI Safety',
      text: 'Use any approved LLM provider with your own keys, or a self-hosted model (Ollama, vLLM) for air-gapped use. PII masking and the Evals CLI check sensitive prompts, and Langfuse and OpenTelemetry tracing show what happened.',
      renderVisual: renderTab3Visual
    },
    {
      id: 'permissions',
      title: 'Granular Permissions',
      text: 'Document-level permissions are synced from Google Drive, Confluence, Slack, and other sources, so people only see answers from documents they are allowed to see. Token budgets and rate limits per user or group, plus audit logging.',
      renderVisual: renderTab4Visual
    }
  ];

  // SVG Icons
  const ICONS = {
    k8s: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#326CE5" aria-hidden="true"><path d="M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34z"/></svg>`,
    docker: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#2496ED" aria-hidden="true"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/></svg>`,
    aws: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M7.74 13.06c0 .44-.12.8-.35 1.08-.24.28-.58.42-1.02.42-.42 0-.75-.14-.99-.42-.23-.28-.35-.64-.35-1.08 0-.46.12-.83.35-1.1.24-.28.57-.42.99-.42.44 0 .78.14 1.02.42.23.27.35.64.35 1.1zm3.87-4.14v5.33c0 .54-.15.99-.46 1.34-.3.35-.74.53-1.3.53-.45 0-.81-.13-1.09-.38-.28-.25-.47-.59-.57-1.03-.31.47-.68.83-1.12 1.07-.44.24-.96.36-1.57.36-.83 0-1.51-.25-2.03-.76-.52-.51-.78-1.21-.78-2.1 0-.91.29-1.64.88-2.18.59-.54 1.41-.83 2.45-.88l1.96-.08v-.38c0-.46-.11-.8-.32-1.03-.22-.22-.57-.34-1.05-.34-.39 0-.73.08-1.02.24-.29.16-.54.39-.74.69l-.65-.54c.27-.41.62-.72 1.03-.94.42-.22.92-.33 1.5-.33.82 0 1.44.2 1.87.6.43.4.65 1.01.65 1.83v2.79c0 .35.07.61.2.78.13.17.33.25.6.25.26 0 .48-.09.65-.26.17-.18.29-.46.36-.84V8.92h.98zm11.75 8.16c-.34.27-.77.44-1.22.44-.7 0-1.23-.42-1.55-1.16l-2.73-6.57h1.17l2.08 5.34 2.05-5.34h1.14l-2.85 6.78c-.28.66-.6 1.12-.96 1.37-.36.25-.8.38-1.32.38-.29 0-.58-.04-.88-.13v-.92c.24.08.47.12.7.12.35 0 .64-.09.87-.31zm-6.07-5.02c.4 0 .76-.08 1.08-.25.32-.17.58-.41.76-.71.19-.31.28-.68.28-1.11 0-.44-.09-.81-.28-1.12a1.86 1.86 0 0 0-.76-.71 2.37 2.37 0 0 0-1.08-.24c-.4 0-.76.08-1.08.24-.32.16-.57.4-.76.71-.19.31-.28.68-.28 1.12 0 .43.09.8.28 1.11.19.3.44.54.76.71.32.17.68.25 1.08.25zm-.01-5.12c.57 0 1.08.13 1.53.38.45.25.8.61 1.06 1.07.26.46.39 1 .39 1.62s-.13 1.16-.39 1.62c-.26.46-.61.81-1.06 1.07-.45.25-.96.38-1.53.38s-1.08-.13-1.53-.38c-.45-.26-.81-.61-1.06-1.07-.26-.46-.38-1-.38-1.62s.13-1.16.38-1.62c.26-.46.61-.81 1.06-1.07.45-.25.96-.38 1.53-.38zm-11.45 11.8c-3.11 0-5.83-.98-8.15-2.93-.19-.16-.08-.4.14-.29 2.05 1.04 4.4 1.57 6.8 1.57 2.94 0 5.86-.79 8.35-2.28.36-.21.68.16.38.4-2.14 1.71-4.76 2.53-7.52 2.53z" fill="#FF9900"/></svg>`,
    azure: `<svg width="34" height="34" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.05 2.15L5.7 14.86l5.77 3.33 3.65-6.32z" fill="#0089D6"/><path d="M13.05 2.15L2.83 19.85h6.39l3.83-6.66z" fill="#0072C6"/><path d="M13.05 2.15l-1.58 2.74 3.65 6.32 5.7-3.29z" fill="#1490DF"/><path d="M15.12 11.21l-3.65 6.32 6.83 4.32h5.7z" fill="#0072C6"/></svg>`,
    gcp: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#4285F4" aria-hidden="true"><path d="M12.19 2.38a9.344 9.344 0 0 0-9.234 6.893c.053-.02-.055.013 0 0-3.875 2.551-3.922 8.11-.247 10.941l.006-.007-.007.03a6.717 6.717 0 0 0 4.077 1.356h5.173l.03.03h5.192c6.687.053 9.376-8.605 3.835-12.35a9.365 9.365 0 0 0-2.821-4.552l-.043.043.006-.05A9.344 9.344 0 0 0 12.19 2.38zm-.358 4.146c1.244-.04 2.518.368 3.486 1.15a5.186 5.186 0 0 1 1.862 4.078v.518c3.53-.07 3.53 5.262 0 5.193h-5.193l-.008.009v-.04H6.785a2.59 2.59 0 0 1-1.067-.23h.001a2.597 2.597 0 1 1 3.437-3.437l3.013-3.012A6.747 6.747 0 0 0 8.11 8.24c.018-.01.04-.026.054-.023a5.186 5.186 0 0 1 3.67-1.69z"/></svg>`,
    okta: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#007DC1" aria-hidden="true"><path d="M12 0C5.389 0 0 5.35 0 12s5.35 12 12 12 12-5.35 12-12S18.611 0 12 0zm0 18c-3.325 0-6-2.675-6-6s2.675-6 6-6 6 2.675 6 6-2.675 6-6 6z"/></svg>`,
    entra: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="1" y="1" width="10" height="10" fill="#F25022"/><rect x="13" y="1" width="10" height="10" fill="#7FBA00"/><rect x="1" y="13" width="10" height="10" fill="#00A4EF"/><rect x="13" y="13" width="10" height="10" fill="#FFB900"/></svg>`,
    openai: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#10A37F" aria-hidden="true"><path d="M22.28 9.9c-.27-.88-.73-1.68-1.34-2.34a6.76 6.76 0 0 0-3.66-2.03 6.94 6.94 0 0 0-4.73.57 6.8 6.8 0 0 0-3.7-2.09 6.84 6.84 0 0 0-5.32 1.35 6.78 6.78 0 0 0-2.58 4.22c-.32 1.1-.35 2.26-.08 3.37a6.8 6.8 0 0 0-1.43 3.93c.03 1.48.55 2.91 1.49 4.07.94 1.16 2.22 1.96 3.65 2.28a6.83 6.83 0 0 0 4.73-.58 6.8 6.8 0 0 0 3.7 2.1 6.86 6.86 0 0 0 5.33-1.36 6.78 6.78 0 0 0 2.58-4.22c.32-1.1.35-2.26.08-3.37a6.76 6.76 0 0 0 1.43-3.93 6.8 6.8 0 0 0-1.49-4.07 6.87 6.87 0 0 0-3.65-2.29zm-6.2 12.06c-.66.38-1.4.6-2.16.64l-.54-2.73 3.8-2.19v2.45c0 .63-.37 1.45-1.1 1.83zm4.08-3.98a4.96 4.96 0 0 1-1.84 1.34l-2.48-1.43 2.18-1.26 2.14 1.23v.12zm1.6-4.9c-.04.75-.29 1.48-.73 2.09l-2.44-1.41v-4.38l2.13 1.23c.63.36 1.04 1.37 1.04 2.47zm-5.04-3.52l-2.18 1.26-2.14-1.23a4.96 4.96 0 0 1 1.84-1.34l2.48 1.31zm-6.52 1.44l2.44 1.41v4.38l-2.13-1.23c-.63-.37-1.04-1.38-1.04-2.48.04-.75.29-1.47.73-2.08zm1.6 8.35l2.18-1.26 2.14 1.23a4.96 4.96 0 0 1-1.84 1.34l-2.48-1.31zm3.76-2.17l-1.92-1.11 1.92-1.11 1.92 1.11-1.92 1.11z"/></svg>`,
    anthropic: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#191919" aria-hidden="true"><path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"/></svg>`,
    gemini: `<svg width="34" height="34" viewBox="0 0 24 24" fill="#8E75B2" aria-hidden="true"><path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"/></svg>`,
    gdrive: `<svg width="32" height="32" viewBox="0 0 24 24" fill="#4285F4" aria-hidden="true"><path d="M12.01 1.485c-2.082 0-3.754.02-3.743.047.01.02 1.708 3.001 3.774 6.62l3.76 6.574h3.76c2.081 0 3.753-.02 3.742-.047-.005-.02-1.708-3.001-3.775-6.62l-3.76-6.574zm-4.76 1.73a789.828 789.861 0 0 0-3.63 6.319L0 15.868l1.89 3.298 1.885 3.297 3.62-6.335 3.618-6.33-1.88-3.287C8.1 4.704 7.255 3.22 7.25 3.214zm2.259 12.653-.203.348c-.114.198-.96 1.672-1.88 3.287a423.93 423.948 0 0 1-1.698 2.97c-.01.026 3.24.042 7.222.042h7.244l1.796-3.157c.992-1.734 1.85-3.23 1.906-3.323l.104-.167h-7.249z"/></svg>`,
    slack: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/><path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/><path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/><path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/></svg>`,
    jira: `<svg width="32" height="32" viewBox="0 0 24 24" fill="#0052CC" aria-hidden="true"><path d="M11.571 11.513H0a5.218 5.218 0 0 0 5.232 5.215h2.13v2.057A5.215 5.215 0 0 0 12.575 24V12.518a1.005 1.005 0 0 0-1.005-1.005zm5.723-5.756H5.736a5.215 5.215 0 0 0 5.215 5.214h2.129v2.058a5.218 5.218 0 0 0 5.215 5.214V6.758a1.001 1.001 0 0 0-1.001-1.001zM23.013 0H11.455a5.215 5.215 0 0 0 5.215 5.215h2.129v2.057A5.215 5.215 0 0 0 24 12.483V1.005A1.001 1.001 0 0 0 23.013 0Z"/></svg>`
  };

  // Check reduced motion
  function isReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // Visual Renderers for each tab
  function renderTab1Visual(stage) {
    stage.innerHTML = `
      <div class="sec-vis-row sec-vis-tab1" aria-hidden="true">
        <div class="sec-chip sec-chip-k8s" title="Kubernetes">${ICONS.k8s}</div>
        <div class="sec-chip sec-chip-docker" title="Docker">${ICONS.docker}</div>
        <div class="sec-chip sec-chip-aws" title="AWS">${ICONS.aws}</div>
        <div class="sec-chip sec-chip-azure" title="Azure">${ICONS.azure}</div>
        <div class="sec-chip sec-chip-gcp" title="Google Cloud">${ICONS.gcp}</div>
      </div>
    `;
    staggerChips(stage.querySelectorAll('.sec-chip'));
  }

  function renderTab2Visual(stage) {
    stage.innerHTML = `
      <div class="sec-vis-col sec-vis-tab2" aria-hidden="true">
        <div class="sec-vis-row">
          <div class="sec-chip" title="Okta">${ICONS.okta}</div>
          <div class="sec-chip" title="Microsoft Entra ID">${ICONS.entra}</div>
          <div class="sec-chip sec-chip-text" title="SAML 2.0"><span class="chip-text-label">SAML 2.0</span></div>
        </div>
        <div class="sec-badge-row">
          <span class="sec-pill-badge">OIDC</span>
          <span class="sec-pill-badge">SCIM 2.0</span>
        </div>
      </div>
    `;
    staggerChips(stage.querySelectorAll('.sec-chip, .sec-pill-badge'));
  }

  function renderTab3Visual(stage) {
    stage.innerHTML = `
      <div class="sec-vis-tab3-wrap" aria-hidden="true">
        <div class="sec-vis-stack">
          <div class="sec-chip" title="OpenAI">${ICONS.openai}</div>
          <div class="sec-chip" title="Anthropic">${ICONS.anthropic}</div>
          <div class="sec-chip" title="Google Gemini">${ICONS.gemini}</div>
        </div>
        
        <div class="sec-travel-track">
          <svg class="sec-track-svg" width="120" height="20" viewBox="0 0 120 20">
            <line x1="10" y1="10" x2="110" y2="10" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="4 4" />
          </svg>
          <div class="sec-cyan-pulse" id="sec-cyan-pulse"></div>
        </div>

        <div class="sec-llm-pill">
          <div class="sec-pill-icon sec-icon-search">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <div class="sec-pill-icon sec-icon-chat">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div class="sec-pill-icon sec-icon-pulse">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
        </div>
      </div>
    `;

    staggerChips(stage.querySelectorAll('.sec-chip, .sec-llm-pill'));

    if (!isReducedMotion()) {
      startCyanPulseAnimation();
    }
  }

  function renderTab4Visual(stage) {
    stage.innerHTML = `
      <div class="sec-vis-tab4-wrap" aria-hidden="true">
        <!-- 3 Overlapped Sources -->
        <div class="sec-stacked-sources">
          <div class="sec-chip sec-src-1" title="Google Drive">${ICONS.gdrive}</div>
          <div class="sec-chip sec-src-2" title="Slack">${ICONS.slack}</div>
          <div class="sec-chip sec-src-3" title="Jira">${ICONS.jira}</div>
        </div>

        <!-- Dashed Line 1 -->
        <svg class="sec-connect-line sec-line-1" width="80" height="24" viewBox="0 0 80 24">
          <line x1="0" y1="12" x2="80" y2="12" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 4" class="sec-dash-path-1" />
        </svg>

        <!-- Green Lock Circle with Ring Pulse -->
        <div class="sec-lock-wrapper">
          <div class="sec-ring-pulse" id="sec-ring-pulse"></div>
          <div class="sec-lock-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        <!-- Dashed Line 2 -->
        <svg class="sec-connect-line sec-line-2" width="80" height="24" viewBox="0 0 80 24">
          <line x1="0" y1="12" x2="80" y2="12" stroke="#94A3B8" stroke-width="2" stroke-dasharray="6 4" class="sec-dash-path-2" />
        </svg>

        <!-- ESAA Logo Mark -->
        <div class="sec-chip sec-esaa-mark" title="ESAA Enterprise">
          <img src="esaa-logo-light.png" alt="ESAA" class="sec-esaa-img" />
        </div>
      </div>
    `;

    playTab4Sequence(stage);
  }

  // Cyan travelling pulse for Tab 3
  function startCyanPulseAnimation() {
    clearInterval(tab3PulseInterval);
    const pulseEl = document.getElementById('sec-cyan-pulse');
    if (!pulseEl) return;

    const triggerPulse = () => {
      pulseEl.classList.remove('is-travelling');
      void pulseEl.offsetWidth; // trigger reflow
      pulseEl.classList.add('is-travelling');
    };

    triggerPulse();
    tab3PulseInterval = setInterval(triggerPulse, 2000);
  }

  function clearAllTimeouts() {
    clearTimeout(fadeTimeout);
    clearTimeout(textTimeout);
    sequenceTimeouts.forEach(t => clearTimeout(t));
    sequenceTimeouts = [];
  }

  // Sequential Entrance for Tab 4
  function playTab4Sequence(stage) {
    const chips = stage.querySelectorAll('.sec-stacked-sources .sec-chip');
    const line1 = stage.querySelector('.sec-dash-path-1');
    const lockWrap = stage.querySelector('.sec-lock-wrapper');
    const line2 = stage.querySelector('.sec-dash-path-2');
    const esaaChip = stage.querySelector('.sec-esaa-mark');

    if (isReducedMotion()) {
      chips.forEach(c => { c.style.opacity = '1'; c.style.transform = 'none'; });
      if (lockWrap) { lockWrap.style.opacity = '1'; lockWrap.style.transform = 'none'; }
      if (esaaChip) { esaaChip.style.opacity = '1'; esaaChip.style.transform = 'none'; }
      return;
    }

    // Step 1: Chips slide in from left (staggered 80ms)
    chips.forEach((c, idx) => {
      c.style.opacity = '0';
      c.style.transform = 'translateX(-20px) scale(0.9)';
      const t = setTimeout(() => {
        c.style.transition = 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
        c.style.opacity = '1';
        c.style.transform = 'translateX(0) scale(1)';
      }, idx * 80);
      sequenceTimeouts.push(t);
    });

    // Step 2: Line 1 draws (at 260ms)
    if (line1) {
      line1.style.strokeDashoffset = '80';
      const t = setTimeout(() => {
        line1.style.transition = 'stroke-dashoffset 400ms ease-out';
        line1.style.strokeDashoffset = '0';
      }, 260);
      sequenceTimeouts.push(t);
    }

    // Step 3: Green lock circle pops in with ring pulse (at 660ms)
    if (lockWrap) {
      lockWrap.style.opacity = '0';
      lockWrap.style.transform = 'scale(0.7)';
      const t = setTimeout(() => {
        lockWrap.style.transition = 'opacity 300ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1)';
        lockWrap.style.opacity = '1';
        lockWrap.style.transform = 'scale(1)';
      }, 660);
      sequenceTimeouts.push(t);
    }

    // Step 4: Line 2 draws (at 940ms)
    if (line2) {
      line2.style.strokeDashoffset = '80';
      const t = setTimeout(() => {
        line2.style.transition = 'stroke-dashoffset 400ms ease-out';
        line2.style.strokeDashoffset = '0';
      }, 940);
      sequenceTimeouts.push(t);
    }

    // Step 5: ESAA logo fades in (at 1300ms)
    if (esaaChip) {
      esaaChip.style.opacity = '0';
      esaaChip.style.transform = 'scale(0.85)';
      const t = setTimeout(() => {
        esaaChip.style.transition = 'opacity 320ms ease-out, transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
        esaaChip.style.opacity = '1';
        esaaChip.style.transform = 'scale(1)';
        applyFloatIdle([esaaChip, ...chips]);
      }, 1300);
      sequenceTimeouts.push(t);
    }
  }

  // Stagger entrance for chips (Tab 1, Tab 2, Tab 3)
  function staggerChips(elements) {
    if (isReducedMotion()) {
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    elements.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(8px) scale(0.8)';
      const t = setTimeout(() => {
        el.style.transition = 'opacity 320ms cubic-bezier(0.16, 1, 0.3, 1), transform 320ms cubic-bezier(0.16, 1, 0.3, 1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      }, i * 80);
      sequenceTimeouts.push(t);
    });

    const idleT = setTimeout(() => {
      applyFloatIdle(elements);
    }, elements.length * 80 + 340);
    sequenceTimeouts.push(idleT);
  }

  // Idle float animation
  function applyFloatIdle(elements) {
    if (isReducedMotion()) return;
    elements.forEach((el, idx) => {
      el.classList.add('is-floating');
      el.style.animationDelay = `${(idx * 0.45) % 2.5}s`;
    });
  }

  // Update Left Indicator Bar Position
  function updateIndicator(index) {
    if (!indicator) return;
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      // On mobile, tabs stack as full width 96px rows
      indicator.style.transform = `translateY(${index * 96}px)`;
      indicator.style.height = '96px';
    } else {
      indicator.style.transform = `translateY(${index * 124}px)`;
      indicator.style.height = '124px';
    }
  }

  // Main Tab Selection Function
  function selectTab(index, animate = true) {
    if (index < 0 || index >= tabData.length) return;
    if (index === activeIndex && animate) return;
    activeIndex = index;

    // Update Tab list ARIA & classes
    tabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
      tab.classList.toggle('is-active', isSelected);
    });

    updateIndicator(index);
    const panel = container.querySelector('.security-detail-panel');
    if (panel && tabs[index]) {
      panel.setAttribute('aria-labelledby', tabs[index].id);
    }
    
    clearAllTimeouts();
    clearInterval(tab3PulseInterval);

    const currentTab = tabData[index];

    if (!animate || isReducedMotion()) {
      panelVisual.style.opacity = '1';
      panelText.style.opacity = '1';
      panelText.style.transform = 'none';
      panelText.textContent = currentTab.text;
      currentTab.renderVisual(panelVisual);
      return;
    }

    // 120ms fade out of old content
    panelVisual.style.transition = 'opacity 120ms ease-out';
    panelText.style.transition = 'opacity 120ms ease-out';
    panelVisual.style.opacity = '0';
    panelText.style.opacity = '0';

    fadeTimeout = setTimeout(() => {
      // Render new visual
      currentTab.renderVisual(panelVisual);
      panelVisual.style.transition = 'opacity 200ms ease-in';
      panelVisual.style.opacity = '1';

      // Text enters 100ms after chips start
      panelText.textContent = currentTab.text;
      panelText.style.opacity = '0';
      panelText.style.transform = 'translateY(6px)';

      textTimeout = setTimeout(() => {
        panelText.style.transition = 'opacity 250ms ease-out, transform 250ms cubic-bezier(0.16, 1, 0.3, 1)';
        panelText.style.opacity = '1';
        panelText.style.transform = 'translateY(0)';
      }, 100);
    }, 120);
  }

  // Attach event listeners to tabs
  tabs.forEach((tab, i) => {
    // Click / tap
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      clearTimeout(hoverTimeout);
      selectTab(i);
    });

    // Desktop hover with 120ms delay
    tab.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          selectTab(i);
        }, 120);
      }
    });

    tab.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
    });

    // Keyboard navigation: Up/Down arrows, Home/End, Enter/Space
    tab.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        nextIndex = (activeIndex + 1) % tabs.length;
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = tabs.length - 1;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectTab(i);
        return;
      }

      if (nextIndex !== null) {
        tabs[nextIndex].focus();
        selectTab(nextIndex);
      }
    });
  });

  // Handle window resize for indicator
  window.addEventListener('resize', () => {
    updateIndicator(activeIndex);
  });

  // Default active tab on load: Tab 1
  selectTab(0, false);
}
