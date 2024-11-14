const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number},
  quantity: { type: Number},
  imageUrl: { type: String },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
