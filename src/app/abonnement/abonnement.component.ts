import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {

   liberte: string = 'vous payez quand vous utilisé';

   premium: string = 'tarif au mois';

   premiumplus: string = 'premium plus';

   //@Input() estdispo: boolean;

   @Input() abonnementName: string;// ATTENTION : les declarations de ce type ne peuvent
   @Input() abonnementStatus: string;//etre utilise que dans le component de 
                                     //hirarchie superieur : 
              //https://openclassrooms.com/courses/developpez-avec-angular/gerez-des-donnees-dynamiques*/

/*
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

  ];*/



   isAuth = false;

 // constructor() { }

 constructor() {

  setTimeout(

    () => {

      this.isAuth = true;

    }, 4000

  );

}

  ngOnInit() {
  }



  getliberte() {

    return this.liberte;

  }

  onAllumer() {

    console.log('On allume tout !');

}


getColor() {

  if(this.abonnementStatus === 'disponible') {

    return 'green';

  } else if(this.abonnementStatus === 'indisponible') {

    return 'red';

  }
}

}
