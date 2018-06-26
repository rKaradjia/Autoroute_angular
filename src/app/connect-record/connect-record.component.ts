import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-connect-record',
  templateUrl: './connect-record.component.html',
  styleUrls: ['./connect-record.component.scss']
})
export class ConnectRecordComponent implements OnInit {
  
  @Input() isco: boolean;
  @Output() authorClick: EventEmitter<String> = new EventEmitter<String>();

  constructor() { }

  ngOnInit() {
  }

/*CONNECTION*/
  onConnecter(event, author){

  //  this.isco.emit(true); //emmiting the event.

  }


  onEnregistrer(){
    this.isco=false;

  }

}
