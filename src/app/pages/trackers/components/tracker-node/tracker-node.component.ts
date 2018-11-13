import { Component, OnInit, Input } from '@angular/core';
import { TrackersService } from '../../trackers.service';
import { AuthService } from '../../../../services/auth.service'
import { OptionsService } from '../../options/options.service';
import { trigger, state, animate, style, transition} from '@angular/animations';

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease', style({opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms ease', style({opacity: 0}))
      ])
    ])
  ]
})
export class TrackerNodeComponent implements OnInit {
  @Input('nodeKey') nodeKey: string;
  @Input('tracker') trackerName: string;
  node;
  options;

  constructor(
    private trackerService: TrackersService,
    private authService: AuthService,
    private optionsService: OptionsService
  ) { }

  ngOnInit() {
    this.trackerService.getNodeByKey(this.nodeKey, this.trackerName).valueChanges().subscribe(node => {
      this.node = node
    })

    this.authService.user.subscribe(user => {
      let test$ = this.optionsService.getTrackerOptions(this.trackerName, user.authID).valueChanges().subscribe(x => {
        this.options = x[0].options
      });
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
