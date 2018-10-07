import { GeoPoint } from "@firebase/firestore-types";

// TODO: finish other models
export enum ActivityFieldTypeEnum {
  'empty',
  'text',
  'number',
  'selectlist',
  'date',
  'datetime'
}

export enum Interval {
  "Day",
  "Week",
  "Month"
}

export enum TrackerTypeEnum {
  "Activity",
  "Skill"
}

export interface Tracker {
  key: string,
  userKey: string,
  name: string,
  trackerType: TrackerTypeEnum // 'skill | activity'
  skillNodes?: Array<SkillNode>,
  actNodes?: Array<ActivityNode>
}

export interface Video {
  key: string,
  videoId: string,
  title?: string,
  caption?: string,
  isActive: boolean,
  createdAt: Date,
  updatedAt: Date
}

export interface SkillNode {
  trackerKey: string,
  name: string,
  children?: Array<SkillNode>
  videos?: Array<Video>
  options?: {
    points: number,
    decayRate: {
      value: number,
      interval: Interval
    }
  }
}

export interface ActivityNode {
  trackerKey: string,
  name: string,
  fields: Array<ActivityField>
}

export interface ActivityField {
  name: string,
  type: ActivityFieldTypeEnum
}

export interface TrackerCommon {
  key: string,
  userKey: string,
  trackerKey: string,
  commonType: string,
  commonTypeExtra: string,
  commonRating: number,
  commonCounts: [{ 'count': number, 'type': string }]
}



export interface TrackerQuestion {
  position: number,
  label: string,
  type: string,
  validation: { 'required': boolean },
  noEdits: boolean
}

export const TrackerFieldOptions = [
  { label: 'text', value: 'text'},
  { label: 'number', value: 'number'},
  { label: 'select list', value: 'select'},
  { label: 'date', value: 'date'},
  { label: 'datetime', value: 'datetime-local'},
]

export const BaseQuestions: Array<TrackerQuestion> = [
  {
    position: -1,
    label: 'Name',
    type: 'text',
    validation: {
      required: true
    },
      noEdits: true
  },
  // {
  //   position: -1,
  //   label: 'Amount',
  //   type: 'number',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // },
  // {
  //   position: -1,
  //   label: 'Amount Type',
  //   type: 'text',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // },
  // {
  //   position: -1,
  //   label: 'Date',
  //   type: 'date',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // },
  // {
  //   position: -1,
  //   label: 'Location',
  //   type: 'locationPoint',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // },
  // {
  //   position: -1,
  //   label: 'Notes',
  //   type: 'text',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // },
  // {
  //   position: -1,
  //   label: 'Rating',
  //   type: 'text',
  //   validation: {
  //     required: false
  //   },
  //   userCanEditName: false
  // }
]
