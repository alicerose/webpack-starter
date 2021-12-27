import '@/scss/common.scss';
// import 'core-js';
import { enableJQuery } from './vendors/enableJQuery';
import Viewport from './utilities/viewport';
import UserAgent from './utilities/userAgent';
import SampleApiClass from './models/SampleApiClass';

console.log(new Viewport());

const ua = new UserAgent();
$('header h1').text(`browser: ${ua.browser} os: ${ua.os}`);

enableJQuery.init();
console.log('jQuery:', $.fn.jquery);

const sampleApi = new SampleApiClass(process.env.API_HOST ?? '', '/posts');
sampleApi
  .getPosts()
  .then((res) => {
    console.log(res);
    console.log(res.data);
    console.log(res.code);
    console.log(res.success);
  })
  .catch(() => {
    console.log('Error');
  });
