// import { AuthenticationComponent } from './authentication.component';
import { TrackersPage } from './trackers.page';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BeerPage } from './beer/beer.page';
import { WeedPage } from './weed/weed.page';
import { FoodPage } from './food/food.page';
import { MusicPage } from './music/music.page';
import { DrugsPage } from './drugs/drugs.page';
import { WorkoutPage } from './workout/workout.page';


export const routes: Routes = [
  { path: '', component: TrackersPage, data: { state: 'tracker' },
  children: [
    { path: '', redirectTo: 'trackers', pathMatch: 'full' },
    { path: 'beer', component: BeerPage, data: { state: 'tracker-beer' }},
    { path: 'drugs', component: DrugsPage, data: { state: 'tracker-drugs' }},
    { path: 'food', component: FoodPage, data: { state: 'tracker-food' }},
    { path: 'music', component: MusicPage, data: { state: 'tracker-music' }},
    { path: 'weed', component: WeedPage, data: { state: 'tracker-weed' }},
    { path: 'workout', component: WorkoutPage, data: { state: 'tracker-workout' }},
  ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);