/* eslint-disable require-atomic-updates */
const { RES_CODE } = require("../constants");
const { TestService } = require("../services");

exports.hello = async (ctx) => {
  const { body, query, params, header } = ctx;

  let testService = new TestService(ctx);
  let msg = await testService.hello();

  return {
    ...RES_CODE.SUCCESS,
    data: {
      msg: msg
    }
  };
};
