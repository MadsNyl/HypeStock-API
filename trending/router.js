const express = require("express");
const { getTrendingData } = require("./controllers/trending.controller.js");

const router = express.Router();

router
    .get("/", getTrendingData)

module.exports = router;