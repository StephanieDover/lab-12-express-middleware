'use strict';

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: { type: String, required: true },
  productId: { type: String, required: true },
  dateIn: { type: Date, required: false },
  isInStock: { type: Boolean, required: false }
});

module.exports = mongoose.model('product', productSchema);
