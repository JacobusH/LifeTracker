import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trackerWeedDyn, TrackerWeed } from './weed.model';
import { TrackerCommon } from '../trackers.model';
import { AuthService } from '../../../services/auth.service';
import { CFService } from '../../../services/CFService.service';

@Component({
  selector: 'weed',
  templateUrl: './weed.page.html',
  styleUrls: ['./weed.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WeedPage implements OnInit {
  trackerWeedDyn;
  currentLat;
  currentLong;
  currentUserKey;
  
  constructor(
    private authService: AuthService,
    private cfService: CFService
  ) { 
    this.trackerWeedDyn = trackerWeedDyn;
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;
      }
    });

    this.cfService.setStateFalse();
  }

  onSave(formData: TrackerWeed) {
    console.log('formData', formData)
    // if(formData)
    // {
    //   this.weedService.saveNewTrackerWeed(this.currentUserKey, formData);
    // }
  }

}
