module.exports = {
  directories: {
    src: 'src',
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
    // 特定のディレクトリに書き出す場合
    // type: 'asset/resource',
    // generator: {
    //   filename: './assets/images/[name]-[contenthash].[ext]',
    // },

    // 一定サイズ以下のファイルはバンドルする場合
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 25 * 100,
      },
    },
  },
  html: {
    hash: true,
    minify: false,
  },
};
