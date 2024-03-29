class Reddit {

    static getComment(id) {
        return `
            SELECT *
            FROM comment
            WHERE id = ${id}
        `
    }

    static getCommentsByStock(stock, limit) {
        return `
            SELECT *
            FROM comment
            WHERE symbol = "${stock}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getCommentsByStockSearch(limit, stock) {
        return `
            SELECT comment.*
            FROM comment
            INNER JOIN
            stock ON comment.symbol = stock.symbol
            WHERE stock.symbol = "${stock}"
            OR stock.name LIKE "%${stock}%"
            ORDER BY comment.created_date DESC
            LIMIT ${limit}
        `
    }

    static getLatestComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getLatestCommentsBySubreddit(limit, subreddit) {
        return `
            SELECT *
            FROM comment
            WHERE subreddit = "${subreddit}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getMostLikedCommentsBySubreddit(limit, subreddit) {
        return `
            SELECT *
            FROM comment
            WHERE subreddit = "${subreddit}"
            ORDER BY likes DESC
            LIMIT ${limit}
        `
    }

    static getMostDislikedCommentsBySubreddit(limit, subreddit) {
        return `
            SELECT *
            FROM comment
            WHERE subreddit = "${subreddit}"
            ORDER BY likes
            LIMIT ${limit}
        `
    }

    static getMostLikedComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY likes DESC
            LIMIT ${limit}
        `
    }

    static getMostDislikedComments(limit) {
        return `
            SELECT *
            FROM comment
            ORDER BY likes
            LIMIT ${limit}
        `
    }

    static getCommentsByAuthor(author, limit) {
        return `
            SELECT *
            FROM comment
            WHERE author = "${author}"
            ORDER BY created_date DESC
            LIMIT ${limit}
        `
    }

    static getCommentCountByAuthor(author) {
        return `
            SELECT COUNT(*)
            FROM comment
            WHERE author = "${author}"
        `
    }

    static getCommentCount() {
        return `
            SELECT COUNT(*) as comment_count
            FROM comment
        `
    }

    static getCommentLikesAndCountByStockAndDays(stock, days) {
        return `
            SELECT SUM(likes) as comment_likes, COUNT(*) as comment_count
            FROM comment
            WHERE symbol = "${stock}"
            AND comment.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    static getCommentLikesAndCountByStockAndInterval(stock, days) {
        return `
            SELECT SUM(likes) as comment_likes, COUNT(*) as comment_count
            FROM comment
            WHERE symbol = "${stock}"
            AND comment.created_date >= DATE(DATE_ADD(NOW(), INTERVAL - ${days} DAY) - INTERVAL ${days * 2} DAY)
        `
    }

    static getTopStocksWithMostLikesInInterval(days, limit) {
        return `
            SELECT symbol, SUM(likes) as count
            FROM comment
            WHERE LENGTH(symbol) > 2
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    } 

    static getTopStocksWithMostLikes(limit) {
        return `
            SELECT symbol, SUM(likes) as count
            FROM comment
            WHERE LENGTH(symbol) > 2
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    }

    static getMentionsByStockAndDays(stock, days) {
        return `
            SELECT DATE_FORMAT(created_date, "%Y-%m-%d") as created_date, COUNT(*) as count
            FROM comment
            WHERE symbol = "${stock}"
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY DATE_FORMAT(created_date, "%Y-%m-%d")
        `
    }

    static getMentionsByStockAndInterval(stock, days) {
        return `
            SELECT COUNT(*) as count
            FROM comment
            WHERE symbol = "${stock}"
            AND created_date >= DATE(DATE_ADD(NOW(), INTERVAL + ${days} DAY) - INTERVAL ${days * 2} DAY)
            GROUP BY created_date
        `
    }

    static getMostMentionedStocks(limit) {
        return `
            SELECT symbol, COUNT(*) as count
            FROM comment
            WHERE LENGTH(symbol) > 2
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    }

    static getMostMentionedStocksInInterval(limit, days) {
        return `
            SELECT symbol, COUNT(*) as count
            FROM comment
            WHERE LENGTH(symbol) > 2
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY symbol
            ORDER BY count DESC
            LIMIT ${limit}
        `
    }

    static getCommentCountAndLikesByStocksInInterval(stocks, days) {
        return `
            SELECT symbol, SUM(likes) as likes, COUNT(*) as count
            FROM comment
            WHERE symbol IN (${stocks.map(item => { return `"${item}"` })})
            AND created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY symbol
        `
    }
}

module.exports = Reddit;