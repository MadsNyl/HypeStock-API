const express = require("express");
const { getBaseData, getTickers } = require("./controllers/stats.controller.js");
const router = express.Router();

router
    .get("/", getBaseData)
    .get("/tickers", getTickers)

module.exports = router;