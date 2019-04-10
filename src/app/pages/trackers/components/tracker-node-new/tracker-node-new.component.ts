import { Component, OnInit, Input } from '@angular/core';
import { AuthService, TrackersService } from 'app/services';

@Component({
  selector: 'app-tracker-node-new',
  templateUrl: './tracker-node-new.component.html',
  styleUrls: ['./tracker-node-new.component.scss']
})
export class TrackerNodeNewComponent implements OnInit {
  @Input('tracker') trackerName: string;

  constructor(
    private trackerService: TrackersService,
    private authService: AuthService
  ) { }

  ngOnInit() {

  }

  createNew() {
    // this.authService.user.subscribe(user => {
    //   this.trackerService.createNode(this.trackerName, user.authID)
    // })
  }

}
