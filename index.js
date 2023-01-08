const express = require("express");
const cors = require("cors");
const stockRoute = require("./routes/stock.route.js");
const sentimentRoute = require("./routes/sentiment.route.js");
const apiKeyRoute = require("./routes/apiKey.route.js");
const analyticsRoute = require("./routes/analytics.route.js");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

// routes
app.use("/api/v1/stock/", stockRoute);    
app.use("/api/v1/sentiment/", sentimentRoute);
app.use("/api/v1/key/", apiKeyRoute);    
app.use("/api/v1/analytics/", analyticsRoute);    

app.listen(8800);