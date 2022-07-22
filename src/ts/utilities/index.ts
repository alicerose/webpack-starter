import { Viewport } from './viewport';
import { AnchorLink } from './anchor';
import { UserAgent } from './userAgent';
import { EnableJQuery } from '../vendors/EnableJQuery';
import { ScrollDetector } from './scrollDetector';

enum AssetType {
  CSS = 'css',
  JS = 'js'
}

export const Utilities = {
  init() {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    if (body.dataset.page) this.individual(body.dataset.page);
  },
  /**
   * 共通ユーティリティ関数郡
   */
  global() {
    EnableJQuery.init();
  },
  /**
   * 共通ユーティリティ関数郡（DOM構築後）
   */
  domLoaded() {
    this.loadStaticAsset(AssetType.JS, '/assets/js/static.js');
    this.loadStaticAsset(AssetType.CSS, '/assets/css/static.css');
  },
  /**
   * 共通ユーティリティ関数郡（読み込み完了後）
   */
  onLoad() {
    AnchorLink.init();
    ScrollDetector.init();
    UserAgent.init();
    Viewport.init();
  },
  /**
   * DOM構築時に静的ファイルを読み込む
   * @param type AssetType ファイル形式
   * @param path string ファイルパス
   */
  loadStaticAsset(type: AssetType, path: string) {
    console.log('[Utilities] append static file:', path);
    const dom = document.createElement(type === 'js' ? 'script' : 'link');
    if('src' in dom) {
      dom.src = path;
    } else {
      dom.rel = 'stylesheet';
      dom.type = 'text/css';
      dom.href = path;
    }

    document.getElementsByTagName('head')[0].appendChild(dom);
  },
  /**
   * 個別ページ専用のスクリプトを記述
   * bodyタグのdata-page属性の値に応じたスクリプトを実行する
   * @param id
   */
  individual(id: string) {
    if (id === 'index') {
      console.log('[Util] index page function');
    }
  },
};
