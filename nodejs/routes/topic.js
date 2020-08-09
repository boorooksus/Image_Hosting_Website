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