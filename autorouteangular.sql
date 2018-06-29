CREATE DATABASE /*!32312 IF NOT EXISTS*/ `autorouteangularv2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `autorouteangularv2`;

--
-- Table structure for table `autorouteangularv2`
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
  `nbTrajets` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `compte` WRITE;

UNLOCK TABLES;


/*table autoroute : pour lister l'etat du traffic*/

DROP TABLE IF EXISTS `autoroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `autoroute` (
  `nom` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL,
  `traffic` varchar(1000) NOT NULL,
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `autoroute` WRITE;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` DISABLE KEYS */;
/*!40000 ALTER TABLE `ACTIVITE_COMPL` ENABLE KEYS */;
UNLOCK TABLES;



/*table aireAutoroute : table de base qui rassemble toutes les activités disponibles 
sur une aire : jeux pour enfants, restauration,    ------->autres (brumisateurs,espaces picnic) a voir en boolean ou nouvelles tables?)*/
DROP TABLE IF EXISTS `aireAutoroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `aireAutoroute` (
  `id` int(11) NOT NULL,
  `libelle` varchar(30) NOT NULL,
  `idAutoroute` int(11) NOT NULL, /*en principe et a se stade de la conception les grandes chaines ne possède que un seul id dans la table restaurants*/
  `jeuxEnfants` BOOLEAN,
  `brumisateur` BOOLEAN,
  `nomAutoroute` VARCHAR(5),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idAutoroute`) REFERENCES `autoroute` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `aireAutoroute` WRITE;

UNLOCK TABLES;


/*TABLE restaurants*/

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,
  `idAire` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL, /*entrée plat dessert   -  plat déssert - entrée plat            a définir*/
  `prix` decimal(4,2),
  PRIMARY KEY (`id`,`idAire`),
  FOREIGN KEY (`idAire`) REFERENCES `aireAutoroute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `restaurants` WRITE;

UNLOCK TABLES;

DROP TABLE IF EXISTS `trajets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trajets` (
  `id` int(11) NOT NULL,
  `lieuDepart` varchar(25) NOT NULL,   /*definit selon le lieu du badge*/
  `lieuArrive` varchar(25) DEFAULT NULL,
  `heureDepart` date DEFAULT NULL,         /*a terme automatique --> quand utilisateur badge*/
  `heureArrive` int(5) DEFAULT NULL,
  `etat` varchar(30) DEFAULT NULL,/*en cours, termine*/
  `idCompte` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `trajets` WRITE;

UNLOCK TABLES;

/*table reservation : destiné à la restauration*/

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `idCompte` int(11) NOT NULL,
  `idAire` int(11) DEFAULT NULL,   /*definit selon le lieu du badge*/
  `idResto` int(11) DEFAULT NULL,
  `dater` date,
  `heurer` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`id`),
  /*CONSTRAINT `FK_reservation_compte`*/FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`),          /*une reservation est lie à un compte, une aire et un restaurant*/
  /*CONSTRAINT `FK_reservation_aireAutoroute` */FOREIGN KEY (`idAire`) REFERENCES `aireAutoroute` (`id`),
  /*CONSTRAINT `FK_reservation_restaurants`*/FOREIGN KEY (`idResto`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--
/*
LOCK TABLES `reservation` WRITE;

UNLOCK TABLES;*/







/*table FORMULE*/
DROP TABLE IF EXISTS `formule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `formule` (
  `id` int(11) NOT NULL,
  `idResto` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL, /*entrée plat dessert   -  plat déssert - entrée plat            a définir*/
  `prix` decimal(4,2),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idResto`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `formule` WRITE;

UNLOCK TABLES;










