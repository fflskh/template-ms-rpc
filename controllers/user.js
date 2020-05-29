/* eslint-disable require-atomic-updates */
/* eslint-disable require-atomic-updates */
const { RES_CODE } = require("../constants");
const { UserService } = require("../services");
const dbUtil = require("../libs/dbUtil");

exports.addUser = async ctx => {
  const { body, query, params, header } = ctx;
  console.log(ctx);

  let transaction = await dbUtil.getTransaction(ctx, "biz");
  try {
    ctx.log.biz.info({
      message: "add user api",
      data: {
        msg: ctx
      }
    });
    const userService = new UserService(ctx);
    await userService.addUser();

    ctx.body = {
      ...RES_CODE.SUCCESS,
      data: {}
    };
    await transaction.commit();
  } catch (error) {
    console.error(error);
    await transaction.rollback();
  }
};
