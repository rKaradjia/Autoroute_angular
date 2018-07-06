import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-connect-record',
  templateUrl: './connect-record.component.html',
  styleUrls: ['./connect-record.component.scss']
})
export class ConnectRecordComponent implements OnInit {
  /*DECLARATION DES VARIABLES POUR LES FORMULAIRES*/
  login: string;
  mdp: string;


  /*Variable de conditions*/
  @Input() isco: boolean;
  @Output() connectClick= new EventEmitter<Boolean>();//Ces deux variables permettent l'interaction 
  @Output() recordClick = new EventEmitter<Boolean>();// entre les deux composants

  constructor(private httpserv:compteService) { }

  ngOnInit() {
  }

/*Bascule entre fenetre connexion et enregistrement*/
  onConnecter(/*si on veut passer des données*/){
    console.log("before the state was " + this.isco);
    this.connectClick.emit(this.isco/*si on veut passer des données*/);/*ici on met un event sur un bouton*/
    this.isco=true;
    console.log("now the state is " + this.isco);  

  }


  onEnregistrer(){
    console.log("before the state was " + this.isco);
    this.recordClick.emit(this.isco);
    this.isco=false;
    console.log("now the state is " + this.isco);

  }

/*Envoie les données au serveur pour se connecter*/
  sendDataConnect(/*form: NgForm*/){

    console.log("send data to Connect "+/*form.value+ */" login " + this.login + " mdp " + this.mdp);
    console.log("send data connect TS FILE" + this.httpserv.seConnecter(this.login,this.mdp));
    this.httpserv.seConnecter(this.login,this.mdp);
    //let values = Object.keys(form).map(key => form[key]);
    
  }




  /*CLIENT HTTP*/
  onSave = function(user) {    
    user.mode= this.valbutton;  
     this.newService.saveUser(user) /*a modifier*/ 
     .subscribe(data =>  {  alert(data.data);  
          
       this.ngOnInit();    
     }   
     , error => this.errorMessage = error )  /*si erreur*/
       
   }   

}
