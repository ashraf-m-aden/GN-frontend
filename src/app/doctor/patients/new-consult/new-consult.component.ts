import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-consult',
  templateUrl: './new-consult.component.html',
  styleUrls: ['./new-consult.component.sass']
})
export class NewConsultComponent implements OnInit, OnChanges {

  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {

    console.log(this.type);
  }

}
