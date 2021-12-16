interface Window {
  $: JQuery
}
declare let window: Window;

export const enableJQuery = {
  init: () => {
    /**
     * ファイル外からjQueryを参照出来るようにする
     * @type {function(*=): *}
     */
    const $ = (window.$ = require('jquery'));
  },
};

/// <reference path="node_modules/@types/jquery/dist/jquery.slim.d.ts" />
