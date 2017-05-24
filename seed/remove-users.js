var mongoose = require('mongoose');
var User = require('../models/user');
mongoose.connect('mongodb://localhost:27017/shopping')


// remove all existing
// db.collection.remove({})
  User.remove(function(err, users) {
    if (err) return console.error(err);
    if (users) return console.log('Removed all users from mongodb');
  })

  exit()

  function exit() {
    mongoose.disconnect();
  }
