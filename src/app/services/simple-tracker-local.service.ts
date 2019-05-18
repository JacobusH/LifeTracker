import { Injectable } from '@angular/core';
import { SimpleTrackerNode, SimpleTrackerField, TrackerFieldTypeEnum } from 'app/models/trackers.model';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SimpleTrackerLocalService {
  curNodeList: Array<SimpleTrackerNode>;
  curUserKey: string;

  constructor(private authService: AuthService) { 
    this.authService.user.subscribe(user => {
      this.curUserKey = user.key;
    })
  }

  // Default operations
  createDefaultItem() {
    let defField = this.createDefaultField();
    let def: SimpleTrackerNode  = {
      key: uuid(),
      userKey: this.curUserKey,
      parent: null,
      children: null,
      fields: [ defField ],
      fieldOrder: [ defField.key ]
    };
    return def;
  }

  createDefaultField(label: string = "New Field", value: string = "New Value", type: TrackerFieldTypeEnum = TrackerFieldTypeEnum.text) {
    let def: SimpleTrackerField = {
      key: uuid(),
      label: label,   
      value: value,
      type: TrackerFieldTypeEnum.text
    }
    return def;
  }

  // List operations
  // ...
  
  // Node operations
  nodeAdd(list: Array<SimpleTrackerNode>, node: SimpleTrackerNode = null) {
    if(!node) {
      node = this.createDefaultItem();
    }
    list.push(node)
  }

  addChild(parentNode: SimpleTrackerNode, childNode: SimpleTrackerNode) {
    parentNode.children.push(childNode.key);
  }

  nodeCopy(nodeToCopy: SimpleTrackerNode) {
    let newNode = JSON.parse(JSON.stringify(nodeToCopy));
    if(!nodeToCopy.parent) {
      this.curNodeList.push(newNode);
    }
    else {
      nodeToCopy.children.push(newNode);
    }
  }

  nodeRemove(nodeToRemove: SimpleTrackerNode) {
    // TODO: need to implement way to remove child references
    nodeToRemove = null;
  }

  // recursiveRemove(nodeToRemove: SimpleTrackerNode, curList: Array<SimpleTrackerNode>) {
  //   for(let i = 0; i < curList.length; i++) {
  //     if(curList[i].key == nodeToRemove.key) {
  //       curList.splice(i, i + 1);
  //     }
  //     if(curList[i].children) {
  //       curList[i].children.forEach(child => {
  //         this.recursiveRemove(child);
  //       })
  //     }
  //   }
  // }

  // Field Operations
  fieldAdd(node: SimpleTrackerNode, field: SimpleTrackerField) {
    node.fields.push(field);
    node.fieldOrder.push(field.key);
  }

  fieldRemove(node: SimpleTrackerNode, field: SimpleTrackerField) {
    node.fields.splice(node.fields.indexOf(field), node.fields.indexOf(field) + 1);
    node.fieldOrder.splice(node.fieldOrder.indexOf(field.key), node.fieldOrder.indexOf(field.key) + 1);
  }

  saveField() {
    // NOTE: done locally in traker-field component
  }

}
