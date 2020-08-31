<?php
     session_start(); //session: 통신 과정에서 서로를 인식하고 통신을 마칠 때까지의 기간, session_start(): 세션 초기화 함수
   $sqlConn = mysqli_connect("localhost","root","jodan815"/*,"user"*/); //mysqli_connect: DB에 연결하는 함수, "user" 사용 시 알 수 없는 오류 발생함

    $id = $_POST['loginID']; //$_POST: POST 방식으로 전송된 값을 받는 함수
    $pass = $_POST['loginPW'];

    $getID = "SELECT *FROM info WHERE id='$id'"; //info에서 WHERE 조건을 만족하는 id값을 전부 불러온다. *가 전부라는 뜻
    $got = $sqlConn->query($getID); //->: 객체 내 속성을 가르킴, query(): SELECT 쿼리 실행할 때 사용한다고 함(?). query: 데이터베이스에 보내는 요청(질문)
    $An = $got->fetch_array(MYSQLI_BOTH); //!!!오류 발생함. 원인은 $got의 값이 false라서.
    if($An['id'] == $id)
    {
        if($An['password']==$pass)
        {
                $_SESSION['id'] = $An['id']; //$_SESSION: 세션 변수
                $_SESSION['password'] = $An['password'];
                echo "<script>
            document.location.href='http://localhost/member.php';
            </script>"; //document.location.href='URL': 해당 URL로 이동. 직접 주소창에 URL를넣고 엔터를 치는 것과 같은 효과
        }
        else{
            echo "<script>alert(\"PASSWORD가 일치하지 않습니다.\");</script>"; //alert: 단순에 메세지만 전달. 반환값 없음
        echo "<script>
        document.location.href='http://localhost/register.html';
        </script>";
        }
    }
    else {
        echo "<script>alert(\"ID와 PASSWORD가 일치하지 않습니다.\");</script>";
        echo "<script>
        document.location.href='http://localhost/register.html';
        </script>";
    }
    $got->free(); //!!!free(): 뭔지 모르겠음... php 함수인지 javascript 함수인지 모르겠음
    //MySQL과 MySQLi의 차이점: MySQLi가 더 진보된 것 

?>
