import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MenuWheelComponent } from './menu-wheel/menu-wheel.component';
import { Menu } from '@ionic/angular';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
  ],
  declarations: [MenuWheelComponent, FormDynamicComponent],
  exports: [ 
    MenuWheelComponent 
    , FormDynamicComponent
  ]
})
export class SharedModule { }
