import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // public get currentUserValue(): any {
  //   return this.currentUserSubject.value;
  // }
  setHeader() {
    return new HttpHeaders().set('Content-Type', 'application/json')
      .set('X-Requested-Width', 'XMLHttpRequest').set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/user/login`, {
        username,
        password,
      });
  }

  logout() {
    // remove user from local storage to log user out
    return this.http
    .get<any>(`${environment.apiUrl}/user/logout`, {headers: this.setHeader()}).subscribe(() => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
      this.router.navigate(["/authentication/signin"]);
    },
      (error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
          this.router.navigate(["/authentication/signin"]);
        }

      });

  }
}
