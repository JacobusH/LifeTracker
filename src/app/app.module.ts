import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';
import { SharedModule } from './modules/shared/shared.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule
  , MatTabsModule, MatMenuModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx'; 
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from 'app/guards';
import { AuthService, UserService, CFService } from 'app/services';

import { environment } from '../environments/environment';

import en from '@angular/common/locales/en';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent ],
  entryComponents: [],
  imports: [
    SharedModule
    , AngularFireModule
    , AngularFirestoreModule
    , AngularFireStorageModule
    , AngularFireAuthModule
    , AngularFireModule.initializeApp(environment.firebase)
    , IonicModule.forRoot()
    , AppRoutingModule
    , BrowserModule
    , BrowserAnimationsModule
    , CommonModule
    , DragDropModule
    , FormsModule
    , ReactiveFormsModule
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatOptionModule
    , MatSelectModule
    , MatTabsModule
    , MatMenuModule
    , HttpClientModule, NgZorroAntdModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    , CFService
    , StatusBar
    , SplashScreen
    , AuthService
    , AuthGuard
    , UserService, { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer){
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg')); // Or whatever path you placed mdi.svg at
  }
}
