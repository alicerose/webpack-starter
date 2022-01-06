# Webpackボイラープレート

## What is it

WebpackでEjs、Scss、TypeScriptのバンドルを行う開発環境

## requirement

### Node.js

M1 Macに対応しているLTS版の `16.13.0` を使います。
必要に応じてNode.jsのバージョン管理ツールを使ってください。

https://qiita.com/alice37th/items/989af6749264de50bb85

### webp

後述するWebP変換バッチを仕様する際には、[Googleが配布しているユーティリティ](https://developers.google.com/speed/webp/docs/precompiled) の導入が必要です。
MacであればHomebrewから導入出来ます。

```bash
brew install webp
```

## プロジェクト設定

`project.config.js` に切り出してあります。多分あまり触ることはないです。

変更が有り得そうな箇所を下記に抜粋します。

|項目| 内容                        | 挙動                                  |
|:---|:--------------------------|:------------------------------------|
|`images.bundleImages`| 画像をjs内にbase64でバンドルするかどうか① | `true`で閾値（②）以下の画像をバンドルする            |
|`images.bundleSizeLimit`| 何バイトまでの画像をバンドルするか②        | ①がtrueのときのみ有効 単位はbyte数（5*1024なら5kb） |
|`images.assetName`| 書き出すファイル名のフォーマット          | 命名規則を指定する                           |
|`html.minify`| `production`ビルド時の圧縮設定| `true`で圧縮する（デフォルトで`false`）          |
|`html.variables`|ejsに渡す変数定義| 変数編集後は要再起動                          |

## envファイル

* 環境ごとに異なる値、またはセキュアなトークン等を使う場合は環境に応じた`.env`ファイルを作成してください
* `.env.example`以外はgitignoreされます
* 読み込み対象となるenvはコマンド一覧を参照ください
* 特定の環境のみ（かつその環境が全体から見て少数一部に限る）が違う、という場合は定数で切り分けするほうが低コストかもしれません
* `.env.example`はプロジェクト状況に応じて追記してください
  * その際、セキュアな情報はgitを介して共有すべきではありません

## npmコマンド

|コマンド|用途| 備考                                     |
|:---|:---|:---------------------------------------|
|`dev`|開発環境の起動| `.env.local`を参照する                      |
|`build:develop`|`development`環境ビルド| `clean`してから実行される `.env.develop`を参照する   |
|`build:production`|`production`環境ビルド| `clean`してから実行される `.env.production`を参照する|
|`clean`|`dist`を消去する||
|`check-types`|tsファイルの型をチェックする||
|`eslint`|lint実行| エラーチェックのみ                              |
|`eslint:fix`|lint実行| 自動修正もする                                |
|`format`|prettier実行| コードの整形をする                              |
|`lint`|ファイルのLint処理| `eslint` `check-types`                 |
|`lint:fix`|ファイルのLint処理| `eslint:fix` `check-types` `format`    |
|`convert-webp`|WebP一括変換| `src/images`配下の画像を一括変換する               |

### WebP一括変換

`src/images`配下の`jpg`、`jpeg`, `png`を一括でWebPに変換します。
変換したファイルは`${拡張子を含む元のファイル名}.webp`としてソースファイルと同一階層に出力されます。（拡張子違いで同一ファイル名があるとバッティングするため）

## 備考・メモ

### EJS

`dev`コマンドではwebpack-devサーバを起動した時点で読み込んだejsファイルを認識し、待ち受けします。
言い換えると、**`dev`コマンドからの起動後に作成・配置したEJSファイルについては、再実行して開発サーバを起動し直すまで存在を認識されません**。
また、**アンダースコアで始まるinclude partial用EJSファイルも同様**です。

ちょっとどうにかしたいなとは思ってますが、現状は空でもEJSファイルを作成してから起動するか、都度devコマンドの再実行で対処してもらえればと思います。

### loader関連

`scss`ファイル、エントリーポイントに登録されている`ts`ファイルはejsコンパイル時に自動で挿入されるので、自分で指定する必要はありません。

### IE11対策

一応tsのコンパイルターゲットは`ES5`になってますが、関数のpolyfill等は自動で適応がされません。必要なら下記で必要なpolyfillのバンドルを生成するのがおすすめです。

https://polyfill.io/v3/url-builder/

tsファイルに以下を書けば一括でpolyfillが適当されますが、バンドルサイズが激増するのであまりオススメはしません。

```js
import 'core-js';
```

どこまで対応するかは検討します。

## リリースノート

マイナーリリースあたりまでの主要更新項目を記載します。 詳細はGithubのリリース情報を参照してください。

| version | date       | description                                      |
|:--------|:-----------|:-------------------------------------------------|
| `1.3.0` | 2022/01/06 | 汎用スクリプトの追加など                                     |
| `1.2.0` | 2021/12/20 | 静的ファイルの配置対応、SCSSの近代フォーマット化、VSCode向け推奨エクステンションの登録 |
| `1.1.0` | 2021/12/17 | Webpack.config改修、Webp対応                          |
| `1.0.0` | 2021/11/29 | 初版                                               |
