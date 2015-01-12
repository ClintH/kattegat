/*!
 * Google Spreadsheet Data Source
 * Copyright(c) 2015 Clint Heyer <clint@thestaticvoid.net>
 * MIT Licensed
 */
var request = require('request'),
	_ = require("lodash");

module.exports = function GSpreadsheetDataSource(app, kattegat) { 
	
var me = this;
me.subscriptions = {};
me.pollFreqMs = 20*1000;
me.expireMs = 5*60*1000;
me.polling = false;

var base = "/gspreadsheet";
app.post(base, function(req,res) {
  if (!req.body.key) return next(new Error("key parameter missing"));
	var key = req.body.key;
	var sub = {
		rowIndex: 0
	};

	if (me.subscriptions[key]) {
		sub = me.subscriptions[key];
	}
	sub.key = key;
	sub.created = _.now();
  sub.expiresAt = _.now() + me.expireMs;

  me.subscriptions[key] = sub;
	if (!me.polling) poll();
  res.json(sub);
})

app.get(base +"/:key", function(req, res) {
  var data = me.subscriptions[req.params.key];
  if (typeof(data) == 'undefined') {
    res.writeHeader("404", "Not found");
    res.end();
    return;
  }
	res.json(me.subscriptions[req.params.key]);
})

var handleRequest = function(err, response, body, sub) {
  if (err) {
    console.log("Google Spreadsheet error:  +  err");
    me.subscriptions[sub.key].lastError = err;
    return;
  }
  var o = JSON.parse(body);
  sub.title = o.feed.title["$t"];
  var rows = [];
  o.feed.entry.forEach(function(cell) {
    //console.dir(cell);
    var coords = cell["gs$cell"];
    if (typeof(rows[coords.row]) == 'undefined') {
      rows[parseInt(coords.row)] = {};
    } 
    rows[parseInt(coords.row)][parseInt(coords.col)] = cell.content["$t"];
  });
  sub.rows = rows;

  if (_.keys(rows).length > sub.rowIndex) {
    kattegat.realtime.broadcastTo(sub.key, "spreadsheet", {
      "rowIndex": sub.rowIndex,
      "data": rows.slice(sub.rowIndex+1)
    });
    sub.rowIndex = _.keys(rows).length;
  }
  me.subscriptions[sub.key] = sub;
}

var pollSubscription = function(sub) {
  if (typeof(sub) == 'undefined' || sub == null) return;
  if (sub.expiresAt < _.now()) {
    console.log("Google Spreadsheet subscription expired: " + sub.key);
    delete me.subscriptions[sub.key];
    return;
  }
  var url ="https://spreadsheets.google.com/feeds/cells/" + sub.key + "/od6/public/values?alt=json";
  request(url, function(err, response, body) {
    handleRequest(err, response, body, sub);
  });
}
var poll = function() {
	me.polling = true;
	var t = _.values(me.subscriptions);

	t.forEach(function(sub) {
	 pollSubscription(sub);
	})

  if (t.length > 0) {
    setTimeout(poll, me.pollFreqMs);
	} else {
    me.polling = false;
  }
}
  
}