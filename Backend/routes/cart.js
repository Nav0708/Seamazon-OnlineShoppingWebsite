const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const upload = require('../config/multerconfig'); 
const authenticateToken = require('../config/authenticateToken.js');


// Serve static files from the "uploads" directory
router.use('/uploads', express.static('uploads'));

// Get product quantity by productId
router.get('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (product) {
      res.json({ success: true, quantity: product.quantity });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product quantity
router.patch('/product/:productId/:quantity', async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = parseInt(req.params.quantity);
    console.log(productId);

    const product = await Product.findByIdAndUpdate( productId, { quantity }, { new: true });

    if (product) {
      res.json({ success: true, quantity: product.quantity });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get cart items by userEmail
router.get('/cart/:email', async (req, res) => {
  try {
    const userEmail = req.params.email;
    console.log(userEmail)
    const cartItems = await Cart.find({ userId: userEmail }).populate('productId');

    res.json({ success: true, cartData: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


router.post('/cart', authenticateToken, async (req, res) => {
  const { productId, name, price } = req.body;
    const userId = req.user.email;
    console.log(userId);
    try {
      const existingCartItem = await Cart.findOne({ userId, productId });

      if (existingCartItem) {
        // If the product exists, update the quantity
        existingCartItem.quantity = (existingCartItem.quantity || 1) + 1; 
        await existingCartItem.save();
        console.log('Product quantity updated in cart successfully');
        res.status(200).json({ success: true, message: 'Product quantity updated in cart' });
      } 
      else {
          const newCartItem = new Cart({
              userId,
              productId,
              name,
              price,
              quantity: 1
          });
          await newCartItem.save();
          console.log('Product added to cart successfully');
          res.status(200).json({ success: true, message: 'Product added to cart' });
      }
  } catch (error) {
      console.error('Error saving cart item:', error.message);
      res.status(500).json({ success: false, message: error.message });
  }
});


// Delete item from cart
router.delete('/cart/:userEmail/:productId', async (req, res) => {
  try {
    const userEmail = req.params.userEmail;
    const productId = req.params.productId;

    const result = await Cart.deleteOne({ userId: userEmail, productId });

    if (result.deletedCount > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Cart item not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



// Export the router
module.exports = router;
