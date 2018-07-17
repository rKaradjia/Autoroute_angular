import { ConnectRecordComponent } from './connect-record/connect-record.component';
import { compteService } from './../../services/compteService'; //represente le contenu de la table dans la BDD 
//+ requete HTTP
import { Component, Input } from '@angular/core';

//Import de composants


//connexion au serveur nodeJS




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'app';
 // isAuth = false;
  lastUpdate = new Date();


  isAuth:boolean = false; //affiche la barre de nav correspondant à l'état du visiteur : estCo / nonCo
  corecord:boolean = false; /*Affichage du composant de connection/enregistrement*/

  constructor() {}
  /*lastUpdate = new Promise((resolve, reject) => {

    const date = new Date();

    setTimeout(

      () => {

        resolve(date);

      }, 2000

    );

  });*/



    //realisation des requetes HTTP

//MENU


   /*LOGIN*/
    connectrecord(){
      /*Affichage du composant de connection/enregistrement*/
         this.corecord=true;


    }

    /*afficher la barre de nav pour les utilisateurs authentifié*/
    showTrueCoNavBar(){
          this.isAuth=true;
    }

    /*delloguer*/
    logOut(){
      
      this.isAuth=false;
      this.corecord=true;
    }







//connect-record.component
   seConnecter(event: Event) {
      console.log(event); // You will see something here))
   
   }

   sEnregistrer(event: Event) {
    console.log(event); // You will see something here))
 
   }



//tests directives par attribut
  abonnementName = 'ma première directive par attribut';


  //appareilStatus: string = 'éteint';
 /* @Input() abonnementName: string;
  @Input() abonnementStatus: string;*/

  abonnements = [

    {

      name: 'premium',

      status: 'disponible'

    },

    {

      name: 'liberte',

      status: 'indisponible'

    },

    {

      name: 'premiumplus',

      status: 'disponible'

    }

  ];
  

  onAllumer() {

    console.log('On allume tout !');
 //   this.compteService.getAllCats();

}

  onSession() {

  console.log('code à définit pour l ouverture de la session');

}

/*getColor() {

  if(this.appareilStatus === 'allumé') {

    return 'green';

  } else if(this.appareilStatus === 'éteint') {

    return 'red';

  }*/
  
}
/*getStatus() {

  return this.appareilStatus;

}

}*/
