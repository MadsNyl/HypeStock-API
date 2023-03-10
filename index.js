const express = require("express");
const cors = require("cors");
const stockRoute = require("./stock/router.js");
const sentimentRoute = require("./routes/sentiment.route.js");
const apiKeyRoute = require("./routes/apiKey.route.js");
const trackingsRoute = require("./routes/trackings.route.js");
const exchangeRoute = require("./routes/exchange.route.js");
const statsRoute = require("./routes/stats.route.js");
const articleRoute = require("./article/router.js");
const redditRoute = require("./reddit/router.js");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// routes
app.use("/api/v1/stock/", stockRoute);    
app.use("/api/v1/sentiment/", sentimentRoute);
app.use("/api/v1/key/", apiKeyRoute);    
app.use("/api/v1/trackings/", trackingsRoute);    
app.use("/api/v1/exchange/", exchangeRoute);    
app.use("/api/v1/stats/", statsRoute);

app.use("/api/v1/articles/", articleRoute);
app.use("/api/v1/reddit/", redditRoute);

app.listen(8800);