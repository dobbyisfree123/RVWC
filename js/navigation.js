document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');
  const updateFaxNumber = (root) => {
    if (!root) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];

    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }

    nodes.forEach((node) => {
      node.nodeValue = node.nodeValue
        .replace(/\(479\)\s*401-2609/g, '479-546-0881')
        .replace(/\(479\)\s*646-0881/g, '479-546-0881');
    });

    root
      .querySelectorAll(
        'a[href="tel:+14794012609"], a[href="tel:14794012609"], a[href="tel:+14796460881"], a[href="tel:14796460881"]'
      )
      .forEach((link) => {
        link.setAttribute('href', 'tel:+14795460881');
      });
  };

  updateFaxNumber(document.body);

  if (!headerContainer) return;

  fetch('components/navigation.html')
    .then((response) => response.text())
    .then((markup) => {
      headerContainer.innerHTML = markup;
      updateFaxNumber(headerContainer);

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
