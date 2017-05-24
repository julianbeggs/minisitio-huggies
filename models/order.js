var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  cart: {type: Object, required: true},
  date: { type: Date },
  comments: { type: String }
});

module.exports = mongoose.model('Order', schema);
