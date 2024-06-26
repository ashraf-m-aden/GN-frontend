import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/service/auth.service";
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    if (localStorage.getItem('currentUser')) {
      this.routing(JSON.parse(localStorage.getItem("currentUser"))
      );
    }
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("ashraf.mohamed");
    this.authForm.get("password").setValue("123@Passer");
  }
  doctorSet() {
    this.authForm.get("username").setValue("djibril.mohamed");
    this.authForm.get("password").setValue("123@Passer");
  }
  patientSet() {
    this.authForm.get("username").setValue("patient@hospital.org");
    this.authForm.get("password").setValue("patient@123");
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Login ou mot de passe invalides";
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f.username.value, this.f.password.value).subscribe(
        (user) => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            if (user) {
              localStorage.setItem('currentUser', JSON.stringify(user.user));
              localStorage.setItem('token', user.token);

              setTimeout(() => {
                this.routing(user.user);
                this.loading = false;
              }, 1000);
            } else {
              this.error = "Invalid Login";
            }
          },
          (error) => {
            this.error = error;
            this.submitted = false;
            this.loading = false;
          }
        );
    }
  }

  routing(user) {
    const role = user.role;
    if (role === Role.All || role === Role.Admin ) {
      this.router.navigate(["/admin/dashboard/main"]);
    }else if (role === Role.Doctor) {
      this.router.navigate(["/doctor/dashboard"]);
    } else if (role === Role.Patient) {
      this.router.navigate(["/patient/dashboard"]);
    } else {
      this.router.navigate(["/authentication/signin"]);
    }
  }
}
