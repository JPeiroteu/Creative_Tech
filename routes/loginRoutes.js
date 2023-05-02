const express = require('express');
const router = express.Router();
const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
