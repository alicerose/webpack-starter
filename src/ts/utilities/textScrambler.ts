/**
 * テキストスクランブル演出スクリプト
 */

export const TextScrambler = {
  init() {
    const target = document.querySelectorAll('[data-text-scramble]');
    target.forEach((element) => {
      if (element.textContent && element.textContent.length) {
        this.exec(element);
      }
    });
  },
  exec(element: Element) {
    if (!element.textContent) return;
    const scrambler = new TextScramblerClass(element);
    scrambler.run();
  },
};

class TextScramblerClass {
  element: Element;
  source: string[];
  result: string[];
  loop: number;
  // スクランブルを書ける時間（ms）
  frames = 30;
  // 動作FPS
  fps = 60;
  // スクランブル中の文字列候補
  pool = ',.?/\\(^)![]{}*&^%$#\'"';

  constructor(element: Element) {
    this.element = element;
    this.source = element.textContent ? element.textContent.split('') : [];
    this.result = [];
    this.loop = 0;
  }

  public run() {
    const arr: string[] = [];
    const pl = this.pool.split('');
    let flag = false;
    this.source.forEach((src: string, i: number) => {
      flag = this.source.length - i > this.frames - this.loop;
      if(flag || this.loop === this.frames - 1) {
        arr.push(src);
      } else {
        arr.push(pl[Math.floor(Math.random() * pl.length)]);
      }
    });
    this.result = arr;
    this.reflect();
  }

  reflect() {
    // console.log('#' + this.loop, 'reflect', this.source, '=>', this.result.join(''));
    this.element.textContent = this.result.join('');
    this.loop++;
    if(this.loop < this.frames) {
      setTimeout(() => {
        this.run();
      }, 1000 / this.fps);
    }
  }
}
