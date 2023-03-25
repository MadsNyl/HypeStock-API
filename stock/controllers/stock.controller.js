const Article = require("../../article/models/article.model.js");
const Provider = require("../../article/models/provider.model.js");
const pool = require("../../connection.js");
const Reddit = require("../../reddit/models/reddit.model.js");
const Subreddit = require("../../reddit/models/subreddit.model.js");
const Stock = require("../models/stock.model.js");
const Tracking = require("../models/tracking.model.js");


const getBasedata = async (req, res) => {
    const { stock, days } = req.query;

    if (!stock || !days) return res.sendStatus(400);

    try {
        const stockInfo = await pool.query(Stock.getStockInfo(stock));
        const subreddits = await pool.query(Subreddit.getStockMentionsBySubredditAndDays(stock, days));
        const providers = await pool.query(Provider.getStockMentionsByProviderAndDays(stock, days));
        const commentStats = await pool.query(Reddit.getCommentLikesAndCountByStockAndDays(stock, days));
        const prevCommentStats = await pool.query(Reddit.getCommentLikesAndCountByStockAndInterval(stock, days));
        const articleCount = await pool.query(Article.getArticleCountByStockAndDays(stock, days));
        const trackings = await pool.query(Tracking.getTrackingsByDays(stock, days));
        const trackingStart = await pool.query(Tracking.getFirstTracking(stock));
        const redditTrackings = await pool.query(Tracking.getRedditTrackingsByDays(stock, days));
        const redditLikes = await pool.query(Tracking.getRedditLikesByDays(stock, days));
        const articleTrackings = await pool.query(Tracking.getArticleTrackingsByDays(stock, days));
        const redditMentions = await pool.query(Reddit.getMentionsByStockAndDays(stock, days));
        const prevRedditMentions = await pool.query(Reddit.getMentionsByStockAndInterval(stock, days));
        const mentionsTracking = await pool.query(Tracking.getMentionsCountByDays(stock, days));


        // increase of reddit likes
        // increase of mentions in reddit
        // increase of mentions in articles

        return res.send({
            stock_info: stockInfo[0][0],
            subreddits: subreddits[0],
            providers: providers[0],
            comment_info: commentStats[0][0],
            prev_comment_info: prevCommentStats[0][0],
            comment_mentions: redditMentions[0][0],
            prev_comment_mentions: prevRedditMentions[0][0],
            article_info: articleCount[0][0],      
            tracking_info: {
                first_tracking: trackingStart[0][0],
                trackings: trackings[0],
                mentions: mentionsTracking[0],
                reddit: redditTrackings[0],
                reddit_likes: redditLikes[0],
                article: articleTrackings[0]
            }
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getStockSearch = async (req, res) => {
    const { stock, limit } = req.query;

    if (!stock || !limit) return res.sendStatus(400);

    try {
        const stocks = await pool.query(Stock.getStockSearch(stock, limit));

        return res.send({
            stocks: stocks[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    getBasedata,
    getStockSearch
}