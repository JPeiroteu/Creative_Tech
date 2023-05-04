const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.authentication(email, password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // session setup
  req.session.user = user;
  res.redirect("/");
  console.log("User logged in");
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("User logged out");
  });
  res.redirect("/");
});

module.exports = router;
