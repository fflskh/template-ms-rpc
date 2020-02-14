const redis = require("./redis");
const kafka = require("./kafka");
const Util = require("./util");
const utilLib = new Util();
module.exports = function() {
  return {
    redisLib: redis,
    kafkaLib: kafka,
    utilLib
  };
};
