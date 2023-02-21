const express = require("express");
const { getComment, getCommentByStock, getBaseData, getLatestComments, getMostLikedComments, getMostDislikedComments, getLatestCommentsBySubreddit, getMostLikedCommentsBySubreddit, getMostDisikedCommentsBySubreddit, getCommentsByStockSearch } = require("./controllers/reddit.controller.js");
const router = express.Router();

router
    .get("/", getBaseData)
    .get("/comment", getComment)
    .get("/comment_by_stock", getCommentByStock)
    .get("/stock_search", getCommentsByStockSearch)
    .get("/latest", getLatestComments)
    .get("/latest_by_subreddit", getLatestCommentsBySubreddit)
    .get("/upvotes", getMostLikedComments)
    .get("/upvotes_by_subreddit", getMostLikedCommentsBySubreddit)
    .get("/downvotes", getMostDislikedComments)
    .get("/downvotes_by_subreddit", getMostDisikedCommentsBySubreddit)

module.exports = router;