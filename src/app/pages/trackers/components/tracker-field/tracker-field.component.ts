import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TrackerFieldTypeEnum, TrackerField } from '../../../../models/trackers.model';
import { TrackersService, OptionsService, TrackerFieldService } from 'app/services';
import { SimpleTrackerField } from 'app/models/trackers.model';
import { slideInFadeOut } from 'app/animations/slideInFadeOut.animation';
import { Options } from 'selenium-webdriver/chrome';
import { SimpleTrackerService } from '@services/simple-tracker.service';

@Component({
  selector: 'app-tracker-field',
  templateUrl: './tracker-field.component.html',
  styleUrls: ['./tracker-field.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerFieldComponent implements OnInit, AfterViewInit {
  @Input() trackerName: string;
  @Input() nodeKey: string;
  @Input() userKey: string;
  @Input() field: SimpleTrackerField;
  @Input() options;
  field$;
  fieldType;
  fieldTypeString; 
  typeOptions = {}
  numFieldValue: number;
  isHovered: boolean = false;

  

  constructor(
    private trackerService: TrackersService,
    private optionsService: OptionsService,
    private fieldService: TrackerFieldService,
    private stService: SimpleTrackerService
  ) { 
    // TODO: make options
    this.options = {'isEditable': true}
  }

  ngOnInit() {
    // this.optionsService.getTrackerOptions(this.trackerName, this.userKey).valueChanges().subscribe(x => {
    //   this.options = x[0].options;
    // })
    // console.log('field', this.field)

  }

  ngAfterViewInit() {
    console.log(this.field)
    let i = 0
    for(var enumMember in TrackerFieldTypeEnum) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
          this.typeOptions[TrackerFieldTypeEnum[enumMember]] = i++;
      }
   }
  }

  onFieldHoverLeave() {
    this.isHovered = false;
  }

  onFieldHover() {
    this.isHovered = true;
  }

  translateType(type: string) {
    return TrackerFieldTypeEnum[type];
  }

  onEditChange(event) {
    console.log(event)
  }

  save(event) {
    this.field.value = event.target.value;
  }

  saveOptName(eventVal) {
    // console.log('evvyName', event)
    // this.field.options[0].optName = eventVal;
    // this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  saveOptVal(eventVal) {
    // this.field.options[0].optValue = eventVal;
    // this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  saveNumber(strVal) {
    this.field.value = strVal;
    // this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }


  changeLabel(event) {
    this.field.label = event.target.value;
    // this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  changeType(selectedType: string) {
    this.field.type = TrackerFieldTypeEnum[selectedType];
    if(this.field.type == 3) {
      this.field.value = "0"
    }
    // this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

}
