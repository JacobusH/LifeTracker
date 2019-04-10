import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/guards';

const routes: Routes = [
  { path: '', redirectTo: 'trackers', pathMatch: 'full' },
  { path: 'trackers', data: { state: 'trackers'}, loadChildren: './pages/trackers/trackers.module#TrackersPageModule' },
  { path: 'login', data: { state: 'login'}, loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'profile', data: { state: 'profile'}, loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/trackers' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }