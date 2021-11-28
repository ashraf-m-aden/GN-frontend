import { Consultation } from './../consultation.model';
import { ConsultationService } from 'src/app/admin/services/consultation.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-suivi',
  templateUrl: './add-suivi.component.html',
  styleUrls: ['./add-suivi.component.scss']
})
export class AddSuiviComponent implements OnInit, OnChanges {
  isCheckedReferer = false; // dit si on doit envoyer ailleurs ou pas
  isCheckedOM = false; // si on doit faire une ordonnance medicale
  isCheckedOP = false; // dit si on doit faire une ordonnance prescriptive
  @Input() idConsultation: string;
  array = ["x"];
  consultation: Consultation;
  suivi: Consultation;
  constructor(private consultationS: ConsultationService, private router: Router) {

  }
  ngOnChanges(): void {
    this.consultationS.getOneConsultation(this.idConsultation).subscribe((consultation) => {
      // tslint:disable-next-line:max-line-length
      consultation.date = new Date(consultation.createdAt).getDate() + '/' + (new Date(consultation.createdAt).getMonth() + 1) + '/' + new Date(consultation.createdAt).getFullYear();
      this.consultation = consultation;
    }, (error: HttpErrorResponse) => {
      if (error.status === 401) {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.router.navigate(["/authentication/signin"]);      }
    });

  }
  ngOnInit() {

  }
  addFile(){
    this.array.push('x');
  }
  checkFile(url) {  // redirect to the file page
    window.open(url, "_blank");
  }

}
