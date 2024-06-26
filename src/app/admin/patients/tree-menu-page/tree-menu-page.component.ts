import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tree-menu-page',
  templateUrl: './tree-menu-page.component.html',
  styleUrls: ['./tree-menu-page.component.sass']
})
export class TreeMenuPageComponent  implements OnInit, OnChanges {

  @Input() page: string; // c'est la page à afficher mais aussi ca peut etre l'id de l'exploration à afficher
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
  checkConsultation(data){ // permet d'envoyez le id de la consultation desirée on va directement au saved-consultation
    this.consultationId = data[0];
    if (data[1]) {
      this.page = "14";
    } else {
      this.page = "15";

    }
  }

  goToPage(page) {
    this.page = page;
  }
  addSuivi(suivi){ // permet d'aller a la page suivi consultation
    this.idConsultation.emit(suivi[0]);

    switch (suivi[1] === true) {
      case true:
        this.page = '02';
        break;

      default:
        this.page = '01';

        break;
    }
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
