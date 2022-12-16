const ApiKey = require("../models/apiKey.model.js");

const createAPIUser = (req, res) => ApiKey.createAPIUser(req, res); 

module.exports = {
    createAPIUser
}