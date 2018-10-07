import { Component, OnInit, Input } from '@angular/core';
import { TrackersService } from '../../trackers.service';

@Component({
  selector: 'app-tracker-node',
  templateUrl: './tracker-node.component.html',
  styleUrls: ['./tracker-node.component.scss']
})
export class TrackerNodeComponent implements OnInit {
  @Input('nodeId') nodeId: string;

  constructor(
    private trackerService: TrackersService
  ) { }

  ngOnInit() {
  }

}
