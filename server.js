var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var storageLib = require('./storage.js');


//2 ways to remove items from an array .splice() or .filter(function(){})


var storage = new storageLib.Storage();
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

exports.app = app;
exports.storage = storage;