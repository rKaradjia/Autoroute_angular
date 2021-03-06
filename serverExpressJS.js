
//using nodeJS

const express = require('express');//express JS
var app = express();
const bodyparser=require('body-parser');
var con;
const mysql = require('mysql');

//app.get('/', (req, res) => res.send('Hello World!'))*/
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
//  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization');
  next();
});


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}));

  con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "azerty",
    database : "autorouteangularv4"
  });



app.listen(3000,()=>console.log('server is running port 3000'))

   
    app.get('/trajets',(req,res)=>{ //definition de la route    localhost:3000/trajets
      con.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM trajets'/*sql requests*/, (err,rows)=> {
          if (err) throw err;
          console.log(rows);res.send(rows);
        });
        //met fin à la connection 
        connection.release();
    });
   
  });


  app.get('/trajets/:id',(req,res)=>{ //definition de la route    localhost:3000/trajets
    console.log('Serveur ExpressJS : Les trajets de l abonne : ' + req.params.id);

    con.getConnection(function (err, connection) {
      
      connection.query("SELECT lieuDepart,lieuArrive,heureDepart,heureArrive FROM trajets WHERE idCompte=(SELECT id FROM compte WHERE login = '"+req.params.id+"')", (err,rows)=> {
        if (rows.length == 0) {
          console.log(" On cherche tous les trajets de l abonne "+err);
          return res.json(0);
        }else{
          console.log(rows);
          return res.json(rows);
          
        }  

      });
      //met fin à la connection 
      connection.release();
  });
 
});



app.get('/reservations/:id',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : Les reservations de l abonne :' + req.params.id);

  con.getConnection(function (err, connection) {
    
    connection.query("SELECT aireAutoroute.libelle AS nomAire,restaurants.libelle,reservation.dateA,reservation.dateD "+
    " FROM reservation INNER JOIN restoAire ON reservation.idRestoAire=restoAire.id "+
    " INNER JOIN restaurants ON restoAire.idResto=restaurants.id "+
    " INNER JOIN aireAutoroute ON restoAire.idAire=aireAutoroute.id "+
    "WHERE reservation.idCompte = (SELECT id from compte where login = '"+req.params.id+"')", (err,rows)=> {
      if (rows.length == 0) {
        console.log(" On cherche tous les trajets de l abonne "+err);
        return res.json(0);
      }else{
        console.log(rows);
        return res.json(rows);
        
      }  
  

    });
    //met fin à la connection 
    connection.release();
});

});




app.delete('/reservations/delete/:iduser/:idRestoAire/:dateA/:dateD',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : reservations a supprimer :' + req.params.iduser);
  console.log("DEBUT "+req.params.dateA);
  console.log("FIN "+req.params.dateD);
  console.log ("IDUSER   IDRESTOAIRE  "+ req.params.iduser + "  "+ req.params.idRestoAire);

  var dayA = req.params.dateA.substring(0, 10);
  var hourA = req.params.dateA.substring(11, 19);

  console.log("Date de debut DATE A reformaté " +  dayA +" "+hourA)

  var dayD = req.params.dateD.substring(0, 10);
  var hourD = req.params.dateD.substring(11, 19);

  console.log("Date de fin DATE D reformaté " +  dayD +" "+hourD)
  
  con.getConnection(function (err, connection) {

  

    connection.query("DELETE FROM reservation WHERE idCompte="+parseInt(req.params.iduser)+
    " AND reservation.idRestoAire="+parseInt(req.params.idRestoAire)+" AND dateA=DATE_ADD('"+dayA+" "+hourA+"',INTERVAL 2 HOUR)"+
         " AND dateD=DATE_ADD('"+dayD+" "+hourD+"',INTERVAL 2 HOUR)", (err,rows)=> {
       /* if (err) throw err;
          console.log(rows);return res.send();*/
      if (rows.length == 0) {
        console.log(" On cherche tous les trajets de l abonne "+err);
        return res.send();
      }else{
        console.log(rows);
        return res.send();
        
      }  
  

    });
    //met fin à la connection 
    connection.release();
});

});





app.get('/abonnements',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : Recupération des abonnements pour affichage dans une liste');

  con.getConnection(function (err, connection) {
    // Use the connection
   // "SELECT RAP_BILAN FROM RAPPORT_VISITE where RAP_NUM = '"+numRapport+"' "
    connection.query("SELECT nom from abonnement", (err,rows)=> {
      if (rows.length == 0) {
        console.log(" Erreur lors de la recuperation des abonnements " + err);
        return res.json(0);
      }else{
        console.log(rows);
        return res.json(rows);
        
      }  

    });
    //met fin à la connection 
    connection.release();
});

});



app.get('/aire',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : Recupération des aires');

  con.getConnection(function (err, connection) {
    // Use the connection
   // "SELECT RAP_BILAN FROM RAPPORT_VISITE where RAP_NUM = '"+numRapport+"' "
    connection.query("SELECT libelle from aireAutoroute", (err,rows)=> {
      if (rows.length == 0) {
        console.log(" Erreur lors de la recuperation des aires " + err);
        return res.json(0);
      }else{
        console.log(rows);
        return res.json(rows);
        
      }  

    });
    //met fin à la connection 
    connection.release();
});

});


app.get('/aire/:nomaire',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : recupération des restos sur une aire' + req.params.nomaire);

  con.getConnection(function (err, connection) {
   /* select restaurants.libelle from restoAire 
    inner join restaurants on restoAire.idResto=restaurants.id 
    where restoAire.idAire=(select id from aireAutoroute where libelle = 'mlv');*/

    connection.query("SELECT restaurants.libelle from restoAire "+
     "INNER JOIN restaurants ON restoAire.idResto=restaurants.id WHERE "+
     "restoAire.idAire = (SELECT id FROM aireAutoroute WHERE libelle ='"+req.params.nomaire+"')", (err,rows)=> {
      if (rows.length == 0) {
        console.log(" Erreur lors de la recuperation des aires " + err);
        return res.json(rows);
      }else{
        console.log(rows);
        return res.json(rows);
        
      }  

    });
    //met fin à la connection 
    connection.release();
});

});




app.get('/idRestoAire/:nomaire/:nomresto',(req,res)=>{ //definition de la route    localhost:3000/trajets
  console.log('Serveur ExpressJS : recupération d l identifiant' + req.params.nomaire + " " + req.params.nomresto);

  con.getConnection(function (err, connection) {
   /* select restoAire.id from restoAire 
   inner join restaurants on restoAire.idResto=restaurants.id 
   inner join aireAutoroute on restoAire.idAire=aireAutoroute.id 
   where restaurants.libelle='la restauration artisanale' and aireAutoroute.libelle = 'mlv';
*/

    connection.query("SELECT restoAire.id from restoAire "+
      "INNER JOIN restaurants ON restoAire.idResto=restaurants.id "+
      "INNER JOIN aireAutoroute ON restoAire.idAire=aireAutoroute.id "+
      "WHERE restaurants.libelle ='"+req.params.nomresto+"'AND aireAutoroute.libelle ='"+req.params.nomaire+"'"
     ,(err,rows)=> {
      if (rows.length == 0) {
        console.log(" Erreur lors de la recuperation des aires " + err);
        return res.json(rows);
      }else{
        console.log(rows[0].id);
        return res.json(rows[0].id);
        /*idrestoAire = parseInt(res.json(rows[0].id),10);
        return idrestoAire;*/
        
      }  

    })
    //met fin à la connection 
    connection.release();
});

});




/*Reservation*/
app.post('/reservations', function (req, res) {  //parametres à definir ulterieurement ceci est un test
  res.send('Serveur ExpressJS : Reserver');
 
  console.log('Nom de la reservation ' + req.body.idnum+" "+ req.body.idrestoAire+ "  " +req.body.arrive);
  console.log(req.body.depart);
   

   con.getConnection(function (err, connection) {
   /* insert into reservation (idCompte,idRestoAire,dateA,dateD) values 
                                                (1,1,STR_TO_DATE(substr('Thu Jul 26 2018 13:00:10 GMT 0200 (CEST)',1,24),'%a %b %d %Y %H:%i:%s'),
                                                STR_TO_DATE(substr('Thu Jul 26 2018 13:00:10 GMT 0200 (CEST)',1,24),'%a %b %d %Y %H:%i:%s'));*/

      connection.query(/*A VOIR */"insert into reservation (idCompte,idRestoAire,dateA,dateD) values "+
     " ("+parseInt(req.body.idnum,10)+","+parseInt(req.body.idrestoAire,10)+","+
     " STR_TO_DATE(substr('"+req.body.arrive+"',1,24),'%a %b %d %Y %H:%i:%s'), "+
     " STR_TO_DATE(substr('"+req.body.depart+"',1,24),'%a %b %d %Y %H:%i:%s'))", (err,rows)=> {  
         if (rows.length == 0) {
           console.log(" Erreur lors de la recuperation des abonnements " + err);
           return res.send();
         }else{
           console.log(rows);
           return res.send();
           
         }   //affiche dans le navigateur

      });
               //met fin à la connection 
     connection.release();
  });

 });





/*CREATION DU COMPTE*/
  app.post('/compte/creation', function (req, res) {  //parametres à definir ulterieurement ceci est un test
   res.send('Serveur ExpressJS : Creation d un compte');
  
   console.log('Nom du nouvel abonné ' + req.body.nom  + "  " + req.body.prenom + "  " +req.body.ville + "  "+
    " " + parseInt(req.body.cp,10) + "  " +  req.body.voie + "  " + parseInt(req.body.numVoie,10) +  "  "+
  req.body.login +  "  " + req.body.mdp  + "  " + req.body.nomAbonnement ) ;
    con.getConnection(function (err, connection) {
         // Use the connection
         //parseInt(req.params.year, 10);
       connection.query("INSERT INTO compte (nom,prenom,ville,cp,voie,voieNum,login,mdp,nomAbonnement"+
      ") VALUES('"+req.body.nom+"','"+req.body.prenom+"','"+req.body.ville+"',"+parseInt(req.body.cp,10)+","+
        "'"+req.body.voie+"',"+parseInt(req.body.numVoie,10)+",'"+req.body.login+"','"+req.body.mdp+"',"+
         "'"+ req.body.nomAbonnement+"')", (err,rows)=> {  
          if (rows.length == 0) {
            console.log(" Erreur lors de la recuperation des abonnements " + err);
            return res.send();
          }else{
            console.log(rows);
            return res.send();
            
          }   //affiche dans le navigateur

       });
                //met fin à la connection 
      connection.release();
   });

  });



  app.get('/compte/:id',(req,res)=>{ //definition de la route    localhost:3000/trajets
    console.log('Serveur ExpressJS : Les reservations de l abonne :' + req.params.id);
  
    con.getConnection(function (err, connection) {
      
      connection.query("SELECT nom,prenom,ville,cp,voie,voieNum,nomabonnement,modifabonnement FROM compte where "+
      "login='"+ req.params.id+"'", (err,rows)=> {
        if (rows.length == 0) {
          return res.json(0);
        }else{
          console.log(rows[0]);return res.json(rows[0]);
        }
    
  
      });
      //met fin à la connection 
      connection.release();
  });
  
  });

  app.get('/compte/pwd/:iduser/:oldmdp',(req,res)=>{ //definition de la route    localhost:3000/trajets
    console.log('Serveur ExpressJS : Verifier old_mdp :' + req.params.iduser);
    
  
    con.getConnection(function (err, connection) {
      
      connection.query("SELECT mdp FROM compte where "+
      "login='"+ req.params.iduser+"'", (err,rows)=> {

        console.log('row[0] content ' + rows[0].mdp + ' type  '+typeof rows[0].mdp)
        console.log('req params mdp  content ' + req.params.oldmdp  + ' type  '+ typeof req.params.mdp)

        if (rows.length == 0) {
          console.log('no result ' + res.json(rows[0].mdp) )
          return res.json(rows[0].mdp);
        }else{

              if(req.params.oldmdp==rows[0].mdp){

                return res.json(true);
              }else{

                return res.json(false);
              }

         // console.log(rows[0].mdp);return res.json(true);
        }
    
  
      });
      //met fin à la connection 
      connection.release();
  });
  
  });

  app.put('/compte/updatepwd/:iduser/:newpwd', function (req, res) {  //parametres à definir ulterieurement ceci est un test
    console.log('Serveur ExpressJS : maj Mdp :' + req.params.iduser);
     
    console.log('Status' + res.statusCode);
    con.getConnection(function (err, connection) {
      console.log ("Erreur oooo" + err);
      
    connection.query("UPDATE compte SET mdp='"+req.params.newpwd+"' "+
    " WHERE login ='"+req.params.iduser+"'", (err,rows)=> {
      if (rows.length == 0) {
        return res.json(0);
      }else{
        return res.send()
      }

     
      });
      //met fin à la connection 
      connection.release();
  });
 
});



app.put('/compte/abonnement/:iduser/:nomabonnement', function (req, res) {  //parametres à definir ulterieurement ceci est un test
  console.log('Serveur ExpressJS : maj abonnement :' + req.params.nomabonnement);


    var date = new Date();
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString();
    var dd  = date.getDate().toString();
    var mmChars = mm.split(''); // SPLIT
    var ddChars = dd.split('');
  
    var dateNow=yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0])


  console.log('Status' + res.statusCode);
  con.getConnection(function (err, connection) {
   // console.log ("Erreur oooo" + err);
    
  connection.query("UPDATE compte SET nomabonnement='"+req.params.nomabonnement+"',modifabonnement='"+dateNow+"'"+
  " WHERE login ='"+req.params.iduser+"' AND DATEDIFF('"+dateNow+"',modifabonnement)>30", (err,rows)=> {
    if (rows.length==0) {
      //console.log(err)
      return res.json(0);
    }else{


     // console.log(rows[0].modifabonnement)
      //console.log('ok')
     // return res.json(1);
      /*con.getConnection(function (err, connection1) {

        connection1.query("select modifabonnement from compte where login ='"+req.params.iduser+"'",(err1,rows1)=> {
          console.log ('Date   ----->'+rows1[0].modifabonnement)
          return rows1[0].modifabonnement;
        }
      )
        connection1.release()
      })*/
    }

          
    });
    //met fin à la connection 
    connection.release();
});

});





/*RECHERCHE DE L EXISTANCE D UN COMPTE*/
  app.get('/connect/:login/:mdp', function (req, res) {  //parametres à definir ulterieurement ceci est un test
    console.log('Serveur ExpressJS : Ouverture du compte de :' + req.params.login);

    console.log('Status' + res.statusCode);
    con.getConnection(function (err, connection) {
      console.log ("Erreur oooo" + err);
      
    connection.query("SELECT id FROM compte WHERE login = '"+req.params.login+"'AND mdp='"+req.params.mdp+"'", (err,rows)=> {
    if (rows.length == 0) {
      return res.json(0);
    }else{
      console.log(rows[0].id);return res.json(rows[0].id);
    }

     
      });
      //met fin à la connection 
      connection.release();
  });
 
});





app.get('/',(req,res )=>{

      console.log("hello world");
      res.send("hello world");

})