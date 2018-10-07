import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/authGuard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'home', data: { state: 'trackers'}, loadChildren: './pages/trackers/trackers.module#TrackersPageModule' },
  { path: 'trackers', data: { state: 'trackers'}, loadChildren: './pages/trackers/trackers.module#TrackersPageModule' },
  { path: 'login', data: { state: 'login'}, loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', data: { state: 'profile'}, loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }