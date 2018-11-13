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
    })
  }

  private createEmptyNode() {
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

    return emptyNode;
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

  createNewTracker(newTracker: Tracker): Promise<firebase.firestore.DocumentReference>  {
    // add to index
    let trackerPromise: Promise<firebase.firestore.DocumentReference> =this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers)
      .add(newTracker);

    trackerPromise.then(x => {
      x.update({key: x.id});
    });

    let emptyNode = this.createEmptyNode();

    // add to collection using empty node
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + newTracker.name)
      .add(emptyNode);

    promise.then(x => {
      x.update({key: x.id});
    });

    return trackerPromise;
  }

  createNode(trackerName: string, userKey: string, parentNodeKey: string = undefined) {
    this.verifyUserKey(userKey);
    let emptyNode = this.createEmptyNode();
    if(parentNodeKey) {
      emptyNode.parent = parentNodeKey;
    }
    
    // add the empty node to the right collection
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .add(emptyNode);

    promise.then(x => {
      x.update({key: x.id});
      if(parentNodeKey) {
        this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.colBase + trackerName)
        .doc(parentNodeKey).update({
          children: firebase.firestore.FieldValue.arrayUnion(x.id)
        })
      }
    });
  }

  checkTrackerIsNew(newTracker: Tracker) {
    this.verifyUserKey(newTracker.userKey);
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('name', '==', newTracker.name)
      );
  }

  deleteNode(nodeKey: string, trackerName: string, userKey: string) {
    this.verifyUserKey(userKey);
    let toDel = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(nodeKey);
      
      toDel.valueChanges().subscribe(node => {
        let retNode = node as TrackerNode;
        retNode.children.forEach(childKey => {
          this.deleteNode(childKey, trackerName, userKey)
        })
      }).unsubscribe();

      toDel.delete();
  }

  getAllTrackers(userKey: string): AngularFirestoreCollection<Tracker> { 
    this.verifyUserKey(userKey);
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

  getNodeByKey(nodeKey: string, trackerName: string): AngularFirestoreDocument<TrackerNode> {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(nodeKey);
  }

  verifyUserKey(userKey: string) {
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
    }
  }

}
