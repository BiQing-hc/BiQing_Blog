/*
 * @Author: BiQing 2279567793@qq.com
 * @Date: 2022-11-23 20:53:55
 * 项目的入口文件。加载主要的依赖包，配置中间件，加载路由等等。
 * */

// 引入微型服务端框架 express
const express = require("express");
const path = require("path");
// 创建express的实例对象
const app = express();
const multer = require("multer");
const { db, genid } = require("./db/DbUtils");

// 端口号 8080
const port = 8080;
// 中间件解决跨域问题
app.use(function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "*");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == "OPTIONS") res.sendStatus(200); //让options尝试请求快速结束
  else next();
});

const update = multer({
  dest: "./public/upload/temp",
});
app.use(update.any());
// 拼接地址
app.use(express.static(path.join(__dirname, "./public")));

// 解析express文件
app.use(express.json());

//category/_token/add
const ADMIN_TOKEN_PATH = "/_token";
app.all("*", async (req, res, next) => {
  if (req.path.indexOf(ADMIN_TOKEN_PATH) > -1) {
    let token = req.headers.token;
    let admin_token_sql = "SELECT * FROM `users` WHERE `token` = ?";
    let adminResult = await db.async.all(admin_token_sql, [token]);
    console.log(adminResult);
    if (adminResult.err != null || adminResult.rows.length == 0) {
      res.send({
        code: 403,
        msg: "请先登录",
      });
      return;
    } else {
      next();
    }
  } else {
    next();
  }
});

// 引入博客内容路由 message是一个拼接的东西
app.use("/message", require("./router/DbRouter"));
// 引入登录的路由
app.use("/admin", require("./router/AdminRouter"));
// 引入博客增删改查的路由
app.use("/blog", require("./router/BlogRouter"));
// 引入分类的路由接口
app.use("/category", require("./router/CategoryRouter"));
// 引入下载的路由接口
app.use("/upload", require("./router/UploadRouter"));

// 对端口号进行监听 并且返回响应的内容 这个相当于绑定当前的端口号
app.listen(port, () => {
  console.log(`启动成功当前的端口号为:http://localhost:${port}`);
});
