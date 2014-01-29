Here is some more low-level documentation of Kattegat. Pretty much everything here is illustrated in the supplied interactive demos.

# <a name="storage"></a> Storage

You can get, put and remove data from the server.

## <a name="storage-inserting"></a> Put data

| Method    | URL           | Arguments      |
| --------- | ------------- | ---------------|
| POST      | /store/insert | Object to save |

Response: Data that was stored, with the addition of an `_id` field, which uniquely identifies the object. The server also adds a 'created' timestamp for your convenience.

### Examples

Example: Inserts a single object, and prints out the response from the server.
````
    function insert() {
        var bus = {
            from: "Copenhagen",
            to: "Aarhus",
            capacity = 37
        }
    	$.post("/store/insert", bus, function(data, status, xhr) {
				console.log("Inserted: " + JSON.stringify(data));
			})
		}
	}
````

Example: Inserts an array of five objects, and prints out the response from the server.
````
    function insertArray() {
		var test = [
			{name: "Alice", age: 24, colour: "Blue"},
			{name: "Jane", age: 19, colour: "Blue"},
			{name: "Boris", age: 19, colour: "Green"},
			{name: "Igor", age: 43, colour: "Yellow"},
			{name: "Baldrick", age: 50, colour: "Red"},
		]
		for (var i=0;i<test.length; i++) {
			$.post("/store/insert", test[i], function(data, status, xhr) {
				console.log("Inserted: " + JSON.stringify(data));
			})
		}
	}
````

## <a name="storage-get"></a> Finding/getting data
| Method    | URL           | Arguments      |
| --------- |-------------  | ---------------|
| POST      | /store/find   | Query |

Response: Objects(s) which match query, or an empty array if nothing matches.

Some basic examples of finding data is provided. For more, please see [nedb's docs](https://github.com/louischatriot/nedb#finding-documents)

Note: Techniques used for finding a particular object are also applicable to how we update specific objects or remove them.

### Examples
Finds and dumps all objects in the database:
    
````
    function getAll() {
        var find = {};
		$.post("/store/find", find, function(data, status, xhr) {
			console.dir(data);
		})
	}
````

Finds all objects that have a 'name' field that contains 'a'. This would match objects {age:24,name:'Jane'} and {age:42,name:'Sally'}, but not {age:30,name:'Bob'} or {x:10}
    
````
    function getSubstring() {
        var find = {
            name: "/lo/"
        };
    	$.post("/store/find", find, function(data, status, xhr) {
			console.dir(data);
		})
	}
````

Finds all objects that have a 'name' field that is equal to 'Bob'. This would match object {age:30,name:'Bob'}, but not {age:24,name:'Jane'} and {age:42,name:'Sally'}, or {x:10}
````
    function getExact() {
        var find = {
            name: "Bob"
        };
        $.post("/store/find", find, function(data, status, xhr) {
			console.dir(data);
		})
	}
````

Finds all objects that have a 'age' field greater than 25. This would match object {age:30,name:'Bob'} and {age:42,name:'Sally'}, but not {age:24,name:'Jane'} or {x:10}
````
    function getRange() {
        var find = {
            age: { "$gt" : 25 }
        };
        $.post("/store/find", find, function(data, status, xhr) {
    		console.dir(data);
		})
	}
````
## <a name="storage-put"></a> Updating
| Method    | URL           | Arguments      |
| --------- |-------------  | ---------------|
| POST      | /store/update   | {query, update, options} where query is a find query, and update is the data to set |

### Options argument

| Field | Type (default) | Notes |
| ----- | -------------- | ----- |
| upsert | Boolean (false) | If true, object will be created if nothing matches the query argument |
| multi | Boolean (false) | If true, will update multiple objects if they match |

### Response

| Field    | Type     | Notes |
| -------  | -------- | ----- |
| error    | Boolean  | If non-null, there was an error |
| replaced | Integer  | The number of objects updated |
| upsert | Boolean  | If true, document was inserted |

### Example
Updates all objects with 'age' greater than 25, setting the age to 20.

````
    function update() {
        var request = {
            query: { age: { "$gt" : 25 } }
            update: { age: 20 }
        };
        $.post("/store/update", request, function(data, status, xhr) {
        	console.dir(data);
		})
	}
````

## <a name="storage-del"></a> Removing
| Method    | URL           | Arguments       |
| --------- |-------------  | --------------- |
| POST      | /store/remove   | {query, options} |

Arguments: `query`: A find query

### Options argument

| Field | Type (default) | Notes |
| ----- | -------------- | ----- |
| multi | Boolean (false) | If true, will delete multiple objects if they match |


### Response

| Field   | Type     | Notes |
| ------- | -------- | ----- |
| error   | Boolean  | If non-null, there was an error |
| removed | Integer  | The number of objects deleted |

### Example
Removes all objects with name containing the letter 'j'

````
    function remove() {
        var request = {
            query: { name: "/j/" }
            options: { multi: true }
        };
        $.post("/store/remove", request, function(data, status, xhr) {
            console.dir(data);
		})
	}
````


# <a name="realtime"></a> Realtime

Data can be streamed to other connected clients in realtime. Unlike the [Storage](#storage) feature, data is not stored - it is sent, consumed and then forgotten about. That makes it great for high-throughput streams like events from user interaction or sensors.

## <a name="rt-setup"></a> Setup
Make sure you've included the Socket.io script in your page:

````
<script src="/socket.io/socket.io.js"></script>
````

In your some kind of page load handler, you need to connect, and listen to events from the server. An event is fired when the server sends you something, or it is forwarding you data from another client.

````
$(document).ready(function() {
    // Connect
	socket = io.connect("http://" + window.location.host);
	
	// Listen to events from the server
	socket.on("hello", onHello);
	socket.on("say", onSay);
	socket.on("join", onJoin);
	socket.on("leave", onLeave);
	socket.on("list", onList);
	socket.on("data", onData);
	socket.on("rooms", onRooms);
}
````

Your event handlers will get called with the event data, eg:
````
function onHello(data) {
    console.log("Received greeting from server. Our id is: " + data.id);
}
````

## <a name="rt-bcast"></a> Broadcasting

Broadcasting sends an event to _all_ connected clients. Simply emit a `say` event. In the snippet below, we'll send {x:10, y:12} out to everyone else

````
function broadcast() {
   var data = {
		x: 10,
        y: 12
	}
	socket.emit("say", data);
}	

````

Receiving data is a matter of listening for the "say" event. The server will attach a `_.clientId` field to each object that you receive. This id corresponds to ids seen when you list room contents. Client ids are stable for a session, but no longer than that.

````
socket.on("say", function(d) {
	console.log("Received from: " + d._clientId);
	console.log(JSON.stringify(d));
})
````

## <a name="rt-rooms"></a> Rooms
Rooms can be thought of as channels. Joining a room means you'll get events sent to that room. You are able to join more than one room at a time, and you'll need to re-join each time your page loads.

### Join and leave
To join a room named 'tablets' (the server will automatically create/destroy rooms for you)
````
function join() {
	var data = {
		room: "tablets"
	}
	socket.emit("join", data);
}
````

Leaving a room is the same, but emit "leave" instead of "join"

### Sending
To send an event to a room:

````
function send() {
    var data = {
		room: "tablets",
		x: 140,
        y: 9
	}
	socket.emit("say", data);
}
````

Tip: You don't have to join a room to send messages to it

### List clients
You can query which clients have joined a room, and get a dump of data which has been associated with them:

````
function list() {
	socket.emit("list", {room:"test"});
}
````

You'll get the response via your "list" event handler, eg:

````
function onList(data) {
    console.log("Received list response:");
	console.dir(data);
}
````

### Listing rooms
You can get a list of rooms using the "rooms" event:
````
function listRooms() {
    socket.emit("rooms", {});
}
````

and again the result is returned to you via event handler:

````
function onRooms(data) {
    console.log("Received list of rooms:");
	console.dir(data);
}
````

## <a name="rt-data"></a> Associating data
Each client is able to save data about itself, which persists for the duration of the connection. Moreover, the data is sent to other clients when a room is joined or left, or a room 'list' is performed.

Setting data:
````
function save() {
    var data = {
		name: "playerName",
		value: "Zorro"
	}
	socket.emit("put", data);
}
````

Request data:
````
function get() {
	socket.emit("get", {name:"playerName"});
}
````

Data is returned to you in the 'data' event handler. Data is also furnished when you emit a 'list' event as well - and gives you all the data for all clients in a room.

The data feature can be useful for tracking some state information about clients. Eg, you could imagine that use "say" to broadcast information about a game player's movements, and use the "put" to save their current score, or name. - since it doesn't change as often.
