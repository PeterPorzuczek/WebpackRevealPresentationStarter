'use strict';
const fs = require('fs');
const path = require('path');
const npmBase = path.join(__dirname, '../../node_modules');
const webpack = require('webpack');

class WebpackBaseConfig {
  constructor() {
    this._config = {};
    this.commonPlugins = [
      new webpack.ProvidePlugin({
        'Reveal': 'reveal.js',
        'hljs': 'reveal.js/plugin/highlight/highlight.js'
      })
    ];
  }
  get includedPackages() {
    return [].map(pkg => fs.realpathSync(path.join(npmBase, pkg)));
  }
  set config(data) {
    this._config = Object.assign({}, this.defaultSettings, data);
    this.commonPlugins.forEach(plugin => {
      this._config.plugins.push(plugin);
    });
    return this._config;
  }
  get config() {
    return this._config;
  }
  get env() {
    return 'dev';
  }
  get srcPathAbsolute() {
    return path.resolve('./src');
  }
  get testPathAbsolute() {
    return path.resolve('./test');
  }
  get defaultSettings() {
    const cssModulesQuery = {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]-[local]-[hash:base64:5]'
    };
    return {
      context: this.srcPathAbsolute,
      devtool: 'eval',
      devServer: {
        contentBase: './src/',
        publicPath: '/',
        historyApiFallback: true,
        hot: true,
        inline: true,
        port: 8000
      },
      entry: './client.js',
      module: {
        rules: [
          {
            test: /\.(txt)|(md)$/,
            use: ['raw-loader']
          },
          {
            test: /\.jsx?$/,
            include: this.srcPathAbsolute,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: [
                    // 'syntax-dynamic-import',
                    // 'transform-proto-to-assign',
                    // 'transform-class-properties',
                    // ['transform-es2015-classes', {loose: true}],
                  ],
                  presets: [
                    'env',
                    'stage-0'
                  ]
                }
              }
            ],
          },
          {
            test: /\.css$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [
                        require('autoprefixer')
                    ];
                  }
                }
              }
            ]
        },
        {
            test: /\.scss$/,
            use: [
              "style-loader",
              "css-loader",
              {
                loader: "postcss-loader",
                options: {
                  plugins: function() {
                    return [
                      require('autoprefixer')
                    ];
                  }
                }
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
          ]
        },
        {
            // test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf)(\?.*)?$/,
            test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 32 * 1024
                    }
                }
            ]
        },
        {
          test: /\.(otf|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: 'base64-inline-loader?name=[name].[ext]'
        },
        {
            // test: /\.(mp4|ogg|svg)(\?.*)?$/,
            test: /\.(mp4|ogg)(\?.*)?$/,
            use: [
                'file-loader'
            ]
        },
        // {
        //   test: /\.svg/,
        //   use: {
        //       loader: 'svg-url-loader',
        //       options: {}
        //   }
        // }
        ]
      },
      output: {
        path: path.resolve('./dist'),
        filename: 'app.js',
        publicPath: './'
      },
      plugins: [],
      resolve: {
        alias: {
          Images: path.resolve(__dirname, 'src/lib/assets/images/'),
          Styles: path.resolve(__dirname, 'src/lib/assets/styles/'),
          Lib: path.resolve(__dirname, 'src/lib/'),
          Plugins: path.resolve(__dirname, 'src/lib/plugins/'),
          Slides: path.resolve(__dirname, 'src/slides/'),
          Scripts: path.resolve(__dirname, 'src/scripts/')
        },
        extensions: [
          '.js',
          '.jsx'
        ],
        modules: [
          this.srcPathAbsolute,
          'node_modules'
        ]
      },
    };
  }
}
module.exports = WebpackBaseConfig;
