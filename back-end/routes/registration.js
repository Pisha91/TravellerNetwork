var express = require('express');
var log = require('../libs/log')(module);
var router = express.Router();
var Account = require('../mongoDB/models/account');

router.post('/registration', function(req, res, next){
	var account = new Account({
		firstName : req.body.firstName,
		lastName : req.body.lastName,
		email: req.body.email,
		password: req.body.password
	});
		
	account.save(function(err, account){
		if(err) {
			log.error(err);
			res.send(500, err);
		}else{
			log.debug('Account "' + req.body.email + '" saved.');
			res.send(200, account.toAccountObject());
		}
	});
});

module.exports = router;