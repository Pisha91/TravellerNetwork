var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	firstName : String,
	lastName : String,
	login: String,
	email : String,
	password: String
});

module.exports = mongoose.model('Account', accountSchema);