import { Component, OnInit } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http
import {FormControl} from '@angular/forms'
import { DateTimeAdapter } from 'ng-pick-datetime';

@Component({
  selector: 'app-mesreservations',
  templateUrl: './mesreservations.component.html',
  styleUrls: ['./mesreservations.component.scss']
})
export class MesreservationsComponent implements OnInit {
  lesreservations = [];
  lesaires = [];
  lesrestaurants = [];

  //Variable de conditions pour affichage 
  lookReserv:boolean=false;
  chooseAire:boolean=false;
  messagereserv:boolean=false;
  messageerreurreserv:boolean=false;

  //Variable de mémorisation des données saisies pour la réservation
  SelectedAire: string;
  SelectedResto: string;

  //https://danielykpan.github.io/date-time-picker/ @angular/forms
  SelectedDepart:Date;
  SelectedArrive:Date;
  constructor(private httpserver: compteService) { 
  this.httpserver=httpserver;
  }
  ngOnInit() {
  }




  voirReservations(){

    this.httpserver.getAllReservations().subscribe(data=>{
      console.log("Les trajets de l abonne : ");
      console.log(data);
      if(data==0){

      }else{
        this.lookReserv=true;
        this.lesreservations=data;
      }

  
    })
  }

  Reserver(){

      this.lookReserv=false;
      this.getAllAire();

  }


  getAllAire(){
     this.httpserver.getAllAire().subscribe(data=>{
      console.log("Les trajets de l abonne : ");
      console.log(data);
      if(data==0){

      }else{
        
        this.lesaires=data;
        this.SelectedAire=this.lesaires[0].libelle
      }

  
    })


  }

  getEtablissement(){
    console.log("Aire selectionne par le client : "+this.SelectedAire);
    this.httpserver.getEtablissementByAire(this.SelectedAire).subscribe(data=>{
     
      console.log(data);
      if(data==0){

      }else{
        this.chooseAire=true;
        this.lesrestaurants=data;
        this.SelectedResto=this.lesrestaurants[0].libelle;
      }

  
    })

    
  }

  sendDataReserv(/*form: NgForm*/){

    var get:any;
      console.log("Reservation " + this.SelectedAire + " " + this.SelectedResto + " " + this.SelectedArrive
                  + " " + this.SelectedDepart);
  

      this.httpserver.findIdRestoAire(this.SelectedAire,this.SelectedResto).subscribe(data=>{


      console.log("Composant reservations ID RESTO AIRE "+ data);
             //On souscrit auprès d'une fonction du Service HTTP
      this.httpserver.Reserver(parseInt(data.toString(),10),this.SelectedArrive,this.SelectedDepart).subscribe(data=>{
        console.log ("Connect Component Identifiant recuperer " +data);
        //this.identifiant=parseInt(data,10);
        console.log("Connect Component Identifiant Memorise" +data);
     /* if(data==0){
             this.messagereserv=true;
      }else{
        this.messageerreurreserv=true
  
      }*/
      })



      })


    

      
  
    }
  

  

}
