import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module'
import { NbSidebarModule, NbLayoutModule, NbSidebarService, NbButtonModule } from '@nebular/theme';
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule, matFormFieldAnimations, MatOptionModule, MatSelectModule
  , MatTabsModule, MatButtonToggleModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { } from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { TrackersService } from './trackers.service'; // not injected
import { TrackersNewService } from './trackers-new.service'; // not injected

import { MapComponent } from './components/map/map.component';
import { TrackerTitleBarComponent } from './components/tracker-title-bar/tracker-title-bar.component';

import { TrackersPage } from './trackers.page';
import { BeerPage } from './beer/beer.page';
import { WeedPage } from './weed/weed.page';
import { NewPage } from './new/new.page';
import { ListPage } from './list/list.page';

import { routing } from './trackers.routing';
import { TrackerPopoverComponent } from './components/tracker-common/tracker-popover/tracker-popover.component';
import { TrackerCommonComponent } from './components/tracker-common/tracker-common.component';
import { FormNewTrackerComponent } from './components/form-new-tracker/form-new-tracker.component';


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
    , MatButtonToggleModule
    , NbLayoutModule
    , NbButtonModule
    , NbSidebarModule
    , HttpClientModule
  ],
  declarations: [
    TrackerTitleBarComponent
    , MapComponent
    , TrackersPage
    , BeerPage
    , NewPage, WeedPage, TrackerPopoverComponent, TrackerCommonComponent, FormNewTrackerComponent, ListPage
  ],
  providers: [
    GoogleMapsAPIWrapper
    , MarkerManager
    , NbSidebarService
    , TrackersNewService
    // , TrackersService
  ]
})
export class TrackersPageModule {}
