const pool = require("../../connection.js");
const Reddit = require("../models/reddit.model.js");
const Subreddit = require("../models/subreddit.model.js");

const getComment = async (req, res) => {
    const { id } = req.query;

    if (!id) return res.sendStatus(400);

    try {
        const comment = await pool.query(Reddit.getComment(id));

        return res.send({
            comment: comment[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getLatestComments = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getLatestComments(limit));

        return res.send({
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getCommentByStock = async (req, res) => {
    const { stock, limit } = req.query;

    if (!stock || !limit) return res.sendStatus(400);

    try {
        const comment = await pool.query(Reddit.getCommentsByStock(stock, limit));

        return res.send({
            comment: comment[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getBaseData = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(500);

    try {
        const commentCount = await pool.query(Reddit.getCommentCount());
        let subreddits = await pool.query(Subreddit.getSubreddits());
        const subredditCount = await pool.query(Subreddit.getDistinctSubredditCount());
        const comments = await pool.query(Reddit.getLatestComments(limit));
        const topSubreddit = await pool.query(Subreddit.getTopSubredditOfTheWeek());
        const topSubredditStock = await pool.query(Subreddit.getTopStockOfSubredditOfTheWeek(topSubreddit[0][0].subreddit));

        subreddits = subreddits[0].map(item => item.subreddit);

        return res.send({
            subreddit_count: subredditCount[0][0].subreddit_count,
            comment_count: commentCount[0][0].comment_count,
            top_subreddit: {
                subreddit: topSubreddit[0][0].subreddit,
                distinct_symbols: topSubreddit[0][0].distinct_symbols,
                comment_count: topSubreddit[0][0].comment_count,
                top_stock: topSubredditStock[0][0].symbol,
                stock_count: topSubredditStock[0][0].symbol_count
            },
            subreddits: subreddits,
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getMostLikedComments = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getMostLikedComments(limit));

        return res.send({
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getMostDislikedComments = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getMostDislikedComments(limit));

        return res.send({
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getLatestCommentsBySubreddit = async (req, res) => {
    const { limit, subreddit } = req.query;

    if (!limit || !subreddit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getLatestCommentsBySubreddit(limit, subreddit));

        return res.send({
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getMostLikedCommentsBySubreddit = async (req, res) => {
    const { limit, subreddit } = req.query;

    if (!limit || !subreddit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getMostLikedCommentsBySubreddit(limit, subreddit));

        return res.send({
            comments: comments[0]
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    } 
}

const getMostDisikedCommentsBySubreddit = async (req, res) => {
    const { limit, subreddit } = req.query;

    if (!limit || !subreddit) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getMostDislikedCommentsBySubreddit(limit, subreddit));

        return res.send({
            comments: comments[0]
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    } 
}

const getCommentsByStockSearch = async (req, res) => {
    const { limit, stock } = req.query;

    if (!limit || !stock) return res.sendStatus(400);

    try {
        const comments = await pool.query(Reddit.getCommentsByStockSearch(limit, stock));

        return res.send({
            comments: comments[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}


module.exports = {
    getComment,
    getCommentByStock,
    getLatestComments,
    getBaseData,
    getMostLikedComments,
    getMostDislikedComments,
    getLatestCommentsBySubreddit,
    getMostLikedCommentsBySubreddit,
    getMostDisikedCommentsBySubreddit,
    getCommentsByStockSearch
}