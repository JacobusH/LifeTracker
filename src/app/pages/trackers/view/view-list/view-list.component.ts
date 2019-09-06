import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { SimpleTrackerField, SimpleTrackerNode, TrackerFieldTypeEnum } from 'app/models/trackers.model';
import { SimpleTrackerLocalService } from 'app/services/simple-tracker-local.service';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { map, withLatestFrom, take } from 'rxjs/operators';

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements OnInit {
	@ViewChild('agGrid') agGrid: AgGridAngular;
	@Input() trackerName: string;
	@Input() curNodeList: Array<SimpleTrackerNode>;
	gridApi;
	gridColumnApi;
	pipe = new DatePipe('en-US'); // Use your own locale
	
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
			let has_selection = false;
			if(node.fields) {
				// set special columns
				this.columnDefs.push({"headerName": "", "field": "", width: 33, checkboxSelection: true, headerCheckboxSelection: true}); // checkbox 
				this.columnDefs.push({"headerName": "nodeKey", "field": "nodeKey", width: 33, hide: true}); // key
				this.columnDefs.push({"headerName": "fieldKey", "field": "fieldKey", width: 33, hide: true}); // key
				// put key in a hidden field
				singleRow.push({"nodeKey": node.key});
				// populate column defs and data 
				node.fields.forEach(field => {
					// columns
					this.setGridColumns(field);
					// row data
					singleRow.push(this.setGridData(field));
				});
				this.rowData.push(Object.assign.apply(Object, singleRow));
			}
		});
	}

	onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
	}

	setGridColumns(field) {
		this.columnDefs.push({"headerName": field.label, "field": field.label.toLowerCase() // required 
		, editable: true}); // optional
	}

	setGridData(field) {
		// manage dates
		if(field.type == TrackerFieldTypeEnum.date) { // Single date
			let date = field.value;
			let dateF = this.pipe.transform(date, 'shortDate');
			field.value = dateF;
		}
		if(field.type == TrackerFieldTypeEnum.daterange) { // Range date
			let dateStart = field.value.split('|')[0];
			let dateEnd = field.value.split('|')[0];
			let dateStartF = this.pipe.transform(dateStart, 'shortDate');
			let dateEndF = this.pipe.transform(dateEnd, 'shortDate');
			field.value = dateStartF + " - " + dateEndF;
		}
		let obj = {};
		obj[field.label.toLowerCase()] = field.value;
		obj["fieldKey"] = field.key;
		return obj;
	}
	
	deleteSelection() {
		const selectedNodes = this.agGrid.api.getSelectedNodes();
		const selectedData = selectedNodes.map( node => node.data );
		selectedData.forEach(node => {
			this.stLocalService.nodeRemoveByKey(node);
		})
	}

	addItem() {
		let newRowItem = this.createNewRowData();
		// let newNode = this.stLocalService.createDefaultItem();
		// this.stLocalService.nodeAdd()

		let res = this.gridApi.updateRowData({ add: [newRowItem] }); // update the actual row
		this.printResult(res);
	}

	updateItem() {
    var itemsToUpdate = [];
    this.gridApi.forEachNodeAfterFilterAndSort(function(rowNode, index) {
      if (index >= 5) {
        return;
      }
      var data = rowNode.data;
      data.price = Math.floor(Math.random() * 20000 + 20000);
      itemsToUpdate.push(data);
    });
    var res = this.gridApi.updateRowData({ update: itemsToUpdate });
    this.printResult(res);
	}
	
	onCellValueChanged(ev) {
		this.curNodeList.forEach(node => {
			if(node.key == ev.data.nodeKey) {
				node.fields.forEach(field => {
					if(field.key == ev.data.fieldKey) {
						field.value = ev.value;
						this.stService.fieldUpdate(this.trackerName, ev.data.nodeKey, field);
					}
				})
			}
		})
		console.log('evvy', ev);
	}

	createNewRowData() {
		let newRow = {};
		if(this.curNodeList) {
			this.curNodeList[0].fields.forEach(field => {
				newRow[field.label] = "New " + field.label;
			})
		}
		return newRow;
	}

	printResult(res) {
		console.log("---------------------------------------");
		if (res.add) {
			res.add.forEach(function(rowNode) {
				console.log("Added Row Node", rowNode);
			});
		}
		if (res.remove) {
			res.remove.forEach(function(rowNode) {
				console.log("Removed Row Node", rowNode);
			});
		}
		if (res.update) {
			res.update.forEach(function(rowNode) {
				console.log("Updated Row Node", rowNode);
			});
		}
	}

}
