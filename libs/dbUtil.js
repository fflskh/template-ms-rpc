const config = require("config");
const baseLog = require("../log");
const db = require("../models");

function buildDbLogging(log) {
  return (sqlLogText, costMs, options) => {
    const { bizName } = options; // 用于定位sql业务 db.sequelize.transaction({bizName:"测试业务"});
    if (costMs >= config.get("slowSqlMillis")) {
      log.warn(`${sqlLogText},${costMs}ms,${bizName}`);
    } else if (bizName) {
      log.debug(`${sqlLogText},${costMs}ms,${bizName}`);
    } else {
      log.debug(`${sqlLogText},${costMs}ms`);
    }
  };
}

module.exports = {
  buildDbLogging: buildDbLogging,
  async getTransaction(ctx, tsName = "") {
    const requestId = ctx.requestId;
    const dbLogger = baseLog.getReqIdLogger(requestId, "db");
    const dbLogging = buildDbLogging(dbLogger.db);

    const transaction = await db.sequelize.transaction({
      bizName: tsName,
      logging: dbLogging
    });
    return transaction;
  }
};
