/* eslint-disable require-atomic-updates */
/* eslint-disable require-atomic-updates */
const { RES_CODE } = require("../constants");
const { UserService } = require("../services");
const dbUtil = require("../libs/dbUtil");
const Base = require("./base");

class User extends Base {
  constructor(rpcParams) {
    super(rpcParams);
  }

  async add(rpcParams) {
    this.log.biz.info({
      message: "addUser params: ",
      data: rpcParams
    });

    let transaction = await dbUtil.getTransaction(this.ctx, "biz");
    try {
      this.log.biz.info({
        message: "add user api",
        data: rpcParams
      });
      const userService = new UserService(this.ctx);
      await userService.addUser();

      await transaction.commit();
    } catch (error) {
      this.log.biz.error(error);
      await transaction.rollback();
    }
    return {
      ...RES_CODE.SUCCESS,
      data: {
        openUserId: "123123"
      }
    };
  }
}
module.exports = User;
