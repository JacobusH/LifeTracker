import { Component, OnInit } from '@angular/core';
import { TrackersNewService } from '../trackers-new.service'
import { Tracker } from '../trackers.model';

@Component({
  selector: 'new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  trackerName: string;
  trackerType: string;
  

  constructor(private trackerNewService: TrackersNewService) { 

  }

  ngOnInit() {
    
  }

  onSave() {
    let newT: Tracker = {
      key: undefined,
      name: this.trackerName,
      trackerType: this.trackerType,
      userKey: 'test'
    };

    this.trackerNewService.saveNewTracker(newT);
  }

}
