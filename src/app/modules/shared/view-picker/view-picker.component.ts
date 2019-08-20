import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-picker',
  templateUrl: './view-picker.component.html',
  styleUrls: ['./view-picker.component.scss']
})
export class ViewPickerComponent implements OnInit {
	@Input() curView: string = "list"; // list, node, calendar
	@Output() onChangeView = new EventEmitter<string>();
	currentTrackerName; 

	constructor(
		private router: Router
		, private actRoute: ActivatedRoute
		) { }

  ngOnInit() {
		this.actRoute.params.subscribe(params => {
			this.currentTrackerName = params['id'];
			console.log('view, trackername', this.currentTrackerName);
		})
	}
	
	changeView(to: string) {
		
		// TODO: change so list and node view are separate modules as well
		if(to === 'list') {
			this.onChangeView.emit(to);
		}
		else if(to === 'node') {
			this.onChangeView.emit(to);
		}
		else { // string
			let fullTo = "/trackers/view/"+this.currentTrackerName +"/"+to;
			console.log("to", fullTo);
			this.router.navigate([fullTo]).then( x => console.log(x)).catch(err => console.log(err))
		}
	
	}

}
