import { Component, OnInit } from '@angular/core';
import { Exploration } from './exploration.model';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.sass']
})
export class ExplorationsComponent implements OnInit {

  listOfData: Exploration[] = [
    {
      id: '1',
      date: '24/06/2021',
      doctor: 'Djibril Mohamed',
      type: 'Biologie',
      name: 'Hemathologie',
      demande: "#/doctor/patients/analyse",
      resultat: "../../../../assets/images/image-gallery/pdf.jpg",
    },
    {
      id: '1',
      date: '24/06/2021',
      doctor: 'Djibril Mohamed',
      type: 'Biologie',
      name: 'Hemathologie',
      demande: "#/doctor/patients/analyse",
      resultat: "../../../../assets/images/image-gallery/pdf.jpg",
    },
    {
      id: '1',
      date: '24/06/2021',
      doctor: 'Djibril Mohamed',
      type: 'Biologie',
      name: 'Hemathologie',
      demande: "#/doctor/patients/analyse",
      resultat: "../../../../assets/images/image-gallery/pdf.jpg",
    },
  ];
    constructor() { }

  ngOnInit(): void {
  }

}
