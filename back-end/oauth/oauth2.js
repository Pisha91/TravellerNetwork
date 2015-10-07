var oauth2orize         = require('oauth2orize');
var passport            = require('passport');
var crypto              = require('crypto');
var Account = require('../mongoDB/models/account');
var Client = require('../mongoDB/models/client');
var AccessToken = require('../mongoDB/models/accessToken');
var RefreshToken = require('../mongoDB/models/RefreshToken');

var server = oauth2orize.createServer();

server.exchange(oauth2orize.exchange.password(function(client, email, password, scope, done){
	Account.findOne({ email: email}, function(err, account){
		if(err){ done(err); }
		if(!account) { done(null, false); }
		if(!account.checkPassword(password)) { done(null, false); }
		
		AccessToken.remove({ userId: account.userId, clientId: client.clientId }, function(err){
			if(err) { done(err) };
		});
		
		RefreshToken.remove({ userId: account.userId, clientId: client.clientId }, function(err){
			if(err) { done(err) };
		});
		
		var tokenValue = crypto.randomBytes(32).toString('base64');
        var refreshTokenValue = crypto.randomBytes(32).toString('base64');
		var token = new AccessToken({ token: tokenValue, clientId: client.clientId, userId: user.userId });
        var refreshToken = new RefreshToken({ token: refreshTokenValue, clientId: client.clientId, userId: user.userId });
        refreshToken.save(function (err) {
            if (err) { return done(err); }
        });
		
        var info = { scope: '*' }
        token.save(function (err, token) {
            if (err) { return done(err); }
            done(null, tokenValue, refreshTokenValue);
        });
	});
}));

exports.token = [
    passport.authenticate(['basic', 'oauth2-client-password'], { session: false }),
    server.token(),
    server.errorHandler()
]