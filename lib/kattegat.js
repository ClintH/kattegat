/*!
 * Kattegat
 * Copyright(c) Clint Heyer <clint@thestaticvoid.net>
 * MIT Licensed
 */
var http = require('http');
module.exports = function(app, opts) { 
  opts = opts || {};
  if (typeof opts.debug == 'undefined') opts.debug = false;
  
  var me = {
    util: require("./util"),
    app: app,
    options: opts,
    create: function() {
      this.server = http.createServer(app);
      return this.server;
    }
  }

  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
  });

  me.realtime = require("./realtime")(me);
  me.store = require("./store")(me);

  return me;
};
