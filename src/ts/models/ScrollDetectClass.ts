import { IntersectionObserverConfig } from '../types/IntersectionObserverConfig';

export default class ScrollDetectClass {
  private readonly selector: string;
  private root: Element | Document | null | undefined;
  private rootMargin: string;
  private threshold: number | number[];

  /**
   * スクロール監視クラスの初期化
   * @param selector 対象とするセレクタ
   * @param config 交差判定の設定
   */
  constructor(selector: string, config: IntersectionObserverConfig | null = null) {
    this.selector = selector;
    this.root = config?.root ?? null;
    this.rootMargin = config?.rootMargin ?? '0% 0px';
    this.threshold = config?.threshold ?? 0.5;
    this.watch();
  }

  /**
   * 監視開始
   * @private
   */
  private watch() {
    // thisをbindしないとコールバックでthisが参照出来なくなる
    const observer = new IntersectionObserver(this.callback.bind(this), {
      root      : this.root,
      rootMargin: this.rootMargin,
      threshold : this.threshold
    });

    // 監視対象郡の取得
    const targets = document.querySelectorAll(this.selector);

    // 監視対象ごとにobserve
    targets.forEach(target => {
      observer.observe(target);
    });
  }

  /**
   * 監視を終了する
   */
  public destroy() {
    //  @todo 監視終了処理を書く
  }

  /**
   * 交差状態変化時のコールバック
   * @param entries
   * @private
   */
  private callback(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        this.isIntersecting(entry);
      } else {
        this.isNotIntersecting(entry);
      }
    });
  }

  /**
   * 交差時の挙動
   * @param entry
   */
  public isIntersecting(entry: IntersectionObserverEntry) {
    console.log('is intersecting!', entry);
  }

  /**
   * 非交差時の挙動
   * @param entry
   */
  public isNotIntersecting(entry: IntersectionObserverEntry) {
    console.log('is not intersecting', entry);
  }
}
