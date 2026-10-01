document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('site-header');
  if (!container) return;
  // The embedded header remains usable when fetching the shared header fails.
  try {
    const response = await fetch('components/navigation.html');
    if (!response.ok) throw new Error(`Navigation request failed: ${response.status}`);
    const markup = await response.text();
    const template = document.createElement('template');
    template.innerHTML = markup;
    if (!template.content.querySelector('header nav')) throw new Error('Invalid navigation markup');
    container.replaceChildren(template.content.cloneNode(true));
  } catch (error) {
    console.warn('Using fallback navigation.', error);
  }
  const header = container.querySelector('header');
  const toggle = container.querySelector('.menu-toggle');
  const nav = container.querySelector('nav');
  if (!header || !toggle || !nav) return;
  header.classList.add('navigation-ready');
  const current = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach(link => {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
  });
  const closeMenu = () => {
    header.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
  };
  toggle.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', String(header.classList.toggle('nav-open')));
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && header.classList.contains('nav-open')) {
      closeMenu();
      toggle.focus();
    }
  });
  document.addEventListener('click', event => { if (!header.contains(event.target)) closeMenu(); });
  header.addEventListener('focusout', () => {
    setTimeout(() => { if (!header.contains(document.activeElement)) closeMenu(); }, 0);
  });
});
