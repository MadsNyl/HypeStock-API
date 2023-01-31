const pool = require("../connection.js");
const { sliceDate, addDays } = require("../helper/formatDate.js");
const Stock = require("../models/stock.model.js");

const getBaseData = async (req, res) => {
    const { stock, days } = req.query;

    if (!stock || !days) return res.sendStatus(400);

    try {
        const stockInfo = await pool.query(Stock.getStockInfo(stock));
        const commentsCount = await pool.query(Stock.getCommentsCount(stock, days));
        const tweetsCount = await pool.query(Stock.getTweetsCount(stock, days));
        const commentsLikes = await pool.query(Stock.getTotalCommentsLikes(stock, days));
        const tweetsLikes = await pool.query(Stock.getTotalTweetsLikes(stock, days));
        const trackings = await pool.query(Stock.getTrackings(stock, days));
        
        const commentData = [];
        for (const [index, t] of trackings[0].entries()) {
            let tempDate = addDays(t.timing, 1);
            const date = sliceDate(tempDate, 10);
            trackings[0][index].timing = date;
            const comment = await pool.query(Stock.getDailyCommentData(stock, date));
            comment[0][0].timing = date;
            commentData.push(comment[0][0]);
        }

        const data = {
            symbol: stockInfo[0][0].symbol,
            name: stockInfo[0][0].name,
            exchange: stockInfo[0][0].exchange,
            created_date: stockInfo[0][0].created_date,
            comments_count: commentsCount[0][0].comments_count,
            tweets_count: tweetsCount[0][0].tweets_count,
            comments_likes: commentsLikes[0][0].comments_likes,
            tweets_likes: tweetsLikes[0][0].tweets_likes,
            trackings: trackings[0],
            comment_data: commentData
        }

        return res.send(data);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

module.exports = {
    getBaseData
}