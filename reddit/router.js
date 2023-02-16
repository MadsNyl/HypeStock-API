const express = require("express");
const { getComment, getCommentByStock, getBaseData } = require("./controllers/reddit.controller.js");
const { getLatestComments } = require("./models/reddit.model.js");
const router = express.Router();

router
    .get("/", getBaseData)
    .get("/comment", getComment)
    .get("/comment_by_stock", getCommentByStock)
    .get("/latest", getLatestComments)

module.exports = router;