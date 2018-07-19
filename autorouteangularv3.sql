-- MySQL dump 10.13  Distrib 8.0.11, for Linux (x86_64)
--
-- Host: localhost    Database: autorouteangularv3
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8mb4 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `autorouteangularv3`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `autorouteangularv3` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `autorouteangularv3`;

--
-- Table structure for table `abonnement`
--

DROP TABLE IF EXISTS `abonnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `abonnement` (
  `nom` varchar(10) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `prix` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `abonnement`
--

LOCK TABLES `abonnement` WRITE;
/*!40000 ALTER TABLE `abonnement` DISABLE KEYS */;
INSERT INTO `abonnement` VALUES ('basic','definir',10.99),('premium','definir',15.99),('premium+','definir',20.99),('VIP','definir',30.99);
/*!40000 ALTER TABLE `abonnement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aireAutoroute`
--

DROP TABLE IF EXISTS `aireAutoroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `aireAutoroute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(30) NOT NULL,
  `jeuxEnfants` tinyint(1) DEFAULT NULL,
  `brumisateur` tinyint(1) DEFAULT NULL,
  `nomAutoroute` varchar(5) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nomAutoroute` (`nomAutoroute`),
  CONSTRAINT `aireAutoroute_ibfk_1` FOREIGN KEY (`nomAutoroute`) REFERENCES `autoroute` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aireAutoroute`
--

LOCK TABLES `aireAutoroute` WRITE;
/*!40000 ALTER TABLE `aireAutoroute` DISABLE KEYS */;
INSERT INTO `aireAutoroute` VALUES (1,'la belle etoile',1,1,'A1'),(2,'larzac',0,1,'A2'),(3,'orléans',1,0,'A3'),(4,'mlv',0,0,'A4'),(5,'parc astérix',1,0,'A1'),(6,'mantes-est',1,1,'A2'),(7,'mantes-ouest',0,1,'A3'),(8,'centre de la centre',0,1,'A4'),(9,'lille',1,0,'A1'),(10,'les vignes de bordeau',1,1,'A2'),(11,'brest',0,1,'A3'),(12,'nancy',0,1,'A4');
/*!40000 ALTER TABLE `aireAutoroute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autoroute`
--

DROP TABLE IF EXISTS `autoroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `autoroute` (
  `nom` varchar(5) NOT NULL,
  `traffic` varchar(1000) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autoroute`
--

LOCK TABLES `autoroute` WRITE;
/*!40000 ALTER TABLE `autoroute` DISABLE KEYS */;
INSERT INTO `autoroute` VALUES ('A1','fluide'),('A2','attention accident'),('A3','bouchon à...'),('A4','panne à...');
/*!40000 ALTER TABLE `autoroute` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `compte`
--

DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `compte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(25) DEFAULT NULL,
  `prenom` varchar(25) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `cp` int(5) DEFAULT NULL,
  `voie` varchar(50) DEFAULT NULL,
  `voieNum` varchar(30) DEFAULT NULL,
  `login` varchar(50) DEFAULT NULL,
  `mdp` varchar(50) DEFAULT NULL,
  `nomabonnement` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nomabonnement` (`nomabonnement`),
  CONSTRAINT `compte_ibfk_1` FOREIGN KEY (`nomabonnement`) REFERENCES `abonnement` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compte`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `compte` DISABLE KEYS */;
INSERT INTO `compte` VALUES (1,'Karadjia','Reynold','Champs-sur-marne',77420,'rue du chateau','5','rKaradjia','azerty','basic'),(2,'Macedo','Goerges','Poissy',78360,'boulevard st germain','14','gMacedo','azerty','premium'),(3,'Shrize','Mathieu','Chessy',77260,'impasse de la marne','20','mShrize','azerty','VIP'),(4,'Uskegaise','Varbetim','Trappes',78341,'rue saint cyr','82','vUskegaise','azerty','premium+');
/*!40000 ALTER TABLE `compte` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formule`
--

DROP TABLE IF EXISTS `formule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `formule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idResto` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `prix` decimal(4,2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idResto` (`idResto`),
  CONSTRAINT `formule_ibfk_1` FOREIGN KEY (`idResto`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formule`
--

LOCK TABLES `formule` WRITE;
/*!40000 ALTER TABLE `formule` DISABLE KEYS */;
INSERT INTO `formule` VALUES (1,1,'MenuEnfant',9.99),(2,1,'MenuGastronoque',17.99),(3,1,'MenuPassion',20.99),(4,2,'MenuEnfant',12.00),(5,2,'MenuFormerie',21.00),(6,2,'MenuVegetal',18.00),(7,2,'MenuDecouverte',20.00);
/*!40000 ALTER TABLE `formule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idCompte` int(11) NOT NULL,
  `idRestoAire` int(11) NOT NULL,
  `dateA` datetime NOT NULL,
  `dateD` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCompte` (`idCompte`),
  KEY `idRestoAire` (`idRestoAire`),
  CONSTRAINT `reservation_ibfk_1` FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`),
  CONSTRAINT `reservation_ibfk_2` FOREIGN KEY (`idRestoAire`) REFERENCES `restoAire` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (1,1,3,'2017-06-29 13:30:00','2017-06-29 14:30:00'),(2,2,13,'2017-07-29 13:15:00','2017-08-29 14:30:00');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,'la restauration artisanale'),(2,'le grand paris'),(3,'l auvergnat');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restoAire`
--

DROP TABLE IF EXISTS `restoAire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restoAire` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idAire` int(11) NOT NULL,
  `idResto` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idAire` (`idAire`),
  KEY `idResto` (`idResto`),
  CONSTRAINT `restoAire_ibfk_1` FOREIGN KEY (`idAire`) REFERENCES `aireAutoroute` (`id`),
  CONSTRAINT `restoAire_ibfk_2` FOREIGN KEY (`idResto`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restoAire`
--

LOCK TABLES `restoAire` WRITE;
/*!40000 ALTER TABLE `restoAire` DISABLE KEYS */;
INSERT INTO `restoAire` VALUES (1,1,1),(2,2,1),(3,3,1),(4,4,1),(5,5,1),(6,6,1),(7,7,1),(8,8,1),(9,9,1),(10,10,1),(11,11,1),(12,12,1),(13,5,2),(14,8,3);
/*!40000 ALTER TABLE `restoAire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trajets`
--

DROP TABLE IF EXISTS `trajets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trajets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lieuDepart` varchar(25) NOT NULL,
  `lieuArrive` varchar(25) DEFAULT NULL,
  `heureDepart` datetime DEFAULT NULL,
  `heureArrive` datetime DEFAULT NULL,
  `etat` varchar(30) DEFAULT NULL,
  `idCompte` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCompte` (`idCompte`),
  CONSTRAINT `trajets_ibfk_1` FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trajets`
--

LOCK TABLES `trajets` WRITE;
/*!40000 ALTER TABLE `trajets` DISABLE KEYS */;
INSERT INTO `trajets` VALUES (1,'Chessy','Marseille','2018-06-29 12:09:55',NULL,'en cours',1),(2,'Saint-Arnoult-en-Yvelines','Milau','2018-06-28 06:10:00','2018-06-28 13:30:25','termine',1),(3,'Saint-germain-en-laye','Poissy','2018-06-25 10:10:00','2018-06-25 10:46:25','termine',2),(4,'Bordeaux','Saint-Arnoult-en-Yvelines','2018-06-28 12:10:00','2018-06-28 17:54:25','termine',2),(5,'Aix-les-bains','Saint-Arnoult-en-Yvelines','2018-06-21 12:10:00','2018-06-28 17:54:25','termine',2),(6,'Boulogne-sur-mer','Paris-Nord','2018-07-02 11:15:09',NULL,'en cours',2),(7,'Belfort','Strasbourg','2018-06-18 13:51:00','2018-06-18 15:46:25','termine',3),(8,'Peau','Lourdes','2018-06-15 15:41:00','2018-06-15 17:54:25','termine',3),(9,'Toulouse','Besançon','2018-06-16 23:10:00','2018-06-17 08:02:25','termine',3),(10,'Saint-Arnoult-en-Yvelines','Perpignan','2017-07-17 05:14:51','2018-06-17 15:46:25','termine',4),(11,'Perpignan','Saint-Arnoult-en-Yvelines','2018-08-03 10:52:54','2018-08-03 21:51:03','termine',4);
/*!40000 ALTER TABLE `trajets` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-19 13:32:22
