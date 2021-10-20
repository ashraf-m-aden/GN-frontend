import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.sass"],
})
export class AddPatientComponent {
  patientForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      gender: ["", [Validators.required]],
      mobile: [""],
      matricule: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      maritalStatus: [""],
      address: [""],
      bGroup: [""],
      uploadImg: [""],
    });
  }
  onSubmit() {
    console.log("Form Value", this.patientForm.value);
  }
}
