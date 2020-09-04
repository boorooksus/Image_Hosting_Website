var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var bcrypt = require('bcrypt');
var auth = require('../lib/auth.js');

// 로그인 페이지
router.get('/login', (request, response) => {
    var html = `        
    <!DOCTYPE html>
        <html>
        <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="/css/style-login.css">
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
            <input id="pwd" type="password" name="password" placeholder="Password">
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

// 로그아웃 처리
router.get('/logout', (request, response) => {
    request.session.destroy(function(err){
        response.redirect('/');
    });
})

// 회원가입 페이지
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
        <h3 id="signUp"><a href="/">WEB_14</a></h6>

        <h4 class="title">회원 가입</h4>
        <div id="grid">
            <ul>

            </ul>
            <div id="inputInfo">
                <form name="joinForm"  method="post">
                    <table>
                        <tr>
                            <td>아이디</td>
                            <td><input type="text" id="id" class="text" name="id" placeholder="아이디"
                                    onfocus="removeBlur(this)" onblur="blur(this)"></td>
                            <td><input type="button" value="아이디 체크" onclick="idCheck()"></td>
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

// 아이디 중복 체크
router.post('/idCheck', (request, response) => {
    var post = request.body;
    db.query(`SELECT * FROM user WHERE id=?`,[post.id],(err, res) => {
        if(err){
            throw err;
        }
        if(res.length !== 0){
            response.send(`
            <script>alert("이미 존재하는 아이디입니다")
            self.close();
            </script> 
            `);
            return;
        } else{
            response.send(`
            <script>alert("사용 가능한 아이디입니다")
            self.close();
            </script> 
            `);
            return;
        }
    });
})

// 로그인 처리
router.post('/login_process', (request, response)=>{
    var post = request.body;
    console.log('id: ', post.id);
    db.query(`SELECT * FROM user WHERE id = ?`,[post.id] ,(err, res) => {
        if(err){
            throw(err);
        }
        else if(res.length === 0){
            console.log('id not found');
            response.send(`
            <script>alert('id not found')
            window.history.back();
            </script> 
            `);
            return
        }
        bcrypt.compare(post.password, res[0].password).then(compare_result => {
            console.log('input: ' + post.password);
            console.log('db: ' + res[0].password);
            if(compare_result === true){
                request.session.is_logined = true;
                request.session.nickname = post.id;
                request.session.save(function(){
                    response.redirect(302, `/`);
                });
            } else{
                console.log('===password is not correct===');
                console.log('post.password: ', post.password);
                console.log('input: ', res[0].password);
                response.send(`
                <script>alert('password is not correct')
                window.history.back();
                </script> 
                `);
            }
        });
    })
})

// 회원가입 처리
router.post('/join_process', (request, response)=>{
    var post = request.body;
    db.query(`SELECT * FROM user WHERE id=?`,[post.id],(err, res) => {
        if(err){
            throw err;
        }
        if(res.length !== 0){
            response.send(`
            <script>alert("이미 존재하는 아이디입니다")
            window.history.back();
            </script> 
        `);
        return;
        }
    });
    bcrypt.hash(post.password, 12, function(err1, hash){
        db.query(`
        INSERT INTO user (id, password, birth, email) VALUE(?, ?, ?, ?)`, [post.id, hash, post.birth, post.email], (err, res) => {
            if(err){
                throw err;
            }
            response.redirect(302, `/auth/login`);
            
        }
        )
    });
});

// 회원 정보 수정 페이지
router.get('/modifyingMyInfo', (request, response) =>{
    if(!auth.isLogined(request, response)){
        response.send(`
            <script>alert("회원 정보 수정::로그인 후 이용 가능합니다")
            window.history.back();
            </script> 
        `);
        return;
    }
    var html = `     
    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="/css/style-signup.css">
        <script defer src="/js/script-signup.js"></script>
        <title>회원 정보 수정</title>
    </head>

    <body>
        <h3 id="signUp"><a href="/">WEB_14</a></h6>

        <h4 class="title">회원 정보 수정</h4>
        <div id="grid">
            <ul>

            </ul>
            <div id="inputInfo">
                <form name="joinForm" action="/auth/modifyingMyInfo_process" method="post">
                    <table>
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
                    <input class="btn_submit" type="button" value="회원 정보 수정" onclick="Judge.blank()">
                </form>
            </div>
        </div>

    </body>

    </html>
    `;
    response.send(html);
})

// 회원 정보 수정 처리
router.post('/modifyingMyInfo_process', (request, response) => {
    var post = request.body;
    bcrypt.hash(post.password, 12, function(err1, hash){
        db.query(`
        UPDATE user SET password=? , email=? WHERE id = '${request.session.nickname}'`, [hash, post.email], (err, res) => {
            if(err){
                throw err;
            }
            response.redirect(302, `/`);
        })
});
});

module.exports = router;