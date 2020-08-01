<?php SESSION_START(); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>회원페이지</title>
  </head>
  <body>
    <p style="text-align : center;">환영합니다.
    <?php if(isset($_SESSION['id']))
    {
      echo $_SESSION['id'].'님';
    }?></p>
    <input type = "button" value ="로그아웃" onclick = "location.href='http://localhost/logout.php'"; />
    </p>
  </body>
</html>
