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

        subreddits = subreddits[0].map(item => item.subreddit);

        return res.send({
            subreddit_count: subredditCount[0][0].subreddit_count,
            comment_count: commentCount[0][0].comment_count,
            subreddits: subreddits,
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
    getBaseData
}