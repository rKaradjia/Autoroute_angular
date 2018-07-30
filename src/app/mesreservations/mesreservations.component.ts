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
  this.getAllAire();
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
        console.log(" Type de la date "+typeof this.lesreservations[0].dateA);
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

//DEFINIR LES CONDITIONS 
 //Possibilite de modifier decaler d'une heure par exemple
  modifyReserv(){}



  //supprression pure et simple
  deleteReserv(index:number){

    this.httpserver.getAllReservations().subscribe(data=>{ // on recupere le tableau
      console.log("Les trajets de l abonne : ");           //correspondant au reserv(s) 
      console.log(data);                                   //du client 
      if(data==0){
               //Message erreur
      }else{
        this.lookReserv=true;
        this.lesreservations=data;   //Reservation du client
        console.log(" Content "+this.lesreservations[index].dateA);
        console.log(" datecut "+this.lesreservations[index].dateA.substring(0,10));

        //Date de la reservation
        let datereservString = this.lesreservations[index].dateA
        let datereserv = new Date(datereservString);
       
        //Date du jour
        var dateFormat = require('dateformat');
        var datenow = new Date();
        console.log("date now"+datenow + "  date reserv "+datereserv ) //Fri Jul 27 2018 11:36:56 GMT+0200 (CEST)
        //dateFormat(now, "yyyy-mm-dd");
        //console.log("Date du jour"+"SELECTION");

        if(datereserv>=datenow){

          var aire:string=this.lesreservations[index].nomAire;
          var resto:string=this.lesreservations[index].libelle;
          this.httpserver.findIdRestoAire(aire,resto).subscribe(data=>{
            var idrestoAire=parseInt(data.toString(),10)
            this.httpserver.annulerReserv(idrestoAire,this.lesreservations[index].dateA,this.lesreservations[index].dateD).subscribe(data=>{ // on recupere le tableau
              console.log("Les reserv de l abonne : ");           //correspondant au reserv(s) 
              console.log(data);                    

            })

          })  

        }else{
                console.log("Impossible de supprimer une reserv passé ou du jour");



        }
 
      }

  
    })


  }
  

  

}
