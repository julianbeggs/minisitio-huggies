var mongoose = require('mongoose');
var Product = require('../models/product');
mongoose.connect('mongodb://localhost:27017/shopping')

var products = [
  new Product({
    sku: 'BHT-05',
    name: 'Juguete Cascabel',
    description: 'Poliester+PP+Algodón	14.5*8cm	Bolsa Plástica',
    images: ['/images/BHT-05-img1.png', '/images/BHT-05-img2.png'],
    price: 2.49,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 2.49
    },
    {
      tramo: 2,
      qty: 50000,
      price: 2.34
    },
    {
      tramo: 3,
      qty: 100000,
      price: 2.17
    },
    {
      tramo: 4,
      qty: 200000,
      price: 1.99
    }
  ],
    moq: 20000,
    hscode: '',
    origin: '',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: 'BHT-01',
    name: 'Juguete Colgante',
    description: 'Poliester+PP+Algodón	25cm	Bolsa Plástica',
    images: ['/images/BHT-01-img1.png'],
    price: 2.64,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 2.64
    },
    {
      tramo: 2,
      qty: 50000,
      price: 2.33
    },
    {
      tramo: 3,
      qty: 100000,
      price: 2.29
    },
    {
      tramo: 4,
      qty: 200000,
      price: 1.64
    }
  ],
    moq: 20000,
    hscode: '',
    origin: '',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: 'BBS-01',
    name: 'Botines',
    description: 'Algodón+PP	12cm	Bolsa Plástica',
    images: ['/images/BBS-01-img1.png', '/images/BBS-01-img2.png'],
    price: 2.91,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 2.91
    },
    {
      tramo: 2,
      qty: 50000,
      price: 2.69
    },
    {
      tramo: 3,
      qty: 100000,
      price: 2.29
    },
    {
      tramo: 4,
      qty: 200000,
      price: 2.03
    }
  ],
    moq: 20000,
    hscode: '',
    origin: '',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: 'BBS-02',
    name: 'Baberos',
    description: 'Algodón	28x21 cms	Bolsa Plástica',
    images: ['/images/BBS-02-img1.png'],
    price: 1.99,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 1.99
    },
    {
      tramo: 2,
      qty: 50000,
      price: 1.76
    },
    {
      tramo: 3,
      qty: 100000,
      price: 1.56
    },
    {
      tramo: 4,
      qty: 200000,
      price: 1.26
    }
  ],
    moq: 20000,
    hscode: '',
    origin: '',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
  new Product({
    sku: 'BBS-03',
    name: 'Vasos entrenadores',
    description: 'PP	280 ML	Bolsa Plástica',
    images: ['/images/BBS-03-img1.png'],
    price: 2.26,
    prices: [{
      tramo: 1,
      qty: 20000,
      price: 2.26
    },
    {
      tramo: 2,
      qty: 50000,
      price: 1.79
    },
    {
      tramo: 3,
      qty: 100000,
      price: 1.61
    },
    {
      tramo: 4,
      qty: 200000,
      price: 1.44
    }
  ],
    moq: 20000,
    hscode: '',
    origin: '',
    incoterms: 'CIF',
    provider: 'latam@bigla.cl'
  }),
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
