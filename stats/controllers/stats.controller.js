const Article = require("../../article/models/article.model.js");
const pool = require("../../connection.js");
const Reddit = require("../../reddit/models/reddit.model.js");
const Stock = require("../../stock/models/stock.model.js");

const getBaseData = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const stockCount = await pool.query(Stock.getStockCount());
        const commentCount = await pool.query(Reddit.getCommentCount());
        const articleCount = await pool.query(Article.getCount());
        const tickers = await pool.query(Article.getMostMentionedStocksInInterval(limit, 7));

        return res.send({
            stock_count: stockCount[0][0].count,
            comment_count: commentCount[0][0].comment_count,
            article_count : articleCount[0][0].article_count,
            tickers: {
                tickers: tickers[0],
                total: tickers[0].reduce((total, current) => { return total + current.count }, 0)
            }
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getTickers = async (req, res) => {
    const { limit, media, filter, days } = req.query;

    if (!limit || !media || !filter || !days) return res.sendStatus(400);

    try {

        let nuDays;

        switch (days) {
            case "24h":
                nuDays = 1;
                break;
            case "7d":
                nuDays = 7;
                break;
            case "30d":
                nuDays = 30;
                break;                
        }

        switch (media) {
            case "articles":
                let articleTickers;
                
                days === "total"
                    ? articleTickers = await pool.query(Article.getMostMentionedStocks(limit))
                    : articleTickers = await pool.query(Article.getMostMentionedStocksInInterval(limit, nuDays))
                
                return res.send({
                    tickers: articleTickers[0],
                    total: articleTickers[0].reduce((total, current) => { return total + current.count }, 0)
                });
            case "reddit":
                let redditTickers;
                if (filter === "upvotes") {
                    days === "total"
                        ? redditTickers = await pool.query(Reddit.getTopStocksWithMostLikes(limit))
                        : redditTickers = await pool.query(Reddit.getTopStocksWithMostLikesInInterval(nuDays, limit))
                }
                else {
                    days === "total"
                        ? redditTickers = await pool.query(Reddit.getMostMentionedStocks(limit))
                        : redditTickers = await pool.query(Reddit.getMostMentionedStocksInInterval(limit, nuDays))
                }
                return res.send({
                    tickers: redditTickers[0],
                    total: redditTickers[0].reduce((total, current) => { return parseInt(total) + parseInt(current.count) }, 0)
                });
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    getBaseData,
    getTickers
}