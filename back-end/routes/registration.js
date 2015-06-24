var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TravellerNetwork');
var db = mongoose.connection;

db.on('error', function(err){
	console.error.bind(console, 'connection error: ');
});

db.on('open', function(callback){
	console.log('DB connection open');
});

var Schema = mongoose.Schema;

var accountSchema = new Schema({
	firstName : String,
	lastName : String,
	login: String,
	email : String,
	password: String
});

var Account = mongoose.model('Account', accountSchema);

router.post('/', function(req, res, next){
	var account = new Account({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		login: req.body.login,
		email: req.body.email,
		password: req.body.password
	});
	
	console.log(req.body);
	console.log(account);
	
	account.save(function(err, account){
		if(err) {
			console.log(err);
		}else{
			console.log('Account saved.');
		}
	});
	
	res.send('registration');
});

module.exports = router;