
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
    database : "autorouteangularv2"
  });



app.listen(3000,()=>console.log('server is running port 3000'))

//function getTrajets(){  //a supprimer ?

   
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
    console.log('id dans url ' + req.params.id);

    con.getConnection(function (err, connection) {
      // Use the connection
     // "SELECT RAP_BILAN FROM RAPPORT_VISITE where RAP_NUM = '"+numRapport+"' "
      connection.query("SELECT * FROM trajets WHERE trajets.id = '"+req.params.id+"'", (err,rows)=> {
        if (err) throw err;
       console.log(rows);res.send(rows); //affiche dans le navigateur

       /*      Resultat type : [ RowDataPacket { id: 1, nom: 'Karadjia' } ]*/

      });
      //met fin à la connection 
      connection.release();
  });
 
});

/*CREATION DU COMPTE*/
  app.post('/compte/creation', function (req, res) {  //parametres à definir ulterieurement ceci est un test
   res.send('Got a POST request')

   console.log('post ' + res.body);
    con.getConnection(function (err, connection) {
         // Use the connection
         
       connection.query("INSERT INTO compte (nom) VALUES("+res.body.nom+")", (err,rows)=> {  /*ou nom est l'identifiant 
        d'un input */
         if (err) throw err;
         console.log(rows);res.send(rows); //affiche dans le navigateur

                     /*      Resultat type : [ RowDataPacket { id: 1, nom: 'Karadjia' } ]*/

       });
                //met fin à la connection 
      connection.release();
   });

  });


/*RECHERCHE DE L EXISTANCE D UN COMPTE*/
  app.get('/connect/:login/:mdp', function (req, res) {  //parametres à definir ulterieurement ceci est un test
    console.log('id dans url ' + req.params.login);

    con.getConnection(function (err, connection) {
      // Use the connection
     // "SELECT RAP_BILAN FROM RAPPORT_VISITE where RAP_NUM = '"+numRapport+"' "
      connection.query("SELECT login,mdp FROM compte WHERE login = '"+req.params.login+"'AND mdp='"+req.params.mdp+"'", (err,rows)=> {
      if (err) throw err;
       console.log(rows);res.send(rows); //affiche dans le navigateur

      
      });
      //met fin à la connection 
      connection.release();
  });
 
});


//}


app.get('/',(req,res )=>{

      console.log("hello world");
      res.send("hello world");

})