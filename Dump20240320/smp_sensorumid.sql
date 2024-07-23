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
-- Table structure for table `sensorumid`
--

DROP TABLE IF EXISTS `sensorumid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sensorumid` (
  `idSensor` varchar(255) NOT NULL,
  `numSerie` varchar(255) NOT NULL,
  `fabricante` varchar(255) NOT NULL,
  `coordenadaX` int DEFAULT NULL,
  `coodernadaY` int DEFAULT NULL,
  `maxUmid` float NOT NULL,
  `minUmid` float NOT NULL,
  `idMaquina` varchar(255) NOT NULL,
  `habilitada` tinyint DEFAULT '1',
  PRIMARY KEY (`idSensor`,`idMaquina`),
  KEY `fk_SensorUmid_Maquina1_idx` (`idMaquina`),
  CONSTRAINT `fk_SensorUmid_Maquina1` FOREIGN KEY (`idMaquina`) REFERENCES `maquina` (`idMaquina`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sensorumid`
--

LOCK TABLES `sensorumid` WRITE;
/*!40000 ALTER TABLE `sensorumid` DISABLE KEYS */;
INSERT INTO `sensorumid` VALUES ('FAB2UMID456','456','fab2',NULL,NULL,90,10,'FAB1MOD1123',1);
/*!40000 ALTER TABLE `sensorumid` ENABLE KEYS */;
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
