const querystring = require('querystring');

///var host = 'occinterface.herokuapp.com'
var port = process.env.PORT || 3000;
var proxyDefaultTarget = 'http://malmo.lizenn.net:8080';
var proxyOptions = {
  path : '/proxiedOCCIServer/**',
  target: proxyDefaultTarget,
  rewrite: function(req) {
    req.url = req.url.replace(new RegExp('^\/proxiedOCCIServer'), '');
  },
  changeOrigin: true
};

// additional conf of express or webpack dev server : let the user update the proxy target
function setup(app) {
  // update the proxied target URL :
  // test using ex. http://localhost:3000/conf?proxyTarget=http://malmo.lizenn.net:8080 then http://localhost:3000/proxiedOCCIServer/-/
  app.all('/conf', function(req, res) {
    proxyOptions.target = querystring.parse(req._parsedUrl.query).proxyTarget;
    console.log('updated proxyOptions', proxyOptions);
    res.setHeader('Content-Type', 'application/javascript');
    res.end('{}');
  });
}

var isProduction = process.env.NODE_ENV === 'production';
console.log('In production :', isProduction);

if (isProduction) { // prod :

  var express = require('express');
  var http = require('http');
  var proxy = require('express-http-proxy');

  // Init express server
  var app = new express();

  app.use(express.static(__dirname + '/')); // TODO webpack conf, rather '/public/'
  app.use('/proxiedOCCIServer', proxy(proxyOptions.target));

  setup(app);
  var listeningApp = http.createServer(app);
  app.listen(port);

  console.log('Listening at http://localhost:' + port + '/');

} else { // dev :

  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('./webpack.config');

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    proxy: [proxyOptions],
    setup: setup
  }).listen(port, function (err, result) {
    if (err) {
      return console.log(err);
    }

    console.log('Listening at http://localhost:' + port + '/');
  });

}

// http://localhost:3000/proxiedOCCIServer/sd
