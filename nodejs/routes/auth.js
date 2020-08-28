var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');

router.get('/login', (request, response) => {
    var html = `        
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/style-login.css">
        </head>
        <body>
        <form action="/auth/login_proces" method="post">
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
            <!-- <div>
            <label>
                <input id="cbw" type="checkbox" name="size">로그인 상태 유지
            </label>
            </div> -->
            <div id="a">
            <a id="a1" href="#" style="text-decoration:none" target="_blank">아이디 찾기</a>
            <a id="a2" href="#" style="text-decoration:none" target="_blank">비밀번호 찾기</a>
            <a id="a3" href="/auth/join" style="text-decoration:none" target="_blank">회원가입</a>
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
    console.log('id: ', post.id);
    db.query(`SELECT * FROM user WHERE id = ?`,[post.id] ,(err, res) => {
        if(err){
            throw(err);
        }
        else if(res.length === 0){
            console.log('id not found');
            response.send('login failed');
        }
        else if(res[0].password !== `${post.password}`){
            console.log('===password is not correct===');
            console.log('post.password: ', post.password);
            console.log('input: ', res[0].password);
            response.send('login failed');
        }
        else{
            request.session.is_logined = true;
            request.session.nickname = post.id;
            // session 객체의 데이터를 session store에 반영.
            request.session.save(function(){
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
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/style-signup.css">
        <script defer src="/js/script-signup.js"></script>
        <title>SignUp</title>
    </head>

    <body>
        <h6 id="signUp"><a href="/auth/join">회원 가입</a></h6>
        <img src="smile.jpg" alt="Add Image" width="1000px" height="350px">
        <h4 class="title">회원 가입</h4>
        <div id="grid">
            <ul>
                <li>전체 글 보기</li>
                <br>
                <li>게시판1</li>
                <li>게시판2</li>
                <li>게시판3</li>
                <li>게시판4</li>
            </ul>
            <div id="inputInfo">
                <form name="joinForm" action="/auth/join_process" method="post">
                    <table>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" id="id" class="text" name="id" placeholder="아이디"
                                    onfocus="removeBlur(this)" onblur="blur(this)"></td>
                        </tr>
                        <tr>
                            <td>비밀번호</td>
                            <td><input type="password" id="password" class="text" name="password"
                                    placeholder="비밀번호(숫자, 영어조합 10자 이상)" onfocus="removeBlur(this)" onblur="blur(this)"
                                    onkeyup="Judge.correct(this)"></td>
                        </tr>
                    </table>
                    <p id="judgement_1"></p>
                    <table>
                        <tr>
                            <td>비밀번호 확인</td>
                            <td><input type="password" id="pass_check" class="text" name="passwordCheck"
                                    placeholder="비밀번호 확인" onfocus="removeBlur(this)" onblur="blur(this)"
                                    onkeyup="Judge.same(this)"></td>
                        </tr>
                    </table>
                    <p id="judgement_2"></p>
                    <table>
                        <tr>
                            <td>이름</td>
                            <td><input type="text" id="name" name="name" class="text" onfocus="removeBlur(this)"
                                    placeholder="이름" onblur="blur(this)">
                            </td>
                        </tr>
                        <tr>
                            <td>생년월일</td>
                            <td><input type="date" id="birth" name="birth" class="text" onfocus="removeBlur(this)"
                                    onblur="blur(this)">
                            </td>
                        </tr>
                        <tr>
                            <td>이메일</td>
                            <td><input type="email" id="email" class="text" name="email" onfocus="removeBlur(this)"
                                    placeholder="이메일" onblur="blur(this)"></td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <td>성별</td>
                            <td><input type="button" id="male" name="male" value="남" onclick="gender(this, '#female')"></td>
                            <td><input type="button" id="female" name="female" value="여" onclick="gender(this, '#male')">
                            </td>
                        </tr>
                    </table>
                    <br>
                    <br>
                    <br>
                    <input class="btn_submit" type="button" value="회원가입" onclick="Judge.blank()">
                </form>
            </div>
        </div>

    </body>

    </html>
    `;
    response.send(html);
});

router.post('/join_process', (request, response)=>{
    console.log('hi');
    // 수정해야할 부분==================================
    var post = request.body;

    db.query(`
        INSERT INTO user (id, password, birth, email) VALUE(?, ?, ?, ?)`, [post.id, post.password, post.birth, post.email], (err, res) => {
            if(err){
                throw err;
            }
            response.redirect(302, `/auth/login`);
            
        }
    )

    // db.query(`SELECT * FROM user WHERE id = ?`,[post.id],(err, res) => {
    //     if(err){
    //         throw(err);
    //     }
    //     else if(res.length === 0){
    //         console.log('id not found');
    //         response.send('login failed');
    //     }
    //     else if(res[0].password !== `${post.password}`){
    //         console.log('===password is not correct===');
    //         console.log('post.password: ', post.password);
    //         console.log('input: ', res[0].password);
    //         response.send('login failed');
    //     }
    //     else{
    //         request.session.is_logined = true;
    //         request.session.nickname = post.id;
    //         // session 객체의 데이터를 session store에 반영.
    //         request.session.save(function(){
    //             // call back 함수로 메인 페이지로 redirection하게 해서 session 저장 작업이 끝난 후에 수행하게함. 이렇게 안하면 session 저장이 끝나기 전에 redirection이 되서 로그인 안된 채로 메인화면으로 갈 수도 있음
    //             response.redirect(302, `/`);
    //         });
    //     }
    // })
    //===================================================
});

module.exports = router;