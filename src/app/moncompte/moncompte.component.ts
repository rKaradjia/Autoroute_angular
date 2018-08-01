import { Component, OnInit } from '@angular/core';
import { compteService } from '../../../services/compteService';//Services http

@Component({
  selector: 'app-moncompte',
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.scss']
})
export class MoncompteComponent implements OnInit {
  info:any;
  oldmdp:string;
  newmdp:string;
  messagenewMDP:boolean=false;
  erreurnewmdp:boolean=false;

  constructor(private httpserver: compteService) {
    this.httpserver=httpserver;
          this.infoCompte()

  }

  ngOnInit() {
  }


  infoCompte(){

    this.httpserver.infoCompte().subscribe(data=>{
      console.log("Les infos : ");
      console.log(data);
      //console.log(data.cp)
      this.info=data;
      
    })

  }


  modifyPassword(){
      this.httpserver.getPassword(this.oldmdp).subscribe(data=>{
        console.log("Les infos : ");
        console.log(data.toString());
        //console.log(data.cp)
        if(data==true){
        
                 this.httpserver.updatePassword(this.newmdp).subscribe(data=>{
                  console.log("Les infos : ");
                  console.log(data);
                  //console.log(data.cp)
                  this.info=data;
                  this.messagenewMDP=true;
                })
        }
        else{

            console.log("pas de correspondance");
            this.erreurnewmdp=true

        }
        
      })
  
    


  }

}
