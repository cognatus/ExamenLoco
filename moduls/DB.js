//coleccion de la DB
var mongoose = require('mongoose');

var DB = mongoose.Schema({

	_id: {type: String, required: true},
	pass: {type: String, required: true},
	some: {type: String, required: true}
	
});

module.exports = mongoose.model('DB', DB);