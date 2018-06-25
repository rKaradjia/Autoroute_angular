import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    /*BrowserAnimationsModule,
    LayoutModule,
    RouterModule.forRoot(appRoutes),*/
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  providers: [compteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
