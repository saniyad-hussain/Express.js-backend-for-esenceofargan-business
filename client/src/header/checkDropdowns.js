const state = {};
state.openDropdowns = [];
const dropdownContainers = Array.from(document.querySelectorAll('[data-js-id="layout-header-dropdown-container"]'));
dropdownContainers.forEach(dropdownContainer => {
  const checkbox = dropdownContainer.querySelector('[data-js-id="layout-header-dropdown-checkbox"]');
  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      if (!state.openDropdowns.includes(dropdownContainer)) {
        state.openDropdowns.push(dropdownContainer);
      }
    } else {
      if (state.openDropdowns.includes(dropdownContainer)) {
        state.openDropdowns = [];
      }
    }
  });
  if (checkbox.checked) {
    state.openDropdowns.push(dropdownContainer);
  }
  dropdownContainer.addEventListener('click', event => {
    event.customDataInDropdown = dropdownContainer;
  });
});
document.body.addEventListener('click', (event) => {
  // check if target is a child of dropdownContainers, and if not, close them.
  state.openDropdowns.forEach(openDropdown => {
    if (openDropdown !== event.customDataInDropdown) {
      openDropdown.querySelector('[data-js-id="layout-header-dropdown-checkbox"]').checked = false;
    }
  });
});
