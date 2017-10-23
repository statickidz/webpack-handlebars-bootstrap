'use strict';

const Path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractSASS = new ExtractTextPlugin('[name].[hash].css');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');

const pages = require('./src/pages');
let renderedPages = [];
for (let i = 0; i < pages.length; i++) {
	let page = Object.assign({}, pages[i]);
	renderedPages.push(
		new HtmlWebpackPlugin({
			template: page.template,
			filename: page.output,
			title: page.content.title,
			description: page.content.description
		})
	);
}

module.exports = (options) => {
  const dest = Path.join(__dirname, 'dist');

  let webpackConfig = {
    devtool: options.devtool,
    entry: ['./src/app.js'],
    output: {
      path: dest,
      filename: '[name].[hash].js'
    },
    plugins: [
      new Webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Tether: 'tether',
        'window.Tether': 'tether',
        Popper: ['popper.js', 'default'],
      }),
      new CopyWebpackPlugin([
        {from:'./src/assets/images', to:'./assets/images'} 
      ]),
      new CopyWebpackPlugin([
        {from:'./src/assets/fonts', to:'./assets/fonts'} 
      ]),
      new CleanWebpackPlugin(['dist'], {
        verbose: true,
        dry: false
      }),
      new Webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(options.isProduction ? 'production' : 'development')
        }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015']
            }
          }
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          query: {
            helperDirs: [
              Path.join(__dirname, 'src', 'helpers')
            ],
            partialDirs: [
              Path.join(__dirname, 'src', 'layouts'),
              Path.join(__dirname, 'src', 'components'),
              Path.join(__dirname, 'src', 'pages')
            ]
          }
        }
      ]
    }
    };

  if (options.isProduction) {
    webpackConfig.entry = ['./src/app.js'];

    webpackConfig.plugins.push(
      new Webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      }),
      ExtractSASS
    );
    
    webpackConfig.module.rules.push({
      test: /\.scss$/i,
      use: ExtractSASS.extract(['css-loader', 'sass-loader'])
    });

  } else {
    webpackConfig.plugins.push(
      new Webpack.HotModuleReplacementPlugin()
    );

    webpackConfig.module.rules.push({
      test: /\.scss$/i,
      use: ['style-loader?sourceMap', 'css-loader?sourceMap', 'sass-loader?sourceMap']
    }, {
      test: /\.js$/,
      use: 'eslint-loader',
      exclude: /node_modules/
    });

    webpackConfig.devServer = {
      port: options.port,
      contentBase: dest,
      historyApiFallback: true,
      compress: options.isProduction,
      inline: !options.isProduction,
      hot: !options.isProduction,
      stats: {
        chunks: false
      }
    };

    webpackConfig.plugins.push(
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3001,
        proxy: 'http://localhost:8081/',
        files: [{
          match: [
            '**/*.hbs'
          ],
          fn: function(event, file) {
            if (event === "change") {
              const bs = require('browser-sync').get('bs-webpack-plugin');
              bs.reload();
            }
          }
        }]
      }, {
        reload: false
      })
    );
    
  }

  webpackConfig.plugins = webpackConfig.plugins.concat(renderedPages);

  return webpackConfig;

};
