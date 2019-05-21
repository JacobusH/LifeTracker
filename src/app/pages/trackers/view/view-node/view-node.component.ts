import { Component, OnInit, Input } from '@angular/core';
import { SimpleTrackerField, SimpleTrackerNode } from 'app/models/trackers.model';
import { SimpleTrackerLocalService } from 'app/services/simple-tracker-local.service';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';

@Component({
  selector: 'app-view-node',
  templateUrl: './view-node.component.html',
  styleUrls: ['./view-node.component.scss']
})
export class ViewNodeComponent implements OnInit {
  @Input() trackerName: string;
  @Input() curNodeList: Array<SimpleTrackerNode>;

  constructor(private stLocalService: SimpleTrackerLocalService
    , private stService: SimpleTrackerService) { 

  }

  ngOnInit() {
    this.stLocalService.curNodeList = this.curNodeList;
  }

}
