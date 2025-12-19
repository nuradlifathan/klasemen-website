-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: klasemen-web
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `klubs`
--

DROP TABLE IF EXISTS `klubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `klubs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nama_klub` varchar(25) NOT NULL,
  `kota_klub` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `skors`
--

DROP TABLE IF EXISTS `skors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `skor_klub1` int NOT NULL,
  `skor_klub2` int NOT NULL,
  `id_klub1` int DEFAULT NULL,
  `id_klub2` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_klub1` (`id_klub1`),
  KEY `id_klub2` (`id_klub2`),
  CONSTRAINT `skors_ibfk_1` FOREIGN KEY (`id_klub1`) REFERENCES `klubs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `skors_ibfk_2` FOREIGN KEY (`id_klub2`) REFERENCES `klubs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `skors_ibfk_3` FOREIGN KEY (`id_klub1`) REFERENCES `klubs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `skors_ibfk_4` FOREIGN KEY (`id_klub2`) REFERENCES `klubs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-11  0:29:51
