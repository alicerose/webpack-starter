import '../scss/common.scss';
import SampleClass from './models/SampleClass';
import ExtendedClass from './models/ExtendedClass';

const cls = new SampleClass(123);
console.log(cls);

const ext = new ExtendedClass(456);
console.log(ext);

console.log(process.env.API_HOST);
