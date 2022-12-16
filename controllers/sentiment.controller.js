const Sentiment = require("../models/sentiment.model.js");

const getLatest = (req, res) => Sentiment.getLatest(req, res);


module.exports = {
    getLatest
}