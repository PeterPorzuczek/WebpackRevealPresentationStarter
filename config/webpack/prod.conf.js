'use strict';

/**
 * Dist configuration. Used to build the
 * final output when running npm run dist.
 */
const webpack = require('webpack');
const WebpackBaseConfig = require('./base.conf');
const HtmlPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

class WebpackDistConfig extends WebpackBaseConfig {

  constructor() {
    super();
    this.config = {
      cache: false,
      devtool: 'source-map',
      entry: [
        './client.js'
      ],
      plugins: [
        new webpack.DefinePlugin({
          'DEBUG': '0',
          'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        // new HtmlPlugin({
        //   template: './index.html'
        // })// ,
        new CopyWebpackPlugin([{
          from: './*.html'
        }]),
        new UglifyJsPlugin()
      ]
    };

    // Deactivate hot-reloading if we run dist build on the dev server
    this.config.devServer.hot = false;
  }

  /**
   * Get the environment name
   * @return {String} The current environment
   */
  get env() {
    return 'prod';
  }
}

module.exports = WebpackDistConfig;
