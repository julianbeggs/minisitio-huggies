var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/user/signin');
  }
  var currentUser = "req.user"
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
router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});
router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/cart');
  }
  var cart = new Cart(req.session.cart);
  var stripe = require("stripe")("sk_test_rYJpGrtbGINqvdV433CX9Lns");
  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
    order.save(function(err, result) {
      req.flash('success', 'Pedido exitoso!');
      req.session.cart = null;
      res.redirect('/');
    });
  });
});
router.get('/confirm', isLoggedIn, function(req, res, next) {
  console.log(req.session.cart);
  if (!req.session.cart) {
    console.log('no cart!!');
    return res.redirect('/cart');
  }
  console.log('yes there is a cart');
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/confirm', {
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});
router.post('/confirm', isLoggedIn, function(req, res, next) {
  console.log(req.session.cart);
  if (!req.session.cart) {
    console.log('no cart!!');
    return res.redirect('/cart');
  }
  console.log('yes there is a cart');
  var cart = new Cart(req.session.cart);
  var order = new Order({
    user: req.user,
    cart: cart,
    timestamp: Date.now()
  });
  order.save(function(err, result) {
    console.log('saving order...');
    req.flash('success', 'Pedido confirmado!');
    req.session.cart = null;
    res.redirect('/user/orders');
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
