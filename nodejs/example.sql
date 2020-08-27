CREATE TABLE `user` (
  `id` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);
 
 INSERT INTO `user` VALUES ('user01', '0000');
 INSERT INTO `user` VALUES ('user02', '0000');
 INSERT INTO `user` VALUES ('admin', 'admin');
 

-- 추가할 내용
ALTER TABLE user ADD COLUMN birth date NOT NULL;
ALTER TABLE user ADD COLUMN email varchar(30) NOT NULL;

UPDATE user SET birth = 0000-00-00 , email = 'email@email.com' WHERE id = 'user01';
UPDATE user SET birth = 0000-00-00 , email = 'email@email.com' WHERE id = 'user02';
UPDATE user SET birth = 0000-00-00 , email = 'email@email.com' WHERE id = 'admin';


--
-- Table structure for table `topic`
--
 
CREATE TABLE `upload` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` text,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` varchar(20) NOT NULL,
  `img_name` varchar(60) NOT NULL,
  PRIMARY KEY (`id`)
);

ALTER TABLE upload MODIFY title text NOT NULL;


출처: https://extbrain.tistory.com/39 [확장형 뇌 저장소] 
--
-- Dumping data for table `topic`
--
 
INSERT INTO `topic` VALUES (1,'MySQL','MySQL is...','2018-01-01 12:10:11',1);
INSERT INTO `topic` VALUES (2,'Oracle','Oracle is ...','2018-01-03 13:01:10',1);
INSERT INTO `topic` VALUES (3,'SQL Server','SQL Server is ...','2018-01-20 11:01:10',2);
INSERT INTO `topic` VALUES (4,'PostgreSQL','PostgreSQL is ...','2018-01-23 01:03:03',3);
INSERT INTO `topic` VALUES (5,'MongoDB','MongoDB is ...','2018-01-30 12:31:03',1);