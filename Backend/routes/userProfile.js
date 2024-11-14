const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const authenticateToken = require('../config/authenticateToken');
// Get user profile by emailID
router.get('/userProfile/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update user profile by emailID
router.put('/userProfile/:email', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    console.log("checking if user is updated",user);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(404).json({ success: false, error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
