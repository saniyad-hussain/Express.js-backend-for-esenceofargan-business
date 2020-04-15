import purchaseOptions from './purchaseOptions';
import image from './image';

const singleProductRoot = document.querySelector('[data-js-id="singleProductRoot"]');

const product = JSON.parse(singleProductRoot.dataset.data);
const deps = { product };
purchaseOptions(deps);
image(deps);
