const Util = require("../libs/util");
const db = require("../models");
const baseLog = require("../log");
class Base {
  constructor(ctx) {
    this.ctx = ctx;
    this.util = new Util();
    this.db = db;

    //给每个请求添加上requestId
    const { body, query, params, header } = ctx;
    let requestId = header["x-request-id"] || "";
    const [bizLogger, dbLogger] = [baseLog.getReqIdLogger(requestId, "biz"), baseLog.getReqIdLogger(requestId, "db")];
    ctx.log = {
      biz: bizLogger.biz,
      db: dbLogger.db
    };
    this.log = ctx.log;
  }

  async getTransaction(ctx, tsName = "") {
    const transaction = await db.sequelize.transaction({
      bizName: tsName,
      logging: this.util.buildDbLogging(ctx.log)
    });
    return transaction;
  }
}

module.exports = Base;
