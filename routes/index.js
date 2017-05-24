//  Import package
var express = require('express');
var router = express.Router();
// Import models
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
//
// Define Routes
//
// Home page
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/user/signin');
  }
  var successMsg = req.flash('success')[0];
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/index', {
      title: 'Catalogo de Productos',
      products: productChunks,
      successMsg: successMsg,
      noMessages: !successMsg
    });
  });
});
// Order Confirmation GET
router.get('/confirm', isLoggedIn, function(req, res, next) {
  // console.log(req.session.cart);
  if (!req.session.cart) {
    console.log('no cart!!');
    return res.redirect('/cart');
  }
  // console.log('yes there is a cart');
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/confirm', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});
// Order Confirmation POST
router.post('/confirm', isLoggedIn, function(req, res, next) {
  // console.log(req.session.cart);
  if (!req.session.cart) {
    // console.log('no cart!!');
    return res.redirect('/cart');
  }
  // console.log('yes there is a cart');
  var cart = new Cart(req.session.cart);
  var order = new Order({
    user: req.user,
    cart: cart,
    date: Date(),
    comments: req.body.comments
  });
  order.save(function(err, result) {
    // console.log('saving order...');
    req.flash('success', 'Pedido confirmado!');
    req.session.cart = null;
    res.redirect('/');
  });
});
module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
