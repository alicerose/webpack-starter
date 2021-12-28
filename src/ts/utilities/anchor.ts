import AnchorUtilClass from '../models/AnchorUtilClass';

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
   * 移動先IDが存在するかの判定
   * 移動先が存在しなかったら0（＝トップ）を返す
   */
  detect(e: Event) {
    e.preventDefault();
    const ele = e.target as HTMLAnchorElement;
    const hash = ele.hash;
    const target = document.getElementById(hash.replace('#', ''));
    if (!target) {
      AnchorLink.execute(0);
      return;
    }
    const pos = target.getBoundingClientRect();
    AnchorLink.execute(pos.top + document.documentElement.scrollTop);
  },
  /**
   * インスタンスを生成して移動開始
   * @param position
   */
  execute(position: number) {
    const anchor = new AnchorUtilClass(position);
    anchor.run();
  },
};
