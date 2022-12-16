const fs = require("fs");

const genKey = () => {
    // create a base-36 string with 30 characters, a-z0-9
    return [...Array(30)]
        .map((e) => (Math.random() * 36 | 0).toString(36))
        .join("");
}

const loadUserToJSON = (user) => {
    fs.readFile("./middleware/apiKeys.json", "utf8", (err, data) => {
        if (err) console.log(err);
        else {
            obj = JSON.parse(data);
            obj["users"].push(user);
            json = JSON.stringify(obj, null, "\t");
            fs.writeFile("./middleware/apiKeys.json", json, "utf8", (err, data) => {
                if (err) console.log(err);
                else console.log("User added to json.")
            });
        }
    });
}

const readUsersFromJSON = (host, api_key) => {
    return new Promise(resolve => {
        fs.readFile("./middleware/apiKeys.json", "utf8", async (err, data) => {
            if (err) console.log(err);
            else {
                let json = JSON.parse(data);
                let users = json["users"];
                let user = users.find(
                    user => user.api_key == api_key
                );
                resolve(user);
            }
        });
    });
}

const createUser = (req, res) => {
    let user = {
        name: req.body.name,
        api_key: genKey()
    }
    loadUserToJSON(user);
    res.send(user);
}

const validateKey = async (req, res, next) => {
    let host = req.headers.origin;
    let api_key = req.header("x-api-key");
    let account = await readUsersFromJSON(host, api_key);

    if (account) next()
    else res.status(403).send({ error: { code: 403, message: "You are not allowed to use this API." } });
}

module.exports = {
    createUser,
    genKey,
    loadUserToJSON,
    validateKey
}