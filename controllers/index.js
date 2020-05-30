/**
 * service - 服务名称，由controller文件名.方法组成
 */
exports.exec = async function(serviceName, rpcParams) {
  const args = serviceName.split(".");
  if (args.length !== 2) {
    throw new Error("服务名称参数错误");
  }

  const [ctrlFile, funcName] = args;
  let Ctrl = require(`${process.cwd()}/controllers/${ctrlFile}`);
  return await new Ctrl(rpcParams)[funcName](rpcParams);
};
