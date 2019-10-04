import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import { SimpleTrackerNode, SimpleTrackerField, TrackerFieldTypeEnum } from 'app/models/trackers.model';
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
  docLabels = '!docLabels';
	recorderCol = "!recorders";
	docGridLayout = "!gridLayout";

  constructor(
    private afs: AngularFirestore,
    private userService: UserService,
    private authService: AuthService
  ) { 
     this.authService.user.subscribe(x => {
      this.currentUserKey = x.authID;
    })
	}
	
	// Layout operations


	//////////
	// NODE OPERATIONS
	/////////
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
    // NOTE: the copy logic happens in the local service. Then the resultings nodes are passed here
    this.nodeUpdate(trackerName, nodeCopiedFrom); // update our old node since template key may have been updated
    this.nodeAdd(trackerName, newNode); // add copied node to collection
  }

	//////////
	// FIELD OPERATIONS
	/////////
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
	
	fieldAddToAllNodes(trackerName: string, newField: SimpleTrackerField) {
		// add to fields arr
		this.userService
		.getByUserKey(this.currentUserKey)
		.collection(this.colBase + trackerName).valueChanges().subscribe(n => {
			let nodes = n as SimpleTrackerNode[];
			nodes.forEach(node => {
				this.fieldAdd(trackerName, node.key, newField);
			})
		})

		// .doc(nodeKey)
		// .update({
		// 	fields: firebase.firestore.FieldValue.arrayUnion( newField )
		// });
		// // add to field ordering
		// this.fieldOrderAdd(trackerName, nodeKey, newField.key);
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
		})
		.then(
			 value => console.log(),
			 reason => console.log("failed", reason)
		)
		.catch(reason => console.log("fiel delete failed", reason))
		// .finally(() => console.log("in finally"))

    // and remove from order
    this.fieldOrderRemove(trackerName, nodeKey, fieldToRemove.key);
	}
	
	fieldFromAllNodesByLabel(trackerName: string, label: string) {
		// add to fields arr
		this.userService
		.getByUserKey(this.currentUserKey)
		.collection(this.colBase + trackerName)
		.valueChanges().subscribe(n => {
			let nodes = n as SimpleTrackerNode[];
			nodes.forEach(node => {
				node.fields.forEach(field => {
					if(field.label == label) {
						// console.log("deleting field: ", node.key, field.key, field.label);
						this.fieldRemove(trackerName, node.key,	field);
					}
				})
			})
		})
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
	
	fieldGetDefaultValue(fieldType: TrackerFieldTypeEnum) {
		switch(fieldType) {
			case TrackerFieldTypeEnum.empty: 			return "";
			case TrackerFieldTypeEnum.text: 			return "new text";
			case TrackerFieldTypeEnum.textarea: 	return "new text area";
			case TrackerFieldTypeEnum.number: 		return -1;
			case TrackerFieldTypeEnum.select: 		return null;
			case TrackerFieldTypeEnum.date: 			return new Date();
			case TrackerFieldTypeEnum.daterange: 	return new Date(); // TODO: what is default new daterange?
			case TrackerFieldTypeEnum.radio: 			return null; 
			case TrackerFieldTypeEnum.rater: 			return null; 
			case TrackerFieldTypeEnum.title: 			return "New Title"; 
			case TrackerFieldTypeEnum.list: 			return null; 
			case TrackerFieldTypeEnum.checkbox: 	return null; 
			case TrackerFieldTypeEnum.wikiSummary: return null; 
		}
	}

	/////////
	// FIELD LABEL LIST MANAGEMENT
	/////////
  labelListGet(trackerName: string): AngularFirestoreDocument<{labels: Array<string>}> {
    trackerName = trackerName.replace(/\s/g, '');
    return this.userService
      .getByUserKey(this.currentUserKey)
      .collection(this.colBase + trackerName)
      .doc(this.docLabels);
  }

  labelListAdd(trackerName: string, labelToAdd: string) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(this.docLabels)
    .update({
      labels: firebase.firestore.FieldValue.arrayUnion(labelToAdd)
    });
  }

  labelListRemove(trackerName: string, labelToRemove: string) {
    this.userService
    .getByUserKey(this.currentUserKey)
    .collection(this.colBase + trackerName,
      ref => ref.where('name', '==', trackerName)
    )
    .doc(this.docLabels)
    .update({
      labels: firebase.firestore.FieldValue.arrayRemove(labelToRemove)
    });
  }

	/////////
	// FIELD ORDER OPERATIONS
	/////////
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

	/////////
	// RECORDER NODE OPERATIONS
	/////////
  recorderAdd(trackerName: string, nodeToAdd: SimpleTrackerNode) {
    nodeToAdd.recorder.isRecorder = true;
    // nodeToAdd.key = uuid();
    this.nodeAdd(this.recorderCol, nodeToAdd);
  }

  recorderRemove(nodeToRemove: SimpleTrackerNode) {
    this.nodeRemove(this.recorderCol, nodeToRemove);
  }

}
