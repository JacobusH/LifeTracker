import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  filtertedItems: Array<SimpleTrackerNode>;
  filterTermPH: string = "";
  filterPH: string = "Filter";
  lastFilterTerm: string = "";

  modelForm: Array<ModelQuestion>;
  modelNode: TrackerNode;

  curNodeList: Array<SimpleTrackerNode>;
  curLabelList: Array<string>;
  labelsToFilter: Array<string> = new Array<string>();
  
  constructor(
		private actRoute: ActivatedRoute,
		private router: Router,
    private simpleTrackerLocalService: SimpleTrackerLocalService,
    private trackerService: TrackersService,
    private simpleTrackerService: SimpleTrackerService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { 
    
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
        this.trackerService.getTrackerByName(this.currentTrackerName, user.authID).valueChanges().subscribe(trackers => {
          this.currentTrackerKey = trackers[0].key;
        })

        // SIMPLE
        this.simpleTrackerService.getTopLevelNodesByTrackerName(this.currentTrackerName).valueChanges().pipe(take(1)).subscribe(topLevelNodes => {
          this.curNodeList = topLevelNodes;
          this.filtertedItems = this.curNodeList;
        })
        this.simpleTrackerService.labelListGet(this.currentTrackerName).valueChanges().pipe(take(1)).subscribe(labelList => {
          // this.curLabelList = labelList.labels;
        })

      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTracker']) {
      // this.currentTracker = this.currentTracker
    }
	}
	
	// View change
	changeView(to: string) {
		if(to === 'list') {
			this.listView = true;
		}
		else if(to === 'node') {
			this.listView = false;
		}
		else { // string
			console.log("to", to);
			this.router.navigate([to], {relativeTo: this.actRoute});
		}
	}
  
  // FILTERING
  filterItems(filterTerm: string) {
    this.lastFilterTerm = filterTerm;
    this.filtertedItems = this.curNodeList.filter(item => {
        let node = item as SimpleTrackerNode;
        let foundMatch = false;
        node.fields.forEach(field => {
          if(
            (this.labelsToFilter.length == 0 || this.labelsToFilter.indexOf(field.label.toLowerCase()) !== -1) // empty list or label in list
            && field.value.toLowerCase().indexOf(filterTerm.toLowerCase()) !== -1 ) // value matches
          {
            foundMatch = true;
          }
        })
        return foundMatch
      }
    );
  }

  onChangeFilterLabels(event: any, labelToChange: string) {
    event.stopPropagation();
    if(this.labelsToFilter.indexOf(labelToChange) == -1) { // not in list
      this.labelsToFilter.push(labelToChange.toLowerCase())
    }
    else {
      this.labelsToFilter.splice(this.labelsToFilter.indexOf(labelToChange, 1));
    }
    // do a refilter too
    if(this.lastFilterTerm != "") {
      this.filterItems(this.lastFilterTerm);
    }
  }

  // SIMPLE STUFF
  simpleAddNode() {
    let toAdd: SimpleTrackerNode = this.simpleTrackerLocalService.createDefaultItem();
    // this.simpleTrackerLocalService.nodeAdd(this.curNodeList, toAdd);
    // this.simpleTrackerService.nodeAdd(this.currentTrackerName, toAdd);
  }


}
