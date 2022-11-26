/*
 * @Author: BiQing 2279567793@qq.com
 * @Date: 2022-11-23 22:02:33
 * @LastEditors: BiQing 2279567793@qq.com
 * 这一步是为了连接 连接数据库的文件
 */
const express = require("express");
// 导入连接数据库的文件
const { db } = require("../db/DbUtils");
var router = express.Router();

/**
 * 在这里写入一些主要的增删改查我也不清楚到底是一个怎样的结构
 */
router.get("/test", (req, res) => {
  db.all("select * from `articles`", (err, rows) => {
    res.send(rows);
  });
});
router.get("/list", (req, res) => {
  db.all("select * from `articles`", (err, rows) => {
    res.send(rows);
  });
});

router.delete("/delete", (req, res) => {
  const deleteId = req.query.id;
  db.all(
    "delete from `articles` where `article_id` = ? ",
    [deleteId],
    (err, rows) => {
      if (err == null) {
        res.send({
          code: 200,
          message: "删除成功",
        });
      } else {
        res.send({
          code: 500,
          message: "删除失败",
        });
      }
    }
  );
});

router.post("/add", (req, res) => {
  let message = {
    name: "王云飞",
    count: 18,
    content: "我是内容",
  };
  console.log(message);
  db.run(
    "INSERT INTO `articles`(`user_id`,`user_title`,`article_views`,`article_comment_content`,`article_ike_count`) VALUES(?,?,?,?,?)",
    [
      new Date().getTime(),
      message.name,
      new Date().getTime(),
      message.count,
      message.age,
    ],
    (err, rows) => {
      if (err == null) {
        res.send({
          code: 200,
          message: "添加成功",
        });
      } else {
        res.send({
          code: 500,
          message: "添加失败",
        });
      }
    }
  );
});

module.exports = router;
