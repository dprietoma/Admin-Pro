import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent {
  progress1 = 15;
  progress2 = 50;
  btnClass: string = 'btn-info'

  get getProgress1() {
    return this.progress1.toString() + '%';
  }

  get getProgress2() {
    return this.progress2.toString() + '%';
  }

}
