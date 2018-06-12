import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isAuth = false;


  //appareilStatus: string = 'éteint';
 /* @Input() abonnementName: string;
  @Input() abonnementStatus: string;*/


  constructor() {

    setTimeout(

      () => {

        this.isAuth = true;

      }, 4000

    );

  }

  onAllumer() {

    console.log('On allume tout !');

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
