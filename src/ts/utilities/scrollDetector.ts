export const ScrollDetector = {
  // スクロール時の監視設定
  config: {
    root      : null,
    rootMargin: '0% 0px',
    threshold : 0.5
  },
  // 監視対象要素
  selector: 'main > *:not(.test-static)',
  /**
   * @todo 汎用性に乏しいのでmodel化してextendさせる
   */
  init() {
    const observer = new IntersectionObserver(this.callback, this.config);

    const targets = document.querySelectorAll(this.selector);
    targets.forEach(target => {
      observer.observe(target);
    });
  },
  /**
   * 交差時のコールバック
   * @param entries
   */
  callback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      console.log(entry);
      const status = entry.isIntersecting ? 'true' : 'false';
      entry.target.textContent = 'is intersecting:' + status;
      if(entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }

    });
  }
};
