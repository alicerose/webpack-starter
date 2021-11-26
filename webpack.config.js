// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const globule = require('globule');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const configs = require('./project.config');

const isProduction = process.env.NODE_ENV === 'production';

/**
 * 画像処理の設定準備
 * @param config
 * @return {{type: (string)}}
 */
const prepareImageLoader = (config) => {
  const loader = {
    type: config.mode ? 'asset' : 'asset/resource',
  };
  if (config.mode) {
    loader.parser = {
      dataUrlCondition: {
        maxSize: config.bundleSizeLimit,
      },
    };
  } else {
    loader.generator = {
      filename: config.assetName,
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

  devServer: {
    watchFiles: [`${configs.directories.src}/ejs/*.ejs`],
    static: {
      directory: path.join(__dirname, 'public'),
    },
    ...configs.server,
  },

  plugins: [],
};

/**
 * EJSの一括処理
 */
const addEjsTemplates = () => {
  const templates = globule.find('./src/ejs/**/*.ejs', {
    ignore: ['./src/ejs/**/_*.ejs'],
  });
  templates.forEach((template) => {
    const fileName = template
      .replace('./src/ejs/', '')
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