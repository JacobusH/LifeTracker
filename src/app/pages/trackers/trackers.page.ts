import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { CFService } from '../../services/CFService.service';

@Component({
  selector: 'trackers',
  templateUrl: './trackers.page.html',
  styleUrls: ['./trackers.page.scss'],
})
export class TrackersPage implements OnInit, AfterViewInit {
  currentPage;
  showCenterFab;

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    public route: ActivatedRoute
    , private cfService: CFService
  ) { }

  ngOnInit() {
    this.cfService.cfState$.subscribe(state => this.showCenterFab = state);
  }

  ngAfterViewInit() {
    // this.cfService.cfState$.subscribe(state => this.showCenterFab = state);
  }

}
