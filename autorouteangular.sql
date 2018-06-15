CREATE DATABASE /*!32312 IF NOT EXISTS*/ `autorouteangular` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `autorouteangular`;

--
-- Table structure for table `ACTIVITE_COMPL`
--

DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `compte` (
  `id` int(11) NOT NULL,
  `nom` varchar(25) DEFAULT NULL,
  `prenom` varchar(25) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `cp` int(5) DEFAULT NULL,
  `voieNum` varchar(30) DEFAULT NULL,
  `nbReservation` int(20) DEFAULT NULL,
  `nbTrajets` int(20) DEFAULT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ACTIVITE_COMPL`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS `trajets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trajets` (
  `id` int(11) NOT NULL,
  `lieuDepart` varchar(25) DEFAULT NULL,   /*definit selon le lieu du badge*/
  `lieuArrive` varchar(25) DEFAULT NULL,
  `heureDepart` date DEFAULT NULL,         /*a terme automatique --> quand utilisateur badge*/
  `heureArrive` int(5) DEFAULT NULL,
  `etat` varchar(30) DEFAULT NULL,/*en cours, terminé*/
  `idCompte` int(11) NOT NULL;
  PRIMARY KEY (`id`),
  CONSTRAINT `FK_trajets_compte` FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ACTIVITE_COMPL`
--

LOCK TABLES `compte` WRITE;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` ENABLE KEYS */;
UNLOCK TABLES;

