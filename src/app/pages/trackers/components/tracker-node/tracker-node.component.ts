import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { AuthService, OptionsService, TrackersService, TrackerFieldService } from 'app/services';
import { TrackerNode, TrackerField } from 'app/models';
import { SimpleTrackerNode, SimpleTrackerField } from 'app/models/trackers.model';
import { SimpleTrackerLocalService } from 'app/services/simple-tracker-local.service';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { slideInFadeOut } from 'app/animations';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerNodeComponent implements OnInit, AfterViewInit {
  @Input() node: SimpleTrackerNode;
  @Input() trackerName: string;
  @Input() options: string;
  @Output('onDelete') deleteEvent = new EventEmitter<TrackerNode>();
  @Output('onCopy') copyEvent = new EventEmitter<TrackerNode>();
  @Output('onAddChild') addChildEvent = new EventEmitter<TrackerNode>();

  oldNode = false;
  userKey;
  orderedFieldsObjs: Array<SimpleTrackerField>;

  testArr; 
  testArrObj; 

  constructor(
    private stLocalService: SimpleTrackerLocalService,
    private stService: SimpleTrackerService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { }

  ngOnInit() {
    this.orderedFieldsObjs = new Array<SimpleTrackerField>();
    for(let i = 0; i < this.node.fieldOrder.length; i++) {
      this.orderedFieldsObjs.push(this.getFieldByKey(this.node.fieldOrder[i]));
    }
  }

  ngAfterViewInit() {
    this.authService.user.subscribe(user => {
      // this.optionsService.getTrackerOptions(this.trackerName, user.authID).valueChanges().subscribe(x => {
      //   this.options = x[0].options;
      //   this.userKey = user.authID
      // });
    })
  }

  getFieldByKey(fieldKey: string) {
    for(let i = 0; i < this.node.fields.length; i++) {
      if(this.node.fields[i].key == fieldKey) {
        return this.node.fields[i];
      }
    }
  }

  showSettings(node: SimpleTrackerNode) {
    
  }

  addChild(node: SimpleTrackerNode) {
    // TODO: db add child
    this.stLocalService.addChild(node, this.stLocalService.createDefaultItem());
  }

  addField(node: SimpleTrackerNode) {
    let newField = this.stLocalService.createDefaultField();
    this.stLocalService.fieldAdd(node, newField); // add locally to node
    this.orderedFieldsObjs.push(newField); // add to order for display
    this.stService.fieldAdd(this.trackerName, this.node.key, newField); // add to db
  }

  copyNode(node: SimpleTrackerNode) {
    let nodes = this.stLocalService.nodeCopy(node);
    this.stService.nodeCopy(this.trackerName, nodes.oldNode, nodes.newNode);
  }

  deleteNode(node: SimpleTrackerNode) {
    this.stLocalService.nodeRemove(node);
    this.stService.nodeRemove(this.trackerName, node);
  }

  changeFieldOrder() {
    let orderedKeys = new Array<string>();
    this.orderedFieldsObjs.forEach(field => {
      orderedKeys.push(field.key);
    })
    this.stService.fieldOrderReplace(this.trackerName, this.node.key, orderedKeys);
  }

  onFieldRemove(field: SimpleTrackerField) {
    this.node.fields.splice(this.node.fields.indexOf(field), 1);
    this.node.fieldOrder.splice(this.node.fieldOrder.indexOf(field.key), 1);
    this.orderedFieldsObjs.splice(this.orderedFieldsObjs.indexOf(field), 1)
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) { // between containers
      transferArrayItem(event.previousContainer.data,event.container.data, 
        event.previousIndex, event.currentIndex)
    } 
    else { // same container
      moveItemInArray(this.orderedFieldsObjs, event.previousIndex, event.currentIndex); // this moves it locally
      this.changeFieldOrder(); // this moves it in db
    }
  }


  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
        bodyBackgroundColor: '#424242',
        buttonColor: '#fff'
    },
    dial: {
        dialBackgroundColor: '#555',
    },
    clockFace: {
        clockFaceBackgroundColor: '#555',
        clockHandColor: '#9fbd90',
        clockFaceTimeInactiveColor: '#fff'
    }
}

}
