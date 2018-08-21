const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',

  devtool: 'cheap-module-eval-source-map',

  entry: {
    // main:[
    //   'babel-polyfill',
    //   'webpack-dev-server/client?http://localhost:8080',
    //   'webpack/hot/dev-server',
    //   './assets/main.jsx'
    // ],
    login: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './assets/login.jsx'
    ],
    portal: [
      'babel-polyfill',
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/dev-server',
      './assets/portal.jsx'
    ],

  },

  output: {
    path: path.join(__dirname, '/public/dist/'),
    filename: '[name].bundle.js',
    pathinfo: true,
    publicPath: 'http://localhost:8080/dist/'
  },

  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      assets: 'assets',
      styles: 'assets/styles',
      components: 'assets/components/'
    },
    extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __ENV__: process.env.NODE_ENV
    })
  ],

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader?sourceMap' },
          { loader: 'sass-loader?sourceMap' }
        ]
      },
      {
        test: /\.(ttf|eot|svg|woff)(\?[a-z0-9]+)?$/,
        use: [{ loader: 'file-loader?name=[path][name].[ext]' }]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
         loader: 'babel-loader?presets[]=es2015,presets[]=stage-0,presets[]=react',
         // options: {
         //  presets: ['@babel/preset-env'],
         //  plugins: [require('@babel/plugin-proposal-object-rest-spread')]
         // }
          }],
        include: path.join(__dirname, 'assets'),

      }
    ],

    noParse: /\.min\.js/
  }
};
