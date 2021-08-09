const path = require('path');
const Dotenv = require('dotenv-webpack');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
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
    new Dotenv()
    // new webpack.DefinePlugin({
    //   'env': JSON.stringify(dotenv.parsed)
    // })
  ]
};
