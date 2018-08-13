import { Component, OnInit } from '@angular/core';
import { trackerWeedDyn, TrackerWeed } from './weed.model';
import { WeedService } from './weed.service';
import { AuthService } from '../../../services/auth.service';
import { CFService } from '../../../services/CFService.service';

@Component({
  selector: 'weed',
  templateUrl: './weed.page.html',
  styleUrls: ['./weed.page.scss'],
})
export class WeedPage implements OnInit {
  trackerWeedDyn;
  currentLat;
  currentLong;
  currentUserKey;
  

  constructor(
    private weedService: WeedService,
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
    if(formData)
    {
      this.weedService.saveNewTrackerWeed(this.currentUserKey, formData);
    }
  }

}
