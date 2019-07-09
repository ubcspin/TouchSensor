/*
    ./webpack.config.js
*/
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

const path = require('path');
module.exports = {
  entry: './src/main.jsx',
  output: {
    path: path.resolve('dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      { test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.mp4$/,
        use: 'file-loader?name=videos/[name].[ext]'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'stage-0']
            }
          }
        ],
      }
    ]
  },
  plugins: [htmlWebpackPlugin]
}