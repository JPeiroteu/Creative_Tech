const express = require("express");
const router = express.Router();
const Project = require("../models/projectsModel");

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all projects");
    let result = await Project.getAll();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
