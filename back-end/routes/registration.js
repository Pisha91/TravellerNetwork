var express = require('express');
var router = express.Router();
var Account = require('../mongoDB/models/account')

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