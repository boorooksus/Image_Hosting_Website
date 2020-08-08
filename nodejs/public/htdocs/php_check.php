<?php
$sqlConn = mysqli_connect("localhost","root","jodan815"/*,"user"*/); //mysqli_connect: DB에 연결하는 함수

 $user_id = $_POST['userid'];
 $user_pw = $_POST['userpw'];
 $user_pwa =$_POST['userpw_a'];
 $user_email = $_POST['useremail'];
 $user_name = $_POST['username'];

$select_query ="SELECT id FROM info";
$result_set = mysqli_query($sqlConn,$select_query); //mysqli_query: mysqli에 쿼리를 보내주는 함수
while($row = mysqli_fetch_assoc($result_set)) //mysqli_fetch_assoc: mysqli_query를 통해 얻은 $result_set에서 레코드(행, row)를 1개씩 리턴하는 함수
{
 if($user_id == $row['id'])
 {
   $num = 1;
   break;
 }
} // 아이디가 중복이면 변수 num에다가 1을 저장해 중복을 구별

if(($user_pw == $user_pwa) and $num!=1)
{
  $result = mysqli_query($sqlConn,"INSERT INTO info (id, password, passwordA, email, name)
  VALUES('$user_id','$user_pw','$user_pwa','$user_email','$user_name')"); //INSERT INTO ~ VALUES ~ : VALUES의 순서에 맞게 데이터 입력(열 형태)
  header("Location: http://localhost/register.html"); //가공되지 않은 HTTP 헤더 전송(?)
}
else if (($user_pw != $user_pwa) and $num==1)
{
  echo "<script>alert(\"아이디가 중복 되었습니다. 비밀번호가 일치하지 않습니다.\");</script>";
  echo "<script>
  document.location.href='http://localhost/join.php';
  </script>";
}
else if($num == 1)
{
  echo "<script>alert(\"아이디가 중복 되었습니다.\");</script>";
  echo "<script>
  document.location.href='http://localhost/join.php';
  </script>";
}
else
{
   echo "<script>alert(\"비밀번호가 일치하지 않습니다.\");</script>";
   echo "<script>
   document.location.href='http://localhost/join.php';
   </script>";
}
//행 = 로우(row) = 레코드(record), 열 = 컬럼(column) = 필드(field)
?>
