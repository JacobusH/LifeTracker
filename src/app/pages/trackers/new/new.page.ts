import { Component, OnInit } from '@angular/core';
import { TrackersService } from '../trackers.service'
import { TrackerNode } from '../trackers.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  trackerName: string;

  constructor(
    private trackerNewService: TrackersService,
    private authService: AuthService
  ) { 

  }

  ngOnInit() {
    
  }

  onSave() {
    this.authService.user.subscribe(user => {
      this.trackerNewService.saveNewTracker(this.trackerName, user.authID);
    })
  }

}
