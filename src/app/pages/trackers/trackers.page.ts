import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trackers',
  templateUrl: './trackers.page.html',
  styleUrls: ['./trackers.page.scss'],
})
export class TrackersPage implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor() { }

  ngOnInit() {
    
  }

}
