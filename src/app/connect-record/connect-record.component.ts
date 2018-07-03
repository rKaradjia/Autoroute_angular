import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http
@Component({
  selector: 'app-connect-record',
  templateUrl: './connect-record.component.html',
  styleUrls: ['./connect-record.component.scss']
})
export class ConnectRecordComponent implements OnInit {
  
  @Input() isco: boolean;
  @Output() connectClick= new EventEmitter<Boolean>();//Ces deux variables permettent l'interaction 
  @Output() recordClick = new EventEmitter<Boolean>();// entre les deux composants

  constructor() { }

  ngOnInit() {
  }

/*CONNECTION*/
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


  sendDataConnect(mdp:string,login:string){

    console.log("send data to Connect "+mdp+ " "+login);

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
