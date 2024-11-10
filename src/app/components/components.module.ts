import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementsComponent } from './increments/increments.component';
import { FormsModule } from '@angular/forms';
import { DoughnutComponent } from './doughnut/doughnut.component';

import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts'; 

@NgModule({
  declarations: [
    IncrementsComponent,
    DoughnutComponent
  ],
  exports: [
    IncrementsComponent,
    DoughnutComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BaseChartDirective,
  ],
  providers: [provideCharts(withDefaultRegisterables())],
})
export class ComponentsModule { }
