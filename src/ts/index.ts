import '@/scss/common.scss';
// import 'core-js';
import { enableJQuery } from './vendors/enableJQuery';
import Viewport from './utilities/viewport';
import UserAgent from './utilities/userAgent';

console.log(new Viewport());

const ua = new UserAgent();
$('header h1').text(`browser: ${ua.browser} os: ${ua.os}`);

enableJQuery.init();
console.log('jQuery:', $.fn.jquery);
