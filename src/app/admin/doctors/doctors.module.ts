import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
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
import { MatDialogModule } from "@angular/material/dialog";
import { MatSortModule } from "@angular/material/sort";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { DoctorsRoutingModule } from "./doctors-routing.module";
import { AlldoctorsComponent } from "./alldoctors/alldoctors.component";
import { AddDoctorComponent } from "./add-doctor/add-doctor.component";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { MaterialFileInputModule } from "ngx-material-file-input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { DoctorsService } from "../services/doctors.service";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { NgApexchartsModule } from "ng-apexcharts";
import { ChartsModule as chartjsModule } from "ng2-charts";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatTabsModule } from "@angular/material/tabs";
import { MatMenuModule } from '@angular/material/menu';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';

@NgModule({
  declarations: [
    AlldoctorsComponent,
    AddDoctorComponent,
    DoctorProfileComponent,
    ChartWidgetComponent,
    EditDoctorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    chartjsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTabsModule,
    MatSelectModule,
    MatFormFieldModule,
    PerfectScrollbarModule,
    MatPaginatorModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTabsModule,
    MatCheckboxModule,
    MaterialFileInputModule,
    DoctorsRoutingModule,
    MatProgressSpinnerModule,
    PerfectScrollbarModule,
    NgApexchartsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTabsModule  ],
  providers: [DoctorsService],
})
export class DoctorsModule {}
