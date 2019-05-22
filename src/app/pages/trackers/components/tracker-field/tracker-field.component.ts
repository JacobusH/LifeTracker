import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TrackerFieldTypeEnum, TrackerField, SimpleTrackerNode } from '../../../../models/trackers.model';
import { TrackersService, OptionsService, TrackerFieldService, SimpleTrackerLocalService } from 'app/services';
import { SimpleTrackerField } from 'app/models/trackers.model';
import { slideInFadeOut } from 'app/animations/slideInFadeOut.animation';
import { Options } from 'selenium-webdriver/chrome';
import { SimpleTrackerService } from '@services/simple-tracker.service';
import { SatDatepickerRangeValue } from 'saturn-datepicker'

@Component({
  selector: 'app-tracker-field',
  templateUrl: './tracker-field.component.html',
  styleUrls: ['./tracker-field.component.scss'],
  animations: [ slideInFadeOut ]
})
export class TrackerFieldComponent implements OnInit, AfterViewInit {
  @Input() trackerName: string;
  @Input() node: SimpleTrackerNode;
  @Input() userKey: string;
  @Input() field: SimpleTrackerField;
  @Input() options;
  @Output() onFieldRemove = new EventEmitter<SimpleTrackerField>();
  dateRangeDisp = null; 
  typeOptions = {};
  fieldTypeString: string; 
  isHovered: boolean = false;
  TrackerFieldTypeEnum = TrackerFieldTypeEnum; // needed so we can use enum in template

  constructor(
    private trackerService: TrackersService,
    private optionsService: OptionsService,
    private fieldService: TrackerFieldService,
    private stService: SimpleTrackerService,
    private stLocalService: SimpleTrackerLocalService
  ) { 
    // TODO: make options
    this.options = {'isEditable': true}
  }

  ngOnInit() {
    // this.optionsService.getTrackerOptions(this.trackerName, this.userKey).valueChanges().subscribe(x => {
    //   this.options = x[0].options;
    // })
    // console.log('field', this.field)

    if(this.field.type == TrackerFieldTypeEnum.daterange) {
      this.dateRangeDisp = {'begin': Date, 'end': Date};
      this.dateRangeDisp.begin = new Date(this.field.value.substring(0, this.field.value.indexOf("|")));
      this.dateRangeDisp.end = new Date(this.field.value.substring(this.field.value.indexOf("|") + 1, this.field.value.length));
     }

  }

  ngAfterViewInit() {
    let i = 0
    for(var enumMember in TrackerFieldTypeEnum) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
          this.typeOptions[TrackerFieldTypeEnum[enumMember]] = i++;
      }
    }
    // get field type string
    for (let key in this.typeOptions) {
      let value = this.typeOptions[key]
      if(value == this.field.type) {
        this.fieldTypeString = key;
        // console.log('fieldtypestring', this.fieldTypeString)
      }
   }

  }

  /////
  // FIELD
  /////
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
    // console.log(event)
  }

  onCheckboxChange(event: any) {
    this.field.value = !this.field.value;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

  save(event) {
    this.field.value = event.target.value;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

  saveNumber(strVal) {
    this.field.value = strVal;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

  saveDate(event: any) {
    // change in view
    this.field.value = event.target.value;
    // save date range as string value
    this.field.value = new Date(event.target.value.begin) + "|" + new Date(event.target.value.end);
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
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

  fieldRemove() {
    // this.stLocalService.fieldRemove(this.node, this.field);
    this.onFieldRemove.emit(this.field);
    this.stService.fieldRemove(this.trackerName, this.node.key, this.field);
  }

  /////
  // LABEL
  /////
  changeLabel(event) {
    let oldLabel: string = this.field.label;
    let newLabel: string = event.target.value;
    this.field.label = newLabel;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
    // deal with label list
    this.stService.labelListAdd(this.trackerName, newLabel.toLowerCase());
    this.stService.labelListRemove(this.trackerName, oldLabel.toLowerCase());
  }

  changeType(selectedType: string) {
    this.field.type = TrackerFieldTypeEnum[selectedType];
    if(this.field.type == 3) {
      this.field.value = "0"
    }
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

  toggleLabelVis() {
    this.field.labelHidden = !this.field.labelHidden;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

}
