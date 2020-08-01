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
