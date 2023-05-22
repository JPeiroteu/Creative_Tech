const express = require("express");
const router = express.Router();
const ProjectModel = require("../models/projectsModel");

router.get("/", async function (req, res, next) {
  try {
    console.log("Get all projects");
    let result = await ProjectModel.getAll();
    res.status(result.status).send(result.result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;
