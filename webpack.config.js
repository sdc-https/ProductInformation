const path = require('path');

module.exports = {
  entry: './src/app.jsx',
  mode: 'development',
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
  }
};