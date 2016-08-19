const querystring = require('querystring');
const conf = require('./conf.js');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

///var host = 'occinterface.herokuapp.com'
var port = process.env.PORT || 3000;
var proxyDefaultTarget = conf.backendURL;

//we define the backendURL as a gloabl variable
// window.backendURL = proxyDefaultTarget;

var proxyOptions = {
  path : '/proxiedOCCIServer/**',
  target: proxyDefaultTarget,
  rewrite: function(req) {
    req.url = req.url.replace(new RegExp('^\/proxiedOCCIServer'), '');
  },
  changeOrigin: true
};

function setup(app) {
  // update the proxied target URL :
  // test using ex. http://localhost:3000/conf?proxyTarget=http://malmo.lizenn.net:8080 then http://localhost:3000/proxiedOCCIServer/-/
  app.all('/conf', function(req, res) {
    var target = querystring.parse(req._parsedUrl.query).proxyTarget;

    //if the proxyOptions does not exist yet, we create it
    if(!req.session.proxyOptions){
      req.session.proxyOptions = proxyOptions;
    }
    req.session.proxyOptions.target = target;


    req.session.proxyOptions.target = querystring.parse(req._parsedUrl.query).proxyTarget;
    console.log('updated proxyOptions via current session', req.session.proxyOptions);
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

  app.use(express.static(__dirname + '/'));

  //we make a session for each new user
  app.use(session({
      store: new RedisStore(options),
      secret: 'keyboard cat'
  }));

  app.all(proxyOptions.path, function (req, res, next) {
    proxyOptions.rewrite(req, proxyOptions);

    proxy.web(req, res, proxyOptions, function(err){
      var msg = 'cannot proxy to ' + proxyOptions.target + '('+ err.message + ')';
      console.log('proxy-error'+msg);
      res.statusCode = 502;
      res.end();
    }.bind(this));
  }.bind(this));

  //when getting /conf request
  setup(app);

  //for react router, we redirect on index.html
  app.get('*', function (request, response){
    response.sendFile(__dirname+'/index.html');
  })


  var listeningApp = http.createServer(app);
  listeningApp.listen(port, function (err, result) {
    if(err) {
      return console.log(err);
    }
  });
  console.log(`Listening at http://localhost:${port}`);
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
