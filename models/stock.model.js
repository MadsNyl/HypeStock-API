const pool = require("../connection.js");

class Stock{

    // returns count of stocks
    static getCount(req, res) {
        pool.query("SELECT COUNT(*) AS stock_count FROM stock", (error, results, fields) => {
            if (error) console.log(error);
            else return res.send(results);
        });
    }

    // returns all stocks
    static getAll(req, res) {
        pool.query(`SELECT stock.name, stock.symbol, stock.reference_count, stock.created_date, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count LIMIT ${req.query.limit}`, (error, results, fields) => {
            if (error) console.log(error);
            else return res.send(results);
        });
    }

    // returns one stock based on symbol
    static getOne(req, res) {
        pool.query(`SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment RIGHT JOIN stock ON sentiment.symbol = "${req.query.symbol}" GROUP BY stock.name, stock.symbol HAVING stock.symbol = "${req.query.symbol}"`, (error, results, fields) => {
            if (error) console.log(error);
            else {
                // get sentiments
                pool.query(`SELECT symbol, score, is_reddit, post_url, permalink, comment_body, author, created_date FROM sentiment WHERE symbol = "${req.query.symbol}" ORDER BY created_date DESC LIMIT 6`, (error, sentiments, fields) => {
                    if (error) results[0].sentiments = [];
                    else { 
                        if (sentiments.length == 0) results[0].sentiments = [];
                        else results[0].sentiments = sentiments; 
                        // get trades
                        pool.query(`SELECT * FROM analytic WHERE symbol = '${req.query.symbol}' ORDER BY timing ASC LIMIT 30`, (error, trades, fields) => {
                            if (error) results[0].trades = [];
                            else {
                                if (trades.length == 0) results[0].trades = [];
                                else results[0].trades = trades;
                                // return results
                                res.send(results);
                            }
                        });
                    }
                });
            };
        });
    }

    // returns stock based on search for symbol or company name
    static search(req, res) {
        pool.query(`SELECT * FROM stock WHERE name like "%${req.query.search}%" OR symbol = "${req.query.search}" LIMIT 10`, (error, results, fields) => {
            if (error) console.log(error);
            else res.send(results);
        });
    }

    // returns stock with highest average sentiment score
    static getTopScore(req, res) {
        pool.query("SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count HAVING average_sentiment_score = (SELECT MAX(average_sentiment_score) FROM (SELECT AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name) as avg)", (error, results, fields) => {
            if (error) console.log(error);
            else {
                const symbol = results[0].symbol;
                pool.query(`SELECT * FROM analytic WHERE symbol = '${symbol}' ORDER BY timing ASC LIMIT 30`, (error, trades, fields) => {
                    if (error) {
                        console.log(error)
                        results[0].trades = [];
                        res.send(results);
                    } else {
                        results[0].trades = trades;
                        res.send(results);
                    }
                });
            };
        });
    }

    // returns stock with most occurences
    static getTopMentions(req, res) {
        pool.query("SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.name, stock.symbol, stock.reference_count HAVING stock.reference_count = (SELECT MAX(stock.reference_count) FROM stock) LIMIT 1", (error, results, fields) => {
            if (error) console.log(error);
            else {
                const symbol = results[0].symbol;
                pool.query(`SELECT * FROM analytic WHERE symbol = '${symbol}' ORDER BY timing ASC LIMIT 30`, (error, trades, fields) => {
                    if (error) {
                        console.log(error)
                        results[0].trades = [];
                        res.send(results);
                    } else {
                        results[0].trades = trades;
                        res.send(results);
                    }
                });
            };
        });
    }

    // returns most trending stock based on the last 250 sentiments
    static getTrending(req, res) {
        pool.query("SELECT stock.symbol, stock.name, stock.reference_count, symbol_count, AVG(sentiment.score) as average_sentiment_score FROM stock INNER JOIN (SELECT symbol, COUNT(symbol) as symbol_count FROM (SELECT * FROM sentiment ORDER BY created_date DESC LIMIT 250) AS all_sentiments GROUP BY symbol) as s ON stock.symbol = s.symbol INNER JOIN sentiment ON sentiment.symbol = s.symbol GROUP BY stock.symbol ORDER BY symbol_count DESC LIMIT 1", (error, results, fields) => {
            if (error) console.log(error);
            else {
                const symbol = results[0].symbol;
                pool.query(`SELECT * FROM analytic WHERE symbol = '${symbol}' ORDER BY timing ASC LIMIT 30`, (error, trades, fields) => {
                    if (error) {
                        console.log(error)
                        results[0].trades = [];
                        res.send(results);
                    } else {
                        results[0].trades = trades;
                        res.send(results);
                    }
                });
            };
        });
    }

    // returns random stock
    static getRandom(req, res) {
        pool.query(`SELECT stock.*, AVG(sentiment.score) as average_sentiment_score FROM sentiment INNER JOIN stock ON sentiment.symbol = stock.symbol GROUP BY stock.symbol ORDER BY RAND() LIMIT 1`, (error, results, fields) => {
            if (error) console.log(error);
            else {
                const symbol = results[0].symbol;
                pool.query(`SELECT * FROM analytic WHERE symbol = '${symbol}' ORDER BY timing ASC LIMIT 30`, (error, trades, fields) => {
                    if (error) {
                        console.log(error)
                        results[0].trades = [];
                        res.send(results);
                    } else {
                        results[0].trades = trades;
                        res.send(results);
                    }
                });
            };
        });
    }

}

module.exports = Stock;