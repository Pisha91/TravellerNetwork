var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var refreshToken = new Schema({
	userId : { type: String, required: true },
	clientId : { type: String, required: true },
	token : { type: String, required: true, unique: true },
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RefreshToken', refreshToken);