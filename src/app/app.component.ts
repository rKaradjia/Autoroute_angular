import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  isAuth = false;



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


}
