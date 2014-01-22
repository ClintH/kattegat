/*

This is a test app for booting the Kattegat middleware.

Use the kattegat yeoman generator to generate your own app.
	1. npm install -g yo
	2. yo kattegat
	3. *presto!*

*/
var express = require('express');
var http = require('http');
var path = require('path');

// Configure the server
// 		For help customising the app server,
// 		see the Express docs: http://expressjs.com/
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.errorHandler());

var server = http.createServer(app);

// Init Kattegat
var kattegat = require("./index")(app);

// Add kattegat middleware
app.use(kattegat.store());

// Add realtime features
kattegat.realtime(server);

// Boot up server
server.listen(app.get('port'), function(){
  console.log('Kattegat barebones server has started; you can access it from one of these addresses');
  kattegat.util.hintUrls(app.get('port'));
  console.log("\nTo access your server from another device, make sure it's on the same network.")

});
