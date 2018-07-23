import { Component, OnInit } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http
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
  lookReserv:boolean=false;
  chooseAire:boolean=false;

  SelectedAire: string = null;
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
      }

  
    })

    
  }


  

}
