const express = require('express')
const mysql = require('mysql');
const app = express()
const port = 8080

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "87654321",
  database: "express_db",
});

//연동된 db의 select 결과 뿌려주기
app.get('/', (req, res) => {
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, fields) {
    if (err) throw err;
    //res.send(result[0].email);   // 특정부분
    res.send(result);                // 전체

  });
});


app.listen(port, () => console.log('서버가 시작되었습니다.'))
