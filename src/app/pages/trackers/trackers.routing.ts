// import { AuthenticationComponent } from './authentication.component';
import { TrackersPage } from './trackers.page';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BeerPage } from './beer/beer.page';
import { ListPage } from './list/list.page';
import { NewPage } from './new/new.page';
import { WeedPage } from './weed/weed.page';


export const routes: Routes = [
  { path: '', component: TrackersPage, data: { state: 'tracker' },
  children: [
    { path: '', redirectTo: 'trackers', pathMatch: 'full' },
    { path: 'beer', component: BeerPage, data: { state: 'tracker-beer' }},
    { path: 'list', component: ListPage, data: { state: 'tracker-list' }},
    { path: 'new', component: NewPage, data: { state: 'tracker-new' }},
    { path: 'weed', component: WeedPage, data: { state: 'tracker-weed' }},
  ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);