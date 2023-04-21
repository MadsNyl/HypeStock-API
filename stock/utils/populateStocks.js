const pool = require("../../connection.js");
const Tracking = require("../models/tracking.model.js");

const populateStocksWithTracking = async (stocks) => {
    for (let i = 0; i < stocks.length; i++) {
        const trackings = await pool.query(Tracking.getTrackingsByDays(stocks[i].symbol, 30));
        const mentionsTracking = await pool.query(Tracking.getMentionsCountByDays(stocks[i].symbol, 30));
        stocks[i].trackings = trackings[0];
        stocks[i].mentions = mentionsTracking[0];
    }
}

module.exports = {
    populateStocksWithTracking
}