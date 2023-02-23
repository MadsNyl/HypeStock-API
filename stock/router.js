const express = require("express");
const { getBasedata, getStockSearch } = require("./controllers/stock.controller");
const router = express.Router();

router
    .get("/", getBasedata)
    .get("/search", getStockSearch)

module.exports = router;