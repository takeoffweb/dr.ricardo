/* ═══════════════════════════════════════════
   DR. RICARDO BRIDI — SCRIPT.JS
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: scrolled state ── */
  const nav = document.getElementById('nav');

  const updateNav = () => {
    if (window.scrollY > 30) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── NAV: burger menu ── */
  const burger = document.getElementById('burger');
  const navOverlay = document.getElementById('navOverlay');

  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    navOverlay.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navOverlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-right');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings within same parent
        const siblings = Array.from(entry.target.parentElement.querySelectorAll('.reveal, .reveal-right'));
        const idx = siblings.indexOf(entry.target);
        const delay = idx * 80;

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));


  /* ── SMOOTH ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav__links a:not(.nav__cta)');

  const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkEls.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--gold)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => activeObserver.observe(s));

  /* ── FORM: submit via WhatsApp ── */
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!nome || !email) {
        shake(form.querySelector('button[type="submit"]'));
        return;
      }

      const servico = document.getElementById('servico').value;
      const mensagem = document.getElementById('mensagem').value.trim();

      const texto = encodeURIComponent(
        `Olá, Dr. Ricardo! 👋\n\nMeu nome é *${nome}*.\nE-mail: ${email}\n` +
        (servico ? `Interesse em: *${servico}*.\n` : '') +
        (mensagem ? `\n${mensagem}\n` : '') +
        `\nAguardo retorno!`
      );

      window.open(`https://wa.me/5554999999999?text=${texto}`, '_blank');
    });
  }

  const shake = (el) => {
    el.style.transform = 'translateX(-6px)';
    setTimeout(() => el.style.transform = 'translateX(6px)', 80);
    setTimeout(() => el.style.transform = 'translateX(-4px)', 160);
    setTimeout(() => el.style.transform = 'translateX(4px)', 240);
    setTimeout(() => el.style.transform = '', 320);
  };

  /* ── SERVICE CARDS: tilt on hover ── */
  const cards = document.querySelectorAll('.servico-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s cubic-bezier(.4,0,.2,1), box-shadow .4s, background .4s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .1s, box-shadow .4s, background .4s';
    });
  });

  /* ── HERO: subtle parallax on scroll ── */
  const heroPhoto = document.querySelector('.hero__photo');
  if (heroPhoto && window.innerWidth > 900) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroPhoto.style.transform = `translateY(${scrolled * 0.12}px)`;
    }, { passive: true });
  }

});