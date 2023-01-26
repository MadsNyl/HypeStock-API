const pool = require("../connection.js");
const Exchange = require("../models/exchange.model.js");

// get count of comments and stocks by given exchange
const getBaseData = async (req, res) => {
    const { exchange, limit } = req.query;
    
    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const data = {};
        
        const stockCount = await pool.query(Exchange.getStockCount(exchange));

        if (!stockCount[0].length) data.stock_count = 0;
        else data.stock_count = stockCount[0][0].stock_count;

        const commentCount = await pool.query(Exchange.getCommentCount(exchange));

        if (!commentCount[0].length) data.comment_count = 0;
        else data.comment_count = commentCount[0][0].comment_count;

        const tweetCount = await pool.query(Exchange.getTweetCount(exchange));

        if (!tweetCount[0].length) data.tweet_count = 0;
        else data.tweet_count = tweetCount[0][0].tweet_count;
        
        const comments = await pool.query(Exchange.getTopComments(exchange, limit));

        data.comments = comments[0];

        return res.send(data);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get top Reddit comments
const getTopComments = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getTopComments(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get most negative Reddit comments
const getNegativeComments = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getNegativeComments(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get most negative Tweets
const getNegativeTweets = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getNegativeTweets(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get most negative Tweets
const getTopTweets = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getTopTweets(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get comments with most likes
const getTopLikesComments = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getTopLikesComments(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

// get tweets with most likes
const getTopLikesTweets = async (req, res) => {
    const { exchange, limit } = req.query;

    if (!exchange || !limit) return res.sendStatus(400);

    try {
        const results = await pool.query(Exchange.getTopLikesTweets(exchange, limit));

        if (!results[0].length) return res.sendStatus(404);
        else return res.send(results);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    } 
}


module.exports = {
    getBaseData,
    getTopComments,
    getNegativeComments,
    getTopTweets,
    getNegativeTweets,
    getTopLikesComments,
    getTopLikesTweets
}