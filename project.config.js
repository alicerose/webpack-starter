module.exports = {
  directories: {
    src: 'src',
    dist: 'dist',
  },
  server: {
    compress: true,
    open: true,
    port: 3000,
  },
  scss: {
    plugins: [['autoprefixer', { grid: true }]],
  },
  images: {
    bundleImages: true,

    // 一定サイズ以下のファイルはバンドルする場合
    bundleSizeLimit: 3 * 1024,

    // 特定の階層に書き出す場合
    assetName: './assets/images/[name].[contenthash][ext]',
  },
  html: {
    hash: true,
    minify: false,
  },
};
