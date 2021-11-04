import { Consultation } from './consultation.model';
import { ConsultationService } from './consultation.service';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { fromEvent, BehaviorSubject, Observable, merge, map } from 'rxjs';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.sass']
})
export class ConsultationsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
    selectedRowData: selectRowInterface;

    rows = [];
  newUserImg = "assets/images/user/user1.jpg";
  data = [];
  filteredData = [];
  editForm: FormGroup;
  register: FormGroup;
  selectedOption: string;
  columns = [
    { name: "medicament" },
    { name: "frequence" },

  ];
  displayedColumns = [
    "date",
    "doc",
    "contenu",
  ];
  exampleDatabase: ConsultationService | null;
  dataSource: ExampleDataSource | null;
  selection = new SelectionModel<Consultation>(true, []);
  index: number;
  id: number;
  consultation: Consultation | null;
  isLinear = false;
  HFormGroup1: FormGroup;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              public consultationService: ConsultationService,
              private snackBar: MatSnackBar,
              private router: Router,
              private modalService: NgbModal,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
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
  refresh() {
    this.loadData();
  }

  addRow(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.register.patchValue({
      id: this.getId(10, 100),
    });
  }
  onAddRowSave(form: FormGroup) {
    this.data.push(form.value);
    this.data = [...this.data];
    // console.log(this.data);
    form.reset();
    this.modalService.dismissAll();
    this.showNotification(
      "bg-green",
      "Add Record Successfully",
      "bottom",
      "right"
    );
  }
  onEditSave(form: FormGroup) {
    this.data = this.data.filter((value, key) => {
      if (value.id === form.value.id) {
        value.firstName = form.value.firstName;
        value.lastName = form.value.lastName;
        value.phone = form.value.phone;
        value.gender = form.value.gender;
        value.email = form.value.email;
        value.address = form.value.address;
      }
      this.modalService.dismissAll();
      return true;
    });
    this.showNotification(
      "bg-black",
      "Edit Record Successfully",
      "bottom",
      "right"
    );
  }
  editRow(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      medicament: row.medicament,
      frequence: row.frequence,
    });
    this.selectedRowData = row;
  }
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  checkOrdonnance() {

    this.router.navigateByUrl("/admin/patients/ordonnance");
  }
  deleteRow(row) {
    this.data = this.arrayRemove(this.data, row.id);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
  }
  arrayRemove(array, id) {
    return array.filter((element) => {
      return element.id !== id;
    });
  }
  showNotification(colorName, text, placementFrom, placementAlign) {
    this._snackBar.open(text, "", {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */

  public loadData() {
    this.exampleDatabase = new ConsultationService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, "keyup").subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }
}
export class ExampleDataSource extends DataSource<Consultation> {
  filterChange = new BehaviorSubject("");
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Consultation[] = [];
  renderedData: Consultation[] = [];
  constructor(
    public exampleDatabase: ConsultationService,
    public paginator: MatPaginator,
    // tslint:disable-next-line:variable-name
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Consultation[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllConsultations();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((consultation: Consultation) => {
            const searchStr = (
              consultation.contenu +
              consultation.date
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() { }
  /** Returns a sorted copy of the database data. */
  sortData(data: Consultation[]): Consultation[] {
    if (!this._sort.active || this._sort.direction === "") {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = "";
      let propertyB: number | string = "";
      switch (this._sort.active) {
        case "id":
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case "contenu":
          [propertyA, propertyB] = [a.contenu, b.contenu];
          break;
        case "date":
          [propertyA, propertyB] = [a.date, b.date];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === "asc" ? 1 : -1)
      );
    });
  }
}
// tslint:disable-next-line:class-name
export interface selectRowInterface {
  medicament: string;
  frequence: number;
}
