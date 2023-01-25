const express = require("express");
const { getWinners, getLosers, getResults } = require("../controllers/trackings.controller.js");
const router = express.Router();

router
    .get("/winners", getWinners)
    .get("/losers", getLosers)
    .get("/results", getResults);

module.exports = router;