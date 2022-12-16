const { createAPIUser } = require("../controllers/apiKey.controller.js");
const { validateKey } = require("../middleware/apiKey.js");
const express = require("express");
const router = express.Router();

router.post("/create", createAPIUser);


module.exports = router;
