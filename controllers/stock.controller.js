const pool = require("../connection.js");
const Stock = require("../models/stock.model.js");


// get count of all stocks
const getCount = async (req, res) => {
    try {   
        const results = await pool.query(Stock.getCount());

        if (!results[0].length) return res.status(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// get all stocks
const getAllStocks = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Stock.getAll(limit));

        if (!results[0].length) return res.status(404);

        return res.send(results[0])
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
    
};

// get one stock based on symbol, with sentiments and trade analytics
const getStock = async (req, res) => {
    const { symbol, sentiment_limit, trades_limit } = req.query;
    
    if (!symbol || !sentiment_limit || !trades_limit) return res.sendStatus(400);

    try {
        const data = {};

        // get base info
        const base = await pool.query(Stock.getOne(symbol));

        if (!base[0].length) return res.sendStatus(404);

        data.base = base[0];

        // get sentiments
        const sentiments = await pool.query(Stock.getSentimentsOfOne(symbol, sentiment_limit));

        if (!sentiments[0].length) data.sentiments = [];
        else data.sentiments = sentiments[0];

        // get trades
        const trades = await pool.query(Stock.getTradesOfOne(symbol, trades_limit));

        if (!trades[0].length) data.trades = [];
        else data.trades = trades[0];

        return res.send(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// search for stock
const search = async (req, res) => {
    const { search } = req.query;

    if (!search) return res.sendStatus(400);

    try {
        const results = await pool.query(Stock.search(search));

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// stock with most occurences
const getTopMentions = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const data = {};

        // get base info
        const base = await pool.query(Stock.getTopMentions());

        if (!base[0].length) return res.sendStatus(404);

        data.base = base[0];

        // get trades
        const symbol = base[0][0].symbol;
        const trades = await pool.query(Stock.getTradesOfOne(symbol, limit));
        
        if (!trades[0].length) data.trades = [];
        else data.trades = trades[0];

        return res.send(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// stock with at least 100 mentions and highest average sentiment score
const getTopScore = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const data = {};

        // get base info
        const base = await pool.query(Stock.getTopScore());

        if (!base[0].length) return res.sendStatus(404);

        data.base = base[0];

        // get trades
        const symbol = base[0][0].symbol;
        const trades = await pool.query(Stock.getTradesOfOne(symbol, limit));
        
        if (!trades[0].length) data.trades = [];
        else data.trades = trades[0];

        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// most trending stock based on last 1000 sentiments
const getTrending = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const data = {};

        // get base info
        const base = await pool.query(Stock.getTrending());

        if (!base[0].length) return res.sendStatus(404);

        data.base = base[0];

        // get trades
        const symbol = base[0][0].symbol;
        const trades = await pool.query(Stock.getTradesOfOne(symbol, limit));
        
        if (!trades[0].length) data.trades = [];
        else data.trades = trades[0];

        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};


// get random stock
const getRandom = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const data = {};

        // get base info
        const base = await pool.query(Stock.getRandom());

        if (!base[0].length) return res.sendStatus(404);

        data.base = base[0];

        // get trades
        const symbol = base[0][0].symbol;
        const trades = await pool.query(Stock.getTradesOfOne(symbol, limit));
        
        if (!trades[0].length) data.trades = [];
        else data.trades = trades[0];

        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

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