/*
 * sofa rpc client
 */
const config = require("config");
const { RpcClient } = require("sofa-rpc-node").client;
const { ZookeeperRegistry } = require("sofa-rpc-node").registry;
const logger = require("../log").biz;

module.exports = class SofaClient {
  constructor() {
    // 1. 创建 zk 注册中心客户端
    const registry = new ZookeeperRegistry({
      logger: logger,
      address: config.get("zkRegistry")
    });
    // 2. 创建 RPC Client 实例
    this.client = new RpcClient({
      logger: logger,
      registry
    });
  }

  async rpcExc(ctx, service, params) {
    const args = service.split(".");
    if (args.length !== 2) {
      throw new Error("rpc服务或方法错误");
    }
    const [serviceName, funcName] = args;

    // 3. 创建服务的 consumer
    const consumer = this.client.createConsumer({
      interfaceName: serviceName
    });
    // 4. 等待 consumer ready（从注册中心订阅服务列表...）
    await consumer.ready();
    // 5. 执行泛化调用
    const result = await consumer.invoke(funcName, [params], { responseTimeout: 3000 });
    return result;
  }
};
