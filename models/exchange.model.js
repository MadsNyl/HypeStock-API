class Exchange {

    // get count of comments from given exchange
    static getCommentCount(exchange) {
        return `
            SELECT COUNT(*) AS comment_count
            FROM comment
            INNER JOIN stock
            ON comment.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
        `
    } 

    // get count of tweets from given exchange
    static getTweetCount(exchange) {
        return `
            SELECT COUNT(*) as tweet_count
            FROM tweet
            INNER JOIN stock
            ON tweet.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
        `
    }

    // get count of stocks from given exchange
    static getStockCount(exchange) {
        return `
            SELECT COUNT(*) AS stock_count
            FROM stock
            WHERE exchange = "${exchange}"
        `
    }

    // get top reddit comments
    static getTopComments(exchange, limit) {
        return `
            SELECT comment.*, stock.name 
            FROM comment
            INNER JOIN stock
            ON comment.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY comment.positive_score DESC
            LIMIT ${limit}
        `
    }

    // get most negative reddit comments
    static getNegativeComments(exchange, limit) {
        return `
            SELECT comment.*, stock.name 
            FROM comment
            INNER JOIN stock
            ON comment.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY comment.negative_score DESC
            LIMIT ${limit}
        `
    }

    // get top tweets
    static getTopTweets(exchange, limit) {
        return `
            SELECT tweet.*, stock.name 
            FROM tweet
            INNER JOIN stock
            ON tweet.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY tweet.positive_score DESC
            LIMIT ${limit}
        `
    }

    // get most negative tweets
    static getNegativeTweets(exchange, limit) {
        return `
            SELECT tweet.*, stock.name 
            FROM tweet
            INNER JOIN stock
            ON tweet.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY tweet.negative_score DESC
            LIMIT ${limit}
        `
    }

    // get comment with most likes
    static getTopLikesComments(exchange, limit) {
        return `
            SELECT comment.*, stock.name
            FROM comment
            INNER JOIN stock
            ON comment.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY comment.likes DESC
            LIMIT ${limit}
        `
    }

    // get tweet with most likes
    static getTopLikesTweets(exchange, limit) {
        return `
            SELECT tweet.*, stock.name
            FROM tweet
            INNER JOIN stock
            ON tweet.symbol = stock.symbol
            WHERE stock.exchange = "${exchange}"
            ORDER BY tweet.likes DESC
            LIMIT ${limit}
        `
    }
}


module.exports = Exchange;