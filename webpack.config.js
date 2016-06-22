var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/app.js',
  output: { path: './dist', filename: 'app.bundle.js' },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader'), exclude: /node_modules/ }
    ]
  },
  plugins: [
    new ExtractTextPlugin("app.css")
  ]
}