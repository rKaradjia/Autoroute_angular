
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

 // module.exports.pool = con;
 // console.log('on teste la requete suivante' + getTrajets());
  con.getConnection(function(err) {
    if (err) console.log('Database connection failed' + JSON.stringify(err,undefined,2));
    else
    console.log("Connected!") ;return con;
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

    });
  });


//}


app.get('/',(res,req )=>{

      console.log("hello world")

})