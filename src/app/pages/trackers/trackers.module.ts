import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { NgZorroAntdModule, NZ_I18N, en_US, NzLayoutModule, NzCheckboxModule, NzPopoverModule } from 'ng-zorro-antd';
import { D3Module } from '../../modules/d3/d3.module'
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule, matFormFieldAnimations, MatOptionModule, MatSelectModule
  , MatTabsModule, MatButtonToggleModule, MatMenuModule, MatDividerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { } from '@angular/material';

import { IonicModule } from '@ionic/angular';
import { AgmCoreModule, AgmMarker, GoogleMapsAPIWrapper, MarkerManager } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { OptionsService, TrackersService } from 'app/services';

import { MapComponent } from './components/map/map.component';
import { TrackerTitleBarComponent } from './components/tracker-title-bar/tracker-title-bar.component';

import { TrackersPage } from './trackers.page';
import { HomePage } from './home/home.page';
import { NewPage } from './new/new.page';
import { ListPage } from './list/list.page';
import { ViewPage } from './view/view.page';

import { routing } from './trackers.routing';
import { TrackerPopoverComponent } from './components/tracker-common/tracker-popover/tracker-popover.component';
import { TrackerCommonComponent } from './components/tracker-common/tracker-common.component';
import { FormNewTrackerComponent } from './components/form-new-tracker/form-new-tracker.component';
import { ViewActivityComponent } from './components/view-activity/view-activity.component';
import { TrackerNodeComponent } from './components/tracker-node/tracker-node.component';
import { TrackerIconComponent } from './components/tracker-icon/tracker-icon.component';
import { TrackerNodeNewComponent } from './components/tracker-node-new/tracker-node-new.component';
import { OptionsComponent } from './options/options.component';
import { TrackerFieldComponent } from './components/tracker-field/tracker-field.component';
import { ModelNodeComponent } from './components/model-node/model-node.component';
import { ViewNodeComponent } from './view/view-node/view-node.component';
import { ViewListComponent } from './view/view-list/view-list.component';


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
    , D3Module
    , NgZorroAntdModule
    , NzPopoverModule
    , NzLayoutModule
    , NzCheckboxModule
    , CommonModule
    , DragDropModule
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
    , MatMenuModule
    , MatDividerModule
    , HttpClientModule
  ],
  declarations: [
    TrackerTitleBarComponent
    , MapComponent
    , TrackersPage
    , NewPage, HomePage, TrackerPopoverComponent, TrackerCommonComponent, FormNewTrackerComponent
    , ListPage, ViewPage, ViewActivityComponent, TrackerNodeComponent
    , TrackerIconComponent, TrackerNodeNewComponent, OptionsComponent, TrackerFieldComponent, ModelNodeComponent, ViewNodeComponent, ViewListComponent
  ],
  providers: [
    GoogleMapsAPIWrapper
    , MarkerManager
    , OptionsService
    , TrackersService
    ,  { provide: NZ_I18N, useValue: en_US }
  ]
})
export class TrackersPageModule {}
