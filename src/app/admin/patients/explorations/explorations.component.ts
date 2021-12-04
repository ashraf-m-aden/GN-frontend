import { Router } from '@angular/router';
import { Consultation } from './../consultations/consultation.model';
import { ConsultationService } from 'src/app/admin/services/consultation.service';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-explorations',
  templateUrl: './explorations.component.html',
  styleUrls: ['./explorations.component.sass']
})
export class ExplorationsComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() idExpoType: string;
  listOfData: Consultation[];
  constructor(
    // tslint:disable-next-line:variable-name
    private consultationS: ConsultationService, private router: Router, private _snackBar: MatSnackBar,

  ) {
  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {

    this.consultationS.getExplorations(this.idExpoType).subscribe(async (data: any) => {
      await data.forEach(element => {
        element.type = this.type;

      });
      this.listOfData = data;
    }, (error: HttpErrorResponse) => {
      this.listOfData = [];
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);
      } else if (error.status === 404) {
        this.showNotification(
          "bg-red",
          error.error,
          "bottom",
          "right"
        );
      }
      else {
        this.showNotification(
          "bg-red",
          "Une erreur est survenue veuillez reessayer",
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

  goFile(url) {

    window.open(url, "_blank");
  }

}
