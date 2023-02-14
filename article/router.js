const express = require("express");
const { getArticle, getBaseData } = require("./controllers/article.controller.js");
const router = express.Router()

router
    .get("/article", getArticle)
    .get("/base_data", getBaseData)

module.exports = router;