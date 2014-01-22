/*
A thin wrapper around Socket.io
*/
var _ = require("lodash")

module.exports = function realtime(server) {

  var options = options || {}
  	, _server  = server
    , rtDebug = true
		, io = require("socket.io").listen(_server);
	io.set('log level', 1);
	io.sockets.on('connection', function(socket) {

		if (rtDebug) console.log("Realtime client connected (" + socket.id +")");

		socket.emit("hello", {id:socket.id});

		socket.on('disconnect', function() {
			if (rtDebug) console.log("Realtime client disconnected");

			var rooms = io.sockets.manager.roomClients[socket.id];
			console.dir(rooms);
		})
		// Store data with connection
		socket.on('put', function(data) {
			if (data == null) return;
			if (!data.name) return;
			if (!data.value) data.value = null;
			if (rtDebug) console.log("Realtime put: " + data.name + " = "+ JSON.stringify(data.value));
			
			socket.set(data.name, data.value);
		})

		// Get stored data
		socket.on('get', function(data) {
			if (data == null || !data.name) return;
			if (rtDebug) console.log("Realtime get: " + data.name);
			socket.get(data.name, function(err, value) {
				socket.emit("data", {name:data.name, value:value});
			});

		})

		// List rooms
		socket.on("rooms", function(data) {
			if (rtDebug) console.log("Realtime rooms list");

			var rooms  = io.sockets.manager.rooms;
			console.log("rooms");
			console.dir(rooms);
			var names = _.map(_.keys(io.sockets.manager.rooms), function(name) {
				if (name.length == 0) return name;
				return name.substr(1);
			})
			socket.emit("rooms", names);
		})

		// List members of room
		// 	...and return all associated data
		socket.on("list", function(data) {
			if (data == null || !data.room) return;
			if (rtDebug) console.log("Realtime members: " + data.room);
			var members = io.sockets.clients(data.room);
			var r = [];
			for (var i=0;i<members.length; i++) {
				r.push({
					id: members[i].id,
					data: members[i].store.data
				})
			}
			socket.emit("list", r);
		})

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
			if (rtDebug) console.log("Realtime join: " + data.room);
			var id = data.id || "?";
			data.id = socket.id;
			data.data = socket.store.data;
			socket.join(data.room);
			socket.broadcast.to(data.room).emit('join', data);

		})

		socket.on("leave", function(data) {
			if (data == null || !data.room) return;
			data.id = socket.id;
			data.data = socket.store.data;
			if (rtDebug) console.log("Realtime leave: " + data.room);
			socket.broadcast.to(data.room).emit('leave', data);
			socket.leave(data.room);
		})
		
	})
};
