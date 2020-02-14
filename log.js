const log4js = require("log4js");
const path = require("path");
const config = require("config");
const jsonLayout = require("./libs/log4js-json-type");
const LEVEL = process.env.NODE_ENV == "production" ? "info" : "debug";
const paths = [__dirname, "logs"];
if (process.env.pm_id) {
  paths.push(process.env.pm_id);
}
const APP_NAME = config.get("appName");
const LOG_PATH = path.join(...paths);
const OUTPUT = "output";
const BIZ = "biz";

const defaultAppends = [OUTPUT];
log4js.addLayout("json", jsonLayout);
const appenders = {
  [OUTPUT]: {
    type: "stdout",
    layout: {
      type: "json",
      static: {
        appName: APP_NAME
      },
      source: global.env
    }
  },
  [BIZ]: {
    type: "dateFile",
    daysToKeep: 15, //integer (默认为 0) - 如果这个值大于零，那么在日志滚动期间，将会删除超过这段时间的文件。
    compress: true, //boolean (默认为 false) - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
    filename: path.join(LOG_PATH, "output.log"),
    layout: {
      type: "json",
      static: {
        appName: APP_NAME
      },
      source: global.env
    },
    keepFileExt: true
  }
};
const categories = {
  default: { appenders: [OUTPUT], level: "all" },
  [BIZ]: { appenders: [...defaultAppends, BIZ], level: LEVEL }
};

log4js.configure({
  disableClustering: true,
  appenders,
  categories
});

//增加代码行数打印
if (process.env.NODE_ENV !== "production") {
  const log4js_extend = require("log4js-extend");
  log4js_extend(log4js, {
    path: __dirname,
    format: "at @name (@file:@line:@column)"
  });
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  module.exports = {
    log4js,
    ["default"]: console,
    [BIZ]: console
  };
} else {
  module.exports = {
    log4js,
    ["default"]: log4js.getLogger(),
    [BIZ]: log4js.getLogger(BIZ)
  };
}
