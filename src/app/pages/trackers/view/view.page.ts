import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackersService } from '../trackers.service';
import { AuthService } from '../../../services/auth.service';
import { TrackerNode } from '../trackers.model';
import { from } from 'rxjs';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { listFade } from '../../../animations/listFade.animation';
import { OptionsService } from '../options/options.service';

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
  elems = [];
  counter = 1;
  frameworkTweetsObservable;
  test$;
  options;
  
  constructor(
    private actRoute: ActivatedRoute,
    private trackerService: TrackersService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { 
    this.elems = ["test", "another test", "one more test"]
    this.frameworkTweetsObservable = from(['Backbone', 'Angular'])
  }

  ngOnInit() {
    

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

        this.trackerService.getParentNodesByTrackerName(this.currentTrackerName, user.authID).valueChanges()
          .pipe(take(1)).subscribe(parentNodes => {
            // gets initial view of nodes, then do everything locally
            this.parentNodes = parentNodes
          });

        this.trackerService.getTrackerByName(this.currentTrackerName, user.authID).valueChanges().subscribe(trackers => {
          this.currentTrackerKey = trackers[0].key;
        })

      })
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTracker']) {
      // this.currentTracker = this.currentTracker
    }

  }

  addNode() {
    // NOTE: not sure we do it fully local since we need to add fields via db
    // let newNode = this.trackerService.createEmptyNode();
    // this.parentNodes.push(newNode);
    // this.trackerService.addNode(this.currentTrackerName, this.userKey, newNode);

    this.trackerService.createNode(this.currentTrackerName, this.userKey).then(nodeRef => {
      // get our new node that was created 
      let nodeKey = nodeRef.id;
      let newNode = this.trackerService.getNodeByKey(nodeKey, this.currentTrackerName, this.userKey).valueChanges()
        .pipe(take(1)).subscribe(newNode => {
          this.parentNodes.push(newNode)
        });
    });
  }

  copyNode(node: TrackerNode) {
    // this.parentNodes.push(node);
    // this.trackerService.copyTrackerNodeLocal(node);

    // let newNode = JSON.parse(JSON.stringify(node))
    // console.log('old', node);
    // newNode.key = 'asdf';
    // console.log('new', newNode)
    // console.log('old', node);

    // this.parentNodes.push(newNode);
    // this.trackerService.addNode(this.currentTrackerName, this.userKey, newNode);

    this.trackerService.copyTrackerNode(this.currentTrackerName, node, this.userKey).then(nodeRef => {
      let newNode = this.trackerService.createEmptyNode();
      newNode.key = nodeRef.id;
      this.parentNodes.push(newNode);
    });
  }

  addChild(node: TrackerNode) {
    this.trackerService.getNodeByKey(node.key, this.currentTrackerName, this.userKey).valueChanges().pipe(take(1)).subscribe(node => {
      this.parentNodes[this.parentNodes.indexOf(node)] =  node
    })
  }

  delNode(node: TrackerNode) {
    this.parentNodes.splice(this.elems.indexOf(node), 1);
    this.trackerService.deleteNode(node.key, this.currentTrackerName, this.userKey);
  }


}
