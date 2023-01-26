const express = require("express");
const { getBaseData, getTopComments, getNegativeComments, getTopTweets, getNegativeTweets, getTopLikesTweets, getTopLikesComments } = require("../controllers/exchange.controller.js");
const router = express.Router();

router
    .get("/data", getBaseData)
    .get("/comments/positive", getTopComments)
    .get("/comments/negative", getNegativeComments)
    .get("/comments/likes", getTopLikesComments)
    .get("/tweets/positive", getTopTweets)
    .get("/tweets/negative", getNegativeTweets)
    .get("/tweets/likes", getTopLikesTweets)


module.exports = router;