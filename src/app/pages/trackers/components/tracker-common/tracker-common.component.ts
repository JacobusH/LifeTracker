import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../../../../services/auth.service';
import { PopoverController } from '@ionic/angular';
import { TrackerPopoverComponent } from './tracker-popover/tracker-popover.component';
import { TrackerCommon } from '../../trackers.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-tracker-common',
  templateUrl: './tracker-common.component.html',
  styleUrls: ['./tracker-common.component.scss']
})
export class TrackerCommonComponent implements OnInit {
  @Input('trackerType') trackerType: any;  
  currentUserKey;
  // trackersService: TrackersService;
  trackerCommons: TrackerCommon[];

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private userService: UserService,
    public popoverController: PopoverController) { 
      
  }

  ngOnInit() {
      this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;

        // this.trackersService = new TrackersService(this.afs, this.userService, this.trackerType, user.key);
        // this.trackersService.getCurrentColTrackerCommon().valueChanges().subscribe(common => {
        //   console.log('in commons', common)
        //   this.trackerCommons = common as TrackerCommon[];
        // });
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
