const express = require("express");
const cors = require("cors");
const stockRoute = require("./stock/router.js");
const articleRoute = require("./article/router.js");
const redditRoute = require("./reddit/router.js");
const homeRoute = require("./home/router.js");
const trendingRoute = require("./trending/router.js");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// routes
app.use("/api/v1/stock/", stockRoute);    
app.use("/api/v1/", homeRoute)
app.use("/api/v1/articles/", articleRoute);
app.use("/api/v1/reddit/", redditRoute);
app.use("/api/v1/trending/", trendingRoute);

app.listen(8800);