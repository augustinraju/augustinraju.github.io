  /* ── Language toggle ── */
    let lang = 'en';
    const FLAGS = {
    en: `<rect width="20" height="14" fill="#012169"/>
        <path d="M0,0 L20,14 M20,0 L0,14" stroke="#fff" stroke-width="3" fill="none"/>
        <path d="M0,0 L20,14 M20,0 L0,14" stroke="#C8102E" stroke-width="1.8" fill="none"/>
        <rect width="20" height="4.67" x="0" y="4.67" fill="#fff"/>
        <rect width="8"  height="14"   x="6" y="0"    fill="#fff"/>
        <rect width="20" height="2.8"  x="0" y="5.6"  fill="#C8102E"/>
        <rect width="4.8" height="14"  x="7.6" y="0"  fill="#C8102E"/>`,
    de: `<rect width="20" height="4.67" y="0"    fill="#000000"/>
        <rect width="20" height="4.67" y="4.67" fill="#DD0000"/>
        <rect width="20" height="4.67" y="9.33" fill="#FFCE00"/>`
  };

  function setLang(newLang) {
    lang = newLang;
    const nextLang = lang === 'en' ? 'de' : 'en';

      // Show current language flag, label shows what you switch TO
      document.getElementById('flagSvg').innerHTML = FLAGS[nextLang];
      document.getElementById('langLabel').textContent = nextLang.toUpperCase();

      // Update all translated elements
      document.querySelectorAll('[data-en]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val) el.innerHTML = val;
      });
      document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        el.placeholder = el.getAttribute('data-placeholder-' + lang);
      });
      document.documentElement.lang = lang;
    }

    function toggleLang() {
      setLang(lang === 'en' ? 'de' : 'en');
    }

    /* ── Mobile menu ── */
    function toggleMenu() {
      const menu = document.getElementById('mobileMenu');
      const btn  = document.getElementById('hamburger');
      menu.classList.toggle('show');
      btn.classList.toggle('open');
    }

    /* ── Scroll fade-in ── */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    /* ── Active nav highlight ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 100) current = s.id;
      });
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + current ? 'var(--text)' : '';
      });
    }, { passive: true });

    setLang('en');