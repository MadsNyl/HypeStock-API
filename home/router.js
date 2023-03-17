const express = require("express");
const { getBaseData } = require("./controllers/home.controller.js");

const router = express.Router();

router
    .get("/", getBaseData)

module.exports = router;