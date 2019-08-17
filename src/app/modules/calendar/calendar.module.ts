import { NgModule } from '@angular/core';import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';

// angular calendar
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
		CalendarRoutingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
		}),
		FormsModule
  ]
})
export class TrackerCalendarModule { }
