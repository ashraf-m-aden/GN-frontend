import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-menu-page',
  templateUrl: './tree-menu-page.component.html',
  styleUrls: ['./tree-menu-page.component.sass']
})
export class TreeMenuPageComponent  implements OnInit, OnChanges {

  @Input() page: string;
  @Input() Expotype: string; // pour avoir le type d'exploration
  @Input() id: string; // id pour regarder les consultations existante
  @Output() idConsultation = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.idConsultation.emit(this.id);
    this.isPage(this.page);
  }
  checkConsultation(id){

    this.page = "14";
    this.id = id;
  }

  addSuivi(id){

    this.page = "01";
    this.id = id;
  }

  isPage(page){
    if (!page) {
      return false;
    } else if (page[0] === '2') {
      console.log(this.Expotype);

      return true;
    }
    else {return false;
    }
  }
}
