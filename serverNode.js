
//using nodeJS

const express = require('express');//express JS
var app = express();
const bodyparser=require('body-parser');
var con;
const mysql = require('mysql');

//app.get('/', (req, res) => res.send('Hello World!'))*/
app.use(bodyparser.json());



  con = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "azerty",
    database : "autorouteangular"
  });



app.listen(3000,()=>console.log('server is running port 3000'))

//function getTrajets(){  //a supprimer ?

   
    app.get('/trajets',(res,req)=>{ //definition de la route    localhost:3000/trajets
      con.getConnection(function (err, connection) {
        // Use the connection
        connection.query('SELECT * FROM trajets'/*sql requests*/, (err,rows)=> {
          if (err) throw err;
          console.log(rows);return rows;
        });
        //met fin à la connection 
        connection.release();
    });
   
  });


  app.get('/trajets/:id',(res,req)=>{ //definition de la route    localhost:3000/trajets
    console.log('id dans url ' + res.params.id);

    con.getConnection(function (err, connection) {
      // Use the connection
     // "SELECT RAP_BILAN FROM RAPPORT_VISITE where RAP_NUM = '"+numRapport+"' "
      connection.query("SELECT * FROM trajets WHERE trajets.id = '"+res.params.id+"'", (err,rows)=> {
        if (err) throw err;
       console.log(rows);return rows;
      });
      //met fin à la connection 
      connection.release();
  });
 
});


//}


app.get('/',(res,req )=>{

      console.log("hello world")

})