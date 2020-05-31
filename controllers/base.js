const config = require("config");
const Util = require("../libs/util");
const db = require("../models");
const baseLog = require("../log");
const SofaRpcClient = require("../libs/sofaRpcClient");

class Base {
  constructor(rpcParams) {
    this.ctx = Object.create(null);
    this.util = new Util();
    this.db = db;

    //给每个请求添加上requestId
    this.ctx.requestId = rpcParams.requestId;
    const [bizLogger, dbLogger] = [
      baseLog.getReqIdLogger(this.ctx.requestId, "biz"),
      baseLog.getReqIdLogger(this.ctx.requestId, "db")
    ];
    this.ctx.log = this.log = {
      biz: bizLogger.biz,
      db: dbLogger.db
    };

    this.sofaClient = new SofaRpcClient(this.ctx);
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
