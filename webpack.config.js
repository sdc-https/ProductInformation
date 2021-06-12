const path = require('path');
const dotenv = require('dotenv').config();
const webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  mode: 'production',
  output: {
    filename: 'information.js',
    path: path.join(__dirname, 'public')
  },

  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.(js.|jsx)$/,
      exclude: /node_modules/
    }]
  },

  devServer: {
    contentBase: path.join(__dirname, 'public')
  },

  plugins: [
    new webpack.DefinePlugin({
      'env' : JSON.stringify(dotenv.parsed)
    })
  ]
};