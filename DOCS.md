
# <a name="storage"></a> Storage

You can get, put and remove data from the server.

## <a name="storage-inserting"></a> Put data

| Method    | URL           | Arguments      |
| --------- | ------------- | ---------------|
| POST      | /store/insert | Object to save |

Response: Data that was stored, with the addition of an id field

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
| POST      | /store/update   | {query, update} where query is a find query, and update is the data to set |

Response: Updated object(s)

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


Response: Updated object(s)

### Example
Removes all objects with name containing the letter 'j'

````
    function update() {
        var request = {
            query: { name: "/j/" }
            options: { multi: true }
        };
        $.post("/store/remove", request, function(data, status, xhr) {
            console.dir(data);
		})
	}
````