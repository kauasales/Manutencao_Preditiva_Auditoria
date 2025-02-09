-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: smp
-- ------------------------------------------------------
-- Server version	8.2.0

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
-- Table structure for table `tempcoletada`
--

DROP TABLE IF EXISTS `tempcoletada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempcoletada` (
  `valor` float NOT NULL,
  `dataColeta` date NOT NULL,
  `horaColeta` time NOT NULL,
  `idSensor` varchar(255) NOT NULL,
  PRIMARY KEY (`idSensor`,`dataColeta`,`horaColeta`),
  CONSTRAINT `fk_TempColetada_SensorTemp1` FOREIGN KEY (`idSensor`) REFERENCES `sensortemp` (`idSensor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempcoletada`
--

LOCK TABLES `tempcoletada` WRITE;
/*!40000 ALTER TABLE `tempcoletada` DISABLE KEYS */;
INSERT INTO `tempcoletada` VALUES (33,'2024-03-19','09:00:00','FAB1TEMP123'),(37,'2024-03-19','10:00:00','FAB1TEMP123'),(27,'2024-03-19','11:00:00','FAB1TEMP123'),(35,'2024-03-19','12:00:00','FAB1TEMP123'),(46,'2024-03-19','13:00:00','FAB1TEMP123'),(36,'2024-03-19','14:00:00','FAB1TEMP123'),(30,'2024-03-19','15:00:00','FAB1TEMP123'),(23,'2024-03-19','16:00:00','FAB1TEMP123'),(34,'2024-03-19','17:00:00','FAB1TEMP123'),(41,'2024-03-19','18:00:00','FAB1TEMP123'),(48,'2024-03-19','19:00:00','FAB1TEMP123'),(32,'2024-03-19','20:00:00','FAB1TEMP123'),(45,'2024-03-19','21:00:00','FAB1TEMP123'),(40,'2024-03-19','22:00:00','FAB1TEMP123'),(35,'2024-03-19','23:00:00','FAB1TEMP123'),(29,'2024-03-20','00:00:00','FAB1TEMP123'),(47,'2024-03-20','01:00:00','FAB1TEMP123'),(30,'2024-03-20','02:00:00','FAB1TEMP123'),(42,'2024-03-20','03:00:00','FAB1TEMP123'),(50,'2024-03-20','04:00:00','FAB1TEMP123'),(27.5,'2024-03-20','05:00:00','FAB1TEMP123'),(32.5,'2024-03-20','06:00:00','FAB1TEMP123'),(40,'2024-03-20','07:00:00','FAB1TEMP123'),(20,'2024-03-20','08:00:00','FAB1TEMP123');
/*!40000 ALTER TABLE `tempcoletada` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-20  9:15:40
