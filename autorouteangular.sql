CREATE DATABASE /*!32312 IF NOT EXISTS*/ `autorouteangularv2` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `autorouteangularv2`;

--
-- Table structure for table `autorouteangularv2`
--



/*table abonnement autoroute*/
DROP TABLE IF EXISTS `abonnement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `abonnement` (
  `nom` varchar(10) NOT NULL,
  `libelle` varchar(255) NOT NULL, /*entrée plat dessert   -  plat déssert - entrée plat            a définir*/
  `prix` decimal(4,2),
  PRIMARY KEY (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--
/*INSERT INTO `TYPE_PRATICIEN` VALUES ('MH','M?decin Hospitalier','Hopital ou clinique'); SYNTAX*/
LOCK TABLES `abonnement` WRITE;
INSERT INTO `abonnement` VALUES ('basic','definir',10.99);
INSERT INTO `abonnement` VALUES ('premium','definir',15.99);
INSERT INTO `abonnement` VALUES ('premium+','definir',20.99);
INSERT INTO `abonnement` VALUES ('VIP','definir',30.99);
UNLOCK TABLES;




/*TABLE COMPTE*/
DROP TABLE IF EXISTS `compte`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `compte` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(25) DEFAULT NULL,
  `prenom` varchar(25) DEFAULT NULL,
  `ville` varchar(30) DEFAULT NULL,
  `cp` int(5) DEFAULT NULL,
  `voie` varchar (50) DEFAULT NULL,
  `voieNum` varchar(30) DEFAULT NULL,
  `nomabonnement` varchar(10),/*not null*/
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nomabonnement`) REFERENCES `abonnement` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--
/*INSERT INTO Persons (FirstName,LastName) VALUES ('Lars','Monsen');*/
LOCK TABLES `compte` WRITE;
INSERT INTO `compte` (nom,prenom,ville,cp,voie,voieNum,nomabonnement) VALUES ('Karadjia','Reynold','Champs-sur-marne',77420,'rue du chateau',5,'basic');
INSERT INTO `compte` (nom,prenom,ville,cp,voie,voieNum,nomabonnement) VALUES ('Macedo','Goerges','Poissy',78360,'boulevard st germain',14,'premium');
INSERT INTO `compte` (nom,prenom,ville,cp,voie,voieNum,nomabonnement) VALUES ('Shrize','Mathieu','Chessy',77260,'impasse de la marne',20,'VIP');
INSERT INTO `compte` (nom,prenom,ville,cp,voie,voieNum,nomabonnement) VALUES ('Uskegaise','Varbetim','Trappes',78341,'rue saint cyr',82,'premium+');
UNLOCK TABLES;


/*table autoroute : pour lister l'etat du traffic*/

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
-- Dumping data for table ``
--

LOCK TABLES `autoroute` WRITE;
INSERT INTO `autoroute` VALUES ('A1','fluide');
INSERT INTO `autoroute` VALUES ('A2','attention accident');
INSERT INTO `autoroute` VALUES ('A3','bouchon à...');
INSERT INTO `autoroute` VALUES ('A4','panne à...');
UNLOCK TABLES;



/*table aireAutoroute : table de base qui rassemble toutes les activités disponibles 
sur une aire : jeux pour enfants, restauration,    ------->autres (brumisateurs,espaces picnic) a voir en boolean ou nouvelles tables?)*/
DROP TABLE IF EXISTS `aireAutoroute`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `aireAutoroute` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(30) NOT NULL,
  /*`idAutoroute` int(11) NOT NULL, /*en principe et a se stade de la conception les grandes chaines ne possède que un seul id dans la table restaurants*/
  `jeuxEnfants` BOOLEAN,
  `brumisateur` BOOLEAN,
  `nomAutoroute` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nomAutoroute`) REFERENCES `autoroute` (`nom`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `aireAutoroute` WRITE;
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('la belle etoile',true,true,'A1');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('larzac',false,true,'A2');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('orléans',true,false,'A3');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('mlv',false,false,'A4');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('parc astérix',true,false,'A1');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('mantes-est',true,true,'A2');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('mantes-ouest',false,true,'A3');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('centre de la centre',false,true,'A4');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('lille',true,false,'A1');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('les vignes de bordeau',true,true,'A2');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('brest',false,true,'A3');
INSERT INTO `aireAutoroute` (libelle,jeuxEnfants,brumisateur,nomAutoroute) VALUES ('nancy',false,true,'A4');
UNLOCK TABLES;


/*TABLE restaurants*/

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `restaurants` (
  `id` int(11) NOT NULL,          /*un restaurant se situt sur une ou plusieurs aire*/
  `idAire` int(11) NOT NULL,
  `libelle` varchar(255) NOT NULL, /*entrée plat dessert   -  plat déssert - entrée plat            a définir*/
  PRIMARY KEY (`id`,`idAire`),
  FOREIGN KEY (`idAire`) REFERENCES `aireAutoroute` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `restaurants` WRITE;
/*une chaine*/
INSERT INTO `restaurants` VALUES (1,1,'la restauration artisanale');/*id du resto ,  lieu(x) ,  nom */
INSERT INTO `restaurants` VALUES (1,2,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,3,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,4,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,5,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,6,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,7,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,8,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,9,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,10,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,11,'la restauration artisanale');
INSERT INTO `restaurants` VALUES (1,12,'la restauration artisanale');


/*les independants*/
INSERT INTO `restaurants` VALUES (2,5,'le grand paris');
INSERT INTO `restaurants` VALUES (3,8,'l auvergnat');


UNLOCK TABLES;

DROP TABLE IF EXISTS `trajets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `trajets` (
  `id` int(11) AUTO_INCREMENT,
  `lieuDepart` varchar(25) NOT NULL,   /*definit selon le lieu du badge*/
  `lieuArrive` varchar(25) DEFAULT NULL,
  `heureDepart` datetime DEFAULT NULL,         /*a terme automatique --> quand utilisateur badge*/
  `heureArrive` datetime DEFAULT NULL,
  `etat` varchar(30) DEFAULT NULL,/*en cours, termine*/
  `idCompte` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--
/*type datetime '2011-12-18 13:17:17'*/
LOCK TABLES `trajets` WRITE;
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Chessy','Marseille','2018-06-29 12:09:55',null,'en cours',1);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Saint-Arnoult-en-Yvelines','Milau','2018-06-28 06:10:00','2018-06-28 13:30:25','termine',1);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Saint-germain-en-laye','Poissy','2018-06-25 10:10:00','2018-06-25 10:46:25','termine',2);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Bordeaux','Saint-Arnoult-en-Yvelines','2018-06-28 12:10:00','2018-06-28 17:54:25','termine',2);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Aix-les-bains','Saint-Arnoult-en-Yvelines','2018-06-21 12:10:00','2018-06-28 17:54:25','termine',2);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Boulogne-sur-mer','Paris-Nord','2018-07-02 11:15:09',null,'en cours',2);/**/
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Belfort','Strasbourg','2018-06-18 13:51:00','2018-06-18 15:46:25','termine',3);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Peau','Lourdes','2018-06-15 15:41:00','2018-06-15 17:54:25','termine',3);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Toulouse','Besançon','2018-06-16 23:10:00','2018-06-17 08:02:25','termine',3);/**/
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Saint-Arnoult-en-Yvelines','Perpignan','2017-07-17 05:14:51','2018-06-17 15:46:25','termine',4);
INSERT INTO `trajets` (lieuDepart,lieuArrive,heureDepart,heureArrive,etat,idCompte) VALUES('Perpignan','Saint-Arnoult-en-Yvelines','2018-08-03 10:52:54','2018-08-03 21:51:03','termine',4);





UNLOCK TABLES;

/*table reservation : destiné à la restauration*/

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `reservation` (
  `id` int(11) AUTO_INCREMENT,
  `idCompte` int(11) NOT NULL,
  `idAire` int(11) DEFAULT NULL,   /*definit selon le lieu du badge*/
  `idResto` int(11) DEFAULT NULL,
  `dater` datetime NOT NULL,
  `heurer` datetime NOT NULL,
  PRIMARY KEY (`id`),
  /*CONSTRAINT `FK_reservation_compte`*/FOREIGN KEY (`idCompte`) REFERENCES `compte` (`id`),          /*une reservation est lie à un compte, une aire et un restaurant*/
  /*CONSTRAINT `FK_reservation_aireAutoroute` */FOREIGN KEY (`idAire`) REFERENCES `aireAutoroute` (`id`),
  /*CONSTRAINT `FK_reservation_restaurants`*/FOREIGN KEY (`idResto`) REFERENCES `restaurants` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table ``
--

LOCK TABLES `reservation` WRITE;
INSERT INTO `reservation`(idCompte,idAire,idResto,dater,heurer) VALUES (1,3,1,'2017-06-29 13:30:00','2017-06-29 14:30:00');
INSERT INTO `reservation`(idCompte,idAire,idResto,dater,heurer) VALUES (2,5,2,'2017-07-29 13:15:00','2017-08-29 14:30:00');
UNLOCK TABLES;


/*table FORMULE des restuarants*/
DROP TABLE IF EXISTS `formule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `formule` (
  `id` int(11) AUTO_INCREMENT,
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

INSERT INTO `formule`(idResto,libelle,prix) VALUES (1,'MenuEnfant',9.99);
INSERT INTO `formule`(idResto,libelle,prix) VALUES (1,'MenuGastronoque',17.99);
INSERT INTO `formule`(idResto,libelle,prix) VALUES (1,'MenuPassion',20.99);

INSERT INTO `formule`(idResto,libelle,prix) VALUES (2,'MenuEnfant',12);
INSERT INTO `formule`(idResto,libelle,prix) VALUES (2,'MenuFormerie',21);
INSERT INTO `formule`(idResto,libelle,prix) VALUES (2,'MenuVegetal',18);
INSERT INTO `formule`(idResto,libelle,prix) VALUES (2,'MenuDecouverte',20);

UNLOCK TABLES;










