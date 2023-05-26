const express = require("express");
const router = express.Router();
const News = require("../models/newsModel");

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all news");
    let result = await News.getAll();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
