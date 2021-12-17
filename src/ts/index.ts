import '@/scss/common.scss';
// import 'core-js';
import SampleClass from './models/SampleClass';
import ExtendedClass from './models/ExtendedClass';
import { enableJQuery } from './vendors/enableJQuery';

enableJQuery.init();
console.log(`jQuery: ${$.fn.jquery}`);

const cls = new SampleClass(123);
console.log(cls);

const ext = new ExtendedClass(456);
console.log(ext);

console.log(process.env.API_HOST);
