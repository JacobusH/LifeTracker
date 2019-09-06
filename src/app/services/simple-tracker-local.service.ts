import { Injectable } from '@angular/core';
import { SimpleTrackerNode, SimpleTrackerField, TrackerFieldTypeEnum, SimpleRecorder } from 'app/models/trackers.model';
import { AuthService } from './auth.service';
import { GridsterConfig, GridsterItem, DisplayGrid, GridType } from 'angular-gridster2';
import { Observable, BehaviorSubject } from 'rxjs';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SimpleTrackerLocalService {
	curNodeList: Array<SimpleTrackerNode>;
	curGridLayout: Array<GridsterItem>;
  curUserKey: string;
  colUSERS: string = 'Users';

  constructor(private authService: AuthService) { 
    this.authService.user.subscribe(user => {
      this.curUserKey = user.key;
    })
  }

	// Default operations
	createDefaultLayout() {
		let def: Array<GridsterItem> = [
			{rows: 1, cols: 1, x: 0, y: 0},
			{rows: 1, cols: 1, x: 3, y: 0},
			{rows: 1, cols: 1, x: 2, y: 1},
			{rows: 1, cols: 1, x: 0, y: 3},
			{rows: 1, cols: 1, x: 3, y: 3},
			// {rows: 1, cols: 1, x: 2, y: 1},
			// {rows: 1, cols: 1, x: 5, y: 5},
			// {rows: 1, cols: 1, x: 3, y: 2},
			// {rows: 1, cols: 1, x: 2, y: 2},
			// {rows: 1, cols: 1, x: 3, y: 4},
			// {rows: 1, cols: 1, x: 0, y: 6}
		];
		return def;
	}

	createDefaultLayoutItem() {
		let def: GridsterItem = {rows: 1, cols: 1, x: 0, y: 0};
		return def;
	}

  createDefaultItem(withField: boolean = true) {
		if(withField) {
			let defField = this.createDefaultField();
			let defRec = this.createDefaultRecorder();
			let def: SimpleTrackerNode  = {
				key: uuid(),
				userKey: this.curUserKey,
				parent: null,
				children: null,
				fields: [ defField ],
				fieldOrder: [ defField.key ],
				recorder: defRec,
				templateNodeKey: null
			};
			return def;
		}
		else { // just node, no default field
			let def: SimpleTrackerNode  = {
				key: uuid(),
				userKey: this.curUserKey,
				parent: null,
				children: null,
				fields: [],
				fieldOrder: [],
				recorder: null,
				templateNodeKey: null
			};
			return def;
		}
  }

  createDefaultField(label: string = "New Field", value: string = "New Value", type: TrackerFieldTypeEnum = TrackerFieldTypeEnum.text) {
    let def: SimpleTrackerField = {
      key: uuid(),
      label: label,   
      value: value,
      type: TrackerFieldTypeEnum.text,
      labelHidden: false
    }
    return def;
  }

  createDefaultRecorder() {
    let rec: SimpleRecorder = {
      isRecorder: false,
      lastRecordedAt: new Date(),
      recorderTimeD: 1,
      recorderTimeT: '5:00'
    }
    return rec;
  }

	// Layout operations

  // Node operations
  nodeAdd(node: SimpleTrackerNode = null) {
    if(!node) {
      node = this.createDefaultItem();
    }
		this.curNodeList.push(node);
		// list.push(node);
	}
	
	// TODO: figure out what to do with grid layout when adding node outside the grid

  addChild(parentNode: SimpleTrackerNode, childNode: SimpleTrackerNode) {
    parentNode.children.push(childNode.key);
  }

  nodeCopy(nodeToCopy: SimpleTrackerNode) {
    let newNode: SimpleTrackerNode = JSON.parse(JSON.stringify(nodeToCopy)); // deep copy node
    newNode.key = uuid(); // replace node key
    // replace field keys
    let keyMap: Array<{'oldKey': string, 'newKey': string}> = [];
    for(let i = 0; i < newNode.fields.length; i++) {
      let newKey = uuid();
      let oldKey = newNode.fields[i].key;
      keyMap.push({'oldKey': oldKey, 'newKey': newKey});
      newNode.fields[i].key = newKey;
    }
    // replace field key order
    for(let i = 0; i < keyMap.length; i++) {
      for(let j = 0; j < newNode.fieldOrder.length; j++) {
        if(newNode.fieldOrder[j] == keyMap[i].oldKey) {
          newNode.fieldOrder[j] = keyMap[i].newKey;
        }
      }
    }
    // put in the template key on both nodes
    newNode.templateNodeKey = nodeToCopy.templateNodeKey;
    if(!nodeToCopy.templateNodeKey) {
      nodeToCopy.templateNodeKey = nodeToCopy.key;
    }
    // add to correct list
    if(!nodeToCopy.parent) {
      this.curNodeList.push(newNode);
    }
    // else { // TODO: need to figure out children
    //   nodeToCopy.children.push(newNode);
    // }

    return {'oldNode': nodeToCopy, 'newNode': newNode};
  }

  nodeRemove(nodeToRemove: SimpleTrackerNode) {
    // TODO: need to implement way to remove child references and nested nodes
    for(let i = 0; i < this.curNodeList.length; i++) {
      if(this.curNodeList[i].key == nodeToRemove.key) {
        this.curNodeList.splice(i, 1);
      }
    }
	}
	
	nodeRemoveByKey(key: string) {
		for(let i = 0; i < this.curNodeList.length; i++) {
      if(this.curNodeList[i].key == key) {
        this.curNodeList.splice(i, 1);
      }
    }
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
    node.fields.splice(node.fields.indexOf(field), 1);
    node.fieldOrder.splice(node.fieldOrder.indexOf(field.key), 1);
	}
	
  saveField() {
    // NOTE: done locally in traker-field component
  }

}
