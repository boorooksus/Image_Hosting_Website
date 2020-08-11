var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');


router.get('/login', (request, response) => {
    var html = `        
    <!DOCTYPE html>
        <html>
        <head>
        <style>
            html{
            background-image:url(/images/nyc.jpg);
            background-repeat:no-repeat;
            background-size:cover;
            }
            div{
            text-align:center;
            /* border:1px solid gray; */
            }
            button{
            float:center;
            }
            #idn, #pwd{
            border:3px solid white;
            border-radius:8px;
            color:black;
            height:40px;
            width:600px;
            font-size:20pt;
            background:white;
            margin:3px;
            opacity:0.7;
            }
            button{
            border:1px solid orange;
            border-radius:8px;
            color:white;
            height:40px;
            width:610px;
            font-size:18pt;
            background:orange;
            margin:3px;
            }
            #cbw{
            color:white;
            }
            h1{
            margin:130px;
            font-size:50pt;
            color:white;
            }
            a{
            color:white;
            }
            #a{
            margin:30px;
            }
        </style>
        </head>
        <body>
        <form action="/auth/login_process" method="post">
            <div>
            <h1>
                Welcome!
            </h1>
            </div>
            <div>
            <input id="idn" type="text" name="id" placeholder="ID">
            </div>
            <div>
            <input id="pwd" type="password" name="pwd" placeholder="Password">
            </div>
            <div>
            <button type="submit">Login</button>
            </div>
            <div id="cbw">
            <label>
                <input id="cb" type="checkbox" name="size">로그인 상태 유지
            </label>
            </div>
            <div id="a">
            <a href="inha2.html" target="_blank">아이디 찾기</a>
            <a href="inha3.html" target="_blank">비밀번호 찾기</a>
            <a href="https://haha/joining.php">회원가입</a>
            </div>
        </form>
        </body>
        </html>
    `;
    response.send(html);
});

router.get('/logout', (request, response) => {
    request.session.destroy(function(err){
        response.redirect('/');
    });
})

router.post('/login_process', (request, response)=>{
    var post = request.body;

    db.query(`SELECT * FROM user WHERE id = ${post.id}`,(err, res) => {
        if(err){
            throw(err);
        }
        else if(res.length === 0){
            response.send('login failed');
        }
        else if(res[0].password !== post.password){
            response.send('login failed');
        }
        else{
            request.session.is_logined = true;
            request.session.id = post.id
            // session 객체의 데이터를 session store에 반영.
            request. session.save(function(){
                // call back 함수로 메인 페이지로 redirection하게 해서 session 저장 작업이 끝난 후에 수행하게함. 이렇게 안하면 session 저장이 끝나기 전에 redirection이 되서 로그인 안된 채로 메인화면으로 갈 수도 있음
                response.redirect(302, `/`);
            });
        }
    })
})

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

module.exports = router;