document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');

  if (!headerContainer) return;

  fetch('components/navigation.html')
    .then((response) => response.text())
    .then((markup) => {
      headerContainer.innerHTML = markup;

      const header = headerContainer.querySelector('header');
      const toggleButton = headerContainer.querySelector('.menu-toggle');
      const nav = headerContainer.querySelector('nav');

      if (!header || !toggleButton || !nav) return;

      const closeMenu = () => {
        header.classList.remove('nav-open');
        toggleButton.setAttribute('aria-expanded', 'false');
      };

      toggleButton.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        toggleButton.setAttribute('aria-expanded', String(isOpen));
      });

      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', closeMenu);
      });
    })
    .catch((error) => {
      console.error('Unable to load navigation.', error);
    });
});
