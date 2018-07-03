
//using nodeJS

const express = require('express');//express JS
var app = express();
const bodyparser=require('body-parser');
var con;
const mysql = require('mysql');

//app.get('/', (req, res) => res.send('Hello World!'))*/
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
  app.post('/connect', function (req, res) {  //parametres à definir ulterieurement ceci est un test
    res.send('Got a POST request')
 
    console.log('post ' + res.body);
     con.getConnection(function (err, connection) {
          // Use the connection
          
        connection.query("SELECT login,mdp WHERE login = '"+req.body.login+"'AND mdp '"+req.body.mdp+"'", (err,rows)=> {  /*ou nom est l'identifiant 
         d'un input */
          if (err) throw err;
          if(rows.length==0)console.log('Pas de compte pour ce couple login/mdp');
          console.log(rows);res.send(rows); //affiche dans le navigateur
 
                      /*      Resultat type : [ RowDataPacket { id: 1, nom: 'Karadjia' } ]*/
 
        });
                 //met fin à la connection 
       connection.release();
    });
 
   });


//}


app.get('/',(res,req )=>{

      console.log("hello world")

})