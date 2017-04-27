var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: './src-es6/app.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'game.js'
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
    '@app': 'App',
  },
  // plugins: [
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       warnings: false
  //     }
  //   })
  // ]
}