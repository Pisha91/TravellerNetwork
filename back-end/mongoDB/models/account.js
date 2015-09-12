var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var accountSchema = new Schema({
	firstName : { type: String, required: true }, 
	lastName : { type: String, required: true },
	email : { type: String, required: true, unique: true },
	hashedPassword: { type: String, required: true }, 
	salt: { type: String, required: true }
});

accountSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

accountSchema.methods.checkPassword = function(password) {
	return this.hashedPassword == this.encryptPassword(password); 
};

accountSchema.virtual('userId').get(function(){ return this.id; });
accountSchema.virtual('password')
	.set(function(password){ 
		this._plainPassword = password;
		this.salt = crypto.randomBytes(32).toString('base64');
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function(){ return this._plainPassword; });

module.exports = mongoose.model('Account', accountSchema);