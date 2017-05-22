const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  email: {type: String, required: true},
  firstname: {type: String, required:true},
  lastname: {type: String, required:true},
  country: {type: String, required:true},
  role: {type: String, required:true},
  password: {type: String, required: true}
});

userSchema.methods.encryptPassword = function(password) {
  password = password.toLowerCase()
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
}
userSchema.methods.validPassword = function(password) {
  password = password.toLowerCase()
  return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);
