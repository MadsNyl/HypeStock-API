const pool = require("../../connection.js");
const Article = require("../models/article.model.js");
const Provider = require("../models/provider.model.js");


const getArticle = async (req, res) => {
    const { id } = req.query;

    if (!id) return res.sendStatus(400);

    try {
        const articleData = await pool.query(Article.getArticle(id));
        let stocks = await pool.query(Article.getRelatedStocksToArticle(id));
        stocks = stocks[0].map((item) => item.symbol)

        return res.send({
            related_stocks: stocks,
            article: articleData[0][0]
        });
    } catch(e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getBaseData = async (req, res) => {

    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const article_count = await pool.query(Article.getCount());
        const provider_count = await pool.query(Provider.getDistinctProviderCount())
        let providers = await pool.query(Provider.getProviders());
        providers = providers[0].map((item) => item.provider);
        const articles = await pool.query(Article.getLatestArticles(limit))

        for (let i = 0; i < articles[0].length; i++) {
            let relatedStocks = await pool.query(Article.getRelatedStocksToArticle(articles[0][i].id));
            relatedStocks = relatedStocks[0].map(item => item.symbol);
            articles[0][i].related_stocks = relatedStocks;
        }

        return res.send({
            article_count: article_count[0][0].article_count,
            provider_count: provider_count[0][0].provider_count,
            providers: providers,
            articles: articles[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

module.exports = {
    getArticle,
    getBaseData
}