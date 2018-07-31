import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module'

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { TrackersPage } from './trackers.page';
import { MapComponent } from './map/map.component';
import { BeerPage } from './beer/beer.page'
import { WeedPage } from './weed/weed.page'

import { routing } from './trackers.routing';


const routes: Routes = [
  {
    path: '',
    component: TrackersPage
  }
];

@NgModule({
  imports: [
    routing
    , SharedModule
    , CommonModule
    , FormsModule
    , ReactiveFormsModule
    , IonicModule
    , RouterModule.forChild(routes)
    ,  AgmCoreModule.forRoot({
        apiKey: 'AIzaSyDvq-x-CLBHIDaIQcVXz6BKtMFEdgsLt8o',
        libraries: ['places']
      })
    , AgmSnazzyInfoWindowModule
  ],
  declarations: [
    TrackersPage
    , MapComponent
    , BeerPage
    , WeedPage
  ],
  providers: [
    GoogleMapsAPIWrapper
    , MarkerManager
  ]
})
export class TrackersPageModule {}
