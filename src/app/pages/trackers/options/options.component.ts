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
  options;
  trackerKey;
  
  constructor(
    private optionsService: OptionsService,
    private authService: AuthService) { 

  }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.authService.user.subscribe(user => {
      let test$ = this.optionsService.getTrackerOptions(this.trackerName, user.authID).valueChanges().subscribe(x => {
        if(x) {
          this.options = x[0].options;
          this.trackerKey = x[0].key;
        }
      });
    })
  }

  saveOptions(ev) {
    this.optionsService.saveTrackerOptions(this.trackerKey, this.options);
  }


}
