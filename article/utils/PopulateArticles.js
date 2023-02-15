const Article = require("../models/article.model.js");
const pool = require("../../connection.js");

const populateArticlesWithRelatedStocks = async (articles) => {
    for (let i = 0; i < articles[0].length; i++) {
        let relatedStocks = await pool.query(Article.getRelatedStocksToArticle(articles[0][i].id));
        relatedStocks = relatedStocks[0].map(item => item.symbol);
        articles[0][i].related_stocks = relatedStocks;
    }
}


module.exports = {
    populateArticlesWithRelatedStocks
}