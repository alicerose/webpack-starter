export const AnchorLink = {
  startTime     : 0,
  startPositionY: 0,
  endPositionY  : 0,
  progress      : 0,
  duration      : 300,
  /**
   * 初期化
   */
  init() {
    const elements = document.querySelectorAll('a');
    elements.forEach((element: HTMLAnchorElement) => {
      const hash = element.hash;
      if (hash.indexOf('#') === 0) {
        element.addEventListener('click', this.detect, false);
      }
    });
  },
  /**
   *
   */
  detect(e: Event) {
    e.preventDefault();
    const ele = e.target as HTMLAnchorElement;
    const hash = ele.hash;
    const target = document.getElementById(hash.replace('#', ''));
    if (!target) {
      AnchorLink.prepare(0);
      return;
    }
    const pos = target.getBoundingClientRect();
    AnchorLink.prepare(pos.top + document.documentElement.scrollTop);
  },
  prepare(position: number) {
    // window.scrollTo({
    //   top     : position,
    //   behavior: 'smooth'
    // });
    console.log('scroll to:', position);
    this.startPositionY = document.documentElement.scrollTop;
    this.endPositionY = position;
    this.startTime = Date.now();
    this.execute();
  },
  execute() {
    const diff = Date.now() - AnchorLink.startTime;
    const progress = Math.min(1, diff / AnchorLink.duration);
    const scrollY = (AnchorLink.startPositionY) * (1 - AnchorLink.easeOutCubic(progress)) + AnchorLink.endPositionY;
    window.scrollTo(0, scrollY);
    if (progress < 1) requestAnimationFrame(AnchorLink.execute);
  },
  easeOutCubic: (x: number) => {
    return 1 - Math.pow(1 - x, 4);
  },
};
