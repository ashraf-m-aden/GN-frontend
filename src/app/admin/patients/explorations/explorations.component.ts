import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Exploration } from './exploration.model';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.sass']
})
export class ExplorationsComponent implements OnInit, OnChanges {
  @Input() type: string;
  listOfData: Exploration[];
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    console.log(this.type);

    this.listOfData = [
      {
        id: '1',
        date: '24/06/2021',
        user: 'Djibril Mohamed',
        type: this.type,
        name: 'Hemathologie',
        demande: "#/admin/patients/analyse",
        resultat: "../../../../assets/images/image-gallery/pdf.jpg",
      },
      {
        id: '1',
        date: '24/06/2021',
        user: 'Djibril Mohamed',
        type: this.type,
        name: 'Hemathologie',
        demande: "#/admin/patients/analyse",
        resultat: "../../../../assets/images/image-gallery/pdf.jpg",
      },
      {
        id: '1',
        date: '24/06/2021',
        user: 'Djibril Mohamed',
        type: this.type,
        name: 'Hemathologie',
        demande: "#/admin/patients/analyse",
        resultat: "../../../../assets/images/image-gallery/pdf.jpg",
      },
    ];

  }

}
