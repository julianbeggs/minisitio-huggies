var mongoose = require('mongoose');
var Product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping')

var products = [
  new Product({
    sku: '99999',
    name: 'Peluche Alcancia con Sonido',
    description: 'Tamaño del producto: 10 cms de alto, Material: plush, Certificación EN71, FAMA, Packaging: Bolsa plástica individual, Plazo de entrega 90 días',
    images: ['/images/99999a.png', '/images/99999b.png', 'http://w3.siemens.com/mcms/automation/en/product-lifecycle-management-plm/plm-products/PublishingImages/plm-products.jpg', 'http://4e2w.blob.core.windows.net/images/2014/06/HOT-BABE-KAWASAKI-Z1000-motorcycles-31778270-1920-1200.jpg'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 5000,
    hscode: '8.888.888',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '77777',
    name: 'Mochilas',
    description: 'Tamaño de los productos: 30 cms de alto, Material: plastico, Certificación EN71, Packaging. Bolsa plástica individual, Plazo de entrega 90 días.',
    images: ['http://photos01.wisgoon.com/media/pin/photos01/images/o/2016/5/4/12/500x332_1462349579810857.jpeg', '/images/77777a.png', '/images/77777b.png'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 30000,
    hscode: '33.333.333',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '88888',
    name: 'Otro producto bueno',
    description: 'Material: 320 gsm, Medidas60 x 120 cms, Logo Impreso 3 modelos a elegir, Envase: bolsa plástica',
    images: ['/images/88888a.png', '/images/88888b.png', 'http://photos01.wisgoon.com/media/pin/photos01/images/o/2016/5/4/12/500x332_1462349579810857.jpeg'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
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
    name: 'Wow que buen producto',
    description: 'Tamaño del producto: 10 cms de alto, Material: plush, Certificación EN71, FAMA, Packaging: Bolsa plástica individual, Plazo de entrega 90 días',
    images: ['/images/99999a.png', '/images/99999b.png', 'http://cdns2.freepik.com/foto-gratis/_3296386.jpg'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 50000,
    hscode: '8.888.888',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '55555',
    name: 'Mochilas 2',
    description: 'Tamaño de los productos: 30 cms de alto, Material: plastico, Certificación EN71, Packaging. Bolsa plástica individual, Plazo de entrega 90 días.',
    images: ['/images/77777a.png', '/images/77777b.png', 'https://alicarnold.files.wordpress.com/2009/11/new-product.jpg'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 33000,
    hscode: '33.333.333',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: '44444',
    name: 'Gran producto Gran',
    description: 'Material: 320 gsm, Medidas60 x 120 cms, Logo Impreso 3 modelos a elegir, Envase: bolsa plástica',
    images: ['/images/88888a.png', 'http://th15.st.depositphotos.com/2036511/3033/v/450/depositphotos_30332675-stock-illustration-big-red-new-product-button.jpg', '/images/88888b.png'],
    price: 4.88,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 4.88
    },
    {
      tramo: 2,
      qty: 50000,
      price: 3.68
    },
    {
      tramo: 3,
      qty: 100000,
      price: 3.48
    }],
    moq: 25000,
    hscode: '44.4444.44',
    origin: 'China',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  })
];

// remove all existing products
// Products.remove({})
Product.remove(function (err, products) {
  if (err) return console.error(err);
})

// populate products array to mongodb
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
