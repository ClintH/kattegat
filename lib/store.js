/*
A thin wrapper to expose nedb functionality

See more:
https://github.com/louischatriot/nedb

*/
var Datastore = require('nedb'),
 db = new Datastore({filename:'database', autoload:true}),
 _ = require("lodash")

module.exports = function store(kattegat) {
	return {
		start: start,
		kattegat: kattegat,
		base: "/store/"
	};
};


var start = function() {
	this.kattegat.app.use((middleware).bind(this)());
}

function middleware() {
  var debug = this.kattegat.options.debug;
  var base = this.base;
	
  return function store(req, res, next){
    if (base + 'insert' == req.url) {
			// Assumes body contains document to insert
     	if (debug) {
				console.log("Store insert");
				console.log("  Document: " + JSON.stringify(req.body));		
			}

			db.insert(req.body, function(err, newDoc) {
				if (err) return res.json({error:err});
				res.json(newDoc);
			})
		} else if (base + 'count' == req.url) {
			// Assumes body contains query syntax
			db.count(req.body, function(err, count) {
				res.json({count:count,error:err});
			})
		} else if (base + 'find' == req.url) {
			// Assumes body contains query syntax.
			_.forIn(req.body, function(value,key) {
				if (value[0] == "/" && value[value.length-1] == "/") {
					req.body[key] = new RegExp(value.substr(1, value.length-2));
				}
			})
			
			if (debug) {
				console.log("Store find");
				console.log("  Query: " + JSON.stringify(req.body));		
			}

			db.find(req.body, function(err, docs) {
				if (err) return res.json({error:err});
				res.json(docs);
			})
		} else if (base + 'update' == req.url) {
			// Assumes body with: query, update and options fields.
			// options:
			//	multi (false): update multiple query matches
			//	upsert (false): insert if query returns nothing
			var opts = req.body.options ? req.body.options : {};
			if (typeof opts.multi == 'undefined') opts.multi = false;
			if (typeof opts.upsert == 'undefined') opts.upsert = false;
			if (debug) {
				console.log("Store update");
				console.log("  Query: " + JSON.stringify(req.body.query));
				console.log(" Update: " + JSON.stringify(req.body.update));	
			}

			db.update(req.body.query, req.body.update, opts, function(err, replaced, upsert) {
				res.json({
					error:err,
					replaced:replaced,
					upsert:upsert
				})
			})
		} else if (base +'remove' == req.url) {
			// Assumes body with: query and options fields.
			// options:
			//	multi (true): remove multiple query matches
			var opts = req.body.options ? req.body.options : {};
			if (typeof opts.multi == 'undefined') opts.multi = false;
			if (typeof req.body.query == 'undefined') req.body.query= {};
			if (debug) {
				console.log("Store remove");
				console.log("    Query: " + JSON.stringify(req.body.query));
				console.log("  Options: " + JSON.stringify(req.body.options));

			}
			db.remove(req.body.query, opts, function(err, removed) {
				res.json({
					error:err,
					removed:removed
				});
			})
		} else if (base +'clear' == req.url) {
			db.remove({}, {}, function(err, removed) {
				res.json({
					error:err,
					removed:removed
				});
			})
    } else {
      next();
    }
  };
};
