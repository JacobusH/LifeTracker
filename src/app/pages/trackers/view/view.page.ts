import { Component, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackersService } from '../trackers.service';
import { AuthService } from '../../../services/auth.service';
import { TrackerNode } from '../trackers.model';
import { from } from 'rxjs';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { listFade } from '../../../animations/listFade.animation';

@Component({
  selector: 'view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
  animations: [ listFade ]
})
export class ViewPage implements OnInit, OnChanges, AfterViewInit {
  currentTrackerName = "";
  userKey;
  parentNodesView;
  parentNodes;
  parentNodes$;
  showOptions;
  elems = [];
  counter = 1;
  frameworkTweetsObservable;
  
  constructor(
    private actRoute: ActivatedRoute,
    private trackerService: TrackersService,
    private authService: AuthService
  ) { 
    this.elems = ["test", "another test", "one more test"]
    this.frameworkTweetsObservable = from(['Backbone', 'Angular'])
  }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.authService.user.subscribe(user => {
        this.currentTrackerName = params['id'];
        this.userKey = user.authID

        this.parentNodes$ = this.trackerService.getParentNodesByTrackerName(this.currentTrackerName, user.authID).valueChanges()
          .pipe(take(1)).subscribe(parentNodes => {
            // gets initial view of nodes, then do everything locally
            this.parentNodes = parentNodes
          });
      })
    });

  }

  ngAfterViewInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTracker']) {
      // this.currentTracker = this.currentTracker
    }

  }

  addElem() {
    this.elems.push("ahhh")
  }

  delElem(elem) {
    this.elems.slice(this.elems.indexOf(elem), 1)
  }

  addNode() {
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
    this.trackerService.copyTrackerNode(this.currentTrackerName, node, this.userKey).then(nodeRef => {
      let newNode = this.trackerService.createEmptyNode();
      newNode.key = nodeRef.id;
      console.log('refy', newNode)
      this.parentNodes.push(newNode);
    });
  }

  delNode(node: TrackerNode) {
    this.parentNodes.splice(this.elems.indexOf(node), 1);
    this.trackerService.deleteNode(node.key, this.currentTrackerName, this.userKey);
  }


}
