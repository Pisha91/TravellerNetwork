var mongoose = require('mongoose');
var config = require('../config');
var log = require('../libs/log')(module);
mongoose.connect(config.get('connectionString'));
var db = mongoose.connection;

db.on('error', function(err){
	log.error(err);
});

db.on('open', function(callback){
	log.info('DB connection open');
});

module.exprorts = db;