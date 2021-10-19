import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Consultation } from "./consultation.model";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Injectable()
export class ConsultationService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/consultation.json";
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
  getAllConsultations(): void {
    this.subs.sink = this.httpClient.get<Consultation[]>(this.API_URL).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        this.isTblLoading = false;
        console.log(error.name + " " + error.message);
      }
    );
  }
  addConsultation(consultation: Consultation): void {
    this.dialogData = consultation;

    /*  this.httpClient.post(this.API_URL, patient).subscribe(data => {
      this.dialogData = patient;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
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
