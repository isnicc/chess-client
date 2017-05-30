const webpack = require('webpack')
const path = require('path')

// const PrepackWebpackPlugin = require('prepack-webpack-plugin').default

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: './src-es6/app.js',
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'game.js'
  },
  devtool: "#source-map",
  resolve: {
    alias: {
      src: resolve('src-es6'),
      Scenes: resolve('src-es6/Scenes'),
      Sprites: resolve('src-es6/Sprites'),
      Layers: resolve('src-es6/Layers'),
      Utils: resolve('src-es6/Utils'),
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