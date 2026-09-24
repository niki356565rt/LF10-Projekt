-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: smart_restaurant
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `smart_restaurant`
--

/*!40000 DROP DATABASE IF EXISTS `smart_restaurant`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `smart_restaurant` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `smart_restaurant`;

--
-- Table structure for table `artikel`
--

DROP TABLE IF EXISTS `artikel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `artikel` (
  `artikel_id` int(11) NOT NULL AUTO_INCREMENT,
  `kategorie_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `preis` decimal(10,2) NOT NULL,
  `aktiv` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`artikel_id`),
  UNIQUE KEY `uq_artikel_name_kategorie` (`name`,`kategorie_id`),
  KEY `fk_artikel_kategorie` (`kategorie_id`),
  CONSTRAINT `fk_artikel_kategorie` FOREIGN KEY (`kategorie_id`) REFERENCES `kategorie` (`kategorie_id`) ON UPDATE CASCADE,
  CONSTRAINT `ck_artikel_preis` CHECK (`preis` >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artikel`
--

LOCK TABLES `artikel` WRITE;
/*!40000 ALTER TABLE `artikel` DISABLE KEYS */;
INSERT INTO `artikel` VALUES (1,1,'Tomatensuppe mit Basilikum',6.50,1),(2,1,'Bruschetta Originale',7.90,1),(3,2,'Wiener Schnitzel vom Kalb mit Pommes',22.50,1),(4,2,'Rumpsteak 250g mit Kr├ñuterbutter',26.90,1),(5,2,'Penne Arrabiata (scharf)',12.50,1),(6,2,'Burger \"Smart Classic\" mit Fritten',16.80,1),(7,3,'Tiramisu Hausgemacht',6.90,1),(8,3,'Apfelstrudel mit Vanilleeis',6.50,1),(9,4,'Mineralwasser 0.5l',3.50,1),(10,4,'Coca-Cola 0.4l',4.20,1),(11,4,'Apfelschorle 0.4l',3.90,1),(12,5,'Espresso',2.80,1),(13,5,'Cappuccino',3.80,1),(14,6,'Pils vom Fass 0.5l',4.80,1),(15,6,'Grauburgunder 0.2l',6.20,1);
/*!40000 ALTER TABLE `artikel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellposition`
--

DROP TABLE IF EXISTS `bestellposition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bestellposition` (
  `bestellposition_id` int(11) NOT NULL AUTO_INCREMENT,
  `bestellung_id` int(11) NOT NULL,
  `artikel_id` int(11) NOT NULL,
  `menge` int(11) NOT NULL,
  `einzelpreis` decimal(10,2) NOT NULL,
  PRIMARY KEY (`bestellposition_id`),
  UNIQUE KEY `uq_bestellposition_bestellung_artikel` (`bestellung_id`,`artikel_id`),
  KEY `fk_bestellposition_artikel` (`artikel_id`),
  CONSTRAINT `fk_bestellposition_artikel` FOREIGN KEY (`artikel_id`) REFERENCES `artikel` (`artikel_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_bestellposition_bestellung` FOREIGN KEY (`bestellung_id`) REFERENCES `bestellung` (`bestellung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ck_bestellposition_menge` CHECK (`menge` > 0),
  CONSTRAINT `ck_bestellposition_einzelpreis` CHECK (`einzelpreis` >= 0)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellposition`
--

LOCK TABLES `bestellposition` WRITE;
/*!40000 ALTER TABLE `bestellposition` DISABLE KEYS */;
INSERT INTO `bestellposition` VALUES (1,1,1,1,6.50),(2,1,3,1,22.50),(3,1,10,2,4.20),(4,1,12,1,2.80),(5,2,2,2,7.90),(6,2,4,2,26.90),(7,2,14,3,4.80),(8,2,7,2,6.90),(9,3,6,2,16.80),(10,3,5,1,12.50),(11,3,11,3,3.90),(12,4,8,2,6.50),(13,4,13,2,3.80);
/*!40000 ALTER TABLE `bestellposition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellstatus`
--

DROP TABLE IF EXISTS `bestellstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bestellstatus` (
  `bestellstatus_id` int(11) NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(30) NOT NULL,
  PRIMARY KEY (`bestellstatus_id`),
  UNIQUE KEY `uq_bestellstatus_bezeichnung` (`bezeichnung`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellstatus`
--

LOCK TABLES `bestellstatus` WRITE;
/*!40000 ALTER TABLE `bestellstatus` DISABLE KEYS */;
INSERT INTO `bestellstatus` VALUES (1,'aufgegeben'),(5,'bezahlt'),(3,'fertig'),(2,'in Bearbeitung'),(4,'serviert');
/*!40000 ALTER TABLE `bestellstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bestellung`
--

DROP TABLE IF EXISTS `bestellung`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bestellung` (
  `bestellung_id` int(11) NOT NULL AUTO_INCREMENT,
  `tisch_id` int(11) NOT NULL,
  `erstellt_von` int(11) NOT NULL,
  `bestellstatus_id` int(11) NOT NULL,
  `erstellt_am` timestamp NOT NULL DEFAULT current_timestamp(),
  `bezahlt_am` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`bestellung_id`),
  KEY `fk_bestellung_tisch` (`tisch_id`),
  KEY `fk_bestellung_mitarbeiter` (`erstellt_von`),
  KEY `fk_bestellung_bestellstatus` (`bestellstatus_id`),
  CONSTRAINT `fk_bestellung_bestellstatus` FOREIGN KEY (`bestellstatus_id`) REFERENCES `bestellstatus` (`bestellstatus_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_bestellung_mitarbeiter` FOREIGN KEY (`erstellt_von`) REFERENCES `mitarbeiter` (`mitarbeiter_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_bestellung_tisch` FOREIGN KEY (`tisch_id`) REFERENCES `tisch` (`tisch_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bestellung`
--

LOCK TABLES `bestellung` WRITE;
/*!40000 ALTER TABLE `bestellung` DISABLE KEYS */;
INSERT INTO `bestellung` VALUES (1,1,1,5,'2026-09-24 04:25:07','2026-09-24 05:55:07'),(2,2,1,4,'2026-09-24 05:25:07',NULL),(3,4,2,2,'2026-09-24 06:05:07',NULL),(4,4,2,1,'2026-09-24 06:20:07',NULL);
/*!40000 ALTER TABLE `bestellung` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `kategorie`
--

DROP TABLE IF EXISTS `kategorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `kategorie` (
  `kategorie_id` int(11) NOT NULL AUTO_INCREMENT,
  `zubereitungsort_id` int(11) NOT NULL,
  `bezeichnung` varchar(50) NOT NULL,
  PRIMARY KEY (`kategorie_id`),
  UNIQUE KEY `uq_kategorie_bezeichnung` (`bezeichnung`),
  KEY `fk_kategorie_zubereitungsort` (`zubereitungsort_id`),
  CONSTRAINT `fk_kategorie_zubereitungsort` FOREIGN KEY (`zubereitungsort_id`) REFERENCES `zubereitungsort` (`zubereitungsort_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `kategorie`
--

LOCK TABLES `kategorie` WRITE;
/*!40000 ALTER TABLE `kategorie` DISABLE KEYS */;
INSERT INTO `kategorie` VALUES (1,1,'Vorspeisen'),(2,1,'Hauptspeisen'),(3,1,'Desserts'),(4,2,'Alkoholfreie Getr├ñnke'),(5,2,'Hei├ƒgetr├ñnke'),(6,2,'Bier & Wein');
/*!40000 ALTER TABLE `kategorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mitarbeiter`
--

DROP TABLE IF EXISTS `mitarbeiter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mitarbeiter` (
  `mitarbeiter_id` int(11) NOT NULL AUTO_INCREMENT,
  `rolle_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `benutzername` varchar(50) NOT NULL,
  `aktiv` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`mitarbeiter_id`),
  UNIQUE KEY `uq_mitarbeiter_benutzername` (`benutzername`),
  KEY `fk_mitarbeiter_rolle` (`rolle_id`),
  CONSTRAINT `fk_mitarbeiter_rolle` FOREIGN KEY (`rolle_id`) REFERENCES `rolle` (`rolle_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mitarbeiter`
--

LOCK TABLES `mitarbeiter` WRITE;
/*!40000 ALTER TABLE `mitarbeiter` DISABLE KEYS */;
INSERT INTO `mitarbeiter` VALUES (1,1,'Anna Service','aservice',1),(2,1,'Ben Kellner','bkellner',1),(3,2,'Karl Koch','kkoch',1),(4,2,'Maria Chefkoch','mchef',1),(5,3,'Chef Admin','admin',1);
/*!40000 ALTER TABLE `mitarbeiter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolle`
--

DROP TABLE IF EXISTS `rolle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolle` (
  `rolle_id` int(11) NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(30) NOT NULL,
  PRIMARY KEY (`rolle_id`),
  UNIQUE KEY `uq_rolle_bezeichnung` (`bezeichnung`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolle`
--

LOCK TABLES `rolle` WRITE;
/*!40000 ALTER TABLE `rolle` DISABLE KEYS */;
INSERT INTO `rolle` VALUES (3,'Administration'),(2,'K├╝che'),(1,'Service');
/*!40000 ALTER TABLE `rolle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `statusprotokoll`
--

DROP TABLE IF EXISTS `statusprotokoll`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `statusprotokoll` (
  `statusprotokoll_id` int(11) NOT NULL AUTO_INCREMENT,
  `bestellung_id` int(11) NOT NULL,
  `mitarbeiter_id` int(11) NOT NULL,
  `bestellstatus_id` int(11) NOT NULL,
  `geaendert_am` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`statusprotokoll_id`),
  KEY `fk_statusprotokoll_bestellung` (`bestellung_id`),
  KEY `fk_statusprotokoll_mitarbeiter` (`mitarbeiter_id`),
  KEY `fk_statusprotokoll_bestellstatus` (`bestellstatus_id`),
  CONSTRAINT `fk_statusprotokoll_bestellstatus` FOREIGN KEY (`bestellstatus_id`) REFERENCES `bestellstatus` (`bestellstatus_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_statusprotokoll_bestellung` FOREIGN KEY (`bestellung_id`) REFERENCES `bestellung` (`bestellung_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_statusprotokoll_mitarbeiter` FOREIGN KEY (`mitarbeiter_id`) REFERENCES `mitarbeiter` (`mitarbeiter_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statusprotokoll`
--

LOCK TABLES `statusprotokoll` WRITE;
/*!40000 ALTER TABLE `statusprotokoll` DISABLE KEYS */;
INSERT INTO `statusprotokoll` VALUES (1,1,1,1,'2026-09-24 04:25:07'),(2,1,3,2,'2026-09-24 04:35:07'),(3,1,3,3,'2026-09-24 04:55:07'),(4,1,1,4,'2026-09-24 05:05:07'),(5,1,1,5,'2026-09-24 05:55:07'),(6,2,1,1,'2026-09-24 05:25:07'),(7,2,4,2,'2026-09-24 05:35:07'),(8,2,4,3,'2026-09-24 05:50:07'),(9,2,1,4,'2026-09-24 06:00:07'),(10,3,2,1,'2026-09-24 06:05:07'),(11,3,3,2,'2026-09-24 06:10:07'),(12,4,2,1,'2026-09-24 06:20:07');
/*!40000 ALTER TABLE `statusprotokoll` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tisch`
--

DROP TABLE IF EXISTS `tisch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tisch` (
  `tisch_id` int(11) NOT NULL AUTO_INCREMENT,
  `tischstatus_id` int(11) NOT NULL,
  `tischnummer` int(11) NOT NULL,
  `kapazitaet` int(11) NOT NULL,
  PRIMARY KEY (`tisch_id`),
  UNIQUE KEY `uq_tisch_tischnummer` (`tischnummer`),
  KEY `fk_tisch_tischstatus` (`tischstatus_id`),
  CONSTRAINT `fk_tisch_tischstatus` FOREIGN KEY (`tischstatus_id`) REFERENCES `tischstatus` (`tischstatus_id`) ON UPDATE CASCADE,
  CONSTRAINT `ck_tisch_kapazitaet` CHECK (`kapazitaet` between 2 and 8)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tisch`
--

LOCK TABLES `tisch` WRITE;
/*!40000 ALTER TABLE `tisch` DISABLE KEYS */;
INSERT INTO `tisch` VALUES (1,2,1,2),(2,2,2,4),(3,1,3,4),(4,2,4,6),(5,1,5,8),(6,1,6,2),(7,1,7,4),(8,1,8,6);
/*!40000 ALTER TABLE `tisch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tischstatus`
--

DROP TABLE IF EXISTS `tischstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tischstatus` (
  `tischstatus_id` int(11) NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(20) NOT NULL,
  PRIMARY KEY (`tischstatus_id`),
  UNIQUE KEY `uq_tischstatus_bezeichnung` (`bezeichnung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tischstatus`
--

LOCK TABLES `tischstatus` WRITE;
/*!40000 ALTER TABLE `tischstatus` DISABLE KEYS */;
INSERT INTO `tischstatus` VALUES (2,'belegt'),(1,'frei');
/*!40000 ALTER TABLE `tischstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `zubereitungsort`
--

DROP TABLE IF EXISTS `zubereitungsort`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `zubereitungsort` (
  `zubereitungsort_id` int(11) NOT NULL AUTO_INCREMENT,
  `bezeichnung` varchar(20) NOT NULL,
  PRIMARY KEY (`zubereitungsort_id`),
  UNIQUE KEY `uq_zubereitungsort_bezeichnung` (`bezeichnung`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zubereitungsort`
--

LOCK TABLES `zubereitungsort` WRITE;
/*!40000 ALTER TABLE `zubereitungsort` DISABLE KEYS */;
INSERT INTO `zubereitungsort` VALUES (2,'Bar'),(1,'K├╝che');
/*!40000 ALTER TABLE `zubereitungsort` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'smart_restaurant'
--

--
-- Dumping routines for database 'smart_restaurant'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-24  8:25:59
