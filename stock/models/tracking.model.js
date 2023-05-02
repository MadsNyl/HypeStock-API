class Tracking {

    static getTrackingsByDays(stock, days) {
        return `
            SELECT *
            FROM tracking
            WHERE symbol = "${stock}"
            AND timing >= DATE(NOW() - INTERVAL ${days} DAY)
            ORDER BY timing
        `  
    }

    static getFirstTracking(stock) {
        return `
            SELECT *
            FROM tracking 
            WHERE symbol = "${stock}"
            ORDER BY timing
            LIMIT 1
        `
    }

    static getArticleTrackingsByDays(stock, days) {
        return `
            SELECT created_date, COUNT(*) as count
            FROM article
            INNER JOIN 
            article_stock
            ON article.id = article_stock.article_id
            WHERE symbol = "${stock}"
            and created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY created_date
        `
    }

    static getRedditTrackingsByDays(stock, days) {
        return `
            SELECT created_date, COUNT(*) as count
            FROM comment
            WHERE symbol = "${stock}"
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY created_date
        `
    }

    static getRedditLikesByDays(stock, days) {
        return `
            SELECT DATE_FORMAT(created_date, "%Y-%m-%d") as created_date, SUM(likes) as count
            FROM comment
            WHERE symbol = "${stock}"
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY DATE_FORMAT(created_date, "%Y-%m-%d")
        `
    }

    static getMentionsCountByDays(stock, days) {
        return `
            SELECT DATE_FORMAT(comment.created_date, "%Y-%m-%d") as created_date, COUNT(comment.symbol) + COUNT(article.created_date) as count
            FROM comment
            INNER JOIN
            article_stock ON comment.symbol = article_stock.symbol
            INNER JOIN
            article ON article_stock.article_id = article.id
            WHERE comment.symbol = "${stock}"
            AND comment.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY DATE_FORMAT(comment.created_date, "%Y-%m-%d")
        `
    }
}

module.exports = Tracking;