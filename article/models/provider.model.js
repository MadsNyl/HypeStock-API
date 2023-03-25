class Provider {

    static getDistinctProviderCount() {
        return `
            SELECT COUNT(DISTINCT provider) as provider_count
            FROM article
        `
    }

    static getProviders() {
        return `
            SELECT DISTINCT provider
            FROM article
        `
    }

    static getStockMentionsByProviderAndDays(stock, days) {
        return `
            SELECT provider, COUNT(CASE WHEN symbol = "${stock}" THEN 1 END) as stock_count, COUNT(symbol) as total_count
            FROM article
            INNER JOIN
            article_stock ON article.id = article_stock.article_id
            WHERE created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY provider
            ORDER BY stock_count DESC
        `
    }

    static getStockMentionsByProviderAndStockAndDays(stock, days, provider) {
        return `
            SELECT provider, COUNT(CASE WHEN symbol = "${stock}" THEN 1 END) as stock_count, COUNT(symbol) as total_count
            FROM article
            INNER JOIN
            article_stock ON article.id = article_stock.article_id
            WHERE created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            AND provider = "${provider}"
            ORDER BY stock_count DESC
        `
    }

}

module.exports = Provider;