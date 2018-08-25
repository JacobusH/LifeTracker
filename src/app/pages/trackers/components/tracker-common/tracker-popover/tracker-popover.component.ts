import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { TrackersService } from '../../../trackers.service';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../../../../services/user.service';
import { 
  TrackerWeed, TrackerBeer, TrackerTypeEnum,
  TrackerFood, TrackerDrugs, TrackerCommon
} from '../../../trackers.model';

@Component({
  selector: 'app-tracker-popover',
  templateUrl: './tracker-popover.component.html',
  styleUrls: ['./tracker-popover.component.scss']
})
export class TrackerPopoverComponent implements OnInit {
  currentTrackerKey;
  currentUserKey;
  currentTrackerType;
  trackersService: TrackersService;
  currentTracker: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed

  constructor(
    private navParams: NavParams,
    private userService: UserService,
    private afs: AngularFirestore,

  ) {
    this.currentTrackerKey = this.navParams.get('currentTrackerKey');
    this.currentTrackerType = this.navParams.get('trackerType');
    this.currentUserKey = this.navParams.get('userKey');
    
    this.trackersService = new TrackersService(this.afs, this.userService, this.currentTrackerType);
  }

  

  ngOnInit() {
    this.trackersService.getTrackerColByUserKeyAndTrackerKey(this.currentUserKey, this.currentTrackerKey).valueChanges().subscribe(tracker => {
      this.currentTracker = tracker as TrackerBeer;
    });
  }

}
