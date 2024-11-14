const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, mobileNumber } = req.body;

    const isSeamazonEmail = email.includes('@seamazon.com');
    const role = isSeamazonEmail ? 'admin' : 'user';

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    user = new User({
      email,
      password,
      firstName,
      lastName,
      address,
      mobileNumber,
      role,
    });

    // Save the user to the database
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
