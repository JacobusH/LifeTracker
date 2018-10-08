import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { 
  ActivityField, ActivityFieldTypeEnum, TrackerNode, ActivityInterval, Tracker
} from './trackers.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { map, filter, catchError, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class TrackersService {
  currentUserKey: string;
  colAllTrackers = "allTrackers"
  colBase = 'tracker';

  constructor( 
    private afs: AngularFirestore,
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID
      console.log('cont', this.currentUserKey)
    })
  }

  
  saveNewTracker(newTracker: Tracker)  {
    this.verifyUserKey(newTracker.userKey);
    newTracker.name.replace(/\s/g, '');
    let check$ = this.checkTrackerIsNew(newTracker).valueChanges().subscribe(x => {
      if(x.length) { // exists
        console.log("trackers exists", x)
        // TODO: show error
      }
      else { // new
        this.createNewTracker(newTracker);
        this.router.navigate(['trackers/view/', newTracker.name]);
        check$.unsubscribe()
      }
    })
  }

  checkTrackerIsNew(newTracker: Tracker) {
    this.verifyUserKey(newTracker.userKey);
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('name', '==', newTracker.name)
      );
  }

  getAllTrackers(userKey: string): AngularFirestoreCollection<Tracker> { 
    this.verifyUserKey(userKey);
    console.log('all tracks', this.currentUserKey)
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers);
  }

  getAllTrackersByLastViewed(userKey: string): AngularFirestoreCollection<Tracker> {
    this.verifyUserKey(userKey);
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers, 
        ref => ref.orderBy('dateLastViewed', 'desc').limit(10)
      )
  }

  getParentNodesByTrackerName(trackerName: string, userKey): AngularFirestoreCollection<TrackerNode> {
    this.verifyUserKey(userKey);
    trackerName = trackerName.replace(/\s/g, '');

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName, 
        ref => ref.where('parent', '==', null));
  }

  createNewTracker(newTracker: Tracker): Promise<firebase.firestore.DocumentReference>  {
    // add to index
    let trackerPromise: Promise<firebase.firestore.DocumentReference> =this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers)
      .add(newTracker);

      trackerPromise.then(x => {
        x.update({key: x.id});
      });

    // make initial empty node
    let emptyNode: TrackerNode = {
      key: 'zzz',
      userKey: this.currentUserKey,
      name: 'New Act Node',
      parent: null,
      children: [],
      fields: [
        { name: 'New Field', type: ActivityFieldTypeEnum.empty }
      ],
      options: {
        points: -1,
        decayRate: {
          interval: ActivityInterval.None,
          value: -1
        }
      }
    };

    console.log('coll', this.colBase + newTracker.name)

    // create collection using empty node
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + newTracker.name)
      .add(emptyNode);

    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

  verifyUserKey(userKey: string) {
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
    }
  }

}
