const express = require("express");
const { getLatest } = require("../controllers/sentiment.controller.js");
const { validateKey } = require("../middleware/apiKey.js");
const router = express.Router();

router.use(validateKey);

router.get("/all", getLatest);

module.exports = router;