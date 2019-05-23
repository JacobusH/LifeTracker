import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TrackerFieldTypeEnum, TrackerField, SimpleTrackerNode } from '../../../../models/trackers.model';
import { TrackersService, OptionsService, TrackerFieldService, SimpleTrackerLocalService } from 'app/services';
import { slideInFadeOut } from 'app/animations/slideInFadeOut.animation';
import { SimpleTrackerField } from 'app/models/trackers.model';
import { WikiSummary } from 'app/models/wiki.model';
import { SimpleTrackerService } from 'app/services/simple-tracker.service';
import { WikipediaService } from 'app/services/wikipedia.service';

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
  wikiSum: string;
  wikiShort = true;

  constructor(
    private trackerService: TrackersService,
    private optionsService: OptionsService,
    private fieldService: TrackerFieldService,
    private stService: SimpleTrackerService,
    private stLocalService: SimpleTrackerLocalService,
    private wikiService: WikipediaService
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
   // get wiki summary if needed
   if(this.field.type == TrackerFieldTypeEnum.wikiSummary) {
     this.getWikiSummary();
   }

  }

  /////
  // FIELD
  /////
  translateType(type: string) {
    return TrackerFieldTypeEnum[type];
  }

  onFieldHoverLeave() {
    this.isHovered = false;
  }

  onFieldHover() {
    this.isHovered = true;
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

  saveWikiVal(event: any) {
    this.field.value = event.target.value;
    this.getWikiSummary();
    // if value is attached to another field change it
  }

  fieldRemove() {
    // this.stLocalService.fieldRemove(this.node, this.field);
    this.onFieldRemove.emit(this.field);
    this.stService.fieldRemove(this.trackerName, this.node.key, this.field);
  }

  getWikiSummary() {
    this.wikiService.summaryGet(this.field.value).subscribe(summary => {
      this.wikiSum =  this.wikiShort ? summary.extract_html.slice(0, 100) + "..." : summary.extract_html;
    })
  }

  /////
  // LABEL & VALUE
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
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
    if(this.field.type == TrackerFieldTypeEnum.wikiSummary) {
      this.getWikiSummary();
    }
  }

  toggleLabelVis() {
    this.field.labelHidden = !this.field.labelHidden;
    this.stService.fieldUpdate(this.trackerName, this.node.key, this.field);
  }

}
