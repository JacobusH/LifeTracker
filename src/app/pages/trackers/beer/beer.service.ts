import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackerBeer } from '../beer/beer.model';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
// import { GeoPoint } from '../../../../../node_modules/@firebase/firestore-types'; // wtf why did this stop working?? 
import 'rxjs/add/operator/switchMap'
import * as firebase from 'firebase/app';

@Injectable()
export class BeerService {
  colUSERS: string = '!Users';
  colTRACKERBEER: string = 'trackerBeer';
  colTRACKERBEERCOMMON: string = 'trackerBeerCommon';
  users: AngularFirestoreCollection<User>;
  
  constructor(
    private afs: AngularFirestore,
    private userService: UserService          
  ) { 
    
  }

  createNew(): TrackerBeer {
    let data: TrackerBeer = {
      key: '',
      userKey: '',
      locationDrank: '',
      // locationPoint: new GeoPoint(0, 0),
      locationPoint: undefined,
      name: '',
      beerBrewery: '',
      amountDrank: -1,
      amountType: '',
      notes: '',
      rating: -1,
      consumptionDate: new Date(),
      type: 'beer',
      commonType: ''
      };

      data.commonType = data.name
      return data;
  }

  saveNewTrackerWeed(userKey: string, beerEntry: TrackerBeer): Promise<firebase.firestore.DocumentReference>  {
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
        .getByUserKey(userKey)
        .collection(this.colTRACKERBEER)
        .add(beerEntry);

    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  getTrackerWeedColByUserKey(userKey: string): AngularFirestoreCollection<TrackerBeer> { 
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERBEER);
  }

  edit(userKey: string, trackerBeer: TrackerBeer): Promise<void> {
    return this.userService
      .getByUserKey(userKey)
      .collection(this.colTRACKERBEER)
      .doc(trackerBeer.key)
      .update(trackerBeer);
  }

  delete(userKey: string, trackerBeer: TrackerBeer): Promise<void> {
    return this.userService
     .getByUserKey(userKey)
     .collection(this.colTRACKERBEER)
     .doc(trackerBeer.key)
     .delete()
  }

}
