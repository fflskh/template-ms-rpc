const config = require("config");
const Util = require("../libs/util");
const db = require("../models");
const baseLog = require("../log");
const Client = require("gioneco-grpc").GrpcClient;
const ServiceRegistry = require("gioneco-grpc").ServiceRegistry;

class GrpcClient {
  constructor(ctx) {
    this.ctx = ctx;
    this.grpcClient = new Client({
      protosDir: `${process.cwd()}/protos`,
      registry: new ServiceRegistry(config.get("consul"))
    });
  }

  /**
   * 调用RPC方法
   * @param {String} service 远程服务名+rpc方法，格式为serviceName.funcName
   * @param {string} funName
   * @param {object} params
   */
  async invoke(service, params) {
    const args = service.split(".");
    if (args.length !== 2) {
      throw new Error("服务名称参数错误");
    }

    const [serviceName, funcName] = args;
    const client = this.grpcClient.getGrpcClient(serviceName);

    if (client) {
      return new Promise((resolve, reject) => {
        client[funcName](params, function(err, response) {
          if (err) {
            reject(err);
          } else {
            resolve(response);
          }
        });
      });
    } else {
      throw new Error("无法获取grpc client");
    }
  }
}

module.exports = GrpcClient;
