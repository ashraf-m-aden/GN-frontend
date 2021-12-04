import { Injectable } from "@angular/core";
import { Consultation } from "../patients/consultations/consultation.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
@Injectable()
export class ConsultationService extends UnsubscribeOnDestroyAdapter {

  constructor(private httpClient: HttpClient) {
    super();
  }
  /** CRUD METHODS */


  setHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getAllConsultations(userId) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Consultation[]>(`${environment.apiUrl}/consultations/` + userId, { headers: this.setHeader() });
  }
  getOneConsultation(idConsultation) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Consultation>(`${environment.apiUrl}/consultation/` + idConsultation, { headers: this.setHeader() });
  }
  getExplorations(idExploration) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Consultation>(`${environment.apiUrl}/exploration/` + idExploration, { headers: this.setHeader() });
  }
  addConsultation(consultation: Consultation) {

    return this.httpClient.post<Consultation>(`${environment.apiUrl}/consultation`, consultation, { headers: this.setHeader() });

  }
  updateConsultation(consultation: Consultation): void {

    /* this.httpClient.put(this.API_URL + patient.id, patient).subscribe(data => {
      this.dialogData = patient;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteConsultation(id: number): void {
    console.log(id);

    /*  this.httpClient.delete(this.API_URL + id).subscribe(data => {
      console.log(id);
      },
      (err: HttpErrorResponse) => {
         // error code here
      }
    );*/
  }
}
