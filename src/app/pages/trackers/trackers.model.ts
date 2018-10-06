import { GeoPoint } from "@firebase/firestore-types";

export * from './beer/beer.model';
export * from './weed/weed.model';

// TODO: finish other models

export interface Tracker {
  key: string,
  userKey: string,
  name: string,
  trackerType: string // 'weed'
}

export enum Interval {
  "Day",
  "Week",
  "Month"
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

export interface SkillTrackerNode {
  trackerKey: string,
  children?: Array<SkillTrackerNode>
  videos?: Array<Video>
  options: {
    points: number,
    decayRate: {
      value: number,
      interval: Interval
    }
  }
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

export enum TrackerTypeEnum {
  'BEER',
  'DRUGS',
  'FOOD',
  'MUSIC',
  'WEED',
  'WORKOUT',
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
