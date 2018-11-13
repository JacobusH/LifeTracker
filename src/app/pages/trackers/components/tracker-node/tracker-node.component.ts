import { Component, OnInit, Input } from '@angular/core';
import { TrackersService } from '../../trackers.service';
import { AuthService } from '../../../../services/auth.service'

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.scss']
})
export class TrackerNodeComponent implements OnInit {
  @Input('nodeKey') nodeKey: string;
  @Input('tracker') trackerName: string;
  node;

  constructor(
    private trackerService: TrackersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.trackerService.getNodeByKey(this.nodeKey, this.trackerName).valueChanges().subscribe(node => {
      this.node = node
    })
  }

  addChild(nodeKey: string) {
    this.authService.user.subscribe(user => {
      this.trackerService.createNode(this.trackerName, user.authID, nodeKey)
    })
  }

  delete(nodeKey: string) {
    this.authService.user.subscribe(user => {
      this.trackerService.deleteNode(nodeKey, this.trackerName, user.authID)
    })
  }

}
