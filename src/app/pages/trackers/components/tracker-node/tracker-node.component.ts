import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import { TrackersService } from '../../trackers.service';
import { AuthService } from '../../../../services/auth.service'
import { OptionsService } from '../../options/options.service';
import { TrackerFieldService } from '../tracker-field/tracker-field.service';
import { TrackerNode } from '../../trackers.model';
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
  nodeFields;

  constructor(
    private trackerService: TrackersService,
    private fieldService: TrackerFieldService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.authService.user.subscribe(user => {
      // this.optionsService.getTrackerOptions(this.trackerName, user.authID).valueChanges().subscribe(x => {
      //   this.options = x[0].options;
      //   this.userKey = user.authID
      // });

      // this.nodeKey = this.nodeKey;
      console.log('node init', this.nodeKey)
      this.trackerService.getNodeByKey(this.nodeKey, this.trackerName, user.authID).valueChanges().pipe(take(1)).subscribe(node => {
        this.node = node;
        this.fieldService.getFields(this.trackerName, this.node.key, user.authID).valueChanges().pipe(take(1)).subscribe(fields => {
          this.nodeFields = fields;
          console.log('field init', this.nodeFields)
        });
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
      this.nodeFields.push(newField)
    });
  }

  copyNode(node) {
    this.copyEvent.emit(node);
  }

  delete(node: TrackerNode) {
    this.deleteEvent.emit(node);
  }

}
