const Util = require("../libs/util");
const db = require("../models");
class Base {
  constructor(ctx) {
    this.log = ctx.log;
    this.ctx = ctx;
    this.util = new Util();
    this.db = db;
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
