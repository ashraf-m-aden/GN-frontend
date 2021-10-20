import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-patient",
  templateUrl: "./edit-patient.component.html",
  styleUrls: ["./edit-patient.component.sass"],
})
export class EditPatientComponent {
  patientForm: FormGroup;
  formdata = {
    name: "Pooja",
    gender: "Female",
    matricule : '111111',
    mobile: "123456789",
    maritalStatus: "celibataire",
    bGroup: "O+",
    address: "101, Elanxa, New Yourk",
    dob: "1987-02-17T14:22:18Z",
    uploadImg: "ghjkl"
  };
  constructor(private fb: FormBuilder) {
    this.patientForm = this.createContactForm();
  }
  onSubmit() {
    console.log("Form Value", this.patientForm.value);
  }
  createContactForm(): FormGroup {
    return this.fb.group({
      name: [
        this.formdata.name,
        [Validators.required, Validators.pattern("[a-zA-Z]+")],
      ],
      gender: [this.formdata.gender, [Validators.required]],
      mobile: [this.formdata.mobile, [Validators.required]],
      matricule: [this.formdata.mobile, [Validators.required]],
      maritalStatus: [this.formdata.maritalStatus],

      bGroup: [this.formdata.bGroup],
      uploadImg: [this.formdata.uploadImg],
      address: [this.formdata.address],
      dob: [this.formdata.dob, [Validators.required]],
    });
  }
}
