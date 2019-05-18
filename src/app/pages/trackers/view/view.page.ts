import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService, OptionsService, TrackersService } from 'app/services';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { SimpleTrackerField, SimpleTrackerNode } from 'app/models/trackers.model';
import { TrackerNode } from 'app/models';
import { listFade } from 'app/animations';
import { from } from 'rxjs';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { SimpleTrackerLocalService } from '@services/simple-tracker-local.service';

interface ModelQuestion {
  name: string,
  type: ModelTypeEnum
}

enum ModelTypeEnum {
  text,
  number,
  date
}

@Component({
  selector: 'view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  animations: [ listFade ]
})
export class ViewPage implements OnInit, OnChanges, AfterViewInit {
  currentTrackerName = "";
  currentTrackerKey = "";
  userKey;
  parentNodesView;
  parentNodes: Array<TrackerNode>;
  showOptions = false;
  listView = true;
  elems = [];
  counter = 1;
  frameworkTweetsObservable; 
  test$;
  options;

  modelForm: Array<ModelQuestion>;
  modelNode: TrackerNode;

  curNodeList: Array<SimpleTrackerNode>;
  
  constructor(
    private actRoute: ActivatedRoute,
    private simpleTrackerLocalService: SimpleTrackerLocalService,
    private trackerService: TrackersService,
    private simpleTrackerService: SimpleTrackerService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { 
    this.elems = ["test", "another test", "one more test"]
    // this.frameworkTweetsObservable = from(['Backbone', 'Angular'])
  }

  ngOnInit() {
    this.modelForm = new Array<ModelQuestion>({
      name: 'name', 
      type: ModelTypeEnum.text
    });

    this.listView = true;

    
  }

  ngAfterViewInit() {
    this.actRoute.params.subscribe(params => {
      this.authService.user.subscribe(user => {
        this.currentTrackerName = params['id'];
        this.userKey = user.authID

        this.optionsService.getTrackerOptions(this.currentTrackerName, user.authID).valueChanges().subscribe(x => {
          this.options = x[0].options;
          this.userKey = user.authID
        });

        // this.trackerService.getParentNodesByTrackerName(this.currentTrackerName, user.authID).valueChanges()
        //   .pipe(take(1)).subscribe(parentNodes => {
        //     // gets initial view of nodes, then do everything locally
        //     this.parentNodes = parentNodes
        //   });

        this.trackerService.getTrackerByName(this.currentTrackerName, user.authID).valueChanges().subscribe(trackers => {
          this.currentTrackerKey = trackers[0].key;
        })

        // SIMPLE
        this.simpleTrackerService.getTopLevelNodesByTrackerName(this.currentTrackerName).valueChanges().pipe(take(1)).subscribe(topLevelNodes => {
          this.curNodeList = topLevelNodes;
        })

      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTracker']) {
      // this.currentTracker = this.currentTracker
    }

  }

  // SIMPLE STUFF
  simpleAddNode() {
    let toAdd: SimpleTrackerNode = this.simpleTrackerLocalService.createDefaultItem();
    this.simpleTrackerLocalService.nodeAdd(this.curNodeList, toAdd);
    this.simpleTrackerService.nodeAdd(this.currentTrackerName, toAdd);
  }

  simpleCopyNode(node: SimpleTrackerNode) {

  }



}
