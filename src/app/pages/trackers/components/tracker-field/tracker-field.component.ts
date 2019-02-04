import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { TrackerFieldTypeEnum, TrackerField } from '../../trackers.model';
import { TrackersService } from '../../trackers.service';
import { OptionsService } from '../../options/options.service';
import { TrackerFieldService } from './tracker-field.service';
import { slideInFadeOut } from '../../../../animations/slideInFadeOut.animation';
import { Options } from 'selenium-webdriver/chrome';

@Component({
  selector: 'app-tracker-field',
  templateUrl: './tracker-field.component.html',
  styleUrls: ['./tracker-field.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerFieldComponent implements OnInit, AfterViewInit {
  @Input('trackerName') trackerName: string;
  @Input('nodeKey') nodeKey: string;
  @Input('userKey') userKey: string;
  @Input('field') field: TrackerField;
  @Input('options') options;
  editVisible: boolean = false;
  field$;
  fieldType;
  fieldTypeString; 
  typeOptions = {}
  numFieldValue: number;

  constructor(
    private trackerService: TrackersService,
    private optionsService: OptionsService,
    private fieldService: TrackerFieldService
  ) { 

  }

  ngOnInit() {
    // this.optionsService.getTrackerOptions(this.trackerName, this.userKey).valueChanges().subscribe(x => {
    //   this.options = x[0].options;
    // })
    // console.log('field', this.field)

  }

  ngAfterViewInit() {
    let i = 0
    for(var enumMember in TrackerFieldTypeEnum) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
          // console.log("enum member: ", TrackerFieldTypeEnum[enumMember]);
          this.typeOptions[TrackerFieldTypeEnum[enumMember]] = i++;
      }
   }

   this.field$ = this.fieldService.getField(this.trackerName, this.field.key, this.field.nodeKey, this.userKey).valueChanges();
   this.field$.subscribe(f => {
      this.fieldType = f['type'];
      this.fieldTypeString = this.translateType(this.fieldType)
      // console.log("logged", f['type'])
   })
  }

  translateType(type: string) {
    return TrackerFieldTypeEnum[type]
  }

  editField(event) {
    // console.log(event.target.value)
  }

  showEdit(): void {
    this.editVisible = !this.editVisible;
  }

  onEditChange(event) {
    // console.log(event)
  }

  save(event) {
    this.field.value = event.target.value;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  saveOptName(eventVal) {
    console.log('evvyName', event)
    this.field.options[0].optName = eventVal;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  saveOptVal(eventVal) {
    this.field.options[0].optValue = eventVal;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  saveNumber(strVal) {
    this.field.value = strVal;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }


  changeLabel(event) {
    this.field.label = event.target.value;
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

  changeType(selectedType: string) {
    this.field.type = TrackerFieldTypeEnum[selectedType];
    if(this.field.type == 3) {
      this.field.value = "0"
    }
    this.fieldService.saveTrackerField(this.trackerName, this.userKey, this.nodeKey, this.field)
  }

}
