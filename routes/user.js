// Import packages
var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// Import models
var Order = require('../models/order');
var Cart = require('../models/cart');
var sendEmail = require('../libs/send-email.js');
// Setup CSRF on Routes
var csrfProtection = csrf();
router.use(csrfProtection);
//
// GET Orders
router.get('/orders', function(req, res, next) {
  Order.find().populate('user')
  .then(function(orders) {
    var cart;
    orders.forEach(function(order) {
      cart = new Cart(order.cart);
      order.items = cart.generateArray();
    });
    res.render('user/orders', {
      orders: orders
    });
  });
});
// GET Logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});
// Middleware to verify login for following routes
router.use('/', notLoggedIn, function(req, res, next) {
  next();
});
// GET signin
router.get('/signin', function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});
// POST signin
router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function(req, res, next) {
  if (req.session.oldUrl) {
    var oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/');
  }
  sendEmail('bigla.developer@gmail.com', 'Login al sitio KC', 'User ' + req.user.email + ' has signed in.');
});
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
