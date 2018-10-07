import { Component, OnInit, Input } from '@angular/core';
import { TrackersNewService } from '../../trackers-new.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss']
})
export class ViewActivityComponent implements OnInit {
  @Input('currentTracker') currentTracker: string;

  constructor(
    private trackerNewService: TrackersNewService
  ) { }

  ngOnInit() {
    console.log('currenttrac', this.currentTracker)
    
  }

}
