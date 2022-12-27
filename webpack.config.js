const HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  CopyPlugin = require('copy-webpack-plugin'),
  EslintPlugin = require('eslint-webpack-plugin');
const path = require('path'),
  pathToSrc = path.join(__dirname, 'src');

let mode = 'development';

if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: path.resolve(pathToSrc, './index'),
  mode: mode,
  devServer: {
    open: true,
    port: 9000,
    hot: false,
    client: {
      overlay: true,
      progress: true
    },
    liveReload: true,
    watchFiles: ['src/*.html']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(pathToSrc, 'index.html')
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist/assets')
        },
        {
          from: path.resolve(__dirname, 'src/netlify.toml'),
          to: path.resolve(__dirname, 'dist/netlify.toml')
        }
      ]
    }),
    new EslintPlugin({ extensions: 'ts' })
  ],
  output: {
    // Для изображений отведём отдельную папку в *dist*
    assetModuleFilename: 'assets/[name][ext]',
    filename: '[name].[contenthash].js',
    clean: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|json)$/i,
        type: 'asset/inline'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devServer: {    historyApiFallback: true,  },
};
