import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Consultation } from "../patients/consultations/consultation.model";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { environment } from "src/environments/environment";
@Injectable()
export class ConsultationService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/consultations.json";
  isTblLoading = true;
  dataChange: BehaviorSubject<Consultation[]> = new BehaviorSubject<Consultation[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Consultation[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */


  setHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  getAllConsultations(userId): void {
    // tslint:disable-next-line:max-line-length
    this.subs.sink = this.httpClient.get<Consultation[]>(`${environment.apiUrl}/consultations/` + userId, { headers: this.setHeader() }).subscribe(
      (data) => {
        data.forEach(element => {
          // tslint:disable-next-line:max-line-length
          element.date = new Date(element.createdAt).getDate() + '/' + (new Date(element.createdAt).getMonth() + 1) + '/' + new Date(element.createdAt).getFullYear();
        });
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  getOneConsultation(idConsultation) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<Consultation>(`${environment.apiUrl}/consultation/` + idConsultation, { headers: this.setHeader() });
  }
  addConsultation(consultation: Consultation) {

    return this.httpClient.post<Consultation>(`${environment.apiUrl}/consultation`, consultation, { headers: this.setHeader() });

  }
  updateConsultation(consultation: Consultation): void {
    this.dialogData = consultation;

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
