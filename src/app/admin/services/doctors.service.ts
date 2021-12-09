import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Doctors } from "../doctors/alldoctors/doctors.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable()
export class DoctorsService {

  constructor(private httpClient: HttpClient) {
  }

  setHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }



  /** CRUD METHODS */
  getAllDoctors() {
    return this.httpClient.get<Doctors[]>(`${environment.apiUrl}/users/`,  { headers: this.setHeader() });
  }
  getOneDoctor(id) {
    return this.httpClient.get<Doctors>(`${environment.apiUrl}/user/` + id,  { headers: this.setHeader() });
  }

  addDoctors(doctor: Doctors) {
    return this.httpClient.post<Doctors>(`${environment.apiUrl}/user/`, doctor,  { headers: this.setHeader() });
  }

  editDoctor(doctor: Doctors) {
    console.log(doctor);

    return this.httpClient.patch<Doctors>(`${environment.apiUrl}/user/` + doctor._id, doctor,  { headers: this.setHeader() });
  }
  updateDoctors(doctors: Doctors): void {

    /* this.httpClient.put(this.API_URL + doctors.id, doctors).subscribe(data => {
      this.dialogData = doctors;
    },
    (err: HttpErrorResponse) => {
      // error code here
    }
  );*/
  }
  deleteDoctors(id: number): void {
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
