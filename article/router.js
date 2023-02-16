const express = require("express");
const { getArticle, getBaseData, getArticlesByProvider, getArticlesWithMostRelatedStocks, getArticlesWithMostRelatedStocksByProvider, getLatestArticles } = require("./controllers/article.controller.js");
const router = express.Router();

router
    .get("/article", getArticle)
    .get("/latest", getLatestArticles)
    .get("/base_data", getBaseData)
    .get("/by_provider", getArticlesByProvider)
    .get("/most_stocks", getArticlesWithMostRelatedStocks)
    .get("/most_stocks_by_provider", getArticlesWithMostRelatedStocksByProvider)

module.exports = router;