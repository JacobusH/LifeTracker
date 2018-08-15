import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackerWeed, trackerWeedDyn, TrackerWeedCommon } from '../weed/weed.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
// import { GeoPoint } from '../../../../../node_modules/@firebase/firestore-types'; // wtf why did this stop working?? 
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class WeedService {
  colUSERS: string = '!Users';
  colTRACKERWEED: string = 'trackerWeed';
  colTRACKERWEEDCOMMON: string = 'trackerWeedCommon';
  users: AngularFirestoreCollection<User>;
  
  constructor(
    private afs: AngularFirestore,
    private userService: UserService          
  ) { 
    
  }

  createNew(): TrackerWeed {
    let data: TrackerWeed = {
      key: '',
      userKey: '',
      locationSmoked: '',
      // locationPoint: new GeoPoint(0, 0),
      locationPoint: undefined,
      weedName: '',
      weedStrain: '',
      amountSmoked: -1,
      amountType: '',
      notes: '',
      rating: -1,
      consumptionDate: new Date()
      };
      return data;
  }

  saveNewTrackerWeed(userKey: string, weedEntry: TrackerWeed): Promise<firebase.firestore.DocumentReference>  {
    // First save the new entry
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(userKey)
        .collection(this.colTRACKERWEED)
        .add(weedEntry);

    promise.then(x => {
      x.update({key: x.id});

      // Now save it into the common lookup
      let comm: TrackerWeedCommon = {
        key: undefined,
        userKey: weedEntry.userKey,
        trackerWeedKey: x.id,
        weedStrain: weedEntry.weedStrain 
      };
      this.saveNewTrackerWeedCommon(userKey, comm);

    });

    return promise;
  }

  saveNewTrackerWeedCommon(userKey: string, trackerWeedCommonEntry: TrackerWeedCommon): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(userKey)
        .collection(this.colTRACKERWEEDCOMMON)
        .add(trackerWeedCommonEntry);

    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  getTrackerWeedColByUserKey(userKey: string): AngularFirestoreCollection<TrackerWeed> { 
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERWEED);
  }

  editTrackerWeed(userKey: string, trackerWeed: TrackerWeed): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERWEED)
      .doc(trackerWeed.key)
      .update(trackerWeed);
  }

  editTrackerWeedCommon(userKey: string, trackerWeedCommon: TrackerWeedCommon): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERWEEDCOMMON)
      .doc(trackerWeedCommon.key)
      .update(trackerWeedCommon);
  }

  deleteTrackerWeed(userKey: string, trackerWeed: TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.colTRACKERWEED)
     .doc(trackerWeed.key)
     .delete()
  }

  deleteTrackerWeedCommon(userKey: string, trackerWeedCommon: TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.colTRACKERWEEDCOMMON)
     .doc(trackerWeedCommon.key)
     .delete()
  }

}
