/*
 * @Author: BiQing 2279567793@qq.com
 * @Date: 2022-11-24 10:34:22
 * @LastEditors: BiQing 2279567793@qq.com
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

// 这一步是连接数据库
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const GenId = require("../utils/SnowFlake");
const genid = new GenId({ WorkerId: 1 });
const db = new sqlite3.Database(path.join(__dirname, "./blog.sqlite3"));

db.async = {};

db.async.all = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      resolve({ err, rows });
    });
  });
};

db.async.run = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      resolve({ err, rows });
    });
  });
};

// 导出数据库文件
module.exports = { db, genid };
