<!-- index.php --> <?php include "./db.php"; ?> <h1>회원가입</h1> <form method="POST" action="regok.php"> <input type="text" name="name" placeholder="Name" /> <br /> <input type="text" name="id" placeholder="ID" /> <br /> <input type="password" name="password" placeholder="Password" /><br /> <input type="password" name="repassword" placeholder="Re Password" /><br /> <button type="submit">제출</button><br /> <a href="select.php"><button type="button">필드 조회하러 가기</button></a> &nbsp;<br /> </form> <h1>로그인</h1> <form method="POST" action="logok.php"> <input type="text" name="id" placeholder="ID" /> <br /> <input type="password" name="password" placeholder="Password" /><br /> <button type="submit">제출</button><br /> </form> <?php if(isset($_SESSION['id'])){ ?> <h2><?php echo $_SESSION['name']; ?></h2> <?php } else { ?> <h2>로그인이 필요합니다.</h2> <?php } ?>

<?php
if(isset($_SESSION['id'])){
  ?>
  <a href="logout.php"><button type="button">로그아웃</button></a> &nbsp;<br />
  <?php
}
?>
