const { createUser } = require("../middleware/apiKey.js");

class ApiKey {

    static createAPIUser(req, res) {
        return createUser(req, res);
    }

}

module.exports = ApiKey;