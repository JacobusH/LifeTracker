import { Component, OnInit, Input } from '@angular/core';
import { SimpleTrackerField, SimpleTrackerNode } from 'app/models/trackers.model';
import { SimpleTrackerLocalService } from 'app/services/simple-tracker-local.service';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { GridsterConfig, GridsterItem } from 'angular-gridster2';
import { LayoutService, IComponent } from 'app/services/index';

@Component({
  selector: 'app-view-node',
  templateUrl: './view-node.component.html',
  styleUrls: ['./view-node.component.scss']
})
export class ViewNodeComponent implements OnInit {
  @Input() trackerName: string;
	@Input() curNodeList: Array<SimpleTrackerNode>;

	get options(): GridsterConfig {
    return this.layoutService.options;
  }

  get layout(): GridsterItem[] {
    return this.layoutService.layout;
  }

  get components(): IComponent[] {
    return this.layoutService.components;
  }
	
  constructor(
		private stLocalService: SimpleTrackerLocalService
		, private layoutService: LayoutService
    , private stService: SimpleTrackerService) { 

  }

  ngOnInit() {
    this.stLocalService.curNodeList = this.curNodeList;
  }

}
