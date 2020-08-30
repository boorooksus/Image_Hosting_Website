CREATE TABLE `user` (
  `id` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);
 
 INSERT INTO `user` VALUES ('user01', '0000');
 INSERT INTO `user` VALUES ('user02', '0000');
 INSERT INTO `user` VALUES ('admin', 'admin');
 

-- 추가할 내용
ALTER TABLE user ADD COLUMN birth dateL;
ALTER TABLE user ADD COLUMN email varchar(30);

UPDATE user SET birth = "0000-00-00" , email = 'email@email.com' WHERE id = 'user01';
UPDATE user SET birth = "0000-00-00" , email = 'email@email.com' WHERE id = 'user02';
UPDATE user SET birth = "0000-00-00" , email = 'email@email.com' WHERE id = 'admin';


ALTER TABLE user MODIFY COLUMN birth date NOT NULL;
ALTER TABLE user MODIFY COLUMN email varchar(30) NOT NULL;

ALTER TABLE user MODIFY COLUMN password text NOT NULL;


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

