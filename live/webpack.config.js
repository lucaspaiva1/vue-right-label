const dotenv = require('dotenv-webpack')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, "dist"),
    filename: "[name].build.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': [
              'vue-style-loader',
              'css-loader',
              'sass-loader'
            ]
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(html|html)$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    clientLogLevel: "none"
  },
  performance: {
    hints: false
  },
  externals: [
    require('webpack-require-http')
  ],
  plugins: [
    new dotenv({
      path: path.join(__dirname, ".env"),
      safe: true
    })
  ]
}