module.exports = {
  apps: [
    {
      script: __dirname + "/../bin/www",
      instances: "1",
      exec_mode: "cluster",
      output: "/dev/null",
      name: "tyacc-ms-gateway"
    }
  ]
};
