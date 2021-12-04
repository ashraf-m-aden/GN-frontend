import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from 'src/environments/environment';
import { Patient } from '../patients/allpatients/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  isTblLoading = true;
  dataChange: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);
  // Temporarily stores data from dialogs
  constructor(private httpClient: HttpClient, private authS: AuthService, private router: Router) {
  }
  get data(): Patient[] {
    return this.dataChange.value;
  }

  setHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  /** CRUD METHODS */
  getAllPatients(): void {
    this.httpClient.get<Patient[]>(`${environment.apiUrl}/patients`, { headers: this.setHeader() }).subscribe(
      (data) => {
        this.isTblLoading = false;
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
          if (error.status === 401) {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            this.router.navigate(["/authentication/signin"]);          }
          this.isTblLoading = false;
      }
    );
  }
  getOnePatient(userId) {
    return this.httpClient.get(`${environment.apiUrl}/patient/` + userId, { headers: this.setHeader() });
  }


  addPatient(patient: Patient) {
    return this.httpClient.post(`${environment.apiUrl}/patient`, patient, { headers: this.setHeader() });
  }

  updatePatient(patient: Patient): void {

    this.httpClient.put(`${environment.apiUrl}/patient/user/` + patient._id, patient);
  }

}
