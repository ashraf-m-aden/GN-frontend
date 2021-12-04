import { MedocComponent } from './medicaments/medicaments.component';
import { MedocService } from '../services/medoc.service';
import { ConsultationService } from '../services/consultation.service';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatRadioModule } from "@angular/material/radio";
import { MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { PatientsRoutingModule } from "./patients-routing.module";
import { AddPatientComponent } from "./add-patient/add-patient.component";
import { AllpatientsComponent } from "./allpatients/allpatients.component";
import { EditPatientComponent } from "./edit-patient/edit-patient.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { DeleteComponent } from "./allpatients/dialog/delete/delete.component";
import { FormDialogComponent } from "./allpatients/dialog/form-dialog/form-dialog.component";
import { PatientService } from "./allpatients/patient.service";
import { ConsultationsComponent } from './consultations/consultations.component';
import {NgxPrintModule} from 'ngx-print';
import { OrdonnanceComponent } from './ordonnances/ordonnance/ordonnance.component';
import { CommentairesComponent } from './commentaires/commentaires.component';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AnalyseComponent } from './ordonnances/analyse/analyse.component';
import { AddAnalyseComponent } from './analyses/add-analyse/add-analyse.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTreeModule } from '@angular/material/tree';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NgZorro } from './ng-zero.module';
import { AddConsultationComponent } from './consultations/add-consultation/add-consultation.component';
import { SavedConsultationComponent } from './consultations/saved-consultation/saved-consultation.component';
import { TreeMenuPageComponent } from './tree-menu-page/tree-menu-page.component';
import { AddSuiviComponent } from './consultations/add-suivi/add-suivi.component';
import { AddSuiviExterneComponent } from './consultations/add-suivi-externe/add-suivi-externe.component';
import { AddOrdonnanceComponent } from './analyses/add-ordonnance/add-ordonnance.component';
import { ExplorationsComponent } from './explorations/explorations.component';
import { RefererComponent } from './ordonnances/referer/referer.component';
import { SavedSuiviComponent } from './consultations/saved-suivi/saved-suivi.component';


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AddPatientComponent,
    AllpatientsComponent,
    EditPatientComponent,
    PatientProfileComponent,
    DeleteComponent,
    FormDialogComponent,
    ConsultationsComponent,
    OrdonnanceComponent,
    CommentairesComponent,
    AnalyseComponent,
    AddAnalyseComponent,
    MedocComponent,
    AddConsultationComponent,
    SavedConsultationComponent,
    TreeMenuPageComponent,
    AddSuiviComponent,
    AddSuiviExterneComponent,
    AddOrdonnanceComponent,
    ExplorationsComponent,
    RefererComponent,
    SavedSuiviComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    FormsModule,
    NgbModule,
    NgxDatatableModule,
    NzTreeModule,
    NzTreeViewModule,
    NgZorro,
    ReactiveFormsModule,
    NgxPrintModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatStepperModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatTabsModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatSelectModule,
    MatRadioModule,
    MatMenuModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    MatProgressSpinnerModule,
    MatTreeModule
  ],
  bootstrap: [ PatientProfileComponent ],

  providers: [PatientService, ConsultationService, MedocService,
    { provide: NZ_I18N, useValue: en_US }, { provide: NZ_ICONS, useValue: icons }],
})
export class PatientsModule {}
