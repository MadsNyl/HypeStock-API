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

    static getArticlesWithMostRelatedStocks(limit) {
        return `
            SELECT article.*, COUNT(article_stock.article_id) as stock_count
            FROM article
            INNER JOIN article_stock
            ON article.id = article_stock.article_id
            GROUP BY article_stock.article_id
            ORDER BY stock_count DESC
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

    static getLatestArticlesByProvider(provider, limit) {
        return `
            SELECT *
            FROM article
            WHERE provider = "${provider}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getArticleWithMostRelatedStocksByProvider(provider, limit) {
        return `
            SELECT article.*, COUNT(article_stock.article_id) as stock_count
            FROM article
            INNER JOIN article_stock
            ON article.id = article_stock.article_id
            WHERE provider = "${provider}"
            GROUP BY article_stock.article_id
            ORDER BY stock_count DESC
            LIMIT ${limit}
        `
    }

    static getArticleCountByStockAndDays(stock, days) {
        return `
            SELECT COUNT(*) as article_count
            FROM article
            INNER JOIN
            article_stock ON article.id = article_stock.article_id
            WHERE symbol = "${stock}"
            AND article.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    static getArticleCountByStockAndProviderAndDays(stock, days, provider) {
        return `
            SELECT COUNT(*) as article_count
            FROM article
            INNER JOIN
            article_stock ON article.id = article_stock.article_id
            WHERE symbol = "${stock}"
            AND provider = "${provider}"
            AND article.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    static getMostMentionedStocksInInterval(limit, days) {
        return `
            SELECT symbol, COUNT(*) as count
            FROM article
            INNER JOIN article_stock
            ON article.id = article_stock.article_id
            WHERE LENGTH(symbol) > 2
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    }

    static getMostMentionedStocks(limit) {
        return `
            SELECT symbol, COUNT(*) as count
            FROM article
            INNER JOIN article_stock
            ON article.id = article_stock.article_id
            WHERE LENGTH(symbol) > 2
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    }

    static getArticlesByStockAndDays(stock, days, limit) {
        return `
            SELECT *
            FROM article
            INNER JOIN
            article_stock ON article.id = article_stock.article_id
            WHERE created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            AND symbol = "${stock}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

}

module.exports = Article;