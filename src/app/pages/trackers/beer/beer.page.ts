import { Component, OnInit } from '@angular/core';
import { TrackerBeer, trackerBeerDyn } from './tracker-beer.model';

@Component({
  selector: 'beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
})
export class BeerPage implements OnInit {
  trackerBeerDyn;
  currentLat;
  currentLong;
  

  constructor() { 
    this.trackerBeerDyn = trackerBeerDyn;
  }

  ngOnInit() {
    
  }

  onSave(event) {
    
  }

}
