/* eslint @typescript-eslint/no-var-requires : 0 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const globule = require('globule');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const configs = require('./project.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const environment = process.env.NODE_ENV || 'local';
const isProduction = process.env.NODE_ENV === 'production';
console.log('Build Environment :', process.env.NODE_ENV ?? 'local');

/**
 * 画像処理の設定準備
 * @param config
 * @return {{type: (string)}}
 */
const prepareImageLoader = (config) => {
  const loader = {
    type     : config.bundleImages ? 'asset' : 'asset/resource',
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
  entry: {
    app: `./${configs.directories.src}/ts/index.ts`,
  },

  target: ['web', 'es5'],

  module: {
    rules: [
      // ts
      {
        test: /\.ts$/,
        use : 'ts-loader',
      },

      // images
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/,
        ...imageLoaderBehavior,
      },

      // ejs
      {
        test: /\.ejs$/i,
        use : [
          {
            loader : 'html-loader',
            options: {
              minimize: configs.html.minify,
            },
          },
          {
            loader: 'ejs-plain-loader',
          },
        ],
      },

      // scss
      {
        test: /\.scss/,
        use : [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader : 'css-loader',
            options: {
              url          : true,
              sourceMap    : !isProduction,
              importLoaders: 2,
            },
          },
          {
            loader : 'postcss-loader',
            options: {
              postcssOptions: {
                ...configs.scss.plugins,
              },
            },
          },
          {
            loader : 'sass-loader',
            options: {
              sourceMap: !isProduction,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.ts', '.js'],
    modules   : ['node_modules'],
  },

  output: {
    filename: 'assets/js/[name].bundle.js',
    path    : path.join(__dirname, configs.directories.dist),
  },

  devServer: {
    watchFiles: [`${configs.directories.src}/ejs/**/*.ejs`, `${configs.directories.src}/ejs/**/_*.ejs`],
    static    : {
      directory: path.join(__dirname, 'public'),
    },
    ...configs.server,
  },

  plugins: [
    new Dotenv({
      path    : path.resolve(__dirname, `.env.${environment}`),
      safe    : false,
      defaults: false,
    }),
    new MiniCssExtractPlugin({
      // 抽出する CSS のファイル名
      filename: 'assets/css/[name].css',
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 'auto',
    // }),
    new webpack.ProvidePlugin({
      '$'            : 'jquery',
      'jQuery'       : 'jquery',
      'window.jQuery': 'jquery',
    }),
  ],

  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel     : true,
        terserOptions: {
          compress: { drop_console: isProduction },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          // node_modules配下はvendorとしてbundle
          test   : /node_modules/,
          name   : 'vendor',
          chunks : 'initial',
          enforce: true
        }
      }
    }
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

module.exports = (env, argv) => {
  app.mode = argv.mode ?? 'development';
  if (argv.mode !== 'production' && !isProduction) app.devtool = 'source-map';

  const patterns = [
    { from: 'public/common', to: path.join(__dirname, configs.directories.dist), },
    { from: `public/${argv.mode ?? 'development'}`, to: path.join(__dirname, configs.directories.dist), },
  ];

  app.plugins.push(
    new CopyPlugin({ patterns }),
  );

  return app;
};
