const pool = require("../connection.js");
const Trackings = require("../models/trackings.model.js");

// get top ten winners and losers of latest added date
const getResults = async (req, res) => {
    try {
        const data = {};

        const winners = await pool.query(Trackings.getWinners());

        if (!winners[0].length) data.winners = [];
        else data.winners = winners[0];

        const losers = await pool.query(Trackings.getLosers());

        if (!losers[0].length) data.losers = [];
        else data.losers = losers[0];

        return res.send(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

// get top ten winners of latest added date
const getWinners = async (req, res) => {
    try {
        const results = await pool.query(Trackings.getWinners());

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

// get top ten losers of latest added date
const getLosers = async (req, res) => {
    try {
        const results = await pool.query(Trackings.getLosers());

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


module.exports = {
    getWinners,
    getLosers,
    getResults
}