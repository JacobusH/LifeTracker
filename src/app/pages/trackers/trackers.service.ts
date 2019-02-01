import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { 
  TrackerFieldTypeEnum, TrackerNode, ActivityInterval, Tracker, TrackerField
} from './trackers.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { map, filter, catchError, mergeMap, switchMap, take } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import * as firebase from 'firebase/app';
import { TrackerFieldService } from './components/tracker-field/tracker-field.service';

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
    private router: Router,
    private fieldService: TrackerFieldService
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID
    })
  }

  emptyField: TrackerField = {
    nodeKey: undefined,
    label: "Name",
    value: "",
    type: TrackerFieldTypeEnum.text
  }

  createEmptyNode() {
    // make initial empty node
    let emptyNode: TrackerNode = {
      key: 'zzz',
      userKey: this.currentUserKey,
      name: 'New Act Node',
      parent: null,
      children: [],
      // fields: [
      //   this.emptyField
      // ],
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
    let check$ = this.checkTrackerIsNew(newTracker).valueChanges().pipe(take(1)).subscribe(x => {
      if(x.length) { // exists
        console.log("trackers exists", x)
        // TODO: show error
      }
      else { // new
        this.createNewTracker(newTracker).then(x => {
          console.log('navving to tracker view')
          this.router.navigate(['trackers/view/', newTracker.name])
        });
      }
    })
  }

  createNewTracker(newTracker: Tracker)  {
    let fieldPromise: Promise<any>;

    // add to index
    let trackerPromise: Promise<firebase.firestore.DocumentReference> =this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers)
      .add(newTracker);
    trackerPromise.then(x => {
      x.update({key: x.id});
    });

    // add to collection using empty node
    let emptyNode = this.createEmptyNode();
    let nodePromise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + newTracker.name)
      .add(emptyNode);
    return nodePromise.then(nodeRef => {
      nodeRef.update({key: nodeRef.id}); // set the node key

      this.emptyField.nodeKey = nodeRef.id;
      fieldPromise = nodeRef.collection('fields').add(this.emptyField) // set a blank field
      return fieldPromise.then(fieldRef => {
        console.log("field key created")
        return fieldRef.update({key: fieldRef.id}); // set the field key
      })

      // TODO: why is this not working...
      // this.fieldService.saveTrackerField(this.colBase + newTracker.name, x.id, this.currentUserKey) // make a new empty field in the node
    });

    // return Promise.all([trackesrPromise, nodePromise, fieldPromise]);
  }

  createNode(trackerName: string, userKey: string, parentNodeKey: string = undefined) {
    this.verifyUserKey(userKey);
    let emptyNode = this.createEmptyNode();
    if(parentNodeKey) {
      emptyNode.parent = parentNodeKey;
    }
    
    // add the empty node to the right collection
    let innerPromise;
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .add(emptyNode);

    promise.then(nodeRef => {
      nodeRef.update({key: nodeRef.id});

      this.emptyField.nodeKey = emptyNode.key;
      innerPromise = nodeRef.collection('fields').add(this.emptyField) // set a blank field
      innerPromise.then(fieldRef => {
        fieldRef.update({key: fieldRef.id}); // set the field key
        fieldRef.update({nodeKey: nodeRef.id}) // set the field's node key
      })

      if(parentNodeKey) {
        this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.colBase + trackerName)
        .doc(parentNodeKey).update({
          children: firebase.firestore.FieldValue.arrayUnion(nodeRef.id)
        })
      }

      return nodeRef;
    });

    return promise;
  }

  copyTrackerNode(trackerName: string, node: TrackerNode, userKey: string) {
    let oldKey = node.key;
    let promise: Promise<firebase.firestore.DocumentReference> = this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .add(node);

      promise.then(nodeRef => {
        this.fieldService.copyFields(trackerName, userKey, node, nodeRef.id);
        return nodeRef.update({key: nodeRef.id});
      });

      return promise;
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

  getTrackerByName(trackerName:string, userKey: string) {
    this.verifyUserKey(userKey);
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colAllTrackers,
        ref => ref.where('name', '==', trackerName)
      );
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

  getNodeByKey(nodeKey: string, trackerName: string, userKey: string): AngularFirestoreDocument<TrackerNode> {
    this.verifyUserKey(userKey);

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(nodeKey);
  }

  getMostRecentNode(trackerName: string, userKey: string) {
    this.verifyUserKey(userKey);
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
  }

  verifyUserKey(userKey: string) {
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
    }
  }

}
