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

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
  // { path: 'music', loadChildren: './pages/trackers/music/music.module#MusicPageModule' },
  // { path: 'food', loadChildren: './pages/trackers/food/food.module#FoodPageModule' },
  // { path: 'drugs', loadChildren: './pages/trackers/drugs/drugs.module#DrugsPageModule' },
  // { path: 'workout', loadChildren: './pages/trackers/workout/workout.module#WorkoutPageModule' },