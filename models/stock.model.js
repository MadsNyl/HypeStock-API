class Stock{

    // returns base info about stock
    static getStockInfo(stock) {
        return `
            SELECT *
            FROM stock
            WHERE symbol = "${stock}"
        `
    }

    // returns count of comments of given stock
    // within given days
    static getCommentsCount(stock, days) {
        return `
            SELECT COUNT(*) as comments_count
            FROM comment
            WHERE symbol = "${stock}"
            AND comment.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    // returns count of tweets of given stock
    // within given days
    static getTweetsCount(stock, days) {
        return `
            SELECT COUNT(*) as tweets_count
            FROM tweet
            WHERE symbol = "${stock}"
            AND tweet.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    // returns total sum of likes from comments of given stock
    // within given days
    static getTotalCommentsLikes(stock, days) {
        return `
            SELECT SUM(likes) as comments_likes
            FROM comment
            WHERE symbol = "${stock}"
            AND comment.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    } 

    // returns total sum of likes from tweets of given stock
    // within given days
    static getTotalTweetsLikes(stock, days) {
        return `
            SELECT SUM(likes) as tweets_likes
            FROM tweet
            WHERE symbol = "${stock}"
            AND tweet.created_date >= DATE(NOW() - INTERVAL ${days} DAY)
        `
    }

    // returns all trackings of price of given stock
    // within given days
    static getTrackings(stock, days) {
        return `
            SELECT *
            FROM tracking
            WHERE symbol = "${stock}"
            AND timing >= DATE(NOW() - INTERVAL ${days} DAY)
            ORDER BY timing DESC
        `        
    }

    // returns total likes and count of comments of given stock
    // on a given day
    static getDailyCommentData(stock, day) {
        return `
            SELECT COUNT(*) as comments_count, SUM(likes) as comments_likes
            FROM comment
            WHERE symbol = "${stock}"
            AND created_date between "${day}" AND "${day + " 23:59:59"}"
        `
    }

}

module.exports = Stock;