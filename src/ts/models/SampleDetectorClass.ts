import ScrollDetectClass from './ScrollDetectClass';

/**
 * @memo
 * IntersectionObserverのラッパークラスの継承サンプル
 * 最低限交差時・非交差時の挙動だけ実装すれば良い
 * この2つの関数はabstractで定義しているので継承先で実装しないとエラーを返す
 */
export default class SampleDetectorClass extends ScrollDetectClass {

  /**
   * 交差時の挙動
   * @param entry
   */
  isIntersecting(entry: IntersectionObserverEntry) {
    const status = entry.isIntersecting ? 'true' : 'false';
    entry.target.childNodes[1].textContent = 'is intersecting:' + status;
    entry.target.classList.add('active');

    console.log(entry.target.id, entry.isIntersecting);
  }

  /**
   * 非交差時の挙動
   * @param entry
   */
  isNotIntersecting(entry: IntersectionObserverEntry) {
    const status = entry.isIntersecting ? 'true' : 'false';
    entry.target.childNodes[1].textContent = 'is intersecting:' + status;
    entry.target.classList.remove('active');

    console.log(entry.target.id, entry.isIntersecting);
  }

}
