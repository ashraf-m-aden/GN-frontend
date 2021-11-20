import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-menu-page',
  templateUrl: './tree-menu-page.component.html',
  styleUrls: ['./tree-menu-page.component.sass']
})
export class TreeMenuPageComponent  implements OnInit, OnChanges {

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

  addSuivi(id){

    this.page = "01";
    this.id = id;
  }

}
