const express = require("express");
const { getAllStocks, getStock, search, getTopMentions, getTopScore, getTrending, getCount, getRandom } = require("../controllers/stock.controller.js");
const { validateKey } = require("../middleware/apiKey.js");
const router = express.Router();

router.use(validateKey);

router.get("/all", getAllStocks);
router.get("/", getStock);
router.get("/search", search);
router.get("/mentions", getTopMentions);
router.get("/score", getTopScore);
router.get("/trending", getTrending);
router.get("/random", getRandom);
router.get("/count", getCount);

module.exports = router;