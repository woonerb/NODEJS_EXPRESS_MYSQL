const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "87654321",
  database: "express_db",
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  // var sql = "SELECT * FROM users";
  // con.query(sql, function (err, result, fields) {
  //   if (err) throw err;
  //   console.log(result[0].email);
  // });
});

// app.get('/', (req, res) => {
//   var sql = "SELECT * FROM users";
//   con.query(sql, function (err, result, fields) {
//     if (err) throw err;
//     res.send(result);
//     });
// });

//사용자 목록을 보여준다. (초기화)
app.get('/', (req, res) => {
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      res.render('index',{users : result});
    });
});

//신규 입력 양식을 보여준다.
app.get('/insert', (req, res) => {res.sendFile(path.join(__dirname, 'html/form.html'))});

//신규 사용자 정보를 테이블에 입력하고 초기 화면으로 리다이렉트 한다.
app.post('/', (req, res) => {
   var sql = "INSERT INTO users SET ?";
   console.log(req.body);
   con.query(sql, req.body, function (err, result, fields) {
     if (err) throw err;
     console.log(result);
     //res.send('입력되었습니다.');
     res.redirect('/'); //초기 목록 화면으로 리다이렉트
     });
});

app.get('/delete/:id', (req, res) => {
  var sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/'); //초기 목록 화면으로 리다이렉트
    });
});

app.get('/summer', (req, res) => res.send('아직 여름입니다.'))
app.get('/winter', (req, res) => res.send('겨울에는 추워요!!'))
app.listen(port, () => console.log('서버가 시작되었습니다.'))
