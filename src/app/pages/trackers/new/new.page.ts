import { Component, OnInit } from '@angular/core';
import { TrackersNewService } from '../trackers-new.service'
import { Tracker, TrackerTypeEnum } from '../trackers.model';

@Component({
  selector: 'new',
  templateUrl: './new.page.html',
  styleUrls: ['./new.page.scss'],
})
export class NewPage implements OnInit {
  trackerName: string;
  trackerType: TrackerTypeEnum;
  enumActStr: string
  enumSkillStr: string
  enumAct: TrackerTypeEnum
  enumSkill: TrackerTypeEnum


  constructor(
    private trackerNewService: TrackersNewService) { 
      this.enumSkillStr = TrackerTypeEnum[TrackerTypeEnum.Skill]
      this.enumSkill = TrackerTypeEnum.Skill
      this.enumActStr = TrackerTypeEnum[TrackerTypeEnum.Activity]
      this.enumAct = TrackerTypeEnum.Activity
  }

  ngOnInit() {
    
  }

  onSave() {
    let newT: Tracker = {
      key: 'zzz',
      name: this.trackerName,
      trackerType: this.trackerType,
      userKey: 'zzz'
    };

    this.trackerNewService.saveNewTracker(newT);
    
  }

}
