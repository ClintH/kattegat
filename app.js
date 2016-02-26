/*

This is a test app for booting the Kattegat middleware.

Use the kattegat yeoman generator to generate your own app.
	1. npm install -g yo
	2. yo kattegat
	3. *presto!*

*/
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');

// Configure the server
// 		For help customising the app server,
// 		see the Express docs: http://expressjs.com/
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('morgan')('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('express-session')({
  resave: false,
  saveUninitialized: false,
  secret: 'kattegatsecret'
}));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/bower_components", express.static(path.join(__dirname, 'bower_components')));
app.use(require('errorhandler')());

// Init Kattegat and create a server
var kattegat = require("./index")(app, { debug: true });
var server = kattegat.create();

// Activate storage
kattegat.store.start();

// Add realtime
kattegat.realtime.start();

// Boot up server
server.listen(app.get('port'), function() {
	// Add Google Spreadsheet plugin
	var GSpreadsheetDataSource = require("./lib/plugins/GSpreadsheetDataSource");
	var o = new GSpreadsheetDataSource(app, kattegat);

  console.log('Kattegat barebones server has started; you can access it from one of these addresses');
  kattegat.util.hintUrls(app.get('port'));
  console.log("\nTo access your server from another device, make sure it's on the same network.")
});
