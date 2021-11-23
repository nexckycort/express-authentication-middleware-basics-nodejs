const fs = require("fs");
const os = require("os");
const { compact } = require("lodash");

const VALID_KEYS_PATH = __dirname + "/valid-keys.txt";

const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const getKeysFromFile = () => {
  return readFile(VALID_KEYS_PATH).then((data) => {
    return compact(data.split(os.EOL));
  });
};

const unauthorized = (res) => res.status(401).end();

module.exports = async function auth(req, res, next) {
  try {
    const apiKey = req.get("x-api-key");
    if (apiKey === undefined) unauthorized(res);

    const apiKeys = await getKeysFromFile();
    if (!apiKeys.includes(apiKey)) return unauthorized(res);
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};
