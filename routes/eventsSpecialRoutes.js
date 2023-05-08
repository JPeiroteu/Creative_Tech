const express = require("express");
const router = express.Router();
const SpecialEvent = require("../models/eventsModel").SpecialEvent;

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all events");
    let result = await SpecialEvent.allSpecialEvents();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;