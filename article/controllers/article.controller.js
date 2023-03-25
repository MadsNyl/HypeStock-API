const pool = require("../../connection.js");
const Article = require("../models/article.model.js");
const Provider = require("../models/provider.model.js");
const { populateArticlesWithRelatedStocks } = require("../utils/PopulateArticles.js");


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

        await populateArticlesWithRelatedStocks(articles);

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

const getLatestArticles = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const articles = await pool.query(Article.getLatestArticles(limit));

        await populateArticlesWithRelatedStocks(articles);

        return res.send({
            articles: articles[0]
        });
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getArticlesByProvider = async (req, res) => {
    const { provider, limit } = req.query;

    if (!provider || !limit) return res.sendStatus(400);

    try {
        const articles = await pool.query(Article.getLatestArticlesByProvider(provider, limit));

        await populateArticlesWithRelatedStocks(articles);

        return res.send({
            articles: articles[0]
        })

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getArticlesWithMostRelatedStocks = async (req, res) => {
    const { limit } = req.query;

    if (!limit) return res.sendStatus(400);

    try {
        const articles = await pool.query(Article.getArticlesWithMostRelatedStocks(limit));

        await populateArticlesWithRelatedStocks(articles);

        return res.send({
            articles: articles[0]
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getArticlesWithMostRelatedStocksByProvider = async (req, res) => {
    const { provider, limit } = req.query;

    if (!provider || !limit) return res.sendStatus(400);

    try {
        const articles = await pool.query(Article.getArticleWithMostRelatedStocksByProvider(provider, limit));

        await populateArticlesWithRelatedStocks(articles);

        return res.send({
            articles: articles[0]
        })
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
}

const getStockArticles = async (req, res) => {

    const {stock, days, limit, provider} = req.query;

    if (!stock || !days || !limit || !provider) return res.sendStatus(400);

    try {
        const articleTrackings = await pool.query(Provider.getStockMentionsByProviderAndStockAndDays(stock, days, provider));
        const articles = await pool.query(Article.getArticlesByStockAndDays(stock, days, limit));
        const count = await pool.query(Article.getArticleCountByStockAndProviderAndDays(stock, days, provider));

        return res.send({
            stats: articleTrackings[0][0],
            articles: articles[0],
            count: count[0][0].article_count
        });

    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }

}


module.exports = {
    getArticle,
    getBaseData,
    getLatestArticles,
    getArticlesByProvider,
    getArticlesWithMostRelatedStocks,
    getArticlesWithMostRelatedStocksByProvider,
    getStockArticles
}