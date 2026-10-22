/**
 * 50+ Connectors Animated Card Component
 * Drops 52 enterprise connector tiles into a natural pyramid pile.
 * Uses Web Animations API & IntersectionObserver.
 */

import { desktopRows, mobileRows } from '../data/connectors.js';

export function initConnectorsCard() {
  const card = document.getElementById('connectors-animated-card');
  const animArea = document.getElementById('connectors-anim-area');
  const badge = document.getElementById('connectors-synced-badge');
  const stage = document.getElementById('connectors-pile-stage');

  if (!card || !animArea || !badge || !stage) return;

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isMobile = window.innerWidth < 640;
  let isVisible = false;
  let isPaused = false;
  let loopTimeoutId = null;
  let activeWebAnimations = new Set();
  let dropTimers = [];

  // Helper to check mobile breakpoint
  function checkMobile() {
    return window.innerWidth < 640;
  }

  // Pre-generate layout positions for current size
  function computeLayout(rows) {
    const W = animArea.clientWidth || (isMobile ? 320 : 540);
    const H = animArea.clientHeight || (isMobile ? 280 : 400);
    const S = isMobile ? 48 : 64;
    const bottomPadding = isMobile ? 12 : 18;
    const topPadding = isMobile ? 22 : 32;
    const totalRows = rows.length; // 7 rows
    const vStep = (H - S - bottomPadding - topPadding) / (totalRows - 1);

    const maxRowTiles = Math.max(...rows.map(r => r.length));
    const maxSpan = W - S - (isMobile ? 20 : 36);
    const dx = Math.min(S - 16, Math.max(22, maxSpan / (maxRowTiles - 1)));

    const tiles = [];

    // Row 0 is bottom row (SAP, ServiceNow, ...), Row 6 is top row (Local Files, API)
    rows.forEach((row, rIdx) => {
      const yFinal = H - S - bottomPadding - (rIdx * vStep);
      const rowLen = row.length;
      const rowWidth = (rowLen - 1) * dx + S;
      const startX = (W - rowWidth) / 2;

      row.forEach((item, cIdx) => {
        const xFinal = startX + cIdx * dx;
        const rotFinal = (Math.random() * 12) - 6; // random between -6deg and +6deg
        const xStart = xFinal + (Math.random() * 120 - 60); // +/-60px of final x
        const yStart = -S - 40; // above card overflow hidden
        const rotStart = (Math.random() * 50) - 25; // between -25deg and +25deg

        tiles.push({
          ...item,
          rIdx,
          cIdx,
          xFinal,
          yFinal,
          rotFinal,
          xStart,
          yStart,
          rotStart,
          zIndex: 5 + (rIdx * 15) + cIdx
        });
      });
    });

    return tiles;
  }

  // Create single tile DOM node
  function createTileElement(tileData) {
    const S = isMobile ? 48 : 64;
    const iconSize = isMobile ? 26 : 34;

    const el = document.createElement('div');
    el.className = 'connector-tile';
    el.setAttribute('title', tileData.name);
    el.setAttribute('aria-label', tileData.name);
    el.style.position = 'absolute';
    el.style.width = S + 'px';
    el.style.height = S + 'px';
    el.style.zIndex = tileData.zIndex;

    const inner = document.createElement('div');
    inner.className = 'connector-tile-inner';

    // Tooltip on hover
    const tooltip = document.createElement('span');
    tooltip.className = 'connector-tooltip';
    tooltip.textContent = tileData.name;
    inner.appendChild(tooltip);

    // Icon or Initials
    const iconWrapper = document.createElement('div');
    iconWrapper.className = 'connector-tile-icon';
    iconWrapper.style.width = iconSize + 'px';
    iconWrapper.style.height = iconSize + 'px';

    if (tileData.hasSvg && tileData.path) {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', String(iconSize));
      svg.setAttribute('height', String(iconSize));
      svg.setAttribute('aria-hidden', 'true');
      svg.style.width = iconSize + 'px';
      svg.style.height = iconSize + 'px';
      svg.style.display = 'block';
      svg.style.fill = tileData.color;

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', tileData.path);
      svg.appendChild(path);
      iconWrapper.appendChild(svg);
    } else {
      const initials = document.createElement('span');
      initials.className = 'connector-tile-initials';
      initials.style.color = tileData.color;
      initials.textContent = tileData.initials || tileData.name.slice(0, 2).toUpperCase();
      iconWrapper.appendChild(initials);
    }

    inner.appendChild(iconWrapper);
    el.appendChild(inner);

    // Hover interactions (lift 6px & show tooltip)
    el.addEventListener('mouseenter', () => {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      inner.style.transform = 'translateY(-6px)';
      inner.style.boxShadow = '0 10px 22px rgba(0, 0, 0, 0.14)';
      el.style.zIndex = '9999';
    });

    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
      inner.style.transform = '';
      inner.style.boxShadow = '';
      el.style.zIndex = tileData.zIndex;
    });

    return el;
  }

  // Reduced motion: show full pile statically
  function renderReducedMotion() {
    clearAll();
    const rows = isMobile ? mobileRows : desktopRows;
    const tiles = computeLayout(rows);
    badge.textContent = '50+ SYNCED';

    tiles.forEach(t => {
      const el = createTileElement(t);
      el.style.transform = `translate3d(${t.xFinal}px, ${t.yFinal}px, 0) rotate(${t.rotFinal}deg)`;
      el.style.opacity = '1';
      stage.appendChild(el);
    });
  }

  // Clear timers and active animations
  function clearAll() {
    if (loopTimeoutId) {
      clearTimeout(loopTimeoutId);
      loopTimeoutId = null;
    }
    dropTimers.forEach(id => clearTimeout(id));
    dropTimers = [];
    activeWebAnimations.forEach(anim => {
      try { anim.cancel(); } catch (e) {}
    });
    activeWebAnimations.clear();
    stage.innerHTML = '';
  }

  // Main animated drop loop
  function startAnimationLoop() {
    if (reducedMotionQuery.matches) {
      renderReducedMotion();
      return;
    }

    clearAll();
    badge.textContent = '0 SYNCED';

    const rows = isMobile ? mobileRows : desktopRows;
    const tiles = computeLayout(rows);
    const totalTiles = tiles.length;
    let landedCount = 0;
    const createdElements = [];

    tiles.forEach((tileData, index) => {
      const timerId = setTimeout(() => {
        if (!isVisible) return;

        const doDrop = () => {
          if (!isVisible) return;
          if (isPaused) {
            const retryId = setTimeout(doDrop, 120);
            dropTimers.push(retryId);
            return;
          }

          const tileEl = createTileElement(tileData);
          stage.appendChild(tileEl);
          createdElements.push(tileEl);

        // Fall animation (650ms, gravity ease cubic-bezier(0.55, 0, 0.9, 0.5))
        const fallAnim = tileEl.animate([
          {
            transform: `translate3d(${tileData.xStart}px, ${tileData.yStart}px, 0) rotate(${tileData.rotStart}deg)`,
            opacity: 0
          },
          {
            opacity: 1,
            offset: 0.12
          },
          {
            transform: `translate3d(${tileData.xFinal}px, ${tileData.yFinal}px, 0) rotate(${tileData.rotFinal}deg)`,
            opacity: 1
          }
        ], {
          duration: 650,
          easing: 'cubic-bezier(0.55, 0, 0.9, 0.5)',
          fill: 'forwards'
        });

        activeWebAnimations.add(fallAnim);

        fallAnim.onfinish = () => {
          activeWebAnimations.delete(fallAnim);
          landedCount++;

          // Counter update: when all landed, show "50+ SYNCED"
          if (landedCount >= totalTiles) {
            badge.textContent = '50+ SYNCED';
          } else {
            badge.textContent = `${landedCount} SYNCED`;
          }

          // Bounce up 6px and settle in 220ms
          const bounceAnim = tileEl.animate([
            {
              transform: `translate3d(${tileData.xFinal}px, ${tileData.yFinal}px, 0) rotate(${tileData.rotFinal}deg)`
            },
            {
              transform: `translate3d(${tileData.xFinal}px, ${tileData.yFinal - 6}px, 0) rotate(${tileData.rotFinal}deg)`,
              offset: 0.45,
              easing: 'ease-out'
            },
            {
              transform: `translate3d(${tileData.xFinal}px, ${tileData.yFinal}px, 0) rotate(${tileData.rotFinal}deg)`,
              easing: 'ease-in'
            }
          ], {
            duration: 220,
            fill: 'forwards'
          });

          activeWebAnimations.add(bounceAnim);

          bounceAnim.onfinish = () => {
            activeWebAnimations.delete(bounceAnim);
            tileEl.style.transform = `translate3d(${tileData.xFinal}px, ${tileData.yFinal}px, 0) rotate(${tileData.rotFinal}deg)`;
            try { bounceAnim.cancel(); } catch (e) {}

            // If this is the last tile, trigger hold and reset
            if (index === totalTiles - 1) {
              handleHoldAndReset(createdElements);
            }
          };
        };
      };

      doDrop();
    }, index * 70); // drop every 70ms

      dropTimers.push(timerId);
    });
  }

  // Hold for 3s, fade out 500ms, reset to 0 SYNCED, wait 400ms, loop
  function handleHoldAndReset(elements) {
    loopTimeoutId = setTimeout(() => {
      if (!isVisible) return;

      // Fade out over 500ms
      elements.forEach(el => {
        const fadeAnim = el.animate([
          { opacity: 1 },
          { opacity: 0 }
        ], {
          duration: 500,
          fill: 'forwards'
        });
        activeWebAnimations.add(fadeAnim);
      });

      loopTimeoutId = setTimeout(() => {
        if (!isVisible) return;
        badge.textContent = '0 SYNCED';
        stage.innerHTML = '';
        activeWebAnimations.clear();

        // Wait 400ms then restart loop
        loopTimeoutId = setTimeout(() => {
          if (isVisible) {
            startAnimationLoop();
          }
        }, 400);
      }, 500);
    }, 3000); // 3-second hold
  }

  // Pause / Resume methods
  function pauseAnimation() {
    isPaused = true;
    activeWebAnimations.forEach(anim => {
      try { anim.pause(); } catch (e) {}
    });
  }

  function resumeAnimation() {
    isPaused = false;
    activeWebAnimations.forEach(anim => {
      try { anim.play(); } catch (e) {}
    });
  }

  // IntersectionObserver (trigger when card enters viewport, threshold: 0.2)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === card) {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          if (!isVisible) {
            isVisible = true;
            startAnimationLoop();
          } else if (isPaused) {
            resumeAnimation();
          }
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
          if (isVisible && !isPaused) {
            pauseAnimation();
          }
        }
      }
    });
  }, {
    threshold: [0, 0.05, 0.2, 0.5]
  });

  observer.observe(card);

  // Initial check if card is already in viewport
  setTimeout(() => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !isVisible) {
      isVisible = true;
      startAnimationLoop();
    }
  }, 100);

  // Resize handler with debouncing
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const currentMobile = checkMobile();
      if (currentMobile !== isMobile) {
        isMobile = currentMobile;
        if (isVisible) {
          startAnimationLoop();
        }
      }
    }, 150);
  });

  // Reduced motion change listener
  reducedMotionQuery.addEventListener('change', () => {
    if (reducedMotionQuery.matches) {
      renderReducedMotion();
    } else if (isVisible) {
      startAnimationLoop();
    }
  });

  // Tab visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      pauseAnimation();
    } else if (isVisible) {
      resumeAnimation();
    }
  });
}
