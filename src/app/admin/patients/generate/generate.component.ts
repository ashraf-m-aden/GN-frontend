import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.sass']
})
export class GenerateComponent implements OnInit {
  isLinear = false;
  HFormGroup1: FormGroup;
  active = 1;
  constructor(
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.HFormGroup1 = this._formBuilder.group({
      contenu: ["", Validators.required],
    });
  }

}
