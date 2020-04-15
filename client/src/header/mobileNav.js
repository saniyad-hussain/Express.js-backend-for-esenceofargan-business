import flyd from 'flyd';

const mobileNav = document.getElementById('layout-header-mobile-nav');
const mobileNavButton = document.getElementById('layout-header-mobile-nav-button');
const mobileNavMenu = document.getElementById('layout-header-mobile-nav-menu');

mobileNav.classList.remove(mobileNav.dataset.hiddenClass);

const mobileMenuOpen = flyd.stream(false);

const onMenuClick = event => {
  event.customDataMenuClick = true;
};

const onBodyClick = event => {
  if (!event.customDataMenuClick) {
    mobileMenuOpen(false);
  }
};

flyd.on(isOpen => {
  if (isOpen) {
    mobileNavMenu.style.display = '';
    document.body.addEventListener('click', onBodyClick);
    mobileNavMenu.addEventListener('click', onMenuClick);
  } else {
    mobileNavMenu.style.display = 'none';
    document.body.removeEventListener('click', onBodyClick);
    mobileNavMenu.removeEventListener('click', onMenuClick);
  }
}, mobileMenuOpen);

mobileNavButton.addEventListener('click', () => {
  event.customDataMenuClick = true;
  mobileMenuOpen(!mobileMenuOpen());
});
