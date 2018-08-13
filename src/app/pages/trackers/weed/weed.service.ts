import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackerWeed, trackerWeedDyn } from '../weed/weed.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
// import { GeoPoint } from '../../../../../node_modules/@firebase/firestore-types'; // wtf why did this stop working?? 
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class WeedService {
  colUSERS: string = '!Users';
  colTRACKERWEED: string = 'trackerWeed';
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
      locationName: '',
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
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(userKey)
        .collection(this.colTRACKERWEED)
        .add(weedEntry);

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

  edit(userKey: string, trackerWeed: TrackerWeed): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERWEED)
      .doc(trackerWeed.key)
      .update(trackerWeed);
  }

  delete(userKey: string, trackerWeed: TrackerWeed): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.colTRACKERWEED)
     .doc(trackerWeed.key)
     .delete()
  }

}
