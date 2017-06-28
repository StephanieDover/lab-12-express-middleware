'use strict';

const { Router } = require('express');
const jsonParser = require('body-parser').json();
const Product = require('../model/product.js');

let productRouter = (module.exports = new Router());

productRouter.post('/api/products', jsonParser, (req, res, next) => {
  console.log('req.body', req.body);
  new Product(req.body).save().then(product => res.json(product)).catch(next);
});

productRouter.get('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
});

productRouter.put('/api/products/:id', jsonParser, (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(product => res.json(product))
    .catch(next);
});

productRouter.delete('/api/products/:id', (req, res, next) => {
  Product.findByIdAndRemove(req.params.id)
    .then(res.sendStatus(204))
    .catch(next);
});
