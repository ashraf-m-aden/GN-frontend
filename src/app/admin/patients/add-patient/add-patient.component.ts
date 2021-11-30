import { FileUploadService } from './../../services/file-upload.service';
import { UploadComponent } from './../upload/upload.component';
import { PatientService } from './../../services/patient.service';
import { Patient } from './../allpatients/patient.model';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: "app-add-patient",
  templateUrl: "./add-patient.component.html",
  styleUrls: ["./add-patient.component.sass"],
})
export class AddPatientComponent {
  patientForm: FormGroup;
  patientFamilleForm: FormGroup;
  patient = new Patient();
  patientImgUrl = "";
  basePath = '/patients/profil'; // le nom du dossier pour l'upload des photo patients

  selectedFiles: FileList;
  currentFileUpload: UploadComponent;
  percentage: number;

  constructor(private fb: FormBuilder, private patientS: PatientService,
              public httpClient: HttpClient,
              public dialog: MatDialog,
              private router: Router,
              private modalService: NgbModal,
    // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private uploadService: FileUploadService
  ) {
    this.patientForm = this.fb.group({
      name: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      gendarme: [true],
      numero: [""],
      matricule: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      maritalStatus: [""],
      address: [""],
      bloodType: [""],
      img: ['']

    });
    this.patientFamilleForm = this.fb.group({
      name: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      gendarme: [false],
      numero: [""],
      matricule: ["", [Validators.required]],
      dossier: ["", [Validators.required]],
      dob: ["", [Validators.required]],
      maritalStatus: [""],
      address: [""],
      bloodType: [""],
      img: ['']
    });
  }
  onSubmit() {
    this.patient = { ...this.patientForm.value };
    this.patient.img = this.currentFileUpload.url;

    this.patientS.addPatient(this.patient).subscribe((patient: Patient) => {
      this.showNotification(
        "bg-green",
        "Nouveau patient enregistré",
        "bottom",
        "right"
      );
      this.router.navigateByUrl('/admin/patients/patient-profile/' + patient._id);
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);
      }
      else {
        this.showNotification(
          "bg-red",
          "Un probleme est survenu, veuillez reessayer",
          "bottom",
          "right"
        );
      }
    });
  }

  onSubmitFamille() {

    this.patient = { ...this.patientForm.value };
    this.patient.img = this.currentFileUpload.url;
    this.patientS.addPatient(this.patient).subscribe((patient: Patient) => {
      this.showNotification(
        "bg-green",
        "Nouveau patient enregistré",
        "bottom",
        "right"
      );
      this.router.navigateByUrl('/admin/patients/patient-profile/' + patient._id);
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);
      }
      else {
        this.showNotification(
          "bg-red",
          "Un probleme est survenu, veuillez reessayer",
          "bottom",
          "right"
        );
      }
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

  async selectFile(event) {
    this.selectedFiles = event.target.files;
    await this.upload();

  }

  upload() {
    const file = this.selectedFiles.item(0);
    this.selectedFiles = undefined;

    this.currentFileUpload = new UploadComponent(file);
    this.uploadService.pushFileToStorage(this.currentFileUpload, this.basePath).subscribe(
      percentage => {
        this.percentage = Math.round(percentage);
        if (this.percentage === 100) {
        }
      },
      error => {
        this.showNotification(
          "bg-red",
          "Un probleme est survenu, veuillez reessayer",
          "bottom",
          "right"
        );      }
    );
  }

}
