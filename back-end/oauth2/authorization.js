var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var AccessTokenModel = require('../mongoDB/models/accessToken');
var Account = require('../mongoDB/models/account');

passport.use(new BearerStrategy(
	function(accessToken, done){
		AccessTokenModel.findOne({token: accessToken}, function(err, token){
			if(err){ return done(err); }
			if(!token) { return done(null, false); }
			
			Account.findById(token.userId, function(err, account){
				if(err){ return done(err); }
				if(!account) { return done(null, false, { message: 'User not found' }); }
				
				var info = { scope: '*' };
				
				return done(null, account, info);
			});
		});
	}
));
