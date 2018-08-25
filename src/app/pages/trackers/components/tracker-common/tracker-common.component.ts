import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { TrackerPopoverComponent } from './tracker-popover/tracker-popover.component';
import { TrackersService } from '../../trackers.service';
import { TrackerCommon, TrackerTypeEnum } from '../../trackers.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-tracker-common',
  templateUrl: './tracker-common.component.html',
  styleUrls: ['./tracker-common.component.scss']
})
export class TrackerCommonComponent implements OnInit {
  @Input('trackerType') trackerType: TrackerTypeEnum;  
  currentUserKey;
  trackersService: TrackersService;
  trackerCommon: TrackerCommon[];

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    public popoverController: PopoverController) { 
      
  }

  ngOnInit() {
      this.trackersService = new TrackersService(this.afs, this.userService, this.trackerType);

      this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;

        this.trackersService.getTrackerColCommonByUserKey(this.currentUserKey).valueChanges().subscribe(common => {
          this.trackerCommon = common as TrackerCommon[];
        });
      }
    });
  }

  async presentPopover(ev: any, currentTrackerKey: string) {
    const popover = await this.popoverController.create({
      component: TrackerPopoverComponent,
      ev: ev,
      translucent: true,
      componentProps: { 
        'currentTrackerKey': currentTrackerKey, 
        'userKey': this.currentUserKey,
        'trackerType': this.trackerType
      },
      
    });
    return await popover.present();
  }

}
