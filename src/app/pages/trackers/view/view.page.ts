import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackersService } from '../trackers.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage implements OnInit, OnChanges {
  currentTrackerName = "";
  currentTracker;
  
  constructor(
    private actRoute: ActivatedRoute,
    private trackerNewService: TrackersService,
    private authService: AuthService
  ) { 
    
  }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.authService.user.subscribe(user => {
        this.currentTrackerName = params['id'];
        user.authID

        this.trackerNewService.getParentNodesByTrackerName(this.currentTrackerName, user.authID).valueChanges().subscribe(tracker => {
          this.currentTracker = tracker[0]
        })
      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTracker']) {
      // this.currentTracker = this.currentTracker
    }

  }


}
