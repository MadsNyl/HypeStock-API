class Subreddit {
    static getDistinctSubredditCount() {
        return `
            SELECT COUNT(DISTINCT subreddit) as subreddit_count
            FROM comment
        `
    }

    static getSubreddits() {
        return `
            SELECT DISTINCT subreddit
            FROM comment
        `
    }

    static getTopSubredditOfTheWeek() {
        return `
            SELECT subreddit, COUNT(DISTINCT symbol) as distinct_symbols, COUNT(*) as comment_count
            FROM comment
            WHERE created_date >= DATE(NOW() - INTERVAL 7 DAY)
            GROUP BY subreddit
            ORDER BY distinct_symbols DESC
        `
    }

    static getTopStockOfSubredditOfTheWeek(subreddit) {
        return  `
            SELECT symbol, COUNT(symbol) as symbol_count
            FROM comment
            WHERE created_date >= DATE(NOW() - INTERVAL 7 DAY)
            AND subreddit = "${subreddit}"
            GROUP BY symbol
            ORDER BY symbol_count DESC
            LIMIT 1
        `
    }

    static getStockMentionsBySubredditAndDays(stock, days) {
        return `
            SELECT subreddit, COUNT(CASE WHEN symbol = "${stock}" THEN 1 END) as stock_count, COUNT(symbol) as total_count
            FROM comment
            WHERE created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY subreddit
            ORDER BY stock_count DESC
        `
    }
}

module.exports = Subreddit;