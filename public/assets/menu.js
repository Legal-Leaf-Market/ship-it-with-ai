const menu = document.getElementById('site-menu');
const toggle = document.querySelector('.menu-toggle');

if (typeof menu?.showModal === 'function' && toggle) {
  document.documentElement.classList.add('menu-ready');
  toggle.hidden = false;
  const desktop = window.matchMedia('(min-width: 1001px)');

  toggle.addEventListener('click', () => {
    menu.showModal();
    toggle.setAttribute('aria-expanded', 'true');
  });
  menu.addEventListener('close', () => toggle.setAttribute('aria-expanded', 'false'));
  menu.addEventListener('click', event => {
    if (event.target.closest('a[href]')) {
      menu.close();
    } else if (event.target === menu) {
      const bounds = menu.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right) menu.close();
    }
  });
  desktop.addEventListener('change', event => {
    if (event.matches && menu.open) menu.close();
  });
}
