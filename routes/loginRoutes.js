const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
