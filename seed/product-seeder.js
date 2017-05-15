var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping')


var products = [
  new Product({
    sku: '99999',
    name: 'Peluche Alcancia con Sonido',
    description: 'Tamaño del producto: 10 cms de alto, Material: plush, Certificación EN71, FAMA, Packaging: Bolsa plástica individual, Plazo de entrega 90 días',
    images: ['/images/99999a.png', '/images/99999b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
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
    images: ['/images/77777a.png', '/images/77777b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
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
    images: ['/images/88888a.png', '/images/88888b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 20000,
    hscode: '44.4444.44',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '66666',
    name: 'Peluche Alcancia con Sonido 2',
    description: 'Tamaño del producto: 10 cms de alto, Material: plush, Certificación EN71, FAMA, Packaging: Bolsa plástica individual, Plazo de entrega 90 días',
    images: ['/images/99999a.png', '/images/99999b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 20000,
    hscode: '8.888.888',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '55555',
    name: 'Mochilas 2',
    description: 'Tamaño de los productos: 30 cms de alto, Material: plastico, Certificación EN71, Packaging. Bolsa plástica individual, Plazo de entrega 90 días.',
    images: ['/images/77777a.png', '/images/77777b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 20000,
    hscode: '33.333.333',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '44444',
    name: 'Toalla Capucha Personajes 2',
    description: 'Material: 320 gsm, Medidas60 x 120 cms, Logo Impreso 3 modelos a elegir, Envase: bolsa plástica',
    images: ['/images/88888a.png', '/images/88888b.png'],
    prices: [{
      tier: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tier: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tier: 3,
      qty: 100000,
      price: 3.48
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
