/*
A thin wrapper around Socket.io
*/
var _ = require("lodash")

module.exports = function realtime(kattegat) {
	return {
		start: start,
		kattegat: kattegat
	};
};

var start = function() {
	this.io = require("socket.io").listen(this.kattegat.server);
	//this.io.set('log level', 5);
	this.io.sockets.on('connection', (onConnection).bind(this));
}

var onConnection = function(socket) {
	var debug = this.kattegat.options.debug;
	socket.store = [];

	var io = this.io;
	if (debug) console.log("Realtime client connected (" + socket.id +")");

	socket.emit("hello", {id:socket.id});

	socket.on('disconnect', function() {
		if (debug) console.log("Realtime client disconnected");

		var data = {
			id: socket.id,
			data: socket.store,
			wasDisconnect: true,
		};

	
		var rooms = io.sockets.connected[socket.id];

		_.each(_.keys(rooms), function(name) {
			if (name.length == 0) return;
			data.room = name.substr(1);
			socket.broadcast.to(data.room).emit('leave', data);
			name.substr(1);
		})
	})
	// Store data with connection
	socket.on('put', function(data) {
		if (data == null) return;
		if (!data.name) return;
		if (!data.value) data.value = null;
		if (debug) console.log("Realtime put: " + data.name + " = "+ JSON.stringify(data.value));
		
		socket.store[data.name] = data.value;
	})

	// Get stored data
	socket.on('get', function(data) {
		if (data == null || !data.name) return;
		if (debug) console.log("Realtime get: " + data.name);
		/*
		socket.get(data.name, function(err, value) {
			socket.emit("data", {name:data.name, value:value});
		});
*/
		socket.emit("data", {
			name:data.name,
			value: socket.store[data.name]
		});
	})

	// List rooms
	socket.on("rooms", function(data) {
		if (debug) console.log("Realtime rooms list");
		var rooms = io.sockets.adapter.rooms;
		var names = [];
		_.each(_.keys(rooms), function(name) {
			if (io.sockets.connected[name]) return;
			names.push(name);
		})
		socket.emit("rooms", names);
	})

	// List members of room
	// 	...and return all associated data
	socket.on("list", function(data) {
		if (data == null || !data.room) return;
		if (debug) console.log("Realtime members: " + data.room);
		sendList(data.room);
	})

	function sendList(room) {
		var r = [];
		var members = io.sockets.adapter.rooms[room];
		var memberKeys = _.keys(members);
		for (var i=0;i<memberKeys.length; i++) {
			var who = memberKeys[i];
			//console.log("data:");
			//console.dir(io.sockets.connected[who].store);
			r.push({
				id: who,
			})
		}
		socket.emit("list", r);
	}
	// Broadcast to room or to everyone (except sender)
	socket.on("say", function(data) {
		if (data == null) return;
		data._clientId = socket.id;
		if (data.room)
			socket.broadcast.to(data.room).emit('say', data);
		else
			socket.broadcast.emit('say', data)
	})

	socket.on("join", function(data) {
		if (data == null || !data.room) return;
		if (debug) console.log("Realtime join: " + data.room);
		var id = data.id || "?";
		data.id = socket.id;
		data.data = socket.store;
		socket.broadcast.to(data.room).emit('join', data);
		socket.join(data.room);
		socket.emit('join', data);
		sendList(data.room); // Send a list of participants to the new member
	})

	socket.on("leave", function(data) {
		if (data == null || !data.room) return;
		data.id = socket.id;
		data.data = socket.store;
		data.wasDisconnect = false;
		if (debug) console.log("Realtime leave: " + data.room);
		socket.broadcast.to(data.room).emit('leave', data);
		socket.leave(data.room);
	})
}
