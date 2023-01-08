const Sentiment = require("../models/sentiment.model.js");
const pool = require("../connection.js");

// get latest sentiment of given stock
const getLatest = async (req, res) => {
    const { symbol, limit } = req.query;
    
    if (!symbol || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Sentiment.getLatest(symbol, limit));

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
};

// get most positive sentiment of last week
const getTopPositive = async (req, res) => {   
    try {
        const results = await pool.query(Sentiment.getTopPositive());

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getLatest,
    getTopPositive
}