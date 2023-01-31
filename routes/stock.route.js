const express = require("express");
const { getBaseData } = require("../controllers/stock.controller.js");
const router = express.Router();

// router.use(validateKey);

router
    .get("/", getBaseData)

module.exports = router;