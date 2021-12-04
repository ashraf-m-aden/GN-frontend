import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminRoutingModule } from './admin-routing.module';
import { AnalyseTypeTypeService } from './services/analyse-type.service';
import { ConsultationService } from './services/consultation.service';
import { MedocService } from './services/medoc.service';
import { PatientService } from './services/patient.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminRoutingModule,
    chartjsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [AnalyseTypeTypeService, MedocService, ConsultationService, PatientService]

})
export class AdminModule {}
