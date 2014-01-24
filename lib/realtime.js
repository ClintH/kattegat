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
	this.io.set('log level', 1);
	this.io.sockets.on('connection', (onConnection).bind(this));
}

var onConnection = function(socket) {
	var debug = this.kattegat.options.debug;
	var io = this.io;
	if (debug) console.log("Realtime client connected (" + socket.id +")");

	socket.emit("hello", {id:socket.id});

	socket.on('disconnect', function() {
		if (debug) console.log("Realtime client disconnected");

		var data = {
			id: socket.id,
			data: socket.store.data,
			wasDisconnect: true,
		};

		var rooms = io.sockets.manager.roomClients[socket.id];

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
		
		socket.set(data.name, data.value);
	})

	// Get stored data
	socket.on('get', function(data) {
		if (data == null || !data.name) return;
		if (debug) console.log("Realtime get: " + data.name);
		socket.get(data.name, function(err, value) {
			socket.emit("data", {name:data.name, value:value});
		});

	})

	// List rooms
	socket.on("rooms", function(data) {
		if (debug) console.log("Realtime rooms list");
		var rooms  = io.sockets.manager.rooms;
		var names = _.map(_.keys(rooms), function(name) {
			if (name.length == 0) return name;
			return name.substr(1);
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
		var members = io.sockets.clients(room);
		var r = [];
		for (var i=0;i<members.length; i++) {
			r.push({
				id: members[i].id,
				data: members[i].store.data
			})
		}
		socket.emit("list", r);
	}
	// Broadcast to room or to everyone (except sender)
	socket.on("say", function(data) {
		if (data == null) return;
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
		data.data = socket.store.data;
		socket.join(data.room);
		socket.broadcast.to(data.room).emit('join', data);
		sendList(data.room); // Send a list of participants to the new member
	})

	socket.on("leave", function(data) {
		if (data == null || !data.room) return;
		data.id = socket.id;
		data.data = socket.store.data;
		data.wasDisconnect = false;
		if (debug) console.log("Realtime leave: " + data.room);
		socket.broadcast.to(data.room).emit('leave', data);
		socket.leave(data.room);
	})
}
