import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-suivi-externe',
  templateUrl: './add-suivi-externe.component.html',
  styleUrls: ['./add-suivi-externe.component.scss']
})
export class AddSuiviExterneComponent implements OnInit {
  isCheckedReferer = false; // dit si on doit envoyer ailleurs ou pas
  isCheckedOM = false; // si on doit faire une ordonnance medicale
  isCheckedOP = false; // dit si on doit faire une ordonnance prescriptive

  array = ["x"];
  constructor() {

  }

  ngOnInit() {

  }
  addFile(){
    this.array.push('x');
  }


}
