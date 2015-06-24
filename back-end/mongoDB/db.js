var mongoose = require('mongoose');
var config = require('./config');
mongoose.connect(config.get('connectionString'));
var db = mongoose.connection;

db.on('error', function(err){
	console.error.bind(console, 'connection error: ');
});

db.on('open', function(callback){
	console.log('DB connection open');
});

module.exprorts = db;