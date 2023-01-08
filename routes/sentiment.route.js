const express = require("express");
const { getLatest, getTopPositive } = require("../controllers/sentiment.controller.js");
const { validateKey } = require("../middleware/apiKey.js");
const router = express.Router();

// router.use(validateKey);

router
    .get("/latest", getLatest)
    .get("/positive", getTopPositive);

module.exports = router;