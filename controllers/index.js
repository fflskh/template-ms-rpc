const fs = require("fs");
const path = require("path");
const constants = {};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(file => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach(file => {
    let constant = require(path.join(__dirname, file));
    for (let key of Object.keys(constant)) {
      constants[key] = constant[key];
    }
  });
module.exports = constants;