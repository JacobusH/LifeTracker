import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Route, ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { CFService } from '../../services/CFService.service';

@Component({
  selector: 'trackers',
  templateUrl: './trackers.page.html',
  styleUrls: ['./trackers.page.scss'],
})
export class TrackersPage implements OnInit, AfterViewInit {
  currentPage;
  showCenterFab;
  subtitle;

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(
    public route: ActivatedRoute
    , private router: Router
    , private cfService: CFService
  ) { }

  ngOnInit() {
    this.cfService.cfState$.subscribe(state => this.showCenterFab = state);

    // make initial subtitle and subscribe to changes from the child routes
    this.makeSubtitle(this.router.url);
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.makeSubtitle(event.url)
      }      
    });

    
  }

  ngAfterViewInit() {
    // this.cfService.cfState$.subscribe(state => this.showCenterFab = state);
  }

  makeSubtitle(currentUrl) {
    this.subtitle = currentUrl.slice(currentUrl.lastIndexOf('/') + 1, currentUrl.length);
    this.subtitle = this.subtitle.charAt(0).toLocaleUpperCase() + this.subtitle.slice(1);
  }

}
