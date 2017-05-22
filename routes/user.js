var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var Order = require('../models/order');
var Cart = require('../models/cart');
var sendEmail = require('../libs/send-email.js');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/orders', function (req, res, next) {
    Order.find({user: req.user}, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        res.render('user/orders', { orders: orders });
    });
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
    next();
});

// router.get('/signup', function (req, res, next) {
//     var messages = req.flash('error');
//     res.render('user/signup', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
// });
//
// router.post('/signup', passport.authenticate('local.signup', {
//     failureRedirect: '/user/signup',
//     failureFlash: true
// }), function (req, res, next) {
//   // signup successful
//   // send email
//   // console.log('sending signup email to: '+req.user.email);
//   // sendEmail(req.user.email, 'Acceso autorizado', '<h2>Email {{req.user.email}} está autorizado para acceder.</h2>');
//   // redirect
//   if (req.session.oldUrl) {
//     var oldUrl = req.session.oldUrl;
//     req.session.oldUrl = null;
//     res.redirect(oldUrl);
//   } else {
//     res.redirect('/');
//   }
// });

router.get('/signin', function (req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function (req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/');
    }
    sendEmail('bigla.developer@gmail.com', 'Login al sitio KC', 'User '+req.user.email+' has signed in.');
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
