import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { Medicaments } from "./medicaments.model";
@Injectable()
export class MedocService extends UnsubscribeOnDestroyAdapter {
  private readonly API_URL = "assets/data/medicaments.json";
  isTblLoading = true;
  dataChange: BehaviorSubject<Medicaments[]> = new BehaviorSubject<
    Medicaments[]
  >([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
    super();
  }
  get data(): Medicaments[] {
    return this.dataChange.value;
  }
  getDialogData() {
    return this.dialogData;
  }
  /** CRUD METHODS */
  getAllMedicaments(): void {
    this.subs.sink = this.httpClient
      .get<Medicaments[]>(this.API_URL)
      .subscribe(
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
  addMedicaments(medicaments: Medicaments): void {
    this.dialogData = medicaments;

    /*  this.httpClient.post(this.API_URL, Medicaments).subscribe(data => {
      this.dialogData = Medicaments;
      },
      (err: HttpErrorResponse) => {
     // error code here
    });*/
  }
  updateMedicaments(medicaments: Medicaments): void {
    this.dialogData = Medicaments;

    /* this.httpClient.put(this.API_URL + Medicaments.id, Medicaments).subscribe(data => {
      this.dialogData = Medicaments;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteMedicaments(id: number): void {
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
