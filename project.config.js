// eslint-disable-next-line @typescript-eslint/no-var-requires
const flexBugFixes = require('postcss-flexbugs-fixes');

module.exports = {
  directories: {
    src : 'src',
    dist: 'dist',
  },
  server: {
    compress: true,
    open    : true,
    port    : 3000,
  },
  scss: {
    plugins: [['autoprefixer', { grid: true }],flexBugFixes()],
  },
  images: {
    // 画像をバンドルするか
    bundleImages: true,

    // 一定サイズ以下のファイルはバンドルする場合
    bundleSizeLimit: 3 * 1024,

    // 特定の階層に書き出す場合
    assetName: './assets/images/[name].[contenthash][ext]',
  },
  html: {
    // ハッシュ化するか
    hash     : true,
    // htmlを圧縮して出力するか
    minify   : false,
    // ejsに渡す変数
    variables: {
      anchors: 30
    },
  },
};
