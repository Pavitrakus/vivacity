/* ══════════════════════════════════════════
   VIVACITY — SCRIPT v2
   ══════════════════════════════════════════ */

/* ── Mobile nav toggle ── */
const navBurger = document.getElementById('navBurger');
const navLinks  = document.getElementById('navLinks');

if (navBurger && navLinks) {
  navBurger.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

/* ── Hero textarea auto-resize ── */
const heroInput = document.getElementById('heroInput');
if (heroInput) {
  heroInput.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = this.scrollHeight + 'px';
  });
  heroInput.addEventListener('keydown', function (e) {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      if (!this.value.trim()) return;
      this.value = '';
      this.style.height = 'auto';
    }
  });
}

/* ── Video Play/Pause Toggle ── */
document.querySelectorAll('.vc-play-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const wrap = btn.closest('.video-wrap');
    const video = wrap.querySelector('video');
    const iconPlay = btn.querySelector('.icon-play');
    const iconPause = btn.querySelector('.icon-pause');

    if (video) {
      if (video.paused) {
        video.play();
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
      } else {
        video.pause();
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
      }
    }
  });
});

/* ── Scroll reveal ── */
const revealSections = document.querySelectorAll('.reveal-section');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.05, rootMargin: '-60px 0px' });

revealSections.forEach(el => io.observe(el));

/* ── FAQ accordion ── */
document.querySelectorAll('details.faq-item').forEach(detail => {
  detail.addEventListener('toggle', () => {
    if (detail.open) {
      document.querySelectorAll('details.faq-item').forEach(other => {
        if (other !== detail) other.open = false;
      });
    }
  });
});

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  const hash = link.getAttribute('href');
  if (hash === '#') return;
  link.addEventListener('click', e => {
    const target = document.querySelector(hash);
    if (target) {
      e.preventDefault();
      const offset = 56;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ══════════════════════════════════════════
// COOKIE BANNER
// ══════════════════════════════════════════
const cbAccept = document.getElementById('cbAccept');
const cookieBanner = document.getElementById('cookieBanner');

if (cbAccept && cookieBanner) {
  cbAccept.addEventListener('click', () => {
    cookieBanner.classList.add('hidden');
    // In a real app, set localStorage or a cookie here
  });
}
