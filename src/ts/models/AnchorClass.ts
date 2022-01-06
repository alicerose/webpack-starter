import { ANCHOR_DURATION } from '../constants';
import { easing } from '../vendors/easing';

export default class AnchorClass {
  moveFrom: number;
  moveTo: number;
  progress: number;
  duration: number;
  start: number;
  id: number;

  /**
   *
   * @param target 移動先のY座標
   */
  constructor(target: number) {
    this.moveFrom = document.documentElement.scrollTop;
    this.moveTo = target;
    this.progress = 0;
    this.duration = ANCHOR_DURATION;
    this.start = 0;
    this.id = 0;
  }

  /**
   * 移動中の処理
   * @private
   */
  private action() {
    const progress = Math.min(1, (Date.now() - this.start) / this.duration);
    const distance = this.moveTo - this.moveFrom;
    const moveToY = this.moveFrom + distance * easing.outQuart(progress);
    window.scrollTo(0, moveToY);
    console.log('[Anchor] progress:', progress, 'to:', moveToY);

    if (progress < 1) {
      this.id = requestAnimationFrame(() => {
        this.action();
      });
    }
  }

  /**
   * 移動開始
   */
  run() {
    this.start = Date.now();
    this.moveFrom = document.documentElement.scrollTop;
    this.action();
  }
}
