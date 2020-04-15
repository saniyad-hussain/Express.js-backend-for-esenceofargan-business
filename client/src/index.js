import '@babel/polyfill';
import log from './util/logging';

const scripts = [
  {
    name: 'header',
    module: () => import('./header'),
    load: true,
  },
  {
    name: 'single-product',
    module: () => import('./singleProduct'),
  },
];

Array.from(document.querySelectorAll('[data-script]')).forEach(el => {
  const name = el.dataset.script;
  const script = scripts.find(script => script.name === name);
  if (script) {
    script.load = true;
  } else {
    log(`Failed to load script, dataScript: ${name}`);
  }
});

scripts.forEach(script => {
  if (script.load) {
    script.module().catch(error => {
      log('script load error', error);
    });
  }
});
