// import { AuthenticationComponent } from './authentication.component';
import { TrackersPage } from './trackers.page';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { HomePage } from './home/home.page';
import { ListPage } from './list/list.page';
import { NewPage } from './new/new.page';
import { ViewPage } from './view/view.page';


export const routes: Routes = [
  { path: '', component: TrackersPage, data: { state: 'tracker' },
  children: [
    { path: '', redirectTo: 'trackers', pathMatch: 'full' },
    { path: 'home', component: HomePage, data: { state: 'tracker-home' }},
    { path: 'list', component: ListPage, data: { state: 'tracker-list' }},
    { path: 'new', component: NewPage, data: { state: 'tracker-new' }},
    { path: 'view', component: ListPage, data: { state: 'tracker-list' }},
    { path: 'view/:id', component: ViewPage, data: { state: 'tracker-view' }},
    { path: 'view/:id/calendar', data: { state: 'calendar'}, loadChildren: './modules/calendar/calendar.module#TrackerCalendarModule' },
  ]},
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);