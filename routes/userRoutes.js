const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.post("/login", async function (req, res, next) {
  const { email, password } = req.body;
  const user = await User.authentication(email, password);

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  // Configuração da sessão
  req.session.user = user;

  // Redirecionamento após o login
  res.redirect("/");
});

router.get("/check-login", function (req, res) {
  if (req.session.user) {
    res.json({
      isLoggedIn: true,
      user: req.session.user
    });
  } else {
    res.json({
      isLoggedIn: false,
      user: null
    });
  }
});

router.get("/logout", function (req, res) {
  req.session.destroy(function () {
    console.log("User logged out");
  });
  res.redirect("/");
});

module.exports = router;