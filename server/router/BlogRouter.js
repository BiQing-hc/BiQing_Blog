/*
 * @Author: BiQing 2279567793@qq.com
 * @Date: 2022-11-25 20:27:36
 * @LastEditors: BiQing 2279567793@qq.com
 */
const express = require("express");
const router = express.Router();
const { db, genid } = require("../db/DbUtils");

router.get("/detail", async (req, res) => {
  // let { id } = req.query;
  let detail_sql = "select * from `articles`";
  let { err, rows } = await db.async.all(detail_sql, []);

  if (err == null) {
    res.send({
      code: 200,
      message: "连接成功le",
      rows,
    });
  } else {
    res.send({
      code: 500,
      message: "连接失败",
    });
  }
});

// 查询博客
router.get("/search", async (req, res) => {
  /**
   * keyword 关键字
   * categoryId 分类编号
   *
   * 分页：
   * page 页码
   * pageSize 分页大小
   *
   */
  let detail_sql = "select * from `articles`";
  let { err, rows } = await db.async.all(detail_sql, []);

  if (err == null) {
    res.send({
      code: 200,
      message: "暂时还不会写 先写上",
      rows,
    });
  } else {
    res.send({
      code: 500,
      message: "连接失败",
    });
  }
});
// 删除博客的接口
router.delete("/_token/delete", async (req, res) => {
  let article_id = req.query.article_id;
  console.log(article_id);
  const delete_sql = "DELETE FROM `articles` WHERE `article_id` = ?";
  let { err, rows } = await db.async.all(delete_sql, [article_id]);
  if (err == null) {
    res.send({
      code: 200,
      msg: "删除成功",
    });
  } else {
    res.send({
      code: 500,
      message: "删除失败了",
    });
  }
});

// 修改博客的接口
router.put("/_token/update", async (req, res) => {
  let { article_title, article_content, user_id, article_id } = req.body;
  const update_sql =
    "UPDATE `articles` SET `article_title` = ?,`article_content` = ?,`user_id` = ? WHERE `article_id` = ?";
  let params = [article_title, article_content, user_id, article_id];

  let { err, rows } = await db.async.run(update_sql, params);
  if (err == null) {
    res.send({
      code: 200,
      msg: "修改成功",
    });
  } else {
    res.send({
      code: 500,
      msg: "修改失败",
    });
  }
});

//添加博客
router.post("/_token/add", async (req, res) => {
  let { article_title, article_content, category_id } = req.body;
  let article_id = genid.NextId();
  const insert_sql =
    "INSERT INTO `articles`(`article_title`,`article_content` ,`user_id`,`article_id` ) VALUES (?,?,?,?)";
  let params = [article_title, article_content, category_id, article_id];

  let { err, rows } = await db.async.run(insert_sql, params);

  if (err == null) {
    res.send({
      code: 200,
      msg: "添加成功",
    });
  } else {
    res.send({
      code: 500,
      msg: "添加失败",
    });
  }
});

module.exports = router;
