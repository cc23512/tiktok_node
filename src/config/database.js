const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "aCCC6G423-h56-41246a3aBhFdC1DADe",
  database: "railway",
  port: "15244",
});

pool.getConnection(function (err, connection) {
  if (err) {
    console.log("erro na conexão com o bd");
    console.log(err);
  } else {
    console.log("conexão com bd certinha");
    connection.release();
  }
});

module.exports = pool;
