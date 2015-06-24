var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TravellerNetwork');
var db = mongoose.connection;

db.on('error', function(err){
	console.error.bind(console, 'connection error: ');
});

db.on('open', function(callback){
	console.log('DB connection open');
});

module.exprorts = db;