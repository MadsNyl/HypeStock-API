const pool = require("../../connection.js");
const Reddit = require("../../reddit/models/reddit.model.js");
const Article = require("../../article/models/article.model.js");

const getTrendingData = async (req, res) => {

    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const topRedditLikesThisWeek = await pool.query(Reddit.getTopStocksWithMostLikesInInterval(7, limit));
        const topRedditLikesThisMonth = await pool.query(Reddit.getTopStocksWithMostLikesInInterval(30, limit));
        const topRedditLikesTotal = await pool.query(Reddit.getTopStocksWithMostLikes(limit));
        const topRedditMentionsThisWeek = await pool.query(Reddit.getMostMentionedStocksInInterval(limit, 7));
        const topRedditMentionsThisMonth = await pool.query(Reddit.getMostMentionedStocksInInterval(limit, 30));
        const topRedditMentionsTotal = await pool.query(Reddit.getMostMentionedStocks(limit));
        const topArticlementionsThisWeek = await pool.query(Article.getMostMentionedStocksInInterval(limit, 7));
        const topArticlementionsThisMonth = await pool.query(Article.getMostMentionedStocksInInterval(limit, 30));
        const topArticlementionsTotal = await pool.query(Article.getMostMentionedStocks(limit));


        return res.send({
            week: {
                reddit_likes: topRedditLikesThisWeek[0],
                reddit_mentions: topRedditMentionsThisWeek[0],
                article_mentions: topArticlementionsThisWeek[0]
            },
            month: {
                reddit_likes: topRedditLikesThisMonth[0],
                reddit_mentions: topRedditMentionsThisMonth[0],
                article_mentions: topArticlementionsThisMonth[0]
            },
            total: {
                reddit_likes: topRedditLikesTotal[0],
                reddit_mentions: topRedditMentionsTotal[0],
                article_mentions: topArticlementionsTotal[0]
            }
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

}


module.exports = {
    getTrendingData
}