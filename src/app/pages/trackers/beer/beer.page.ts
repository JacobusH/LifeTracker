import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TrackerBeer, trackerBeerDyn } from './beer.model';
import { CFService } from '../../../services/CFService.service';

@Component({
  selector: 'beer',
  templateUrl: './beer.page.html',
  styleUrls: ['./beer.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BeerPage implements OnInit {
  trackerBeerDyn;
  currentLat;
  currentLong;
  

  constructor(
    public cfService: CFService
  ) { 
    this.trackerBeerDyn = trackerBeerDyn;
  }

  ngOnInit() {
    this.cfService.setStateFalse();
  }

  onSave(event) {
    
  }

}
