/*
 * @Author: BiQing 2279567793@qq.com
 * @Date: 2022-11-25 19:20:23
 * @LastEditors: BiQing 2279567793@qq.com
    创建管理员的数据库的增删改查
 */
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const { db, genid } = require("../db/DbUtils");

router.get("/test", async (req, res) => {
  let { err, rows } = await db.async.all("select * from `users`");
  if (err == null) {
    console.log("连接成功");
    res.send({
      code: 200,
      rows,
    });
  } else {
    console.error("连接失败");
    res.send({
      code: 500,
      message: "连接失败",
    });
  }
});

router.post("/login", async (req, res) => {
  let { user_account, user_password } = req.body;
  let { err, rows } = await db.async.all(
    "select * from `users` where `user_account` = ? AND `user_password` = ? ",
    [user_account, user_password]
  );
  // ("select * from `users` where `user_account` = ? AND `user_password` = ?",  [user_account, user_password])
  if (err == null && rows.length > 0) {
    let login_token = uuidv4();
    let update_token_sql = "UPDATE `users` SET `token` = ? where `user_id` = ?";
    await db.async.run(update_token_sql, [login_token, rows[0].user_id]);
    let admin_info = rows[0];
    admin_info.token = login_token;
    admin_info.user_password = "";
    res.send({
      code: 200,
      msg: "登录成功",
      data: admin_info,
    });
  } else {
    res.send({
      code: 500,
      msg: "登陆失败",
      data: rows,
    });
  }
});

module.exports = router;
