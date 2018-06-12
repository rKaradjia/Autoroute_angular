import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {

  liberte: string = 'vous payez quand vous utilisé';

   premium: string = 'tarif au mois';

   premiumplus: string = 'premium plus';



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
}
