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
}

module.exports = Reddit;