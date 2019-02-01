import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { TrackersService } from '../../trackers.service';
import { AuthService } from '../../../../services/auth.service'
import { OptionsService } from '../../options/options.service';
import { TrackerFieldService } from '../tracker-field/tracker-field.service';
import { TrackerNode, TrackerField } from '../../trackers.model';
import { slideInFadeOut } from '../../../../animations/slideInFadeOut.animation';
import { take } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerNodeComponent implements OnInit, AfterViewInit {
  @Input('nodeKey') nodeKey: string;
  @Input('tracker') trackerName: string;
  @Input('options') options: string;
  @Output('onDelete') deleteEvent = new EventEmitter<TrackerNode>();
  @Output('onCopy') copyEvent = new EventEmitter<TrackerNode>();
  @Output('onAddChild') addChildEvent = new EventEmitter<TrackerNode>();

  node: TrackerNode;
  userKey;
  orderedFieldsKeys: Array<string>;
  orderedFieldsObjs: Array<any>;

  constructor(
    private trackerService: TrackersService,
    private fieldService: TrackerFieldService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { }

  ngOnInit() {
    this.orderedFieldsObjs = new Array<any>();
  }

  ngAfterViewInit() {
    this.authService.user.subscribe(user => {
      // this.optionsService.getTrackerOptions(this.trackerName, user.authID).valueChanges().subscribe(x => {
      //   this.options = x[0].options;
      //   this.userKey = user.authID
      // });

      // this.nodeKey = this.nodeKey;
      this.userKey = user.authID;
      this.trackerService.getNodeByKey(this.nodeKey, this.trackerName, user.authID).valueChanges().pipe(take(1)).subscribe(node => {
        this.node = node;
        this.getFieldOrders(user.authID)
      })
    })
  }

  getFieldOrders(userKey: string) {
    this.fieldService.getFieldOrder(this.trackerName, this.node.key, userKey).valueChanges().pipe(take(1)).subscribe(fieldOrderArr => {
      this.displayFields(fieldOrderArr, userKey)
    })
  }

  displayFields(orderArr: any, userKey: string) {
    console.log('fieldord', orderArr.order)
    this.orderedFieldsKeys = orderArr.order
    let bleh = orderArr.order as Array<string>
    this.orderedFieldsObjs = new Array<any>();
    bleh.forEach(fieldKey => {
      let tmp$ = this.fieldService.getField(this.trackerName, fieldKey, this.nodeKey, userKey).valueChanges().subscribe(x => {
        this.orderedFieldsObjs.push(x)
        tmp$.unsubscribe()
      })
    })
  }

  addChild(node: TrackerNode) {
    this.trackerService.createNode(this.trackerName, this.userKey, node.key).then(nodeRef => {
      this.addChildEvent.emit(node);
    });
  }

  addField(nodeKey: string) {
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, nodeKey).then(fieldRef => {
      let newField = this.fieldService.createEmptyField()
      newField.key = fieldRef.id; 
      this.fieldService.addFieldToOrder(this.trackerName, this.nodeKey, this.userKey, newField.key).then(x => {
        this.getFieldOrders(this.userKey) // re-render the fields
      })
    });
  }

  copyNode(node) {
    this.copyEvent.emit(node);
  }

  delete(node: TrackerNode) {
    this.deleteEvent.emit(node);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(event.previousContainer.data,event.container.data, 
        event.previousIndex, event.currentIndex)
    } else {
      moveItemInArray(this.orderedFieldsObjs, event.previousIndex, event.currentIndex); // move for view
      moveItemInArray(this.orderedFieldsKeys, event.previousIndex, event.currentIndex); // move for db
      this.fieldService.changeFieldOrder(this.trackerName, this.nodeKey, this.userKey, this.orderedFieldsKeys)
    }
  }

}
