const Stock = require("../models/stock.model.js");

const getAllStocks = (req, res) => Stock.getAll(req, res);

const getStock = (req, res) => Stock.getOne(req, res);

const search = (req, res) => Stock.search(req, res);

const getTopMentions = (req, res) => Stock.getTopMentions(req, res);

const getTopScore = (req, res) => Stock.getTopScore(req, res);

const getTrending = (req, res) => Stock.getTrending(req, res);

const getRandom = (req, res) => Stock.getRandom(req, res);

const getCount = (req, res) => Stock.getCount(req, res);


module.exports = {
    getAllStocks,
    getStock,
    search,
    getTopMentions,
    getTopScore,
    getTrending,
    getRandom,
    getCount
}