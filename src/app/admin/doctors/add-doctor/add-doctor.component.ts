import { Router } from '@angular/router';
import { DoctorsService } from './../../services/doctors.service';
import { Doctors } from './../alldoctors/doctors.model';
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileUploadService } from '../../services/file-upload.service';
import { UploadComponent } from '../../patients/upload/upload.component';
@Component({
  selector: "app-add-doctor",
  templateUrl: "./add-doctor.component.html",
  styleUrls: ["./add-doctor.component.sass"],
})
export class AddDoctorComponent {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  loading = false; // enregistrement
  docLoading = false; // chargement foto
  newDoc: Doctors;
  basePath = '/doctors/profil'; // le nom du dossier pour l'upload des photo docteurs

  selectedFiles: FileList;
  currentFileUpload: UploadComponent;
  constructor(private fb: FormBuilder, private docService: DoctorsService, private router: Router,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar, private storage: AngularFireStorage,
    // tslint:disable-next-line:variable-name
              private uploadService: FileUploadService
    ) {
    this.docForm = this.fb.group({
      name: ["", [Validators.required]],
      gender: ["", [Validators.required]],
      numero: [""],
      username: ["", [Validators.required]],
      password: ["", [Validators.required]],
      confirmPassword: ["", [Validators.required]],
      role: ["", [Validators.required]],
      grade: [""],
      matricule: ["", [Validators.required]],
      address: [""],
      email: [
        "",
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      dob: ["", [Validators.required]],
      img: [""],
    });
    this.newDoc = new Doctors();
  }
  onSubmit() {
    if (this.docForm.get('password').value === this.docForm.get('confirmPassword').value) {
      this.loading = true;
      this.newDoc = { ...this.docForm.value };
      this.newDoc.img = this.currentFileUpload.url;

      this.docService.addDoctors(this.newDoc).subscribe((doctor: Doctors) => {
        this.showNotification(
          "bg-green",
          "Nouveau docteur enregistré",
          "bottom",
          "right"
        );
        this.loading = false;

        this.router.navigateByUrl('/admin/doctors/doctor-profile/' + doctor._id);
      }, (error: HttpErrorResponse) => {
        this.loading = false;

        if (error.status === 401) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.router.navigate(["/authentication/signin"]);
        }
        else {
          this.loading = false;
          this.showNotification(
            "bg-red",
            "Un probleme est survenu, veuillez reessayer",
            "bottom",
            "right"
          );
        }
      });
    } else {
      this.showNotification(
        "bg-red",
        "Veuillez confirmer le mot de passe",
        "bottom",
        "right"
      );
    }
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

    this.docLoading = true;

    this.currentFileUpload = new UploadComponent(file);
    const filePath = `${this.basePath}/${this.currentFileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.currentFileUpload.file);

    uploadTask.snapshotChanges().
    subscribe(() => {
      storageRef.getDownloadURL().subscribe(downloadURL => {
        this.newDoc.img = downloadURL;
        this.docLoading = false;
      });
    },  error => {
      this.docLoading = false;
      this.showNotification(
        "bg-red",
        "Un probleme est survenu, veuillez reessayer",
        "bottom",
        "right"
      );
    });
}
}
