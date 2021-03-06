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
  nom: string;
  prenom: string;
  ville: string;
  cp: number;
  voie:string;
  numVoie: number;
  SelectedAbonnement: string = null;
  

  identifiant: number; /* Log out --> NULL   LogIn --> NULL/number*/


  /*Variable de conditions*/
  @Input() fenetre: boolean;
  @Output() connectClick= new EventEmitter<Boolean>();//Ces deux variables permettent l'interaction 
  @Output() recordClick = new EventEmitter<Boolean>();// entre les deux composants
  @Output() newNavBar = new EventEmitter();
  messageco: boolean=false;

  //Tableau
  lesabonnements=[];

  
  constructor(private httpserv:compteService) { 
    this.httpserv=httpserv;


  }

  ngOnInit() {
  }

/*Bascule entre fenetre connexion et enregistrement*/
  onEnregistrer(/*si on veut passer des données*/){
    console.log("before the state was " + this.fenetre);
    this.httpserv.getNomOfAbonnements().subscribe(data=>{
      console.log("Les trajets de l abonne : ");
      console.log(data);
      if(data==0){

      }else{
        this.lesabonnements=data;
        
      }
    })
    this.connectClick.emit(this.fenetre/*si on veut passer des données*/);/*ici on met un event sur un bouton*/
    this.fenetre=true;
    console.log("now the state is " + this.fenetre);  

  }


  onConnecter(){
    console.log("before the state was " + this.fenetre);
    this.recordClick.emit(this.fenetre);
    this.fenetre=false;
    console.log("now the state is " + this.fenetre);

  }

/*Envoie les données au serveur pour se connecter*/
  sendDataConnect(/*form: NgForm*/){

  var get:any;
    console.log("this.HTTP    "+  this.httpserv);
    console.log("send data to Connect "+/*form.value+ */" login " + this.login + " mdp " + this.mdp);
    console.log("send data connect TS FILE" + this.httpserv.seConnecter(this.login,this.mdp));

    //On souscrit auprès d'une fonction du Service HTTP
    this.httpserv.seConnecter(this.login,this.mdp).subscribe(data=>{
      console.log ("Connect Component Identifiant recuperer " +data);
      this.identifiant=parseInt(data,10);
      console.log("Connect Component Identifiant Memorise" +this.identifiant);
    if(this.identifiant==0){
           this.messageco=true;
    }else{
      this.httpserv.setIdentifiantsCo(this.login,this.identifiant);
      this.messageco=false;
      this.newNavBar.emit();

    }
    })

  }


  createAccount(){
    console.log("Creation du compte "+this.SelectedAbonnement );
    console.log ("Nom "+this.nom+"Prenom "+this.prenom+"Ville "+this.ville+"Code postal "+this.cp+ 
     "Voie "+this.voie+"Num Voie "+this.numVoie+"Login "+this.login+"Mot_de_passe "+this.mdp +
     "Abonnement choisit "+this.SelectedAbonnement );
    this.httpserv.createAccount(this.nom,this.prenom,this.ville,this.cp,this.voie,this.numVoie,
                              this.login,this.mdp,this.SelectedAbonnement).subscribe(data=>{
                                console.log("Les trajets de l abonne : ");
                                console.log(data);
                                if(data==0){
                          
                                }else{
                                  
                                }
                          
                          
                          
                                
                            
                              })

  }

  getIdentifiant(){
   
    return this.identifiant;/*identifiant de l'utilisateur en cours sera remplace (??) par Session*/

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
