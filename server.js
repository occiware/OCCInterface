var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: {
     '/proxiedOCCIServer/**': {
        target: 'http://localhost:8080/',
        rewrite: function(req) {
          req.url = req.url.replace(/^\/proxiedOCCIServer/, '');
        },
        changeOrigin: true
     }
  }
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});

// http://localhost:3000/proxiedOCCIServer/sd
