class Sentiment{

    static getLatest(req, res) {
        const limit = req.query.limit;
        pool.query(`SELECT symbol, score, is_reddit, post_url, permalink, comment_body, author, created_date FROM sentiment WHERE symbol = "${req.query.symbol}" ORDER BY created_date DESC LIMIT ${limit}`, (error, results, fields) => {
            if (error) console.log(error);
            else res.send(results);
        });
    }

}