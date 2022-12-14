const HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path'),
      pathToSrc = path.join(__dirname, 'src');

let mode = 'development';

(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader;

module.exports = {
  mode: mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(pathToSrc, 'index.html')
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [ 
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader"
        ]
      }
    ]
  }
}