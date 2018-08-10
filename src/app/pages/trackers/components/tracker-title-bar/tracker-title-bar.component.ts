import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tracker-title-bar',
  templateUrl: './tracker-title-bar.component.html',
  styleUrls: ['./tracker-title-bar.component.scss']
})
export class TrackerTitleBarComponent implements OnInit {
  @Input('title') title: string; 


  constructor() { }

  ngOnInit() {
  }

}
