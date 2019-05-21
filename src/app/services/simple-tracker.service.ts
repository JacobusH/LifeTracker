import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { SimpleTrackerNode, SimpleTrackerField } from 'app/models/trackers.model';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { map, filter, catchError, mergeMap, switchMap, take } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';
import * as firebase from 'firebase/app';
import { TrackerFieldService } from './tracker-field.service';
import { v4 as uuid } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class SimpleTrackerService {
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

  // Node operations
  getTopLevelNodesByTrackerName(trackerName: string): AngularFirestoreCollection<SimpleTrackerNode> {
    trackerName = trackerName.replace(/\s/g, '');
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName, 
        ref => ref.where('parent', '==', null));
  }

  nodeAdd(trackerName: string, nodeToAdd: SimpleTrackerNode) {
    // always add the node to our collection
    this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(nodeToAdd.key)
      .set(nodeToAdd)
    // and add as child to appropriate parent if necessary
    if(nodeToAdd.parent) {
      this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(nodeToAdd.parent)
      .update({
        fields: firebase.firestore.FieldValue.arrayUnion( [nodeToAdd.key] )
      });
    }
  }

  nodeRemove(trackerName: string, node: SimpleTrackerNode) {
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(node.key)
      .delete()
  }

  nodeUpdate(trackerName: string, node: SimpleTrackerNode) {
    this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(node.key)
      .set(node)
  }

  nodeCopy(trackerName: string, nodeCopiedFrom: SimpleTrackerNode, newNode: SimpleTrackerNode) {
    // NOTE: the copy logic happen in the local service. Then the resultings nodes are passed ehre
    this.nodeUpdate(trackerName, nodeCopiedFrom); // update our old node since template key may have been updated
    this.nodeAdd(trackerName, newNode); // add copied node to collection
  }

  // Field operations
  fieldAdd(trackerName: string, nodeKey: string, newField: SimpleTrackerField) {
    // add to fields arr
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey)
    .update({
      fields: firebase.firestore.FieldValue.arrayUnion( newField )
    });
    // add to field ordering
    this.fieldOrderAdd(trackerName, nodeKey, newField.key);
  }

  fieldRemove(trackerName: string, nodeKey: string, fieldToRemove: SimpleTrackerField) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey)
    .update({
      fields: firebase.firestore.FieldValue.arrayRemove(fieldToRemove)
    });
    // and remove from order
    this.fieldOrderRemove(trackerName, nodeKey, fieldToRemove.key);
  }

  fieldUpdate(trackerName: string, nodeKey: string, fieldToUpdate: SimpleTrackerField) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey).valueChanges().subscribe(n => {
      // let node: SimpleTrackerNode = n[0];
      let node = n as SimpleTrackerNode;
      for(let i = 0; i < node.fields.length; i++) {
        if(node.fields[i].key == fieldToUpdate.key) {
          node.fields[i] = fieldToUpdate;
        }
      }
      this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName,
        ref => ref.where('name', '==', trackerName)
      )
      .doc(nodeKey).update({'fields': node.fields})
    })
  }

  // Field Order operations
  fieldOrderAdd(trackerName: string, nodeKey: string, keyToAdd: string) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey)
    .update({
      fieldOrder: firebase.firestore.FieldValue.arrayUnion(keyToAdd)
    });
  }

  fieldOrderRemove(trackerName: string, nodeKey: string, fieldKey: string) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey)
    .update({
      fieldOrder: firebase.firestore.FieldValue.arrayRemove(fieldKey)
    });
  }

  fieldOrderReplace(trackerName: string, nodeKey: string, newOrder: Array<string>) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(nodeKey)
    .update({fieldOrder: newOrder})
  }

}
