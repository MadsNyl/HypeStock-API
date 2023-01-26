const express = require("express");
const { getBasedata } = require("../controllers/stats.controller.js");
const router = express.Router();

router
    .get("/", getBasedata)

module.exports = router;