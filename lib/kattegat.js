/*!
 * Kattegat
 * Copyright(c) 2014 Clint Heyer <clint@thestaticvoid.net>
 * MIT Licensed
 */


var kattegat = function(app, opts) { 
	var _app = app;
	var _opts = opts || {};
	
	return {
	  store: require("./store"),
	  realtime: require('./realtime'),
	  util: require("./util")
	}
}
module.exports = kattegat;
