import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { 
  TrackerWeed, TrackerBeer, TrackerTypeEnum,
  TrackerCommon
} from './trackers.model';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
  currentUserKey: string;
  
  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    // trackerType: TrackerBeer | TrackerDrugs | TrackerFood | TrackerWeed,
    trackerType: TrackerTypeEnum,
    userKey: string
  ) { 
    this.currentTrackerType = TrackerTypeEnum[trackerType];
    this.currentUserKey = userKey;

    switch(trackerType) {
      case TrackerTypeEnum.BEER:
        this.currentColTracker = this.colTRACKERBEER;
        this.currentColTrackerCommon = this.colTRACKERBEERCOMMON
        break;
      case TrackerTypeEnum.DRUGS:
        this.currentColTracker = this.colTRACKERDRUGS;
        this.currentColTrackerCommon = this.colTRACKERDRUGSCOMMON
        break;
      case TrackerTypeEnum.FOOD:
        this.currentColTracker = this.colTRACKERFOOD;
        this.currentColTrackerCommon = this.colTRACKERFOODCOMMON
        break;
      case TrackerTypeEnum.WEED:
        this.currentColTracker = this.colTRACKERWEED;
        this.currentColTrackerCommon = this.colTRACKERWEEDCOMMON
        break;
    }
  }


  saveNewTracker(trackerEntry: TrackerBeer | TrackerWeed)  {
    // We need to set the type from the constructor on our form obj here and our user key
    trackerEntry.userKey = this.currentUserKey;
    trackerEntry.trackerType = this.currentTrackerType;
    
    // Check this does not exist in common already
    let save$ = this.getCommonEntryByTracker(trackerEntry).subscribe(x => {
      console.log('top of save', x)

      if(!x.length) { // No common entry, full save
        let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.currentColTracker)
        .add(trackerEntry);

        promise.then(x => {
          x.update({key: x.id}); // this updates it in firebase
          trackerEntry.key = x.id; // and our model for later
          
          save$.unsubscribe(); // necessary, otherwise the subscription fires for every common entry update (infinite loop here)

          // Then save the common lookup
          this.saveNewTrackerCommon(trackerEntry);
        });
      }
      else { // existing entry, update the common count and save the tracker entry
        let comm = x[0] as TrackerCommon;
        // comm.commonCounts.forEach(elem => {
        //   if(elem.type === trackerEntry.consumptionAmountType) {
        //     elem.count += trackerEntry.consumptionAmount;
        //     return;
        //   }
        // });

        let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.currentColTracker)
        .add(trackerEntry);

        promise.then(x => {
          x.update({key: x.id}); // this updates it in firebase
          trackerEntry.key = x.id; // and our model for later
          
          save$.unsubscribe(); // necessary, otherwise the subscription fires for every common entry update (infinite loop here)

          // edit this time
          this.editTrackerCommon(comm);
        });
      }
    })

    
  }

  saveNewTrackerCommon(trackerEntry: TrackerBeer | TrackerWeed): Promise<firebase.firestore.DocumentReference>  {
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

  getCommonEntryByTracker(trackerEntry: TrackerBeer | TrackerWeed) {
    return this.userService.getByUserKey(this.currentUserKey)
      .collection(this.currentColTrackerCommon, 
        ref => ref.where('commonName', '==', trackerEntry.name))
      .valueChanges()
      .pipe(
        map(x => {
          return x; // returns array, empty if not exists
        })
      );  
  }

  getCurrentColTracker(): AngularFirestoreCollection<TrackerBeer | TrackerWeed> { 
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTracker);
  }

  getTrackerEntry(trackerKey: string) : AngularFirestoreDocument<TrackerBeer | TrackerWeed> {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTracker)
      .doc(trackerKey)
  }

  getCurrentColTrackerCommon(): AngularFirestoreCollection<TrackerCommon> { 
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTrackerCommon, 
        ref => ref.orderBy('commonName', 'desc')
      );
  }

  getTrackerCommonEntry(trackerCommonKey: string) : AngularFirestoreDocument<TrackerCommon> {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTracker)
      .doc(trackerCommonKey)
  }

  editTracker(tracker: TrackerBeer | TrackerWeed): Promise<void> {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTracker)
      .doc(tracker.key)
      .update(tracker);
  }

  editTrackerCommon(trackerCommon: TrackerCommon): Promise<void> {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.currentColTrackerCommon)
      .doc(trackerCommon.key)
      .update(trackerCommon);
  }

  deleteTracker(tracker: TrackerBeer | TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(this.currentUserKey)
     .collection(this.currentColTracker)
     .doc(tracker.key)
     .delete()
  }

  deleteTrackerCommon(trackerCommon: TrackerBeer | TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(this.currentUserKey)
     .collection(this.currentColTrackerCommon)
     .doc(trackerCommon.key)
     .delete()
  }

  /*************** 
    HELPERS 
  ***************/

  private createNewTrackerCommon(trackerEntry: TrackerBeer | TrackerWeed) {
    switch(trackerEntry.trackerType) {
      case 'beer':
        let trackerBeerEntry = trackerEntry as TrackerBeer;
        return {
          // key: undefined, // needs to be set later, if you try and set 'undefined' db won't let you set the value
          userKey: trackerBeerEntry.userKey,
          trackerBeerKey: trackerBeerEntry.key,
          commonName: trackerBeerEntry.name,
          commonTypeExtra: trackerBeerEntry.beerBrewery,
          // commonRating: trackerBeerEntry.rating,
          // commonCounts: [{ 'count': trackerEntry.consumptionAmount, 'type': trackerEntry.consumptionAmountType }]
        };
      default: 
        return {
          // key: undefined, // needs to be set later
          userKey: trackerEntry.userKey,
          trackerKey: trackerEntry.key,
          commonName: trackerEntry.name,
          commonTypeExtra: '', // no need on default
          // commonRating: trackerEntry.rating,
          // commonCounts: [{ 'count': trackerEntry.consumptionAmount, 'type': trackerEntry.consumptionAmountType }]
        };
    } 
  }

  private upsertTrackerCommon(userKey: string, trackerCommon: TrackerCommon) {
    // this.userService.getByUserKey(userKey).collection(trackerCommon.)
  }

  
}



// // Now save the new entry
// let promise: Promise<firebase.firestore.DocumentReference> = this.userService
// .getByUserKey(userKey)
// .collection(this.currentColTracker)
// .add(trackerEntry);

// promise.then(x => {
//   x.update({key: x.id}); // this updates it in firebase
//   trackerEntry.key = x.id; // and our model for later

//   // Then save the common lookup
//   this.saveNewTrackerCommon(trackerEntry);
// });