const Article = require("../../article/models/article.model.js");
const Provider = require("../../article/models/provider.model.js");
const pool = require("../../connection.js");
const Reddit = require("../../reddit/models/reddit.model.js");
const Subreddit = require("../../reddit/models/subreddit.model.js");
const Stock = require("../models/stock.model.js");
const Tracking = require("../models/tracking.model.js");
const { pctChange } = require("../utils/pctChange.js");
const { populateStocksWithTracking } = require("../utils/populateStocks.js");


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

        const priceChangeLastMonth = pctChange(trackings[0].at(-1).last_price, trackings[0][0].last_price);
        const priceChangeLastDay = pctChange(trackings[0].at(-1).last_price, trackings[0].at(-2).last_price)
        const mentionChangeLastMonth = pctChange(mentionsTracking[0].at(-1).count, mentionsTracking[0][0].count);
        const mentionChangeLastDay = pctChange(mentionsTracking[0].at(-1).count, mentionsTracking[0].at(-2).count);

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
                article: articleTrackings[0],
                price_change_month: priceChangeLastMonth.toFixed(2),
                price_change_day: priceChangeLastDay.toFixed(2),
                mention_change_month: mentionChangeLastMonth.toFixed(2),
                mention_change_day: mentionChangeLastDay.toFixed(2), 
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

const getFavorites = async (req, res) => {
    const { stocks } = req.query;

    if (!stocks) return res.sendStatus(400);

    try {
        const stockList = stocks.split(",");

        const results = await pool.query(Stock.getStocks(stockList));

        await populateStocksWithTracking(results[0]);

        return res.send({
            stocks: results[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getStocks = async (req, res) => {
    const { stocks } = req.query;

    if (!stocks) return res.sendStatus(400);

    try {
        const stockList = stocks.split(",");
        const results = await pool.query(Stock.getStocks(stockList));
        const redditStats = await pool.query(Reddit.getCommentCountAndLikesByStocksInInterval(stockList, 30));
        const articleStats = await pool.query(Article.getArticleCountByStocksAndDays(stockList, 30));

        results[0][0].comments = {
            count: redditStats[0][0].count,
            likes: parseInt(redditStats[0][0].likes)
        }
        results[0][0].articles = {
            count: articleStats[0][0].count
        }
        results[0][1].comments = {
            count: redditStats[0][1].count,
            likes: parseInt(redditStats[0][1].likes)
        }
        results[0][1].articles = {
            count: articleStats[0][1].count
        }

        await populateStocksWithTracking(results[0]);

        return res.send(results[0]);

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    getBasedata,
    getStockSearch,
    getFavorites,
    getStocks
}