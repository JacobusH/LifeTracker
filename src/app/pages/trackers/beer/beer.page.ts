import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../services/auth.service';
import { TrackerBeer, trackerBeerDyn } from './beer.model';
import { CFService } from '../../../services/CFService.service';
import { TrackersService } from '../trackers.service';
import { TrackerCommon, TrackerTypeEnum } from '../trackers.model';
import { UserService } from '../../../services/user.service';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BeerPage implements OnInit {
  TRACKERTYPE: TrackerTypeEnum;
  trackerBeerDyn;
  currentLat;
  currentLong;
  currentUserKey;
  trackersService: TrackersService;
  trackerBeerCommon: TrackerCommon[];
  
  constructor(
    public cfService: CFService,
    private afs: AngularFirestore,
    private userService: UserService,
    private authService: AuthService
  ) { 
    this.trackerBeerDyn = trackerBeerDyn;
    this.trackersService = new TrackersService(this.afs, this.userService, TrackerTypeEnum.BEER);
    this.TRACKERTYPE = TrackerTypeEnum.BEER;
  }

  ngOnInit() {
    this.cfService.setStateFalse();

    this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;

        // this.trackersService.getTrackerColCommonByUserKey(this.currentUserKey).valueChanges().subscribe(common => {
        //   this.trackerCommon = common as TrackerCommon[];
        // });
      }
    });
  }

  onSave(formData: TrackerBeer) {
    event.preventDefault();
    console.log('beer form data', formData)
    if(formData)
    {
      this.trackersService.saveNewTracker(this.currentUserKey, formData);
    }
  }

}
