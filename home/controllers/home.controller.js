const pool = require("../../connection.js");
const Stock = require("../../stock/models/stock.model.js");
const Article = require("../../article/models/article.model.js");
const Reddit = require("../../reddit/models/reddit.model.js");
const { populateArticlesWithRelatedStocks } = require("../../article/utils/PopulateArticles.js");

const getBaseData = async (req, res) => {
    
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);
    
    try {
        const stockCount = await pool.query(Stock.getStockCount());
        const latestArticles = await pool.query(Article.getLatestArticles(limit));
        const latestRedditComments = await pool.query(Reddit.getLatestComments(limit));

        await populateArticlesWithRelatedStocks(latestArticles);


        return res.send({
            stock_count: stockCount[0][0].count,
            latest_articles: latestArticles[0],
            latest_reddit_comments: latestRedditComments[0]
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}


module.exports = {
    getBaseData
}