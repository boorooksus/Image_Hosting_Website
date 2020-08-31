-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: localhost    Database: forum
-- ------------------------------------------------------
-- Server version	8.0.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES UTF8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `upload`
--

DROP TABLE IF EXISTS `upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `upload` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created` datetime NOT NULL,
  `author_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `img_name` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `upload`
--

LOCK TABLES `upload` WRITE;
/*!40000 ALTER TABLE `upload` DISABLE KEYS */;
INSERT INTO `upload` VALUES (4,'bbq','Barbecue or barbeque (informally, BBQ; in Australia barbie, in South Africa braai) is a cooking method, a grilling device, a style of food, and a name for a meal or gathering at which this style of food is cooked and served.\r\n\r\nA barbecue can refer to the cooking method itself, the meat cooked this way, or to a type of social event featuring this type of cooking. Barbecuing is usually done outdoors by smoking meat over wood or charcoal. Restaurant barbecue may be cooked in large, specially-designed brick or metal ovens. Barbecue is practiced in many countries and there are numerous regional variations.\r\n\r\nBarbecuing techniques include smoking, roasting, and grilling. The technique for which it is named involves cooking using smoke at low temperatures and long cooking times (several hours). Grilling is done over direct, dry heat, usually over a hot fire for a few minutes.','2020-08-12 19:23:52','user02','hayes-potter-T0BCuwzKCyA-unsplash.jpg'),(5,'same_name - day','같은 이름의 사진 저장 했을 때','2020-08-12 19:29:40','user01','same_name.jpg'),(6,'same_name - night','같은 이름 저장했을 때2 - 야경','2020-08-12 19:31:11','user01','same_name.jpg'),(7,'same_name - evening','같은 이름 사진일 때 - 저녁 풍경','2020-08-12 19:33:05','user01','same_name.jpg'),(10,'flowers','flowers','2020-08-12 19:40:05','user01','annie-spratt-KQ6sO8m1ZDE-unsplash.jpg'),(11,'컴퓨터 사진','컴퓨터 사진~~~','2020-08-12 19:44:18','user01','xps-2L-0vnCnzcU-unsplash.jpg'),(12,'Odio','Odio taciti lacinia aenean interdum, cras irure pretium viverra mi vel euismod. Lorem quisque aliquam, nec elit suscipit, duis scelerisque. Lacus purus litora ligula massa, eget eleifend in nisl id adipiscing. Quam eget, ac velit mi, magna per fusce proin sollicitudin sed a, morbi consectetuer iaculis sed praesent, volutpat eget ut. Pellentesque convallis arcu, libero pulvinar sem morbi, pede nec tincidunt vestibulum elementum adipiscing, aliquam et vel lobortis donec duis. Purus nam eu, diam pede nulla ultricies nunc. Hendrerit sed at.','2020-08-13 00:04:42','user01','jade-scarlato-1OZF3M5EKwI-unsplash.jpg'),(13,'ac vel justo id','Lorem ipsum dolor sit amet, ligula porta eget massa vivamus, ac congue quisque purus hendrerit, quia lorem. Velit eu porttitor tincidunt orci ut, sapien maecenas cras id, euismod maecenas litora, quis cursus eu diam feugiat.\r\n','2020-08-13 00:05:25','user01','esther-wilhelmsson-gWdlu9YAcFg-unsplash.jpg'),(19,'dolora','dolor metus dolor minima','2020-08-13 00:40:07','user01','jarritos-mexican-soda-zgepXNFNjiA-unsplash.jpg'),(24,'iphone','Lorem ipsum dolor sit amet, montes velit dolor, nec arcu integer.','2020-08-13 00:52:40','user01','hello-i-m-nik-q1n1LmoL4Es-unsplash.jpg'),(25,'pineapple','Lorem ipsum dolor sit amet, ut id, eget augue morbi erat fringilla. Quis ut non quibusdam cursus etiam. Pellentesque a lectus fusce suspendisse, id placerat quis mauris sollicitudin felis, commodo vitae risus dolor torquent, tortor dictumst condimentum earum pede risus. In aliquam.','2020-08-13 00:53:33','user01','michael-c-VeTIz7Jpaow-unsplash.jpg'),(26,'korea','Nulla dictum nisl sapien, eget.','2020-08-13 09:52:11','user02','shawn-ang-nq4tcJz77r0-unsplash.jpg'),(27,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac rhoncus diam. Aenean ut consectetur quam. Morbi quis convallis ligula. Etiam mattis id purus ac vestibulum. Aliquam ut eros vehicula, euismod tellus vel, fringilla ex. Suspendisse nec lobortis est. Vestibulum lectus magna, tincidunt in viverra id, pretium ut purus. Phasellus quis porta orci. Integer vestibulum sagittis mauris, id molestie metus. Vivamus varius purus id leo tincidunt finibus. Vivamus auctor nibh arcu, quis mollis dui pulvinar ut. Cras vitae pretium mi.','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ac rhoncus diam. Aenean ut consectetur quam. Morbi quis convallis ligula. Etiam mattis id purus ac vestibulum. Aliquam ut eros vehicula, euismod tellus vel, fringilla ex. Suspendisse nec lobortis est. Vestibulum lectus magna, tincidunt in viverra id, pretium ut purus. Phasellus quis porta orci. Integer vestibulum sagittis mauris, id molestie metus. Vivamus varius purus id leo tincidunt finibus. Vivamus auctor nibh arcu, quis mollis dui pulvinar ut. Cras vitae pretium mi.','2020-08-13 11:16:37','user02','kelsey-curtis-OWwYniuOyiU-unsplash.jpg'),(31,'star2','Sagittis purus sit amet volutpat. ','2020-08-13 12:27:58','user01','tamas-tuzes-katai-FokPj_ZhMiY-unsplash.jpg'),(32,'nunc','nunc mattis enim ut tellus','2020-08-13 18:20:59','user01','ehud-neuhaus-PMvd4bp4EDY-unsplash.jpg'),(33,'tincidunt','수정 기능 테스트 - 다른 작성자가 작성하고 admin 계정으로 수정하는 경우: 작성자는 원래 작성자 그대로 표시됨','2020-08-13 18:22:43','user01','joanna-kosinska-bF2vsubyHcQ-unsplash.jpg'),(34,'proin','proin nibh nisl condimentum id','2020-08-13 18:23:40','user01','howard-bouchevereau-WSBCRMHR2qY-unsplash.jpg'),(35,'cat','검색 기능 테스트 - 제목에 검색 단어가 있는 경우','2020-08-13 18:26:17','user01','kabo-sR0cTmQHPug-unsplash.jpg'),(36,'dog','sodales ut eu sem integer','2020-08-13 18:47:01','user01','sj-objio-XCKSNjrjXQs-unsplash.jpg'),(37,'bird','enim sed faucibus turpis in. Vivamus auctor nibh arcu, quis mollis dui pulvinar ut. Cras vitae pretium mi.','2020-08-13 18:52:31','user01','wolfgang-hasselmann-J20Gz5oSEN8-unsplash.jpg'),(38,'vitae2','vitae et leo duis ut2','2020-08-13 18:53:49','user01','eiliv-sonas-aceron-HbI5748MWI4-unsplash.jpg'),(39,'ultrices','nulla posuere sollicitudin aliquam ultrices','2020-08-13 18:56:13','user01','chuttersnap-2cG2-NJ3c4o-unsplash.jpg'),(40,'bibendum','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Est ullamcorper eget nulla facilisi etiam dignissim. Eu non diam phasellus vestibulum lorem. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Arcu dui vivamus arcu felis bibendum ut.','2020-08-13 18:57:40','user01','antoine-gayraud-vNffYbM-50k-unsplash.jpg'),(42,'Ut ','Ut pretium sem vel interdum posuere. am. ','2020-08-13 23:49:01','user01','jack-o-rourke-xJ1RlmD_hHU-unsplash.jpg'),(43,'diam','Non diam phasellus vestibulum lorem sed risus ultricies tristique. Adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus. ','2020-08-14 12:20:49','admin','sawyer-bengtson-YaSH0DbU5lE-unsplash.jpg'),(44,'search_test',' This is a cat!!!','2020-08-14 12:21:41','admin','marnhe-du-plooy-U6u_A5z6mME-unsplash.jpg');
/*!40000 ALTER TABLE `upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `birth` date NOT NULL,
  `email` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31 21:06:17
