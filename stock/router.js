const express = require("express");
const { getBasedata, getStockSearch, getFavorites } = require("./controllers/stock.controller");
const router = express.Router();

router
    .get("/", getBasedata)
    .get("/search", getStockSearch)
    .get("/stocks", getFavorites)

module.exports = router;