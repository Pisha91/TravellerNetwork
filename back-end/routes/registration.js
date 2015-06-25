var express = require('express');
var log = require('../libs/log')(module);
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
		
	account.save(function(err, account){
		if(err) {
			log.error(err);
		}else{
			log.debug('Account saved.');
			log.debug(account);
		}
	});
	
	res.end();
});

module.exports = router;