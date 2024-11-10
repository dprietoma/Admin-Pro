import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increments',
  templateUrl: './increments.component.html',
  styleUrl: './increments.component.css'
})
export class IncrementsComponent implements OnInit{
 
  @Input() valueProgress = 40;
  @Input() btnClass: string = 'btn-primary'
  @Output() newValueProgress: EventEmitter<number> = new EventEmitter()


  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass} button-padding`
  }

  get getProgress() {
    return this.valueProgress + '%';
  }

  changeValueProgress( value: number ) {

    if ( this.valueProgress >= 100 && value >= 0 ) {
      this.newValueProgress.emit(100);
      return this.valueProgress = 100;
    }

    if ( this.valueProgress <= 0 && value < 0 ) {
      this.newValueProgress.emit(0);
      return this.valueProgress = 0;
    }
      
    this.valueProgress = this.valueProgress + value;
    return this.newValueProgress.emit(this.valueProgress);
  }

  onChange(newValue: number){

    if (newValue >= 100) {
      this.valueProgress = 100;
    } else if( newValue <= 0) {
      this.valueProgress = 0;
    } else {
      this.valueProgress = newValue;
    }
    this.newValueProgress.emit(this.valueProgress);

  }
}
