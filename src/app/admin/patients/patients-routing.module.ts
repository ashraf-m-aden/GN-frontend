import { RefererComponent } from './ordonnances/referer/referer.component';
import { SavedConsultationComponent } from './consultations/saved-consultation/saved-consultation.component';
import { AnalyseComponent } from './ordonnances/analyse/analyse.component';
import { OrdonnanceComponent } from './ordonnances/ordonnance/ordonnance.component';
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { EditPatientComponent } from "./edit-patient/edit-patient.component";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { AllpatientsComponent } from "./allpatients/allpatients.component";
import { Page404Component } from "./../../authentication/page404/page404.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MedocComponent } from './medicaments/medicaments.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  {
    path: "all-patients",
    canActivate: [AuthGuard],
    component: AllpatientsComponent,
  },
  {
    path: "add-patient",
    canActivate: [AuthGuard],
    component: AddPatientComponent,
  },
  {
    path: "edit-patient",
    canActivate: [AuthGuard],
    component: EditPatientComponent,
  },
  {
    path: "patient-profile/:id",
    canActivate: [AuthGuard],
    component: PatientProfileComponent,
  },
  {
    path: "ordonnance/:id",
    canActivate: [AuthGuard],
    component: OrdonnanceComponent,
  },
  {
    path: "consultation",
    canActivate: [AuthGuard],
    component: SavedConsultationComponent,
  },
  {
    path: "medoc",
    canActivate: [AuthGuard],
    component: MedocComponent,
  },
  {
    path: "analyse/:id",
    canActivate: [AuthGuard],
    component: AnalyseComponent,
  },
  {
    path: "referer/:id",
    canActivate: [AuthGuard],
    component: RefererComponent,
  },
  { path: "**",
  component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
