import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input/nz-input.directive';

@Component({
  selector: 'app-rater',
  templateUrl: './rater.component.html',
  styleUrls: ['./rater.component.scss']
})
export class RaterComponent implements OnInit {
  @Input('name') name: string;
  @Input('rating') rating: string;
  @Output() onChangeNameEvent = new EventEmitter<string>();
  @Output() onChangeRatingEvent = new EventEmitter<string>();
  ratingVal: number

  constructor() { }

  ngOnInit() {
    this.ratingVal = parseInt(this.rating)
  }

  saveName(event) {
    this.onChangeNameEvent.emit(event.target.value.toString());
  }

  saveRating(event) {
    this.onChangeRatingEvent.emit(event.target.value.toString());
  }


}
