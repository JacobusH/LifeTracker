import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { 
  TrackerWeed, TrackerWeedCommon, TrackerBeer, TrackerBeerCommon,
  TrackerFood, TrackerFoodCommon, TrackerDrugs, TrackerDrugsCommon 
} from './trackers.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

/**************
 * NOTE: Not injectable because requires runtime constructor parameter
 **************/
// @Injectable()
export class TrackersService {
  colUSERS: string = '!Users';
  colTRACKERBEER: string = 'trackerBeer';
  colTRACKERBEERCOMMON: string = 'trackerBeerCommon';
  colTRACKERDRUGS: string = 'trackerDrugs';
  colTRACKERDRUGSCOMMON: string = 'trackerDrugsCommon';
  colTRACKERFOOD: string = 'trackerFood';
  colTRACKERFOODCOMMON: string = 'trackerFoodCommon';
  colTRACKERWEED: string = 'trackerWeed';
  colTRACKERWEEDCOMMON: string = 'trackerWeedCommon';
  users: AngularFirestoreCollection<User>;
  currentColTracker: string;
  currentColTrackerCommon: string;
  currentTrackerType: string;
  
  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    // trackerType: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed,
    trackerType: string
  ) { 
    this.currentTrackerType = trackerType;
    switch(trackerType) {
      case 'beer':
        this.currentColTracker = this.colTRACKERBEER;
        this.currentColTrackerCommon = this.colTRACKERBEERCOMMON
        break;
      case 'drugs':
        this.currentColTracker = this.colTRACKERDRUGS;
        this.currentColTrackerCommon = this.colTRACKERDRUGSCOMMON
        break;
      case 'food':
        this.currentColTracker = this.colTRACKERFOOD;
        this.currentColTrackerCommon = this.colTRACKERFOODCOMMON
        break;
      case 'weed':
        this.currentColTracker = this.colTRACKERWEED;
        this.currentColTrackerCommon = this.colTRACKERWEEDCOMMON
        break;
    }
  }


  saveNewTracker(userKey: string, trackerEntry: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed): Promise<firebase.firestore.DocumentReference>  {
    // We need to set the type from the constructor on our form obj here and our user key
    trackerEntry.userKey = userKey;
    trackerEntry.type = this.currentTrackerType;

    // Now save the new entry
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(userKey)
        .collection(this.currentColTracker)
        .add(trackerEntry);

    promise.then(x => {
      x.update({key: x.id}); // this updates it in firebase
      trackerEntry.key = x.id; // and our model for later

      // Then save the common lookup
      this.saveNewTrackerCommon(trackerEntry);
    });

    return promise;
  }

  saveNewTrackerCommon(trackerEntry: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed): Promise<firebase.firestore.DocumentReference>  {
    let comm = this.createNewTrackerCommon(trackerEntry);

    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(trackerEntry.userKey)
        .collection(this.currentColTrackerCommon)
        .add(comm);

    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  getTrackerColByUserKey(userKey: string): AngularFirestoreCollection<TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed> { 
    return this.userService
      .getByUserKey(userKey)
      .collection(this.currentColTracker);
  }

  getTrackerColCommonByUserKey(userKey: string): AngularFirestoreCollection<TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed> { 
    return this.userService
      .getByUserKey(userKey)
      .collection(this.currentColTrackerCommon, 
        ref => ref.orderBy('commonType', 'desc')
      );
  }

  editTracker(userKey: string, tracker: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.currentColTracker)
      .doc(tracker.key)
      .update(tracker);
  }

  editTrackerCommon(userKey: string, trackerCommon: TrackerBeerCommon | TrackerDrugsCommon | TrackerFoodCommon | TrackerWeedCommon): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.currentColTrackerCommon)
      .doc(trackerCommon.key)
      .update(trackerCommon);
  }

  deleteTracker(userKey: string, tracker: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.currentColTracker)
     .doc(tracker.key)
     .delete()
  }

  deleteTrackerCommon(userKey: string, trackerCommon: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.currentColTrackerCommon)
     .doc(trackerCommon.key)
     .delete()
  }

  /*************** 
    HELPERS 
  ***************/

  private createNewTrackerCommon(trackerEntry: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed) {
    switch(trackerEntry.type) {
      case 'beer':
        trackerEntry = trackerEntry as TrackerBeer;
        return {
          // key: undefined, // needs to be set later, if you try and set 'undefined' db won't let you set the value
          userKey: trackerEntry.userKey,
          trackerBeerKey: trackerEntry.key,
          commonType: trackerEntry.beerBrewery + ' ' + trackerEntry.name,
        };
      case 'drugs':
        return {
          key: undefined, // needs to be set later
          userKey: trackerEntry.userKey,
          trackerDrugsKey: trackerEntry.key,
          commonType: trackerEntry.name,
        };
      case 'food':
        return {
          key: undefined, // needs to be set later
          userKey: trackerEntry.userKey,
          trackerFoodKey: trackerEntry.key,
          commonType: trackerEntry.name,
        };
      case 'weed':
        return {
          key: undefined, // needs to be set later
          userKey: trackerEntry.userKey,
          trackerWeedKey: trackerEntry.key,
          commonType: trackerEntry.name,
        };
    } 
  }

}
