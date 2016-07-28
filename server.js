var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var httpProxy = require('http-proxy');
var proxy = new httpProxy.createProxyServer({secure: false});
const querystring = require('querystring');

var proxyDefaultTarget = 'http://localhost:8080/';
var proxyOptions = [{
  path : '/proxiedOCCIServer/**',
  target: proxyDefaultTarget,
  rewrite: function(req) {
    req.url = req.url.replace(new RegExp('^\/proxiedOCCIServer'), '');
  },
  changeOrigin: true
}];

// additional conf of webpack dev server :
function setup(app) {
  // update the proxied target URL :
  // test using ex. http://localhost:3000/conf?proxyTarget=http://malmo.lizenn.net:8080 then http://localhost:3000/proxiedOCCIServer/-/
  app.all('/conf', function(req, res) { // TODO only post ?
    proxyOptions[0].target = querystring.parse(req._parsedUrl.query).proxyTarget;
    console.log('updated proxyOptions', proxyOptions);
    res.setHeader('Content-Type', 'application/javascript');
    res.end('{}');
  });
}

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  proxy: proxyOptions,
  setup: setup
}).listen(3000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:3000/');
});


// http://localhost:3000/proxiedOCCIServer/sd
