import SampleDetectorClass from '../models/sample/SampleDetectorClass';

export const ScrollDetector = {
  init() {

    console.log(new SampleDetectorClass(
      'main > *:not(.test-static)',
      {
        rootMargin: '0% 0px',
        threshold : 0.5
      }
    ));
  },
};
