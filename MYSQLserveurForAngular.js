
//using nodeJS

const express = require('express');//express JS
var app = express();
const bodyparser=require('body-parser');

//app.get('/', (req, res) => res.send('Hello World!'))*/
app.use(bodyparser.json());

function connectiondb(){
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "azerty",
    database : "autorouteangular"
  });
  console.log('on teste la requete suivante' + getTrajets());
  con.connect(function(err) {
    if (err) console.log('Database connection failed' + JSON.stringify(err,undefined,2));
    else
    console.log("Connected!") ;return con;
  });
  

}



//function getTrajets(){  //a supprimer ?

   // ?? a voir var con = connectiondb();
    app.get('/trajets',(res,req)=>{ //definition de la route    localhost:3000/trajets
    con.query("SELECT * FROM customers"/*sql requests*/, function (err, result) {
      if (err) throw err;
      console.log(result);return result;


    }); 
    });



//}

app.listen(3000,()=>console.log('server is running port 3000'))
app.get('/',(res,req )=>{



})