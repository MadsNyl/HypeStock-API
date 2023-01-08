const express = require("express");
const { getWinners, getLosers } = require("../controllers/analytics.controller.js");
const router = express.Router();

router
    .get("/winners", getWinners)
    .get("/losers", getLosers);

module.exports = router;