import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SimpleTrackerField } from 'app/models/trackers.model';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss']
})
export class NumberPickerComponent implements OnInit {
  @Input() field: SimpleTrackerField;
  @Output() onChangeEvent = new EventEmitter<string>();
  numValue: number = 0;

  constructor() { 

  }

  ngOnInit() {
    if(parseInt(this.field.value)) {
      this.numValue = parseInt(this.field.value)
    }
    else {
      this.numValue = 0;
    }
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
