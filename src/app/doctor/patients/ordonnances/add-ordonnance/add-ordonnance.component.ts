import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-ordonnance',
  templateUrl: './add-ordonnance.component.html',
  styleUrls: ['./add-ordonnance.component.scss']
})
export class AddOrdonnanceComponent implements OnInit {
  selectedRowData: selectRowInterface;

  isCheckedReferer = false; // dit si on doit envoyer ailleurs ou pas
  isCheckedOM = false; // si on doit faire une ordonnance medicale
  isCheckedOP = false; // dit si on doit faire une ordonnance prescriptive

  rows = [];
  newUserImg = "assets/images/user/user1.jpg";
  dataMedoc = [];
  dataAnalyse = [];
  filteredData = [];
  editForm: FormGroup; // form pour les medocs
  editForm2: FormGroup; // form pour les analyses
  registerMedoc: FormGroup;
  registerAnalyse: FormGroup;
  selectedOption: string;
  columns = [
    { name: "medicament" },
    { name: "frequence" },

  ];
  index: number;
  id: number;
  isLinear = false;
  HFormGroup1: FormGroup;
  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private modalService: NgbModal,
    // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      medicament: new FormControl(),
      frequence: new FormControl(),

    });
    this.editForm2 = this.fb.group({
      analyse: new FormControl(),

    });
  }
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      contenu: ["", Validators.required],
    });
    this.registerMedoc = this.fb.group({
      medicament: ["", [Validators.required]],
      frequence: ["", [Validators.required]],

    });
    this.registerAnalyse = this.fb.group({
      analyse: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],

    });
  }

  onSelectedMedoc(medoc){
    this.registerMedoc.get('medicament').setValue(medoc);
  }

  addRowMedoc(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.registerMedoc.patchValue({
      id: this.getId(10, 100),
    });
  }
  onSelectedAnalyse(medoc){
    this.registerAnalyse.get('medicament').setValue(medoc);
  }

  addRowAnalyse(content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.registerAnalyse.patchValue({
      id: this.getId(10, 100),
    });
  }
  onAddRowSaveMedoc(form: FormGroup) {
    this.dataMedoc.push(form.value);
    this.dataMedoc = [...this.dataMedoc];
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
  onAddRowSaveAnalyse(form: FormGroup) {
    this.dataAnalyse.push(form.value);
    this.dataAnalyse = [...this.dataAnalyse];
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
  onEditSaveMedoc(form: FormGroup) {
    this.dataMedoc = this.dataMedoc.filter((value, key) => {
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
  onEditSaveAnalyse(form: FormGroup) {
    this.dataAnalyse = this.dataAnalyse.filter((value, key) => {
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
  editRowMedoc(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm.setValue({
      medicament: row.medicament,
      frequence: row.frequence,
    });
    this.selectedRowData = row;
  }
  editRowAnalyse(row, rowIndex, content) {
    this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" });
    this.editForm2.setValue({
      analyse: row.analyse,
    });
    this.selectedRowData = row;
  }
  getId(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  checkOrdonnance() {

    window.open( "#/doctor/patients/ordonnance", "_blank");
  }
  checkAnalyse() {

    // this.router.navigateByUrl("/doctor/patients/analyse");
    window.open( "#/doctor/patients/analyse", "_blank");

  }
  deleteRowMedoc(row) {
    this.dataMedoc = this.arrayRemove(this.dataMedoc, row.id);
    this.showNotification(
      "bg-red",
      "Delete Record Successfully",
      "bottom",
      "right"
    );
  }
  deleteRowAnalyse(row) {
    this.dataAnalyse = this.arrayRemove(this.dataAnalyse, row.id);
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
}
// tslint:disable-next-line:class-name
export interface selectRowInterface {
  medicament: string;
  frequence: number;
}
