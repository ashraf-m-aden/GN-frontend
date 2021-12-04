import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultationService } from 'src/app/doctor/services/consultation.service';
import { PatientService } from 'src/app/doctor/services/patient.service';
import { Patient } from '../../allpatients/patient.model';
import { Consultation } from '../../consultations/consultation.model';

@Component({
  selector: 'app-referer',
  templateUrl: './referer.component.html',
  styleUrls: ['./referer.component.scss']
})
export class RefererComponent implements OnInit {

  consultation: Consultation;
  patient: Patient;
  referer;
  constructor(private consultationService: ConsultationService, private router: Router,
              private activated: ActivatedRoute, private patientS: PatientService) {
    activated.params.subscribe((data: any) => {
      this.consultationService.getOneConsultation(data.id).subscribe((consultation) => {
        // tslint:disable-next-line:max-line-length
        consultation.date = new Date(consultation.createdAt).getDate() + '/' + (new Date(consultation.createdAt).getMonth() + 1) + '/' + new Date(consultation.createdAt).getFullYear();
        this.consultation = consultation; // on met le resultat dans la variable consultation
        const array = consultation.refererList
        .filter((element) => element._id === data.refererId );  // ici on isole les analyses pour un meilleur rendu dans le html
        this.referer = array[0];

        patientS.getOnePatient(consultation.idPatient).subscribe((patient: Patient) => { // on recupere le patient pour afficher le nom
          this.patient = patient;
        });
      }, (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.router.navigate(["/authentication/signin"]);
        }
      });
    });

  }

  ngOnInit(): void {
  }

}
