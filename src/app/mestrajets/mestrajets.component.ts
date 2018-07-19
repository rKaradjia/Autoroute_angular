import { Component, OnInit } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http

@Component({
  selector: 'app-mestrajets',
  templateUrl: './mestrajets.component.html',
  styleUrls: ['./mestrajets.component.scss']
})
export class MestrajetsComponent implements OnInit {
  lestrajets=[];

  constructor(private httpserver: compteService) {

    this.httpserver=httpserver;
    this.trajetsAbonne();
    
   }

  ngOnInit() {
  }


trajetsAbonne(){
  this.httpserver.getAllTrajets().subscribe(data=>{
    console.log("Les trajets de l abonne : ");
    console.log(data);
    this.lestrajets=data;

  })




}

}
