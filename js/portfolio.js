(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const preferred = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  if (preferred === 'light' || preferred === 'dark') {
    root.dataset.theme = preferred;
  } else if (systemPrefersLight) {
    root.dataset.theme = 'light';
  }

  const syncThemeButton = () => {
    const isLight = root.dataset.theme === 'light';
    themeButton.setAttribute('aria-pressed', String(isLight));
    themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
    document.querySelector('meta[name="theme-color"]').content = isLight ? '#f5f8fc' : '#07111f';
  };

  themeButton.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('portfolio-theme', root.dataset.theme);
    syncThemeButton();
  });
  syncThemeButton();

  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    mobileNav.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    mobileNav.classList.toggle('is-open', !isOpen);
  });
  mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('[data-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const progress = document.querySelector('.scroll-progress');
  const updateScroll = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sections = document.querySelectorAll('main section[id]');
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle('is-active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

})();
