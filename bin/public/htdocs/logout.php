<?php
SESSION_START();
session_destroy(); //session_destroy: session을 파과하는 함수
 ?>
 <html>
  <head>
    <meta charset="utf-8" />
    <title> 로그아웃 </title>
  </head>
  <body>
    <p style="text-align: center;">로그아웃 되었습니다.</p> <!-- text-align: center: 가운데 정렬 -->
    <input type ="button" value="다시 로그인" onclick="location.href='http://localhost/register.html'"; />
  </body>
 </html>
