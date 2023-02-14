class Article {

    static getCount() {
        return `
            SELECT COUNT(*) as article_count
            FROM article
        `
    }

    static getLatestArticles(limit) {
        return `
            SELECT *
            FROM article
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getArticlesRelatedToStock(stock, limit) {
        return `
            SELECT symbol, article.*
            FROM article_stock
            INNER JOIN article_stock.id ON article.id
            WHERE symbol = "${stock}"
            LIMIT ${limit}
        `
    }

    static getArticle(id) {
        return `
            SELECT *
            FROM article
            WHERE id = ${id} 
        `
    }

    static getRelatedStocksToArticle(id) {
        return `
            SELECT symbol
            FROM article_stock
            WHERE article_id = ${id} 
        `
    }

}

module.exports = Article;