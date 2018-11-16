import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { curveBasis } from 'd3';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss']
})
export class NumberPickerComponent implements OnInit {
  @Input('value') curValue: string;
  @Output() onChangeEvent = new EventEmitter<string>();
  numValue: number;

  constructor() { }

  ngOnInit() {
    this.numValue = parseInt(this.curValue)
  }

  onChange(event) {
    this.onChangeEvent.emit(event.target.value.toString());
  }

  dec() {
    this.numValue = this.numValue - 1;
    this.onChangeEvent.emit(this.numValue.toString());
  }

  inc() {
    this.numValue = this.numValue + 1;
    this.onChangeEvent.emit(this.numValue.toString());
  }

}
