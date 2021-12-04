import { Patient } from './../../allpatients/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/doctor/services/consultation.service';
import { Consultation } from '../../consultations/consultation.model';
import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/doctor/services/patient.service';

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.scss']
})
export class AnalyseComponent implements OnInit {
  consultation: Consultation;
  patient: Patient;
  exploration;
  constructor(private consultationService: ConsultationService, private router: Router,
              private activated: ActivatedRoute, private patientS: PatientService) {
    activated.params.subscribe((data: any) => {
      this.consultationService.getOneConsultation(data.id).subscribe((consultation) => {
        // tslint:disable-next-line:max-line-length
        consultation.date = new Date(consultation.createdAt).getDate() + '/' + (new Date(consultation.createdAt).getMonth() + 1) + '/' + new Date(consultation.createdAt).getFullYear();
        this.consultation = consultation; // on met le resultat dans la variable consultation
        const array = consultation.explorations.filter((element) => {
          return element._id === data.exploId;
        });  // ici on isole les analyses pour un meilleur rendu dans le html
        this.exploration = array[0];

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
