const fs = require("fs");

/**
 * service - 服务名称，格式为：controller文件名.方法名
 * rpcParams - rpc方法参数
 */
async function ctrlExec(service, rpcParams) {
  const args = service.split(".");
  if (args.length !== 2) {
    throw new Error("服务名称参数错误");
  }

  const [ctrlFile, funcName] = args;
  let Ctrl = require(`${process.cwd()}/controllers/${ctrlFile}`);
  return await new Ctrl(rpcParams)[funcName](rpcParams);
}

/**
 * 获取所有controller的方法，用于注册rpc
 */
function getAllCtrlFuns() {
  let files = fs
    .readdirSync(`${process.cwd()}/controllers`)
    .filter(file => {
      //不遍历index.js和base.js里面的方法
      return file !== "index.js" && file !== "base.js";
    })
    .map(file => {
      //“user.js”，移除掉“.js”，只保留“user”
      return file.split(".")[0];
    });

  let allFuncs = [];
  files.forEach(file => {
    //获取类的所有方法
    let funcs = Object.getOwnPropertyNames(require(`${process.cwd()}/controllers/${file}`).prototype)
      .filter(fun => {
        //排除掉类的构造函数
        return fun !== "constructor";
      })
      .map(fun => {
        //组装成文件名.方法名的结构，例如user.add
        return `${file}.${fun}`;
      });
    allFuncs = allFuncs.concat(funcs);
  });

  return allFuncs;
}

/**
 * 生成RPC方法map，用于注册rpc服务
 */
exports.generateRpcFuncMap = function() {
  //获取rpc方法
  const rpcFuncs = getAllCtrlFuns();
  const map = {};
  rpcFuncs.forEach(func => {
    map[func] = async function(rpcParams) {
      await ctrlExec(func, rpcParams);
    };
  });

  return map;
};
