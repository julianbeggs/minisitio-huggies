var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping')


var products = [
  new Product({
    sku: '99999',
    name: 'Peluche Alcancia con Sonido',
    description: 'Tamaño del  producto: 10 cms de alto, Material: plush, Certificación EN71, FAMA, Packaging: Bolsa plástica individual, Plazo de entrega 90 días',
    // images: ['../public/images/99999a.png', '../public/images/99999b.png'],
    images: ['http://data.whicdn.com/images/129338682/original.jpg', 'https://placehold.it/350x150'],
    prices: [{
      tier: 1,
      price: 4.88,
      qty: 20000
    }, {
      tier: 2,
      price: 3.98,
      qty: 50000
    }, {
      tier: 3,
      price: 3.68,
      qty: 100000
    }],
    moq: 20000,
    hscode: '8.888.888',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '77777',
    name: 'Mochilas',
    description: 'Tamaño de los productos: 30 cms de alto, Material: plastico, Certificación EN71, Packaging. Bolsa plástica individual, Plazo de entrega 90 días.',
    // images: ['../public/images/77777a.png', '../public/images/77777b.png'],
    images: ['http://data.whicdn.com/images/129338682/original.jpg', 'https://placehold.it/350x150'],
    prices: [{
      tier: 1,
      price: 4.38,
      qty: 20000
    }, {
      tier: 2,
      price: 3.68,
      qty: 50000
    }, {
      tier: 3,
      price: 3.48,
      qty: 100000
    }],
    moq: 20000,
    hscode: '33.333.333',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '88888',
    name: 'Toalla Capucha Personajes',
    description: 'Material: 320 gsm, Medidas60 x 120 cms, Logo Impreso 3 modelos a elegir, Envase: bolsa plástica',
    // images: ['../public/images/88888a.png', '../public/images/88888b.png'],
    images: ['http://data.whicdn.com/images/129338682/original.jpg', 'https://placehold.it/350x150'],
    prices: [{
      tier: 1,
      price: 4.38,
      qty: 20000
    }, {
      tier: 2,
      price: 3.68,
      qty: 50000
    }, {
      tier: 3,
      price: 3.48,
      qty: 100000
    }],
    moq: 20000,
    hscode: '44.4444.44',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  })
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit()
    }
  });
}

function exit() {
  mongoose.disconnect();
}
