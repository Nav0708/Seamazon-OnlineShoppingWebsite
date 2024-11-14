const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const authenticateToken = require('../config/authenticateToken.js');

router.get('/home', authenticateToken, async (req, res) => {
  try {
    const products = await Product.find({});
    console.log("you are in home page",products);
    res.json({ success: true,  products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
