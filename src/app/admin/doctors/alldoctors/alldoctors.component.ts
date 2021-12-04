import { Router } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { DoctorsService } from "../../services/doctors.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Doctors } from "./doctors.model";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: "app-alldoctors",
  templateUrl: "./alldoctors.component.html",
  styleUrls: ["./alldoctors.component.sass"],
})
export class AlldoctorsComponent
  implements OnInit
{
  displayedColumns = [
    "name",
    "grade",
    "matricule",
    "gender",
  ];
  isTblLoading = true;
  doctors: Array<Doctors> | null;
  constructor(
    public httpClient: HttpClient,
    // tslint:disable-next-line:variable-name
    public dialog: MatDialog,  private _snackBar: MatSnackBar,
    public doctorsService: DoctorsService,
    private router: Router, private doctorService: DoctorsService
  ) {
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  ngOnInit() {
    this.loadData();
  }


  checkDoctor(idDoctor) {
    this.router.navigateByUrl("/admin/doctors/doctor-profile/" + idDoctor);
  }

  public loadData() {
    this.doctorService.getAllDoctors().subscribe((data) => {
      this.doctors = data;
      this.isTblLoading = false;
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);
        this.isTblLoading = false;

      }
      else {
        this.isTblLoading = false;
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

}
