import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Consultation } from './../consultation.model';
import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { ConsultationService } from 'src/app/admin/services/consultation.service';

@Component({
  selector: 'app-saved-consultation',
  templateUrl: './saved-consultation.component.html',
  styleUrls: ['./saved-consultation.component.sass']
})
export class SavedConsultationComponent implements OnInit, OnChanges {
  @Input() idConsultation: string;
  @Output() suivi = new EventEmitter<Array<any>>();
  consultation: Consultation;
  @Output() sendData = new EventEmitter<Array<string>>(); // il envoit l'id de la consultation souhaité et si c initial ou pas


  constructor(private consultationService: ConsultationService, private router: Router) {

  }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.consultationService.getOneConsultation(this.idConsultation).subscribe((consultation) => {
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
  checkFile(url) {  // redirect to the file page
    window.open(url, "_blank");
  }
  addSuivi() { // send the id of the consultation we want to follow
    this.suivi.emit([this.idConsultation, this.consultation.referer]);
  }

  checkConsultation(id, initial) {  // envoie au tree l'id de la consultation desirée
    this.sendData.emit([id, initial]);
  }
}
