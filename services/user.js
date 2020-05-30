const Base = require("./base");

class User extends Base {
  constructor(rpcParams) {
    super(rpcParams);
  }

  async addUser(data) {
    this.log.biz.info({
      message: "add user params",
      data: data
    });

    // this.grpcClient.invoke();

    const createResult = await this.db.user.findOrCreate({
      where: {
        openUserId: "1000003"
      },
      defaults: {
        openUserId: "1000001",
        certType: "01",
        certImage: "abcdefghijk",
        certNo: "67890",
        certName: "zhangsan",
        faceImage: "",
        imageId: "3312"
      },
      logging: this.dbLogging,
      raw: true
    });

    const [user, created] = createResult;

    this.log.biz.info({
      message: "created user",
      user: user
    });

    return user;
  }
}

module.exports = User;
