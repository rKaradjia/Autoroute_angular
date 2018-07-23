
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
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'appid, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
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
    database : "autorouteangularv3"
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


/*RECHERCHE DE L EXISTANCE D UN COMPTE*/
  app.get('/connect/:login/:mdp', function (req, res) {  //parametres à definir ulterieurement ceci est un test
    console.log('Serveur ExpressJS : Ouverture du compte de :' + req.params.id);

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