var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');
var multer = require('multer')
var _storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
var upload = multer({storage: _storage}) //dest : 저장 위치
//var upload = multer({dest: 'uploads/'})


router.get('/create', (request, response) => {
    if(!auth.isLogined(request, response)){
        response.redirect('/auth/login');
        return false;
    }
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
                <form action = "/topic/create_process" method="post" enctype="multipart/form-data">
                <div class ="main">
                <input type="hidden" name="author_id" value="${request.session.nickname}">
                <input type="file" name="img" />
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

router.post('/create_process',upload.single('img'), (request, response, next)=>{
    var post = request.body;
    console.log('db save: ', request.file.originalname);
    db.query(`
        INSERT INTO upload (title, description, created, author_id, img_name) VALUE(?, ?, NOW(), ?, ?)`, [post.title, post.description, post.author_id, request.file.originalname], (err, res) => {
            if(err){
                throw err;
            }
            response.redirect(302, `/topic/${post.title}`);
            
        }
    )
});

router.get('/:pageId', function(request, response, next){
    //console.log("===========param==============");
    //console.log(path.parse(request.params.pageId));
    var title = request.params.pageId;
    var sanitizedTitle = sanitizeHtml(title);
    var filteredId = path.parse(request.params.pageId).base;
    console.log('title: ', title);
    console.log('filtered: ', filteredId);
    db.query(`SELECT * FROM upload WHERE title='${title}'`, function(err, result){
        console.log('1!!!!');
        console.log('result: ', result);
        var description = result[0].description;
        console.log('2!!!!');
        var sanitizedDescription = sanitizeHtml(description);
        console.log('img name: ', result[0].img_name);
        var html = `
        <!DOCTYPE html>
            <html>
            <head>
                <title>${sanitizedTitle}</title>
                <meta charset="utf-8">
            </head>
            <body>
            <h3>${title}</h3>
                <div id="grid">
                    <img src="/uploads/${result[0].img_name}" style="width:500px; display:block;">
                   ${sanitizedDescription}<br><br>
                   posted by ${result[0].author_id}
                </div>
                
            </body>
            </html>
        `;
        //response.writeHead(200);
        //response.end(html);
        response.send(html);
    });

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