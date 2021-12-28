import { Viewport } from './viewport';
import { AnchorLink } from './anchor';
import { UserAgent } from './userAgent';
import { EnableJQuery } from '../vendors/EnableJQuery';

export const Utilities = {
  init() {
    this.global();

    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
    if (body.dataset.page) this.individual(body.dataset.page);
  },
  /**
   * 全ページで使うユーティリティ
   */
  global() {
    AnchorLink.init();
    EnableJQuery.init();
    Viewport.init();
    UserAgent.init();
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
