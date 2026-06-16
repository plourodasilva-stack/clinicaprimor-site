/* ============================================================
   Clínica Dr. Primor da Silva — main.js
   Hamburger menu + accessibility
   ============================================================ */

(function () {
  'use strict';

  /* ── Hamburger menu ── */
  const toggle   = document.querySelector('.nav-toggle');
  const overlay  = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close');

  if (!toggle || !overlay) return;

  function openMenu() {
    overlay.style.display = 'flex';
    // Force reflow so transition fires
    overlay.getBoundingClientRect();
    overlay.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Hide after transition ends
    overlay.addEventListener('transitionend', function handler() {
      if (!overlay.classList.contains('is-open')) {
        overlay.style.display = 'none';
      }
      overlay.removeEventListener('transitionend', handler);
    });
  }

  toggle.addEventListener('click', function () {
    overlay.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // Close when any nav link is clicked
  overlay.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeMenu();
  });

  // Close if viewport resized to desktop (avoids hidden nav on resize)
  window.addEventListener('resize', function () {
    if (window.innerWidth > 768 && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });

})();
