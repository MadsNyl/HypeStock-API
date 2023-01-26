const pool = require("../connection.js");
const Stats = require("../models/stats.model.js");

// get base data for stats page
const getBasedata = async (req, res) => {
    const { days } = req.query;

    if (!days) return res.sendStatus(400);

    try {
        const data = {};

        const stockCount = await pool.query(Stats.getStocksCount());

        data.stocks_count = stockCount[0][0].stocks_count;

        const commentCount = await pool.query(Stats.getCommentsCount());

        data.comments_count = commentCount[0][0].comments_count;

        const tweetCount = await pool.query(Stats.getTweetsCount());

        data.tweets_count = tweetCount[0][0].tweets_count;

        const userCount = await pool.query(Stats.getTwitterUsersCount());

        data.users_count = userCount[0][0].users_count;

        const subredditCount = await pool.query(Stats.getSubredditsCount());

        data.subreddits_count = subredditCount[0][0].subreddits_count;

        const topLikeRedditStock = await pool.query(Stats.getTopLikedRedditStock(days));

        data.top_liked_reddit_stock = topLikeRedditStock[0][0];

        const topLikedTwitterStock = await pool.query(Stats.getTopLikedTwitterStock(days));
        data.top_liked_twitter_stock = topLikedTwitterStock[0][0];

        const topLikeRedditStockComparison = await pool.query(Stats.getTopLikedRedditStockComparison(days, topLikeRedditStock[0][0].symbol));
        data.top_liked_reddit_comparison = topLikeRedditStockComparison[0][0];



        return res.send(data);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}


module.exports = {
    getBasedata
}