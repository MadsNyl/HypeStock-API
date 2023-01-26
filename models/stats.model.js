class Stats {

    // get count of stocks
    static getStocksCount() {
        return `
            SELECT COUNT(*) as stocks_count
            FROM stock
        `
    }

    // get count of comments
    static getCommentsCount() {
        return `
            SELECT COUNT(*) as comments_count
            FROM comment
        `
    }

    // get count of tweets
    static getTweetsCount() {
        return `
            SELECT COUNT(*) as tweets_count
            FROM tweet
        `
    }

    // get count of twitter users
    static getTwitterUsersCount() {
        return `
            SELECT COUNT(*) as users_count
            FROM twitterUser
        `
    }

    // get count of subreddits
    static getSubredditsCount() {
        return `
            SELECT COUNT(DISTINCT subreddit) as subreddits_count
            FROM comment
        `
    }

    // get stock with most likes last x days from Reddit
    static getTopLikedRedditStock(days) {
        return `
            SELECT stock.symbol, stock.name, stock.exchange, SUM(comment.likes) as likes 
            FROM stock
            INNER JOIN comment
            ON stock.symbol = comment.symbol
            WHERE comment.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY stock.symbol
            ORDER BY likes DESC
            LIMIT 1
        `
    }

    // get stock with most likes between x * 2 days and x days from Reddit
    static getTopLikedRedditStockComparison(days, symbol) {
        return `
            SELECT stock.symbol, stock.name, stock.exchange, SUM(comment.likes) as likes
            FROM stock
            INNER JOIN comment
            ON stock.symbol = comment.symbol
            WHERE comment.created_date
            BETWEEN DATE_ADD(NOW(), INTERVAL - ${2 * days} DAY)
            AND DATE_ADD(NOW(), INTERVAL - ${days} DAY)
            AND comment.symbol = "${symbol}"
            GROUP BY stock.symbol
        `
    }

    // get stock with most likes last x days from Twitter
    static getTopLikedTwitterStock(days) {
        return `
            SELECT stock.symbol, stock.name, stock.exchange, SUM(tweet.likes) as likes
            FROM stock
            INNER JOIN tweet
            ON stock.symbol = tweet.symbol
            WHERE tweet.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
            GROUP BY stock.symbol
            ORDER BY likes DESC
            LIMIT 1
        `
    }

}

module.exports = Stats;