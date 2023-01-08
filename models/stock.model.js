
class Stock{

    // returns count of stocks
    static getCount() {
       return "SELECT COUNT(*) AS stock_count FROM stock";
    }

    // returns all stocks
    static getAll(limit) {
        return `SELECT stock.name, stock.symbol, stock.reference_count, stock.created_date, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count LIMIT ${limit}`;
    }

    // returns one stock based on symbol
    static getOne(symbol) {
        return `SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment RIGHT JOIN stock ON sentiment.symbol = "${symbol}" GROUP BY stock.name, stock.symbol HAVING stock.symbol = "${symbol}"`;
    }

    // returns sentiments of one stock
    static getSentimentsOfOne(symbol, limit) {
        return `SELECT symbol, score, is_reddit, post_url, permalink, comment_body, author, created_date FROM sentiment WHERE symbol = "${symbol}" AND score != 0 ORDER BY created_date DESC LIMIT ${limit}`;
    }

    // returns trade analytics of one stock
    static getTradesOfOne(symbol, limit) {
        return `SELECT * FROM analytic WHERE symbol = '${symbol}' ORDER BY timing ASC LIMIT ${limit}`;
    }

    // returns stock based on search for symbol or company name
    static search(search) {
        return `SELECT * FROM stock WHERE name like "%${search}%" OR symbol = "${search}" LIMIT 10`;
    }

    // returns stock with highest average sentiment score
    static getTopScore() {
        return "SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count HAVING average_sentiment_score = (SELECT MAX(average_sentiment_score) FROM (SELECT AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol WHERE stock.reference_count >= 100 GROUP BY stock.name) as avg)";
    }

    // returns stock with most occurences
    static getTopMentions() {
        return `SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count HAVING stock.reference_count = (SELECT MAX(stock.reference_count) FROM stock) LIMIT 1`;
    }

    // returns most trending stock based on the last 1000 sentiments
    static getTrending() {
        return "SELECT stock.symbol, stock.name, stock.reference_count, symbol_count, AVG(sentiment.score) as average_sentiment_score FROM stock INNER JOIN (SELECT symbol, COUNT(symbol) as symbol_count FROM (SELECT * FROM sentiment ORDER BY created_date DESC LIMIT 1000) AS all_sentiments GROUP BY symbol) as s ON stock.symbol = s.symbol INNER JOIN sentiment ON sentiment.symbol = s.symbol GROUP BY stock.symbol ORDER BY symbol_count DESC LIMIT 1";
    }

    // returns random stock
    static getRandom() {
        return `SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.symbol ORDER BY RAND() LIMIT 1`;
    }

}

module.exports = Stock;