import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../modules/shared/shared.module';
import { NgZorroAntdModule, NZ_I18N, en_US, NzLayoutModule, NzCheckboxModule, NzPopoverModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';

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
import { FormNewTrackerComponent } from './components/form-new-tracker/form-new-tracker.component';
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
    
  ],
  imports: [
    routing
    , SharedModule
    , NgZorroAntdModule
    // , NzPopoverModule
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
    , HttpClientModule
  ],
  declarations: [
    TrackerTitleBarComponent
    , MapComponent
    , TrackersPage
    , NewPage
    , HomePage
    , FormNewTrackerComponent
    , ListPage
    , ViewPage
    , TrackerNodeComponent
    , TrackerIconComponent
    , TrackerNodeNewComponent
    , OptionsComponent
    , TrackerFieldComponent
    , ModelNodeComponent,
     ViewNodeComponent
    , ViewListComponent
  ],
  providers: [
    GoogleMapsAPIWrapper
    , MarkerManager
    , OptionsService
    , TrackersService
    , { provide: NZ_I18N, useValue: en_US }
  ]
})
export class TrackersPageModule {}
