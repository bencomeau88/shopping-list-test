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

exports.Storage = Storage;