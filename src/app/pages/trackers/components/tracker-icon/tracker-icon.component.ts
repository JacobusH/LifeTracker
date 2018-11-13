import { Component, OnInit, Input } from '@angular/core';
import { Tracker } from '../../trackers.model'

@Component({
  selector: 'app-tracker-icon',
  templateUrl: './tracker-icon.component.html',
  styleUrls: ['./tracker-icon.component.scss']
})
export class TrackerIconComponent implements OnInit {
  @Input('tracker') tracker: Tracker;
  @Input('mini') mini: boolean = false;

  constructor() { }

  ngOnInit() {
    
  }

}
