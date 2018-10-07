import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UserService } from '../../../../../services/user.service';
import { 
  TrackerTypeEnum,
  TrackerCommon
} from '../../../trackers.model';
import { AuthService } from '../../../../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tracker-popover',
  templateUrl: './tracker-popover.component.html',
  styleUrls: ['./tracker-popover.component.scss']
})
export class TrackerPopoverComponent implements OnInit, OnDestroy {
  auth$: Subscription;
  currentTrackerKey;
  currentUserKey;
  currentTrackerType;

  constructor(
    private navParams: NavParams,
    private userService: UserService,
    private afs: AngularFirestore,
    private authService: AuthService

  ) {
    this.currentTrackerKey = this.navParams.get('currentTrackerKey');
    this.currentTrackerType = this.navParams.get('trackerType');
    this.currentUserKey = this.navParams.get('userKey');

    // this.trackersService = new TrackersService(this.afs, this.userService, this.currentTrackerType);
  }

  

  ngOnInit() {
    this.auth$ = this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;

        // this.trackersService = new TrackersService(this.afs, this.userService, this.currentTrackerType, user.key);
        // this.trackersService.getTrackerEntry(this.currentTrackerKey).valueChanges().subscribe(tracker => {
        //   console.log('in popover', tracker)
        //   this.currentTracker = tracker as TrackerBeer;
        // });
      }
    });
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

}
