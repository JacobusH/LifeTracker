import { Component, OnInit } from '@angular/core';
import { TrackersService } from '../trackers.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  allTrackers$;
  

  constructor(
    private trackerService: TrackersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.allTrackers$ = this.trackerService.getAllTrackersByLastViewed(user.authID).valueChanges()
    })
  }

}
