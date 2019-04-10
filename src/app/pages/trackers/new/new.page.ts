import { Component, OnInit } from '@angular/core';
import { AuthService, TrackersService } from 'app/services';
import { TrackerNode, Tracker } from 'app/models';

@Component({
  selector: 'new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  trackerName: string;
  iconName: string;

  constructor(
    private trackerNewService: TrackersService,
    private authService: AuthService
  ) { 

  }

  ngOnInit() {
    
  }

  onSave() {
    this.authService.user.subscribe(user => {
       // make tracker
      let newTracker: Tracker = {
        key: 'zzz',
        userKey: user.authID,
        name: this.trackerName,
        iconName: this.iconName,
        dateCreated: new Date(),
        dateLastViewed: new Date(),
        options: {
          isDeletable: false,
          isEditable: true
        }
      }
      this.trackerNewService.saveNewTracker(newTracker);
    })
  }

}
