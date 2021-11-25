// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configs = require('./project.config');

const isProduction = process.env.NODE_ENV === 'production';

const app = {
  mode: isProduction ? 'production' : 'development',

  devtool: 'source-map',

  entry: {
    bundle: `./${configs.directories.src}/ts/index.ts`,
  },

  target: isProduction ? ['web', 'es5'] : 'web',

  module: {
    rules: [
      // ts
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },

      // images
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        ...configs.images,
      },

      // ejs
      {
        test: /\.ejs$/i,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'ejs-plain-loader',
          },
        ],
      },

      // scss
      {
        test: /\.scss/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: !isProduction,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                ...configs.scss.plugins,
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules'],
  },

  devServer: {
    watchFiles: [`${configs.directories.src}/ejs/*.ejs`],
    static: {
      directory: path.join(__dirname, 'public'),
    },
    ...configs.server,
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${configs.directories.src}/ejs/index.ejs`,
      ...configs.html,
    }),
  ],
};

module.exports = app;
