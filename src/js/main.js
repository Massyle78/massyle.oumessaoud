/* ============================================
   MASSYLE OUMESSAOUD — PORTFOLIO
   Main JavaScript
   ============================================ */

import { gsap } from 'gsap';

// ──────────────────────────────────────────
// 1. CUSTOM CURSOR
// ──────────────────────────────────────────
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

if (window.matchMedia('(pointer: fine)').matches && cursorDot && cursorRing) {
  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursorDot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
  });

  function animateRing() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    cursorRing.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Hover effect on interactive elements
  document.querySelectorAll('a, button, [role="button"], input, textarea, .project-card, .blog-card, .skill-domain').forEach((el) => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

// ──────────────────────────────────────────
// 2. THEME TOGGLE
// ──────────────────────────────────────────
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Load saved theme or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ──────────────────────────────────────────
// 3. MOBILE MENU
// ──────────────────────────────────────────
const burger = document.querySelector('.nav__burger');
const mobileMenu = document.querySelector('.mobile-menu');

burger?.addEventListener('click', () => {
  const isOpen = burger.getAttribute('aria-expanded') === 'true';
  burger.setAttribute('aria-expanded', !isOpen);
  mobileMenu.classList.toggle('open');
  mobileMenu.setAttribute('aria-hidden', isOpen);
  document.body.style.overflow = isOpen ? '' : 'hidden';
});

// Close mobile menu on link click
mobileMenu?.querySelectorAll('.mobile-menu__link').forEach((link) => {
  link.addEventListener('click', () => {
    burger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

// ──────────────────────────────────────────
// 4. SCROLL REVEAL (IntersectionObserver)
// ──────────────────────────────────────────
const revealElements = document.querySelectorAll(
  '.reveal-text, .skill-domain, .project-card, .pub-entry, .timeline__entry, .blog-card, .metric'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ──────────────────────────────────────────
// 5. COUNTER ANIMATION
// ──────────────────────────────────────────
const metrics = document.querySelectorAll('.metric');
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const numEl = el.querySelector('.metric__number');
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        animateCounter(numEl, target, suffix);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

metrics.forEach((m) => counterObserver.observe(m));

function animateCounter(el, target, suffix) {
  const duration = 1500;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4); // ease-out quart
    el.textContent = Math.round(target * ease) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ──────────────────────────────────────────
// 6. PROJECT FILTERS
// ──────────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;

    filterBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    projectCards.forEach((card) => {
      const category = card.dataset.category;
      if (filter === 'all' || category === filter) {
        card.classList.remove('hidden');
        card.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ──────────────────────────────────────────
// 7. HERO CANVAS — Neural Network Animation
// ──────────────────────────────────────────
const canvas = document.querySelector('.hero__canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let nodes = [];
  let animFrame;
  let w, h;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
    initNodes();
  }

  function initNodes() {
    const count = Math.min(Math.floor((w * h) / 12000), 80);
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
      });
    }
  }

  function getAccentColor() {
    const theme = html.getAttribute('data-theme');
    return theme === 'light' ? '0, 120, 105' : '0, 229, 199';
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const accentRGB = getAccentColor();
    const connectionDist = 160;

    // Update & draw nodes
    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;

      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accentRGB}, 0.85)`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          const isLight = html.getAttribute('data-theme') === 'light';
          const alpha = (1 - dist / connectionDist) * (isLight ? 0.7 : 0.45);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${accentRGB}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrame);
    resize();
    draw();
  });

  // Mouse interaction — push nodes slightly
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    nodes.forEach((n) => {
      const dx = mx - n.x;
      const dy = my - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        n.vx -= dx * 0.0005;
        n.vy -= dy * 0.0005;
      }
    });
  });
}

// ──────────────────────────────────────────
// 8. HERO TEXT ANIMATION (GSAP)
// ──────────────────────────────────────────
gsap.set('.hero .reveal-text', { opacity: 0, y: 40, filter: 'blur(8px)' });

gsap.to('.hero .reveal-text', {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out',
  delay: 0.3,
});

// ──────────────────────────────────────────
// 9. TIMELINE LINE ANIMATION
// ──────────────────────────────────────────
const timelineLine = document.querySelector('.timeline__line');
if (timelineLine) {
  const timelineSection = document.querySelector('.timeline');

  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            timelineLine,
            { background: `linear-gradient(to bottom, var(--accent) 0%, var(--border) 0%)` },
            {
              background: `linear-gradient(to bottom, var(--accent) 100%, var(--border) 100%)`,
              duration: 2,
              ease: 'power2.out',
            }
          );
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineObserver.observe(timelineSection);
}

// ──────────────────────────────────────────
// 10. SMOOTH NAV SCROLL
// ──────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ──────────────────────────────────────────
// 11. NAV BACKGROUND ON SCROLL
// ──────────────────────────────────────────
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.style.borderBottomColor = 'var(--border-accent)';
  } else {
    nav.style.borderBottomColor = 'var(--border)';
  }
});

// ──────────────────────────────────────────
// 12. TERMINAL EASTER EGG
// ──────────────────────────────────────────
const terminal = document.getElementById('terminal');
const terminalClose = document.querySelector('.terminal__close');

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.shiftKey && e.key === 'T') {
    e.preventDefault();
    terminal?.classList.toggle('open');
  }
});

terminalClose?.addEventListener('click', () => {
  terminal?.classList.remove('open');
});

// ──────────────────────────────────────────
// 13. FADE IN UP KEYFRAME (for filter)
// ──────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
