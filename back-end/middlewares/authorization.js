var jwt = require('jwt-simple');
var config = require('../config');

module.exports = function(req, res, next){
	var authorizationHeader = req.headers['Authorization'];
	if(authorizationHeader){
		var headerValues = authorizationHeader.split(',');
		if(headerValues[0].toLowerCase() == 'Bearer' && headerValues[1]){
			var payload = jwt.decode(headerValues[1], config.key, true, 'HS512'); 
			if(payload && payload.id && payload.email)
			{
				next();
			}
		}	
	}
	
	res.send(403);
}