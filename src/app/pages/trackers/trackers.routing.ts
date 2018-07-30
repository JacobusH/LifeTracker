// import { AuthenticationComponent } from './authentication.component';
import { TrackersPage } from './trackers.page';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BeerPage } from './beer/beer.page';
import { WeedPage } from './weed/weed.page';


export const routes: Routes = [
  { path: '', component: TrackersPage, data: { state: 'tracker' },
  children: [
    { path: '', redirectTo: 'trackers', pathMatch: 'full' },
    { path: 'beer', component: BeerPage, data: { state: 'tracker-beer' }},
    { path: 'weed', component: WeedPage, data: { state: 'tracker-beer' }},
    // { path: 'food', component: TrackerFoodComponent, data: { state: 'tracker-food' }},
    // { path: 'music', component: TrackerMusicComponent, data: { state: 'tracker-music' }},
    // { path: 'workout', component: TrackerWorkoutComponent, data: { state: 'tracker-workout' }},
  ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);