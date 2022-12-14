const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path'),
      pathToSrc = path.join(__dirname, 'src');

let mode = 'development';

if (process.env.MODE_ENV === 'production') {
  mode = 'production'
}

module.exports = {
  mode: mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(pathToSrc, 'index.html')
    }),
  ],
  module: {
    rules: []
  }
}