var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy  = require('passport-oauth2-client-password').Strategy;
var AccessTokenModel = require('../mongoDB/models/accessToken');
var Account = require('../mongoDB/models/account');
var Client = require('../mongoDB/models/client');

passport.use(new BasicStrategy(
    function(username, password, done) {
        Client.findOne({ clientId: username }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != password) { return done(null, false); }

            return done(null, client);
        });
    }
));

passport.use(new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        Client.findOne({ clientId: clientId }, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret != clientSecret) { return done(null, false); }

            return done(null, client);
        });
    }
));

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
