const express = require("express");
const { getBaseData, getTopComments, getNegativeComments, getTopTweets, getNegativeTweets } = require("../controllers/exchange.controller.js");
const router = express.Router();

router
    .get("/data", getBaseData)
    .get("/comments/positive", getTopComments)
    .get("/comments/negative", getNegativeComments)
    .get("/tweets/positive", getTopTweets)
    .get("/tweets/negative", getNegativeTweets)


module.exports = router;