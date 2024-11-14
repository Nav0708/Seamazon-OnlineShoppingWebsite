const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage });

// Get product quantity by product ID
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

// Update product quantity by product ID
router.patch('/product/:productId/:quantity', async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log(req.params.productId);
    const quantity = parseInt(req.params.quantity);

    const product = await Product.findByIdAndUpdate(
      productId,
      { quantity: quantity },
      { new: true }
    );

    if (product) {
      res.json({ success: true, quantity: product.quantity });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add a new product
router.post('/product', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, quantity } = req.body;
    const imageUrl = '\\' + req.file.path;
    const newProduct = new Product({ name, description, price, quantity, imageUrl });
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res.json({ success: true, docId: savedProduct._id });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete a product by product ID
router.delete('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (deletedProduct) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update product details by product ID
router.patch('/product/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (updatedProduct) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
