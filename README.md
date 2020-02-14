# 带RPC的node微服务项目模板。
> 本模板用于创建带RPC的node微服务项目，基于Koa2.0开发。

## 1、目录结构
```
- 根目录
  - bin/www 程序入口文件
  - config 按环境变量的配置文件
  - constants 常量
  - controllers 控制器，RPC请求入口
  - libs 常用库，包括第三方库、工具类方法等
  - middleware 中间件
  - migrations sequelize migrations，存储表创建、表修改等脚本
  - models 模型，对应数据表
  - node_modules 第三方库
  - pm2config 按环境变量的pm2启动文件
  - scripts 可单独执行的脚本
  - seeders sequelize seeders，存储需要添加到DB的数据
  - services 服务层，处理底层业务逻辑
  - tasks 定时任务
  - .eslintrc.js eslint配置文件
  - .gitignore git忽略文件
  - Dockerfile 容器化配置文件
  - log.js 日志实例化文件，生成日志记录文件
  - newrelic.js 接口监控第三方插件，按需加载
  - package.json 
  - README.md
```

## 2、使用方法

### 逆向创建models
`sequelize-auto -h your_host -p your_db_port -u your_username -x your_password -d your_database -C`

### 创建migrations
`$ sequelize migration:generate --name xxx --models-path "models/xxx"`
通过此方法，可以手动创建一个空的migration文件，其中的up/down方法都是空的。

### 执行migration，生成数据表
`sequelize db:migrate`

### 安装模块
`npm install`

### 运行
`npm run dev`
