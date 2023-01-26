const pool = require("../connection.js");
const Stats = require("../models/stats.model.js");

// get base data for stats page
const getBasedata = async (req, res) => {
    try {
        const data = {};

        const commentCount = await pool.query(Stats.getCommentsCount());

        if (!commentCount[0].length) data.comments_count = [];
        else data.comments_count = commentCount[0][0].comments_count;

        const tweetCount = await pool.query(Stats.getTweetsCount());

        if (!tweetCount[0].length) data.tweets_count = [];
        else data.tweets_count = tweetCount[0][0].tweets_count;

        const userCount = await pool.query(Stats.getTwitterUsersCount());

        if (!userCount[0].length) data.users_count = [];
        else data.users_count = userCount[0][0].users_count;

        const subredditCount = await pool.query(Stats.getSubredditsCount());

        if (!subredditCount[0].length) data.subreddits_count = [];
        else data.subreddits_count = subredditCount[0][0].subreddits_count;

        return res.send(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


module.exports = {
    getBasedata
}