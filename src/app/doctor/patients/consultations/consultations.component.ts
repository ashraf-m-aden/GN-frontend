import { Consultation } from './consultation.model';
import { ConsultationService } from '../../services/consultation.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';

interface DataItem {
  date: Date;
  isGN: boolean;
  initial: boolean;
  doctor: string;
}

interface ColumnItem {
  name: string;
}
@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.sass']
})
export class ConsultationsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, OnChanges {
  @Output() sendData = new EventEmitter<Array<string>>(); // il envoit l'id de la consultation souhaité et si c initial ou pas
  @Input() page: string;

  rows = [];
  newUserImg = "assets/images/user/user1.jpg";
  data = [];
  renderedData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  idPatient: string = localStorage.getItem("idPatient");
  displayedColumns: ColumnItem[] = [
    {
      name: 'Date',
    },
    {
      name: 'Docteur',
    },
    {
      name: 'Interne',
    },
    {
      name: 'Initiale',
    }
  ];
  consultation: Consultation | null;
  HFormGroup1: FormGroup;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              public consultationService: ConsultationService,
    // tslint:disable-next-line:variable-name
              private fb: FormBuilder


  ) {
    super();
    this.editForm = this.fb.group({
      medicament: new FormControl(),
      frequence: new FormControl(),
    });
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.loadData();
    this.HFormGroup1 = this._formBuilder.group({
      contenu: ["", Validators.required],
    });
    this.register = this.fb.group({
      medicament: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      frequence: ["", [Validators.required]],

    });
  }
  ngOnChanges(): void {

   switch (this.page) {
     case '11':
       this.loadGN();
       break;
   case '12':
     this.loadExterne();
     break;

     default:
       this.loadData();
       break;
   }
  }

  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  checkConsultation(id, initial) {  // envoie au tree l'id de la consultation desirée
    this.sendData.emit([id, initial]);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */

   loadData() {
    this.consultationService.getAllConsultations(localStorage.getItem('idPatient'))    .subscribe(
      async ( data) => {
        await data.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 0;
          }
        });
        this.renderedData = data;


      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
   loadGN() {
    this.consultationService.getAllConsultations(localStorage.getItem('idPatient'))    .subscribe(
      async ( data) => {
        await data.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 0;
          }
        });
        this.renderedData = data.filter(result => {
          return result.isGN === true;
        });

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
  loadExterne() {
    this.consultationService.getAllConsultations(localStorage.getItem('idPatient'))    .subscribe(
      async ( data) => {
        await data.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 0;
          }
        });
        this.renderedData = data.filter(result => {
          return result.isGN === false;
        });

      },
      (error: HttpErrorResponse) => {
        console.log(error.name + " " + error.message);
      }
    );
  }
}
