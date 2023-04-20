const express = require("express");
const { getBasedata, getStockSearch, getFavorites, getStocks } = require("./controllers/stock.controller");
const router = express.Router();

router
    .get("/", getBasedata)
    .get("/search", getStockSearch)
    .get("/stocks", getFavorites)
    .get("/compare", getStocks)

module.exports = router;