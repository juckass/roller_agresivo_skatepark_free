/* ==================================================================== */
/*  CROSS GRIND CHILE — JS                                               */
/*  Sólo interacciones básicas. La página es estática.                  */
/* ==================================================================== */
(function () {
  'use strict';

  // -------- Menú móvil --------
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  function closeMenu() {
    nav.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Bloquear el scroll del fondo cuando el menú está abierto
      document.body.classList.toggle('no-scroll', isOpen);
    });

    // Cerrar el menú al hacer clic en un enlace
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // -------- Año dinámico en el footer --------
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -------- Reveal al hacer scroll (aparición de secciones) --------
  var revealEls = document.querySelectorAll('.reveal');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    // Sin animación: mostrar todo directamente
    revealEls.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) { io.observe(el); });
  }

  // -------- Header: sticky siempre visible, con entrada al hacer scroll --------
  var header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // -------- Lightbox (ver ficha completa) --------
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = lightbox ? lightbox.querySelector('img') : null;

  function openLightbox(imgEl) {
    if (!lightbox || !imgEl) return;
    lightboxImg.src = imgEl.currentSrc || imgEl.src;
    lightboxImg.alt = imgEl.alt || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  }
  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.body.classList.remove('no-scroll');
  }
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) closeLightbox();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
  }

  // Elementos que abren el lightbox al hacer clic (ej. ficha del profe)
  Array.prototype.forEach.call(document.querySelectorAll('[data-lightbox]'), function (el) {
    el.addEventListener('click', function () { openLightbox(el.querySelector('img')); });
  });

  // -------- Grilla de fichas: orden aleatorio + efecto 3D + lightbox --------
  var grid = document.getElementById('ridersGrid');
  if (grid) {
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.rider-card'));

    // Barajar (Fisher-Yates) y reordenar en el DOM en cada carga
    for (var i = cards.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = cards[i]; cards[i] = cards[j]; cards[j] = tmp;
    }
    cards.forEach(function (c) { grid.appendChild(c); });

    // Efecto 3D + clic para ampliar en cada ficha
    cards.forEach(function (card) {
      var img = card.querySelector('img');
      var MAX = 12; // grados máximos de inclinación

      if (!reduceMotion) {
        card.addEventListener('mousemove', function (e) {
          var r = card.getBoundingClientRect();
          var px = (e.clientX - r.left) / r.width;   // 0..1
          var py = (e.clientY - r.top) / r.height;
          var rotY = (px - 0.5) * 2 * MAX;
          var rotX = (0.5 - py) * 2 * MAX;
          card.style.transition = 'none';
          card.style.transform =
            'rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateZ(16px)';
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
        });
        card.addEventListener('mouseleave', function () {
          card.style.transition = 'transform .45s cubic-bezier(.2,.7,.2,1)';
          card.style.transform = '';
        });
      }

      card.addEventListener('click', function () { openLightbox(img); });
    });
  }
})();
