var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

//2 ways to remove items from an array .splice() or .filter(function(){})
var Storage = function() {
    this.items = [];
    this.id = 0;
};

// Storage.prototype.put = function(id){
// 	//use map instead of filter
	
// }

Storage.prototype.find = function(id){
	return this.items.find(function(e,i,a){
		if(e.id == id){
			return true
		}
	})
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

Storage.prototype.delete = function(id){
	this.items = this.items.filter(function(e,i,a){
		if(e.id == id){
			return false;
		}
		else {
			return true;
		}
	})
};

Storage.prototype.change = function(target, update){
	console.log(this.items);
	this.items = this.items.map(function(e){
		if(target == e.id){
			e.name = update
			return e;
		}
		else {
			return e;
		}
	})
	console.log(this.items);
	return this.find(target);
};


var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});

app.post('/items', jsonParser, function(request, response) {
    if (!request.body) {
        return response.sendStatus(400);
    }

    var item = storage.add(request.body.name);
    response.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(request, response){
	var item = storage.find(request.params.id);
	if(!item) {
		return reponse.sendStatus(404);
	}
	else {
	storage.delete(request.params.id);
	return response.status(200).json(item);
	}
});

app.put('/items/:id', jsonParser, function(request, response){
	if(!request.body){
		return response.sendStatus(404);
	}
	var item = storage.change(request.params.id, request.body.name);
	return response.status(200).json(item);
});

app.listen(process.env.PORT || 8080, process.env.IP);