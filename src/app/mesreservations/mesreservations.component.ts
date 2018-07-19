import { Component, OnInit } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http

@Component({
  selector: 'app-mesreservations',
  templateUrl: './mesreservations.component.html',
  styleUrls: ['./mesreservations.component.scss']
})
export class MesreservationsComponent implements OnInit {
  lesreservations = [];
  lookReserv:boolean=false


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
}
