-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: e-maintenance-system
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` binary(16) NOT NULL,
  `user_name` varchar(200) NOT NULL,
  `password` varchar(1000) NOT NULL,
  `FirstName` varchar(100) NOT NULL DEFAULT '',
  `LastName` varchar(100) NOT NULL DEFAULT '',
  `role` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `profile_link` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (_binary '7j∑˜\"\ËMäª\Á˛\⁄Fe','fake7','1','Fake','User 7','user,staff','fake7@gmail.com','',NULL),(_binary 'S∑I#ñI´ñ˛8`ô','fake6','1','Fake','User 6','user,staff','fake6@gmail.com','',NULL),(_binary 'V´æ¥NG\ÍØ\ŸhCz&\œ','fake2','1','Fake','User 2','user,staff','fake2@gmail.com','',NULL),(_binary 'Z∑˚d\«9Ná±ãˇ!ô','fake1','1','Fake','User 1','user,staff','fake1@gmail.com','',NULL),(_binary 'É©◊¶\‡LAœπ_c™\∆˜Ø]','fake5','1','Fake','User 5','user,staff','fake5@gmail.com','',NULL),(_binary 'Ö\“\…$oìAìô\›yûº\Ãı¥','hoangcv','1','Chu','Hoang','user','mrgreencat99@gmail.com','',NULL),(_binary 'á\‹w§J æ\Ìk=!t¿`','fake9','1','Fake','User 9','user,staff','fake9@gmail.com','',NULL),(_binary 'âr˙®†ïE+ñ£!PpØ{','Sys Admin','1','Tung','','admin,user,sys_admin','tung.nd173451@sis.hust.edu.vn','0398825368',NULL),(_binary 'ä\Ì@ÛF\Îª|™≈≠∫?','Sub Admin','1','Nguyen','Tung','admin,user','noreply.tungnd310599@gmail.com','0379026110',NULL),(_binary '∏\0~çΩq@càÖ®\„\nñ\¬','fake3','1','Fake','User 3','user,staff','fake3@gmail.com','',NULL),(_binary '∫\nR|\€ÚE∏•kﬂ∏\\\»T˛','fake8','1','Fake','User 8','user,staff','fake8@gmail.com','',NULL),(_binary 'ø≤ü∑\·N\\ß⁄ã\Î#°îe','fake4','1','Fake','User 4','user,staff','fake4@gmail.com','',NULL);
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

-- Dump completed on 2023-05-23 23:26:19
