import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconRegistry, MatIconModule, MatFormFieldModule, MatInputModule, matFormFieldAnimations, MatOptionModule, MatSelectModule
  , MatTabsModule, MatButtonToggleModule, MatMenuModule, MatDividerModule, MatDatepickerModule, MatCheckboxModule } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter'
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker'

import { MenuWheelComponent } from './menu-wheel/menu-wheel.component';
import { FormDynamicComponent } from './form-dynamic/form-dynamic.component';
import { NumberPickerComponent } from './number-picker/number-picker.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { RaterComponent } from './rater/rater.component';

@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , IonicModule
    , MatCheckboxModule
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatOptionModule
    , MatSelectModule
    , MatTabsModule
    , MatButtonToggleModule
    , MatMenuModule
    , MatDatepickerModule
    , MatDividerModule
    , MatMomentDateModule
    , SatDatepickerModule
    , SatNativeDateModule
  ],
  declarations: [
    MenuWheelComponent
    , FormDynamicComponent
    , NumberPickerComponent
    , DatePickerComponent
    , RaterComponent
  ],
  exports: [ 
    DatePickerComponent
    , FormDynamicComponent
    , MenuWheelComponent 
    , NumberPickerComponent
    , RaterComponent
    , MatCheckboxModule
    , MatIconModule
    , MatFormFieldModule
    , MatInputModule
    , MatOptionModule
    , MatSelectModule
    , MatTabsModule
    , MatButtonToggleModule
    , MatMenuModule
    , MatDatepickerModule
    , MatDividerModule
    , MatMomentDateModule
    , SatDatepickerModule
    , SatNativeDateModule
  ],
  providers: [
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] }, // breaks with expression form not supported in injection...
    // {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    // , { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class SharedModule { }
