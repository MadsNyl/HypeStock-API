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
}

module.exports = Subreddit;