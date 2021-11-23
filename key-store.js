const VALID_KEYS_PATH = __dirname + "/valid-keys.txt";
const fs = require("fs");
const shortid = require("shortid");
// To generate a unique API KEY, use shortid.generate()
const LINE_ENDING = require("os").EOL;

const existFile = (dir) => fs.existsSync(dir);

const addKeyFile = (key, callbackError) => {
  fs.appendFile(
    VALID_KEYS_PATH,
    key + LINE_ENDING || "",
    "utf8",
    callbackError
  );
};

const createKeyFile = (key, callbackError) => {
  fs.writeFile(VALID_KEYS_PATH, key + LINE_ENDING || "", "utf8", callbackError);
};

const newApiKey = () => shortid.generate();

const generateKeysFile = (data) => {
  return new Promise((resolve, reject) => {
    const callbackError = (err) => {
      if (err) return reject();
      else resolve();
    };
    if (existFile(VALID_KEYS_PATH)) {
      addKeyFile(data, callbackError);
    } else {
      createKeyFile(data, callbackError);
    }
  });
};

module.exports = async function keyStore(req, res) {
  try {
    const apiKey = newApiKey();
    await generateKeysFile(apiKey);
    res.status(201).json({ apiKey });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal error" });
  }
};
