/* eslint @typescript-eslint/no-var-requires : 0 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const configs = require('./project.config');

const environment = process.env.NODE_ENV || 'local';
console.log('Target Environment:', environment);
const isProduction = process.env.NODE_ENV === 'production';
console.log('Build Environment:', process.env.NODE_ENV);

/**
 * 画像処理の設定準備
 * @param config
 * @return {{type: (string)}}
 */
const prepareImageLoader = (config) => {
  const loader = {
    type: config.bundleImages ? 'asset' : 'asset/resource',
    generator: {
      filename: config.assetName,
    },
  };
  if (config.bundleImages) {
    loader.parser = {
      dataUrlCondition: {
        maxSize: config.bundleSizeLimit,
      },
    };
  }

  return loader;
};
const imageLoaderBehavior = prepareImageLoader(configs.images);

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
        ...imageLoaderBehavior,
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

  output: {
    filename: 'assets/js/bundle.js',
    path: path.join(__dirname, configs.directories.dist),
  },

  devServer: {
    watchFiles: [`${configs.directories.src}/ejs/*.ejs`],
    static: {
      directory: path.join(__dirname, 'public'),
    },
    ...configs.server,
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, `.env.${environment}`),
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: { drop_console: isProduction },
        },
      }),
    ],
  },
};

/**
 * EJSの一括処理
 */
const addEjsTemplates = () => {
  const templates = globule.find(`./${configs.directories.src}/ejs/**/*.ejs`, {
    ignore: [`./${configs.directories.src}/ejs/**/_*.ejs`],
  });
  templates.forEach((template) => {
    const fileName = template
      .replace(`./${configs.directories.src}/ejs/`, '')
      .replace('.ejs', '.html');
    app.plugins.push(
      new HtmlWebpackPlugin({
        filename: `${fileName}`,
        template: template,
        ...configs.html,
      })
    );
  });
};
addEjsTemplates();

module.exports = app;
