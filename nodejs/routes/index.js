var express = require('express');
var router = express.Router();


router.get('/', function(request, response){
    var html = `
    <!DOCTYPE html>
    <html>
       <head>
            <meta charset="utf-8">
            <title>main</title>
            <link rel="stylesheet" href="/css/reset.css">
            <link rel="stylesheet" href="/css/style.css">
            <link href="https://fonts.googleapis.com/css2?family=Monoton&family=Roboto+Mono:wght@100;200;300;400;500;600;700&display=swap" rel="stylesheet">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="/js/slider.js"></script>
            <script src="https://kit.fontawesome.com/8efa19c011.js" crossorigin="anonymous"></script>
         </head>
        <body>
          <div class="overLay">
          </div>
          <div class="slider">
           <div class="background_01"></div>
           <div class="background_02"></div>
           <div class="background_03"></div>
           <div class="background_04"></div>
           </div>
    
           <div class="membership">
            <a href="/topic/login">sign in</a>
            <a href="/topic/join">sign up</a>
           </div>
           <div class="contents">
             <h1 class='contents_name'>WEB_14</h1>
              <div class="contents_searching">
                <form action="/topic/search_process" method="post">
                  <input type="text" name="term" placeholder="검색어 입력">
                  <button>검색</button>
                </form>
              </div>
              <div class="contents_main">
                <ul class="contents_list">
                  <li><a href="/topic/create"><i class="far fa-plus-square"></i></a><div style="color:#fbbc05">add</div></li>
                  <li><a href="#"><i class="fas fa-list"></i></a><div style="color:#fbbc05">list</div></li>
                  <li><a href="#"><i class="fas fa-hashtag"></i></a><div style="color:#fbbc05">tag</div></li>
                  <li><a href="#"><i class="fas fa-ellipsis-h"></i></a><div style="color:#fbbc05">more</div></li>
                </ul>
              </div>
           </div>
    
        </body>
    </html>
    `;
    response.send(html);
});

module.exports = router;