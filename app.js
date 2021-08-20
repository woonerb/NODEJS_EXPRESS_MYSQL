const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

//DB 연결
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "87654321",
  database: "express_db",
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//localhost:8080에
//사용자가 입력할 html 화면 띄어주기
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'html/form.html')));

//사용자가 입력한 값 DB에 insert
app.post('/', (req, res) => {
   var sql = "INSERT INTO users SET ?";
   console.log(req.body);
   con.query(sql, req.body, function (err, result, fields) {
     if (err) throw err;
     console.log(result);
     res.send('입력되었습니다.');
     });
});

app.listen(port, () => console.log('서버가 시작되었습니다.'))
