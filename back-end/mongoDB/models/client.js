var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientSchema = new Schema({
	name: { type: String, required: true, unique: true },
	clientId: { type: String, required: true, unique: true },
	clientSecret: { type: String, required: true }
});

module.exports = mongoose.model('Client', clientSchema);