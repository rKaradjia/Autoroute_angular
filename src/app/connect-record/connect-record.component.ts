import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-connect-record',
  templateUrl: './connect-record.component.html',
  styleUrls: ['./connect-record.component.scss']
})
export class ConnectRecordComponent implements OnInit {
  isco:boolean = true;

  constructor() { }

  ngOnInit() {
  }


  onConnecter(){
    this.isco=true;

  }


  onEnregistrer(){
    this.isco=false;

  }

}
