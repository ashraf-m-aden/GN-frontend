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

  consultationId: string; // c'est l'id de la consultation saved
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.idConsultation.emit(this.id);
    this.isPage(this.page);
  }
  checkConsultation(id){ // permet d'envoyez le id de la consultation desirée on va directement au saved-consultation
    this.consultationId = id;
    this.page = "14";
  }

  goToPage(page) {
    this.page = page;
  }
  addSuivi(id){ // permet d'aller a la page suivi consultation

    this.page = "01";
    this.id = id;
  }

  isPage(page){   // permet de voir si ya une page qui a eté cliqué, c pour afficher les explorations
    if (!page) {
      return false;
    } else if (page[0] === '2') { // si oui elle regarde si la page contient le numero 2 comme premier chiffre
      return true;
    }
    else {return false;
    }
  }



}
