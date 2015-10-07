var express = require('express');
var log = require('../libs/log')(module);
var router = express.Router();
var Account = require('../mongoDB/models/account');
var jwt = require('jwt-simple');
var config = require('../config');

router.post('/signin', function(req, res){
	var email = req.body.email;
	Account.findOne({email : email}, function(err, account){
		if(err){
			log.error(err);
			res.send(500, err);
		}
			if(!account){
				log.info('Account with email "' + email +'" not found.')
				res.send(403);
			}
			
			if(account.checkPassword(req.body.password)){
				log.info('Account with email "' + email +'" signed in.')
				var payload  = {
					id: account.id,
					email: account.email
				}
				
				var token = jwt.encode(payload, config.key, 'HS512');
				
				res.send(200, { token: token });
			}
			
			res.send(403);					
	});
});

module.exports = router;