import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { 
  TrackerFieldTypeEnum, TrackerNode, ActivityInterval, Tracker, TrackerField, TrackerFieldOption
} from '../models/trackers.model';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { map, filter, catchError, mergeMap, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import * as firebase from 'firebase/app';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TrackerFieldService {
  currentUserKey: string;
  colAllTrackers = "allTrackers";
  colBase = 'tracker';
  colFields = 'fields';
  colOrder = "!order"

  

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

  createEmptyField(nodeKey: string) {
    let newField : TrackerField = {
      key: uuid(),
      nodeKey: nodeKey,
      label: "Name",
      value: "",
      type: TrackerFieldTypeEnum.text,
      options: new Array<TrackerFieldOption>({'optName': 'newName', 'optValue': 'newValue'})
    }
    newField.nodeKey = nodeKey;
    newField.key = uuid();
    return newField;
  }

  saveTrackerField_NEW(trackerName: string, userKey: string, nodeKey: string, field: TrackerField) {
    this.verifyUserKey(userKey);

    this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.colBase + trackerName,
          ref => ref.where('name', '==', trackerName))
        .doc(nodeKey)
        .collection(this.colFields)
        .doc(field.key)
        .set(field);
  }

  saveTrackerField(trackerName: string, userKey: string, nodeKey: string, field: TrackerField = undefined) {
    this.verifyUserKey(userKey);

    // new field
    let promise: Promise<any>; 
    if(field == undefined) {
      let field: TrackerField = {
        key: uuid(),
        nodeKey: nodeKey,
        label: "Name",
        value: "",
        type: TrackerFieldTypeEnum.text,
        options: new Array<TrackerFieldOption>({'optName': 'newName', 'optValue': 'newValue'})
      }
      field.nodeKey = nodeKey;
      
      promise = this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.colBase + trackerName,
          ref => ref.where('name', '==', trackerName))
        .doc(nodeKey)
        .collection(this.colFields)
        .add(field);

        promise.then(x => {
          this.addFieldToOrder(trackerName, nodeKey, userKey, x.id) // add to order array
          return x.update({key: x.id}); // set the field key
        })  
    }
    else { // update field
      promise = this.userService
        .getByUserKey(this.currentUserKey)
        .collection(this.colBase + trackerName,
          ref => ref.where('name', '==', trackerName))
        .doc(nodeKey)
        .collection(this.colFields)
        .doc(field.key)
        .update(field);
    }

    return promise;
      
  }

  copyFields(trackerName: string, userKey: string, oldNode: TrackerNode, newNodeId: string) {
    console.log('fieldy', oldNode, newNodeId)
      this.getFields(trackerName, oldNode.key, userKey).valueChanges().pipe(take(1)).subscribe(fields => {
        fields.forEach(field => {
          let f = field as TrackerField;
          f.nodeKey = newNodeId;

          let promise: Promise<any>; 
          promise = this.userService
          .getByUserKey(this.currentUserKey)
          .collection(this.colBase + trackerName,
            ref => ref.where('name', '==', trackerName))
          .doc(newNodeId)
          .collection(this.colFields)
          .add(f);

          promise.then(x => {
            x.update({key: x.id}); // set the field key
          }) 
      });
    });
  }

  getField(curTrackerName: string, fieldKey: string, nodeKey: string, userKey: string) {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + curTrackerName)
      .doc(nodeKey)
      .collection(this.colFields)
      .doc(fieldKey);
  }

  getFields(curTrackerName: string, nodeKey, userKey: string) {
    this.verifyUserKey(userKey);

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + curTrackerName,
        ref => ref.where('name', '==', curTrackerName)
      )
      .doc(nodeKey)
      .collection(this.colFields);
  } 
  
  getFieldOrder(curTrackerName: string, nodeKey, userKey: string) {
    this.verifyUserKey(userKey);

    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + curTrackerName,
        ref => ref.where('name', '==', curTrackerName)
      )
      .doc(nodeKey)
      .collection(this.colFields)
      .doc(this.colOrder);
  }

  changeFieldOrder(curTrackerName: string, nodeKey: string, userKey: string, newOrder: Array<TrackerField>) {
    this.verifyUserKey(userKey);

    // get the order of keys
    let ord: Array<string> = new Array<string>();
    newOrder.forEach(field => {
      ord.push(field.key);
    })

    this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + curTrackerName,
        ref => ref.where('name', '==', curTrackerName)
      )
      .doc(nodeKey)
      .collection(this.colFields)
      .doc(this.colOrder).update({"order": ord})
  }

  addFieldToOrder(curTrackerName: string, nodeKey: string, userKey: string, toAdd: string) {
    this.verifyUserKey(userKey);

    return this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + curTrackerName,
      ref => ref.where('name', '==', curTrackerName)
    )
    .doc(nodeKey)
    .collection(this.colFields)
    .doc(this.colOrder).update({"order": firebase.firestore.FieldValue.arrayUnion(toAdd)})// add to order array
  }

  verifyUserKey(userKey: string) {
    if(!this.currentUserKey) {
      this.currentUserKey = userKey
    }
  }


}
