import { Component } from '@angular/core';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrl: './graficas.component.css',
})
export class GraficasComponent {
  
  public labels1: string[] = [
    'Ventas en linea',
    'Ventas en tienda',
    'Ventas totales',
  ];

  public type: ChartType = 'bar';
  public type2: ChartType = 'line';
  public type3: ChartType = 'pie';

  public label: string = 'Ventas en linea'





}
