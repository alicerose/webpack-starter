# Webpackボイラープレート

## What is it

WebpackでEjs、Scss、TypeScriptのバンドルを行う開発環境

## requirement

### Node.js

M1 Macに対応しているLTS版の `16.13.0` を使います。
必要に応じてNode.jsのバージョン管理ツールを使ってください。

https://qiita.com/alice37th/items/989af6749264de50bb85

### プロジェクト設定

`project.config.js` に切り出してあります。多分あまり触ることはないです。

変更が有り得そうな箇所を下記に抜粋します。

|項目|内容|挙動|
|:---|:---|:---|
|`images.bundleImages`|画像をjs内にbase64でバンドルするかどうか①|`true`で閾値（②）以下の画像をバンドルする|
|`images.bundleSizeLimit`|何バイトまでの画像をバンドルするか②|①がtrueのときのみ有効 単位はbyte数（5*1024なら5kb）|
|`images.assetName`|書き出すファイル名のフォーマット|命名規則を指定する|

### envファイル

* 環境ごとに異なる値、またはセキュアなトークン等を使う場合は`.env`ファイルを作成してください
* `.env.example`以外はgitignoreされます
* 読み込み対象となるenvはコマンド一覧を参照ください
* 特定の環境のみ（かつその環境が全体から見て少数一部に限る）が違う、という場合は定数で切り分けするほうが低コストかもしれません
* `.env.example`はプロジェクト状況に応じて追記してください
  * その際、セキュアな情報はgitを介して共有すべきではありません

### npmコマンド

|コマンド|用途|備考|
|:---|:---|:---|
|`dev`|開発環境の起動|`.env.local`を参照する|
|`build:develop`|`development`環境ビルド|`clean`してから実行される `.env.develop`を参照する|
|`build:production`|`production`環境ビルド|`clean`してから実行される `.env.production`を参照する|
|`clean`|`dist`を消去する||
|`check-types`|tsファイルの型をチェックする||
|`eslint`|lint実行|エラーチェックのみ|
|`eslint:fix`|lint実行|自動修正もする|
|`format`|prettier実行|コードの整形をする|
|`lint`|ファイルのLint処理|`eslint` `check-types`|
|`lint:fix`|ファイルのLint処理|`eslint:fix` `check-types` `format`|

## release

|version|date|description|
|:---|:---|:---|
|`1.0.0`|2021/11/29|初版|
