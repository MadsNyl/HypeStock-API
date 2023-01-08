const express = require("express");
const { getAllStocks, getStock, search, getTopMentions, getTopScore, getTrending, getCount, getRandom } = require("../controllers/stock.controller.js");
const { validateKey } = require("../middleware/apiKey.js");
const router = express.Router();

// router.use(validateKey);

router
    .get("/all", getAllStocks)
    .get("/get", getStock)
    .get("/search", search)
    .get("/mentions", getTopMentions)
    .get("/score", getTopScore)
    .get("/trending", getTrending)
    .get("/random", getRandom)
    .get("/count", getCount);

module.exports = router;