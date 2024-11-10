import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';
@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styleUrl: './doughnut.component.css'
})
export class DoughnutComponent {
  @Input() title: string = 'Grafica';

  @Input('labels') doughnutChartLabels: string[] = [
    'label1',
    'label2',
    'label3',
  ];

  @Input() data: number[] = [350, 450, 100];
  @Input() chartType: ChartType = 'doughnut';
  @Input() colors: string[] = ['#6857E6', '#009FEE', '#F02059']
  @Input() label: string = 'Serie';


  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100], backgroundColor: ['#6857E6', '#009FEE', '#F02059'] },
      // { data: [50, 150, 120], backgroundColor: ['#6857E6','#009FEE', '#F02059'] },
      // { data: [250, 130, 70], backgroundColor: ['#6857E6','#009FEE', '#F02059'] },
    ],
  };

  public doughnutChartType: ChartType = 'doughnut';

  ngOnChanges(): void {
    this.doughnutChartData = {

      labels: this.doughnutChartLabels,
      datasets: [{ data: this.data, backgroundColor: this.colors, label: this.label }]

    }
    this.doughnutChartType = this.chartType;
  }

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

}
