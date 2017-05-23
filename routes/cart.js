var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/order');
router.get('/', function(req, res, next) {
  console.log('hit cart route!!');
  if (!req.session.cart) {
    return res.render('shop/cart', {
      products: null
    });
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/cart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});
router.get('/add-to-cart/:id', function(req, res, next) {
  console.log('res.params:', req.params);
  console.log('res.query:', req.query);
  var productId = req.params.id;
  var addQty = req.query.addQty;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  Product.findById(productId, function(err, product) {
    if (err) {
      console.log(err);
      return res.redirect('/');
    }
    cart.add(product, product.id, parseInt(addQty, 10));
    req.session.cart = cart;
    console.log(req.session.cart);
    req.flash('success', 'Producto agregado al pedido!');
    res.redirect('/');
  });
});
router.get('/remove/:id', function(req, res, next) {
  console.log('res.params:', req.params);
  console.log('res.query:', req.query);
  var productId = req.params.id;
  console.log(productId);
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeItem(productId);
  req.session.cart = cart;
  console.log(cart);
  res.redirect('/cart');
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
