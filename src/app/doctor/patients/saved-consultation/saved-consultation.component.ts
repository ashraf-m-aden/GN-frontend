import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-saved-consultation',
  templateUrl: './saved-consultation.component.html',
  styleUrls: ['./saved-consultation.component.sass']
})
export class SavedConsultationComponent implements OnInit {
  @Input() idConsultation: string;
  data = [
    {
      url: '#/doctor/patients/consultation',
      title: 'Consultation prescrite'
    },
    {
      url: '#/doctor/patients/ordonnance',
      title: 'Ordonnance medicale'
    },
    {
      url: '#/doctor/patients/analyse',
      title: 'Ordonnance prescriptive'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }
  checkFile(url){
    window.open( url, "_blank");

  }

}
