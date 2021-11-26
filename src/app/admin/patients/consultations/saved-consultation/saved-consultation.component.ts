import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-saved-consultation',
  templateUrl: './saved-consultation.component.html',
  styleUrls: ['./saved-consultation.component.sass']
})
export class SavedConsultationComponent implements OnInit {
  @Input() idConsultation: string;
  @Output() id = new EventEmitter<string>();

  data = [
    {
      url: '#/admin/patients/referer',
      title: 'Consultation prescrite'
    },
    {
      url: '#/admin/patients/ordonnance',
      title: 'Ordonnance medicale'
    },
    {
      url: '#/admin/patients/analyse',
      title: 'Ordonnance prescriptive'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  checkFile(url){  // redirect to the file page
    window.open( url, "_blank");
  }
  addSuivi() { // send the id of the consultation we want to follow
    this.id.emit(this.idConsultation);
  }

}
