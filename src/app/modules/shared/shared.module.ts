import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule
  , matFormFieldAnimations, MatOptionModule, MatSelectModule, MatButtonToggleModule, MatMenuModule } from '@angular/material';

import { MenuWheelComponent } from './menu-wheel/menu-wheel.component';
import { Menu } from '@ionic/angular';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';
import { NumberPickerComponent } from './number-picker/number-picker.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , IonicModule
    , MatFormFieldModule
    , MatInputModule
    , MatSelectModule
    , MatOptionModule
    , MatButtonToggleModule
    , MatMenuModule
  ],
  declarations: [
    MenuWheelComponent
    , FormDynamicComponent
    , NumberPickerComponent
  ],
  exports: [ 
    MenuWheelComponent 
    , FormDynamicComponent
    , NumberPickerComponent
  ]
})
export class SharedModule { }
