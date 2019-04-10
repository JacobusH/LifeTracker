import { Component, OnInit, Input } from '@angular/core';
import { TrackersService } from 'app/services';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {
  @Input('currentTracker') currentTracker: string;

  constructor(
    private trackerNewService: TrackersService
  ) { }

  ngOnInit() {
    console.log('currenttrac', this.currentTracker)
    
  }

}
