class Sentiment{

    // returns top positive comment of the last week
    static getTopPositive() {
        return `SELECT * 
                FROM sentiment
                WHERE score = (SELECT MAX(score)
                        FROM sentiment
                        WHERE score > 0
                        AND created_date >= DATE(NOW() - INTERVAL 7 DAY)
                        ORDER BY created_date DESC
                       )
                LIMIT 1`;
    }

    // returns latest sentiments
    static getLatest(symbol, limit) {
        return `SELECT * 
                FROM sentiment 
                WHERE symbol = "${symbol}" 
                ORDER BY created_date DESC 
                LIMIT ${limit}`;
    }

}

module.exports = Sentiment;