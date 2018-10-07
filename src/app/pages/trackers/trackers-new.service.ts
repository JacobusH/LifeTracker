import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { 
  Tracker, TrackerTypeEnum, ActivityNode, ActivityField, ActivityFieldTypeEnum, SkillNode
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
export class TrackersNewService {
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

  
  saveNewTracker(tracker: Tracker)  {
    // We need to set the type from the constructor on our form obj here and our user key
    console.log('saved')
    tracker.userKey = this.currentUserKey;
    tracker.name = tracker.name.replace(/\s/g, '');

    let test$ = this.checkTrackerIsNew(tracker.name).valueChanges().subscribe(x => {
      if(x.length) { // exists
        console.log("trackers exists", x)
        // TODO: show error
      }
      else { // new
        this.createNewTracker(tracker);
        this.router.navigate(['trackers/view/', tracker.name]);
        test$.unsubscribe()
      }
    })
  }

  checkTrackerIsNew(trackerName: string) {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('trackerName', '==', trackerName)
        );
  }

  getAllTrackerNames(): AngularFirestoreCollection<string> { 
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers);
  }

  getTracker(trackerName: string, userKey): AngularFirestoreCollection<Tracker> {
    trackerName = trackerName.replace(/\s/g, '');
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
      console.log('scur', userKey)
    }

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName);
  }

  createNewTracker(tracker: Tracker): Promise<firebase.firestore.DocumentReference>  {
    // add to index
    this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers)
      .add({"trackerName": tracker.name.toLowerCase()});

      console.log('service', tracker)
      console.log('enum', TrackerTypeEnum.Activity)

    // make initial empty node
    if(tracker.trackerType == TrackerTypeEnum.Activity) {
      console.log('in act')
      let emptyNode: ActivityNode = {
        trackerKey: tracker.key,
        name: 'New Act Node',
        fields: [
          { name: 'New Field', type: ActivityFieldTypeEnum.empty }
        ]
      };
      tracker.actNodes = [emptyNode] 
    }
    else {
      console.log('in skill')
      let emptyNode: SkillNode = {
        trackerKey: tracker.key,
        name: 'New Skill Node'
      };
      tracker.skillNodes = [emptyNode] 
    }

    console.log('service2', tracker)

    // create collection
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + tracker.name)
      .add(tracker);

    promise.then(x => {
      x.update({key: x.id});
    });

    return promise;
  }

}
