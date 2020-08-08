var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');

router.get('/create', (request, response) => {
    // user_name 받도록 나중에 수정
    //var user_name = request.
    var html = `     
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/css/style2.css">
                <title>글 작성</title>
            </head>
            <body>
                <form action = "/topic/create_process" method="post">
                <div class ="main">
                    <div class = "btn-category" role = "button">
                        <button type = "button">카테고리</button>
                    </div>
                    <div class = "post-title">
                        <textarea class = "textarea-title" placeholder="제목을 입력하세요." name="title" style = "height: 42px;"></textarea>
                    </div>
                    <div class = "post-content">
                        <textarea class = "textarea-content" name="description" style = "height: 500px;"></textarea>
                    </div>
                </div> 
                <div class = "post-ui">
                    <input type = "submit">
                </div>
                </form>
            </body>
        </html>
    `;
    response.send(html);
});

//<input type="hidden" name="user_name" value="${user_name}">  

router.post('/create_process', (request, response)=>{
    var post = request.body;
    var title = post.title;
    var description = post.description;

    db.query(`
        INSERT INTO topic (title, description, created, user_name) VALUE(?, ?, NOW(), ?)`, [post.title, post.description, post.user_name], (err, res) => {
            if(err){
                throw err;
            }
            // response.writeHead(302, {location:`/?id=${result.insertId}`});
            // response.end();
            response.redirect(302, `/topic/${title}`);
        }
    )
});

router.get('/login', (request, response) => {
    var html = `     
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
            <body>
                <center>
                <p>아이디 : <input type="text" name="id"></p>
                <p>이메일 : <input type="email" name="email"></p>
                <input type="submit" value="찾기">
                </center>
            </body>
        </html>
    `;
    response.send(html);
});

router.get('/join', (request, response) => {
    var html = `     
        <!DOCTYPE html>
        <html>
        <head>
        <meta charset ="utf-8" />
        <title>회원가입</title>
        </head>
        <body>
            <form name ='join' method="POST" action="php_check.php">
            <h1>Input your information</h1>
            <table border="1">
                <label>ID : <input type="text" name="userid" /></label>
                <br />
                <label>PW : <input type="text" name="userpw" /></label>
                <br />
                <label>PW again: <input type="text" name="userpw_a" /></label> <!--비밀번호 재입력-->
                <br />
                <label>email : <input type="text" name="useremail" /></label>
                <br />
                <label>name : <input type="text" name="username" /></label>
                <br />
                <input type="submit" value="제출" onclick = "location.href='http://localhost/register.html'"> <!--클릭 시 onclick 이벤트 발생-->
                <br />
                <input type="reset" value="초기화"> <!-- 클릭 시 입력값 초기화-->
            </table>
            </form>
        </body>
        </html>
    `;
    response.send(html);
});

router.post('/search_process', (request, response)=>{
    var post = request.body;

    db.query(`
        SELECT * FROM POST WHERE TITLE LIKE '%${post.term}%;
        `, (err, res) => {
            if(err){
                throw err;
            }
            // response.writeHead(302, {location:`/?id=${result.insertId}`});
            // response.end();
            response.redirect(302, `/search_result/`);
        }
    )
});

module.exports = router;