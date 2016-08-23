var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],

  output: {
    path: './public/built',
    filename: 'bundle.js',
    publicPath: 'http://localhost:3000/built/'
  },

  devServer: {
    port: 3000,
    contentBase: './public',
    publicPath: 'http://localhost:3000/built/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },{
      test: /\.json$/,
      loader: 'json'
    }
  ]
}
};
