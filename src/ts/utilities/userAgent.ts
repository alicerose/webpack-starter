import { browsers } from 'ts/types/browsers';
import { os } from 'ts/types/os';

export default class UserAgent {

  private readonly raw: string;
  private readonly _browser: browsers | unknown;
  private readonly _os: os | unknown;

  constructor() {
    this.raw = window.navigator.userAgent;
    this._browser = this.detectBrowser();
    this._os = this.detectOS();
  }

  /**
   * ブラウザの判定
   * @private
   */
  private detectBrowser() {
    const agent = this.raw.toLowerCase();

    if((agent.indexOf('chrome') > -1) && (agent.indexOf('edg') === -1) && (agent.indexOf('opr') === -1)){
      return 'chrome';
    }

    if((agent.indexOf('safari') > -1) && (agent.indexOf('chrome') === -1)){
      return 'safari';
    }

    if((agent.indexOf('trident/7') > -1)){
      return 'ie11';
    }

    if((agent.indexOf('msie') > -1) && (agent.indexOf('opr') === -1) && (agent.indexOf('opr') === -1)){
      return 'ie';
    }

    if((agent.indexOf('edg') > -1)){
      return 'edge';
    }

    if((agent.indexOf('firefox') > -1)){
      return 'firefox';
    }

    if((agent.indexOf('opr') > -1)){
      return 'opera';
    }

    return 'other';
  }

  /**
   * OSの判定
   * @private
   */
  private detectOS() {

    const agent = this.raw.toLowerCase();

    if((agent.indexOf('mac os x') > -1)){
      return 'Mac OS';
    }

    if((agent.indexOf('windows nt') > -1)){
      return 'Windows';
    }

    if((agent.indexOf('iphone') > -1)){
      return 'iOS';
    }

    if((agent.indexOf('android') > -1)){
      return 'Android';
    }

    return 'other';
  }

  get browser() {
    return this._browser;
  }

  get os() {
    return this._os;
  }

  /**
   * Chrome
   */
  public isChrome() {
    return this._browser === 'chrome';
  }

  /**
   * Safari
   */
  public isSafari() {
    return this._browser === 'safari';
  }

  /**
   * Internet Explorer 11
   */
  public isIE11() {
    return this._browser === 'ie11';
  }

  /**
   * Microsoft Edge(new)
   */
  public isEdge() {
    return this._browser === 'edge';
  }

  /**
   * FireFox
   */
  public isFireFox() {
    return this._browser === 'firefox';
  }

  /**
   * Opera
   */
  public isOpera() {
    return this._browser === 'opera';
  }

  /**
   * Other
   */
  public isOtherBrowser() {
    return this._browser === 'other';
  }
}
