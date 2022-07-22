import '@/scss/common.scss';
import { Utilities } from './utilities';
// import 'core-js';
// import SampleApiClass from './models/SampleApiClass';

console.log('[Load] === load ===');
Utilities.global();

window.addEventListener('DOMContentLoaded', () => {
  console.log('[Load] === dom content loaded ===');

  Utilities.domLoaded();
});

window.onload = () => {
  console.log('[Load] === window on load ===');

  Utilities.onLoad();
};
