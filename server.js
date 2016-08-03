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

// additional conf of express or webpack dev server :
function setup(app) {
  // update the proxied target URL :
  // test using ex. http://localhost:3000/conf?proxyTarget=http://malmo.lizenn.net:8080 then http://localhost:3000/proxiedOCCIServer/-/
  app.all('/conf', function(req, res) { // TODO only post ?
    proxyOptions.target = querystring.parse(req._parsedUrl.query).proxyTarget;
    console.log('updated proxyOptions', proxyOptions);
    res.setHeader('Content-Type', 'application/javascript');
    res.end('{}');
  });
}

var isProduction = process.env.NODE_ENV === 'production';
console.log('env is prod =', isProduction);

if (isProduction) { // prod :
  var express = require('express');
  var http = require('http');
  var httpProxy = require('http-proxy');
  var proxy = new httpProxy.createProxyServer({secure: false});

  // Init express server
  var app = this.app = new express();

  app.use(express.static(__dirname + '/')); // TODO webpack conf, rather '/public/'

  app.all(proxyOptions.path, function (req, res, next) {
    proxyOptions.rewrite(req, proxyOptions);

    proxy.web(req, res, proxyOptions, function(err){
      var msg = 'cannot proxy to ' + proxyOptions.target + '('+ err.message + ')';
      this.sockWrite(this.sockets, 'proxy-error', [msg]);
      res.statusCode = 502;
      res.end();
    }.bind(this));
  }.bind(this));

  //for react router, we redirect on index.html
  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
  })

  setup(app);

  app.listen(port);
  console.log(`Listening at http://localhost:${port}`)

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
