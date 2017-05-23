var mongoose = require('mongoose');
var Orders = require('../models/order');
mongoose.connect('mongodb://localhost:27017/shopping')


// remove all existing
// db.collection.remove({})
  Orders.remove(function(err, orders) {
    if (err) return console.error(err);
    if (orders) return console.log('Removed all orders from mongodb');
  })

  exit()

  function exit() {
    mongoose.disconnect();
  }
