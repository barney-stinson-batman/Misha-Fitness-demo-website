document.addEventListener('DOMContentLoaded', () => {

  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('done'), 1300);
    });
    setTimeout(() => preloader.classList.add('done'), 2500);
  }

  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  const burger = document.getElementById('burger');
  const menu   = document.getElementById('navMenu');

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      menu.classList.toggle('open');
      document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });
    menu.querySelectorAll('.nm').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('open');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  const revealSelectors = [
    '.offer-card', '.why-point', '.pillar-card',
    '.prog-card', '.cred-card', '.apv-item',
    '.tss-item', '.hiw-step', '.fp-inner',
    '.featured-programme', '.about-intro',
    '.credentials-section', '.approach-section',
    '.sec-head', '.ts-text', '.ci-prefer', '.ci-block'
  ];

  revealSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!el.classList.contains('reveal-up') && !el.classList.contains('reveal-right')) {
        el.classList.add('reveal-up');
        el.style.transitionDelay = `${(i % 6) * 0.08}s`;
      }
    });
  });

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -32px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => obs.observe(el));

  document.querySelectorAll('[data-target]').forEach(el => {
    const co = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const target = parseInt(el.dataset.target);
      const dur    = 1800;
      const step   = 16;
      const inc    = target / (dur / step);
      let val      = 0;

      const timer = setInterval(() => {
        val += inc;
        if (val >= target) { val = target; clearInterval(timer); }
        el.textContent = Math.round(val).toLocaleString();
      }, step);

      co.disconnect();
    }, { threshold: 0.5 });
    co.observe(el);
  });

  const dotsEl = document.getElementById('heroDots');
  if (dotsEl) {
 
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      dotsEl.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  const blobs = document.querySelectorAll('.hbg-blob');
  if (blobs.length) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5);
      const y = (e.clientY / window.innerHeight - 0.5);
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 18;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    const nameEl   = document.getElementById('f-name');
    const emailEl  = document.getElementById('f-email');
    const msgEl    = document.getElementById('f-msg');
    const nameErr  = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const msgErr   = document.getElementById('msgErr');
    const submitBtn = document.getElementById('submitBtn');
    const btnTxt   = document.getElementById('btnTxt');
    const btnLoad  = document.getElementById('btnLoad');
    const success  = document.getElementById('formSuccess');

    const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const setErr  = (el, msg) => { if (el) el.textContent = msg; };
    const clrErr  = (el)      => { if (el) el.textContent = ''; };

    nameEl  && nameEl.addEventListener('blur',  () => nameEl.value.trim().length < 2  ? setErr(nameErr,  'Please enter your name')       : clrErr(nameErr));
    emailEl && emailEl.addEventListener('blur', () => !isEmail(emailEl.value.trim())   ? setErr(emailErr, 'Please enter a valid email')    : clrErr(emailErr));
    msgEl   && msgEl.addEventListener('blur',   () => msgEl.value.trim().length < 5   ? setErr(msgErr,   'Please enter a message')         : clrErr(msgErr));

    form.addEventListener('submit', e => {
      e.preventDefault();
      let ok = true;

      if (!nameEl  || nameEl.value.trim().length < 2)  { setErr(nameErr,  'Please enter your name');       ok = false; } else clrErr(nameErr);
      if (!emailEl || !isEmail(emailEl.value.trim()))   { setErr(emailErr, 'Please enter a valid email');   ok = false; } else clrErr(emailErr);
      if (!msgEl   || msgEl.value.trim().length < 5)    { setErr(msgErr,   'Please enter a message');       ok = false; } else clrErr(msgErr);

      if (!ok) return;

      if (btnTxt)     btnTxt.style.display   = 'none';
      if (btnLoad)    btnLoad.style.display  = 'inline';
      if (submitBtn)  submitBtn.disabled     = true;

      setTimeout(() => {
        form.style.display = 'none';
        if (success) {
          success.style.display = 'block';
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1400);
    });
  }

  const strip = document.querySelector('.ss-track');
  if (strip) {
    strip.addEventListener('mouseenter', () => strip.style.animationPlayState = 'paused');
    strip.addEventListener('mouseleave', () => strip.style.animationPlayState = 'running');
  }

  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.35s ease';
  requestAnimationFrame(() => { document.body.style.opacity = '1'; });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('tel:') ||
        href.startsWith('mailto:') || href.startsWith('http')) return;
    link.addEventListener('click', e => {
      e.preventDefault();
      document.body.style.opacity = '0';
      setTimeout(() => { window.location.href = href; }, 300);
    });
  });

  setTimeout(() => {
    document.querySelectorAll('.hero-badge, .hero-h1, .hero-p, .hero-btns, .hero-social').forEach((el, i) => {
      if (el.classList.contains('reveal-up')) return;
      el.style.opacity        = '0';
      el.style.transform      = 'translateY(22px)';
      el.style.transition     = 'opacity 0.65s ease, transform 0.65s ease';
      el.style.transitionDelay = `${0.1 + i * 0.1}s`;
      requestAnimationFrame(() => {
        el.style.opacity   = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, 1400);

  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nm').forEach(link => {
    if (link.getAttribute('href') === page) link.classList.add('active');
  });

});
