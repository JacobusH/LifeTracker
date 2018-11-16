import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { OptionsService } from './options.service';
import { AuthService } from '../../../services/auth.service';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'app-tracker-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({
          transform: 'translateY(-100%)',
        }),
        animate('500ms ease')
      ]),
      transition(':leave', [
        style({
          transform: 'translateY(0%)',
        }),
        // animate('500ms ease', style({transform: 'translateY(0%)'}))
        animate('500ms ease', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class OptionsComponent implements OnInit, AfterViewInit {
  @Input('tracker') trackerName: string;
  @Input('isShown') isShown: string;
  @Input('options') options;
  @Input('trackerKey') trackerKey;
  
  constructor(
    private optionsService: OptionsService,
    private authService: AuthService) { 

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    
  }

  saveOptions(ev) {
    this.optionsService.saveTrackerOptions(this.trackerKey, this.options);
  }


}
