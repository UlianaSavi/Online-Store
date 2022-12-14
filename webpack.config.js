const HtmlWebpackPlugin = require('html-webpack-plugin'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path'),
      pathToSrc = path.join(__dirname, 'src');

let mode = 'development';

(mode === 'development') ? "style-loader" : MiniCssExtractPlugin.loader;
// TODO: добавить обновления сразу для дев сервера
module.exports = {
  mode: mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(pathToSrc, 'index.html')
    }),
    new MiniCssExtractPlugin(),
  ],
  output: {
    // Для изображений отведём отдельную папку в *dist*
    assetModuleFilename: "assets/[hash][ext][query]",
    filename: '[name].[contenthash].js'
  },
  devtool: 'source-map',
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
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      // Изображения которые вставляются в сам *html*
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}