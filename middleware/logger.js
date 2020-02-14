const log = require("../log");
module.exports = async (ctx, next) => {
  // let requestId = ctx.get("x-request-id");
  ctx.log = {};
  const bizLog = log.biz;
  // bizLog.addContext("requestId", requestId);
  ctx.log.biz = bizLog;
  await next();
};
