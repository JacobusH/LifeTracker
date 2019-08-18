import { Component, OnInit, Input } from '@angular/core';
import { SimpleTrackerField, SimpleTrackerNode } from 'app/models/trackers.model';
import { SimpleTrackerLocalService } from 'app/services/simple-tracker-local.service';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { map, withLatestFrom, take } from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
	@Input() trackerName: string;
	@Input() curNodeList: Array<SimpleTrackerNode>;
	gridApi;
  gridColumnApi;
	
	columnDefs = [];

rowData = [];

  constructor(
		private stLocalService: SimpleTrackerLocalService
		, private stService: SimpleTrackerService
		, private simpleTrackerService: SimpleTrackerService) { 

		}

  ngOnInit() {
		this.columnDefs = [];
		this.stLocalService.curNodeList = this.curNodeList;
		this.stLocalService.curNodeList.forEach(node => {
			let singleRow = [];
			this.columnDefs = [];
			node.fields.forEach(field => {
				// columns
				this.columnDefs.push({"headerName": field.label, "field": field.label.toLowerCase()});
				//row data
				let obj = {};
				obj[field.label.toLowerCase()] = field.value;
				singleRow.push(obj);
			});
			this.rowData.push(Object.assign.apply(Object, singleRow));
		});
	}

	onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }

}
