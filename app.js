const express = require('express');
const mysql = require('mysql');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const WEB_SERVER_PORT = 8080;

const app = express();
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
});

//사용자 목록을 보여준다. (초기화)
app.get('/', (req, res) => {
    var sql = "SELECT * FROM users";
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.render('index',{users : result});
    });
});


//INSERT
//신규 입력 양식을 보여준다.
app.get('/insert', (req, res) => {res.sendFile(path.join(__dirname, 'html/form.html'))});

//신규 사용자 정보를 테이블에 입력하고 초기 화면으로 리다이렉트 한다.
app.post('/', (req, res) => {
   var sql = "INSERT INTO users SET ?";

   con.query(sql, req.body, function (err, result, fields) {

     if (err) throw err;
     res.redirect('/'); //초기 목록 화면으로 리다이렉트
     });
});

//DELETE
app.get('/delete/:id', (req, res) => {
  var sql = "DELETE FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.redirect('/'); //초기 목록 화면으로 리다이렉트
    });
});

//변경대상 찾기
app.get('/edit/:id', (req, res) => {
  var sql = "SELECT * FROM users WHERE id = ?";
  con.query(sql, [req.params.id], function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.render('edit',{user : result});
    });
});

//변경대상 UPDATE
app.post('/update/:id', (req, res) => {
  var sql = "UPDATE users SET ? WHERE id = " + req.params.id;
  console.log(req.body);
  con.query(sql, req.body,  function (err, result, fields) {
    if (err) throw err;
    res.redirect('/'); //초기 목록 화면으로 리다이렉트
    });
});

app.listen(WEB_SERVER_PORT, () => console.log('서버가 시작되었습니다.'))
