import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-ordonnance',
  templateUrl: './add-ordonnance.component.html',
  styleUrls: ['./add-ordonnance.component.sass']
})
export class AddOrdonnanceComponent implements OnInit {
  selectedRowData: selectRowInterface;


  rows = [];
  newUserImg = "assets/images/user/user1.jpg";
  data = [];
  filteredData = [];
  editForm: FormGroup; // form pour les s
  register: FormGroup;
  selectedOption: string;
  columns = [
    { name: "medicament" },
    { name: "frequence" },
    {name: "id"}

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

  }
  ngOnInit() {
    this.HFormGroup1 = this._formBuilder.group({
      contenu: ["", Validators.required],
    });
    this.register = this.fb.group({
      medicament: ["", [Validators.required]],
      frequence: ["", [Validators.required]],
      id: [""]

    });

  }

  onSelected(medoc){
    this.register.get('medicament').setValue(medoc);
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

    window.open( "#/doctor/patients/ordonnance", "_blank");
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
}
// tslint:disable-next-line:class-name
export interface selectRowInterface {
  medicament: string;
  frequence: number;
}
