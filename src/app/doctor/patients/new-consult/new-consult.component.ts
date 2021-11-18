import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-consult',
  templateUrl: './new-consult.component.html',
  styleUrls: ['./new-consult.component.sass']
})
export class NewConsultComponent implements OnInit, OnChanges {

  @Input() page: string;
  @Input() id: string;
  @Output() idConsultation = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.idConsultation.emit(this.id);
  }
  checkConsultation(id){

    this.page = "14";
    this.id = id;
  }

}
