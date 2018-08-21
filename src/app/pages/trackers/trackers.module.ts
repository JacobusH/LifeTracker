import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module'
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule, matFormFieldAnimations, MatOptionModule, MatSelectModule
  , MatTabsModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { } from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { TrackersService } from './trackers.service';
import { DrugsService } from './drugs/drugs.service';
import { WeedService } from './weed/weed.service';

import { MapComponent } from './components/map/map.component';
import { TrackerTitleBarComponent } from './components/tracker-title-bar/tracker-title-bar.component';

import { TrackersPage } from './trackers.page';
import { BeerPage } from './beer/beer.page';
import { DrugsPage } from './drugs/drugs.page';
import { FoodPage } from './food/food.page';
import { MusicPage } from './music/music.page';
import { WeedPage } from './weed/weed.page';
import { WorkoutPage } from './workout/workout.page';

import { routing } from './trackers.routing';
import { TrackerPopoverComponent } from './components/tracker-popover/tracker-popover.component';


const routes: Routes = [
  {
    path: '',
    component: TrackersPage
  }
];

@NgModule({
  entryComponents: [
    TrackerPopoverComponent
  ],
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
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatOptionModule
    , MatSelectModule
    , MatTabsModule
    , HttpClientModule
  ],
  declarations: [
    TrackerTitleBarComponent
    , MapComponent
    , TrackersPage
    , BeerPage
    , DrugsPage
    , FoodPage
    , MusicPage
    , WorkoutPage
    , WeedPage, TrackerPopoverComponent
  ],
  providers: [
    GoogleMapsAPIWrapper
    , DrugsService
    , MarkerManager
    // , TrackersService
    , WeedService
  ]
})
export class TrackersPageModule {}
