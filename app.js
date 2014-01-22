/*

This is a demo app which lets you boot Kattegat middleware.

Use the kattegat yeoman generator to generate your own app.

*/
var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
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

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var kattegat = require("./index")(app);
app.use(kattegat.store());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Kattegat barebones server has started; you can access it from one of these addresses');
  kattegat.util.hintUrls(app.get('port'));
  console.log("\nTo access your server from another device, make sure it's on the same network.")

});
