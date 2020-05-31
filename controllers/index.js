/**
 * serviceName - 服务名称，同controller文件名
 * funcName - rpc方法名称
 * rpcParams - rpc方法参数
 */
exports.exec = async function(serviceName, funcName, rpcParams) {
  // const args = serviceName.split(".");
  // if (args.length !== 2) {
  //   throw new Error("服务名称参数错误");
  // }

  // const [ctrlFile, funcName] = args;
  let Ctrl = require(`${process.cwd()}/controllers/${serviceName}`);
  return await new Ctrl(rpcParams)[funcName](rpcParams);
};
