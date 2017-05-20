const webpack = require('webpack')
const path = require('path')
const PrepackWebpackPlugin = require('prepack-webpack-plugin').default

module.exports = {
  entry: './src-es6/app.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'game.js'
  },
  devtool: "#source-map",
  resolve: {
    alias: {
    },
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  externals: {
    '@cc': 'cc',
    '@ccui': 'ccui',
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    // new PrepackWebpackPlugin({
    //   prepack: {
    //     mathRandomSeed: 'random-seed',
    //   },
    // }),
    //   new webpack.optimize.UglifyJsPlugin({
    //     compress: {
    //       warnings: false
    //     }
    //   }),
  ],
}