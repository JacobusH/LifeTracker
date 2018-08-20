import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AuthService } from '../../../services/auth.service';
import { TrackerBeer, trackerBeerDyn } from './beer.model';
import { CFService } from '../../../services/CFService.service';
import { TrackersService } from '../trackers.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BeerPage implements OnInit {
  trackerBeerDyn;
  currentLat;
  currentLong;
  currentUserKey;
  trackersService: TrackersService;
  
  constructor(
    public cfService: CFService,
    private authService: AuthService,
    private afs: AngularFirestore,
    private userService: UserService
  ) { 
    this.trackerBeerDyn = trackerBeerDyn;
    this.trackersService = new TrackersService(this.afs, this.userService, 'beer');
  }

  ngOnInit() {
    this.authService.user.subscribe(user => {
      if(user) {
        this.currentUserKey = user.key;
      }
    });

    this.cfService.setStateFalse();
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
