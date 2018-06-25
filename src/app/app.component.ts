import { compteService } from './../../services/compteService'; //represente le contenu de la table dans la BDD 
//+ requete HTTP
import { Component, Input } from '@angular/core';

//connexion au serveur nodeJS




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'app';
  isAuth = false;
  corecord = false;
  lastUpdate = new Date();
  constructor() {

    setTimeout(

      () => {

        this.isAuth = true;

      }, 4000

    );

  }
  /*lastUpdate = new Promise((resolve, reject) => {

    const date = new Date();

    setTimeout(

      () => {

        resolve(date);

      }, 2000

    );

  });*/



    //realisation des requetes HTTP





    connectrecord(){

         this.corecord=true;


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
