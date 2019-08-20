import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RpgComponent } from './rpg/rpg.component';
import { RPGRoutingModule } from './rpg-routing.module';

@NgModule({
  declarations: [RpgComponent],
  imports: [
		CommonModule
		, FormsModule
		, RPGRoutingModule
		, SharedModule
  ]
})
export class RPGModule { }
