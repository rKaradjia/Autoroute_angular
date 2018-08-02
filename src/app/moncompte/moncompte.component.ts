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
  messageabonnement:boolean=false;
  lesabonnements=[]
  SelectedAbonnement:string;
  dateDerniereModif:string
  

  constructor(private httpserver: compteService) {
    this.httpserver=httpserver;
          this.infoCompte()
          this.getAllabonnement()

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
    this.messageabonnement=false;
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

getAllabonnement(){

this.httpserver.getNomOfAbonnements().subscribe(data=>{
  this.lesabonnements=data
  this.SelectedAbonnement=this.lesabonnements[0].nom
})

}



modifyAbonnement(){

    //this.SelectedAbonnement
    this.httpserver.updateAbonnement(this.SelectedAbonnement).subscribe(data1=>{
      
               console.log(data1);
               this.httpserver.infoCompte().subscribe(data=>{
                console.log("Les infos : ");
                console.log(data);
                //console.log(data.cp)
                this.info=data;
                this.dateDerniereModif=data1.toString();
                this.messageabonnement=true
                
              })

    })



  }

}
