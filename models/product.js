var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  sku: {type: String, required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  images: {type: Array, required: true},
  prices: {type: Array, required: true},
  moq: {type: Number, required: true},
  hscode: {type: String, required: false},
  origin: {type: String, required: false},
  incoterms: {type: String, required: false},
  provider: {type: String, required: false}
});

module.exports = mongoose.model('Product', schema);
