import { SavedConsultationComponent } from './saved-consultation/saved-consultation.component';
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

const routes: Routes = [
  {
    path: "all-patients",
    component: AllpatientsComponent,
  },
  {
    path: "add-patient",
    component: AddPatientComponent,
  },
  {
    path: "edit-patient",
    component: EditPatientComponent,
  },
  {
    path: "patient-profile",
    component: PatientProfileComponent,
  },
  {
    path: "ordonnance",
    component: OrdonnanceComponent,
  },
  {
    path: "consultation",
    component: SavedConsultationComponent,
  },
  {
    path: "medoc",
    component: MedocComponent,
  },
  {
    path: "analyse",
    component: AnalyseComponent,
  },
  { path: "**", component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
