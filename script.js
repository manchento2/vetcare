/**
 * VetCare – Centro Veterinario Integral
 * JavaScript principal: navegación, animaciones, formulario, contadores
 */

'use strict';

/* ══════════════════════════════════════════════
   1. UTILIDADES
══════════════════════════════════════════════ */

/**
 * Selecciona un elemento del DOM
 * @param {string} selector
 * @param {Document|Element} scope
 */
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/**
 * Agrega eventos de manera más limpia
 */
const on = (el, event, handler, options = {}) => {
  if (el) el.addEventListener(event, handler, options);
};

/* ══════════════════════════════════════════════
   2. HEADER SCROLL
══════════════════════════════════════════════ */
const header = $('#header');
const SCROLL_THRESHOLD = 80;

function handleHeaderScroll() {
  const scrolled = window.scrollY > SCROLL_THRESHOLD;
  header.classList.toggle('scrolled', scrolled);

  // Cambiar a tema claro fuera del hero
  const heroHeight = $('#inicio')?.offsetHeight || window.innerHeight;
  header.classList.toggle('header--light', window.scrollY > heroHeight * 0.75);
}

on(window, 'scroll', handleHeaderScroll, { passive: true });
handleHeaderScroll(); // ejecutar al cargar

/* ══════════════════════════════════════════════
   3. MENÚ MÓVIL (HAMBURGUESA)
══════════════════════════════════════════════ */
const navToggle = $('#nav-toggle');
const navMenu   = $('#nav-menu');
const navLinks  = $$('.nav__link');

function openMenu() {
  navMenu.classList.add('open');
  navToggle.classList.add('active');
  navToggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

function toggleMenu() {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
}

on(navToggle, 'click', toggleMenu);

// Cerrar al hacer clic en un link
navLinks.forEach(link => on(link, 'click', closeMenu));

// Cerrar al hacer clic fuera del menú
on(document, 'click', (e) => {
  if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
    closeMenu();
  }
});

// Cerrar con Escape
on(document, 'keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

/* ══════════════════════════════════════════════
   4. SMOOTH SCROLL & LINK ACTIVO
══════════════════════════════════════════════ */
navLinks.forEach(link => {
  on(link, 'click', (e) => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;

    e.preventDefault();
    const target = $(href);
    if (!target) return;

    const offset = header.offsetHeight + 8;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// Resaltar link activo según sección visible
const sections = $$('section[id]');

function updateActiveLink() {
  const scrollY = window.scrollY + header.offsetHeight + 60;

  sections.forEach(section => {
    const { top, bottom } = section.getBoundingClientRect();
    const absTop = top + window.scrollY;
    const absBot = bottom + window.scrollY;

    if (scrollY >= absTop && scrollY < absBot) {
      navLinks.forEach(link => link.classList.remove('active'));
      const active = $(`.nav__link[href="#${section.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}

on(window, 'scroll', updateActiveLink, { passive: true });

/* ══════════════════════════════════════════════
   5. BOTÓN "VOLVER ARRIBA"
══════════════════════════════════════════════ */
const backToTopBtn = $('#back-to-top-btn');

function handleBackToTop() {
  backToTopBtn?.classList.toggle('visible', window.scrollY > 400);
}

on(window, 'scroll', handleBackToTop, { passive: true });
on(backToTopBtn, 'click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ══════════════════════════════════════════════
   6. ANIMACIONES DE SCROLL (INTERSECTION OBSERVER)
══════════════════════════════════════════════ */
function setupScrollAnimations() {
  const revealTargets = $$('.service-card, .benefit-card, .testimonial-card, .contact-info-card, .value-item');

  // Agregar clase reveal a los elementos
  revealTargets.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 3) * 0.08}s`;
  });

  // Secciones principales
  $$('.about__grid > *, .contact__grid > *').forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
  });

  $$('.section__header').forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  $$('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));
}

setupScrollAnimations();

/* ══════════════════════════════════════════════
   7. CONTADOR ANIMADO (HERO STATS)
══════════════════════════════════════════════ */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing easeOutQuart
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.floor(eased * target);

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }

  requestAnimationFrame(update);
}

function setupCounters() {
  const counterEls = $$('[data-count]');
  if (!counterEls.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach(el => counterObserver.observe(el));
}

setupCounters();

/* ══════════════════════════════════════════════
   8. VALIDACIÓN DEL FORMULARIO
══════════════════════════════════════════════ */
const form         = $('#contact-form');
const submitBtn    = $('#form-submit-btn');
const btnLoader    = $('#btn-loader');
const formSuccess  = $('#form-success');

/**
 * Reglas de validación
 */
const validationRules = {
  'owner-name': {
    validate: (v) => v.trim().length >= 2,
    message: 'Por favor ingresá tu nombre completo (mínimo 2 caracteres).',
  },
  'phone': {
    validate: (v) => /^[\d\s\+\-\(\)]{7,}$/.test(v.trim()),
    message: 'Ingresá un número de teléfono válido (mínimo 7 dígitos).',
  },
  'pet-name': {
    validate: (v) => v.trim().length >= 1,
    message: 'El nombre de tu mascota es requerido.',
  },
  'service': {
    validate: (v) => v !== '',
    message: 'Por favor seleccioná un servicio.',
  },
};

/**
 * Muestra o limpia un error en un campo
 */
function setFieldError(fieldId, message = '') {
  const field = $(`#${fieldId}`);
  const errorEl = $(`#error-${fieldId}`);

  if (!field) return;

  if (message) {
    field.classList.add('error');
    field.classList.remove('valid');
    if (errorEl) errorEl.textContent = message;
  } else {
    field.classList.remove('error');
    field.classList.add('valid');
    if (errorEl) errorEl.textContent = '';
  }
}

/**
 * Valida un campo individual
 */
function validateField(fieldId) {
  const rule = validationRules[fieldId];
  if (!rule) return true;

  const field = $(`#${fieldId}`);
  if (!field) return true;

  const value = field.value;
  const isValid = rule.validate(value);

  setFieldError(fieldId, isValid ? '' : rule.message);
  return isValid;
}

/**
 * Valida todos los campos del formulario
 */
function validateForm() {
  let allValid = true;

  Object.keys(validationRules).forEach(fieldId => {
    const valid = validateField(fieldId);
    if (!valid) allValid = false;
  });

  return allValid;
}

// Validación en tiempo real
if (form) {
  Object.keys(validationRules).forEach(fieldId => {
    const field = $(`#${fieldId}`);
    if (!field) return;

    on(field, 'blur', () => validateField(fieldId));
    on(field, 'input', () => {
      if (field.classList.contains('error')) validateField(fieldId);
    });
  });

  // Submit
  on(form, 'submit', handleFormSubmit);
}

async function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    // Scroll al primer error
    const firstError = form.querySelector('.form__input.error, .form__select.error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstError.focus();
    }
    return;
  }

  // Mostrar loader
  submitBtn.disabled = true;
  btnLoader.style.display = 'inline-block';
  submitBtn.querySelector('i').style.display = 'none';

  // Simulación de envío (reemplazar con fetch real)
  await simulateSubmit();

  // Éxito
  submitBtn.style.display = 'none';
  formSuccess.style.display = 'flex';
  formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

  // Opcional: redirigir a WhatsApp con los datos pre-cargados
  setTimeout(() => {
    const ownerName = $('#owner-name')?.value || '';
    const petName   = $('#pet-name')?.value || '';
    const service   = $('#service')?.options[$('#service')?.selectedIndex]?.text || '';
    const phone     = $('#phone')?.value || '';

    const msg = encodeURIComponent(
      `Hola VetCare 🐾 Mi nombre es ${ownerName}, quiero agendar un turno.\n` +
      `🐶 Mascota: ${petName}\n` +
      `📋 Servicio: ${service}\n` +
      `📞 Tel: ${phone}`
    );

    const waLink = `https://wa.me/5426642220000?text=${msg}`;

    // Abrir WhatsApp automáticamente
    window.open(waLink, '_blank');
  }, 1200);
}

function simulateSubmit() {
  return new Promise(resolve => setTimeout(resolve, 1500));
}

/* ══════════════════════════════════════════════
   9. BOTÓN DE WHATSAPP – TOOLTIP EN MOBILE
══════════════════════════════════════════════ */
const waBtn = $('#whatsapp-float-btn');

if (waBtn && window.matchMedia('(hover: none)').matches) {
  // En dispositivos táctiles: mostrar tooltip al primer toque
  let tooltipVisible = false;

  on(waBtn, 'click', (e) => {
    if (!tooltipVisible) {
      e.preventDefault();
      waBtn.querySelector('.whatsapp-float__tooltip').style.opacity = '1';
      waBtn.querySelector('.whatsapp-float__tooltip').style.transform = 'translateY(-50%) scale(1)';
      tooltipVisible = true;

      setTimeout(() => {
        waBtn.querySelector('.whatsapp-float__tooltip').style.opacity = '0';
        tooltipVisible = false;
      }, 2000);
    }
  });
}

/* ══════════════════════════════════════════════
   10. RIPPLE EFFECT EN BOTONES
══════════════════════════════════════════════ */
function createRipple(e) {
  const btn = e.currentTarget;
  const existing = btn.querySelector('.ripple');
  if (existing) existing.remove();

  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.classList.add('ripple');
  Object.assign(ripple.style, {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.25)',
    transform: 'scale(0)',
    animation: 'rippleAnim 0.6s ease-out forwards',
    pointerEvents: 'none',
  });

  btn.style.position = 'relative';
  btn.style.overflow = 'hidden';
  btn.appendChild(ripple);

  setTimeout(() => ripple.remove(), 700);
}

// Inyectar keyframe de ripple dinámicamente
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleAnim {
    to { transform: scale(1); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

$$('.btn').forEach(btn => on(btn, 'click', createRipple));

/* ══════════════════════════════════════════════
   11. LAZY LOADING FALLBACK
══════════════════════════════════════════════ */
if ('loading' in HTMLImageElement.prototype) {
  // Navegador soporta lazy loading nativo
} else {
  // Fallback para navegadores antiguos
  const lazyImages = $$('img[loading="lazy"]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        imageObserver.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* ══════════════════════════════════════════════
   12. TARJETAS DE SERVICIO – HOVER MEJORADO
══════════════════════════════════════════════ */
$$('.service-card').forEach(card => {
  on(card, 'mouseenter', () => {
    card.style.zIndex = '1';
  });
  on(card, 'mouseleave', () => {
    card.style.zIndex = '';
  });
});

/* ══════════════════════════════════════════════
   13. INICIALIZACIÓN
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  console.log('%cVetCare – Centro Veterinario Integral', 'color: #0d8f85; font-size: 1.1rem; font-weight: bold;');
  console.log('%c✓ Sitio web cargado correctamente', 'color: #22c55e; font-size: 0.85rem;');
});
