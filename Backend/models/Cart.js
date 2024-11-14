const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  name: { type: String},
  price: { type: Number},
  quantity: { type: Number},
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;