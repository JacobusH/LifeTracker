import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-picker',
  templateUrl: './view-picker.component.html',
  styleUrls: ['./view-picker.component.scss']
})
export class ViewPickerComponent implements OnInit {
	@Input() curView: string = "list"; // list, node, calendar
	@Output() onChangeView = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
	}
	
	changeView(to: string) {
		this.onChangeView.emit(to);
	}

}
