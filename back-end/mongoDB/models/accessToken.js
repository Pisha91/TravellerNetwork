var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accessTokenSchema = new Schema({
	userId : { type: String, required: true },
	clientId : { type: String, required: true },
	token : { type: String, required: true, unique: true },
	created: { type: Date, default: Date.now }
});

module.exports = mongoose.module('AccessToken', accessTokenSchema);