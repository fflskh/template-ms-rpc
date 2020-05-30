const Util = require("../libs/util");
const db = require("../models");
const baseLog = require("../log");
const GrpcClient = require("../grpcClient");

class Base {
  constructor(ctx) {
    this.ctx = Object.create(null);
    this.util = new Util();
    this.db = db;
    this.ctx.requestId = ctx.requestId;
    //给每个请求添加上requestId
    const [bizLogger, dbLogger] = [
      baseLog.getReqIdLogger(this.ctx.requestId, "biz"),
      baseLog.getReqIdLogger(this.ctx.requestId, "db")
    ];
    ctx.log = this.log = {
      biz: bizLogger.biz,
      db: dbLogger.db
    };
    this.grpcClient = new GrpcClient(this.ctx);
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
