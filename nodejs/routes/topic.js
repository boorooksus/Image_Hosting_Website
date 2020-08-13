var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var auth = require('../lib/auth.js');
var template = require('../lib/template.js');
var multer = require('multer');
var postNum = 20;
const { filter } = require('compression');
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
    var title = request.params.pageId;
    var sanitizedTitle = sanitizeHtml(title);
    var filteredId = path.parse(request.params.pageId).base;
    db.query(`SELECT * FROM upload WHERE title='${title}'`, function(err, result){
        var description = result[0].description;
        var sanitizedDescription = sanitizeHtml(description);
        var html = `
        <!DOCTYPE html>
            <html>
            <head>
                <title>${sanitizedTitle}</title>
                <meta charset="utf-8">
            </head>
            <body>
            <a href="/">Web_14</a>
            <a href="/topic/browsing/1">Back to list</a>
            <h3>${title}</h3>
                <div id="grid">
                    <img src="/uploads/${result[0].img_name}" style="width:500px; display:block;">
                   ${sanitizedDescription}<br><br>
                   posted by ${result[0].author_id}
                    <form action=
                        "/topic/delete_process" method="post" onsubmit="return confirm('Do you want to delete?')">
                        <input type="hidden" name="id" value="${result[0].id}"><input type="submit" value="delete" style="display:block;">
                    </form>
                    <a href="/topic/update/${title}">update</a>
                    
                </div>
                
            </body>
            </html>
        `;
        response.send(html);
    });

});

router.get('/browsing/:pageNum', (request, response) => {
    var pageNum = request.params.pageNum;
    db.query(`SELECT * FROM upload ORDER BY id DESC`, (error, result) => {

        var list = '<div id="columns">';
        var cur = (pageNum - 1) * postNum;
        var end = cur + postNum;
        while(cur < end && cur < result.length){
            list = list + `
            <figure>
                <a href="/topic/${result[cur].title}">
                <img src="/uploads/${result[cur].img_name}"></a>
                <figcaption>${result[cur].description}</figcaption>
            </figure>
            `;
            cur += 1;
        }
        list += `</div>`

        var pageList = `<div id=page_list><ol>`;
        var i = 1;
        while(i < (result.length / postNum + 1)){
            if(i === Number(pageNum)){
                pageList += `<strong><li><a href="/topic/browsing/${i}">[${i}]</a></li></strong>`;
            }
            else{
                pageList += `<li><a href="/topic/browsing/${i}">[${i}]</a></li>`;
            }
            i += 1;
        }
        i += `</ol></div>`
        var authStatusUi = auth.statusUi(request, response);

        var html = template.html(list, authStatusUi, pageList);
        response.send(html)
    });
});

router.post('/delete_process', (request, response) => {
    var post = request.body
    var id = post.id;
    var filteredId = path.parse(id).base;
    db.query(`SELECT * FROM upload WHERE id=?`,[post.id],function(error, result){
        if(request.session.nickname === result[0].author_id || request.session.nickname === 'admin'){
            db.query(`DELETE FROM upload WHERE id=?`,[post.id],function(error, result){
                response.redirect(302, `/topic/browsing/1`);
            }); 
        }
        else{
            response.send('작성자가 아닙니다');
        }
    }); 
});


router.post('/search/:pageNum', (request, response)=>{
    var pageNum = request.params.pageNum;
    var post = request.body;
    db.query(`
        SELECT * FROM upload WHERE title LIKE '%${post.term}%';
        `, (err, result) => {
            if(err){
                throw err;
            }
            var list = '<div id="columns">';
            var cur = (pageNum-1) * postNum;
            var end = cur + postNum;
            while(cur < end && cur < result.length){
                list = list + `
                <figure>
                    <a href="/topic/${result[cur].title}">
                    <img src="/uploads/${result[cur].img_name}"></a>
                    <figcaption>${result[cur].description}</figcaption>
                </figure>
                `;
                cur += 1;
            }
            list += `</div>`;

            var pageList = `<div id=page_list><ol>`;
            var i = 1;
            while(i < (result.length / postNum + 1)){
                if(i === Number(pageNum)){
                    pageList += `<strong><li><a href="/topic/browsing/${i}">[${i}]</a></li></strong>`;
                }
                else{
                    pageList += `<li><a href="/topic/browsing/${i}">[${i}]</a></li>`;
                }
                i += 1;
            }
            i += `</ol></div>`

            var authStatusUi = auth.statusUi(request, response);
            var html = template.html(list, authStatusUi, pageList);
            response.send(html)
        }
    )
});

router.get('/update/:pageId', (request, response) => {
    var filteredId = path.parse(request.params.pageId).base;
    db.query(`SELECT * FROM upload WHERE title=?`,[filteredId],function(error, result){
        if(request.session.nickname === result[0].author_id || request.session.nickname === 'admin'){
            var html = `     
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/css/style2.css">
                    <title>글 수정</title>
                </head>
                <body>
                    <form action = "/topic/update_process" method="post" enctype="multipart/form-data">
                    <div class ="main">
                    <input type="hidden" name="author_id" value="${request.session.nickname}">
                    <input type="hidden" name="upload_id" value="${result[0].id}">
                    <input type="file" name="img" />
                        <div class = "post-title">
                            <textarea class = "textarea-title" name="title" style = "height: 42px;">${result[0].title}</textarea>
                        </div>
                        <div class = "post-content">
                            <textarea class = "textarea-content" name="description" style = "height: 500px;">${result[0].description}</textarea>
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
        }
        else{
            response.send('작성자가 아닙니다');
        }
    }); 
});

router.post('/update_process',upload.single('img'), (request, response) => {
    var post = request.body;
    console.log("Arrive");
    console.log('post', request.body);
    db.query(`
        UPDATE upload SET title=?, description=?, img_name=? WHERE id=?`, [post.title, post.description,request.file.originalname, post.upload_id], (error, result) => {
            console.log('after db');
            if(error){
                throw error;
            }
            response.redirect(302, `/topic/${post.title}`);
        }
    );
})

module.exports = router;