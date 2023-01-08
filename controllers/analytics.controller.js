const pool = require("../connection.js");
const Analytics = require("../models/analytics.model.js");

// get top ten winners of latest added date
const getWinners = async (req, res) => {
    try {
        const results = await pool.query(Analytics.getWinners());

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
        const results = await pool.query(Analytics.getLosers());

        if (!results[0].length) return res.sendStatus(404);

        return res.send(results[0]);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


module.exports = {
    getWinners,
    getLosers
}