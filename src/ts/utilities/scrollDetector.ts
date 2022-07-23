import SampleDetectorClass from '../models/SampleDetectorClass';

export const ScrollDetector = {
  init() {

    const sample = new SampleDetectorClass(
      'main > *:not(.test-static)',
      {
        rootMargin: '0% 0px',
        threshold : 0.5
      }
    );

    console.log(sample);
  },
};
