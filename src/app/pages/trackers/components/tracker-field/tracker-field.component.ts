import { Component, OnInit, Input } from '@angular/core';
import { TrackerFieldTypeEnum, TrackerField } from '../../trackers.model';
import { TrackersService } from '../../trackers.service';
import { OptionsService } from '../../options/options.service';
import { TrackerFieldService } from './tracker-field.service';
import { slideInFadeOut } from '../../../../animations/slideInFadeOut.animation';

@Component({
  selector: 'app-tracker-field',
  templateUrl: './tracker-field.component.html',
  styleUrls: ['./tracker-field.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerFieldComponent implements OnInit {
  @Input('trackerName') trackerName: string;
  @Input('nodeKey') nodeKey: string;
  @Input('userKey') userKey: string;
  @Input('data') data: TrackerField;
  options;


  constructor(
    private trackerService: TrackersService,
    private optionsService: OptionsService,
    private fieldService: TrackerFieldService
  ) { 

  }

  ngOnInit() {
    this.optionsService.getTrackerOptions(this.trackerName, this.userKey).valueChanges().subscribe(x => {
      this.options = x[0].options;
    })
  }

  // addField() {
  //   this.fieldService.saveTrackerField(this.trackerName, this.nodeKey, this.userKey, undefined);
  // }

  save(event) {
    console.log('insaveevent', event)
    this.data.value = event.target.value;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.data)
  }

}
