document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');

  if (!headerContainer) return;

  fetch('navigation.html')
    .then((response) => response.text())
    .then((markup) => {
      headerContainer.innerHTML = markup;
    })
    .catch((error) => {
      console.error('Unable to load navigation.', error);
    });
});
