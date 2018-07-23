import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AbonnementComponent } from './abonnement/abonnement.component';
import { FormsModule } from '@angular/forms';
import { TrafficComponent } from './traffic/traffic.component';
import { MestrajetsComponent } from './mestrajets/mestrajets.component';
import { MesreservationsComponent } from './mesreservations/mesreservations.component';
import { ConnectRecordComponent } from './connect-record/connect-record.component';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { compteService } from './../../services/compteService';
//import { MaterialModule } from './material.module';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AbonnementComponent,
    TrafficComponent,
    MestrajetsComponent,
    MesreservationsComponent,
    ConnectRecordComponent,
    MoncompteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserModule,
    HttpModule,
    /*BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),*/
    //ANGULAR MATERIALS
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    //DATETIME PICKER
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    BrowserAnimationsModule
  ],
  providers: [compteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
